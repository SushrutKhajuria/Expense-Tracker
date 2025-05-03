import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendEmailVerification } from 'firebase/auth';
import './Dashboard.css';

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleVerifyEmail = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await sendEmailVerification(auth.currentUser);
      setSuccess('Verification email sent! Check your inbox.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome to Expense Tracker!!!</h2>
      
      {!auth.currentUser?.emailVerified && (
        <div className="verify-email-section">
          <p>Your email is not verified.</p>
          <button 
            onClick={handleVerifyEmail} 
            disabled={loading}
            className="verify-btn"
          >
            {loading ? 'Sending...' : 'Verify Email'}
          </button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </div>
      )}
    </div>
  );
}

export default Dashboard;