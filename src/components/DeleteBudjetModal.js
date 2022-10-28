import { Button, Modal,Stack } from "react-bootstrap";
import { useBudgets } from "../contexts/BudjetsContext";
export default function DeleteBudjetModal({show, handleClose, budgetId, name}) {
  const {deleteBudget} = useBudgets()

  function handleDelete(){
    deleteBudget({budgetId})
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Remove <span className="text-danger">"{name}"</span> from the budgets?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="horizontal me-auto" gap="1">
          <Button onClick={handleDelete}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
