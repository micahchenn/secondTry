import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import '../../Styling_Pages/Private_Pages/AccountsDashboard.css';
import PortfolioAccountNameHeader from '../PortfolioAccountElements/JSX/PortfolioAccountNameHeader';
import api from '../../../src/api';
import AccountGeneralOverviewPage from '../PortfolioAccountElements/JSX/AccountGeneralOverviewPage';
import AccountTransactions from '../PortfolioAccountElements/JSX/AccountTransactions';
import AccountAnalytics from '../PortfolioAccountElements/JSX/AccountAnalytics';
import ManageAccounts from '../PortfolioAccountElements/JSX/ManageAccounts';
import AccountCard from '../PortfolioAccountElements/JSX/AccountCard';
import DiversificationDashboardPage from '../PortfolioAccountElements/JSX/DiversificationDashboardPage';
import AccountMenuBarLine from '../PortfolioAccountElements/JSX/AccountMenuBarLine';

function AccountsDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [plaidUsers, setPlaidUsers] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { accountId } = useParams();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const accountsResponse = await api.get('plaid/get-all-accounts-for-user');
        const plaidUsersResponse = await api.get('plaid/get-all-plaid-users/');
        console.log('Accounts data:', accountsResponse.data);
        console.log('Plaid Users data:', plaidUsersResponse.data);
        setAccounts(accountsResponse.data.accounts);
        setPlaidUsers(plaidUsersResponse.data.plaid_users);
        if (accountsResponse.data.accounts.length > 0) {
          const account = accountsResponse.data.accounts.find(acc => acc.id === parseInt(accountId)) || accountsResponse.data.accounts[0];
          setSelectedAccount(account);
          if (accountId) {
            fetchAccountDetails(account.id);
          }
        }
      } catch (error) {
        console.error('Error fetching accounts or plaid users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [accountId]);

  const fetchAccountDetails = async (accountId) => {
    try {
      setLoading(true);
      const accountDetailsResponse = await api.get(`plaid/get-account-details/${accountId}`);
      console.log('Account details data:', accountDetailsResponse.data);
      setSelectedAccount(accountDetailsResponse.data); // Assuming this response contains detailed account info
    } catch (error) {
      console.error('Error fetching account details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    navigate(`/accounts/${account.id}/general-information`);
    fetchAccountDetails(account.id);
  };

  const handleUpdatePlaidUsers = async (plaidUserId, action) => {
    if (action === 'update') {
      try {
        const updatedPlaidUsersResponse = await api.get('plaid/get-all-plaid-users/');
        setPlaidUsers(updatedPlaidUsersResponse.data.plaid_users);
      } catch (error) {
        console.error('Error updating Plaid users:', error);
      }
    } else {
      setPlaidUsers(prevPlaidUsers => prevPlaidUsers.filter(plaidUser => plaidUser.id !== plaidUserId));
    }
  };

  return (
    <div className="accounts-dashboard__container">
      <div className="accounts-dashboard__account-name">
        <PortfolioAccountNameHeader accountName={selectedAccount ? selectedAccount.name : 'Portfolio Account'} />
      </div>
      <div className="accounts-dashboard__menu-bar">
        <AccountMenuBarLine />
      </div>
      <div className="accounts-dashboard__content">
        <Routes>
          <Route path="general-information" element={selectedAccount ? <AccountGeneralOverviewPage selectedAccount={selectedAccount} accounts={accounts} handleAccountSelect={handleAccountSelect} /> : <div>Loading...</div>} />
          <Route path="analytics" element={selectedAccount ? <AccountAnalytics selectedAccount={selectedAccount} accounts={accounts} handleAccountSelect={handleAccountSelect} /> : <div>Loading...</div>} />
          <Route path="diversification" element={selectedAccount ? <DiversificationDashboardPage accountId={selectedAccount.id} /> : <div>Loading...</div>} />
          <Route path="transactions" element={selectedAccount ? <AccountTransactions selectedAccount={selectedAccount} accounts={accounts} handleAccountSelect={handleAccountSelect} /> : <div>Loading...</div>} />
          <Route path="manage" element={<ManageAccounts plaidUsers={plaidUsers} loading={loading} onUpdatePlaidUsers={handleUpdatePlaidUsers} />} />
          <Route path="/" element={
            <div className="accounts-grid">
              {accounts.map((account, index) => (
                <AccountCard key={account.id} account={account} index={index} handleAccountSelect={handleAccountSelect} />
              ))}
            </div>
          } />
        </Routes>
      </div>
      <ManageAccounts plaidUsers={plaidUsers} loading={loading} onUpdatePlaidUsers={handleUpdatePlaidUsers} />
    </div>
  );
}

export default AccountsDashboard;
