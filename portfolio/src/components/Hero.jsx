import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Shield, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Background layers ────────────────────────────── */}
      <div className="absolute inset-0 bg-[#0B0F1A]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.12),transparent)]" />
      <div
        className="absolute inset-0 bg-grid-pattern opacity-100"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-[15%] -left-40 w-[500px] h-[500px] bg-blue-600/[0.07] rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-[10%] -right-40 w-[500px] h-[500px] bg-cyan-500/[0.06] rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-72 h-72 bg-violet-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      {/* ── Content ──────────────────────────────────────── */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20 w-full">
        <div className="flex flex-col items-center">
          {/* Text */}
          <div className="text-center max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-blue-500/[0.08] border border-blue-500/[0.15] text-blue-400 text-[11px] sm:text-[13px] font-medium mb-6 sm:mb-8"
            >
              <Shield size={14} />
              <span>Senior Executive Information Security</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.5rem] sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.05] mb-4 sm:mb-6"
            >
              <span className="text-white">Basil</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                AlShuakili
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-1 sm:px-0"
            >
              Specialized in Threat Detection, Security Monitoring, and
              Penetration Testing — defending digital assets and strengthening
              organizational security posture.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-8 sm:mb-10"
            >
              <a
                href="#experience"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold text-sm sm:text-[15px] shadow-[0_0_28px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                Professional Journey
                <Zap
                  size={16}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />
              </a>
              <a
                href="#skills"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border border-white/[0.1] text-slate-300 font-medium text-sm sm:text-[15px] hover:bg-white/[0.05] hover:border-white/[0.18] transition-all duration-300"
              >
                Technical Expertise
              </a>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-2 text-sm text-slate-500 justify-center"
            >
              <MapPin size={14} />
              <span>Muscat, Oman</span>
            </motion.div>
          </div>


        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        >
          <span className="text-[11px] tracking-widest uppercase text-slate-600">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} className="text-slate-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
