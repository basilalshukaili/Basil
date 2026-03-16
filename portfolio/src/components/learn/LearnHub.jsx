import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import * as Icons from 'lucide-react';
import { categories } from '../../data/learnData';
import LearnHeader from './LearnHeader';

export default function LearnHub() {
  return (
    <div>
      <LearnHeader
        title="Cybersecurity Academy"
        description="Welcome to the comprehensive cybersecurity learning platform. This academy covers everything from pre-cybersecurity fundamentals to advanced topics and emerging technologies. Start your journey to becoming a cybersecurity expert today!"
      />

      {/* Categories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-16">
        {categories.map((cat, i) => {
          const IconComponent = Icons[cat.icon] || BookOpen;
          return (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                to={`/learn/${cat.slug}`}
                className="group block relative rounded-2xl border glass-card p-6 h-full transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(59,130,246,0.08)]"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cat.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  >
                    <IconComponent size={22} className="text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-3">
                    {cat.description}
                  </p>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                    Explore
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-blue-500/[0.06] to-cyan-400/[0.04] p-8 sm:p-10 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_60%)]" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={20} className="text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Start Your Learning Journey</h2>
          </div>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Begin with the fundamentals and work your way up to advanced topics. Check out the first completed topic as an example.
          </p>
          <Link
            to="/learn/pre-cybersecurity/networking/osi-model/physical-layer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold text-sm hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 hover:-translate-y-0.5"
          >
            View Sample: Physical Layer
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
