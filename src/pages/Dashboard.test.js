import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { auth } from '../../firebase';

jest.mock('../../firebase', () => ({ auth: { currentUser: { emailVerified: false } } }));

test('renders dashboard heading', () => {
  render(<BrowserRouter><Dashboard /></BrowserRouter>);
  expect(screen.getByText(/Welcome to Expense Tracker/i)).toBeInTheDocument();
});

test('renders verify email button if not verified', () => {
  render(<BrowserRouter><Dashboard /></BrowserRouter>);
  expect(screen.getByText(/Verify Email/i)).toBeInTheDocument();
});