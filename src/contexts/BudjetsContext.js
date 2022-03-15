import React, { useContext} from 'react'
import { v4 as uuidV4} from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

const BudgetsContext = React.createContext() 

export const UNCATEGORIZED_BUDGET_ID = "uncategorized"

export function useBudgets(){
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) =>{
    const [budgets, setBudgets]=useLocalStorage("budgets",[])
    const [expenses, setExpenses]=useLocalStorage("expenses",[])

    function getBudgetExpenses(ID){
        return expenses.filter(expense => expense.budgetId === ID)
    }

    function addBudget({name, max}){
        setBudgets(prevBudgets =>{
            if(prevBudgets.find(budget => budget.name ===name)){
                return prevBudgets
            }
            return [...prevBudgets, {id: uuidV4(), name, max}]
        })
    }

    function addExpense({budgetId, description, amount}){
        setExpenses(prevExpenses=>{
            return [...prevExpenses, {id: uuidV4(), budgetId, description, amount}]
        })
    }

    function deleteBudget({budgetId}){
        let expensesToChange = expenses.filter(expense => expense.budgetId === budgetId)
        setExpenses(prevExpenses=>{
            return prevExpenses.filter(expense=> expense.budgetId !== budgetId)
        })
        expensesToChange.forEach(expense => {
            expense.budgetId= UNCATEGORIZED_BUDGET_ID
            addExpense(expense)
        })
        
        setBudgets(prevBudgets=>{
            return prevBudgets.filter(budget=> budget.id !== budgetId)
        })
    }

    function deleteExpense({expenseId}){
        setExpenses(prevExpenses=>{
            return prevExpenses.filter(expense=> expense.id !== expenseId)
        })
    }

    return(
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            addExpense,
            addBudget,
            getBudgetExpenses,
            deleteExpense,
            deleteBudget
        }}>
            {children}
        </BudgetsContext.Provider>
    )
}