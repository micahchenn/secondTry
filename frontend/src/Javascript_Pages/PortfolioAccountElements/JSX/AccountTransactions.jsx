import React, { useEffect, useState } from 'react';
import api from '../../../api'; // Adjust the import path to where your API is defined

const AccountTransactions = ({ selectedAccount }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get(`plaid/get-investment-transactions/${selectedAccount.id}/1M`);
        console.log('Transactions:', response.data);
        setTransactions(response.data.transactions); // Store the transactions data in state
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    if (selectedAccount && selectedAccount.id) { // Ensure id is not null or undefined
      fetchTransactions();
    }
  }, [selectedAccount]);

  return (
    <div>
      <h1>Account Transactions</h1>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              {transaction.name}: ${transaction.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
};

export default AccountTransactions;
