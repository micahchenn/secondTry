import React, { useState } from 'react';
import api from '../../api';

function UpdateDaily() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const updateData = async () => {
    try {
      const response = await api.post('/plaid/update_data/');
      setMessage(response.data.message);
      setError(null);
    } catch (error) {
      setError('An error occurred.');
      setMessage('');
      console.error(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center p-4">
        <h1 className="card-title mb-4">Update Daily Data</h1>
        <button className="btn btn-primary mb-3" onClick={updateData}>Update Data</button>
        {message && <p className="text-success">{message}</p>}
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
}

export default UpdateDaily;
