import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage';
import VaultsPage from './components/VaultsPage';

function App() {
  return (
    <div className="min-h-screen bg-dark-400">
      <Header />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vaults" element={<VaultsPage />} />
        </Routes>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
