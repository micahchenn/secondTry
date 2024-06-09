import React, { useState } from 'react';
import './Box.css';
import ESG_Score from '../JSX/ESG_Score'; // import the ESG_Score component
import ESG_Risk_Score from '../JSX/ESG_Risk_Score'; // import the ESG_Risk_Score component

const Box4 = ({ symbol }) => { // Add symbol as a prop
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleItemClick = (componentName) => {
    setSelectedComponent(componentName);
    setDropdownOpen(false);
  };

  return (
    <div className="box">
      <div 
        onMouseEnter={() => setDropdownOpen(true)} 
        className="dropdown-button"
      >
        ⌄ 
      </div>
      {dropdownOpen ? (
        <div 
          className="dropdown-menu"
          onMouseEnter={() => setDropdownOpen(true)} 
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <div onClick={() => handleItemClick('ESG_Score')} className="dropdown-item">ESG Score</div>
          <div onClick={() => handleItemClick('ESG_Risk_Score')} className="dropdown-item">ESG Risk Score</div>
          {/* Add more dropdown items here */}
        </div>
      ) : null}
      {selectedComponent === 'ESG_Score' && <ESG_Score symbol={symbol} />} 
      {selectedComponent === 'ESG_Risk_Score' && <ESG_Risk_Score symbol={symbol} />} 
      {/* Pass the symbol prop to the ESG_Score and ESG_Risk_Score components */}
      {/* Render more components based on selectedComponent here */}
    </div>
  );
};

export default Box4;