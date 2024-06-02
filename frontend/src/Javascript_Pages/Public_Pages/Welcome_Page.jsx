// Welcome_Page.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styling_Pages/Public_Pages/Welcome_Page.css';
import circleBlur from '../../Styling_Pages/Public_Pictures/Circle_Blur.png';

const Welcome_Page = () => {
  return (
    <div className="welcome-page">
      <div 
        className="blur-effect" 
        style={{ backgroundImage: `url(${circleBlur})` }} // Set the background image here
      ></div> {/* This will be the blurred background */}
      <div className="centered-content"> {/* Add this div */}
        <h1 className="welcome-text">Welcome!</h1>
        <p>This is a simple welcome page.</p>
        <p>This is a simple welcome page.</p>
        <Link to="/signup" className="auth-button">Get Started</Link>
        <br />
        <Link to="/login" className="auth-button">Log In</Link>
      </div>
      <div id="about-us" className="section"> {/* Add this div */}
        <h2>About Us</h2>
        <p>This is some information about us.</p>
      </div>
      <div id="what-we-offer" className="section"> {/* Add this div */}
        <h2>What We Offer</h2>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>
        <p>This is some information about what we offer.</p>

      </div>
      <div id="invest" className="section"> {/* Add this div */}
        <h2>Invest</h2>
        <p>This is some information about how to invest.</p>
      </div>

      <footer className="footer"> {/* Add this footer */}
        <div className="footer-content">
          <div id="resources" className="section">
            <h2>Resources</h2>
            <ul>
              <li><a href="resource1.pdf">Resource 1</a></li>
              <li><a href="resource2.pdf">Resource 2</a></li>
              <li><a href="resource3.pdf">Resource 3</a></li>
              {/* Add more resources as needed */}
            </ul>
          </div>
          <div id="contact" className="section">
            <h2>Contact Information</h2>
            <p>Email: info@example.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Main St, Anytown, USA</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome_Page;