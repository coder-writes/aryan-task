import { Activity, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="footer" className="py-20 px-6 border-t border-slate-200 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-8 h-8 text-accent" />
            <span className="text-2xl font-bold tracking-tighter uppercase font-mono">Genyx</span>
          </div>
          <p className="text-slate-600 max-w-md mb-8 leading-relaxed">
            India’s first AI Movement Intelligence Platform delivering precision fitness, performance intelligence and injury-free training at scale.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-accent transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-accent transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-accent transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Platform</h4>
          <ul className="space-y-4 text-slate-600 text-sm">
            <li><a href="#features" className="hover:text-slate-900 transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Computer Vision Stack</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Analytics Dashboard</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Partner Programs</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Company</h4>
          <ul className="space-y-4 text-slate-600 text-sm">
            <li><a href="#" className="hover:text-slate-900 transition-colors">About Genyx</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Terms</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
        <p>© 2026 Genyx AI Labs. All rights reserved.</p>
        <div className="flex gap-8">
          <span>Precision Training Intelligence</span>
          <span>Built in India</span>
        </div>
      </div>
    </footer>
  );
};
