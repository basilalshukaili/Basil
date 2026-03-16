import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex items-center gap-1.5 flex-wrap text-sm mb-8"
      aria-label="Breadcrumb"
    >
      <Link
        to="/learn"
        className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors duration-200"
      >
        <Home size={14} />
        <span>Academy</span>
      </Link>

      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={12} className="text-slate-600" />
          {item.to ? (
            <Link
              to={item.to}
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </motion.nav>
  );
}
