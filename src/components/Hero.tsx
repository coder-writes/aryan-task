import { motion } from 'motion/react';
import { Camera, ShieldCheck, Activity, ChevronRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center mb-14 relative z-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight"
          >
            India’s First <span className="text-accent">AI Movement</span> <br />
            Intelligence Platform
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-slate-600 mt-6 max-w-3xl mx-auto text-base sm:text-lg"
          >
            Real-time computer vision for form correction, rep quality scoring, fatigue analytics, and adaptive coaching through phone or CCTV cameras.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex items-center justify-center"
          >
            <button className="group flex items-center gap-3 px-8 py-4 bg-accent text-black font-bold rounded-full shadow-[0_0_30px_rgba(198,241,53,0.3)] hover:shadow-[0_0_40px_rgba(198,241,53,0.5)] transition-all text-base sm:text-lg">
              Schedule Pilot
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-30">
          <StatCard
            icon={<Camera className="w-5 h-5 text-accent" />}
            title="Camera-First"
            value="No hardware install"
            delay={0.45}
          />
          <StatCard
            icon={<Activity className="w-5 h-5 text-accent" />}
            title="Movement Insights"
            value="Form + fatigue + stability"
            delay={0.55}
          />
          <StatCard
            icon={<ShieldCheck className="w-5 h-5 text-accent" />}
            title="Injury Prevention"
            value="Adaptive coaching at scale"
            delay={0.65}
          />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, title, value, delay }: { icon: React.ReactNode, title: string, value: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass p-6 rounded-2xl flex flex-col gap-3 min-w-[120px]"
  >
    <div className="bg-accent/15 w-fit p-2 rounded-xl">
      {icon}
    </div>
    <div className="text-slate-500 text-xs uppercase font-bold tracking-widest">{title}</div>
    <div className="text-lg font-semibold">{value}</div>
  </motion.div>
);
