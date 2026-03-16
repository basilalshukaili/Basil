import { useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';

export default function LearnLayout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="bg-[#0B0F1A] text-white min-h-screen noise-overlay">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_1px_40px_rgba(0,0,0,0.3)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_16px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_24px_rgba(59,130,246,0.5)] transition-shadow duration-300">
              <Shield size={15} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-[1.05rem] tracking-tight">
              Basil{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                AlShuakili
              </span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className="px-3.5 py-2 text-[13px] font-medium rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-all duration-200"
            >
              <span className="hidden sm:inline">About Basil</span>
              <span className="sm:hidden flex items-center gap-1">
                <ArrowLeft size={14} />
                Home
              </span>
            </Link>
            <Link
              to="/learn"
              className="px-3.5 py-2 text-[13px] font-medium rounded-lg text-white bg-white/[0.06] transition-all duration-200 relative"
            >
              Learn with Basil
              <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm text-slate-500">
          © 2025 Basil AlShuakili. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
