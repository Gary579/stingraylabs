import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import MiniTrendChart from './MiniTrendChart';

export interface VaultData {
  name: string;
  leader: string;
  apr: string;
  tvl: string;
  runtime: string; 
  pnl: string;
  historicalPnl: number[];
}

interface VaultsTableProps {
  title: string;
  data: VaultData[];
  itemsPerPage?: number;
}

const VaultsTable: React.FC<VaultsTableProps> = ({ title, data, itemsPerPage = Infinity }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = itemsPerPage === Infinity ? 1 : Math.ceil(data.length / itemsPerPage);

  const paginatedData = itemsPerPage === Infinity ? data : data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section>
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
          <div className="overflow-x-auto bg-dark-300 rounded-lg shadow-xl">
            <table className="min-w-full divide-y divide-dark-100 text-sm">
              <thead className="bg-dark-200/50">
                <tr>
                  {['Vault Name', 'Leader', 'Current APR', 'TVL', 'Runtime (days)', 'All-time PNL', 'Overview'].map((header) => (
                    <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-dark-300 divide-y divide-dark-100">
                {paginatedData.map((vault, index) => (
                  <motion.tr 
                    key={`${title}-row-${index}`}
                    className="hover:bg-dark-200/30 transition-colors duration-150"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-white font-medium">{vault.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white/80">{vault.leader}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-primary-400 font-semibold">{vault.apr}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white/80">{vault.tvl}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white/80">{vault.runtime}</td>
                    <td className={`px-6 py-4 whitespace-nowrap font-semibold ${vault.pnl.startsWith('-') ? 'text-accent-orange' : 'text-accent-green'}`}>{vault.pnl}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-400 text-center align-middle">
                      <MiniTrendChart data={vault.historicalPnl} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <motion.div 
              className="mt-6 flex items-center justify-between text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
                className="px-4 py-2 bg-dark-100/90 border border-primary-400/30 rounded-md hover:bg-dark-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-dark-100/90 border border-primary-400/30 rounded-md hover:bg-dark-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default VaultsTable; 