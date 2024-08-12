/**
 * @file App.jsx
 * @description This is the main entry point of our React application. It sets up the routing for the application using react-router-dom.
 * It includes routes for login, signup, and the main application page. The main application page is wrapped in a Protected_Route component to ensure that only authenticated users can access it.
 */

import '../Styling_Pages/App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../Components/ProtectedRoute'; // Make sure to adjust the path to where your Protected_Route component is located
import Login from './Public_Pages/LoginPage'; // Make sure to adjust the path to where your Login component is located
import Signup from './Public_Pages/SignupPage';
import LinkAccount from './Private_Pages/LinkAccount';
import WelcomePage from './Public_Pages/WelcomePage';
import Dashboard from './Private_Pages/Dashboard';
import InvestmentsSummary from './Private_Pages/InvestmentsSummary';
import Header from './Static_Elements/Header';
import UserHeader from './Static_Elements/UserHeader';
import Sidebar from './Static_Elements/Sidebar';
import TestGrid from './Public_Pages/TestGrid';
import Watchlist from './Private_Pages/Watchlist';
import MainStockPage from './Private_Pages/MainStockPage';
import AccountsDashboard from './Private_Pages/AccountsDashboard';
import TestLangchain from './Private_Pages/TestLangchain';
import 'normalize.css';
import ChatBot from './Static_Elements/ChatBot';
import QuantaraUserPage from './Private_Pages/QuantaraUserPage';
import UserPremiumPage from './Private_Pages/UserPremiumPage';

function HeaderWrapper() {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/welcome' || location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/mywelcome';

  return (
    <>
      {isWelcomePage ? <Header /> : <UserHeader />}
      {!isWelcomePage && <Sidebar />} {/* Display Sidebar when not on welcome page */}
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/mywelcome" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/grid" element={<ExternalRedirect />} /> {/* Redirect to external site */}
        <Route path="/test-langchain" element={
          <ProtectedRoute>
            <TestLangchain />
          </ProtectedRoute>
        } />
        <Route path="/main-stock-page" element={<MainStockPage />} />
        <Route path="/stock-watchlist/:symbol" element={
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        } />
        <Route path="/my-dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/link-account" element={
          <ProtectedRoute>
            <LinkAccount />
          </ProtectedRoute>
        } />
        <Route path="/about-quantara" element={
          <ProtectedRoute>
            <QuantaraUserPage />
          </ProtectedRoute>
        } />
        <Route path="/premium-plans" element={
          <ProtectedRoute>
            <UserPremiumPage />
          </ProtectedRoute>
        } />
        <Route path="/investments-summary" element={
          <ProtectedRoute>
            <InvestmentsSummary />
          </ProtectedRoute>
        } />
        <Route path="/accounts/:accountId/*" element={
          <ProtectedRoute>
            <AccountsDashboard />
          </ProtectedRoute>
        } />
        <Route path="/accounts/*" element={
          <ProtectedRoute>
            <AccountsDashboard />
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <div className="App">
              {/* Your default component or redirect here */}
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

function ExternalRedirect() {
  useEffect(() => {
    window.location.href = 'https://harbinger.framer.website/';
  }, []);
  
  return null;
}

function App() {
  return (
    <Router>
      <HeaderWrapper />
      <ChatBot /> {/* Always render ChatBot */}
    </Router>
  );
}

export default App;
