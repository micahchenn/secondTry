import React, { useState, useEffect } from 'react';
import api from '../../api';
import '../../Styling_Pages/Private_Pages/Investments_Summary.css';

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
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default InvestmentsSummary;