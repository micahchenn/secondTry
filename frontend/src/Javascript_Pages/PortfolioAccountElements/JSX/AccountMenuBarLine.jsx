import React, { useRef, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import '../CSS/AccountMenuBarLine.css'; 

function AccountMenuBarLine() {
  const { accountId } = useParams();
  const menuItems = [
    { name: 'General Information', path: `/accounts/${accountId}/general-information` },
    { name: 'Analytics', path: `/accounts/${accountId}/analytics` },
    { name: 'Diversification', path: `/accounts/${accountId}/diversification` },
    { name: 'Transactions', path: `/accounts/${accountId}/transactions` },
    { name: 'Accounts', path: `/accounts/${accountId}` },
    { name: 'Manage Accounts', path: `/accounts/${accountId}/manage` },
  ];
  const menuRefs = useRef([]);
  const location = useLocation();

  useEffect(() => {
    const index = menuItems.findIndex(item => item.path === location.pathname);
    const menuItem = menuRefs.current[index];
    if (menuItem) {
      const left = menuItem.offsetLeft;
      const width = menuItem.offsetWidth;
      document.documentElement.style.setProperty('--highlight-left', `${left}px`);
      document.documentElement.style.setProperty('--highlight-width', `${width}px`);
    }
  }, [location.pathname, menuItems]);

  return (
    <div className="menu-bar-container">
      <div className="menu-bar">
        {menuItems.map((item, index) => (
          <Link
            key={item.name}
            to={item.path}
            ref={(el) => (menuRefs.current[index] = el)}
            className={`menu-item ${location.pathname === item.path ? 'selected' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="menu-bar-line">
        <div className="highlight-line"></div>
      </div>
    </div>
  );
}

export default AccountMenuBarLine;
