import React, { useState, useEffect } from 'react';
import api from '../../api';
import '../../Styling_Pages/Static_Elements/StockPagePortfolioSummary.css';

const IndividualStockSecurityInformation = ({ symbol }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`plaid/get-account-info-related-to-symbol/${symbol}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [symbol]);

  const renderTableData = () => {
    if (!data || !data.accounts) {
      return (
        <tr>
          <td colSpan="7">You currently do not own any {symbol}</td>
        </tr>
      );
    }

    
    const overall = {
      accountName: 'Overall Portfolio',
      costBasis: parseFloat(data.total_cost_basis).toFixed(2),
      marketValue: parseFloat(data.total_asset_value).toFixed(2),
      shares: parseFloat(data.total_portfolio_shares).toFixed(2),
      dayChange: '-',
      unrealizedGainLoss: '-',
      portfolioPercentage: (parseFloat(data.total_asset_percentage) * 100).toFixed(2) + '%',
    };

    const accounts = data.accounts.map((account, index) => {
      return {
        accountName: `${account.institution_name} ${account.name}`,  // Use the institution_name field
        costBasis: parseFloat(account.total_cost).toFixed(2),
        marketValue: parseFloat(account.holdings[0].institution_value).toFixed(2),
        shares: parseFloat(account.holdings[0].quantity).toFixed(2),
        dayChange: '-',
        unrealizedGainLoss: '-',
        portfolioPercentage: (parseFloat(account.portfolio_percentage) * 100).toFixed(2) + '%',
      };
    });

    return [overall, ...accounts].map((row, index) => (
      <tr key={index}>
        <td>{row.accountName}</td>
        <td>${row.costBasis}</td>
        <td>${row.marketValue}</td>
        <td>{row.shares}</td>
        <td>{row.dayChange}</td>
        <td>{row.unrealizedGainLoss}</td>
        <td>{row.portfolioPercentage}</td>
      </tr>
    ));
  };

  return (
    <div className="stock-info-container">
      <table className="stock-info-table">
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Cost Basis</th>
            <th>Market Value</th>
            <th>Shares</th>
            <th>Day Change</th>
            <th>Unrealized Gain/Loss</th>
            <th>Percentage of Portfolio</th>
          </tr>
        </thead>
        <tbody>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default IndividualStockSecurityInformation;