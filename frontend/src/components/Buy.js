import React from "react";
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import { withRouter } from 'react-router';

class Buy extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('id') === null)
      this.props.history.push('/login');
    this.state = {
      name: "",
      quantity: 0,
      lockdown: false
    }
    if (this.props.hasOwnProperty('match')) {
      this.state.name = this.props.match.params.id;
      this.state.lockdown = true;
    }
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.quantity > 0 && this.state.name.length > 0;
  }

  handleSubmit(event) {
    event.preventDefault();
    const payload = "name=" + this.state.name + "&quantity=" + this.state.quantity +
      "&remaining=" + this.state.quantity + "&sellerId" + localStorage.getItem('id') +
      "&status=selling&price=" + this.state.price;
    fetch('http://localhost:9001/product/insert', {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload
    }).then(res => res.json())
      .then((data) => {
        if (data.hasOwnProperty('error')) {
          console.log("Error, you entered something wrong");
        } else {
          localStorage.setItem('id', data.id);
          localStorage.setItem('price', data.email);
          localStorage.setItem('name', data.name);
          this.props.history.push('/')
        }
      })
  }

  render() {
    return (
      <div className="Buy container">
        <div>
          <form onSubmit={this.handleSubmit} className="col-lg-5 offset-lg-4">
            <FormGroup controlId="name" variant="large">
              <Form.Label>Product Id of Item</Form.Label>
              <FormControl
                autoFocus
                type="email"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                disabled={this.state.lockdown}
              />
            </FormGroup>
            <FormGroup controlId="quantity" variant="large">
              <Form.Label>Number of items Purchased</Form.Label>
              <FormControl
                value={this.state.quantity}
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
