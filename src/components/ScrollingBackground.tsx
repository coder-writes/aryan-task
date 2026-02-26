import { motion, useScroll, useTransform } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

const frameModules = import.meta.glob('../../ezgif-387d6469b51122f2-jpg/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const framePaths = Object.entries(frameModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, path]) => path);

export const ScrollingBackground = () => {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Preload all frames
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    framePaths.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (!cancelled && loadedCount === framePaths.length) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
      };
      images[i] = img;
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Draw frame to canvas
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cover-fit the image
    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const scale = Math.max(canvasW / imgW, canvasH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = (canvasW - drawW) / 2;
    const drawY = (canvasH - drawH) / 2;

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Resize canvas to match window
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.15;
      if (loaded) drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loaded, drawFrame]);

  // Update frame on scroll
  useEffect(() => {
    if (!loaded) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const totalFrames = framePaths.length;
      const index = Math.min(
        Math.floor(latest * (totalFrames - 1)),
        totalFrames - 1
      );

      if (index !== currentFrameRef.current) {
        currentFrameRef.current = index;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(index));
      }
    });

    // Draw first frame
    drawFrame(0);

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, scrollYProgress, drawFrame]);

  if (framePaths.length === 0) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-[115%] saturate-110 contrast-110"
        style={{ y: parallaxY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />
      <div className="absolute inset-0 bg-white/15 dark:bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white/30 dark:from-black/20 dark:via-black/10 dark:to-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_0%,rgba(248,250,252,0.4)_75%)] dark:bg-[radial-gradient(circle_at_50%_20%,transparent_0%,rgba(15,23,42,0.6)_75%)]" />
    </div>
  );
};
