import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import { GraduationCap, ShieldCheck, Award } from 'lucide-react';

const education = [
  {
    icon: GraduationCap,
    title: 'Bachelor of Computer Science',
    institution: 'Sultan Qaboos University',
    date: '2019 — 2025',
    description:
      'Specialized in Cybersecurity and Computing Infrastructure with focus on Enterprise Security Architecture.',
    color: 'from-blue-500/20 to-blue-600/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: ShieldCheck,
    title: 'Penetration Testing Platform',
    institution: 'Hack The Box Academy',
    date: 'Completed 2024',
    description:
      'Comprehensive training in advanced penetration testing methodologies, enterprise network exploitation, and Active Directory security.',
    color: 'from-cyan-500/20 to-cyan-600/10',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Award,
    title: 'Security Operations & SIEM',
    institution: 'Immersive Labs Platform',
    date: 'Ongoing',
    description:
      'Advanced training in SIEM configuration, threat detection engineering, and security analytics.',
    color: 'from-violet-500/20 to-violet-600/10',
    iconColor: 'text-violet-400',
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-16 sm:py-24 lg:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.008] to-transparent pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Education"
          title="Education & Certifications"
          description="Academic foundation and professional development in cybersecurity."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {education.map((item, index) => (
            <GlassCard key={item.title} delay={index * 0.1} className="group">
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <item.icon size={22} className={item.iconColor} />
              </div>

              {/* Date */}
              <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-500">
                {item.date}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mt-2 mb-1 leading-tight">
                {item.title}
              </h3>

              {/* Institution */}
              <p className="text-sm text-blue-400/70 mb-4 font-medium">
                {item.institution}
              </p>

              {/* Description */}
              <p className="text-[13px] text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
