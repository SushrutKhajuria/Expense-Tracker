import { render, screen } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

test('renders login form', () => {
  render(<BrowserRouter><Login /></BrowserRouter>);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});

test('renders forgot password link', () => {
  render(<BrowserRouter><Login /></BrowserRouter>);
  expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
});
