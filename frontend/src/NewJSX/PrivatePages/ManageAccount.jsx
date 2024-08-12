import React, { useState, useEffect } from 'react';
import Layout from '../Static/Layout';
import api from '../../api'; // Adjust the import path to where your API is defined
import { ListGroup, Button, Spinner, Alert, Modal } from 'react-bootstrap';
import './ManageAccount.css'; // Adjust the import path to where your CSS file is located

const ManageAccounts = () => {
  const [plaidUsers, setPlaidUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get('/plaid/get-all-plaid-users/');
        setPlaidUsers(response.data.plaid_users);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const handleRemovePlaidUser = async (plaidUserId) => {
    try {
      setLoading(true);
      const response = await api.post(`/plaid/remove-plaid-user/${plaidUserId}/`);
      setUpdateStatus(response.data.success || response.data.error);
      setPlaidUsers(plaidUsers.filter(user => user.id !== plaidUserId));
    } catch (error) {
      console.error('Error removing Plaid user:', error);
    } finally {
      setLoading(false);
      setConfirmRemove(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date available';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <Layout>
      <div className="manage-accounts">
        <h1>Manage Accounts</h1>
        {updateStatus && (
          <Alert variant={updateStatus.includes('successfully') ? 'success' : 'danger'}>
            {updateStatus}
          </Alert>
        )}
        {loading ? <Spinner animation="border" /> : null}
        <ListGroup>
          {plaidUsers.map(plaidUser => (
            <ListGroup.Item key={plaidUser.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{plaidUser.institution_name}</strong>
                <br />
                {plaidUser.accounts.map(account => (
                  <div key={account.id}>
                    <small>Account: {account.name} • {account.mask}</small><br />
                    <small>Last updated: {formatDate(account.last_update_date)}</small><br />
                    <small>Update attempts: {account.update_attempts}</small>
                  </div>
                ))}
              </div>
              <Button variant="danger" onClick={() => setConfirmRemove(plaidUser.id)}>
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Modal show={!!confirmRemove} onHide={() => setConfirmRemove(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Remove</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to unlink this account?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setConfirmRemove(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleRemovePlaidUser(confirmRemove)}>
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
};

export default ManageAccounts;
