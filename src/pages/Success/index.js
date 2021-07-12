import axios from 'axios'
import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API_URL } from '../../utils/constants'

export default class Success extends Component {
  componentDidMount() {
    axios.get(`${API_URL}/carts`)
    .then(res => {
      const carts = res.data
      carts.map(function(item) {
        return axios.delete(`${API_URL}/carts/${item.id}`)
               .then((res) => console.log(res))
               .catch((err) => console.log(err))
      })
    })
    .catch(err => {
      console.log("Ini Error Ya: ", err);
    })
  }

  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/success.png" width="500" />
        <h2>Pesanan Sukses!</h2>
        <p>Terima Kasih Sudah Memesan</p>
        <Button variant="primary" as={Link} to="/">Kembali</Button>
      </div>
    )
  }
}
