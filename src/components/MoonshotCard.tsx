import { motion } from 'framer-motion';
import { User, Star, TrendingUp, DollarSign, Award, Percent } from 'lucide-react';

interface MoonshotCardProps {
  traderName: string;
  rating: number;
  totalReturn: string;
  aum: string;
  riskGrade: string;
  carryFee: string;
  index: number;
}

export default function MoonshotCard({ 
  traderName, 
  rating, 
  totalReturn, 
  aum, 
  riskGrade, 
  carryFee, 
  index 
}: MoonshotCardProps) {
  return (
    <motion.div
      className="moonshot-card group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Trader Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center">
          <User className="h-6 w-6 text-accent-purple" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white group-hover:text-accent-purple transition-colors">
            {traderName}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-accent-yellow fill-current" />
            <span className="text-accent-yellow text-sm font-medium">{rating} Rating</span>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="bg-dark-600/50 rounded-lg p-4 mb-6 border border-accent-green/20">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-5 w-5 text-accent-green" />
          <span className="text-white/60 text-sm">Total Return (30 days)</span>
        </div>
        <div className="text-3xl font-bold text-accent-green">{totalReturn}</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-dark-600/30 rounded-lg p-3 border border-white/5 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <DollarSign className="h-3 w-3 text-white/60" />
            <span className="text-white/60 text-xs">AUM</span>
          </div>
          <div className="text-sm font-semibold text-white">{aum}</div>
        </div>

        <div className="bg-dark-600/30 rounded-lg p-3 border border-white/5 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Award className="h-3 w-3 text-white/60" />
            <span className="text-white/60 text-xs">Risk</span>
          </div>
          <div className="text-sm font-semibold text-accent-green">{riskGrade}</div>
        </div>

        <div className="bg-dark-600/30 rounded-lg p-3 border border-white/5 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Percent className="h-3 w-3 text-white/60" />
            <span className="text-white/60 text-xs">Carry</span>
          </div>
          <div className="text-sm font-semibold text-white">{carryFee}</div>
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        className="w-full bg-accent-purple/10 hover:bg-accent-purple/20 border border-accent-purple/30 hover:border-accent-purple/50 text-accent-purple font-semibold py-3 rounded-lg transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Follow Trader
      </motion.button>
    </motion.div>
  );
} 