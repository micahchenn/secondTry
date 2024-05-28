// User_Header.jsx
import React from 'react';
import '../../Styling_Pages/Static_Elements/User_Header.css';
import Logo from '../../Styling_Pages/Public_Pictures/Harbinger_Logo.png';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
      <div className="products">
        <a href="#about-us" className="hover-element">About Us</a>
        <a href="#what-we-offer" className="hover-element">What We Offer</a>
        <a href="#invest" className="hover-element">Invest</a>
      </div>
      <div className="button-container">
        <Link to="/login" className="hover-login">Loasdfasdfg in</Link>
        <Link to="/signup" className="header-signup">Sigadsfn up</Link>
      </div>
    </header>
    
  );
};

export default User_Header;