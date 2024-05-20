// Welcome_Page.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Welcome_Page() {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>This is a simple welcome page.</p>
      <Link to="/signup">Sign Up</Link>
      <br />
      <Link to="/login">Log In</Link>
    </div>
  );
}

export default Welcome_Page;