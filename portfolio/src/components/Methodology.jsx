import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import { Eye, Bug, Cog } from 'lucide-react';

const methodologies = [
  {
    icon: Eye,
    title: 'Proactive Threat Monitoring',
    description:
      'Implementing continuous security monitoring with custom detection rules to identify threats before they impact business operations. Focusing on behavioral analytics and anomaly detection rather than signature-based approaches alone.',
    gradient: 'from-blue-500 to-blue-600',
    glow: 'group-hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)]',
  },
  {
    icon: Bug,
    title: 'Comprehensive Security Testing',
    description:
      'Applying systematic penetration testing methodologies across all enterprise layers — from network infrastructure and Active Directory to web applications and endpoints. Each assessment follows standardized frameworks with clear remediation guidance.',
    gradient: 'from-cyan-500 to-cyan-600',
    glow: 'group-hover:shadow-[0_8px_40px_rgba(6,182,212,0.12)]',
  },
  {
    icon: Cog,
    title: 'Detection Engineering',
    description:
      'Developing sophisticated detection logic for SIEM, EDR, and DLP systems that balances alert accuracy with operational efficiency. Continuously refining rules based on threat intelligence and attack trend analysis.',
    gradient: 'from-violet-500 to-violet-600',
    glow: 'group-hover:shadow-[0_8px_40px_rgba(139,92,246,0.12)]',
  },
];

export default function Methodology() {
  return (
    <section id="methodology" className="relative py-16 sm:py-24 lg:py-32">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.008] to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Approach"
          title="Security Methodology"
          description="A structured, proactive approach to enterprise security across monitoring, testing, and detection."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {methodologies.map((item, index) => (
            <GlassCard
              key={item.title}
              delay={index * 0.1}
              className={`group ${item.glow}`}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} bg-opacity-15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                style={{ background: `linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.05))` }}
              >
                <item.icon size={24} className="text-blue-400" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-3 leading-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] sm:text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
