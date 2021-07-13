import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Menus } from '../../components'

export default class Products extends Component {
  render() {
    const {menus, cartIn} = this.props
    return (
      <Col className="mt-3">
        <h4><strong>Daftar Produk</strong></h4>
        <hr />
        <Row className="overflow-auto menu">
          {
            menus && menus.map((menu) => (
              <Menus key={menu.id} menu={menu} cartIn={cartIn} />
            ))
          }
        </Row>
      </Col>
    )
  }
}
