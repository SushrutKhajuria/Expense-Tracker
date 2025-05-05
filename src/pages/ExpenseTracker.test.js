import { render, screen } from '@testing-library/react';
import ExpenseTracker from './ExpenseTracker';
import { Provider } from 'react-redux';
import store from '../store';

const renderComponent = () =>
  render(
    <Provider store={store}>
      <ExpenseTracker />
    </Provider>
  );

test('renders Add Daily Expense heading', () => {
  renderComponent();
  expect(screen.getByText(/Add Daily Expense/i)).toBeInTheDocument();
});

test('renders Add Expense button', () => {
  renderComponent();
  expect(screen.getByText(/Add Expense/i)).toBeInTheDocument();
});

test('shows no expenses message initially', () => {
  renderComponent();
  expect(screen.getByText(/No expenses added yet/i)).toBeInTheDocument();
});
