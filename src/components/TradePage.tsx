import { useState } from 'react';
import type { ReactElement } from 'react';
import { ChevronDown, Briefcase, Landmark, TrendingUp, History, Bell, AlertTriangle, ExternalLink, ArrowLeftRight, RefreshCw, Wallet, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

type Token = {
    symbol: string;
    name: string;
    icon: ReactElement;
};

const availableTokens: Token[] = [
    { symbol: 'SUI', name: 'Sui', icon: <div className="w-full h-full bg-cyan-500 rounded-full" /> },
    { symbol: 'USDC', name: 'USD Coin', icon: <div className="w-full h-full bg-blue-600 rounded-full" /> },
    { symbol: 'ETH', name: 'Ethereum', icon: <div className="w-full h-full bg-gray-500 rounded-full" /> },
    { symbol: 'WBTC', name: 'Wrapped BTC', icon: <div className="w-full h-full bg-orange-500 rounded-full" /> },
    { symbol: 'WETH', name: 'Wrapped ETH', icon: <div className="w-full h-full bg-slate-500 rounded-full" /> },
    { symbol: 'SOL', name: 'Solana', icon: <div className="w-full h-full bg-purple-500 rounded-full" /> },
    { symbol: 'USDT', name: 'Tether', icon: <div className="w-full h-full bg-green-400 rounded-full" /> },
];

type SnapshotCardData = {
  title: string;
  value: string;
  buttonText?: string;
  icon: React.ElementType;
  valueColor?: string;
};

// Dummy data
const vaults = [
  { name: 'SUI Growth Vault', tvl: '1.2M' },
  { name: 'ETH Yield Farming', tvl: '850K' },
  { name: 'Stablecoin Arbitrage', tvl: '2.5M' },
];

const snapshotCards: SnapshotCardData[] = [
  { title: 'Available to Deploy', value: '$ 72,345', buttonText: 'Deposit', icon: Landmark },
  { title: 'Total Collateral', value: '$ 312,980', buttonText: 'Manage', icon: Briefcase },
  { title: 'Borrowing Power', value: '$ 150,000', buttonText: 'Borrow', icon: TrendingUp },
  { title: 'Unrealized P&L', value: '+ 8.12%', valueColor: 'text-green-400', icon: History },
];

const tabs = [
  { name: 'Swap', icon: ArrowLeftRight },
  { name: 'Lending', icon: Landmark },
  { name: 'LP & Staking', icon: Briefcase },
  { name: 'Perps & Options', icon: TrendingUp },
  { name: 'History', icon: History },
];

const suppliedAssets = [
  { asset: 'SUI', balance: '1,200.50', apy: '2.5%', protocol: 'Scallop' },
  { asset: 'USDC', balance: '50,000.00', apy: '4.1%', protocol: 'Navi' },
  { asset: 'afSUI', balance: '500.00', apy: '3.8%', protocol: 'Aftermath' },
];

const borrowedAssets = [
  { asset: 'USDT', debt: '10,000.00', apy: '5.2%', health: 1.85, protocol: 'Navi' },
  { asset: 'ETH', debt: '5.00', apy: '3.9%', health: 2.5, protocol: 'Scallop' },
];

const lpPositions = [
    { pool: 'SUI/USDC', protocol: 'Streamm', amount: '$25,000', apr: '15.2%', rewards: '125 STREAM' },
    { pool: 'ETH/SUI', protocol: 'Aftermath', amount: '$18,500', apr: '12.8%', rewards: '88 AFM' },
];

const openPositions = [
    { market: 'BTC-PERP', type: 'LONG', size: '0.5', entryPrice: '68,500', markPrice: '69,120', pnl: '+$310.00' },
    { market: 'SUI-PERP', type: 'SHORT', size: '10,000', entryPrice: '1.05', markPrice: '1.02', pnl: '+$300.00' },
];

const tradeHistory = [
    { id: '1', type: 'Supply', asset: 'SUI', amount: '1,200.50', time: '2h ago', status: 'Completed', tx: '0xabc...def' },
    { id: '2', type: 'Borrow', asset: 'USDT', amount: '10,000.00', time: '3h ago', status: 'Completed', tx: '0x123...456' },
    { id: '3', type: 'Add LP', asset: 'SUI/USDC', amount: '$25,000', time: '1d ago', status: 'Completed', tx: '0x789...abc' },
    { id: '4', type: 'Open Perp', asset: 'BTC-PERP', amount: '0.5 BTC', time: '2d ago', status: 'Completed', tx: '0xdef...ghi' },
];


export default function TradePage() {
  const [selectedVault, _setSelectedVault] = useState(vaults[0]);
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const VaultSelector = () => (
    <div className="relative">
      <button className="flex items-center space-x-2 bg-dark-100 border border-white/10 rounded-lg px-4 py-2 text-white hover:border-white/20 transition">
        <span>{selectedVault.name} (TVL ${selectedVault.tvl})</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      {/* Dropdown would be implemented here */}
    </div>
  );

  const SnapshotCard = ({ card }: { card: SnapshotCardData }) => (
    <motion.div 
      className="bg-dark-100 p-6 rounded-xl border border-white/10 flex flex-col justify-between"
      whileHover={{ y: -5, borderColor: 'rgba(255, 255, 255, 0.2)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-white/70 text-sm">{card.title}</p>
          <card.icon className="h-5 w-5 text-white/50" />
        </div>
        <p className={`text-3xl font-bold ${card.valueColor || 'text-white'} mb-4`}>{card.value}</p>
      </div>
      {card.buttonText && <button className="btn-secondary text-sm w-full mt-2">{card.buttonText}</button>}
    </motion.div>
  );

  const OperationTabs = () => (
    <div className="flex space-x-1 border-b border-white/10 mb-8">
      {tabs.map(tab => (
        <button 
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`flex items-center space-x-2 px-4 py-3 font-medium transition-colors rounded-t-md ${
            activeTab === tab.name 
              ? 'text-white bg-dark-100 border-b-2 border-primary-400' 
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <tab.icon className="h-5 w-5" />
          <span>{tab.name}</span>
        </button>
      ))}
    </div>
  );

  const TabContent = () => {
    const renderContent = () => {
        switch (activeTab) {
            case 'Swap': return <SwapContent />;
            case 'Lending': return <LendingContent />;
            case 'LP & Staking': return <LpStakingContent />;
            case 'Perps & Options': return <PerpsOptionsContent />;
            case 'History': return <HistoryContent />;
            default: return <p>Select a tab</p>;
        }
    };
    return (
        <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-100 p-6 sm:p-8 rounded-b-xl rounded-tr-xl border border-white/10 min-h-[400px]"
        >
            {renderContent()}
        </motion.div>
    );
  };
  
  const TokenWalletPanel = ({ onSelectToken }: { onSelectToken: (token: Token) => void }) => {
    const [isOpen, setIsOpen] = useState(true);

    const walletBalances = [
        { symbol: 'SUI', amount: '1,234.56' },
        { symbol: 'USDC', amount: '5,432.10' },
        { symbol: 'ETH', amount: '2.50' },
        { symbol: 'WBTC', amount: '0.123' },
        { symbol: 'WETH', amount: '10.5' },
        { symbol: 'SOL', amount: '123.45' },
        { symbol: 'USDT', amount: '10,000.00' },
    ];
    
    if (!isOpen) {
        return (
            <div className="text-center">
                <motion.button 
                    onClick={() => setIsOpen(true)} 
                    className="bg-dark-100 p-3 rounded-full hover:bg-dark-200/80 transition-colors"
                    title="Open Wallet"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Wallet className="h-6 w-6 text-white/80" />
                </motion.button>
            </div>
        )
    }

    return (
        <motion.div 
            className="bg-dark-200/50 p-4 rounded-xl h-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary-400" />
                    <span>My Tokens</span>
                </h3>
                <button 
                    onClick={() => setIsOpen(false)} 
                    className="text-white/60 hover:text-white"
                    title="Collapse Wallet"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>
            <div className="space-y-2 pr-2 -mr-2 max-h-[340px] overflow-y-auto custom-scrollbar">
                {walletBalances.map((token) => {
                    const tokenData = availableTokens.find(t => t.symbol === token.symbol);
                    if (!tokenData) return null;

                    return (
                        <div key={token.symbol} className="group flex justify-between items-center p-2 rounded-md hover:bg-dark-100/70 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 flex-shrink-0">{tokenData.icon}</div>
                                <span className="font-medium text-white/90">{token.symbol}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-sm">{token.amount}</span>
                                <button 
                                    onClick={() => onSelectToken(tokenData)}
                                    className="btn-secondary opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1"
                                >
                                    Swap
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    )
  }

  const SwapContent = () => {
    const [payAmount, setPayAmount] = useState('');
    const [receiveAmount, setReceiveAmount] = useState('');
    const [payToken, setPayToken] = useState<Token>(availableTokens[1]); // Default to USDC
    const [receiveToken, setReceiveToken] = useState<Token>(availableTokens[0]); // Default to SUI

    const handleTokenSwap = () => {
        const tempToken = payToken;
        setPayToken(receiveToken);
        setReceiveToken(tempToken);

        const tempAmount = payAmount;
        setPayAmount(receiveAmount);
        setReceiveAmount(tempAmount);
    };

    return (
      <div className="flex justify-center gap-8">
        <div className="w-full max-w-md">
            <div className="bg-dark-200/50 p-4 sm:p-6 rounded-xl space-y-4">
            {/* Pay Section */}
            <div className="bg-dark-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white/60">Pay</span>
                <span className="text-sm text-white/60">Balance: 0.00</span>
                </div>
                <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-dark-200 p-2 rounded-md hover:bg-dark-300">
                    <div className="w-6 h-6">{payToken.icon}</div> 
                    <span className="font-bold text-lg">{payToken.symbol}</span>
                    <ChevronDown className="h-4 w-4 text-white/50" />
                </button>
                <input 
                    type="number"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    placeholder="0"
                    className="bg-transparent text-2xl font-mono text-right w-full focus:outline-none"
                />
                </div>
            </div>
            
            {/* Swap Button */}
            <div className="flex justify-center my-[-8px] z-10 relative">
                <button 
                    onClick={handleTokenSwap}
                    className="bg-dark-200 p-2 rounded-full border-4 border-dark-100 text-white/70 hover:bg-dark-300 hover:rotate-180 transition-transform duration-300"
                >
                <RefreshCw className="h-5 w-5" />
                </button>
            </div>

            {/* Receive Section */}
            <div className="bg-dark-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white/60">Receive</span>
                <span className="text-sm text-white/60">Balance: 0.00</span>
                </div>
                <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-dark-200 p-2 rounded-md hover:bg-dark-300">
                    <div className="w-6 h-6">{receiveToken.icon}</div> 
                    <span className="font-bold text-lg">{receiveToken.symbol}</span>
                    <ChevronDown className="h-4 w-4 text-white/50" />
                </button>
                <input 
                    type="number"
                    value={receiveAmount}
                    onChange={(e) => setReceiveAmount(e.target.value)}
                    placeholder="0"
                    className="bg-transparent text-2xl font-mono text-right w-full focus:outline-none"
                />
                </div>
            </div>
            </div>

            <button className="btn-primary w-full mt-6 text-lg py-3">
            Swap
            </button>

            <div className="text-center mt-4">
                <button className="text-sm text-white/60 hover:text-white">
                    Details
                </button>
            </div>
        </div>
        <div className="w-72 hidden xl:block">
            <TokenWalletPanel onSelectToken={setPayToken} />
        </div>
      </div>
    );
  };

  const LendingContent = () => (
    <div className="space-y-8">
        <div>
            <h3 className="text-xl font-bold text-white mb-4">Supplied Assets</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10 text-sm text-white/70">
                            <th className="p-3">Asset</th>
                            <th className="p-3">Balance</th>
                            <th className="p-3">APY</th>
                            <th className="p-3">Protocol</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliedAssets.map(asset => (
                            <tr key={asset.asset} className="border-b border-white/5">
                                <td className="p-3 font-medium text-white">{asset.asset}</td>
                                <td className="p-3 text-white/90">{asset.balance}</td>
                                <td className="p-3 text-green-400">{asset.apy}</td>
                                <td className="p-3 text-white/90">{asset.protocol}</td>
                                <td className="p-3 text-right">
                                    <button className="btn-secondary text-xs px-3 py-1">Withdraw</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <h3 className="text-xl font-bold text-white mb-4">Borrowed Assets</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10 text-sm text-white/70">
                            <th className="p-3">Asset</th>
                            <th className="p-3">Debt</th>
                            <th className="p-3">APY</th>
                            <th className="p-3">Protocol</th>
                            <th className="p-3">Health Factor</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowedAssets.map(asset => (
                            <tr key={asset.asset} className="border-b border-white/5">
                                <td className="p-3 font-medium text-white">{asset.asset}</td>
                                <td className="p-3 text-white/90">{asset.debt}</td>
                                <td className="p-3 text-red-400">{asset.apy}</td>
                                <td className="p-3 text-white/90">{asset.protocol}</td>
                                <td className="p-3 text-white/90">{asset.health}</td>
                                <td className="p-3 text-right">
                                    <button className="btn-secondary text-xs px-3 py-1">Repay</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );

  const LpStakingContent = () => (
    <div className="space-y-8">
        <div>
            <h3 className="text-xl font-bold text-white mb-4">LP Positions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lpPositions.map(pos => (
                    <div key={pos.pool} className="glass-card p-5 rounded-xl flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold text-lg text-white">{pos.pool}</h4>
                                <span className="text-xs font-medium bg-dark-100 text-white/80 px-2 py-1 rounded-md">{pos.protocol}</span>
                            </div>
                            <div className="space-y-2 mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-white/70">Invested:</span>
                                    <span className="font-medium text-white">{pos.amount}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-white/70">APR:</span>
                                    <span className="font-medium text-green-400">{pos.apr}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-white/70">Unclaimed:</span>
                                <span className="font-medium text-primary-400">{pos.rewards}</span>
                            </div>
                            <button className="btn-primary text-sm w-full mt-2">Claim Rewards</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <button className="btn-secondary w-full md:w-auto">Claim All Rewards & Unstake</button>
    </div>
  );

  const PerpsOptionsContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-bold text-white">Order Form</h3>
            <div>
                <label className="text-sm text-white/70">Market</label>
                <select className="input-field w-full mt-1">
                    <option>BTC-PERP</option>
                    <option>ETH-PERP</option>
                    <option>SUI-PERP</option>
                </select>
            </div>
            {/* ... other form fields like leverage, amount etc. */}
             <button className="btn-primary w-full">Place Order</button>
        </div>
        <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Open Positions</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                     <thead>
                        <tr className="border-b border-white/10 text-sm text-white/70">
                            <th className="p-3">Market</th>
                            <th className="p-3">Side</th>
                            <th className="p-3">Size</th>
                            <th className="p-3">Entry Price</th>
                            <th className="p-3">Mark Price</th>
                            <th className="p-3">Unrealized PNL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {openPositions.map(pos => (
                            <tr key={pos.market} className="border-b border-white/5">
                                <td className="p-3 font-medium text-white">{pos.market}</td>
                                <td className={`p-3 font-medium ${pos.type === 'LONG' ? 'text-green-400' : 'text-red-400'}`}>{pos.type}</td>
                                <td className="p-3 text-white/90">{pos.size}</td>
                                <td className="p-3 text-white/90">${pos.entryPrice}</td>
                                <td className="p-3 text-white/90">${pos.markPrice}</td>
                                <td className={`p-3 font-medium ${pos.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{pos.pnl}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );

  const HistoryContent = () => (
    <div>
        <h3 className="text-xl font-bold text-white mb-4">Transaction History</h3>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                 <thead>
                    <tr className="border-b border-white/10 text-sm text-white/70">
                        <th className="p-3">Type</th>
                        <th className="p-3">Asset</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Time</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Tx</th>
                    </tr>
                </thead>
                <tbody>
                    {tradeHistory.map(tx => (
                        <tr key={tx.id} className="border-b border-white/5">
                            <td className="p-3 font-medium text-white">{tx.type}</td>
                            <td className="p-3 text-white/90">{tx.asset}</td>
                            <td className="p-3 text-white/90">{tx.amount}</td>
                            <td className="p-3 text-white/90">{tx.time}</td>
                            <td className="p-3"><span className="bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded-full">{tx.status}</span></td>
                            <td className="p-3 text-right">
                                <a href="#" className="text-primary-400 hover:text-primary-300">
                                    <ExternalLink className="h-4 w-4 inline"/>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );

  const NotificationsPanel = () => (
    <div className="w-full lg:w-1/4 lg:pl-8 mt-8 lg:mt-0">
      <div className="bg-dark-100 p-6 rounded-xl border border-white/10 sticky top-28">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Notifications</h3>
          <Bell className="h-5 w-5 text-white/70" />
        </div>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 bg-yellow-500/10 p-3 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-1" />
            <div>
              <p className="font-semibold text-white">Price Alert</p>
              <p className="text-sm text-white/80">BTC has dropped by 5.2% in the last hour.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 bg-red-500/10 p-3 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-1" />
            <div>
              <p className="font-semibold text-white">Liquidation Warning</p>
              <p className="text-sm text-white/80">Your ETH-PERP position is close to liquidation. Add collateral.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
        <h1 className="text-4xl font-bold text-white">Trade</h1>
        <VaultSelector />
      </div>

      {/* Vault Snapshot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {snapshotCards.map((card, index) => (
          <SnapshotCard key={index} card={card} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4">
          {/* Operation Tabs */}
          <OperationTabs />
          {/* Tab Content */}
          <TabContent />
        </div>
        {/* Right Panel */}
        <NotificationsPanel />
      </div>
    </div>
  );
} 