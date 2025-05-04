import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import CompleteProfile from './components/profile/CompleteProfile'; 
import ForgotPassword from './components/auth/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import ExpenseTracker from './pages/ExpenseTracker';



function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route 
        path="/expenses" 
        element={
          <ProtectedRoute>
            <ExpenseTracker />
          </ProtectedRoute>
          } 
        />

      </Routes>
    </Router>
    </Provider>
  );
}

export default App;