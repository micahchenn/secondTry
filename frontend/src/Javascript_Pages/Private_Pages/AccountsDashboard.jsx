import React, { useState, useEffect } from 'react';
import '../../Styling_Pages/Private_Pages/AccountsDashboard.css'; // Corrected the import path
import PortfolioAccountNameHeader from '../PortfolioAccountElements/JSX/PortfolioAccountNameHeader';
import api from '../../../src/api'; // Adjust the import path to where your API is defined
import AccountGeneralOverviewPage from '../PortfolioAccountElements/JSX/AccountGeneralOverviewPage'; // Adjust the import path as necessary
import AccountTransactions from '../PortfolioAccountElements/JSX/AccountTransactions'; // Adjust the import path as necessary
import AccountAnalytics from '../PortfolioAccountElements/JSX/AccountAnalytics'; // Adjust the import path as necessary
import AccountMenuBarLine from '../PortfolioAccountElements/JSX/AccountMenuBarLine';

function AccountsDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({ id: null, name: 'Portfolio Account' });
  const [selectedMenuItem, setSelectedMenuItem] = useState('General Information');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get('plaid/get-all-accounts-for-user');
        console.log('Accounts data:', response.data);
        setAccounts(response.data.accounts); // Assuming the response has an accounts array
        if (response.data.accounts.length > 0) {
          setSelectedAccount({
            id: response.data.accounts[0].id,
            name: response.data.accounts[0].official_name
          }); // Set the first account as the initial selected account
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'General Information':
        return <AccountGeneralOverviewPage selectedAccount={selectedAccount} accounts={accounts} handleAccountSelect={handleAccountSelect} />;
      case 'Analytics':
        return <AccountAnalytics selectedAccount={selectedAccount} accounts={accounts} handleAccountSelect={handleAccountSelect} />;
      case 'Transactions':
        return <AccountTransactions selectedAccount={selectedAccount} accounts={accounts} handleAccountSelect={handleAccountSelect} />;
      default:
        return null;
    }
  };

  return (
    <div className="accounts-dashboard__container">
      <div className="accounts-dashboard__account-name">
        <PortfolioAccountNameHeader accountName={selectedAccount.name} />
      </div>
      <div className="accounts-dashboard__menu-bar">
        <AccountMenuBarLine selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem} />
      </div>
      <div className="accounts-dashboard__content">
        {renderContent()}
      </div>
    </div>
  );
}

export default AccountsDashboard;
