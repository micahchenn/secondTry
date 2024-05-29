import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faSeedling } from '@fortawesome/free-solid-svg-icons';
import '../../Styling_Pages/Static_Elements/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/stock-watchlist">
                        <FontAwesomeIcon icon={faChartLine} />
                        <span className="sidebar-text">Stock Watchlist</span>
                    </Link>
                </li>
                <li>
                    <Link to="/investments-summary">
                        <FontAwesomeIcon icon={faSeedling} />
                        <span className="sidebar-text">Investments Summary</span>
                    </Link>
                </li>
                {/* rest of your items */}
            </ul>
        </div>
    );
};

export default Sidebar;