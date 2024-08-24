/**
 * @file App.jsx
 * @description This is the main entry point of our React application. It sets up the routing for the application using react-router-dom.
 * It includes routes for login, signup, and the main application page. The main application page is wrapped in a ProtectedRoute component to ensure that only authenticated users can access it.
 */

// App.jsx
import '../Styling_Pages/App.css';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './PublicPages/LoginPage';
import SignupPage from './PublicPages/SignupPage';
import DashboardPage from './PrivatePages/DashboardPage'; // Import the DashboardPage
import LinkAccount from './PrivatePages/LinkAccount';
import ProtectedRoute from '../Components/ProtectedRoute'; // Import the ProtectedRoute component
import HeaderWrapper from './Static/HeaderWrapper'; // Import HeaderWrapper
import PortfolioPage from './PrivatePages/PortfolioPage';
import ManageAccount from './PrivatePages/ManageAccount';
import 'normalize.css';
import './Static/Global.css'; // Import the global CSS file
import UpdateDaily from './Admin/UpdateDaily';

function RedirectToHarbinger() {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = 'https://harbinger.framer.website';
  }, [navigate]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <HeaderWrapper />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/main-dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/portfolio-page" element={<ProtectedRoute><PortfolioPage /></ProtectedRoute>} />
          <Route path="/link-account" element={<ProtectedRoute><LinkAccount /></ProtectedRoute>} />
          <Route path="/Update" element={<ProtectedRoute><UpdateDaily /></ProtectedRoute>} />
          <Route path="/accounts" element={<ProtectedRoute><ManageAccount /></ProtectedRoute>} />
          
          <Route path="/" element={<RedirectToHarbinger />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
