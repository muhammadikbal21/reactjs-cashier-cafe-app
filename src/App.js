import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap';
import { Header, Products, Categories, Cart } from './components';
import { API_URL } from './utils/constants'
import axios from 'axios'


export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      menus: []
    }
  }

  componentDidMount() {
    axios.get(API_URL+"products")
    .then(res => {
      console.log("Response: ", res);
      const menus = res.data
      this.setState({menus: menus})
    })
    .catch(err => {
      console.log("Ini Error Ya: ", err);
    })
  }
  
  render() {
    console.log("ini data di render: ", this.state.menus);
    return (
      <div className="App">
        <Header />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <Categories />
              <Products />
              <Cart />
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}