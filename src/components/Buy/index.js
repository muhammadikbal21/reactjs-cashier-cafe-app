import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { Component } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { API_URL } from '../../utils/constants'
import { numberWithCommas } from '../../utils/numberFormats'

export default class Buy extends Component {
  submitTotalBuy = (totalBuy) => {
    const order = {
      totalBuy: totalBuy,
      menus: this.props.carts
    }

    axios.post(`${API_URL}/orders`, order)
    .then((res) => {
      this.props.history.push('/success')
    })
  }
  render() {
    const totalBuy = this.props.carts.reduce(function(result, item) {
      return result + item.totalPrice
    }, 0)

    return (
      <>
        {/* WEB */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{span: 3, offset: 9}} className="px-4">
              <h4>
                Total Harga:{" "}
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(totalBuy)}
                </strong>
              </h4>
              <Button variant="primary" style={{width: '100%'}} className="mb-2 mt-4 mr-2" size="lg" onClick={() => this.submitTotalBuy(totalBuy)}>
                <FontAwesomeIcon icon={faShoppingCart} />{" "}
                <strong>BAYAR</strong>
              </Button>
            </Col>
          </Row>
        </div>

        {/* MOBILE */}
        <div className="d-sm-block d-md-none mt-3">
          <Row>
            <Col md={{span: 3, offset: 9}} className="px-4">
              <h4>
                Total Harga:{" "}
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(totalBuy)}
                </strong>
              </h4>
              <Button variant="primary" style={{width: '100%'}} className="mb-2 mt-4 mr-2" size="lg" onClick={() => this.submitTotalBuy(totalBuy)}>
                <FontAwesomeIcon icon={faShoppingCart} />{" "}
                <strong>BAYAR</strong>
              </Button>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}
