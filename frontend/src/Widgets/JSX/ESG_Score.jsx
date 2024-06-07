import React, { useState } from 'react';
import api from '../../api';
import '../CSS/ESG_Risk_Score.css';

const ESG_Score = ({ symbol }) => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await api.get(`/stocks/get-ESG-score/${symbol}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ESG_Risk_Score">
      ESG Risk Score
      <button onClick={fetchData}>Fetch Data</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
    );
};

export default ESG_Score;