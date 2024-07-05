import React from 'react';
import '../CSS/AccountCard.css';

const gradients = [
  'linear-gradient(135deg, #B4DAFE, #543BB9)',
  'linear-gradient(135deg, #FF9A8B, #FF6A88)',
  'linear-gradient(135deg, #a8ff78, #78ffd6)',
  'linear-gradient(135deg, #f8ffae, #43c6ac)',
  'linear-gradient(135deg, #ffafbd, #ffc3a0)',
  'linear-gradient(135deg, #c9ffbf, #ffafbd)',
  'linear-gradient(135deg, #ee9ca7, #ffdde1)',
];

const AccountCard = ({ account, index, handleAccountSelect }) => {
  const currentBalance = account.balances[0].current;
  const availableBalance = account.balances[0].available;

  const cardStyle = {
    background: gradients[index % gradients.length],
  };

  return (
    <div className="account-card" style={cardStyle} onClick={() => handleAccountSelect(account)}>
      <h2>{account.official_name}</h2>
      <div className="account-details">
        <div className="account-info">
          <p>Account Value</p>
          <p>Amount Invested</p>
          <p>Available Cash</p>
        </div>
        <div className="account-values">
          <p>${currentBalance}</p>
          <p>${currentBalance}</p>
          <p>${availableBalance}</p>
        </div>
      </div>
      <div className="account-footer">
        <p>...{account.mask}</p>
        <p>{`${account.type.charAt(0).toUpperCase() + account.type.slice(1)} ${account.subtype}`}</p>
      </div>
    </div>
  );
};

export default AccountCard;
