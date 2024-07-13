// Header.jsx
import React from 'react';
import '../../Styling_Pages/Static_Elements/Header.css';
import Logo from '../../Styling_Pages/Public_Pictures/Harbinger_Logo.png';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  if (location.pathname !== "/welcome" && location.pathname !== "/login" && location.pathname !== "/signup") {
    return null;
  }

  return (
    <header className="header-unique-11">
      <div className="logo-title-user-header-unique-11">
        <img src={Logo} alt="Harbinger Logo" className="logo-unique-11" />
        <span className="harbinger-text-unique-11">Harbinger</span>
      </div>
      <div className="products-unique-11">
        <a href="#about-us" className="hover-element-unique-11">About Us</a>
        <a href="#what-we-offer" className="hover-element-unique-11">What We Offer</a>
        <a href="#invest" className="hover-element-unique-11">Invest</a>
      </div>
      <div className="button-container-unique-11">
        <Link to="/login" className="hover-login-unique-11">Log in</Link>
        <Link to="/signup" className="header-signup-unique-11">Sign up</Link>
      </div>
    </header>
  );
};

export default Header;
