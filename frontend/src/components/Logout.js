import React from "react";
import { withRouter } from 'react-router';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.logout();
    this.props.history.push('/login')
    window.location.reload();
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }

  render() {
    return (
      <div className="container">
        <h1>Logging you Out</h1>
      </div>
    )
  }
}

export default withRouter(Logout);
