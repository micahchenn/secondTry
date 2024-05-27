
import api from '../../api';
import '../../Styling_Pages/Private_Pages/Investments_Summary.css';
import React, { useState, useEffect } from 'react';

import { Table } from 'react-bootstrap';

const InvestmentsSummary = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/plaid/test-endpoint');
                setData(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="investments-summary">
            {data.accounts.map((account, index) => (
                <div key={index}>
                    <h2>Account: {account.name}</h2>
                    <p>Official Name: {account.official_name}</p>
                    <p>Type: {account.type}</p>
                    <p>Subtype: {account.subtype}</p>
                    <p>Institution ID: {account.institution_id}</p>

                    <h3>Holdings:</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Security Name</th>
                                <th>Cost Basis</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {account.holdings.map((holding, index) => (
                                <tr key={index}>
                                    <td>{holding.security.name}</td>
                                    <td>{holding.cost_basis}</td>
                                    <td>{holding.quantity}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ))}
        </div>
    );
};

export default InvestmentsSummary;