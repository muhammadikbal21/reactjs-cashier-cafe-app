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
      cartDetail: cart,
      quantity: cart.quantity,
      note: cart.note
    })
  }
  
  handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  increament = () => {
    this.setState({
      quantity: this.state.quantity + 1
    })
  }

  decreament = () => {
    if (this.state.quantity !== 1) {
      this.setState({
        quantity: this.state.quantity - 1
      })
    }
  }

  changeHandler = (event) => {
    this.setState({
      note: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault() // agar ketika di submit tidak akan me-reload lagi
    console.log(this.state.note);
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
              <CartModals handleClose={this.handleClose} {...this.state} increament={this.increament} decreament={this.decreament} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} />
            </ListGroup>
          )
        }
        <Buy carts={carts} {...this.props} />
      </Col>
    )
  }
}