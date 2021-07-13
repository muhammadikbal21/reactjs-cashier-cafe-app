import axios from 'axios'
import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import swal from 'sweetalert'
import { Cart, Categories, Products } from '../../components'
import { API_URL } from '../../utils/constants'

export default class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      menus: [],
      chooseCategory: 'Makanan',
      carts: []
    }
  }

  componentDidMount() {
    axios.get(`${API_URL}/products?category.name=${this.state.chooseCategory}`)
    .then(res => {
      const menus = res.data
      this.setState({menus: menus})
    })
    .catch(err => {
      console.log("Ini Error Ya: ", err);
    })

    this.getListCarts()
  }

  getListCarts = () => {
    axios.get(`${API_URL}/carts`)
    .then((res) => {
      const carts = res.data
      this.setState({carts: carts})
    })
    .catch(err => {
      console.log("Ini Error Ya: ", err);
    })
  }

  changeCategory = (value) => {
    this.setState({
      chooseCategory: value,
      menu: []
    })

    axios.get(`${API_URL}/products?category.name=${value}`)
    .then(res => {
      const menus = res.data
      this.setState({menus: menus})
    })
    .catch(err => {
      console.log("Ini Error Ya: ", err);
    })
  }
  
  cartIn = (value) => {
    axios.get(`${API_URL}/carts?product.id=${value.id}`)
    .then(res => {
      if (res.data.length === 0) {
        const cart = {
          quantity: 1,
          totalPrice: value.price,
          product: value
        }
        axios.post(`${API_URL}/carts`, cart)
        .then(res => {
          this.getListCarts()
          swal({
            title: "Sukses!",
            text: `${cart.product.name} sukses masuk ke keranjang`,
            icon: "success",
            buttons: false,
            timer: 2_000
          })
          console.log("Added: ", res);
        })
      } else {
        const cart = {
          quantity: res.data[0].quantity + 1,
          totalPrice: res.data[0].totalPrice + value.price,
          product: value
        }
        axios.put(`${API_URL}/carts/${res.data[0].id}`, cart)
        .then(res => {
          this.getListCarts()
          swal({
            title: "Sukses!",
            text: `${cart.product.name} sukses masuk ke keranjang`,
            icon: "success",
            buttons: false,
            timer: 2_000
          })
        })
        .catch(err => {
          console.log("Ini Error Ya: ", err);
        })
      }
    })
    .catch(err => {
      console.log("Ini Error Ya: ", err);
    })
  }

  render() {
    const {menus, chooseCategory, carts} = this.state
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <Categories changeCategory={this.changeCategory} chooseCategory={chooseCategory} />
            <Products menus={menus} cartIn={this.cartIn} />
            <Cart carts={carts} {...this.props} getListCarts={this.getListCarts} />
          </Row>
        </Container>
      </div>
    )
  }
}
