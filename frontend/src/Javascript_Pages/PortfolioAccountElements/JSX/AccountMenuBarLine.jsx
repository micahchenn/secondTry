import React, { useRef, useEffect } from 'react';
import '../CSS/AccountMenuBarLine.css'; 

function AccountMenuBarLine({ selectedMenuItem, setSelectedMenuItem }) {
  const menuItems = ['General Information', 'Analytics', 'Diversification', 'Transactions', 'Accounts', 'Manage Accounts'];
  const menuRefs = useRef([]);

  useEffect(() => {
    const index = menuItems.indexOf(selectedMenuItem);
    const menuItem = menuRefs.current[index];
    if (menuItem) {
      const left = menuItem.offsetLeft;
      const width = menuItem.offsetWidth;
      document.documentElement.style.setProperty('--highlight-left', `${left}px`);
      document.documentElement.style.setProperty('--highlight-width', `${width}px`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMenuItem]);

  return (
    <div className="menu-bar-container">
      <div className="menu-bar">
        {menuItems.map((item, index) => (
          <div
            key={item}
            ref={(el) => (menuRefs.current[index] = el)}
            className={`menu-item ${selectedMenuItem === item ? 'selected' : ''}`}
            onClick={() => setSelectedMenuItem(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="menu-bar-line">
        <div className="highlight-line"></div>
      </div>
    </div>
  );
}

export default AccountMenuBarLine;
