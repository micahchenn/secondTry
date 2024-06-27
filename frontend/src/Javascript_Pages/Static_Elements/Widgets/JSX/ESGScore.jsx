import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import api from '../../../../api';
import '../CSS/ESGRiskScore.css';

const ESG_Score = ({ symbol }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/stocks/get-ESG-score/${symbol}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [symbol]);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Poor':
        return '#d9534f';
      case 'Neutral':
        return '#f0ad4e';
      case 'Good':
        return '#5cb85c';
      default:
        return '#f0ad4e';
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const overallScore = data.average_esg_score;
  const scorePercentage = (overallScore / 100) * 100; // Convert to percentage
  const scoreColor = getCategoryColor(data.esg_score_category);

  return (
    <>
      <svg height="0" xmlns="http://www.w3.org/2000/svg">
        <filter id="glow" width="300%" height="300%" x="-75%" y="-75%">
          <feMorphology operator="dilate" radius="4" in="SourceAlpha" result="thicken" />
          <feGaussianBlur in="thicken" stdDeviation="3" result="blurred" />
          <feFlood floodColor="rgba(255,255,255,0.6)" result="glowColor" />
          <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
          <feMerge>
            <feMergeNode in="softGlowColored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
      <div className="ESG_Risk_Score">
        <h2>ESG Score</h2>
        <div className="circular-progress-container">
          <CircularProgressbar
            value={scorePercentage}
            text={`${overallScore.toFixed(2)}`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: scoreColor,
              textColor: '#fff',
              trailColor: '#d6d6d6',
              backgroundColor: 'transparent',
              filter: 'url(#glow)',
            })}
          />
        </div>
        <div className="esg-label">{data.esg_score_category} investor sentiment</div>
      </div>
    </>
  );

};

export default ESG_Score;
