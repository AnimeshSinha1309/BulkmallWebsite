import React from "react";
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import { withRouter } from 'react-router';

class Sales extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('id') === null)
      this.props.history.push('/login');
    this.state = {
      name: "",
      price: 0,
      quantity: 0
    }
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.quantity > 0 && this.state.price >= 0 && this.state.name.length > 0;
  }

  handleSubmit(event) {
    event.preventDefault();
    const payload = "name=" + this.state.name + "&quantity=" + this.state.quantity +
      "&remaining=" + this.state.quantity + "&sellerId=" + localStorage.getItem('id') +
      "&status=selling&price=" + this.state.price;
    console.log(payload);
    fetch('http://localhost:9001/product/insert', {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload
    }).then(res => res.json())
      .then((data) => {
        console.log(data);
        this.props.history.push('/market')
      })
  }

  render() {
    return (
      <div className="Sales container">
        <div>
          <form onSubmit={this.handleSubmit} className="col-lg-5 offset-lg-4">
            <FormGroup controlId="name" variant="large">
              <Form.Label>Name of the Product</Form.Label>
              <FormControl
                autoFocus
                type="text"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </FormGroup>
            <FormGroup controlId="price" variant="large">
              <Form.Label>Price of the Product</Form.Label>
              <FormControl
                value={this.state.price}
                onChange={e => this.setState({ price: e.target.value })}
                type="number"
              />
            </FormGroup>
            <FormGroup controlId="quantity" variant="large">
              <Form.Label>Number of items in the Bundle</Form.Label>
              <FormControl
                value={this.state.quantity}
                onChange={e => this.setState({ quantity: e.target.value })}
                type="number"
              />
            </FormGroup>
            <Button block variant="large" disabled={!this.validateForm()}
              type="submit" className="btn-primary">
              Sell Item
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Sales);