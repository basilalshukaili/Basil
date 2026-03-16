import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    title: 'Senior Executive Information Security',
    company: 'Dhofar Insurance Company',
    date: 'Dec 2025 — Present',
    current: true,
    achievements: [
      'Oversee security alerts and incident management, ensuring timely detection and response to security threats',
      'Develop and implement custom SIEM detection rules for sophisticated attack patterns and anomalous behaviors',
      'Create specialized EDR detection rules enhancing threat visibility across all endpoints',
      'Design and deploy DLP detection rules, monitoring alerts to prevent sensitive data exfiltration',
      'Conduct penetration testing of network services, identifying vulnerabilities and remediation strategies',
      'Perform comprehensive Active Directory security assessments and privilege escalation testing',
      'Execute thorough web application penetration testing using automated and manual methodologies',
    ],
  },
  {
    title: 'SOC Analyst L1',
    company: 'Omantel (via Insight Information Security)',
    date: 'Feb 2025 — Nov 2025',
    current: false,
    achievements: [
      'Conducted in-depth PCAP analysis for network traffic investigation and threat identification',
      'Performed email security analysis to detect phishing campaigns and malicious attachments',
      'Executed endpoint security analysis and malware investigation across enterprise systems',
      'Developed and refined detection rules for improved threat visibility',
      'Analyzed threat intelligence feeds and generated DDoS attack mitigation reports',
      'Enhanced technical skills through continuous learning on the Immersive Labs platform',
    ],
  },
  {
    title: 'Information Security Consultant',
    company: 'Dhofar Insurance Company',
    date: 'May 2023 — Sep 2024',
    current: false,
    achievements: [
      'Conducted comprehensive mobile Android application security assessments and penetration testing',
      'Performed vulnerability assessments across information systems and infrastructure',
      'Executed detailed web application penetration testing with full remediation reporting',
      'Conducted network penetration testing and Active Directory privilege escalation testing',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-16 sm:py-24 lg:py-32">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Career"
          title="Professional Experience"
          description="A progressive journey through cybersecurity roles, from consulting to enterprise security leadership."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[7px] md:left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-500/40 via-blue-400/20 to-transparent" />

          <div className="space-y-14">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title + exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1 top-[6px]">
                  <div
                    className={`w-[15px] h-[15px] md:w-[23px] md:h-[23px] rounded-full flex items-center justify-center ${
                      exp.current
                        ? 'bg-blue-500 shadow-[0_0_16px_rgba(59,130,246,0.5)]'
                        : 'bg-[#151b2e] border-2 border-slate-700'
                    } ring-4 ring-[#0B0F1A]`}
                  >
                    {exp.current && (
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>

                {/* Date & Status */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-slate-500 font-medium">
                    {exp.date}
                  </span>
                  {exp.current && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/[0.08] text-emerald-400 border border-emerald-500/[0.15] font-medium">
                      Current Role
                    </span>
                  )}
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1] hover:shadow-[0_8px_40px_rgba(59,130,246,0.06)] transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Briefcase size={16} className="text-blue-400 sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-2.5">
                    {exp.achievements.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 sm:gap-3 text-[12px] sm:text-sm text-slate-400 leading-relaxed"
                      >
                        <span className="w-1 h-1 rounded-full bg-blue-400/60 mt-[7px] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
