import { motion } from 'framer-motion';
import { Link2, Target, DollarSign } from 'lucide-react';

const steps = [
  {
    icon: Link2,
    title: "Connect Your Wallet",
    description: "Link your Sui wallet to get started. We support all major Sui wallets for a seamless experience.",
    emoji: "🔗",
  },
  {
    icon: Target,
    title: "Choose Your Strategy",
    description: "Browse curated pools or explore Moonplay pools. Filter by risk level, returns, and strategy type.",
    emoji: "🎯",
  },
  {
    icon: DollarSign,
    title: "Earn & Manage",
    description: "Watch your investments grow. Track performance, withdraw anytime, and manage your portfolio with ease.",
    emoji: "💰",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Get started with Stingray Protocol in three simple steps
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-400 text-dark-700 rounded-full flex items-center justify-center font-bold text-sm z-10">
                {index + 1}
              </div>

              {/* Card */}
              <div className="glass-card p-8 text-center group-hover:bg-glass-gradient transition-all duration-300 transform group-hover:-translate-y-2">
                {/* Icon Container */}
                <div className="relative mx-auto mb-6">
                  <div className="w-24 h-24 bg-primary-400/10 border-2 border-primary-400/30 rounded-full flex items-center justify-center mx-auto group-hover:border-primary-400/50 transition-colors">
                    <span className="text-4xl">{step.emoji}</span>
                  </div>
                  
                  {/* Background Icon */}
                  <div className="absolute inset-0 w-24 h-24 flex items-center justify-center mx-auto opacity-10 group-hover:opacity-20 transition-opacity">
                    <step.icon className="w-12 h-12 text-primary-400" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 w-6 lg:w-12 h-0.5 bg-gradient-to-r from-primary-400/50 to-transparent transform -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="btn-primary text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 