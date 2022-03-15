import { Button, Modal } from "react-bootstrap";
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
                <Modal.Title>Remove {name} from the budgets?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button onClick={handleDelete}>Yes</Button>
                <Button onClick={handleClose}>No</Button>
            </Modal.Body>
        </Modal>
    )
}
