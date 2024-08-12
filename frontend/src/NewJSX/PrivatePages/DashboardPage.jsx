import React, { useState, useEffect } from 'react';
import Layout from '../Static/Layout';
import NetWorthChart from './DashboardPageElements/NetWorthChart'; // Adjust the import path as necessary
import DashboardBreakdown from './DashboardPageElements/DashboardBreakdown';
import { Container, Row, Col, Button } from 'react-bootstrap'; // Import Col, Row, and Container here
import './DashboardPage.css'; // Ensure you have the corresponding CSS file for styling
import Accounts from './DashboardPageElements/Accounts'; // Adjust the import path as necessary
import SubtypeBreakdown from './DashboardPageElements/SubtypeBreakdown'; // Import SubtypeBreakdown
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import icons
import api from '../../api'; // Adjust the import path as necessary

const Dashboard = () => {
  const [timeFrame, setTimeFrame] = useState('1M'); // Default time frame
  const [expanded, setExpanded] = useState(false); // State to manage expansion
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get('/plaid/get-accounts/');
        setAccounts(response.data.accounts);
      } catch (error) {
        setError(error.response?.data?.error || error.message);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <Layout>
      <Container fluid className="dashboard-container">
        <Row>
          <Col md={8}>
            <div className="net-worth-section glass-effect">
              <NetWorthChart timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
            </div>
            <DashboardBreakdown accounts={accounts} />
          </Col>
          <Col md={4}>
            <div className="performance-section glass-effect">
              <h3>Performance</h3>
              <p>Placeholder for now</p>
            </div>
            <div className={`accounts-section glass-effect ${expanded ? 'expanded' : ''}`}>
              <div className="accounts-header">
                <h3>Accounts</h3>
                <Button variant="link" onClick={toggleExpanded} className="expand-button">
                  {expanded ? <FaChevronUp /> : <FaChevronDown />}
                </Button>
              </div>
              <Accounts accounts={accounts} />
            </div>
            <SubtypeBreakdown accounts={accounts} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Dashboard;
