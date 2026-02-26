import { motion } from 'motion/react';
import { SectionHeader } from './ui/SectionHeader';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Vikram Singh',
    role: 'Strength Coach, Bengaluru',
    content:
      'Genyx transformed our coaching floor. Real-time form cues help clients fix movement faults in-session, not weeks later.',
    avatar: "https://picsum.photos/seed/p1/100/100",
  },
  {
    name: 'Sarah Chen',
    role: 'Founder, Boutique Studio',
    content:
      'The rep quality and fatigue insights keep members engaged and confident. It gives our team a premium edge without new hardware.',
    avatar: "https://picsum.photos/seed/p2/100/100",
  },
  {
    name: 'Arjun Mehta',
    role: 'Performance Physio, Mumbai',
    content:
      'The stability analytics are a game-changer for prevention and return-to-play. We now make decisions on movement data, not guesswork.',
    avatar: "https://picsum.photos/seed/p3/100/100",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader
        title="Trusted by Coaches and Performers"
        subtitle="From elite training floors to premium studios, teams use Genyx to deliver safer and smarter sessions."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-3xl relative"
          >
            <Quote className="absolute top-6 right-8 w-10 h-10 text-accent/10" />
            
            <div className="flex items-center gap-4 mb-6">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full border-2 border-accent/30"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-bold">{t.name}</h4>
                <p className="text-xs text-accent font-mono uppercase tracking-wider">{t.role}</p>
              </div>
            </div>
            
            <p className="text-slate-600 italic leading-relaxed">
              "{t.content}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
