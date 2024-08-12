import React, { useEffect, useState, useCallback } from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import './AssetAllocation.css'; // Ensure you have the corresponding CSS file for styling

const AssetAllocation = ({ accountsData, selectedAccounts }) => {
  const [aggregatedData, setAggregatedData] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [title, setTitle] = useState('Asset Allocation for Net Worth');

  const aggregateSecurities = useCallback(() => {
    const securitiesMap = {};
    accountsData.forEach(account => {
      if (selectedAccounts.length === 0 || selectedAccounts.includes(account.account_id)) {
        account.securities.forEach(security => {
          const type = security.type || 'Unknown';
          if (!securitiesMap[type]) {
            securitiesMap[type] = {
              type,
              value: 0,
            };
          }
          securitiesMap[type].value += parseFloat(security.value) || 0;
        });
      }
    });

    const totalValue = Object.values(securitiesMap).reduce((acc, sec) => acc + sec.value, 0);
    setTotalBalance(totalValue);
    setAggregatedData(Object.values(securitiesMap));
  }, [accountsData, selectedAccounts]);

  useEffect(() => {
    if (accountsData.length > 0) {
      aggregateSecurities();
    }
  }, [accountsData, aggregateSecurities]);

  useEffect(() => {
    if (selectedAccounts.length === 1) {
      const selectedAccount = accountsData.find(account => account.account_id === selectedAccounts[0]);
      setTitle(`Asset Allocation for ${selectedAccount.account_name}`);
    } else if (selectedAccounts.length > 1) {
      setTitle(`Asset Allocation for ${selectedAccounts.length} Accounts`);
    } else {
      setTitle('Asset Allocation for Net Worth');
    }
  }, [selectedAccounts, accountsData]);

  const sortedAggregatedData = aggregatedData.sort((a, b) => b.value - a.value);

  return (
    <Card className="asset-allocation-card glass-effect">
      <Card.Body>
        <h2>{title}</h2>
        <div className="progress-bar-container">
          <ProgressBar style={{ height: '20px', borderRadius: '8px', overflow: 'hidden' }}>
            {sortedAggregatedData.map((security, index) => {
              const percentage = (security.value / totalBalance) * 100;
              const minWidth = percentage < 1 ? '4px' : `${percentage}%`; // Ensure very small percentages are visible
              return (
                <div 
                  key={security.type}
                  style={{ 
                    backgroundColor: getRandomColor(), 
                    width: minWidth,
                    height: '100%',
                    borderTopLeftRadius: index === 0 ? '8px' : '0',
                    borderBottomLeftRadius: index === 0 ? '8px' : '0',
                    borderTopRightRadius: index === sortedAggregatedData.length - 1 ? '8px' : '0',
                    borderBottomRightRadius: index === sortedAggregatedData.length - 1 ? '8px' : '0',
                  }} 
                />
              );
            })}
          </ProgressBar>
        </div>
        <div className="account-breakdown-list">
          {sortedAggregatedData.map(security => (
            <div key={security.type} className="account-breakdown-item">
              <span className="account-dot" style={{ backgroundColor: getRandomColor() }}></span>
              <span className="account-name">{security.type}</span>
              <span className="account-amount">
                ${security.value.toLocaleString()} ({((security.value / totalBalance) * 100).toFixed(2)}%)
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

export default AssetAllocation;
