import React from 'react';
import '../../Styling_Pages/Public_Pages/Welcome_Page.css';
import circleBlur1 from '../../Styling_Pages/Public_Pictures/test.png';
import WelcomePageGridThree from '../Public_Pages/WelcomePageElements/WelcomePageGridThree.jsx';
import GridTwo from '../Public_Pages/WelcomePageElements/GridTwo.jsx'; 
import WelcomePageFooter from '../Public_Pages/WelcomePageElements/WelcomePageFooter.jsx'; // Import the new WelcomePageFooter component
import QNASection from './WelcomePageElements/QNASection.jsx';
const Welcome_Page = () => {
  return (
    <div className="welcome-page-unique-12">
      <div className="welcome-page-grid-1-unique-12">
        <img src={circleBlur1} alt="Circle Blur" className="circle-blur-unique-12" />
        <div className="left-aligned-content-unique-12">
          <h1 className="title-text-unique-12">
            <span className="title-line">The Future of</span>
            <br />
            <span className="title-line title-line2">Investment Management</span>
          </h1>
          <p className="subtitle-text-unique-12">Your All-in-One Solution for Tracking and Optimizing Your Portfolio</p>
          <div className="button-container-unique-12">
            <a href="/signup" className="auth-button-unique-12">Get Started</a>
            <a href="/login" className="text-button-unique-12">Login <span className="arrow-icon-unique-12">→</span></a>
          </div>
        </div>
      </div>

      <GridTwo /> 
      <WelcomePageGridThree />
      <QNASection />
      <WelcomePageFooter /> {/* Add the new WelcomePageFooter component here */}
    </div>
  );
};

export default Welcome_Page;
