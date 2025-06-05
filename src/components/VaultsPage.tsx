import Footer from "./Footer";
import Header from "./Header";
import VaultsTable from "./VaultsTable";
import type { VaultData } from "./VaultsTable";

const protocolVaultsData: VaultData[] = [
  {
    name: "Bucket",
    leader: "Bucket Official",
    apr: "13.04%",
    tvl: "1.25 M",
    runtime: "168",
    pnl: "107.49 K",
    overview: "📈",
  },
  {
    name: "Scallop",
    leader: "Scallop Official",
    apr: "11.89%",
    tvl: "790 K",
    runtime: "149",
    pnl: "89.45 K",
    overview: "📉",
  },
  {
    name: "Aftermath",
    leader: "Aftermath Official",
    apr: "7.68%",
    tvl: "370 K",
    runtime: "76",
    pnl: "18.23 K",
    overview: "📈",
  },
  {
    name: "Cetus", // Added mock data
    leader: "Cetus Official",
    apr: "9.55%",
    tvl: "950 K",
    runtime: "120",
    pnl: "65.30 K",
    overview: "📈",
  },
  {
    name: "Navi Protocol", // Added mock data
    leader: "Navi Official",
    apr: "10.12%",
    tvl: "1.05 M",
    runtime: "90",
    pnl: "72.80 K",
    overview: "📉",
  },
];

const userVaultsData: VaultData[] = [
  {
    name: "Sui Maxi",
    leader: "0xje58u…j0dc",
    apr: "67.14%",
    tvl: "15.01 K",
    runtime: "45",
    pnl: "963.97",
    overview: "📈",
  },
  {
    name: "Wal Maxi",
    leader: "0xui83l…cido",
    apr: "48.35%",
    tvl: "24.76 K",
    runtime: "37",
    pnl: "1.27 K",
    overview: "📈",
  },
  {
    name: "Perp Warrior",
    leader: "0x9eid1…9ecp",
    apr: "92.01%",
    tvl: "4.68 K",
    runtime: "1", // Corrected to string as per VaultData interface
    pnl: "-974.67",
    overview: "📉",
  },
  // Adding 12 more mock data entries for User Vaults
  {
    name: "Yield Aggregator X",
    leader: "0xabcde…f123",
    apr: "33.50%",
    tvl: "55.20 K",
    runtime: "60",
    pnl: "2.15 K",
    overview: "📈",
  },
  {
    name: "Stable Coin Staker",
    leader: "0xfghij…k456",
    apr: "8.15%",
    tvl: "120.75 K",
    runtime: "90",
    pnl: "3.05 K",
    overview: "📈",
  },
  {
    name: "Leveraged Long",
    leader: "0xlmnop…q789",
    apr: "120.00%",
    tvl: "8.50 K",
    runtime: "15",
    pnl: "-1.50 K",
    overview: "📉",
  },
  {
    name: "Arbitrage Hunter",
    leader: "0xqrstu…v012",
    apr: "25.80%",
    tvl: "30.00 K",
    runtime: "30",
    pnl: "1.10 K",
    overview: "📈",
  },
  {
    name: "ETH Maximizer",
    leader: "0xvwxyz…a345",
    apr: "15.25%",
    tvl: "88.00 K",
    runtime: "100",
    pnl: "4.50 K",
    overview: "📈",
  },
  {
    name: "BTC Growth Fund",
    leader: "0x123ab…c678",
    apr: "12.90%",
    tvl: "150.00 K",
    runtime: "120",
    pnl: "7.20 K",
    overview: "📈",
  },
  {
    name: "Sui Short Seller",
    leader: "0x456de…f901",
    apr: "-5.50%", // Example of negative APR if strategy involves shorting
    tvl: "12.00 K",
    runtime: "20",
    pnl: "-0.60 K",
    overview: "📉",
  },
  {
    name: "Low Cap Gem Finder",
    leader: "0x789gh…i234",
    apr: "75.00%",
    tvl: "7.80 K",
    runtime: "50",
    pnl: "3.10 K",
    overview: "📈",
  },
  {
    name: "Blue Chip Hodler",
    leader: "0x012jk…l567",
    apr: "9.80%",
    tvl: "250.50 K",
    runtime: "180",
    pnl: "12.60 K",
    overview: "📈",
  },
  {
    name: "High Frequency Trader",
    leader: "0x345mn…o890",
    apr: "45.60%",
    tvl: "40.10 K",
    runtime: "25",
    pnl: "1.90 K",
    overview: "📈",
  },
  {
    name: "Conservative Yield",
    leader: "0x678pq…r123",
    apr: "6.50%",
    tvl: "300.00 K",
    runtime: "200",
    pnl: "9.80 K",
    overview: "📈",
  },
  {
    name: "Risk Taker Fund",
    leader: "0x901st…u456",
    apr: "155.00%",
    tvl: "5.00 K",
    runtime: "10",
    pnl: "-2.10 K",
    overview: "📉",
  },
];

// TODO: Implement mock data for User Vaults (15 rows with pagination)

export default function VaultsPage() {
  return (
    <div className="min-h-screen bg-dark-400">
      <Header />
      <main className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VaultsTable title="Protocol Vaults" data={protocolVaultsData} />
          <VaultsTable title="User Vaults" data={userVaultsData} itemsPerPage={10} />
        </div>
      </main>
      <Footer />
    </div>
  );
} 