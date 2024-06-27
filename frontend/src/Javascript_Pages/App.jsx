/**
 * @file App.jsx
 * @description This is the main entry point of our React application. It sets up the routing for the application using react-router-dom.
 * It includes routes for login, signup, and the main application page. The main application page is wrapped in a Protected_Route component to ensure that only authenticated users can access it.
 */

import '../Styling_Pages/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import WatchlistDashboard from './Private_Pages/WatchlistDashboard';
import AccountsDashboard from './Private_Pages/AccountsDashboard';
import TestLangchain from './Private_Pages/TestLangchain';
import 'normalize.css';
import ChatBot from './Static_Elements/ChatBot';

function HeaderWrapper() {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/welcome' || location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {isWelcomePage ? <Header /> : <UserHeader />}
      {!isWelcomePage && <Sidebar />} {/* Display Sidebar when not on welcome page */}
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/grid" element={<TestGrid />} />
        <Route path="/test-langchain" element={
          <ProtectedRoute>
            <TestLangchain />
          </ProtectedRoute>
        } />
        <Route path="/watchlist-dashboard" element={<WatchlistDashboard />} />
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
        <Route path="/investments-summary" element={
          <ProtectedRoute>
            <InvestmentsSummary />
          </ProtectedRoute>
        } />
        <Route path="/accounts-dashboard" element={
          <ProtectedRoute>
            <AccountsDashboard />
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <div className="App">
              <h1>Welcome to the Front Page this is the reason I hate i love it actually coding</h1>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
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
