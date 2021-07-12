import React, { Component } from 'react'
import { Badge, Col, ListGroup, Row } from 'react-bootstrap'
import { numberWithCommas } from '../../utils/numberFormats'

export default class Cart extends Component {
  render() {
    const {carts} = this.props
    return (
      <Col md={3} mt="2"> {/* md={3} artinya size grid dari column ini adalah 2 grid */}
        <h4><strong>Daftar Belanja</strong></h4>
        <hr />
        {
          carts.length !== 0 && (
            <ListGroup variant="flush">
              {
                carts.map((cart) => (
                  <ListGroup.Item>
                    <Row>
                      <Col xs={2}>
                        <h4>
                          <Badge style={{backgroundColor: 'green', borderRadius: 30}}>{cart.quantity}</Badge>
                        </h4>
                      </Col>
                      <Col>
                        <h5>{cart.product.name}</h5>
                        <p>Rp. {numberWithCommas(cart.product.price)}</p>
                      </Col>
                      <Col><strong className="float-right">Rp. {numberWithCommas(cart.totalPrice)}</strong></Col>
                    </Row>
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
          )
        }
      </Col>
    )
  }
}