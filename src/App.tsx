import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ScrollingBackground } from './components/ScrollingBackground';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative isolate bg-background text-slate-900 selection:bg-accent/30 selection:text-accent overflow-x-hidden">
      <ScrollingBackground />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
        style={{ scaleX }}
      />

      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <Features />
          <Testimonials />
        </main>

        <Footer />
      </div>
    </div>
  );
}
