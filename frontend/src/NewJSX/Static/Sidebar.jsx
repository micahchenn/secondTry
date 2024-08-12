import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartLine, FaList, FaUserSecret, FaRobot, FaFileAlt } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { to: "/main-dashboard", icon: <FaHome className="icon" />, label: "Home" },
    { to: "/portfolio-page", icon: <FaChartLine className="icon" />, label: "Portfolio" },
    { to: "/watchlist", icon: <FaList className="icon" />, label: "Watchlist" },
    { to: "/insider-tracking", icon: <FaUserSecret className="icon" />, label: "Insider Tracking" },
    { to: "/quantara", icon: <FaRobot className="icon" />, label: "Quantara" },
    { to: "/reports", icon: <FaFileAlt className="icon" />, label: "Reports" },
  ];

  return (
    <div className="sidebar">
      <ul className="nav flex-column">
        {navItems.map((item, index) => (
          <li className={`nav-item ${location.pathname === item.to ? 'active' : ''}`} key={index}>
            <Link className={`nav-link ${location.pathname === item.to ? 'active' : ''}`} to={item.to}>
              {item.icon} <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
