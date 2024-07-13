// WelcomePageGridThree.js
import React from 'react';
import test from '../../../Styling_Pages/Public_Pictures/Frame.png';
import circleBlur from '../../../Styling_Pages/Public_Pictures/Circle_Blur2.png';
import '../WelcomePageElements/CSS/WelcomePageGridThree.css';

const WelcomePageGridThree = () => {
  return (
    <div className="welcome-page-grid-3-unique-12">
      <h2>Grid 3 Content</h2>
      <img src={circleBlur} alt="Background Blur" className="background-blur" />
      <img src={test} alt="Test Image" className="foreground-image" />
    </div>
  );
};

export default WelcomePageGridThree;
