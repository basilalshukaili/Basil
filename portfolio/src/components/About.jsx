import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';

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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto space-y-5"
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
      </div>
    </section>
  );
}
