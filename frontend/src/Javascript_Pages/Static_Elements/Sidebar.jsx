import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faSeedling,
    faBriefcase,
    faRobot,
    faBullseye,
    faBook,
    faCog
} from '@fortawesome/free-solid-svg-icons';
import '../../Styling_Pages/Static_Elements/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <NavLink exact to="/investments-summary" activeClassName="active">
                        <FontAwesomeIcon icon={faChartLine} />
                        <span className="sidebar-text">Investment Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/watchlist-dashboard" activeClassName="active">
                        <FontAwesomeIcon icon={faSeedling} />
                        <span className="sidebar-text">Watchlist</span>
                    </NavLink>
                    <ul className="sub-menu">
                        <li>
                            <NavLink exact to="/watchlist/stocks" activeClassName="active">
                                <span className="sidebar-text">Stocks</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/watchlist/crypto" activeClassName="active">
                                <span className="sidebar-text">Crypto</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/watchlist/forex" activeClassName="active">
                                <span className="sidebar-text">Forex</span>
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <NavLink exact to="/portfolio-builder" activeClassName="active">
                        <FontAwesomeIcon icon={faBriefcase} />
                        <span className="sidebar-text">Portfolio Builder</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/ai-insights" activeClassName="active">
                        <FontAwesomeIcon icon={faRobot} />
                        <span className="sidebar-text">AI Insights</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/goals" activeClassName="active">
                        <FontAwesomeIcon icon={faBullseye} />
                        <span className="sidebar-text">Goals</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/accounts-dashboard" activeClassName="active">
                        <FontAwesomeIcon icon={faBook} />
                        <span className="sidebar-text">Learn</span>
                    </NavLink>
                </li>
                <li className="sidebar-bottom">
                    <NavLink exact to="/settings" activeClassName="active">
                        <FontAwesomeIcon icon={faCog} />
                        <span className="sidebar-text">Settings</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
