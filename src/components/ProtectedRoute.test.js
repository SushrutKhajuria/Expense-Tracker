import { render } from '@testing-library/react';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  Navigate: () => <div>Redirected</div>
}));

test('renders children if logged in', () => {
  useSelector.mockReturnValue(true);
  const { getByText } = render(
    <ProtectedRoute>
      <div>Protected Content</div>
    </ProtectedRoute>
  );
  expect(getByText('Protected Content')).toBeInTheDocument();
});

test('redirects if not logged in', () => {
  useSelector.mockReturnValue(false);
  const { getByText } = render(
    <ProtectedRoute>
      <div>Protected Content</div>
    </ProtectedRoute>
  );
  expect(getByText('Redirected')).toBeInTheDocument();
});
