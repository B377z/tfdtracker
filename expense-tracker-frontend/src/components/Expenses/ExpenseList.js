import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/expenses', {
        headers: {
          'x-auth-token': token,
        },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <Container>
      <h2 className="my-4">Expenses</h2>
      <ListGroup>
        {expenses.map((expense) => (
          <ListGroup.Item key={expense._id}>
            {expense.description} - ${expense.amount} ({expense.category.name})
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ExpenseList;
