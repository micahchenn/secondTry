import React, { useState, useEffect } from 'react';
import api from '../../../../api';
import '../CSS/CompanyPicture.css';

const CompanyPicture = ({ symbol }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`stocks/get-company-profile/${symbol}`);
        setData(response.data[0]); // Assuming the response is an array and we need the first element
      } catch (error) {
        console.error('Error fetching company profile:', error);
      }
    };

    fetchData();
  }, [symbol]);

  return (
    <div className="company-picture-container">
      {data && (
        <>
          <h2 className="company-name-widget">{data.companyName}</h2>
          <img src={data.image} alt={`${symbol} logo`} className="company-logo-widget" />
        </>
      )}
    </div>
  );
};

export default CompanyPicture;
