import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Moon, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import MoonshotCard from './MoonshotCard';

const moonshotData = [
  {
    traderName: "CryptoMaster88",
    rating: 4.8,
    totalReturn: "+32.1%",
    aum: "$850K",
    riskGrade: "Grade A",
    carryFee: "25%",
  },
  {
    traderName: "DefiWizard",
    rating: 4.6,
    totalReturn: "+28.7%",
    aum: "$1.2M",
    riskGrade: "Grade A",
    carryFee: "20%",
  },
  {
    traderName: "YieldHunter",
    rating: 4.9,
    totalReturn: "+41.3%",
    aum: "$680K",
    riskGrade: "Grade B",
    carryFee: "30%",
  },
  {
    traderName: "AlphaSeeker",
    rating: 4.5,
    totalReturn: "+35.8%",
    aum: "$950K",
    riskGrade: "Grade A",
    carryFee: "25%",
  },
];

export default function MoonshotSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, moonshotData.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-400">
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
            <Moon className="h-8 w-8 text-accent-purple" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">MoonShot Vaults</h2>
          </div>
          
          <motion.button
            className="bg-accent-purple/10 hover:bg-accent-purple/20 border border-accent-purple/30 hover:border-accent-purple/50 text-accent-purple font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <TrendingUp className="h-4 w-4" />
            Start Trading
          </motion.button>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="flex items-center gap-6">
            {/* Previous Button */}
            <motion.button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-dark-100/90 border border-accent-purple/30 flex items-center justify-center text-accent-purple disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            {/* Moonshot Grid */}
            <div className="flex-1 overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: -currentIndex * (100 / itemsPerPage) + '%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {moonshotData.map((trader, index) => (
                  <div key={index} className="w-full md:w-1/3 flex-shrink-0">
                    <MoonshotCard {...trader} index={index} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-dark-100/90 border border-accent-purple/30 flex items-center justify-center text-accent-purple disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(moonshotData.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / itemsPerPage) === index
                  ? 'bg-accent-purple'
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
            🌙 Discover traders and their unique strategies
          </p>
          <p className="text-accent-purple/70 text-xs">
            Currently showing {Math.min(itemsPerPage, moonshotData.length - currentIndex)} traders - {moonshotData.length} total moonplay vaults available
          </p>
        </motion.div>
      </div>
    </section>
  );
} 