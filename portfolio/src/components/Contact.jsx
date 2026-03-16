import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'basilalshukaili@gmail.com',
    href: 'mailto:basilalshukaili@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+968 9463 9405',
    href: 'tel:+96894639405',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Muscat, Oman',
    href: null,
  },
];

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-32">
      {/* Background effects */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.04),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Contact"
          title="Let's Connect"
          description="Open to discussing security challenges, collaboration opportunities, and new roles."
        />

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-14 max-w-3xl mx-auto">
          {contactInfo.map((item, index) => (
            <GlassCard key={item.label} delay={index * 0.1}>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-400/10 flex items-center justify-center">
                  <item.icon size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-500 mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-slate-300 hover:text-white transition-colors duration-200 break-all sm:break-normal"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-300">{item.value}</p>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-3"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)] transition-all duration-300 hover:-translate-y-1"
            >
              <link.icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
