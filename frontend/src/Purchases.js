import React from "react";
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import { withRouter } from 'react-router';

class Purchases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event) {
    event.preventDefault();
    const payload = "email=" + this.state.email + "&password=" + this.state.password;
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
          localStorage.setItem('email', data.email);
          localStorage.setItem('name', data.name);
          this.props.history.push('/')
        }
      })
  }

  render() {
    return (
      <div className="Login container">
        <div>
          <form onSubmit={this.handleSubmit} className="col-lg-5 offset-lg-4">
            <FormGroup controlId="email" variant="large">
              <Form.Label>Email</Form.Label>
              <FormControl
                autoFocus
                type="email"
                value={this.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </FormGroup>
            <FormGroup controlId="password" variant="large">
              <Form.Label>Password</Form.Label>
              <FormControl
                value={this.password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
              />
            </FormGroup>
            <Button block variant="large" disabled={!this.validateForm()}
              type="submit" className="btn-primary">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Purchases);
