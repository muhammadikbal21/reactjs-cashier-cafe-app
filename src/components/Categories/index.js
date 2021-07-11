import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

export default class Categories extends Component {
  render() {
    return (
      <Col md={2} mt="2"> {/* md={2} artinya size grid dari column ini adalah 2 grid */}
        <h4><strong>Daftar Kategori</strong></h4>
        <hr />
      </Col>
    )
  }
}
