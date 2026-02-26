import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';

const frameModules = import.meta.glob('../../ezgif-387d6469b51122f2-jpg/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const frames = Object.entries(frameModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, path]) => path);

export const ScrollingBackground = () => {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [activeFrame, setActiveFrame] = useState(0);
  const frameSet = useMemo(
    () => (isMobile ? frames.filter((_, index) => index % 2 === 0) : frames),
    [isMobile]
  );
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-170, 170]);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (prefersReducedMotion || frameSet.length <= 1) {
      return;
    }

    const cycles = isMobile ? 1.1 : 1.25;
    const index = Math.floor(latest * (frameSet.length - 1) * cycles) % frameSet.length;
    setActiveFrame((prev) => (prev === index ? prev : index));
  });

  useEffect(() => {
    setActiveFrame(0);
  }, [frameSet]);

  const currentFrame = useMemo(() => frameSet[activeFrame] ?? frameSet[0] ?? '', [activeFrame, frameSet]);

  if (!currentFrame) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentFrame}
          src={currentFrame}
          alt=""
          initial={{ opacity: 0.15 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.15 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          className="absolute inset-0 h-[118%] w-full object-cover saturate-110 contrast-110"
          style={{ y: parallaxY }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-white/18" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/12 via-white/6 to-white/32" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_0%,rgba(248,250,252,0.45)_75%)]" />
    </div>
  );
};
