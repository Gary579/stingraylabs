import React, { useState } from 'react';

// From dashboard.md spec
export type VaultPosition = {
  name: string;
  logo: string; // URL to logo
  leader: string;
  deposited: number;
  currentValue: number;
  apr: number;
  lifetimePnl: {
    amount: number;
    percentage: number;
  };
  tvl: number;
  runtime: number; // in days
  riskLevel: 'Low' | 'Med' | 'High';
  myShare: number; // percentage
  feeStructure: {
    management: number; // percentage
    carry: number; // percentage
  };
  nextUnlock: string | null; // or Date object
};

// Mock data based on the spec
const mockProtocolVaults: VaultPosition[] = [
  {
    name: 'Stingray USDC Maxi',
    logo: '/placeholder-logo.svg',
    leader: 'Stingray Official',
    deposited: 10000,
    currentValue: 10500,
    apr: 12.5,
    lifetimePnl: { amount: 500, percentage: 5 },
    tvl: 5500000,
    runtime: 180,
    riskLevel: 'Low',
    myShare: 0.19,
    feeStructure: { management: 1, carry: 10 },
    nextUnlock: '25 days',
  },
  {
    name: 'SUI Yield Master',
    logo: '/placeholder-logo.svg',
    leader: 'Stingray Official',
    deposited: 5000,
    currentValue: 5800,
    apr: 25.0,
    lifetimePnl: { amount: 800, percentage: 16 },
    tvl: 2100000,
    runtime: 90,
    riskLevel: 'Med',
    myShare: 0.27,
    feeStructure: { management: 1.5, carry: 15 },
    nextUnlock: null,
  },
];

const mockUserVaults: VaultPosition[] = [
    {
        name: 'Chad Trader Alpha',
        logo: '/placeholder-logo.svg',
        leader: 'CryptoChad1337',
        deposited: 2500,
        currentValue: 2350,
        apr: -8.5,
        lifetimePnl: { amount: -150, percentage: -6 },
        tvl: 300000,
        runtime: 45,
        riskLevel: 'High',
        myShare: 0.78,
        feeStructure: { management: 2, carry: 20 },
        nextUnlock: '10 days',
    },
];


const VaultPositionsTable: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'protocol' | 'user'>('protocol');

    const vaultsToShow = activeTab === 'protocol' ? mockProtocolVaults : mockUserVaults;

    const renderVaultRow = (vault: VaultPosition, index: number) => {
        const pnlColor = vault.lifetimePnl.amount >= 0 ? 'text-accent-green' : 'text-accent-orange';
        return (
            <tr key={index} className="bg-dark-300 border-b border-dark-100 hover:bg-dark-200/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                            {/* In a real app, this would be an <img /> */}
                            <div className="h-10 w-10 rounded-full bg-dark-200 flex items-center justify-center font-bold text-white">{vault.name.charAt(0)}</div>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-bold text-white">{vault.name}</div>
                            <div className="text-sm text-white/70">{vault.leader}</div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90">${vault.deposited.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${vault.currentValue.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-400 font-semibold">{vault.apr.toFixed(2)}%</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${pnlColor}`}>
                    <div>${vault.lifetimePnl.amount.toLocaleString()}</div>
                    <div>({vault.lifetimePnl.percentage.toFixed(2)}%)</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90">${(vault.tvl / 1_000_000).toFixed(2)}M</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90">{vault.runtime} days</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${vault.riskLevel === 'Low' ? 'bg-accent-green/20 text-accent-green' : vault.riskLevel === 'Med' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-accent-orange/20 text-accent-orange'}`}>
                        {vault.riskLevel}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90">{vault.myShare.toFixed(2)}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                    <div>{vault.feeStructure.management}% / {vault.feeStructure.carry}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">{vault.nextUnlock || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-2">
                        <button className="text-primary-400 hover:text-primary-300">Add</button>
                        <button className="text-primary-400 hover:text-primary-300">Withdraw</button>
                    </div>
                </td>
            </tr>
        );
    }


    return (
        <div className="bg-dark-300 border border-dark-100 rounded-lg overflow-hidden shadow-xl">
            <div className="px-4 py-3 border-b border-dark-100">
                <nav className="flex space-x-4" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('protocol')}
                        className={`px-3 py-2 font-medium text-sm rounded-md transition-colors ${activeTab === 'protocol' ? 'bg-primary-400/90 text-white' : 'text-white/70 hover:bg-dark-200'}`}
                    >
                        Protocol Vaults
                    </button>
                    <button
                        onClick={() => setActiveTab('user')}
                        className={`px-3 py-2 font-medium text-sm rounded-md transition-colors ${activeTab === 'user' ? 'bg-primary-400/90 text-white' : 'text-white/70 hover:bg-dark-200'}`}
                    >
                        User Vaults (Moonplay)
                    </button>
                </nav>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-dark-100">
                    <thead className="bg-dark-200/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Vault / Leader</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Deposited</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Current Value</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Current APR</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Lifetime P&L</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">TVL</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Runtime</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Risk Level</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">My Share</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Fee (Mgmt/Carry)</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Next Unlock</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-dark-300 divide-y divide-dark-100">
                       {vaultsToShow.map(renderVaultRow)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VaultPositionsTable; 