import React from 'react';
import VaultPositionsTable from './VaultPositionsTable';
import PortfolioVisuals from './PortfolioVisuals';

// A type for the card props for reusability, based on the spec.
type SummaryCardProps = {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  children?: React.ReactNode;
};

// A generic summary card component, styled with Tailwind CSS.
const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, change, changeType, children }) => {
  const changeColor = changeType === 'positive' ? 'text-accent-green' : 'text-accent-orange';
  const arrow = changeType === 'positive' ? '↑' : '↓';

  return (
    <div className="bg-dark-300 border border-dark-100 p-6 rounded-lg shadow-xl flex flex-col">
      <h3 className="text-sm font-medium text-white/70">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-3xl font-bold text-white">{value}</p>
        {change && (
          <span className={`text-sm font-semibold flex items-center gap-1 ${changeColor}`}>
             {arrow} {change}
          </span>
        )}
      </div>
      {children && <div className="mt-auto pt-4">{children}</div>}
    </div>
  );
};

export default function DashboardPage() {
  // Placeholder data based on the spec
  const summaryData = {
    totalValue: {
      value: '$12,345.67',
      change: '+2.5% 24h',
      changeType: 'positive' as const,
    },
    weightedApy: '15.78%',
    unrealizedPnl: '+$1,234.56',
    claimableRewards: '$56.78',
  };

  const hasClaimableRewards = parseFloat(summaryData.claimableRewards.replace('$', '')) > 0;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-white/70 mt-2">An overview of your investment portfolio.</p>
      </header>
      
      {/* Section 2: Portfolio Summary Cards */}
      <section id="summary" className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Portfolio Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard 
            title="Total Portfolio Value"
            value={summaryData.totalValue.value}
            change={summaryData.totalValue.change}
            changeType={summaryData.totalValue.changeType}
          />
          <SummaryCard 
            title="Weighted APR / APY"
            value={summaryData.weightedApy}
          />
          <SummaryCard 
            title="Unrealized P&L"
            value={summaryData.unrealizedPnl}
            changeType="positive"
          />
          <SummaryCard 
            title="Claimable Rewards"
            value={summaryData.claimableRewards}
          >
            <button className="w-full bg-primary-400/80 hover:bg-primary-400 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-dark-100 disabled:text-white/50 disabled:cursor-not-allowed"
              disabled={!hasClaimableRewards}
            >
              Claim All
            </button>
          </SummaryCard>
        </div>
      </section>

      {/* Placeholder for future sections */}
      <section id="visuals" className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Portfolio Growth & Allocation</h2>
        <PortfolioVisuals />
      </section>

      <section id="positions">
         <h2 className="text-2xl font-semibold text-white mb-4">Vault Positions</h2>
         <VaultPositionsTable />
      </section>
    </main>
  );
} 