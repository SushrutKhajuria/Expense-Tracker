import React, { useState } from 'react';
import './ExpenseTracker.css';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description) return;

    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      description,
      category,
      date: new Date().toLocaleDateString()
    };

    setExpenses([...expenses, newExpense]);
    setAmount('');
    setDescription('');
  };

  return (
    <div className="expense-tracker">
      <h2>Add Daily Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount Spent (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What did you spend on?"
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit">Add Expense</button>
      </form>

      <div className="expenses-list">
        <h3>Your Expenses</h3>
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id} className="expense-item">
                <span className="amount">₹{expense.amount.toFixed(2)}</span>
                <span className="description">{expense.description}</span>
                <span className="category">{expense.category}</span>
                <span className="date">{expense.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ExpenseTracker;