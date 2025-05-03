import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import CompleteProfile from './components/profile/CompleteProfile'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
      </Routes>
    </Router>
  );
}

export default App;