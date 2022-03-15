import { useContext, useRef } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudjetsContext";


export default function AddExpenseModal({show, handleClose, defaultBudgetId}) {
    const amountRef = useRef()
    const budgetIdRef= useRef()
    const descriptionRef = useRef()
    const {addExpense, budgets} = useBudgets()

    function handleSubmit(e){
        e.preventDefault()
        addExpense({
            budgetId: budgetIdRef.current.value,
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
        })
        handleClose()
    }
   
    return(
        <Modal show={show} onHide={handleClose}> 
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Expense</Modal.Title>
                </Modal.Header>                
                <Modal.Body>
                    <FormGroup className="mb-3" controlId="amount">
                        <FormLabel>Amount</FormLabel>
                        <FormControl ref={amountRef} type="number" step={0.01} min={0.01}></FormControl>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="description">
                        <FormLabel>Description</FormLabel>
                        <FormControl ref={descriptionRef} type="text"></FormControl>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="budgetId">
                        <FormLabel>Budget</FormLabel>
                        <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                            <option value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                            {budgets.map(budget => (                                
                                <option key={budget.id} value={budget.id}>{budget.name}</option>
                            ))}
                        </Form.Select>
                    </FormGroup>
                    <div className="d-flex justify-content-end">
                        <Button type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    ) 
}
