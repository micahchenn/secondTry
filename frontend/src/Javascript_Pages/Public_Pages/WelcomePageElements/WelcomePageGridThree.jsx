import React from 'react';
import Picture from '../../../Styling_Pages/Public_Pictures/QuantaraPP.png';
import '../WelcomePageElements/CSS/WelcomePageGridThree.css';

const WelcomePageGridThree = () => {
  return (
    <div className="welcome-page-grid-3-unique-12">
      <div className="section-content-unique-12">
      </div>
      <div className="background-image-unique-12">
        <img src={Picture} alt="Background" className="full-image-unique-12" />
      </div>
    </div>
  );
};

export default WelcomePageGridThree;
