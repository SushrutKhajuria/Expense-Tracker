import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  return auth.currentUser ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;