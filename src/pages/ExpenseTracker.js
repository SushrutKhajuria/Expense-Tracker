import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { ref, push, onValue, off, update, remove } from 'firebase/database';
import './ExpenseTracker.css';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [loading, setLoading] = useState(false);

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description) return;

    setLoading(true);
    try {
      await push(ref(db, 'expenses'), {
        amount: parseFloat(amount),
        description,
        category,
        date: new Date().toISOString(),
        userId: auth.currentUser.uid
      });
      setAmount('');
      setDescription('');
    } catch (err) {
      console.error("Error adding expense:", err);
    } finally {
      setLoading(false);
    }
  };

  // READ
  useEffect(() => {
    const expensesRef = ref(db, 'expenses');
    const unsubscribe = onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const expensesArray = Object.entries(data).map(([id, expense]) => ({
          id,
          ...expense
        }));
        setExpenses(expensesArray);
      } else {
        setExpenses([]);
      }
    });
    return () => off(expensesRef);
  }, []);

  // UPDATE
  const handleUpdate = async (expenseId, newData) => {
    try {
      await update(ref(db, `expenses/${expenseId}`), newData);
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  };

  // DELETE
  const handleDelete = async (expenseId) => {
    try {
      await remove(ref(db, `expenses/${expenseId}`));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  return (
    <div className="expense-tracker">
      <h2>Add Daily Expense</h2>
      
      {/* Expense Form */}
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
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>

      {/* Expenses List */}
      <div className="expenses-list">
        <h3>Your Expenses</h3>
        
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <ul>
            {expenses
              .filter(exp => exp.userId === auth.currentUser?.uid)
              .map((expense) => (
                <li key={expense.id} className="expense-item">
                  <div className="expense-details">
                    <span className="amount">₹{expense.amount.toFixed(2)}</span>
                    <span className="description">{expense.description}</span>
                    <span className="category">{expense.category}</span>
                    <span className="date">
                      {new Date(expense.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="expense-actions">
                    <button 
                      onClick={() => handleUpdate(expense.id, { 
                        description: prompt("New description:", expense.description) || expense.description
                      })}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm("Delete this expense?")) {
                          handleDelete(expense.id);
                        }
                      }}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ExpenseTracker;