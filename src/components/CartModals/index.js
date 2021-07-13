import React from 'react'
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Modal } from 'react-bootstrap'
import { numberWithCommas } from '../../utils/numberFormats'

const CartModals = ({showModal, handleClose, cartDetail, quantity, note, increament, decreament, changeHandler, handleSubmit}) => {
  if (cartDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {cartDetail.product.name} {" "}
            <strong>
              (Rp. {numberWithCommas(cartDetail.product.price)})
            </strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Total Harga :</Form.Label>
              <p>
                <strong>
                  Rp. {numberWithCommas(cartDetail.totalPrice)}
                </strong>
              </p>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Jumlah :</Form.Label>
              <br />
              <Button variant="primary" size="sm" style={{marginRight: 12}}>
                <FontAwesomeIcon icon={faPlus} onClick={() => increament()} />
              </Button>
              <strong>{quantity}</strong>
              <Button variant="primary" size="sm" style={{marginLeft: 12}}>
                <FontAwesomeIcon icon={faMinus} onClick={() => decreament()} />
              </Button>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1" style={{marginTop: 12}}>
              <Form.Label>Catatan :</Form.Label>
              <Form.Control as="textarea" rows={3} name="note" placeholder="Contoh : Pedas, Nasi Setengah" value={note} onChange={(event) => changeHandler(event)} />
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginTop: 15}}>
              Simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger">
            <FontAwesomeIcon icon={faTrash} /> {" "}
            Hapus pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    )
  } 
  else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Tidak Ada!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Produk yang dipilih tidak ada!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default CartModals
