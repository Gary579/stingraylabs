import './App.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import VaultsSection from './components/VaultsSection'
import MoonshotSection from './components/MoonshotSection'
import HowItWorksSection from './components/HowItWorksSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-dark-400">
      <Header />
      <main>
        <HeroSection />
        <VaultsSection />
        <MoonshotSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
