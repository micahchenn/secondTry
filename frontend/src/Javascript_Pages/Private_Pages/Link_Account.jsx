import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import '../../Styling_Pages/Private_Pages/Link_Account.css'; // Import the CSS file

const Link_Account = () => {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useState(null);

    const linkAccount = async () => {
        try {
            const userId = localStorage.getItem('userId'); // replace this with how you're getting the user ID
            const data = { client_user_id: userId };
            const response = await api.post('plaid/create-link-token/', data);
            const linkToken = response.data.link_token;

            const handler = window.Plaid.create({
                token: linkToken,
                onSuccess: async (publicToken, metadata) => {
                    const response = await api.post('/plaid/get-access-token/', { publicToken });
                    const accessToken = response.data.access_token;
                    const userDataResponse = await api.post('/plaid/get-user-data/', { access_token: accessToken });
                    setAccountData(userDataResponse.data);
                    console.log(userDataResponse.data); // Log the response data
                },
            });

            handler.open();
        } catch (error) {
            console.error('Failed to link account:', error);
        }
    }

    return (
        <div className="link-account">
            <h1>Link Accountasd</h1>
            <button className="link-account-button" onClick={linkAccount}>Link Account</button>
            {accountData && (
    <table>
        <thead>
            <tr>
                <th>Institution ID</th>
                <th>Item ID</th>
                <th>Available Products</th>
                <th>Billed Products</th>
                {/* Add more headers as needed */}
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{accountData.item.institution_id}</td>
                <td>{accountData.item.item_id}</td>
                <td>{accountData.item.available_products.join(', ')}</td>
                <td>{accountData.item.billed_products.join(', ')}</td>
                {/* Add more cells as needed */}
            </tr>
        </tbody>
    </table>
)}
        </div>
    );
}

export default Link_Account;