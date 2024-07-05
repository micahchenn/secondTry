import React, { useState, useEffect } from 'react';
import api from '../../../../api';
import '../CSS/TopIndexPerformance.css'; // Make sure to create and style this CSS file as needed

const TopIndexPerformance = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get('/stocks/get-market-indices-lite-most-popular');
      console.log(response.data); // Print the JSON data to the console
      if (response.data && Array.isArray(response.data.indices)) {
        setData(response.data.indices);
      } else {
        console.error('Unexpected response data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="TopIndexPerformance">
      <h2>Top Index Performance</h2>
      <div className="indices-wrapper">
        {data.length > 0 ? (
          data.map((indexItem, index) => (
            <div className="index-item" key={index}>
              <h3>{indexItem.name} ({indexItem.symbol})</h3>
              <p>Price: {indexItem.price}</p>
              <p>Change: {indexItem.change}</p>
              <p>Change Percentage: {indexItem.changesPercentage}%</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TopIndexPerformance;
