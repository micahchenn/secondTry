import React from 'react';
import '../CSS/PortfolioAccountNameHeader.css';
function PortfolioAccountNameHeader({ accountName }) {
  return (
    <div className="portfolio-account-name-header">
      {accountName || 'Portfolio Account'}
    </div>
  );
}

export default PortfolioAccountNameHeader;
