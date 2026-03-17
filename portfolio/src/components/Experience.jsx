import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    title: 'Senior Executive Information Security',
    company: 'Dhofar Insurance Company',
    date: 'Dec 2025 — Present',
    achievements: [
      'Lead security monitoring and incident handling activities, ensuring timely triage, containment, and escalation of high-risk alerts',
      'Develop and tune custom SIEM, EDR, DLP, and XDR detections to improve signal quality and reduce alert fatigue',
      'Perform controlled attack simulation to validate newly created detection rules and verify expected alert behavior',
      'Configure XDR email detection policies to mitigate phishing, spam, and malicious email threats',
      'Implement Microsoft Global Secure Access to support Zero Trust access objectives and reduce traditional VPN dependence',
      'Apply layered web filtering controls at firewall and EDR levels to block malicious and non-business web categories',
      'Onboard endpoints and servers into EDR with policy baselining to strengthen enterprise-wide visibility and response readiness',
      'Build security automation scripts in PowerShell, Python, and batch for repetitive SOC and hardening workflows',
      'Execute recurring penetration testing across network services, Active Directory, and web applications with remediation guidance',
    ],
  },
  {
    title: 'SOC Analyst L1',
    company: 'Omantel (via Insight Information Security)',
    date: 'Feb 2025 — Nov 2025',
    achievements: [
      'Monitored SIEM and security consoles continuously and performed first-level alert triage based on severity and business impact',
      'Investigated suspicious events through log correlation (Windows, Linux, firewall, proxy, DNS, and endpoint telemetry)',
      'Performed endpoint, email, and network investigations including PCAP review for phishing, malware, and command-and-control activity',
      'Created and updated incident tickets with clear timelines, evidence, and analyst notes for escalation and audit traceability',
      'Executed initial containment actions following SOC playbooks (host isolation, IOC blocking, and account-related escalations)',
      'Conducted IOC enrichment and threat intelligence lookups to improve investigation depth and decision quality',
      'Escalated validated incidents to L2/L3 teams with actionable context, reducing handoff time during active incidents',
      'Supported shift handover reporting and operational metrics to maintain continuity across 24/7 SOC operations',
      'Contributed to detection tuning feedback by documenting recurring false positives and suspicious behavior patterns',
    ],
  },
  {
    title: 'Information Security Consultant',
    company: 'Dhofar Insurance Company',
    date: 'May 2023 — Dec 2024',
    achievements: [
      'Performed mobile application security assessments (Android) including static and dynamic testing techniques',
      'Executed vulnerability assessments across infrastructure, servers, and internal services with prioritized remediation recommendations',
      'Conducted web application penetration testing and delivered detailed technical reports with risk ratings and business impact',
      'Performed network and Active Directory security testing, including privilege escalation path analysis',
      'Collaborated with technical teams to validate remediation actions through re-testing and verification cycles',
      'Supported recurring penetration testing activities as part of continuous security improvement initiatives',
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
                  <div className="w-[15px] h-[15px] md:w-[23px] md:h-[23px] rounded-full flex items-center justify-center bg-[#151b2e] border-2 border-slate-700 ring-4 ring-[#0B0F1A]">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-400/80" />
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-slate-500 font-medium">
                    {exp.date}
                  </span>
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
