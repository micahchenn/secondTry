import React, { useState } from 'react';
import api from '../../../api'; // Adjust the import path to where your API is defined
import '../CSS/ManageAccounts.css'; // Adjust the import path to where your CSS file is located
import LoadingScreen from '../../../Javascript_Pages/Static_Elements/LoadingScreen'; // Import the loading screen

const ManageAccounts = ({ plaidUsers, loading, onUpdatePlaidUsers }) => {
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleRemovePlaidUser = async (plaidUserId) => {
    try {
      await api.post(`plaid/remove-plaid-user/${plaidUserId}/`);
      onUpdatePlaidUsers(plaidUserId, 'remove');
    } catch (error) {
      console.error('Error removing Plaid user:', error);
    } finally {
      setConfirmRemove(null);
    }
  };

  const handleUpdatePlaidUser = async (plaidUserId) => {
    try {
      const response = await api.post(`plaid/update-plaid-user/${plaidUserId}/`);
      const result = response.data; // Assuming the API library parses JSON automatically
      setUpdateStatus(result.message);
      if (result.success) {
        onUpdatePlaidUsers(plaidUserId, 'update');
      }
    } catch (error) {
      console.error('Error updating Plaid user:', error);
      setUpdateStatus(error.response.data.message || 'Failed to update user.');
    } finally {
      setTimeout(() => setUpdateStatus(null), 3000); // Hide the status message after 3 seconds
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date available';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  return (
    <div className="manage-accounts">
      <h1>Manage Accounts</h1>
      {updateStatus && (
        <div className={`update-status ${updateStatus.includes('successfully') ? 'success' : 'failed'}`}>
          {updateStatus}
        </div>
      )}
      {loading ? <LoadingScreen /> : null}
      {plaidUsers.length > 0 ? (
        <ul className="institutions-list">
          {plaidUsers.map((plaidUser) => (
            <li key={plaidUser.id} className="institution-item">
              <div className="institution-header">
                <div className="institution-logo">
                  {plaidUser.institution_name.charAt(0)}
                </div>
                <div className="institution-info">
                  <strong>{plaidUser.institution_name}</strong>
                  <span className="last-updated">
                    Updated {formatDate(plaidUser.accounts[0]?.last_update_date)}
                  </span>
                  <span className="update-attempts">
                    Update Attempts: {plaidUser.accounts[0]?.update_attempts}
                  </span>
                </div>
                <button onClick={() => handleUpdatePlaidUser(plaidUser.id)} disabled={loading} className="update-button">
                  Update
                </button>
              </div>
              <ul className="accounts-list">
                {plaidUser.accounts.map((account) => (
                  <li
                    key={account.id}
                    className={`account-item ${selectedAccount?.id === account.id ? 'selected' : ''}`}
                    onMouseEnter={() => handleAccountSelect(account)}
                    onClick={() => handleAccountSelect(account)}
                  >
                    <div className="account-name">{account.name} • {account.mask}</div>
                    <div className="account-balance">${parseFloat(account.balances[0].current).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
              <button onClick={() => setConfirmRemove(plaidUser.id)} disabled={loading} className="remove-button">
                Remove
              </button>
              {confirmRemove === plaidUser.id && (
                <div className="confirm-remove">
                  <p>Are you sure you want to unlink this account?</p>
                  <div className="confirm-remove-buttons">
                    <button className="confirm-remove-yes" onClick={() => handleRemovePlaidUser(plaidUser.id)}>Yes</button>
                    <button className="confirm-remove-no" onClick={() => setConfirmRemove(null)}>No</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No institutions available.</p>
      )}
    </div>
  );
};

export default ManageAccounts;
