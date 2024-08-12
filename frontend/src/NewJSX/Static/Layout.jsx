import React from 'react';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="sidebar-placeholder"></div>
      <div className="header-placeholder"></div>
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
