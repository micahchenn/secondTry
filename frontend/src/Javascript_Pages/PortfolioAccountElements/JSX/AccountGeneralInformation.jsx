import React, { useEffect, useState } from 'react';
import '../CSS/AccountGeneralInformation.css'; // Adjust the import path to where your CSS file is located
import api from '../../../api'; // Adjust the import path to where your API is defined

function AccountGeneralInformation({ details }) {
  const [portfolioValues, setPortfolioValues] = useState(null);

  useEffect(() => {
    const fetchPortfolioValues = async () => {
      try {
        const response = await api.get(`plaid/get-portfolio-value-for-account/${details.id}/1Y`); // You can change '1W' to other date ranges like '1M', '1D', etc.
        console.log('Portfolio values:', response.data);
        setPortfolioValues(response.data); // Store the portfolio values data in state
      } catch (error) {
        console.error('Error fetching portfolio values:', error);
      }
    };

    if (details && details.id) { // Ensure id is not null or undefined
      fetchPortfolioValues();
    }
  }, [details]);

  return (
    <div className="account-general-information">
      <h2 className="account-type-general-information">{details.type + ' ' + details.subtype}</h2>
      <h2 className="account-value-general-information">{'$' + details.balances[0].current}</h2>
      <div className="account-detail">
        <pre>{JSON.stringify(details, null, 2)}</pre> {/* Display the JSON content */}
      </div>
      {portfolioValues && (
        <div className="portfolio-values">
          <h2>Portfolio Values</h2>
          <pre>{JSON.stringify(portfolioValues, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default AccountGeneralInformation;
