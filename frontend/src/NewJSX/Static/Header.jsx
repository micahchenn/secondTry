import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Header.css';
import Logo from '../../Styling_Pages/Public_Pictures/Harbinger_Logo.png';

const Header = () => {
  const location = useLocation();

  if (location.pathname !== "/welcome" && location.pathname !== "/login" && location.pathname !== "/signup") {
    return null;
  }

  return (
    <header className="header navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="https://harbinger.framer.website">
          <img src={Logo} alt="Harbinger Logo" className="logo" />
          <span className="navbar-text harbinger-text">Harbinger</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="https://harbinger.framer.website/quantara">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">What We Offer</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Invest</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link hover-login" to="/login">Log in</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link header-signup" to="/signup">Sign up</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
