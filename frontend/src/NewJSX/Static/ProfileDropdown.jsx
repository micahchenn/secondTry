// ProfileDropdown.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileDropdown.css';  // Ensure you have the corresponding CSS file for styling
import { FaUserCircle } from 'react-icons/fa';
const ProfileDropdown = () => {
  return (
    <div className="profile-dropdown">
      <div className="profile-info">
        <div className="profile-icon">
          <FaUserCircle size={50} />
        </div>
        <div className="profile-details">
          <h3>Micah Chen</h3>
          <Link to="/complete-profile" className="complete-profile-link">Complete your profile</Link>
        </div>
      </div>
      <ul className="profile-links">
        <li>
          <Link to="/profile">Profile</Link>
          <span>Personal data, income, taxes</span>
        </li>
        <li>
          <Link to="/membership">Membership</Link>
          <span>Manage Origin membership</span>
        </li>
        <li>
          <Link to="/accounts">Accounts</Link>
          <span>Account management</span>
        </li>
        <li>
          <Link to="/security">Security</Link>
          <span>Password</span>
        </li>
        <li>
          <Link to="/documents">Documents</Link>
          <span>Origin documents</span>
        </li>
        <li>
          <Link to="/logout">Log out</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
