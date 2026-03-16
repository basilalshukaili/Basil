import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Methodology from './components/Methodology';
import Contact from './components/Contact';
import Footer from './components/Footer';

import LearnLayout from './components/learn/LearnLayout';
import LearnHub from './components/learn/LearnHub';
import CategoryPage from './components/learn/CategoryPage';
import SubcategoryPage from './components/learn/SubcategoryPage';
import TopicPage from './components/learn/TopicPage';
import ContentPage from './components/learn/ContentPage';

/* ─── Scroll Progress Bar ────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

/* ─── Scroll-to-Top Button ───────────────────────────────── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-white/[0.06] border border-white/[0.1] backdrop-blur-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.16] shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─── Portfolio Home (original page) ─────────────────────── */
function PortfolioHome() {
  return (
    <div className="bg-[#0B0F1A] text-white min-h-screen noise-overlay">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Methodology />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

/* ─── App ────────────────────────────────────────────────── */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
      <Route path="/learn" element={<LearnLayout />}>
        <Route index element={<LearnHub />} />
        <Route path=":categorySlug" element={<CategoryPage />} />
        <Route path=":categorySlug/:subcategorySlug" element={<SubcategoryPage />} />
        <Route path=":categorySlug/:subcategorySlug/:topicSlug" element={<TopicPage />} />
        <Route path=":categorySlug/:subcategorySlug/:topicSlug/:subtopicSlug" element={<ContentPage />} />
      </Route>
    </Routes>
  );
}
