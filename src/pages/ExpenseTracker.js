import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { ref, push, onValue, off, update, remove } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { expensesActions } from '../store/expensesSlice';
import './ExpenseTracker.css';

function ExpenseTracker() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [loading, setLoading] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses.expenses);
  const totalAmount = useSelector(state => state.expenses.totalAmount);
  const userId = useSelector(state => state.auth.userId);

  // Fetch expenses from Firebase
  useEffect(() => {
    const expensesRef = ref(db, 'expenses');
    const unsubscribe = onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const expensesArray = Object.entries(data)
          .map(([id, expense]) => ({ id, ...expense }))
          .filter(exp => exp.userId === userId);
        
        const total = expensesArray.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
        
        dispatch(expensesActions.setExpenses({
          expenses: expensesArray,
          totalAmount: total
        }));
      } else {
        dispatch(expensesActions.setExpenses({
          expenses: [],
          totalAmount: 0
        }));
      }
    });
    return () => off(expensesRef);
  }, [dispatch, userId]);

  // Add new expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description) return;

    setLoading(true);
    try {
      const newExpense = {
        amount: parseFloat(amount),
        description,
        category,
        date: new Date().toISOString(),
        userId
      };

      dispatch(expensesActions.addExpense(newExpense));
      await push(ref(db, 'expenses'), newExpense);
      
      setAmount('');
      setDescription('');
    } catch (err) {
      console.error("Error adding expense:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update expense
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedExpense = {
        ...editingExpense,
        amount: parseFloat(editingExpense.amount),
        description: editingExpense.description,
        category: editingExpense.category
      };

      // Calculate difference for total amount update
      const originalExpense = expenses.find(exp => exp.id === editingExpense.id);
      const amountDiff = updatedExpense.amount - originalExpense.amount;

      dispatch(expensesActions.updateExpense({
        id: editingExpense.id,
        updatedExpense,
        amountDiff
      }));

      await update(ref(db, `expenses/${editingExpense.id}`), updatedExpense);
      setEditingExpense(null);
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  };

  // Delete expense
  const handleDelete = async (expenseId) => {
    if (window.confirm("Delete this expense?")) {
      try {
        const expenseToDelete = expenses.find(exp => exp.id === expenseId);
        
        dispatch(expensesActions.deleteExpense({
          id: expenseId,
          amount: expenseToDelete.amount
        }));

        await remove(ref(db, `expenses/${expenseId}`));
      } catch (err) {
        console.error("Error deleting expense:", err);
      }
    }
  };

  return (
    <div className="expense-tracker">
      {totalAmount > 10000 && (
        <button className="premium-button">
          Activate Premium Features
        </button>
      )}
      
      <h2>Add Daily Expense</h2>
      
      <form onSubmit={editingExpense ? handleUpdate : handleSubmit}>
        <div className="form-group">
          <label>Amount Spent (₹)</label>
          <input
            type="number"
            value={editingExpense ? editingExpense.amount : amount}
            onChange={(e) => 
              editingExpense 
                ? setEditingExpense({...editingExpense, amount: e.target.value})
                : setAmount(e.target.value)
            }
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
            value={editingExpense ? editingExpense.description : description}
            onChange={(e) => 
              editingExpense 
                ? setEditingExpense({...editingExpense, description: e.target.value})
                : setDescription(e.target.value)
            }
            placeholder="What did you spend on?"
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select 
            value={editingExpense ? editingExpense.category : category}
            onChange={(e) => 
              editingExpense 
                ? setEditingExpense({...editingExpense, category: e.target.value})
                : setCategory(e.target.value)
            }
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading 
            ? editingExpense ? 'Updating...' : 'Adding...' 
            : editingExpense ? 'Update Expense' : 'Add Expense'
          }
        </button>
        {editingExpense && (
          <button 
            type="button" 
            onClick={() => setEditingExpense(null)}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="expenses-list">
        <h3>Your Expenses (Total: ₹{totalAmount.toFixed(2)})</h3>
        
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id} className="expense-item">
                {editingExpense?.id === expense.id ? (
                  <form onSubmit={handleUpdate} className="edit-form">
                    <input
                      type="number"
                      value={editingExpense.amount}
                      onChange={(e) => setEditingExpense({
                        ...editingExpense,
                        amount: e.target.value
                      })}
                      min="0"
                      step="0.01"
                    />
                    <input
                      type="text"
                      value={editingExpense.description}
                      onChange={(e) => setEditingExpense({
                        ...editingExpense,
                        description: e.target.value
                      })}
                    />
                    <select
                      value={editingExpense.category}
                      onChange={(e) => setEditingExpense({
                        ...editingExpense,
                        category: e.target.value
                      })}
                    >
                      <option value="Food">Food</option>
                      <option value="Transport">Transport</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Other">Other</option>
                    </select>
                    <button type="submit" className="save-btn">Save</button>
                    <button 
                      type="button" 
                      onClick={() => setEditingExpense(null)}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
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
                        onClick={() => setEditingExpense(expense)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(expense.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ExpenseTracker;