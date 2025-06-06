import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage';
import VaultsPage from './components/VaultsPage';
import DashboardPage from './components/DashboardPage';
import TradePage from './components/TradePage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vaults" element={<VaultsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/trade" element={<TradePage />} />
        </Routes>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
