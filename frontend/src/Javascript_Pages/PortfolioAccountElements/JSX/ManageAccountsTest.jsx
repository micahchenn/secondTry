import React, { useEffect, useState } from 'react';
import api from '../../../api'; // Adjust the import path to where your API is defined
import '../CSS/ManageAccountsTest.css'; // Adjust the import path to where your CSS file is located

const UserInstitutions = () => {
  const [plaidUsers, setPlaidUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlaidUsers = async () => {
      setLoading(true); // Prevent duplicate requests
      try {
        const response = await api.get('plaid/get-all-plaid-users/');
        console.log('Plaid Users:', response.data);
        setPlaidUsers(response.data.plaid_users);
      } catch (error) {
        console.error('Error fetching Plaid users:', error);
      } finally {
        setLoading(false); // Reset loading flag
      }
    };

    fetchPlaidUsers();
  }, []); // Only run once when the component mounts

  const handleRemovePlaidUser = async (plaidUserId) => {
    setLoading(true); // Set loading flag to true
    try {
      await api.post(`plaid/remove-plaid-user/${plaidUserId}/`);
      setPlaidUsers(plaidUsers.filter(plaidUser => plaidUser.id !== plaidUserId));
    } catch (error) {
      console.error('Error removing Plaid user:', error);
    } finally {
      setLoading(false); // Reset loading flag
    }
  };

  const handleUpdatePlaidUser = async (plaidUserId) => {
    setLoading(true); // Set loading flag to true
    try {
      await api.post(`plaid/update-plaid-user/${plaidUserId}/`);
      // Optionally, fetch the updated Plaid users again
      const response = await api.get('plaid/get-all-plaid-users/');
      setPlaidUsers(response.data.plaid_users);
    } catch (error) {
      console.error('Error updating Plaid user:', error);
    } finally {
      setLoading(false); // Reset loading flag
    }
  };

  return (
    <div className="user-institutions">
      <h1>User Institutions</h1>
      {plaidUsers.length > 0 ? (
        <ul>
          {plaidUsers.map((plaidUser) => (
            <li key={plaidUser.id}>
              <div>
                <strong>Institution Name:</strong> {plaidUser.institution_name}
              </div>
              <ul>
                {plaidUser.accounts.map(account => (
                  <li key={account.id}>
                    <div>
                      <strong>Account Name:</strong> {account.name} ({account.type} - {account.subtype})
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={() => handleRemovePlaidUser(plaidUser.id)} disabled={loading}>
                Remove
              </button>
              <button onClick={() => handleUpdatePlaidUser(plaidUser.id)} disabled={loading}>
                Update
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No institutions available.</p>
      )}
    </div>
  );
};

export default UserInstitutions;
