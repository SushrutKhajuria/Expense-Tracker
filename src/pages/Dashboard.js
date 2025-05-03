import React ,{useEffect} from 'react';
import { auth } from '../firebase'; 
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {

    useEffect(() => {
        console.log("Current user:", auth.currentUser);
      }, []);

      return (
    <div className="dashboard">
      <h2>Welcome to Expense Tracker!!!</h2>
      <div className="profile-status">
        <p>Your profile is incomplete.</p>
        <Link to="/complete-profile" className="complete-btn">
          Complete now
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;