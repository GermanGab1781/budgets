import { Button, Card, ProgressBar, Stack } from 'react-bootstrap';
import { currencyFormatter } from '../utils';

export default function BudgetCard({title, max ,amount, gray, onAddExpenseClick,onSeeExpenseClick, onDeleteBudgetClick}) {
  
  
  const classNames=[];
  if(amount>max){classNames.push("bg-danger", "bg-opacity-10")}
  else if(gray){classNames.push("bg-light")}
  return(
    <Card className={classNames.join(" ")}>
        <Card.Body>
            <Card.Title className="d-flex justify-content-between">
              <div>{title}</div>
              <div>{currencyFormatter.format(amount)} / {currencyFormatter.format(max)}</div>           
            </Card.Title>
            <ProgressBar 
              className="mt-2" 
              variant={ProgressBarCalc(amount, max  )}
              min={0} max={max} now={amount}>
            </ProgressBar>
            <Stack direction="horizontal" gap={3} className="mt-4">
              <Button
                variant="outline-primary" 
                className="ms-auto"
                onClick={onAddExpenseClick}
                >
                Add Expense</Button>
              <Button
                variant="outline-danger"
                onClick={onDeleteBudgetClick}
              >
                Delete Budget
              </Button>
              <Button 
                variant="outline-secondary" 
                onClick={onSeeExpenseClick}
                >
                See Expenses</Button> 
            </Stack>              
        </Card.Body>         
    </Card>
  
  );
}

function ProgressBarCalc(amount,max){
  const result = amount / max ;
  if(result < .5)return "primary"
  if(result < .75)return "warning"
  if(result > 1)return "dark"
  return "danger"
}
