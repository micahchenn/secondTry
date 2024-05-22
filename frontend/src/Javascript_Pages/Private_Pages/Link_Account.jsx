/** 
 * @file Link_Account.jsx
 * @author Micah Chen
 * @date Last Modified: 5/21/2024
 * @returns JSX.Element
 * 
 * Description: This file contains the implementation of the Link_Account component. This component allows users to link their bank accounts
 * using Plaid's Link module. The linking process is initiated by sending a POST request to the server to create a link token.
 * 
 * The link token is then used to open the Plaid Link module. If the user successfully links their account, the Plaid Link module
 * returns a public token. This public token is sent to the server to exchange it for an access token.
 * 
 * The access token is used to send requests to the Plaid API to get the user's account data. If the request is successful,
 * the accountData state is updated with the response data.
 * 
*/
 

import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import '../../Styling_Pages/Private_Pages/Link_Account.css'; // Import the CSS file

const Link_Account = () => {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useState(null);
    const [error, setError] = useState(null);

    const linkAccount = async () => {
        try {
            const response = await api.post('plaid/create-link-token/');  // First the user sends request to the server to create a link token 
            const linkToken = response.data.link_token; // The server sends back a link token one time short lived token that is used to open the Plaid Link module

            const handler = window.Plaid.create({
                token: linkToken, // The link token is passed to the Plaid Link module to open the module
                onSuccess: async (publicToken) => { // If the user successfully links their account, the Plaid Link module will return a public token
                    const response = await api.post('/plaid/get-access-token/', { publicToken });  // The public token is sent to the server to exchange it for an access token (then securely stored in server side)
                    const accessToken = response.data.access_token; // with the access token you can send requests to the Plaid API to get the user's account data
                    const userDataResponse = await api.post('/plaid/get-user-data/', { access_token: accessToken });
                    setAccountData(userDataResponse.data); 
                },
            });
            handler.open(); // The Plaid Link module is opened 
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    return (
        <div className="link-account">
            <h1>Link Accountasd</h1>
            <button className="link-account-button" onClick={linkAccount}>Link Account</button>
            {error && <p className="error-message">{error}</p>}
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