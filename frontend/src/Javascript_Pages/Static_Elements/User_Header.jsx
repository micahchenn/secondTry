// User_Header.jsx
import React from 'react';
import '../../Styling_Pages/Static_Elements/User_Header.css';
import Logo from '../../Styling_Pages/Public_Pictures/Harbinger_Logo.png';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Header_Search_Bar from './Header_Search_Bar'; // import the Header_Search_Bar component

const User_Header = () => {
  const location = useLocation();

  if (location.pathname === "/welcome") {
    return null;
  }

  return (
    <header className="user-header">
      <div className="logo-title">
        <img src={Logo} alt="Harbinger Logo" className="logo" />
        <h1>Harbinger</h1>
      </div>
      <Header_Search_Bar /> {/* Use the Header_Search_Bar component */}
      <div className="right-header">
        <div className="products">
          <a href="#about-us" className="hover-element">Learn</a>
          <a href="#what-we-offer" className="hover-element">Premium</a>
          <a href="#invest" className="hover-element">Investing</a>
        </div>
        <button className="profile-button">
          <FontAwesomeIcon icon={faUser} size= 'lg' className="profile-icon" />
        </button>
      </div>
    </header>
  );

};

export default User_Header;