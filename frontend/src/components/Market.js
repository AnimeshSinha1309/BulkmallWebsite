import React from 'react';
import { Button, Card } from 'react-bootstrap';

class Market extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
    fetch('http://localhost:9001/product/list')
      .then(res => res.json())
      .then((data) => {
        this.setState({ products: data })
      })
  }

  appendCards() {
    let cards = []

    for (const product of this.state.products) {
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
        {this.appendCards()}
      </div>
    );
  }
}

export default Market;
