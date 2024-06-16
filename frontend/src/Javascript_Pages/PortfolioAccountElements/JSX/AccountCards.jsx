import React from 'react';
import api from '../../../api'; // Adjust the import path to where your API is defined
import '../CSS/AccountCards.css'; // Adjust the import path to where your CSS file is located

function AccountCards({ accounts, onSelectAccount }) {
  const handleAccountClick = async (accountId) => {
    try {
      const response = await api.get(`plaid/get-one-account-information-for-user/${accountId}`);
      console.log('Account detail:', response.data);
      const accountData = {
        id: response.data.id,
        name: response.data.official_name,
        balances: response.data.balances // You can include more details if necessary
      };
      onSelectAccount(accountData); // Pass the selected account information to the parent component
    } catch (error) {
      console.error('Error fetching account details:', error);
    }
  };

  return (
    <div className="account-cards">
      {accounts.length > 0 ? (
        accounts.map((account, index) => (
          <div key={account.id} className={`account-card gradient-${index % 5}`} onClick={() => handleAccountClick(account.id)}>
            <div className="account-card-content">
              <h3 className="account-name">{account.name}</h3>
              <p className="account-value">${account.balances[0].current}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No accounts found.</p>
      )}
    </div>
  );
}

export default AccountCards;
