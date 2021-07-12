import axios from 'axios'
import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { API_URL } from '../../utils/constants'

export default class Categories extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    axios.get(`${API_URL}categories`)
    .then(res => {
      console.log("Response: ", res);
      const categories = res.data
      this.setState({categories: categories})
    })
    .catch(err => {
      console.log("Ini Error Ya: ", err);
    })
  }
  
  render() {
    console.log("Categories: ", this.state.categories);
    return (
      <Col md={2} mt="2"> {/* md={2} artinya size grid dari column ini adalah 2 grid */}
        <h4><strong>Daftar Kategori</strong></h4>
        <hr />
      </Col>
    )
  }
}
