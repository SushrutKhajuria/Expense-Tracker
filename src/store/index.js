import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expensesReducer from './expensesSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    theme: themeReducer
  }
});

export { default as authActions } from './authSlice';
export { default as expensesActions } from './expensesSlice';
export { default as themeActions } from './themeSlice';

export default store;