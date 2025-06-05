import { motion } from 'framer-motion';
import { Shield, TrendingUp, Users, DollarSign } from 'lucide-react';

interface VaultCardProps {
  title: string;
  apr: string;
  tvl: string;
  risk: 'Low' | 'Medium' | 'High';
  mgmtFee: string;
  carryFee: string;
  index: number;
}

const riskColors = {
  Low: 'bg-accent-green/20 text-accent-green border-accent-green/30',
  Medium: 'bg-accent-yellow/20 text-accent-yellow border-accent-yellow/30',
  High: 'bg-accent-orange/20 text-accent-orange border-accent-orange/30',
};

export default function VaultCard({ title, apr, tvl, risk, mgmtFee, carryFee, index }: VaultCardProps) {
  return (
    <motion.div
      className="vault-card group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
            {title}
          </h3>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${riskColors[risk]}`}>
            <Shield className="h-4 w-4" />
            {risk} Risk
          </div>
        </div>
      </div>

      {/* APR Section */}
      <div className="bg-dark-600/50 rounded-lg p-4 mb-6 border border-primary-400/20">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="h-5 w-5 text-primary-400" />
          <span className="text-white/60 text-sm">Current APR</span>
        </div>
        <div className="text-3xl font-bold text-primary-400">{apr}</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-600/30 rounded-lg p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-white/60" />
            <span className="text-white/60 text-xs">TVL</span>
          </div>
          <div className="text-lg font-semibold text-white">{tvl}</div>
        </div>

        <div className="bg-dark-600/30 rounded-lg p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-white/60" />
            <span className="text-white/60 text-xs">Fees</span>
          </div>
          <div className="text-lg font-semibold text-white">{mgmtFee} / {carryFee}</div>
          <div className="text-xs text-white/50">Mgmt / Carry</div>
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        className="w-full mt-6 bg-primary-400/10 hover:bg-primary-400/20 border border-primary-400/30 hover:border-primary-400/50 text-primary-400 font-semibold py-3 rounded-lg transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View Details
      </motion.button>
    </motion.div>
  );
} 