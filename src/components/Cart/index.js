import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

export default class Cart extends Component {
  render() {
    return (
      <Col md={3} mt="2"> {/* md={3} artinya size grid dari column ini adalah 2 grid */}
        <h4><strong>Daftar Belanja</strong></h4>
        <hr />
      </Col>
    )
  }
}
