import { motion } from 'framer-motion';
import { Trophy, Medal, ShieldCheck } from 'lucide-react';

import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';

const achievements = [
  {
    title: '1st Place in CTF Competition',
    organizer: 'Insight Information Security & Oman CERT',
    year: 'Competition Achievement',
    icon: Trophy,
    accent: 'from-amber-400/20 to-yellow-300/10',
    iconColor: 'text-amber-300',
    details: [
      'Won first place in a cybersecurity Capture The Flag competition organized by Insight Information Security and Oman CERT.',
      'Demonstrated strong offensive and defensive security problem-solving under competitive conditions.',
    ],
  },
  {
    title: '5th Place in Arab & Africa Regional Cybersecurity CTF',
    organizer: 'CyberTalents',
    year: 'Regional Achievement',
    icon: Medal,
    accent: 'from-blue-500/15 to-cyan-400/10',
    iconColor: 'text-cyan-300',
    details: [
      'Achieved 5th place in the Arab & Africa region cybersecurity CTF organized by CyberTalents.',
      'Competed against regional talent across practical security challenges and ranked among the top teams.',
    ],
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-16 sm:py-24 lg:py-32">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Recognition"
          title="Achievements"
          description="Competition results that reflect hands-on cybersecurity capability in high-pressure CTF environments."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;

            return (
              <GlassCard key={achievement.title} delay={index * 0.08} className="h-full">
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${achievement.accent} border border-white/[0.06] flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} className={achievement.iconColor} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap mb-2">
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 font-medium tracking-wide uppercase">
                        {achievement.year}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                        <ShieldCheck size={13} />
                        Verified Result
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      Organized by {achievement.organizer}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {achievement.details.map((detail) => (
                    <motion.div
                      key={detail}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.35 }}
                      className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 mt-2 flex-shrink-0" />
                      <span>{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}