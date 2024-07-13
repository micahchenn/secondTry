import React, { useEffect, useState } from 'react';
import AccountGeneralInformation from './AccountGeneralInformation';
import PortfolioValueChartPerformance from './PortfolioValueChartPerformance';
import api from '../../../api'; // Adjust the import path to where your API is defined
import '../CSS/AccountGeneralOverviewPage.css';
import AccountGeneralMoreDetailedInformation from './AccountGeneralMoreDetailedInformation';
import LoadingScreen from '../../../Javascript_Pages/Static_Elements/LoadingScreen'; // Import the loading screen
import AccountCard from './AccountCard'; // Import AccountCard component

const AccountGeneralOverviewPage = ({ selectedAccount = {}, accounts, handleAccountSelect }) => {
  const [accountDetails, setAccountDetails] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('1W');

  const { id, type = '', subtype = '' } = selectedAccount;
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const accountType = `${capitalizeFirstLetter(type)} ${capitalizeFirstLetter(subtype)}`;

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`plaid/get-portfolio-value-and-graph/${id}/${selectedTimePeriod}`);
        console.log('Account and portfolio data:', response.data);
        setAccountDetails(response.data); // Store the response data in state
        setPortfolioData(response.data.daily_values); // Store the historical values for the graph
        setError(false);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching account data:', error);
        setError(true);
        setLoading(false);
      }
    };

    if (id) { // Ensure id is not null or undefined
      fetchAccountData();
    }
  }, [id, selectedTimePeriod]); // Dependency array to trigger effect when id or selectedTimePeriod changes

  const timePeriods = [
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '1Y', value: '1Y' },
    { label: 'YTD', value: 'YTD' }
  ];

  const handleTimePeriodChange = (value) => {
    setLoading(true);
    setSelectedTimePeriod(value);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="accounts-dashboard__sections-wrapper">
      <div className="accounts-dashboard__header">
        <div className="account-type">
          <span>{accountType}</span>
        </div>
        <div className="time-period-selection">
          {timePeriods.map((period) => (
            <button
              key={period.value}
              className={`time-period-button ${selectedTimePeriod === period.value ? 'active' : ''}`}
              onClick={() => handleTimePeriodChange(period.value)}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
      <div className="time-period">
      </div>
      <div className="line-separator"></div>
      <div className="accounts-dashboard__account-details-wrapper">
        <div className="accounts-dashboard__general-information">
          {accountDetails && (
            <AccountGeneralInformation 
              details={accountDetails} 
              selectedTimePeriod={selectedTimePeriod} 
            />
          )}
        </div>
        <div className="accounts-dashboard__general-graph">
          {portfolioData ? (
            <PortfolioValueChartPerformance data={portfolioData} />
          ) : (
            <p>No data available for the selected timeframe.</p>
          )}
        </div>
      </div>
      <div className="accounts-dashboard__more-details-wrapper">
        <div className="accounts-dashboard__detailed-information">
          {accountDetails && <AccountGeneralMoreDetailedInformation accountId={selectedAccount.id} />}
          <p>Details go here...</p>
        </div>
        <div className="accounts-dashboard__accounts">
          {selectedAccount && (
            <AccountCard 
              account={selectedAccount} 
              index={accounts.indexOf(selectedAccount)} 
              handleAccountSelect={handleAccountSelect} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountGeneralOverviewPage;
