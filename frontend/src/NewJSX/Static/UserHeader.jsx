// UserHeader.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserHeader.css';
import Logo from '../../Styling_Pages/Public_Pictures/Harbinger_Logo.png';
import { FaUserCircle } from 'react-icons/fa';
import ProfileDropdown from './ProfileDropdown'; // Import the ProfileDropdown component

function UserHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="user-header navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={Logo} alt="Harbinger Logo" className="logo" />
          <span className="navbar-text harbinger-text">Harbinger</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/link-account">Link Account</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/premium-plans">Premium</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-quantara">Quantara</Link>
            </li>
            <li 
              className="nav-item profile-item"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link className="nav-link" to="/profile">
                <FaUserCircle size={24} />
              </Link>
              {dropdownOpen && <ProfileDropdown />}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
