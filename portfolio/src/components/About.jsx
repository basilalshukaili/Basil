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
            I am an information security professional focused on practical,
            measurable security outcomes. With a Bachelor's degree in Computer
            Science (Cybersecurity) from Sultan Qaboos University, I combine
            strong technical fundamentals with hands-on enterprise experience
            across monitoring, detection engineering, and security validation.
          </p>
          <p className="text-slate-400 leading-relaxed">
            My journey spans security consulting, SOC analysis, and now security
            leadership responsibilities. I design and tune SIEM, EDR, DLP, and
            XDR detections, then validate them through controlled attack
            simulation to ensure rules are actionable and resilient in real
            operational conditions.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Currently serving as Senior Executive Information Security at Dhofar
            Insurance Company, I lead initiatives including endpoint and server
            onboarding into EDR, layered web filtering through firewall and EDR,
            security automation using PowerShell/Python/batch scripts, and Zero
            Trust access modernization through Global Secure Access to reduce
            reliance on traditional VPN architecture.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
