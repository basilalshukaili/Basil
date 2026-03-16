import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map((l) => l.href.slice(1));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 120;
          if (window.scrollY >= top) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_1px_40px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_16px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_24px_rgba(59,130,246,0.5)] transition-shadow duration-300">
            <Shield size={15} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-[1.05rem] tracking-tight">
            Basil{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              AlShuakili
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-white/[0.06]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <a
          href={`${import.meta.env.BASE_URL}learn.html`}
          className="hidden md:inline-flex items-center gap-2 text-[13px] font-semibold px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(59,130,246,0.45)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          Learn with Basil
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/[0.06] transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <X size={20} className="text-slate-300" />
          ) : (
            <Menu size={20} className="text-slate-300" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-16 inset-x-0 md:hidden bg-[#0d1220]/95 backdrop-blur-2xl border-b border-white/[0.06]"
            >
              <div className="px-6 py-6 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`py-3 px-4 rounded-xl text-[15px] font-medium transition-colors ${
                      activeSection === link.href.slice(1)
                        ? 'text-white bg-white/[0.06]'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href={`${import.meta.env.BASE_URL}learn.html`}
                  className="mt-4 text-center text-sm font-semibold px-5 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Learn with Basil
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
