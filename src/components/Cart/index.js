import React, { Component } from 'react'
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { numberWithCommas } from '../../utils/numberFormats'
import { Buy, CartModals } from '../../components'
import axios from 'axios'
import { API_URL } from '../../utils/constants'
import swal from 'sweetalert'

export default class Cart extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      showModal: false,
      cartDetail: false,
      quantity: 0,
      note: '',
      totalPrice: 0
    }
  }

  handleShow = (cart) => {
    this.setState({
      showModal: true,
      cartDetail: cart,
      quantity: cart.quantity,
      note: cart.note,
      totalPrice: cart.totalPrice
    })
  }
  
  handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  increament = () => {
    this.setState({
      quantity: this.state.quantity + 1,
      totalPrice: this.state.cartDetail.product.price * (this.state.quantity + 1)
    })
  }
  
  decreament = () => {
    if (this.state.quantity !== 1) {
      this.setState({
        quantity: this.state.quantity - 1,
        totalPrice: this.state.cartDetail.product.price * (this.state.quantity - 1)
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
    this.handleClose()
    const data = {
      quantity: this.state.quantity,
      totalPrice: this.state.totalPrice,
      product: this.state.cartDetail.product,
      note: this.state.note
    }
    axios.put(`${API_URL}/carts/${this.state.cartDetail.id}`, data)
    .then((res) => {
      this.props.getListCarts()
      swal({
        title: "Update Sukses!",
        text: `${data.product.name} sukses update ke keranjang`,
        icon: "success",
        buttons: false,
        timer: 2_000
      })
      .catch((err) => {
        console.log("Ini Error : ", err);
      })
    })
  }

  onDelete = (id) => {
    swal({
      title: `Anda yakin menghapus ${this.state.cartDetail.product.name}?`,
      text: `${this.state.cartDetail.product.name} akan dihapus dalam daftar belanja`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
          axios.delete(`${API_URL}/carts/${id}`)
          .then((res) => {
            this.props.getListCarts()
            swal(`${this.state.cartDetail.product.name} berhasil dihapus!`, {
              icon: "success",
              buttons: false,
              timer: 2_000
            });
            this.handleClose()
          })
          .catch((err) => {
            console.log("Ini Error : ", err);
          })
        } else {
          swal(`${this.state.cartDetail.product.name} batal dihapus`);
          this.handleClose()
        }
    });
  }

  render() {
    const {carts} = this.props
    return (
      <Col md={3} mt="2"> {/* md={3} artinya size grid dari column ini adalah 2 grid */}
        <h4><strong>Daftar Belanja</strong></h4>
        <hr />
        {
          carts.length !== 0 && (
            <Card className="overflow-auto cart">
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
                <CartModals 
                handleClose={this.handleClose} 
                {...this.state} 
                increament={this.increament} 
                decreament={this.decreament} 
                changeHandler={this.changeHandler} 
                handleSubmit={this.handleSubmit} 
                onDelete={this.onDelete}
                />
              </ListGroup>
            </Card>
          )
        }
        <Buy carts={carts} {...this.props} />
      </Col>
    )
  }
}