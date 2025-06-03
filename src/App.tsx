import './App.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import PoolsSection from './components/PoolsSection'
import MoonshotSection from './components/MoonshotSection'
import HowItWorksSection from './components/HowItWorksSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-dark-400">
      <Header />
      <main>
        <HeroSection />
        <PoolsSection />
        <MoonshotSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
