import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import { auth } from '../firebase';

jest.mock('../firebase', () => ({
  auth: {
    currentUser: {
      emailVerified: false
    }
  }
}));

test('renders dashboard heading', () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
  expect(screen.getByText(/Welcome to Expense Tracker/i)).toBeInTheDocument();
});

test('renders Verify Email button when email is not verified', () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
  expect(screen.getByText(/Verify Email/i)).toBeInTheDocument();
});
