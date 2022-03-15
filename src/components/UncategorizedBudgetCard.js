import { Button, Card, Stack } from 'react-bootstrap';
import { currencyFormatter } from '../utils';

export default function UncategorizedBudgetCard({amount, gray, onAddExpenseClick,onSeeExpenseClick}) {
  
  
  const classNames=["mt-4"];
  if(amount>5000){classNames.push("bg-danger", "bg-opacity-10")}
  else if(gray){classNames.push("bg-light")}
  return(
    <Card className={classNames.join(" ")}>
        <Card.Body className="mt-3">
            <Card.Title className="d-flex justify-content-between">
              <div>Uncategorized</div>
              <div>{currencyFormatter.format(amount)}</div>           
            </Card.Title>
            <Stack direction="horizontal" gap={3} className="mt-4">
              <Button
                variant="outline-primary" 
                className="ms-auto"
                onClick={onAddExpenseClick}
                >
                Add Expense</Button>
              <Button variant="outline-secondary" onClick={onSeeExpenseClick}>See Expenses</Button> 
            </Stack>              
        </Card.Body>         
    </Card>
  
  );
}

