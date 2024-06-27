import React, { useState, useEffect, useRef } from 'react';
import './Box.css';
import ESGScore from '../JSX/ESGScore';
import ESGRiskScore from '../JSX/ESGRiskScore';
import CompanyPicture from '../JSX/CompanyPicture';
const Box2 = ({ symbol }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const node = useRef();

  const handleItemClick = (componentName) => {
    setSelectedComponent(componentName);
    setDropdownOpen(false);
  };

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    setDropdownOpen(false);
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="box" ref={node}>
      <div 
        onClick={() => setDropdownOpen(!dropdownOpen)} 
        className="dropdown-button"
      >
        ⌄ 
      </div>
      {dropdownOpen ? (
        <div 
          className="dropdown-menu"
        >
          <div onClick={() => handleItemClick('ESG_Score')} className="dropdown-item">ESG Score</div>
          <div onClick={() => handleItemClick('ESG_Risk_Score')} className="dropdown-item">ESG Risk Score</div>
          <div onClick={() => handleItemClick('Logo')} className="dropdown-item">Logo</div>
        </div>
      ) : null}
      {selectedComponent === 'ESG_Score' && <ESGScore symbol={symbol} />} 
      {selectedComponent === 'ESG_Risk_Score' && <ESGRiskScore symbol={symbol} />} 
      {selectedComponent === 'Logo' && <CompanyPicture symbol={symbol} />} 
    </div>
  );
};

export default Box2;