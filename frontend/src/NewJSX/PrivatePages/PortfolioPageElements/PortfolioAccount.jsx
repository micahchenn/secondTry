import React, { useState } from 'react';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './PortfolioAccount.css'; // Ensure you have the corresponding CSS file for styling

const PortfolioAccount = ({ selectedAccounts, setSelectedAccounts, accounts }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccountChange = (account_id) => {
    setSelectedAccounts(prevSelected =>
      prevSelected.includes(account_id)
        ? prevSelected.filter(id => id !== account_id)
        : [...prevSelected, account_id]
    );
  };

  const getLatestBalance = (latest_balance) => {
    return parseFloat(latest_balance || 0);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="portfolio-account-card glass-effect">
      <Card.Body>
        <div className="account-header">
          <h3>Select Accounts</h3>
          <Button variant="link" onClick={toggleExpanded} className="expand-button">
            {expanded ? <FaChevronUp /> : <FaChevronDown />}
          </Button>
        </div>
        <div className={`account-list ${expanded ? 'expanded' : ''}`}>
          <ListGroup>
            {accounts.map(account => (
              <ListGroupItem 
                key={account.account_id} 
                className={`account-item ${selectedAccounts.includes(account.account_id) ? 'selected' : ''}`}
                onClick={() => handleAccountChange(account.account_id)}
              >
                <div className="account-details">
                  <div>
                    <div className="account-name">{`${account.account_name || 'Unnamed Account'}`}</div>
                    <div className="account-mask">{`${account.subtype || 'N/A'} * ${account.mask || 'N/A'}`}</div>
                  </div>
                  <div className="account-balance">${getLatestBalance(account.latest_balance).toLocaleString()}</div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PortfolioAccount;
