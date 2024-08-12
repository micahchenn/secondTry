import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import UserHeader from './UserHeader';
import Sidebar from './Sidebar';

function HeaderWrapper() {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/welcome' || location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/mywelcome';
  const isAuthenticated = !isWelcomePage;

  return (
    <>
      {isWelcomePage ? <Header /> : <UserHeader />}
      {isAuthenticated && <Sidebar />}
    </>
  );
}

export default HeaderWrapper;
