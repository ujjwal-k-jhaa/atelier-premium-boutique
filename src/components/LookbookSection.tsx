import React, { useState } from 'react';
import { Eye, ShoppingBag, Check, Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

interface LookbookSectionProps {
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

interface CapsuleLook {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemIds: string[];
}

const CAPSULE_LOOKS: CapsuleLook[] = [
  {
    id: 'parisian-street',
    name: 'The Parisian Street Look',
    tagline: 'Classic silhouettes, elevated for crisp city mornings.',
    description: 'A timeless, highly polished aesthetic pairing our heavyweight organic cotton trench coat with double pleated virgin wool trousers and our signature fluid mulberry silk blouse. Styled with structural drapes that feel naturally poised.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
    itemIds: ['tailored-trench-coat', 'structured-wool-trousers', 'classic-silk-blouse']
  },
  {
    id: 'riviera-escape',
    name: 'The Riviera Escape Lounge',
    tagline: 'Breathable resort comfort crafted from rich raw weaves.',
    description: 'Effortless warm-weather sophistication. Features the exceptionally breathable Australian merino knit polo layered over double knife-pleat Irish linen trousers, anchored by buttery soft Amalfi leather slides.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    itemIds: ['merino-knit-polo', 'tailored-linen-trouser', 'minimalist-leather-slide']
  },
  {
    id: 'gallery-opening',
    name: 'The Gallery Opening Look',
    tagline: 'Ethereal, low-profile poise for sunset gatherings.',
    description: 'An understated yet magnetic evening outfit centering our bias-cut cowl neck silk slip dress. Paired with the structural, full-grain raw leather shopper tote and the complex dry fig note profile of Ethereal Eau de Parfum.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    itemIds: ['silk-slip-dress', 'minimalist-leather-tote', 'ethereal-perfume']
  }
];

export default function LookbookSection({ onAddToCart, onQuickView }: LookbookSectionProps) {
  const [activeLookId, setActiveLookId] = useState<string>('parisian-street');
  const [successLookId, setSuccessLookId] = useState<string | null>(null);

  const activeLook = CAPSULE_LOOKS.find(l => l.id === activeLookId) || CAPSULE_LOOKS[0];
  
  // Resolve product objects from global PRODUCTS
  const lookProducts: Product[] = activeLook.itemIds
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined);

  const totalPrice = lookProducts.reduce((sum, p) => sum + p.price, 0);

  const handleAddEntireLook = () => {
    lookProducts.forEach(product => {
      const size = product.sizes[0] || 'One Size';
      const color = product.colors[0] || { name: 'Default', hex: '#000000' };
      onAddToCart(product, size, color, 1);
    });

    setSuccessLookId(activeLook.id);
    setTimeout(() => {
      setSuccessLookId(null);
    }, 3000);
  };

  return (
    <section id="lookbook-section" className="bg-[#FAF9F5] border-t border-brand-200/50 py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-brand-400 block">
              Atelier Curated Capsules
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-brand-950 font-light tracking-tight leading-tight">
              Sartorial Lookbook
            </h3>
            <p className="text-xs text-brand-500 font-sans font-light max-w-md">
              Skip complex wardrobe styling. Select one of our cohesive pre-planned capsules engineered by our head tailors to layer and fit flawlessly together.
            </p>
          </div>

          {/* Style look selectors */}
          <div className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-none pb-2 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
            {CAPSULE_LOOKS.map((look) => (
              <button
                id={`lookbook-tab-${look.id}`}
                key={look.id}
                onClick={() => setActiveLookId(look.id)}
                className={`px-5 py-3 text-xs tracking-widest uppercase font-sans font-bold border transition-all shrink-0 ${
                  activeLookId === look.id
                    ? 'bg-brand-950 text-white border-brand-950'
                    : 'bg-white text-brand-600 border-brand-200/70 hover:border-brand-950 hover:text-brand-950'
                }`}
              >
                {look.id === 'parisian-street' ? 'Parisian City' : look.id === 'riviera-escape' ? 'Riviera Resort' : 'Gallery Soiree'}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Look Display Split */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">
          
          {/* Left Panel: Giant Styled Outfit Image (5 Cols) - Height locked on mobile for premium look */}
          <div className="lg:col-span-5 relative flex flex-col justify-end min-h-[380px] sm:min-h-[480px] lg:min-h-0 rounded-xs overflow-hidden border border-brand-200/50">
            <div className="absolute inset-0">
              <img
                src={activeLook.image}
                alt={activeLook.name}
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/20 to-transparent" />
            </div>

            {/* Float Look Mood Title */}
            <div className="relative z-10 p-6 sm:p-10 text-white space-y-3">
              <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-mono text-brand-200 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full">
                Stylist Choice
              </span>
              <h4 className="text-xl sm:text-3xl font-serif font-light tracking-wide">
                {activeLook.name}
              </h4>
              <p className="text-xs text-brand-100/90 font-sans font-light leading-relaxed">
                {activeLook.tagline}
              </p>
            </div>
          </div>

          {/* Right Panel: Included items breakdown + interactive bundle drawer (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
            
            {/* Description & Narrative */}
            <div className="space-y-4">
              <h5 className="text-xs uppercase tracking-[0.2em] font-mono text-brand-400 font-bold">The Narrative</h5>
              <p className="text-sm text-brand-600 font-sans font-light leading-relaxed">
                {activeLook.description}
              </p>
            </div>

            {/* Individual Capsule Items Row */}
            <div className="space-y-4">
              <h5 className="text-xs uppercase tracking-[0.2em] font-mono text-brand-400 font-bold mb-4">Included Garments</h5>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {lookProducts.map((product) => (
                  <div
                    id={`lookbook-item-${product.id}`}
                    key={product.id}
                    onClick={() => onQuickView(product)}
                    className="bg-white border border-brand-200/50 p-4 rounded-xs hover:border-brand-950 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Image Thumbnail */}
                      <div className="aspect-square w-full overflow-hidden bg-brand-50 rounded-xs relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                          <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      
                      {/* Product copy */}
                      <div>
                        <h6 className="text-xs font-serif font-medium text-brand-950 truncate group-hover:text-brand-800 transition-colors">
                          {product.name}
                        </h6>
                        <p className="text-[10px] text-brand-400 uppercase tracking-widest font-sans mt-0.5">{product.category}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-brand-100">
                      <span className="text-xs text-brand-900 font-sans font-semibold">${product.price}</span>
                      <span className="text-[9px] uppercase tracking-wider text-brand-400 font-bold group-hover:text-brand-950 transition-colors flex items-center gap-1">
                        View Details <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Bundle Call-to-Action Card */}
            <div className="bg-brand-50/50 border border-brand-200 p-6 sm:p-8 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-brand-600 font-bold bg-brand-100 px-2 py-0.5 rounded-sm">
                    Complete Look Bundle
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-brand-700" />
                </div>
                <h5 className="text-base font-serif font-medium text-brand-950 pt-1">
                  Atelier Luxury Package
                </h5>
                <p className="text-xs text-brand-500 font-sans font-light">
                  Standard size and signature color chosen for each piece.
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-3 shrink-0 w-full sm:w-auto">
                <div className="font-sans flex items-baseline gap-2 justify-between sm:justify-end">
                  <span className="text-xs text-brand-400 uppercase tracking-wider font-light">Combined Value:</span>
                  <span className="text-2xl font-serif text-brand-950 font-semibold">${totalPrice}</span>
                </div>

                <button
                  id={`btn-add-entire-look-${activeLook.id}`}
                  onClick={handleAddEntireLook}
                  disabled={successLookId !== null}
                  className={`w-full sm:w-auto px-6 py-4.5 text-xs font-sans uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-3 shadow-sm ${
                    successLookId === activeLook.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-brand-950 text-white hover:bg-brand-900'
                  }`}
                >
                  {successLookId === activeLook.id ? (
                    <>
                      <Check className="w-4 h-4" /> Looks Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add Entire Look to Bag
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
