import React from "react";
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import { withRouter } from 'react-router';

class Buy extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('id') === null)
      this.props.history.push('/login');
    this.state = {
      name: " ",
      quantity: 0,
      valid: false,
      product: {}
    }
  }

  componentDidMount() {
    if (this.props.hasOwnProperty('match') && this.props.match.params.hasOwnProperty('id')) {
      this.setState({ name: this.props.match.params.id, valid: true });
    }
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.quantity > 0 && this.state.name.length > 1;
  }

  handleSubmit(event) {
    event.preventDefault();
    // Get the Details of the Object being Purchased
    fetch('http://localhost:9001/product/id/' + this.state.name, {
      method: "GET"
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({ product: data[0] })
        // Lower the Amount Left in the Bundle
        if (this.state.product.remaining < parseInt(this.state.quantity)) {
          console.log("Not Enough Remaining!");
          return;
        } else if (this.state.product.remaining === parseInt(this.state.quantity)) {
          fetch('http://localhost:9001/product/edit/' + this.state.name, {
            method: "PUT",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "remaining=0&status=pending"
          }).then(res => res.json())
            .then((data) => {
              this.props.history.push('/orders')
            })
        } else if (this.state.product.remaining > parseInt(this.state.quantity)) {
          fetch('http://localhost:9001/product/edit/' + this.state.name, {
            method: "PUT",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "remaining=" + (this.state.product.remaining - this.state.quantity).toString()
          }).then(res => res.json())
            .then((data) => {
              this.props.history.push('/orders')
            })
        }
        // Insert the Order in the Table
        const payload = "productId=" + this.state.name + "&quantity=" + this.state.quantity +
          "&userId=" + localStorage.getItem('id');
        fetch('http://localhost:9001/order/insert', {
          method: "POST",
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: payload
        }).then(res => res.json())
          .then((data) => {
            this.props.history.push('/orders')
          })
      })
  }

  render() {
    if (this.state.valid === false)
      return (
        <div className="container text-center">
          <h1 style={{ margin: '2rem' }}>Please Find an Item from the Market</h1>
          <p>This purchse page is only accessible with a valid product.
            You can search for these products in the Market tab.</p>
        </div>
      )
    return (
      <div className="Buy container">
        <div>
          <form onSubmit={this.handleSubmit} className="col-lg-5 offset-lg-4">
            <FormGroup controlId="name" variant="large">
              <Form.Label>Product Id of Item</Form.Label>
              <FormControl
                autoFocus
                type="text"
                value={this.state.name}
                disabled={true}
              />
            </FormGroup>
            <FormGroup controlId="quantity" variant="large">
              <Form.Label>Number of items Purchased</Form.Label>
              <FormControl
                min="0"
                onChange={e => this.setState({ quantity: e.target.value })}
                type="number"
              />
            </FormGroup>
            <Button block variant="large" disabled={!this.validateForm()}
              type="submit" className="btn-primary">
              Buy Item
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Buy);
