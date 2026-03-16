import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-10 sm:mb-16 lg:mb-20"
    >
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4">
        {label}
      </span>
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {description && (
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
