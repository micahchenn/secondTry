import React, { useState } from 'react';
import './PortfolioAnalytics.css';

const PortfolioAnalytics = ({ analyticsData }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="portfolio-analytics glass-effect">
      <h3>Portfolio Analytics</h3>
      
      <div className="analytics-section">
        <div
          className="analytics-header"
          onClick={() => toggleSection('performance')}
        >
          Performance
        </div>
        {expandedSection === 'performance' && (
          <div className="analytics-content">
            <p>Performance: {analyticsData.performance}%</p>
            {/* Add more detailed performance analytics here */}
          </div>
        )}
      </div>

      <div className="analytics-section">
        <div
          className="analytics-header"
          onClick={() => toggleSection('diversification')}
        >
          Diversification
        </div>
        {expandedSection === 'diversification' && (
          <div className="analytics-content">
            <p>Diversification: {analyticsData.diversification}</p>
            {/* Add more detailed diversification analytics here */}
          </div>
        )}
      </div>

      <div className="analytics-section">
        <div
          className="analytics-header"
          onClick={() => toggleSection('riskAnalysis')}
        >
          Risk Analysis
        </div>
        {expandedSection === 'riskAnalysis' && (
          <div className="analytics-content">
            <p>Risk Analysis: {analyticsData.riskAnalysis}</p>
            {/* Add more detailed risk analysis analytics here */}
          </div>
        )}
      </div>

      <div className="analytics-section">
        <div
          className="analytics-header"
          onClick={() => toggleSection('volatility')}
        >
          Volatility
        </div>
        {expandedSection === 'volatility' && (
          <div className="analytics-content">
            <p>Volatility: {analyticsData.volatility}</p>
            {/* Add more detailed volatility analytics here */}
          </div>
        )}
      </div>

      <div className="analytics-section">
        <div
          className="analytics-header"
          onClick={() => toggleSection('roi')}
        >
          Return on Investment (ROI)
        </div>
        {expandedSection === 'roi' && (
          <div className="analytics-content">
            <p>Return on Investment: {analyticsData.roi}%</p>
            {/* Add more detailed ROI analytics here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioAnalytics;
