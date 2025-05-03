import React, { useState } from 'react';
import { auth } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import './CompleteProfile.css';

function CompleteProfile() {
  const [fullName, setFullName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: fullName,
        photoURL: photoUrl || null
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="complete-profile-container">
      <h2>Complete Your Profile</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Profile Photo URL (Optional)</label>
          <input
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default CompleteProfile;