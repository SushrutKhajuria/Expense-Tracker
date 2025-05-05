import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';

test('renders Forgot Password heading', () => {
  render(
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  );
  expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
});

test('renders Send Reset Link button', () => {
  render(
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  );
  expect(screen.getByText(/Send Reset Link/i)).toBeInTheDocument();
});
