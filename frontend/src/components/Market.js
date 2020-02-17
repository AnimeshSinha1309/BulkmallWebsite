import React from 'react';
import { Button, Card, FormGroup, FormControl, Form } from 'react-bootstrap';
import Fuse from 'fuse.js';

class Market extends React.Component {
  constructor(props) {
    // Check Login and Get the list of products
    super(props)
    if (localStorage.getItem('id') === null)
      this.props.history.push('/login');
    this.state = {
      products: [],
      fuse: undefined
    }
    fetch('http://localhost:9001/product/list')
      .then(res => res.json())
      .then((data) => {
        this.setState({ products: data })
        var options = {
          shouldSort: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [
            "name",
          ]
        };
        this.setState({ fuse: new Fuse(data, options) });
      })
    // Initialize the Fuzzy Searching
  }

  appendCards() {
    let cards = []
    var searched_products = [];
    if (this.state.fuse !== undefined)
      searched_products = this.state.fuse.search(this.state.searchstr);
    for (const product of searched_products) {
      cards.push(
        <div className="col-sm-4" style={{ display: 'inline-block' }} key={product.name}>
          <Card style={{ width: '18rem', margin: '2rem' }}>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                These are priced at Rs. {product.price} per item.&nbsp;
                {product.remaining} items are left in this bundle.&nbsp;
                The status on this prodct is <b>{product.status}</b>.
              </Card.Text>
              <Button href={"buy/" + product.id} variant="primary">Purchase Now</Button>
            </Card.Body>
          </Card>
        </div>
      )
    }
    return cards;
  }

  render() {
    return (
      <div className="container">
        <div>
          <form onSubmit={this.handleSubmit} className="col-lg-5 offset-lg-4">
            <FormGroup controlId="searchstr" variant="large">
              <Form.Label>Search for Items Here</Form.Label>
              <FormControl
                autoFocus
                type="text"
                onChange={e => this.setState({ searchstr: e.target.value })}
              />
            </FormGroup>
          </form>
        </div>
        <div>
          {this.appendCards()}
        </div>
      </div>
    );
  }
}

export default Market;
