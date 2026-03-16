import { motion } from 'framer-motion';

export default function LearnHeader({ title, description, gradient }) {
  return (
    <div className="mb-10">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-bold text-white mb-4"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-3xl"
        >
          {description}
        </motion.p>
      )}
      {/* Gradient accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`h-[2px] w-24 mt-6 rounded-full bg-gradient-to-r ${gradient || 'from-blue-500 to-cyan-400'} origin-left`}
      />
    </div>
  );
}
