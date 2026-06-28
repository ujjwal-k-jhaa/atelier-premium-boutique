import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const heroImage = "/src/assets/images/boutique_hero_1782563742365.jpg";

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <div 
      id="hero-section" 
      className="relative min-h-[calc(100vh-4rem)] md:min-h-screen flex flex-col justify-between overflow-hidden bg-[#FAF9F5] pt-16 md:pt-20"
    >
      {/* Decorative background grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e5e0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Main Split Screen Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center py-6 sm:py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left: Luxury Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 order-2 lg:order-1 text-center lg:text-left">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-50 border border-brand-200/50 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-800 animate-pulse" />
              <span className="text-[9px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-brand-800">
                Summer Collection 2026
              </span>
            </motion.div>

            {/* Main Editorial Display Header */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight leading-[1.1] sm:leading-[1.05] text-brand-950"
            >
              The Art of <br />
              <span className="italic font-normal">Restraint</span>
            </motion.h1>

            {/* Subheader copy */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xs sm:text-base text-brand-600 font-sans font-light leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              A meticulous study of natural architecture, premium Italian linens, and fluid drape. Highly curated essentials designed for the modern wardrobe.
            </motion.p>

            {/* Touch-optimized Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4"
            >
              <button
                id="hero-explore-btn"
                onClick={onExploreClick}
                className="group flex items-center justify-center gap-3 bg-brand-950 text-white px-8 py-4 text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-brand-800 active:scale-[0.98] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              >
                Explore Collection
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                id="hero-editorial-btn"
                onClick={() => {
                  const el = document.getElementById('editorial-story-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 text-xs font-sans uppercase tracking-[0.2em] font-semibold border border-brand-200 text-brand-800 bg-white/45 backdrop-blur-xs hover:border-brand-950 hover:text-brand-950 hover:bg-white transition-all duration-300 cursor-pointer"
              >
                View Editorial
              </button>
            </motion.div>
          </div>

          {/* Right: Stunning Boutique Image (Fills nicely on mobile too) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 order-1 lg:order-2 w-full"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/4] w-full rounded-xs overflow-hidden shadow-sm border border-brand-200/40 bg-brand-100 group">
              <img
                src={heroImage}
                alt="Atelier Premium Summer Editorial Campaign"
                className="w-full h-full object-cover object-center transform group-hover:scale-[1.015] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/20 to-transparent pointer-events-none" />
              
              {/* Discrete premium watermark badge */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-brand-950 border border-brand-200/40">
                Atelier No. 04
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Quiet Luxury bar */}
      <div className="relative z-10 border-t border-brand-200/60 py-4 sm:py-6 bg-[#FAF9F5]/40 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-brand-400 font-sans font-medium text-center">
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-brand-300" />
              <span>01 / Curated Materials</span>
            </div>
            <div className="hidden sm:block text-brand-200">•</div>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-brand-300" />
              <span>02 / Handcrafted Construction</span>
            </div>
            <div className="hidden sm:block text-brand-200">•</div>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-brand-300" />
              <span>03 / Circular Sourcing</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
