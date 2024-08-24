import React, { useEffect, useState } from 'react';

import Layout from '../Static/Layout';
import PortfolioDailyChart from './PortfolioPageElements/PortfolioDailyChart';
import PortfolioAccount from './PortfolioPageElements/PortfolioAccount';
import AssetAllocation from './PortfolioPageElements/AssetAllocation';
import PortfolioAnalytics from './PortfolioPageElements/PortfolioAnalytics';
import { Container, Row, Col } from 'react-bootstrap';
import './PortfolioPage.css'; // Ensure you have the corresponding CSS file for styling
import api from '../../api';  // Adjust the import path as necessary

const PortfolioPage = () => {
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({
    performance: 0,
    diversification: 'N/A',
    riskAnalysis: 'N/A',
    volatility: 'N/A',
    roi: 0,
  });

  useEffect(() => {
    const fetchAccountsData = async () => {
      try {
        const response = await api.get('/plaid/get-portfolio-page-view/');
        setAccountsData(response.data.accounts || []); // Ensure accountsData is an array
        setAnalyticsData(response.data.analytics || analyticsData); // Fetch analytics data if available
        console.log(response.data.accounts); // Print the response JSON to console
      } catch (error) {
        console.error(error.response?.data?.error || error.message); // Log the error to the console
      }
    };

    fetchAccountsData();
  }, []);

  return (
    <Layout>
      <Container fluid className="portfolio-container">
        <Row>
          <Col md={8}>
            <div className="portfolio-daily-chart-section glass-effect">
              <PortfolioDailyChart selectedAccounts={selectedAccounts} accountsData={accountsData} />
            </div>
            <div className="portfolio-asset-allocation-section">
              <AssetAllocation accountsData={accountsData} selectedAccounts={selectedAccounts} />
            </div>
          </Col>
          <Col md={4}>
            <PortfolioAccount selectedAccounts={selectedAccounts} setSelectedAccounts={setSelectedAccounts} accounts={accountsData} />
            <PortfolioAnalytics analyticsData={analyticsData} /> {/* Add PortfolioAnalytics here */}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default PortfolioPage;
