import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Menus } from '../../components'

export default class Products extends Component {
  render() {
    return (
      <Col>
        <h4><strong>Daftar Produk</strong></h4>
        <hr />
        <Row>
          {
            this.props.menus && this.props.menus.map((menu) => (
              <Menus key={menu.id} menu={menu} />
            ))
          }
        </Row>
      </Col>
    )
  }
}
