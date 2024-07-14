import React from 'react';
import '../../Styling_Pages/Static_Elements/User_Header.css';
import Logo from '../../Styling_Pages/Public_Pictures/Harbinger_Logo.png';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const User_Header = () => {
  const location = useLocation();

  if (location.pathname === "/welcome") {
    return null;
  }

  return (
    <header className="user-header-unique-11">
      <div className="logo-title-user-header-unique-11">
        <img src={Logo} alt="Harbinger Logo" className="logo-unique-11" />
        <span className="harbinger-text-unique-11">Harbinger</span>
      </div>
      <div className="right-header-unique-11">
        <div className="products-unique-11">
          <Link to="/link-account" className="hover-element-unique-11">Link Account</Link>
          <Link to="/premium-plans" className="hover-element-unique-11">Premium</Link>
          <Link to="/about-quantara" className="hover-element-unique-11">Quantara</Link>
        </div>
        <button className="profile-button-unique-11">
          <FontAwesomeIcon icon={faUser} size='lg' className="profile-icon-unique-11" />
        </button>
      </div>
    </header>
  );
};

export default User_Header;
