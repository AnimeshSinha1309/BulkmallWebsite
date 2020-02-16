import React from "react";
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import { withRouter } from 'react-router';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      pconfirm: "",
      name: "",
      type: "customer",
      gender: "male",
    }
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event) {
    event.preventDefault();
    const payload = "name=" + this.state.name + "&email=" + this.state.email + "&type=" +
      this.state.type + "&gender=" + this.state.gender + "&password=" + this.state.password +
      "&pconfirm=" + this.state.pconfirm;
    fetch('http://localhost:9001/register', {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload
    }).then(res => res.json())
      .then((data) => {
        console.log(data);
        this.props.history.push('/login')
      })
      .catch(console.log)
  }

  render() {
    return (
      <div className="Login container">
        <div>
          <form onSubmit={this.handleSubmit} className="col-lg-5 offset-lg-4">
            <FormGroup controlId="name" variant="large">
              <Form.Label>Name</Form.Label>
              <FormControl
                autoFocus
                type="text"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </FormGroup>
            <FormGroup controlId="email" variant="large">
              <Form.Label>Email</Form.Label>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </FormGroup>
            <FormGroup controlId="password" variant="large">
              <Form.Label>Password</Form.Label>
              <FormControl
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
              />
            </FormGroup>
            <FormGroup controlId="pconfirm" variant="large">
              <Form.Label>Confirm Password</Form.Label>
              <FormControl
                value={this.state.pconfirm}
                onChange={e => this.setState({ pconfirm: e.target.value })}
                type="password"
              />
            </FormGroup>
            <FormGroup controlId="gender" variant="large">
              <Form.Label>Sex</Form.Label>
              <FormControl
                value={this.state.gender}
                onChange={e => this.setState({ gender: e.target.value })}
                componentClass="select"
                type="select">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="type" variant="large">
              <Form.Label>User Type</Form.Label>
              <FormControl
                value={this.state.type}
                onChange={e => this.setState({ type: e.target.value })}
                componentClass="select"
                type="select">
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
              </FormControl>
            </FormGroup>
            <Button block variant="large" disabled={!this.validateForm()} type="submit" className="btn-primary">
              Register
          </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
