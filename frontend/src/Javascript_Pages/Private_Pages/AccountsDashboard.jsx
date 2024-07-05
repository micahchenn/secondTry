import React, { useEffect, useState } from 'react';
import '../../Styling_Pages/Private_Pages/AccountsDashboard.css';
import PortfolioAccountNameHeader from '../PortfolioAccountElements/JSX/PortfolioAccountNameHeader';
import api from '../../../src/api';
import AccountGeneralOverviewPage from '../PortfolioAccountElements/JSX/AccountGeneralOverviewPage';
import AccountTransactions from '../PortfolioAccountElements/JSX/AccountTransactions';
import AccountAnalytics from '../PortfolioAccountElements/JSX/AccountAnalytics';
import AccountMenuBarLine from '../PortfolioAccountElements/JSX/AccountMenuBarLine';
import ManageAccountsTest from '../PortfolioAccountElements/JSX/ManageAccountsTest';
import AccountCard from '../PortfolioAccountElements/JSX/AccountCard';
import DiversificationDashboardPage from '../PortfolioAccountElements/JSX/DiversificationDashboardPage';

function AccountsDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({ id: null, name: 'Portfolio Account', type: '', subtype: '' });
  const [selectedMenuItem, setSelectedMenuItem] = useState('General Information');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get('plaid/get-all-accounts-for-user');
        console.log('Accounts data:', response.data);
        setAccounts(response.data.accounts); 
        if (response.data.accounts.length > 0) {
          setSelectedAccount(response.data.accounts[0]);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'General Information':
        return <AccountGeneralOverviewPage selectedAccount={selectedAccount} accounts={accounts} handleAccountSelect={handleAccountSelect} />;
      case 'Analytics':
        return <AccountAnalytics selectedAccount={selectedAccount} accounts={accounts} handleAccountSelect={handleAccountSelect} />;
      case 'Diversification':
        return <DiversificationDashboardPage accountId={selectedAccount.id} />;
      case 'Transactions':
        return <AccountTransactions selectedAccount={selectedAccount} accounts={accounts} handleAccountSelect={handleAccountSelect} />;
      case 'Accounts':
        return (
          <div className="accounts-grid">
            {accounts.map((account, index) => (
              <AccountCard key={account.id} account={account} index={index} handleAccountSelect={handleAccountSelect} />
            ))}
          </div>
        );
      case 'Manage Accounts':
        return <ManageAccountsTest selectedAccount={selectedAccount} accounts={accounts} handleAccountSelect={handleAccountSelect} />;
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
