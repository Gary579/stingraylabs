import { useState } from 'react';
import type { ReactElement } from 'react';
import { ChevronDown, Briefcase, Landmark, TrendingUp, History, Bell, AlertTriangle, ExternalLink, ArrowLeftRight, RefreshCw, Wallet, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

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

const pnlData = Array.from({ length: 20 }, (_, i) => ({ name: `Page ${i}`, uv: Math.random() * 100 + 200 }));
const valueData = Array.from({ length: 20 }, (_, i) => ({ name: `Page ${i}`, uv: 450000 + Math.random() * 35000 }));
const aprData = Array.from({ length: 20 }, (_, i) => ({ name: `Page ${i}`, uv: 10 + Math.random() * 5 }));

const allocationData = [
  { name: 'Spot', value: 400, color: '#3b82f6' },
  { name: 'Lend', value: 300, color: '#22c55e' },
  { name: 'LP', value: 300, color: '#f59e0b' },
  { name: 'Perps', value: 200, color: '#ef4444' },
];

const newSnapshotCards = [
    { 
        title: 'Current Value', 
        value: '$485,320', 
        subValue: '$450,000',
        subValueLabel: 'Initial',
        icon: Briefcase,
        chart: <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={valueData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="uv" stroke="#3b82f6" strokeWidth={2} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
    },
    { 
        title: 'Unrealized P&L', 
        value: '+8.12%', 
        subValue: '≈ +$35,320',
        valueColor: 'text-green-400', 
        chart: <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={pnlData}>
                        <defs>
                            <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="uv" stroke="#22c55e" strokeWidth={2} fill="url(#colorPnl)" />
                    </AreaChart>
                </ResponsiveContainer>,
        icon: History 
    },
    { 
        title: 'Avg. APR', 
        value: '12.5%', 
        subValue: '≈ $285 daily',
        valueColor: 'text-green-400',
        icon: TrendingUp,
        chart: <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={aprData}>
                        <defs>
                            <linearGradient id="colorApr" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="uv" stroke="#f59e0b" strokeWidth={2} fill="url(#colorApr)" />
                    </AreaChart>
                </ResponsiveContainer>
    },
    { 
        title: 'Allocation', 
        icon: Landmark,
        chart: (() => {
            const total = allocationData.reduce((sum, item) => sum + item.value, 0);
            return (
                <div className="w-full h-full flex flex-col justify-center gap-3">
                    <div className="w-full h-3.5 flex">
                        {allocationData.map(item => (
                            <div key={item.name} className="group relative h-full transition-all duration-300 ease-out hover:scale-y-125 first:rounded-l-full last:rounded-r-full" style={{ width: `${(item.value / total) * 100}%`, backgroundColor: item.color }}>
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block px-2 py-1 bg-gray-900 text-white text-xs rounded-md shadow-lg z-10 whitespace-nowrap">
                                    {item.name}: {((item.value / total) * 100).toFixed(1)}%
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 text-xs">
                        {allocationData.map((entry) => (
                            <div key={`legend-${entry.name}`} className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                <span className="text-white/70">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )
        })()
    },
];

type SnapshotCardData = {
  title: string;
  value?: string;
  buttonText?: string;
  icon: React.ElementType;
  valueColor?: string;
  subValue?: string;
  subValueLabel?: string;
  chart?: ReactElement;
};

// Dummy data
const vaults = [
  { name: 'SUI Growth Vault', tvl: '1.2M' },
  { name: 'ETH Yield Farming', tvl: '850K' },
  { name: 'Stablecoin Arbitrage', tvl: '2.5M' },
];

const tabs = [
  { name: 'Swap', icon: ArrowLeftRight },
  { name: 'Lending', icon: Landmark },
  { name: 'LP & Staking', icon: Briefcase },
  { name: 'Perps & Options', icon: TrendingUp },
  { name: 'History', icon: History },
  { name: 'Notifications', icon: Bell, unread: true },
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
      className="bg-dark-100 p-4 rounded-xl border border-white/10 flex flex-col relative h-40"
      whileHover={{ y: -5, borderColor: 'rgba(255, 255, 255, 0.2)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex justify-between items-start">
          <p className="text-white/70 text-sm">{card.title}</p>
          <card.icon className="h-5 w-5 text-white/50" />
      </div>

      <div className="flex-grow flex flex-col justify-center">
        {card.chart && !card.value && <div className="w-full h-full flex items-center">{card.chart}</div>}

        {card.value && 
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className={`text-3xl font-bold ${card.valueColor || 'text-white'}`}>{card.value}</p>
                    {card.subValue && 
                        <div className="text-xs text-white/60 mt-1">
                            {card.subValueLabel ? <span>{card.subValueLabel}: </span> : null}
                            <span>{card.subValue}</span>
                        </div>
                    }
                </div>
                {card.chart && <div className="w-24 h-12 flex-shrink-0">{card.chart}</div>}
            </div>
        }
      </div>
    </motion.div>
  );

  const OperationTabs = () => (
    <div className="border-b border-white/10 mb-8">
      <div className="flex space-x-1 overflow-x-auto scrollbar-hide pb-1">
        {tabs.map(tab => (
          <button 
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-3 font-medium transition-colors rounded-t-md whitespace-nowrap flex-shrink-0 ${
              activeTab === tab.name 
                ? 'text-white bg-dark-100 border-b-2 border-primary-400' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">{tab.name}</span>
            {tab.unread && <div className="w-2 h-2 bg-red-500 rounded-full ml-1 sm:ml-2 animate-pulse"></div>}
          </button>
        ))}
      </div>
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
            case 'Notifications': return <NotificationsPanel />;
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
  
  const SwapContent = () => {
    const [payAmount, setPayAmount] = useState('');
    const [receiveAmount, setReceiveAmount] = useState('');
    const [payToken, setPayToken] = useState<Token>(availableTokens[1]); // Default to USDC
    const [receiveToken, setReceiveToken] = useState<Token>(availableTokens[0]); // Default to SUI
    const [isTokenPanelOpen, setIsTokenPanelOpen] = useState(true);

    const TokenWalletPanel = ({ onSelectToken }: { onSelectToken: (token: Token) => void }) => {
      const walletBalances = [
          { symbol: 'SUI', amount: '1,234.56' },
          { symbol: 'USDC', amount: '5,432.10' },
          { symbol: 'ETH', amount: '2.50' },
          { symbol: 'WBTC', amount: '0.123' },
          { symbol: 'WETH', amount: '10.5' },
          { symbol: 'SOL', amount: '123.45' },
          { symbol: 'USDT', amount: '10,000.00' },
      ];
      
      if (!isTokenPanelOpen) {
          return (
              <div className="text-center pt-2">
                  <motion.button 
                      onClick={() => setIsTokenPanelOpen(true)} 
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
              className="bg-dark-200/50 p-4 rounded-xl h-full w-96"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
          >
              <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-white flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-primary-400" />
                      <span>Tokens</span>
                  </h3>
                  <button 
                      onClick={() => setIsTokenPanelOpen(false)} 
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
                          <div 
                              key={token.symbol} 
                              onClick={() => onSelectToken(tokenData)}
                              className="flex justify-between items-center p-2 rounded-md hover:bg-dark-100/70 cursor-pointer transition-colors"
                          >
                              <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 flex-shrink-0">{tokenData.icon}</div>
                                  <span className="font-medium text-white/90">{token.symbol}</span>
                              </div>
                              <span className="font-mono text-sm text-white/90">{token.amount}</span>
                          </div>
                      );
                  })}
              </div>
          </motion.div>
      )
    }

    const handleTokenSwap = () => {
        const tempToken = payToken;
        setPayToken(receiveToken);
        setReceiveToken(tempToken);

        const tempAmount = payAmount;
        setPayAmount(receiveAmount);
        setReceiveAmount(tempAmount);
    };

    return (
      <div className="flex justify-center items-start gap-8">
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
        <div className="hidden xl:block">
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
    <div className="max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-white mb-6">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">Price Alert</p>
              <p className="text-sm text-white/80">BTC has dropped by 5.2% in the last hour.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">Liquidation Warning</p>
              <p className="text-sm text-white/80">Your ETH-PERP position is close to liquidation. Add collateral.</p>
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
        {newSnapshotCards.map((card, index) => (
          <SnapshotCard key={index} card={card} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="w-full">
          {/* Operation Tabs */}
          <OperationTabs />
          {/* Tab Content */}
          <TabContent />
      </div>
    </div>
  );
} 