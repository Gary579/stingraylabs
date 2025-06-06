import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

// Mock data for the growth chart based on spec
const growthData = [
  { name: '30d ago', 'Stingray USDC Maxi': 4000, 'SUI Yield Master': 2400, total: 6400 },
  { name: '15d ago', 'Stingray USDC Maxi': 4500, 'SUI Yield Master': 2800, total: 7300 },
  { name: '7d ago', 'Stingray USDC Maxi': 4800, 'SUI Yield Master': 3200, total: 8000 },
  { name: 'Today', 'Stingray USDC Maxi': 5250, 'SUI Yield Master': 4060, total: 9310 },
];

// Mock data for the allocation pie chart based on spec
const allocationData = [
  { name: 'Stingray USDC Maxi', value: 10500, assetType: 'USDC' },
  { name: 'SUI Yield Master', value: 5800, assetType: 'SUI' },
  { name: 'Chad Trader Alpha', value: 2350, assetType: 'LP Token' },
];

const COLORS = ['#6366f1', '#34d399', '#f59e0b'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-200/80 backdrop-blur-sm p-4 border border-dark-100 rounded-lg shadow-xl">
        <p className="label text-white font-bold">{`${label}`}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.stroke }}>
            {`${pld.name}: $${pld.value.toLocaleString()}`}
          </p>
        ))}
        <p className="intro text-white/70 mt-2">{`Total: $${payload.reduce((sum: number, pld: any) => sum + pld.value, 0).toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};


const PortfolioVisuals: React.FC = () => {
    const [timeRange, setTimeRange] = useState('30d');
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Portfolio Growth Chart */}
            <div className="lg:col-span-3 bg-dark-300 border border-dark-100 rounded-lg p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Portfolio Growth</h3>
                    <div className="flex gap-2">
                        {['24h', '7d', '30d', 'All-time'].map(range => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-3 py-1 text-sm rounded-md transition-colors ${timeRange === range ? 'bg-primary-400/90 text-white' : 'bg-dark-200 text-white/70 hover:bg-dark-200/70'}`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <AreaChart data={growthData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={COLORS[1]} stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor={COLORS[1]} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(99, 102, 241, 0.5)', strokeWidth: 1, strokeDasharray: '3 3' }}/>
                            <Area type="monotone" dataKey="Stingray USDC Maxi" stackId="1" stroke={COLORS[0]} fill="url(#colorUv)" />
                            <Area type="monotone" dataKey="SUI Yield Master" stackId="1" stroke={COLORS[1]} fill="url(#colorPv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Allocation Pie Chart */}
            <div className="lg:col-span-2 bg-dark-300 border border-dark-100 rounded-lg p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Asset Allocation</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={allocationData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                            >
                                {allocationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 30, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '0.5rem' }}/>
                            <Legend formatter={(value, entry) => <span className="text-white/80">{value}</span>} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default PortfolioVisuals; 