import React from 'react';
import '../WelcomePageElements/CSS/WelcomePageFooter.css'; // Add the relevant CSS file for styling
import Instagram from '../../../Styling_Pages/Public_Pictures/Instagram.png';
import Twitter from '../../../Styling_Pages/Public_Pictures/Twitter.png';


const WelcomePageFooter = () => {
  return (
    <footer className="footer-unique-jamisen">
      <div className="footer-top-line-unique-jamisen"></div>
      <div className="footer-content-unique-jamisen">
        <div className="footer-section-unique-jamisen">
          <h3 className="footer-title-unique-jamisen">Products</h3>
          <ul className="footer-list-unique-jamisen">
            <li><a href="/courses">Portfolio Manager</a></li>
            <li><a href="/tutorials">Market Research</a></li>
            <li><a href="/pricing">Quantara by Harbinger</a></li>
            <li><a href="/pricing">Insider Tracking</a></li>
          </ul>
        </div>
        <div className="footer-section-unique-jamisen">
          <h3 className="footer-title-unique-jamisen">Company</h3>
          <ul className="footer-list-unique-jamisen">
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/contact">Meet our Team</a></li>
          </ul>
        </div>
        <div className="footer-section-unique-jamisen">
          <h3 className="footer-title-unique-jamisen">Resources</h3>
          <ul className="footer-list-unique-jamisen">
            <li><a href="/downloads">Learn</a></li>
            <li><a href="/community">FAQ</a></li>
            <li><a href="mailto:harbingerfintech@gmail.com">harbingerfintech@gmail.com</a></li>


          </ul>
        </div>
        <div className="footer-section-unique-jamisen">
          <h3 className="footer-title-unique-jamisen">Follow Us</h3>
          <div className="social-icons-unique-jamisen">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer"><img src={Twitter} alt="Twitter" /></a>
            <a href="https://instagram.com/harbingerfintech" target="_blank" rel="noopener noreferrer"><img src={Instagram} alt="Instagram" /></a>
          </div>
        </div>
      </div>
      <div className="footer-separator-line-unique-jamisen"></div>
      <div className="footer-bottom-unique-jamisen">
        <p>&copy; 2024 Harbinger Fintech</p>
        <div className="footer-links-unique-jamisen">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/privacy">English</a>
        </div>
      </div>
    </footer>
  );
};

export default WelcomePageFooter;
