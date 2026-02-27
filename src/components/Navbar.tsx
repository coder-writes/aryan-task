import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/src/lib/ThemeContext';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-accent p-1.5 rounded-lg rotate-12">
            <Activity className="w-6 h-6 text-black" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Ge<span className="text-accent">nyx</span>
          </span>
        </div>

        <div className={`hidden lg:flex items-center gap-10 text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-slate-600 dark:text-slate-300' : 'text-white'}`}>
          <a href="#" className="hover:text-accent transition-colors">Home</a>
          <a href="#features" className="hover:text-accent transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-accent transition-colors">Testimonials</a>
          <a href="#footer" className="hover:text-accent transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full glass hover:text-accent transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className="px-6 py-2.5 bg-accent text-black font-bold rounded-full hover:bg-accent-hover transition-all">
            Book a Demo
          </button>
        </div>
      </div>
    </motion.nav>
  );
};
