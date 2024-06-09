/**
 * ESG_Score.jsx
 * 
 * This component fetches and displays the Environmental, Social, and Governance (ESG) score for a given stock symbol.
 * The ESG score is displayed as a circular progress bar using the react-circular-progressbar library.
 * 
 * Props:
 * - symbol: The stock symbol for which the ESG score is to be fetched and displayed.
 * 
 * State:
 * - data: The ESG score data fetched from the API. It's initially null and gets updated when the API call completes.
 * 
 * Dependencies:
 * - React: Used for defining the component and managing state.
 * - react-circular-progressbar: Used for displaying the ESG score as a circular progress bar.
 * - api: Used to fetch the ESG score data.
 * 
 * CSS:
 * - ESG_Risk_Score.css: Contains the styles for this component.
 * 
 * Author: Micah Chen
 * Date: 06/09/2024
 */


import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import api from '../../../../api';
import '../CSS/ESG_Risk_Score.css';

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

  const averageScore = data ? (data.average_environmental_score + data.average_social_score + data.average_governance_score) / 3 : 0;
  const percentage = (averageScore / 5) * 100; // Assuming the max score is 5

  return (
    <div className="ESG_Risk_Score">
      <h2>ESG Risk Sco2</h2>
      <div style={{ width: '50px', height: '50px' }}> {/* Adjust these values to change the size of the circular progress bar */}
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      styles={buildStyles({
        textSize: '16px',
        pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
        textColor: '#f88',
        trailColor: '#d6d6d6',
      })}
    />
  </div>
      
    </div>
  );
};

export default ESG_Score;