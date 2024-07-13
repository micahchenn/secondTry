import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faSeedling,
  faBriefcase,
  faBullseye,
  faBook,
  faCaretDown,
  faCaretRight
} from '@fortawesome/free-solid-svg-icons';
import '../../Styling_Pages/Static_Elements/Sidebar.css';

const Sidebar = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMarketOverviewOpen, setIsMarketOverviewOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const location = useLocation();

  const handleMouseEnter = () => setIsSidebarExpanded(true);
  const handleMouseLeave = () => setIsSidebarExpanded(false);

  const isActive = (path) => location.pathname.startsWith(path);
  const isDropdownActive = (paths) => paths.some(path => location.pathname.startsWith(path));

  return (
    <div className={`sidebar ${isSidebarExpanded ? 'expanded' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ul>
        {isSidebarExpanded && <li className="sidebar-label">OVERVIEW</li>}
        <li className="indent">
          <NavLink exact to="/accounts/*" className={isActive('/accounts/*') ? 'active' : ''}>
            <FontAwesomeIcon icon={faChartLine} className={`sidebar-icon ${isActive('/accounts/*') ? 'active-icon' : ''}`} />
            {isSidebarExpanded && <span className="sidebar-text">Portfolio Dashboard</span>}
          </NavLink>
        </li>
        <li className="indent">
          <NavLink exact to="/accounts-dashboard" className={isActive('/accounts-dashboard') ? 'active' : ''}>
            <FontAwesomeIcon icon={faBriefcase} className={`sidebar-icon ${isActive('/accounts-dashboard') ? 'active-icon' : ''}`} />
            {isSidebarExpanded && <span className="sidebar-text">Explore Portfolios</span>}
          </NavLink>
        </li>
        <li className="indent">
          <NavLink exact to="/accounts-dashboard" className={isActive('/accounts-dashboard') ? 'active' : ''}>
            <FontAwesomeIcon icon={faBullseye} className={`sidebar-icon ${isActive('/accounts-dashboard') ? 'active-icon' : ''}`} />
            {isSidebarExpanded && <span className="sidebar-text">Investment Goals</span>}
          </NavLink>
        </li>

        {isSidebarExpanded && <li className="sidebar-label">FINANCIAL DATA</li>}
        <li className="indent">
          <div
            className={`dropdown ${isDropdownActive(['/market-overview', '/market-performance', '/economic-data']) ? 'active' : ''}`}
            onClick={() => setIsMarketOverviewOpen(!isMarketOverviewOpen)}
          >
            <FontAwesomeIcon icon={faBook} className={`sidebar-icon ${isDropdownActive(['/market-overview', '/market-performance', '/economic-data']) ? 'active-icon' : ''}`} />
            {isSidebarExpanded && <span className="sidebar-text">Market Overview</span>}
            {isSidebarExpanded && <FontAwesomeIcon icon={isMarketOverviewOpen ? faCaretDown : faCaretRight} className="dropdown-icon" />}
          </div>
          {isSidebarExpanded && isMarketOverviewOpen && (
            <ul className="sub-menu">
              <li className="indent-more">
                <NavLink exact to="/market-performance" className={isActive('/market-performance') ? 'active' : ''}>
                  <span className="sidebar-text">Market Performance</span>
                </NavLink>
              </li>
              <li className="indent-more">
                <NavLink exact to="/economic-data" className={isActive('/economic-data') ? 'active' : ''}>
                  <span className="sidebar-text">Economic Data</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li className="indent">
          <div
            className={`dropdown ${isDropdownActive(['/main-stock-page', '/watchlist/forex', '/watchlist/crypto']) ? 'active' : ''}`}
            onClick={() => setIsWatchlistOpen(!isWatchlistOpen)}
          >
            <FontAwesomeIcon icon={faSeedling} className={`sidebar-icon ${isDropdownActive(['/main-stock-page', '/watchlist/forex', '/watchlist/crypto']) ? 'active-icon' : ''}`} />
            {isSidebarExpanded && <span className="sidebar-text">Watchlist</span>}
            {isSidebarExpanded && <FontAwesomeIcon icon={isWatchlistOpen ? faCaretDown : faCaretRight} className="dropdown-icon" />}
          </div>
          {isSidebarExpanded && isWatchlistOpen && (
            <ul className="sub-menu">
              <li className="indent-more">
                <NavLink exact to="/main-stock-page" className={isActive('/main-stock-page') ? 'active' : ''}>
                  <span className="sidebar-text">Stocks</span>
                </NavLink>
              </li>
              <li className="indent-more">
                <NavLink exact to="/watchlist/forex" className={isActive('/watchlist/forex') ? 'active' : ''}>
                  <span className="sidebar-text">Forex</span>
                </NavLink>
              </li>
              <li className="indent-more">
                <NavLink exact to="/watchlist/crypto" className={isActive('/watchlist/crypto') ? 'active' : ''}>
                  <span className="sidebar-text">Crypto</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
