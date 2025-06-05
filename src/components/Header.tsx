import { motion } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-dark-100/90 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <Zap className="h-8 w-8 text-primary-400 animate-pulse" />
              <div className="absolute inset-0 h-8 w-8 text-primary-400 animate-ping opacity-75">
                <Zap className="h-8 w-8" />
              </div>
            </div>
            <span className="text-2xl font-bold text-white">Stingray</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[ { name: 'Vaults', path: '/vaults' }, { name: 'Analytics', path: '#analytics' }, { name: 'Docs', path: '#docs' } ].map((item, index) => (
              <MotionLink
                to={item.path}
                key={item.name}
                className="text-white/70 hover:text-white font-medium transition-colors duration-300 relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                onClick={() => {
                  if (item.path.startsWith('#')) {
                    setIsMenuOpen(false);
                  } else {
                    setIsMenuOpen(false);
                  }
                }}
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </MotionLink>
            ))}
          </nav>

          {/* Connect Wallet Button */}
          <motion.button
            className="hidden md:block btn-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Connect Wallet
          </motion.button>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-dark-100/95 backdrop-blur-lg border-t border-white/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-4 py-6 space-y-4">
            {[ { name: 'Vaults', path: '/vaults' }, { name: 'Analytics', path: '#analytics' }, { name: 'Docs', path: '#docs' } ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block text-white/70 hover:text-white font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button className="btn-primary w-full mt-4">
              Connect Wallet
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
} 