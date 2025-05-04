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
    }
  }
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;