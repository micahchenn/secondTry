import React, { useEffect, useState } from 'react';
import AccountCards from './AccountCards'; // Adjust the import path as necessary
import AccountGeneralInformation from './AccountGeneralInformation';
import api from '../../../api'; // Adjust the import path to where your API is defined
import '../CSS/AccountGeneralOverviewPage.css';

const AccountGeneralOverviewPage = ({ selectedAccount, accounts, handleAccountSelect }) => {
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await api.get(`plaid/get-one-account-information-for-user/${selectedAccount.id}`);
        console.log('Account detail:', response.data);
        setAccountDetails(response.data); // Store the response data in state
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    if (selectedAccount.id) { // Ensure id is not null or undefined
      fetchAccountDetails();
    }
  }, [selectedAccount.id]); // Dependency array to trigger effect when id changes

  return (
    <div className="accounts-dashboard__sections-wrapper">
      <div className="accounts-dashboard__account-details-wrapper">
        <div className="accounts-dashboard__general-information">
          {accountDetails && <AccountGeneralInformation details={accountDetails} />}
        </div>
        <div className="accounts-dashboard__general-graph">
          <h2>General Graph</h2>
          {/* Add your general graph content here */}
          <p>Graph goes here...</p>
        </div>
      </div>
      <div className="accounts-dashboard__more-details-wrapper">
        <div className="accounts-dashboard__detailed-information">
          <h2>More Detailed Information</h2>
          {/* Add your detailed information content here */}
          <p>Details go here...</p>
        </div>
        <div className="accounts-dashboard__accounts">
          <AccountCards accounts={accounts} onSelectAccount={handleAccountSelect} />
          <p>Account details go here...</p>
        </div>
      </div>
    </div>
  );
};

export default AccountGeneralOverviewPage;
