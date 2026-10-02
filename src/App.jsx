import React, { useEffect, useState } from 'react';

import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';

function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openAdmin = () => {
    window.location.hash = '/admin';
  };

  const exitAdmin = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (route === '#/admin') {
    return <AdminDashboard onExit={exitAdmin} />;
  }

  return <HomePage onOpenAdmin={openAdmin} />;
}

export default App;
