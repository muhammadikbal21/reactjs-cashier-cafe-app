import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap';
import { Header, Products, Categories, Cart } from './components';
import { API_URL } from './utils/constants'
import axios from 'axios'


export default class App extends Component {
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
    console.log("Menu: ", value);
  }
  
  render() {
    const {menus, chooseCategory} = this.state
    return (
      <div className="App">
        <Header />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <Categories changeCategory={this.changeCategory} chooseCategory={chooseCategory} />
              <Products menus={menus} cartIn={this.cartIn} />
              <Cart />
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}