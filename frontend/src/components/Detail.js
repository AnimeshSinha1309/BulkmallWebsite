import React from "react";
import { Button, Card } from "react-bootstrap";
import { withRouter } from 'react-router';

class DetailOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      idx: this.props.match.params.id,
      loaded: false
    }
  }

  componentDidMount() {
    fetch('http://localhost:9001/order/id/' + this.state.orderId, {
      method: "GET"
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({ order: data[0] })
        this.setState({ loaded: true })
      })
  }

  appendDetails() {
    if (this.state.loaded === true) {
      return (
        <div>
          <div className="col-sm-6" style={{ display: 'inline-block' }}>
            <Card style={{ width: '21rem', margin: '2rem' }}>
              <Card.Body>
                <Card.Title>Order Details</Card.Title>
                <Card.Text>
                  <b>Order ID:</b>&nbsp;{this.state.order.id}<br />
                  <b>Product:</b>&nbsp;{this.state.order.productId.name}<br />
                  <b>Ordered By:</b>&nbsp;{this.state.order.userId.name}<br />
                  <b>Quantity:</b>&nbsp;{this.state.order.quantity}<br />
                  <b>Per Item Price:</b>&nbsp; Rs.&nbsp;{this.state.order.productId.price}<br />
                  <b>Bundle Price:</b>&nbsp; Rs.&nbsp;{this.state.order.productId.price * this.state.order.quantity}<br />
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-6" style={{ display: 'inline-block' }}>
            <Card style={{ width: '21rem', margin: '2rem' }}>
              <Card.Body>
                <Card.Title>Tracking Information</Card.Title>
                <Card.Text>
                  <b>Status of Bundle:</b>&nbsp;{this.state.order.productId.status}<br />
                  <b>Remaining in Bundle:</b>&nbsp;{this.state.order.productId.remaining}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      )
    } else { return (<div></div>) }
  }

  render() {
    return (
      <div>
        <div className="container">
          <h2 style={{ margin: '2rem 2rem 0rem' }}>Order Details</h2>
          {this.appendDetails()}
        </div>
        <div className="container">
          <h2 style={{ margin: '2rem 2rem 0rem' }}>My Orders</h2>
        </div>
      </div>
    );
  }
}

export default withRouter(DetailOrder);
