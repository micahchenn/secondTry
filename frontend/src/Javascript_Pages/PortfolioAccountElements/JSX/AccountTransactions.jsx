import React from 'react';

function AccountTransactions() {
  return (
    <div>
      <h1>Account Transactions</h1>
      {/* Dummy transactions list */}
      <ul>
        <li>Transaction 1: $100</li>
        <li>Transaction 2: -$50</li>
        <li>Transaction 3: $200</li>
      </ul>
    </div>
  );
}

export default AccountTransactions;