import React, { useEffect, useState } from 'react';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import CareNowPage from './pages/CareNowPage';

function App() {
  const [route, setRoute] = useState(window.location.hash);
  useEffect(() => {
    const handleHashChange = () => { const nextHash = window.location.hash; if (nextHash.startsWith('#/')) { setRoute(nextHash); window.scrollTo(0, 0); } };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const openAdmin = () => { window.location.hash = '/admin'; };
  const exitAdmin = () => { window.location.hash = route === '#/admin' ? '#/carenow' : ''; window.scrollTo({ top: 0, behavior: 'smooth' }); };
  if (route === '#/admin') return <AdminDashboard onExit={exitAdmin} />;
  if (route === '#/carenow') return <CareNowPage onOpenAdmin={openAdmin} />;
  return <HomePage />;
}
export default App;
