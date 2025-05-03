import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendEmailVerification, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleVerifyEmail = async () => {
    setEmailLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await sendEmailVerification(auth.currentUser);
      setSuccess('Verification email sent! Check your inbox.');
    } catch (err) {
      setError(err.message);
    } finally {
      setEmailLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      {/* Logout Button */}
      <button 
        className="logout-btn"
        onClick={handleLogout}
        disabled={loading}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>

      <h2>Welcome to Expense Tracker!!!</h2>
      
      {!auth.currentUser?.emailVerified && (
        <div className="verify-email-section">
          <p>Your email is not verified.</p>
          <button 
            onClick={handleVerifyEmail} 
            disabled={emailLoading}
            className="verify-btn"
          >
            {emailLoading ? 'Sending...' : 'Verify Email'}
          </button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </div>
      )}
    </div>
  );
}

export default Dashboard;