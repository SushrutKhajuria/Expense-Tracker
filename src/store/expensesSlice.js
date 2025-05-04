import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
  totalAmount: 0
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
      state.totalAmount += action.payload.amount;
    },
    setExpenses(state, action) {
      state.expenses = action.payload.expenses;
      state.totalAmount = action.payload.totalAmount;
    },
    updateExpense(state, action) {
      const { id, updatedExpense, amountDiff } = action.payload;
      const index = state.expenses.findIndex(exp => exp.id === id);
      if (index !== -1) {
        state.expenses[index] = updatedExpense;
        state.totalAmount += amountDiff;
      }
    },
    deleteExpense(state, action) {
      const { id, amount } = action.payload;
      state.expenses = state.expenses.filter(exp => exp.id !== id);
      state.totalAmount -= amount;
    }
  }
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;