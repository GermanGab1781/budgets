import { Modal, Stack} from "react-bootstrap";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudjetsContext";
import { Button } from "react-bootstrap";
import { currencyFormatter } from "../utils";

export default function SeeExpensesModal({budgetId,handleClose}) {

const {getBudgetExpenses,deleteExpense,budgets}= useBudgets() 
const expenses = getBudgetExpenses(budgetId)
const budget = 
  UNCATEGORIZED_BUDGET_ID === budgetId
    ?{name:"Unactegorized", id:UNCATEGORIZED_BUDGET_ID}
    : budgets.find(b=> b.id === budgetId)

return(   
<Modal show={budgetId != null} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>
      <Stack direction="horizontal" gap="1">
        <span>Expenses from {budget?.name}</span>
      </Stack>
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Stack direction="vertical" gap ="3">
      {expenses.map((expense)=>{
      return(
        <Stack direction="horizontal" gap="2" key={expense.id}>
          <div className="me-auto fs-4">{expense.description}</div>
          <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
          <Button onClick={()=> deleteExpense(expense)} size="sm" variant="outline-danger">&times;</Button>
        </Stack>
        )
      })}
    </Stack>
  </Modal.Body>
</Modal>
  ) 




}
