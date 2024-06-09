import React, { useState, useEffect, useRef } from 'react';
import './Box.css';
import ESG_Score from '../JSX/ESG_Score';
import ESG_Risk_Score from '../JSX/ESG_Risk_Score';

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
        </div>
      ) : null}
      {selectedComponent === 'ESG_Score' && <ESG_Score symbol={symbol} />} 
      {selectedComponent === 'ESG_Risk_Score' && <ESG_Risk_Score symbol={symbol} />} 
    </div>
  );
};

export default Box2;