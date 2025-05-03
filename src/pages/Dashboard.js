import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendEmailVerification, signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Email verification handler
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

  // Logout handler
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
    <div className="dashboard-container">
      {/* Header Section with Logout */}
      <header className="dashboard-header">
        <h2>Welcome to Expense Tracker</h2>
        <button 
          className="logout-btn"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? 'Logging out...' : 'Logout'}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="dashboard-content">
        {/* Navigation to Expense Tracker */}
        <Link to="/expenses" className="expense-tracker-link">
          Go to Expense Tracker
        </Link>

        {/* Email Verification Section */}
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
      </main>
    </div>
  );
}

export default Dashboard;