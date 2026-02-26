import { motion } from 'motion/react';
import { Scan, BarChart3, Shield, BrainCircuit } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const features = [
  {
    title: 'AI Form Correction',
    description:
      'Computer vision analyzes every rep through phone or CCTV cameras, delivering real-time movement feedback with joint-level precision.',
    icon: Scan,
    highlighted: true,
  },
  {
    title: 'Smart Rep Scoring',
    description:
      'AI-driven quality scoring turns movement into measurable data — coaches benchmark progress and maintain execution standards automatically.',
    icon: BarChart3,
    highlighted: false,
  },
  {
    title: 'Predictive Fatigue Analytics',
    description:
      'Machine learning detects compensations and instability patterns early, enabling proactive injury prevention and recovery optimization.',
    icon: Shield,
    highlighted: false,
  },
  {
    title: 'Adaptive AI Coaching',
    description:
      'Neural networks personalize coaching at scale — premium gyms, studios and sports organizations deliver data-driven guidance without extra hardware.',
    icon: BrainCircuit,
    highlighted: false,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-mono uppercase tracking-widest mb-6"
        >
          AI-Powered Features
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 dark:text-white"
        >
          Built for <span className="text-accent">Precision</span> <br />
          Training Outcomes
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg"
        >
          Genyx brings lab-grade biomechanics intelligence to everyday coaching, helping users train smarter, safer and stronger.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.5 }}
            className={cn(
              "relative p-8 rounded-[2rem] transition-all duration-500 group overflow-hidden",
              feature.highlighted
                ? "bg-accent/10 border-2 border-accent/40 shadow-[0_0_40px_rgba(198,241,53,0.1)] dark:bg-accent/5"
                : "glass hover:border-accent/40 hover:shadow-[0_0_30px_rgba(198,241,53,0.08)]"
            )}
          >
            <div className="relative z-10 flex flex-col h-full">
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110",
                  feature.highlighted
                    ? "bg-accent text-black"
                    : "bg-accent/15 text-accent"
                )}
              >
                <feature.icon className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm flex-grow">
                {feature.description}
              </p>
            </div>

            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/5 blur-3xl rounded-full group-hover:bg-accent/10 transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
