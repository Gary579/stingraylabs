import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VaultsTable, { type VaultData as VaultTableDataType } from "./VaultsTable";
import VaultsHeroBanner from "./VaultsHeroBanner";

interface VaultPageData extends Omit<VaultTableDataType, 'overview'> {
  historicalPnl: number[];
}

const generateRandomTrend = (points = 7, start = 50, fluctuation = 20): number[] => {
  const trend = [start];
  for (let i = 1; i < points; i++) {
    trend.push(Math.max(0, trend[i-1] + (Math.random() - 0.45) * fluctuation));
  }
  return trend;
};

const protocolVaultsData: VaultPageData[] = [
  {
    name: "Bucket",
    leader: "Bucket Official",
    apr: "13.04%",
    tvl: "1.25 M",
    runtime: "168",
    pnl: "107.49 K",
    historicalPnl: generateRandomTrend(8, 60, 25),
  },
  {
    name: "Scallop",
    leader: "Scallop Official",
    apr: "11.89%",
    tvl: "790 K",
    runtime: "149",
    pnl: "89.45 K",
    historicalPnl: generateRandomTrend(7, 40, 15),
  },
  {
    name: "Aftermath",
    leader: "Aftermath Official",
    apr: "7.68%",
    tvl: "370 K",
    runtime: "76",
    pnl: "18.23 K",
    historicalPnl: generateRandomTrend(6, 70, 10),
  },
  {
    name: "Cetus",
    leader: "Cetus Official",
    apr: "9.55%",
    tvl: "950 K",
    runtime: "120",
    pnl: "65.30 K",
    historicalPnl: generateRandomTrend(8, 55, 30),
  },
  {
    name: "Navi Protocol",
    leader: "Navi Official",
    apr: "10.12%",
    tvl: "1.05 M",
    runtime: "90",
    pnl: "72.80 K",
    historicalPnl: generateRandomTrend(7, 45, 20),
  },
];

const userVaultsData: VaultPageData[] = [
  {
    name: "Sui Maxi",
    leader: "0xje58u…j0dc",
    apr: "67.14%",
    tvl: "15.01 K",
    runtime: "45",
    pnl: "963.97",
    historicalPnl: generateRandomTrend(9, 30, 40),
  },
  {
    name: "Wal Maxi",
    leader: "0xui83l…cido",
    apr: "48.35%",
    tvl: "24.76 K",
    runtime: "37",
    pnl: "1.27 K",
    historicalPnl: generateRandomTrend(7, 60, 20),
  },
  {
    name: "Perp Warrior",
    leader: "0x9eid1…9ecp",
    apr: "92.01%",
    tvl: "4.68 K",
    runtime: "1",
    pnl: "-974.67",
    historicalPnl: generateRandomTrend(6, 20, 50),
  },
  {
    name: "Yield Aggregator X",
    leader: "0xabcde…f123",
    apr: "33.50%",
    tvl: "55.20 K",
    runtime: "60",
    pnl: "2.15 K",
    historicalPnl: generateRandomTrend(),
  },
  {
    name: "Stable Coin Staker",
    leader: "0xfghij…k456",
    apr: "8.15%",
    tvl: "120.75 K",
    runtime: "90",
    pnl: "3.05 K",
    historicalPnl: generateRandomTrend(8, 80, 5),
  },
  {
    name: "Leveraged Long",
    leader: "0xlmnop…q789",
    apr: "120.00%",
    tvl: "8.50 K",
    runtime: "15",
    pnl: "-1.50 K",
    historicalPnl: generateRandomTrend(7, 10, 60),
  },
  {
    name: "Arbitrage Hunter",
    leader: "0xqrstu…v012",
    apr: "25.80%",
    tvl: "30.00 K",
    runtime: "30",
    pnl: "1.10 K",
    historicalPnl: generateRandomTrend(6, 50,15),
  },
  {
    name: "ETH Maximizer",
    leader: "0xvwxyz…a345",
    apr: "15.25%",
    tvl: "88.00 K",
    runtime: "100",
    pnl: "4.50 K",
    historicalPnl: generateRandomTrend(9, 65, 10),
  },
  {
    name: "BTC Growth Fund",
    leader: "0x123ab…c678",
    apr: "12.90%",
    tvl: "150.00 K",
    runtime: "120",
    pnl: "7.20 K",
    historicalPnl: generateRandomTrend(10, 70, 8),
  },
  {
    name: "Sui Short Seller",
    leader: "0x456de…f901",
    apr: "-5.50%",
    tvl: "12.00 K",
    runtime: "20",
    pnl: "-0.60 K",
    historicalPnl: generateRandomTrend(7, 30, 25),
  },
  {
    name: "Low Cap Gem Finder",
    leader: "0x789gh…i234",
    apr: "75.00%",
    tvl: "7.80 K",
    runtime: "50",
    pnl: "3.10 K",
    historicalPnl: generateRandomTrend(8, 25, 45),
  },
  {
    name: "Blue Chip Hodler",
    leader: "0x012jk…l567",
    apr: "9.80%",
    tvl: "250.50 K",
    runtime: "180",
    pnl: "12.60 K",
    historicalPnl: generateRandomTrend(10, 85, 5),
  },
  {
    name: "High Frequency Trader",
    leader: "0x345mn…o890",
    apr: "45.60%",
    tvl: "40.10 K",
    runtime: "25",
    pnl: "1.90 K",
    historicalPnl: generateRandomTrend(7, 50, 35),
  },
  {
    name: "Conservative Yield",
    leader: "0x678pq…r123",
    apr: "6.50%",
    tvl: "300.00 K",
    runtime: "200",
    pnl: "9.80 K",
    historicalPnl: generateRandomTrend(9, 90, 3),
  },
  {
    name: "Risk Taker Fund",
    leader: "0x901st…u456",
    apr: "155.00%",
    tvl: "5.00 K",
    runtime: "10",
    pnl: "-2.10 K",
    historicalPnl: generateRandomTrend(6, 15, 70),
  },
];

// TODO: Implement mock data for User Vaults (15 rows with pagination)

export default function VaultsPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      {/* Header and Footer are now handled by App.tsx */}
      <main className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VaultsHeroBanner />
          <div id="protocol-vaults">
            <VaultsTable title="Protocol Vaults" data={protocolVaultsData as VaultTableDataType[]} />
          </div>
          <div id="user-vaults" className="mt-16">
            <VaultsTable title="User Vaults" data={userVaultsData as VaultTableDataType[]} itemsPerPage={10} />
          </div>
        </div>
      </main>
    </div>
  );
} 