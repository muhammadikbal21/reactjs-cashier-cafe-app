import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { numberWithCommas } from '../../utils/numberFormats'

const Menus = ({menu, cartIn}) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" style={{borderRadius: 15}} onClick={() => cartIn(menu)}>
        <Card.Img variant="top" src={`assets/images/${menu.category.name.toLowerCase()}/${menu.image}`} style={{width: '100%', height: 200, borderTopLeftRadius: 15, borderTopRightRadius: 15}} />
        <Card.Body>
          <Card.Title as={"h6" && "strong"}>{menu.name} ({menu.code})</Card.Title>
          <Card.Text>
            Rp. {numberWithCommas(menu.price)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Menus