import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import SectionHeading from './ui/SectionHeading';

const stats = [
  { number: 5, suffix: '+', label: 'Years in Cybersecurity' },
  { number: 3, suffix: '+', label: 'Enterprise Security Roles' },
  { number: 50, suffix: '+', label: 'Security Assessments' },
];

function AnimatedNumber({ target, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setCount(current);
    }, 40);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-16 sm:py-24 lg:py-32">
      {/* Subtle divider gradient at top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="About Me"
          title="Securing Digital Frontiers"
        />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 space-y-5"
          >
            <p className="text-lg text-slate-300 leading-relaxed">
              I am a dedicated information security specialist with a passion
              for defending digital assets and improving organizational security
              posture. With a Bachelor's degree in Computer Science specializing
              in Cybersecurity from Sultan Qaboos University, I combine academic
              excellence with hands-on practical experience in enterprise security
              operations.
            </p>
            <p className="text-slate-400 leading-relaxed">
              My cybersecurity journey has evolved from foundational security
              consulting to specialized roles in Security Operations Center (SOC)
              analysis and now into a comprehensive information security position.
              I thrive on the challenge of staying ahead of emerging threats while
              implementing robust security measures.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Currently serving as Senior Executive Information Security at Dhofar
              Insurance Company, I oversee critical security functions including
              threat monitoring, detection engineering, and proactive security
              testing across enterprise environments.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="lg:col-span-2 grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-1 gap-3 sm:gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-3 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] hover:shadow-[0_8px_32px_rgba(59,130,246,0.06)] transition-all duration-300 cursor-default text-center sm:text-left"
              >
                <div className="text-xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-1">
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-[11px] sm:text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
