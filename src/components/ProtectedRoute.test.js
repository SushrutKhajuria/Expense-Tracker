import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));

const TestComponent = () => <h1>Protected Content</h1>;

test('redirects to login when not authenticated', () => {
  useSelector.mockReturnValue(false);
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        } />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
});

test('renders children when authenticated', () => {
  useSelector.mockReturnValue(true);
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        } />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText(/Protected Content/i)).toBeInTheDocument();
});
