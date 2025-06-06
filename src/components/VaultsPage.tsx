import { useState } from 'react';
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
      }
];

const VaultsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">User Vaults</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-400 hover:bg-primary-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
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