import React from 'react';
import '../../Styling_Pages/Static_Elements/User_Header.css';
import Logo from '../../Styling_Pages/Public_Pictures/Harbinger_Logo.png';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

//import HeaderSearchBar from './HeaderSearchBar'; // import the Header_Search_Bar component


const User_Header = () => {
  const location = useLocation();

  if (location.pathname === "/welcome") {
    return null;
  }

  return (
    <header className="user-header">
      <div className="logo-title-user-header">
        <img src={Logo} alt="Harbinger Logo" className="logo" />
        <span className="harbinger-text">Harbinger</span> {/* Use the Harbinger text with the new font */}
      </div>
       {/* Use the Header_Search_Bar component REMOVED AS OF 6/30/2024*/}
      <div className="right-header">
        <div className="products">
          <Link to="/link-account" className="hover-element">Link Account</Link>
          <Link to="/premium-plans" className="hover-element">Premium</Link>
          <Link to="/about-quantara" className="hover-element">Quantara</Link>
        </div>
        <button className="profile-button">
          <FontAwesomeIcon icon={faUser} size='lg' className="profile-icon" />
        </button>
      </div>
    </header>
  );
};

export default User_Header;
