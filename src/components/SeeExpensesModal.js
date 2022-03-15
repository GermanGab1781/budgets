import { Modal} from "react-bootstrap";
import { useBudgets } from "../contexts/BudjetsContext";

export default function SeeExpensesModal({budgetId, name, show, handleClose}) {
const{getBudgetExpenses}= useBudgets() 
    return(   
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Expenses from {name}</Modal.Title></Modal.Header>
            <Modal.Body>
                {getBudgetExpenses(budgetId).map(expense=>{
                    return(
                        <div key={expense.id}>*
                            <span>{expense.description}: </span> 
                            <span>{expense.amount}</span>
                        </div>
                    )
                })}
            </Modal.Body>
        </Modal>
  ) 




}
