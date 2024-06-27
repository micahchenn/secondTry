import React, { useState, useEffect } from 'react';
import api from '../../../../api';
import '../CSS/ESGRiskScore.css';

const ESGRiskScore = ({ symbol }) => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await api.get(`/stocks/get-ESG-risk-score/${symbol}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [symbol]);

  return (
    <div className="ESG_Risk_Score">
      <h2>ESG Risk Score</h2>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default ESGRiskScore;