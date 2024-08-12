import React, { useState } from 'react';
import api from '../../api';
import './LinkAccount.css';
import { FaLock } from 'react-icons/fa'; // Import the lock icon from react-icons

const LinkAccount = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const linkAccount = async () => {
        try {
            const response = await api.post('plaid/create-link-token/');
            const linkToken = response.data.link_token;

            const handler = window.Plaid.create({
                token: linkToken,
                onSuccess: async (publicToken) => {
                    await api.post('/plaid/get-access-token/', { publicToken });
                    setSuccess(true); // Set success state to true
                },
                onExit: (err, metadata) => {
                    if (err) {
                        setError(err.message);
                    }
                },
            });
            handler.open();
        } catch (error) {
            setError(error.response?.data?.error || error.message);
        }
    };

    return (
        <div className="link-account-container">
            <div className="link-account-card">
                <FaLock className="link-account-icon" />
                <h1 className="link-account-title">Link Your Account</h1>
                <div className="link-account-description">
                    <span className="link-account-description-text">Easily link your bank account to manage your finances seamlessly.</span>
                </div>
                {!success ? (
                    <>
                        <button className="link-account-button" onClick={linkAccount}>Link Account</button>
                        {error && <p className="link-account-error">{error}</p>}
                    </>
                ) : (
                    <p className="link-account-success">Your account has been successfully linked!</p>
                )}
                <div className="link-account-links">
                    <a href="/faq" className="link-account-faq">FAQ</a>
                    <a href="/manage-accounts" className="link-account-manage">Manage Accounts</a>
                </div>
            </div>
        </div>
    );
};

export default LinkAccount;
