/**
 * @file App.jsx
 * @author Micah Chen
 * @description This is the main entry point of our React application. It sets up the routing for the application using react-router-dom.
 * It includes routes for login, signup, and the main application page. The main application page is wrapped in a Protected_Route component to ensure that only authenticated users can access it.
 */

import '../Styling_Pages/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Protected_Route from '../Components/Protected_Route'; // Make sure to adjust the path to where your Protected_Route component is located
import Login from './Public_Pages/Login_Page'; // Make sure to adjust the path to where your Login component is located
import Signup from './Public_Pages/Signup_Page';
import Link_Account from './Private_Pages/Link_Account';
import Welcome_Page from './Public_Pages/Welcome_Page';
import Dashboard from './Private_Pages/Dashboard';
import Investments_Summary from './Private_Pages/Investments_Summary';
import Header from './Static_Elements/Header';
import User_Header from './Static_Elements/User_Header';

import Sidebar from './Static_Elements/Sidebar';
import Test_Grid from './Public_Pages/Test_Grid';
import Watchlist from './Private_Pages/Watchlist';
import WatchlistDashboard from './Private_Pages/WatchlistDashboard';
import AccountsDashboard from './Private_Pages/AccountsDashboard';

import { useLocation } from 'react-router-dom';

function HeaderWrapper() {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/welcome' || location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {isWelcomePage ? <Header /> : <User_Header />}
      {!isWelcomePage && <Sidebar />} {/* Display Sidebar when not on welcome page */}
      <Routes>
        <Route path="/welcome" element={<Welcome_Page />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/grid" element={<Test_Grid/>} />
        
        <Route path="/watchlist-dashboard" element={<WatchlistDashboard/>} />


        <Route path="/stock-watchlist/:symbol" element={
          <Protected_Route>
            <Watchlist />
          </Protected_Route>
        } />
        <Route path="/my-dashboard" element={
          <Protected_Route>
            <Dashboard />
          </Protected_Route>
        } />

        <Route path="/link-account" element={
          <Protected_Route>
            <Link_Account />
          </Protected_Route>
        } />

        <Route path="/investments-summary" element={
          <Protected_Route>
            <Investments_Summary />
          </Protected_Route>
        } />

        <Route path="/accounts-dashboard" element={
          <Protected_Route>
            <AccountsDashboard />
          </Protected_Route>
        } />

        <Route path="/" element={
          <Protected_Route>
            <div className="App">
              <h1>Welcome to the Front Page this is the reason I hate i love it acjtally coding</h1>
            </div>
          </Protected_Route>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <HeaderWrapper />
    </Router>
  );
}

export default App;