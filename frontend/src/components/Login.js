import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.email, this.state.password);
  }

  render() {
    return (
      <div className="Login container">
        <div>
          <form onSubmit={this.handleSubmit} className="col-lg-5 offset-lg-4">
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
              />
            </FormGroup>
            <Button block bsSize="large" disabled={!this.validateForm()} type="submit" className="btn-primary">
              Login
          </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
