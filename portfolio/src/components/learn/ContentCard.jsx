import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function ContentCard({ title, description, icon, to, available = false, gradient, index = 0 }) {
  const IconComponent = Icons[icon] || Icons.FileText;

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={available ? { y: -4, scale: 1.01 } : {}}
      className={`group relative rounded-2xl border p-6 transition-all duration-300 ${
        available
          ? 'glass-card cursor-pointer hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(59,130,246,0.08)]'
          : 'bg-white/[0.01] border-white/[0.04] opacity-60'
      }`}
    >
      {/* Gradient glow on hover */}
      {available && (
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient || 'from-blue-500/5 to-cyan-400/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />
      )}

      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
            available
              ? `bg-gradient-to-br ${gradient || 'from-blue-500/20 to-cyan-400/20'} text-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]`
              : 'bg-white/[0.03] text-slate-600'
          } transition-all duration-300`}
        >
          <IconComponent size={20} />
        </div>

        {/* Title */}
        <h3
          className={`text-[1.05rem] font-semibold mb-2 ${
            available ? 'text-white' : 'text-slate-500'
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Action */}
        <div className="flex items-center gap-2">
          {available ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
              Explore
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <Clock size={12} />
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (available && to) {
    return <Link to={to} className="block">{card}</Link>;
  }
  return card;
}
