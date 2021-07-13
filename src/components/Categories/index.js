import axios from 'axios'
import React, { Component } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { API_URL } from '../../utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons'

const Icon = ({name}) => {
  if(name === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
  if(name === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="mr-2" />
  if(name === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2" />
  
  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
}

export default class Categories extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    axios.get(`${API_URL}/categories`)
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
    const {categories} = this.state
    const {changeCategory, chooseCategory} = this.props
    return (
      <Col md={2} className="mt-3"> {/* md={2} artinya size grid dari column ini adalah 2 grid */}
        <h4><strong>Daftar Kategori</strong></h4>
        <hr />
        <ListGroup>
          {
            categories && categories.map((category) => (
              <ListGroup.Item key={category.id} onClick={() => changeCategory(category.name)} className={chooseCategory === category.name && 'category-active'} style={{cursor: 'pointer'}}>
                <Row>
                  <Col md={2} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name={category.name} /> 
                  </Col>
                  <Col>
                    <h5>
                      {category.name}
                    </h5>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </Col>
    )
  }
}
