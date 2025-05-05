import { render, screen } from '@testing-library/react';
import ForgotPassword from './ForgotPassword';
import { BrowserRouter } from 'react-router-dom';

test('renders forgot password heading', () => {
  render(<BrowserRouter><ForgotPassword /></BrowserRouter>);
  expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
});

test('renders reset button', () => {
  render(<BrowserRouter><ForgotPassword /></BrowserRouter>);
  expect(screen.getByRole('button', { name: /Send Reset Link/i })).toBeInTheDocument();
});
