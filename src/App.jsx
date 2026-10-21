import React, { useEffect, useState } from 'react';

import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import GroupHomePage from './pages/GroupHomePage';
import RetailsPage from './pages/RetailsPage';

function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openAdmin = () => {
    // Open the admin console separately so the public website stays open.
    const adminUrl = `${window.location.origin}${window.location.pathname}${window.location.search}#/admin`;
    window.open(adminUrl, '_blank', 'noopener,noreferrer');
  };

  const exitAdmin = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (route === '#/admin') {
    return <AdminDashboard onExit={exitAdmin} />;
  }
  if (route.startsWith('#/infotech')) {
    return <HomePage onOpenAdmin={openAdmin} />;
  }
  if (route.startsWith('#/retails')) {
    return <RetailsPage />;
  }

  return <GroupHomePage />;
}

export default App;
