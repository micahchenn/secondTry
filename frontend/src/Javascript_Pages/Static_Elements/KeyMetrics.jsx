import React, { useState, useEffect } from 'react';
import api from '../../api';
import '../../Styling_Pages/Static_Elements/KeyMetrics.css';

const KeyMetrics = ({ symbol }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`stocks/get-company-profile/${symbol}`);
        setData(response.data[0]); // Assuming the response is an array and we need the first element
      } catch (error) {
        console.error('Error fetching key metrics:', error);
      }
    };

    fetchData();
  }, [symbol]);

  const formatNumber = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toString();
  };

  return (
    <div className="key-metrics-container">
      {data ? (
        <>
          <h2 className="key-metrics-header">Key Metrics</h2>
          <hr className="key-metrics-divider" />
          <div className="key-metrics-grid">
            <div className="key-metrics-item">
              <strong>Market Cap:</strong>
              <p>{formatNumber(data.mktCap)}</p>
            </div>
            <div className="key-metrics-item">
              <strong>Beta:</strong>
              <p>{data.beta}</p>
            </div>
            <div className="key-metrics-item">
              <strong>Average Volume:</strong>
              <p>{formatNumber(data.volAvg)}</p>
            </div>
            <div className="key-metrics-item">
              <strong>Last Dividend:</strong>
              <p>${data.lastDiv}</p>
            </div>
            <div className="key-metrics-item">
              <strong>52-Week Low:</strong>
              <p>{data.range.split('-')[0]}</p>
            </div>
            <div className="key-metrics-item">
              <strong>52-Week High:</strong>
              <p>{data.range.split('-')[1]}</p>
            </div>
          </div>
        </>
      ) : (
        <p className="key-metrics-filler-text">Loading...</p>
      )}
    </div>
  );
};

export default KeyMetrics;