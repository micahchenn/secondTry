import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import '../CSS/EntropyHHI.css';

const EntropyHHI = ({ entropy, hhi }) => {
  const maxEntropy = Math.log(10); // Assuming 10 as the number of asset types

  const getHHIClassification = (hhi) => {
    if (hhi < 1500) return "Low Risk";
    if (hhi >= 1500 && hhi <= 2500) return "Moderate Risk";
    return "High Risk";
  };

  const getEntropyClassification = (entropy) => {
    const entropyPercentage = (entropy / maxEntropy) * 100;
    if (entropyPercentage > 75) return "Highly Diversified";
    if (entropyPercentage > 50) return "Moderately Diversified";
    return "Concentrated";
  };

  return (
    <div className="entropy-hhi-container-unique-8">
      <div className="entropy-container-unique-8">
        <div className="header-unique-8">
          Sector Entropy
          <FontAwesomeIcon icon={faInfoCircle} className="info-icon-unique-8" data-tooltip-id="entropy-tooltip-unique-8" />
          <ReactTooltip id="entropy-tooltip-unique-8" place="top" effect="solid" className="custom-tooltip-unique-8">
            <div className="tooltip-content-unique-8">
              <p className="description-unique-8"><strong>Entropy:</strong> Measures the diversity of asset types. Higher entropy means more diversity.</p>
              <p className="classification-unique-8">
                <strong>High Entropy:</strong> Highly diversified portfolio.<br />
                <strong>Low Entropy:</strong> Concentrated portfolio.
              </p>
            </div>
          </ReactTooltip>
        </div>
        <div className="bar-container-unique-8">
          <div
            className="bar-unique-8 entropy-bar-unique-8"
            style={{
              width: `${(entropy / maxEntropy) * 100}%`,
            }}
          ></div>
          <span className="value-unique-8">{entropy.toFixed(2)}</span>
        </div>
        <div className="entropy-explanation-unique-8">
          <strong>Entropy Classification:</strong> {getEntropyClassification(entropy)}
        </div>
      </div>
      <div className="hhi-container-unique-8">
        <div className="header-unique-8">
          Sector HHI
          <FontAwesomeIcon icon={faInfoCircle} className="info-icon-unique-8" data-tooltip-id="hhi-tooltip-unique-8" />
          <ReactTooltip id="hhi-tooltip-unique-8" place="top" effect="solid" className="custom-tooltip-unique-8">
            <div className="tooltip-content-unique-8">
              <p className="description-unique-8"><strong>HHI:</strong> Measures market concentration. Higher HHI indicates less competition.</p>
              <p className="classification-unique-8">
                <strong>Low HHI (&lt;1500):</strong> Highly diversified.<br />
                <strong>Moderate HHI (1500-2500):</strong> Some concentration.<br />
                <strong>High HHI (&gt;2500):</strong> Highly concentrated.
              </p>
            </div>
          </ReactTooltip>
        </div>
        <div className="bar-container-unique-8">
          <div
            className="bar-unique-8 hhi-bar-unique-8"
            style={{
              width: `${(hhi / 10000) * 100}%`,
            }}
          ></div>
          <span className="value-unique-8">{hhi.toFixed(2)}</span>
        </div>
        <div className="hhi-explanation-unique-8">
          <strong>HHI Classification:</strong> {getHHIClassification(hhi)}
        </div>
      </div>
    </div>
  );
};

export default EntropyHHI;
