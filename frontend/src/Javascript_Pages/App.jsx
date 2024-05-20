import '../Styling_Pages/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Protected_Route from '../Components/Protected_Route'; // Make sure to adjust the path to where your Protected_Route component is located
import Login from './Login_Page'; // Make sure to adjust the path to where your Login component is located
import Signup from './Signup_Page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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