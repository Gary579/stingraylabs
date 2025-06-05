import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pin, Eye } from 'lucide-react';
import { useState } from 'react';
import VaultCard from './VaultCard';

const vaultsData = [
  {
    title: "Sui Yield Optimizer",
    apr: "12.5%",
    tvl: "$2.4M",
    risk: "Low" as const,
    mgmtFee: "2%",
    carryFee: "20%",
  },
  {
    title: "DeFi Alpha Strategy",
    apr: "18.7%",
    tvl: "$1.8M",
    risk: "Medium" as const,
    mgmtFee: "2.5%",
    carryFee: "25%",
  },
  {
    title: "Liquidity Mining Pro",
    apr: "15.3%",
    tvl: "$3.1M",
    risk: "Low" as const,
    mgmtFee: "1.5%",
    carryFee: "15%",
  },
  {
    title: "Cross-Chain Arbitrage",
    apr: "22.1%",
    tvl: "$950K",
    risk: "High" as const,
    mgmtFee: "3%",
    carryFee: "30%",
  },
];

export default function VaultsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, vaultsData.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <Pin className="h-8 w-8 text-primary-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">Protocol Vaults</h2>
          </div>
          
          <motion.button
            className="btn-secondary flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="h-4 w-4" />
            View All
          </motion.button>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="flex items-center gap-6">
            {/* Previous Button */}
            <motion.button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-dark-100/90 border border-primary-400/30 flex items-center justify-center text-primary-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            {/* Vaults Grid */}
            <div className="flex-1 overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: -currentIndex * (100 / itemsPerPage) + '%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {vaultsData.map((vault, index) => (
                  <div key={index} className="w-full md:w-1/3 flex-shrink-0">
                    <VaultCard {...vault} index={index} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-dark-100/90 border border-primary-400/30 flex items-center justify-center text-primary-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(vaultsData.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / itemsPerPage) === index
                  ? 'bg-primary-400'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Description */}
        <motion.div
          className="text-center mt-8 space-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-white/60 text-sm">
            📱 Swipe or use arrows to explore more vaults
          </p>
          <p className="text-primary-400/70 text-xs">
            Currently showing {Math.min(itemsPerPage, vaultsData.length - currentIndex)} vaults - {vaultsData.length} total vaults available
          </p>
        </motion.div>
      </div>
    </section>
  );
} 