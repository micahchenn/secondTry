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
import Login from './Login_Page'; // Make sure to adjust the path to where your Login component is located
import Signup from './Signup_Page';
import Link_Account from './Private_Pages/Link_Account';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/link-account" element={
          <Protected_Route>
            <Link_Account />
          </Protected_Route>
        } />
        <Route path="/" element={
          <Protected_Route>
            <div className="App">
              <h1>Welcome to the Front Page this is the reason I hate coding</h1>
            </div>
          </Protected_Route>
        } />
      </Routes>
    </Router>
  );
}

export default App;