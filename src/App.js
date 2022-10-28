import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import Helmet from "react-helmet";
import AddBudjetModal from "./components/AddBudjetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import DeleteBudjetModal from "./components/DeleteBudjetModal";
import SeeExpensesModal from "./components/SeeExpensesModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./contexts/BudjetsContext";



function App() {
  
  const [showAddBudgetModal, setShowAddBudgetModal]= useState(false)
  
  const [showAddExpenseModal, setShowAddExpenseModal]= useState(false)
  const [addExpenseModalId, setAddExpenseModalId]=useState()
  
  const [showSeeExpenseModalId, setShowSeeExpenseModalId]=useState()

  const [showDeleteBudgetModal, setShowDeleteBudgetModal]= useState(false)
  const [showDeleteBudgetModalId, setShowDeleteBudgetModalId]= useState()
  const [showDeleteBudgetModalName, setShowDeleteBudgetModalName]= useState()
 
  const {budgets, getBudgetExpenses} = useBudgets()


  function openSeeExpenseModal(ID){
    setShowSeeExpenseModalId(ID)
  }
  
  function openDeleteBudgetModal(ID,name){
    setShowDeleteBudgetModal(true)
    setShowDeleteBudgetModalId(ID)
    setShowDeleteBudgetModalName(name)
  }
  
  function openAddExpenseModal(ID){
    setShowAddExpenseModal(true)
    setAddExpenseModalId(ID)
  }


  function getExpensesForBudget(ID){
    return getBudgetExpenses(ID).reduce((total, expense)=>total + expense.amount, 0)
  }
  
  const TITLE = 'Budget'

  return (
    <Container>
      
      <Helmet><title>{TITLE}</title></Helmet>
      
      <Stack direction="horizontal" gap={3} className="mt-2">
        <h1 className="me-auto">Budget</h1>
        <Button onClick={()=>setShowAddBudgetModal(true)} variant="primary">Add Budget</Button>
        <Button onClick={openAddExpenseModal} variant="outline-primary">Add Expense</Button>
      </Stack>

      <div className="mt-3" style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",
        alignItems:"flex-start",
        gap:"2rem",
      }}>
        {budgets.map(budget =>{
          return(
            <BudgetCard
              key={budget.id} 
              title={budget.name} 
              max={budget.max} 
              amount={getExpensesForBudget(budget.id)}
              onAddExpenseClick={()=>{openAddExpenseModal(budget.id)}}
              onSeeExpenseClick={()=>{openSeeExpenseModal(budget.id)}}
              onDeleteBudgetClick={()=>{openDeleteBudgetModal(budget.id,budget.name)}}
            />
          )
        })} 
      </div>
      
      <UncategorizedBudgetCard
        amount={getExpensesForBudget(UNCATEGORIZED_BUDGET_ID)} 
        onAddExpenseClick={()=>{openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}}
        onSeeExpenseClick={()=>{openSeeExpenseModal(UNCATEGORIZED_BUDGET_ID)}}
      /> 
      
      <AddBudjetModal 
        show={showAddBudgetModal} 
        handleClose={()=> setShowAddBudgetModal(false) } 
      />

      <AddExpenseModal 
        show={showAddExpenseModal}
        handleClose={()=> setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalId}
      />

      <SeeExpensesModal 
        handleClose={()=>setShowSeeExpenseModalId()}
        budgetId={showSeeExpenseModalId}
      />
      
      <DeleteBudjetModal
        show={showDeleteBudgetModal}
        handleClose={()=>setShowDeleteBudgetModal(false)}
        budgetId={showDeleteBudgetModalId}
        name={showDeleteBudgetModalName}
      />
    

    </Container>
  );
}

export default App;
