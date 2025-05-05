import { render, screen } from '@testing-library/react';
import SignUp from './SignUp';
import { BrowserRouter } from 'react-router-dom';

test('renders sign up heading', () => {
  render(<BrowserRouter><SignUp /></BrowserRouter>);
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
});

test('renders confirm password input', () => {
  render(<BrowserRouter><SignUp /></BrowserRouter>);
  expect(screen.getByPlaceholderText(/Confirm your password/i)).toBeInTheDocument();
});