import React from 'react';
import './Accounts.css'; // Ensure you have the corresponding CSS file for styling

const Accounts = ({ accounts }) => {
  return (
    <div className="accounts-container">
      {accounts.length === 0 ? (
        <div className="error-message">No accounts available.</div>
      ) : (
        accounts.map(account => (
          <div key={account.id} className="account-item" onClick={() => console.log(`Clicked on ${account.name}`)}>
            <div className="account-details">
              <div>
                <div className="account-name">{account.name}</div>
                <div className="account-mask">{account.mask}</div>
              </div>
              <div className="balance">
                ${Number(account.current_balance).toLocaleString()}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Accounts;
