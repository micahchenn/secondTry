import React, { useEffect, useState } from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import './DashboardBreakdown.css'; // Ensure you have the corresponding CSS file for styling

const DashboardBreakdown = ({ accounts }) => {
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const total = accounts.reduce((acc, account) => acc + parseFloat(account.current_balance), 0);
    setTotalBalance(total);
  }, [accounts]);

  // Sort accounts by current_balance in descending order
  const sortedAccounts = accounts.sort((a, b) => b.current_balance - a.current_balance);

  return (
    <Card className="breakdown-card glass-effect">
      <Card.Body>
        <h3>Total Investments: ${totalBalance.toLocaleString()}</h3>
        <div className="progress-bar-container">
          <ProgressBar style={{ height: '20px', borderRadius: '8px', overflow: 'hidden' }}>
            {sortedAccounts.map((account, index) => {
              const percentage = (account.current_balance / totalBalance) * 100;
              const minWidth = percentage < 1 ? '4px' : `${percentage}%`; // Ensure very small percentages are visible
              return (
                <div 
                  key={account.id}
                  style={{ 
                    backgroundColor: getRandomColor(), 
                    width: minWidth,
                    height: '100%',
                    borderTopLeftRadius: index === 0 ? '8px' : '0',
                    borderBottomLeftRadius: index === 0 ? '8px' : '0',
                    borderTopRightRadius: index === sortedAccounts.length - 1 ? '8px' : '0',
                    borderBottomRightRadius: index === sortedAccounts.length - 1 ? '8px' : '0',
                  }} 
                />
              );
            })}
          </ProgressBar>
        </div>
        <div className="account-breakdown-list">
          {sortedAccounts.map(account => (
            <div key={account.id} className="account-breakdown-item">
              <span className="account-dot" style={{ backgroundColor: getRandomColor() }}></span>
              <span className="account-name">{account.name}</span>
              <span className="account-amount">
                ${account.current_balance.toLocaleString()} ({((account.current_balance / totalBalance) * 100).toFixed(2)}%)
              </span>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default DashboardBreakdown;
