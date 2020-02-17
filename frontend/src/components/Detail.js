import React from "react";
import { Button, Card, Form, FormGroup, FormControl } from "react-bootstrap";
import { withRouter } from 'react-router';

class DetailOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      idx: this.props.match.params.id,
      loaded: false,
      rating: 0,
      review: "",
      quantity: 0
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
        this.setState({ quantity: data[0].quantity })
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

  appendRatingsForm() {
    return (
      <div className="container" style={{ margin: '10px' }}>
        <form onSubmit={this.handleSubmit} className="col-sm-10 offset-sm-1">
          <FormGroup controlId="rating" variant="large">
            <Form.Label>Seller Rating</Form.Label>
            <FormControl
              type="number"
              min="1"
              max="5"
              value={this.state.rating}
              onChange={e => this.setState({ rating: e.target.value })}
            />
          </FormGroup>
          <Button block variant="large"
            type="submit" className="btn-primary">
            Set Rating
          </Button>
        </form>
      </div >
    )
  }

  appendReviewsForm() {
    return (
      <div className="container" style={{ margin: '10px' }}>
        <form onSubmit={this.handleSubmit} className="col-sm-10 offset-sm-1">
          <FormGroup controlId="review" variant="large">
            <Form.Label>Product Reviews</Form.Label>
            <FormControl
              as="textarea"
              rows="4"
              value={this.state.review}
              onChange={e => this.setState({ review: e.target.value })}
            />
          </FormGroup>
          <Button block variant="large"
            type="submit" className="btn-primary">
            Send Review
          </Button>
        </form>
      </div >
    )
  }

  appendEditForm() {
    return (
      <div className="container" style={{ margin: '10px' }}>
        <form onSubmit={this.handleSubmit} className="col-sm-10 offset-sm-1">
          <FormGroup controlId="rating" variant="large">
            <Form.Label>Order Quantity</Form.Label>
            <FormControl
              type="number"
              min="1"
              max="100"
              value={this.state.quantity}
              onChange={e => this.setState({ quantity: e.target.value })}
            />
          </FormGroup>
          <Button block variant="large"
            type="submit" className="btn-warning">
            Update Order
          </Button>
        </form>
      </div >
    )
  }

  render() {
    return (
      <div>
        <div className="container">
          <h2 style={{ margin: '2rem 2rem 0rem' }}>Order Details</h2>
          {this.appendDetails()}
        </div>
        <div className="container">
          <h2 style={{ margin: '2rem 2rem 0rem' }}>Ratings and Reviews</h2>
          {this.appendRatingsForm()}
          {this.appendReviewsForm()}
        </div>
        <div className="container">
          <h2 style={{ margin: '2rem 2rem 0rem' }}>Change your Order</h2>
          {this.appendEditForm()}
        </div>
      </div>
    );
  }
}

export default withRouter(DetailOrder);
