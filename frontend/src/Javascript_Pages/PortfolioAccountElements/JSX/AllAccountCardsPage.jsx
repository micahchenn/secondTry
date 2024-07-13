import React from 'react';
import AccountCard from './AccountCard';
import ManageAccounts from './ManageAccountsx';
import '../CSS/AllAccountCardsPage.css';

const AllAccountCardsPage = ({ accounts }) => {
  return (
    <div>
      <div className="account-cards-container">
        {accounts.map(account => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
      <div className="manage-accounts-container">
        <ManageAccounts />
      </div>
    </div>
  );
};

export default AllAccountCardsPage;
