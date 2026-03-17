import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';

const skillCategories = [
  {
    title: 'Security Operations',
    gradient: 'from-blue-400 to-blue-500',
    skills: [
      { name: 'SIEM Alert Triage & Prioritization', level: 91 },
      { name: 'Incident Ticketing & Escalation', level: 90 },
      { name: 'Log Correlation & Event Investigation', level: 88 },
      { name: 'SIEM Detection Engineering', level: 92 },
      { name: 'EDR Configuration & Monitoring', level: 88 },
      { name: 'Threat Intelligence & IOC Enrichment', level: 84 },
      { name: 'XDR Email Detection & Anti-Phishing Tuning', level: 86 },
      { name: 'Endpoint & Server EDR Onboarding', level: 89 },
      { name: 'DLP Implementation', level: 85 },
      { name: 'Incident Response', level: 90 },
    ],
  },
  {
    title: 'Security Engineering & Automation',
    gradient: 'from-emerald-400 to-teal-500',
    skills: [
      { name: 'Attack Simulation for Rule Validation', level: 90 },
      { name: 'PowerShell Security Automation', level: 87 },
      { name: 'Python Security Scripting', level: 88 },
      { name: 'Batch Scripting for Operational Tasks', level: 82 },
      { name: 'Firewall + EDR Web Filtering Controls', level: 84 },
      { name: 'Zero Trust Access (Global Secure Access)', level: 81 },
    ],
  },
  {
    title: 'Penetration Testing',
    gradient: 'from-cyan-400 to-cyan-500',
    skills: [
      { name: 'Network Services Testing', level: 91 },
      { name: 'Active Directory Assessment', level: 89 },
      { name: 'Web Application Security', level: 94 },
      { name: 'Mobile App Security', level: 86 },
    ],
  },
  {
    title: 'Security Intelligence',
    gradient: 'from-violet-400 to-violet-500',
    skills: [
      { name: 'PCAP & Traffic Analysis', level: 87 },
      { name: 'Email Threat Analysis', level: 85 },
      { name: 'Endpoint Threat Investigation', level: 82 },
      { name: 'Malware Triage & Basic Analysis', level: 78 },
      { name: 'Threat Intelligence Operations', level: 82 },
    ],
  },
];

function SkillBar({ name, level, delay, gradient }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[13px] text-slate-300 font-medium">{name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.4 }}
          className="text-[11px] text-slate-500 tabular-nums font-medium"
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-[5px] rounded-full bg-white/[0.04] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`h-full rounded-full bg-gradient-to-r ${gradient} shadow-[0_0_8px_rgba(59,130,246,0.3)]`}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-16 sm:py-24 lg:py-32">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Expertise"
          title="Technical Skills"
          description="Structured capabilities across SOC operations, detection engineering, security automation, Zero Trust access, and penetration testing." 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {skillCategories.map((category, catIndex) => (
            <GlassCard
              key={category.title}
              delay={catIndex * 0.1}
              className="space-y-6"
            >
              {/* Category Title */}
              <h3
                className={`text-base font-bold text-transparent bg-clip-text bg-gradient-to-r ${category.gradient}`}
              >
                {category.title}
              </h3>

              {/* Skills */}
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    gradient={category.gradient}
                    delay={catIndex * 0.15 + skillIndex * 0.08}
                  />
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
