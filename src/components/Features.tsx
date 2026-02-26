import { motion } from 'motion/react';
import { Scan, BarChart3, Shield, Users } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const features = [
  {
    title: 'Real-Time Form Correction',
    description:
      'Analyze every rep through phone or CCTV cameras and deliver instant movement feedback to athletes and members.',
    icon: Scan,
    highlighted: true,
  },
  {
    title: 'Rep Quality Scoring',
    description:
      'Turn movement into measurable quality scores so coaches can benchmark progress and maintain execution standards.',
    icon: BarChart3,
    highlighted: false,
  },
  {
    title: 'Fatigue & Stability Analytics',
    description:
      'Detect compensations and instability early with AI-powered analytics built for performance and injury prevention.',
    icon: Shield,
    highlighted: false,
  },
  {
    title: 'Adaptive Coaching at Scale',
    description:
      'Enable premium gyms, studios, hotels and sports organisations to offer data-driven coaching without extra hardware.',
    icon: Users,
    highlighted: false,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6"
        >
          Built for <span className="text-accent">Precision</span> <br />
          Training Outcomes
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 max-w-2xl mx-auto text-lg"
        >
          Genyx brings lab-grade biomechanics intelligence to everyday coaching, helping users train smarter, safer and stronger.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative p-8 rounded-[2.5rem] transition-all duration-500 group overflow-hidden",
              feature.highlighted 
                ? "bg-accent/12 border-2 border-accent shadow-[0_0_40px_rgba(198,241,53,0.1)]" 
                : "bg-white/60 border border-slate-200 hover:border-accent/50"
            )}
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110",
                feature.highlighted ? "bg-accent text-black" : "bg-accent/20 text-accent"
              )}>
                <feature.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-10 flex-grow">
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
