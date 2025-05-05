import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './SignUp';

test('renders Sign Up heading', () => {
  render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>
  );
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
});

test('renders Confirm Password input', () => {
  render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>
  );
  expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
});
