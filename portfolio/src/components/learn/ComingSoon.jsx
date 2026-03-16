import { motion } from 'framer-motion';
import { Construction, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ComingSoon({ title, backTo = '/learn', backLabel = 'Back to Academy' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-20"
    >
      <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
        <Construction size={32} className="text-slate-500" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">{title || 'Content Coming Soon'}</h2>
      <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
        This section is currently under development. Check back soon for comprehensive cybersecurity learning content.
      </p>
      <Link
        to={backTo}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 text-sm font-medium"
      >
        <ArrowLeft size={16} />
        {backLabel}
      </Link>
    </motion.div>
  );
}
