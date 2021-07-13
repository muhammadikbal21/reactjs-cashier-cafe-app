import React, { Component } from 'react'
import { Badge, Col, ListGroup, Row } from 'react-bootstrap'
import { numberWithCommas } from '../../utils/numberFormats'
import { Buy, CartModals } from '../../components'

export default class Cart extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      showModal: false,
      cartDetail: false,
      quantity: 0,
      note: ''
    }
  }

  handleShow = (cart) => {
    this.setState({
      showModal: true,
      cartDetail: cart
    })
  }
  
  handleClose = () => {
    this.setState({
      showModal: false
    })
  }

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
                  <ListGroup.Item key={cart.id} onClick={() => this.handleShow(cart)}>
                    <Row>
                      <Col xs={2}>
                        <h5>
                          <Badge style={{backgroundColor: 'green', borderRadius: 30}}>{cart.quantity}</Badge>
                        </h5>
                      </Col>
                      <Col>
                        <h6 style={{fontWeight: 'bold'}}>{cart.product.name}</h6>
                        <p>Rp. {numberWithCommas(cart.product.price)}</p>
                      </Col>
                      <Col><strong className="float-right">Rp. {numberWithCommas(cart.totalPrice)}</strong></Col>
                    </Row>
                  </ListGroup.Item>
                ))
              }
              <CartModals handleClose={this.handleClose} {...this.state} />
            </ListGroup>
          )
        }
        <Buy carts={carts} {...this.props} />
      </Col>
    )
  }
}