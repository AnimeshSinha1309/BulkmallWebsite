import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pconfirm, setPconfirm] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("customer");
  const [gender, setGender] = useState("male");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(email, password, name, type, gender, pconfirm);
    const payload = "name=" + name + "&email=" + email + "&type=" +
      type + "&gender=" + gender + "&password=" + password + "&pconfirm=" + pconfirm;
    fetch('http://localhost:9001/register', {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload
    }).then(res => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch(console.log)
  }

  return (
    <div className="Login container">
      <div>
        <form onSubmit={handleSubmit} className="col-lg-5 offset-lg-4">
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="pconfirm" bsSize="large">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              value={pconfirm}
              onChange={e => setPconfirm(e.target.value)}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="gender" bsSize="large">
            <ControlLabel>Sex</ControlLabel>
            <FormControl
              value={gender}
              onChange={e => setGender(e.target.value)}
              componentClass="select"
              type="select">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="type" bsSize="large">
            <ControlLabel>User Type</ControlLabel>
            <FormControl
              value={type}
              onChange={e => setType(e.target.value)}
              componentClass="select"
              type="select">
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </FormControl>
          </FormGroup>
          <Button block bsSize="large" disabled={!validateForm()} type="submit" className="btn-primary">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
