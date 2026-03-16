import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  delay = 0,
  hover = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -6, transition: { duration: 0.25 } } : undefined}
      className={`
        p-6 sm:p-7 rounded-2xl
        bg-white/[0.03] border border-white/[0.06]
        backdrop-blur-sm
        ${hover ? 'hover:bg-white/[0.06] hover:border-white/[0.1] hover:shadow-[0_8px_32px_rgba(59,130,246,0.08)]' : ''}
        transition-colors duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
