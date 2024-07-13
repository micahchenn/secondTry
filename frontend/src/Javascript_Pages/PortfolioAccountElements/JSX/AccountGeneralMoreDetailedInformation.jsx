import React, { useState, useEffect } from 'react';
import api from '../../../api'; // Adjust the import path to where your API is defined
import '../CSS/AccountGeneralMoreDetailedInformation.css'; // Adjust the import path to where your CSS file is located

function AccountGeneralMoreDetailedInformation({ accountId, topN = 3 }) {
  const [topHoldings, setTopHoldings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopHoldings = async () => {
      setLoading(true);
      try {
        const response = await api.get(`plaid/get-top-holdings/${accountId}/${topN}/`);
        // Convert percentage to number
        const holdingsWithConvertedPercentage = response.data.top_holdings.map(holding => ({
          ...holding,
          percentage: Number(holding.percentage),
        }));
        setTopHoldings(holdingsWithConvertedPercentage);
      } catch (error) {
        console.error('Error fetching top holdings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopHoldings();
  }, [accountId, topN]);

  return (
    <div className="account-general-more-detailed-information">
      <h1>Top {topN} Holdings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : topHoldings.length > 0 ? (
        <ul>
          {topHoldings.map((holding, index) => (
            <li key={index}>
              {holding.image ? (
                <img
                  src={holding.image}
                  alt={`${holding.name} logo`}
                  className="holding-image"
                />
              ) : (
                <div className="default-icon">
                  <span>{holding.name.charAt(0)}</span>
                </div>
              )}
              <strong>{holding.name}</strong>: ${holding.value.toLocaleString()} ({holding.percentage.toFixed(2)}%)
            </li>
          ))}
        </ul>
      ) : (
        <p>No holdings available.</p>
      )}
    </div>
  );
}

export default AccountGeneralMoreDetailedInformation;
