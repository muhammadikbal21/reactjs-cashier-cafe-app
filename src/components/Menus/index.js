import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { numberWithCommas } from '../../utils/numberFormats'

const Menus = ({menu}) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow">
        <Card.Img variant="top" src={`assets/images/${menu.category.name.toLowerCase()}/${menu.image}`} />
        <Card.Body>
          <Card.Title>{menu.name}</Card.Title>
          <Card.Text>
            Rp. {numberWithCommas(menu.price)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Menus