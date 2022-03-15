import { useRef } from "react";
import { Button, Form, FormGroup, FormLabel, Modal } from "react-bootstrap";
import { useBudgets } from "../contexts/BudjetsContext";

export default function AddBudjetModal({show , handleClose}) {
  const nameRef= useRef()
  const maxRef= useRef()
  const {addBudget}= useBudgets()
  
  function handleSubmit(e){
    e.preventDefault()
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value)
    })
    handleClose()
  }

  return (
    <Modal show={show}  onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Budjet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup className="mb-3" controlId="name">
            <FormLabel>Name</FormLabel>
            <Form.Control ref={nameRef} type="text" required></Form.Control>
          </FormGroup>
          <FormGroup className="mb-3" controlId="max">
            <FormLabel>Maximum money</FormLabel>
            <Form.Control ref={maxRef} type="number" step={0.01} required min={0}></Form.Control>
          </FormGroup>
          <div className="justify-content-end d-flex">
            <Button type="submit">Add</Button>
          </div>
        </Modal.Body>       
      </Form>
    </Modal>
  );
}
