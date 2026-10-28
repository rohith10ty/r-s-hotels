import React from 'react';
import { Award, Compass, ShieldCheck, HeartHandshake, Wine } from 'lucide-react';

const PILLARS = [
  {
    icon: Award,
    title: "Michelin Key Heritage",
    description: "Every sanctuary in the R's collection holds prestigious multi-Michelin Keys, recognizing architectural majesty and culinary distinction."
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Butler Service",
    description: "Discrete, intuitive butler hosts handle packing, private dining reservations, and tailor-made expeditions seamlessly."
  },
  {
    icon: Wine,
    title: "Sommelier Cellars",
    description: "Subterranean wine caves curated with rare Grand Cru vintages, private tasting masterclasses, and vintage pairings."
  },
  {
    icon: Compass,
    title: "Helipad & Yacht Access",
    description: "Direct arriving transfers via private helicopter or Riva yachts straight to cliffside docks and alpine pads."
  }
];

const ExperienceShowcase = () => {
  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel-dark rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-white/20">
          
          {/* Header */}
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-rose-200 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md mb-3 border border-white/10">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>The R's Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Hospitality as a Living Art Form
            </h2>
            <p className="text-rose-100/80 text-xs sm:text-sm mt-3 leading-relaxed font-medium">
              We reject the ordinary. R's Hotels exists for discerning travelers seeking tranquil sanctuaries where every detail—from hand-pressed linens to private sunset boat departures—is orchestrated to perfection.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 pt-8 border-t border-white/15">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={pillar.title}
                  className="p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-burgundy-950/80 flex items-center justify-center text-rose-200 mb-3 border border-white/10">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-white mb-1.5">{pillar.title}</h3>
                  <p className="text-xs text-rose-100/70 leading-relaxed font-medium">{pillar.description}</p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExperienceShowcase;
