import { motion } from 'framer-motion';
import { Zap, Twitter, Mail, BookOpen, ExternalLink } from 'lucide-react';

const footerLinks = {
  platform: [
    { name: "Selected Vaults", href: "#vaults" },
    { name: "Moonplay Vaults", href: "#moonshot" },
    { name: "Analytics", href: "#analytics" },
  ],
  resources: [
    { name: "Documentation", href: "#docs" },
    { name: "Help Center", href: "#help" },
    { name: "Security", href: "#security" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Risk Disclosure", href: "#risk" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "#", label: "Email" },
  { icon: BookOpen, href: "#", label: "Documentation" },
];

export default function Footer() {
  return (
    <footer className="bg-dark-500 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <Zap className="h-8 w-8 text-primary-400" />
                </div>
                <span className="text-xl font-bold text-white">Stingray Protocol</span>
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                The future of active fund management on Sui Network. Experience transparent, 
                automated, and high-yield DeFi strategies.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-dark-100 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-primary-400/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Navigation Sections */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white font-semibold text-lg mb-6 capitalize">
                  {category}
                </h3>
                <ul className="space-y-4">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-white/70 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                      >
                        {link.name}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-white/50 text-sm text-center md:text-left mb-4 md:mb-0">
            © 2024 Stingray Protocol. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-primary-400/80 text-sm font-medium">
            <span>Built on</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-primary-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-dark-700 rounded-full" />
              </div>
              <span>Sui Network</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 