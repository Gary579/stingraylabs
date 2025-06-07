import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VaultsHeroBanner from '../components/VaultsHeroBanner';
import VaultsTable, { type VaultData } from '../components/VaultsTable';
import CreateVaultModal from '../components/CreateVaultModal';

const generateRandomTrend = (length: number, start: number, volatility: number): number[] => {
  const trend = [start];
  for (let i = 1; i < length; i++) {
    const randomFactor = (Math.random() - 0.5) * volatility;
    const nextValue = trend[i - 1] + randomFactor;
    trend.push(Math.max(0, nextValue)); // Ensure value doesn't go below 0
  }
  return trend;
};

const allVaultsData: VaultData[] = [
    {
        name: "SUI Maximizer",
        leader: "0x123ab…c456",
        apr: "25.50%",
        tvl: "1.20 M",
        runtime: "120",
        pnl: "150.25 K",
        historicalPnl: generateRandomTrend(10, 50, 20),
      },
      {
        name: "Yield Weaver",
        leader: "0x456de…f789",
        apr: "18.75%",
        tvl: "2.50 M",
        runtime: "90",
        pnl: "220.10 K",
        historicalPnl: generateRandomTrend(10, 60, 15),
      },
      {
        name: "Momentum Rider",
        leader: "0x789gh…i234",
        apr: "35.20%",
        tvl: "800.00 K",
        runtime: "45",
        pnl: "95.50 K",
        historicalPnl: generateRandomTrend(10, 40, 30),
      },
      {
        name: "Stable Growth",
        leader: "0x012jk…l567",
        apr: "12.00%",
        tvl: "5.00 M",
        runtime: "200",
        pnl: "450.80 K",
        historicalPnl: generateRandomTrend(10, 80, 5),
      },
      {
        name: "Alpha Seeker",
        leader: "0x345mn…o890",
        apr: "42.80%",
        tvl: "650.00 K",
        runtime: "60",
        pnl: "110.00 K",
        historicalPnl: generateRandomTrend(10, 30, 40),
      },
      {
        name: "Turbo Yield",
        leader: "0xabcde…f123",
        apr: "28.10%",
        tvl: "1.50 M",
        runtime: "80",
        pnl: "180.50 K",
        historicalPnl: generateRandomTrend(10, 55, 25),
    },
    {
        name: "Quantum Leap",
        leader: "0xfghij…k456",
        apr: "15.50%",
        tvl: "3.20 M",
        runtime: "110",
        pnl: "250.75 K",
        historicalPnl: generateRandomTrend(10, 65, 18),
    },
    {
        name: "Velocity Fund",
        leader: "0_lmnop…q789",
        apr: "38.90%",
        tvl: "950.00 K",
        runtime: "50",
        pnl: "120.30 K",
        historicalPnl: generateRandomTrend(10, 45, 35),
    },
    {
        name: "Bedrock Bets",
        leader: "0_rstuv…w012",
        apr: "10.50%",
        tvl: "6.00 M",
        runtime: "250",
        pnl: "500.00 K",
        historicalPnl: generateRandomTrend(10, 85, 8),
    },
    {
        name: "Apex Alpha",
        leader: "0_xyzab…c345",
        apr: "48.20%",
        tvl: "750.00 K",
        runtime: "70",
        pnl: "130.60 K",
        historicalPnl: generateRandomTrend(10, 35, 45),
    },
    {
        name: "SUI Maximizer II",
        leader: "0x123ab…c457",
        apr: "25.50%",
        tvl: "1.20 M",
        runtime: "120",
        pnl: "150.25 K",
        historicalPnl: generateRandomTrend(10, 50, 20),
    },
    {
        name: "Yield Weaver II",
        leader: "0x456de…f780",
        apr: "18.75%",
        tvl: "2.50 M",
        runtime: "90",
        pnl: "220.10 K",
        historicalPnl: generateRandomTrend(10, 60, 15),
    },
    {
        name: "Momentum Rider II",
        leader: "0x789gh…i235",
        apr: "35.20%",
        tvl: "800.00 K",
        runtime: "45",
        pnl: "95.50 K",
        historicalPnl: generateRandomTrend(10, 40, 30),
    },
    {
        name: "Stable Growth II",
        leader: "0x012jk…l568",
        apr: "12.00%",
        tvl: "5.00 M",
        runtime: "200",
        pnl: "450.80 K",
        historicalPnl: generateRandomTrend(10, 80, 5),
    },
    {
        name: "Alpha Seeker II",
        leader: "0x345mn…o891",
        apr: "42.80%",
        tvl: "650.00 K",
        runtime: "60",
        pnl: "110.00 K",
        historicalPnl: generateRandomTrend(10, 30, 40),
    }
];

const VaultsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightCreate, setHighlightCreate] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#user-vaults') {
      const element = document.getElementById('user-vaults');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setHighlightCreate(true);
        setTimeout(() => setHighlightCreate(false), 2000); // Animation duration
      }
    }
  }, [location]);

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
        <VaultsHeroBanner />
        
        {/* Protocol Vaults Section */}
        <div className="mt-12 mb-16">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">Protocol Vaults</h2>
          </div>
          <VaultsTable title="" data={allVaultsData.slice(0,5)} />
        </div>

        {/* User Vaults Section */}
        <div id="user-vaults" className="scroll-mt-28">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">User Vaults</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className={`btn-primary ${highlightCreate ? 'animate-pulse-glow' : ''}`}
            >
              Create Vault
            </button>
          </div>
          <VaultsTable title="" data={allVaultsData} itemsPerPage={10} />
        </div>
      </main>
      <CreateVaultModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default VaultsPage; 