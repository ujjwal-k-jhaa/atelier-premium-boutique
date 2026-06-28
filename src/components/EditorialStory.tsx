import React, { useState } from 'react';
import { Eye, Heart, Sparkles, Sprout } from 'lucide-react';

interface MaterialStory {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  attributes: string[];
  certification: string;
}

const MATERIAL_STORIES: MaterialStory[] = [
  {
    id: 'silk',
    name: 'Grade-6A Mulberry Silk',
    subtitle: 'Woven Fluidity',
    tagline: 'Sandwashed for an exquisite, skin-like finish.',
    description: 'Our silk is harvested from sustainable mulberry orchards in Zhejiang, where silkworms feed exclusively on fresh mulberry leaves. Once spun, the raw yarn is sandwashed using smooth river-pebbles, removing the standard harsh luster to produce an incredibly soft, velvet-matte finish that regulates heat beautifully across all seasons.',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop',
    attributes: ['100% Biodegradable', 'Naturally Hypoallergenic', '19 Momme Durable Weave'],
    certification: 'GOTS & OEKO-TEX Standard 100 Certified'
  },
  {
    id: 'cashmere',
    name: 'Mongolian Cashmere',
    subtitle: 'Ethical Thermal Luxury',
    tagline: 'Sourced from organic Altai Mountain pastures.',
    description: 'Knitted from the highly prized undercoat of free-roaming cashmere goats. Our artisans comb the goats gently by hand during the natural spring moulting season. We selectively utilize only the longest, finest fibers (averaging 15 microns) to guarantee exceptional resistance to pilling and a weightless, cloud-like warmth.',
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=600&auto=format&fit=crop',
    attributes: ['Cruelty-Free Combed', 'Superfine 15-Micron Fibers', '12-Gauge Fine Knit'],
    certification: 'Sustainable Fibre Alliance (SFA) Approved'
  },
  {
    id: 'wool',
    name: 'Double-Faced Virgin Wool',
    subtitle: 'Architectural Structure',
    tagline: 'Hand-stitched in heritage mills of Lombardy, Italy.',
    description: 'Our signature outerwear is constructed from double-faced virgin wool, spun by a family-owned mill in Biella. Two individual layers of extra-fine wool are woven together on specialized looms, connected by invisible threads. This yields a self-lining, highly insulated fabric with twice the structure, but half the heavy bulk of traditional coats.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
    attributes: ['Italian Handcrafted', 'Zero Waste Tailoring', 'Self-Lining Structure'],
    certification: 'Responsible Wool Standard (RWS) Certified'
  }
];

export default function EditorialStory() {
  const [activeStory, setActiveStory] = useState<string>('silk');
  const current = MATERIAL_STORIES.find((s) => s.id === activeStory) || MATERIAL_STORIES[0];

  return (
    <section id="editorial-story-section" className="bg-[#FAF9F5] border-t border-brand-200/50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-brand-400">
            Material Sourcing & Transparency
          </span>
          <h3 className="text-3xl sm:text-4xl font-serif text-brand-950 font-light tracking-tight leading-tight">
            The Philosophy of Raw Fibers
          </h3>
          <p className="text-xs text-brand-500 font-sans font-light leading-relaxed max-w-md mx-auto">
            Atelier garments are designed inside-out. We begin with raw biological structures to engineer long-lasting capsule textures with pristine physical drapes.
          </p>
        </div>

        {/* Asymmetrical Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Nav & Text Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Custom Horizontal Tabs */}
            <div className="flex border-b border-brand-200/60 pb-3 gap-6 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
              {MATERIAL_STORIES.map((story) => (
                <button
                  id={`material-tab-${story.id}`}
                  key={story.id}
                  onClick={() => setActiveStory(story.id)}
                  className={`text-xs uppercase tracking-[0.2em] font-semibold transition-all py-1.5 shrink-0 relative ${
                    activeStory === story.id ? 'text-brand-950' : 'text-brand-400 hover:text-brand-950'
                  }`}
                >
                  {story.subtitle}
                  {activeStory === story.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-950 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Story copy with beautiful typography */}
            <div className="space-y-6 animate-fade-in">
              <span className="inline-block text-[10px] text-brand-500 uppercase tracking-widest font-mono border border-brand-200 px-2 py-0.5 rounded-sm">
                {current.certification}
              </span>
              <h4 className="text-2xl sm:text-3xl font-serif text-brand-950 font-light tracking-tight">
                {current.name}
              </h4>
              <p className="text-sm font-sans font-medium text-brand-800 leading-relaxed italic border-l-2 border-brand-400 pl-4">
                "{current.tagline}"
              </p>
              <p className="text-xs sm:text-sm text-brand-500 font-sans font-light leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Specifications list */}
            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-brand-200/40">
              {current.attributes.map((attr, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-800 shrink-0" />
                  <span className="text-xs text-brand-700 font-sans font-medium">{attr}</span>
                </div>
              ))}
            </div>

            {/* Micro Quote Badge */}
            <div className="bg-white border border-brand-200/50 p-4 rounded-xs flex items-center gap-3.5 max-w-md">
              <div className="p-2 bg-brand-50 rounded-full shrink-0">
                <Sprout className="w-4 h-4 text-brand-700" />
              </div>
              <div className="font-sans">
                <p className="text-[10px] font-bold text-brand-950 uppercase tracking-wider">Circular Buy-Back Ecosystem</p>
                <p className="text-[10px] text-brand-500 font-light">Every organic garment can be recycled back into beautiful raw fibers for upcoming collections.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Frame (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] overflow-hidden rounded-xs bg-brand-200 shadow-xl border border-brand-200/30">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/20 to-transparent pointer-events-none" />
            </div>

            {/* Offset floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-brand-950 text-white p-6 rounded-xs shadow-lg hidden sm:block max-w-[200px] border border-brand-800/50">
              <Sparkles className="w-5 h-5 text-brand-200 mb-2" />
              <p className="text-[10px] font-bold tracking-widest uppercase text-brand-300">Sartorial Quality</p>
              <p className="text-[10px] text-brand-100 font-light leading-relaxed mt-1">Zero artificial polymers or microplastics. Built purely for lifetime wear.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
