import React from 'react';
import AccountCard from './AccountCard';
import '../CSS/AllAccountCardsPage.css';

const AllAccountCardsPage = ({ accounts }) => {
  return (
    <div className="account-cards-container">
      {accounts.map(account => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
};

export default AllAccountCardsPage;
