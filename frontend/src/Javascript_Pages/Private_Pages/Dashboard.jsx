// Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard.</p>
      <Link to="/link-account">
        <button>Go to Link Account</button>
      </Link>
    </div>
  );
}

export default Dashboard;