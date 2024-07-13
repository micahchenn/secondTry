import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import '../WelcomePageElements/CSS/Grid2Section1.css';
import Robinhood from '../../../Styling_Pages/Public_Pictures/Robinhood.png';
import Wealthfront from '../../../Styling_Pages/Public_Pictures/Wealthfront.png';
import Sofi from '../../../Styling_Pages/Public_Pictures/Sofi.png';
import Webull from '../../../Styling_Pages/Public_Pictures/Webull.png';
import Vanguard from '../../../Styling_Pages/Public_Pictures/Vanguard.png';
import CharlesSchwab from '../../../Styling_Pages/Public_Pictures/CharlesSchwab.png';
import PlaidGraphic from '../../../Styling_Pages/Public_Pictures/PlaidGraphic.png';

const titles = [
  'Investment',
  'Retirement',
  'Crypto',
  'Roth',
  'Brokerage',
];

const logos = [
  Robinhood,
  Wealthfront,
  Sofi,
  Webull,
  Vanguard,
  CharlesSchwab,
];

const Grid2Section1 = React.forwardRef((props, ref) => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const titleInterval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3500); // Switch every 3.5 seconds

    return () => clearInterval(titleInterval);
  }, []);

  const handleGetStartedClick = () => {
    navigate('/signup');
  };

  return (
    <section id="section1" ref={ref} className="section">
      <div className="section-content">
        <div className="text-and-graphic-container">
          <div className="title-container">
            <h2 className="title-text">
              Track all your{' '}
              <TransitionGroup component="span" className="title-transition-group">
                <CSSTransition
                  key={currentTitleIndex}
                  timeout={1000}
                  classNames="slide"
                >
                  <span className="animated-title">{titles[currentTitleIndex]}</span>
                </CSSTransition>
              </TransitionGroup>
            </h2>
            <h2 className="title-text">accounts in one place.</h2>
            <p className="paragraph-unique3">Your investments should be diversified - where you track them shouldn't.</p>
            <div className="button-container-section1-unique3">
              <button
                className="auth-button-section1-unique3"
                onClick={handleGetStartedClick}
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="plaid-graphic-container">
            <img src={PlaidGraphic} alt="Plaid Graphic" className="plaid-graphic" />
          </div>
        </div>
        <div className="logo-slider-container">
          <div className="logo-slider">
            {logos.map((logo, index) => (
              <div key={index} className="logo-box">
                <img src={logo} alt="Bank Logo" className="logo" />
              </div>
            ))}
          </div>
          <div className="fade-left"></div>
          <div className="fade-right"></div>
        </div>
      </div>
    </section>
  );
});

export default Grid2Section1;
