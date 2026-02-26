import { motion } from 'motion/react';

const partners = [
  { name: 'Under Armour', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Under_armour_logo.svg' },
  { name: 'Reebok', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Reebok_2019_logo.svg' },
  { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
  { name: 'Puma', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_complete_logo.svg' },
  { name: 'The North Face', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/The_North_Face_logo.svg' },
  { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
];

export const Partners = () => {
  return (
    <div className="w-full py-12 border-t border-slate-200 bg-white/80 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner, i) => (
            <motion.img
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              src={partner.logo}
              alt={partner.name}
              className="h-8 md:h-10 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
