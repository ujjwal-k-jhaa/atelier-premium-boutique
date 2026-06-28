import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, User, ClipboardList, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from '../data';

interface HeaderProps {
  cartItemsCount: number;
  favoritesCount: number;
  onCartClick: () => void;
  onFavoritesClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  activeTab: 'shop' | 'orders';
  setActiveTab: (tab: 'shop' | 'orders') => void;
}

export default function Header({
  cartItemsCount,
  favoritesCount,
  onCartClick,
  onFavoritesClick,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  activeTab,
  setActiveTab,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Persistent promo banner state
  const [showPromo, setShowPromo] = useState(() => {
    try {
      const saved = localStorage.getItem('atelier_promo_dismissed');
      return saved !== 'true';
    } catch {
      return true;
    }
  });

  const handleDismissPromo = () => {
    setShowPromo(false);
    try {
      localStorage.setItem('atelier_promo_dismissed', 'true');
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Dynamic Promo Banner */}
      <AnimatePresence>
        {showPromo && (
          <motion.div
            id="promo-banner"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 right-0 z-50 bg-brand-950 text-[#FAF9F5] text-[10px] uppercase tracking-[0.25em] py-2.5 px-4 flex items-center justify-between font-sans border-b border-brand-900 overflow-hidden"
          >
            <div className="flex-grow text-center font-medium truncate px-6">
              Seasonal Update: Complimentary expedited shipping on all domestic capsules.
            </div>
            <button
              id="dismiss-promo-btn"
              onClick={handleDismissPromo}
              className="text-brand-300 hover:text-white transition-colors p-1 cursor-pointer absolute right-4 focus:outline-none"
              aria-label="Dismiss announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Full-Width Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            id="search-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed left-0 right-0 z-50 bg-[#FAF9F5]/98 backdrop-blur-md border-b border-brand-200 px-4 py-4 sm:py-6 shadow-lg flex items-center justify-between transition-all duration-300 ${
              showPromo ? 'top-9 sm:top-10' : 'top-0'
            }`}
          >
            <div className="max-w-3xl mx-auto w-full flex items-center gap-4">
              <Search className="w-5 h-5 text-brand-500 shrink-0 stroke-[1.5]" />
              <input
                id="search-input-overlay"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cashmere, silk, double-faced wool..."
                className="bg-transparent text-sm sm:text-base text-brand-950 placeholder-brand-400 focus:outline-none w-full font-serif font-light tracking-wide py-1"
                autoFocus
              />
              <button
                id="close-search-overlay-btn"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-sans font-bold text-brand-500 hover:text-brand-950 cursor-pointer border border-brand-200/80 px-3 py-1.5 rounded-sm hover:bg-brand-50 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        id="main-header"
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          showPromo ? 'top-9 sm:top-10' : 'top-0'
        } ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-brand-100 shadow-xs py-2 sm:py-3'
            : 'bg-white/90 backdrop-blur-md border-b border-brand-100/40 py-3 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left Column: Menu Trigger on Mobile/Tablet OR Logo on Desktop */}
            <div className="flex-1 flex items-center justify-start">
              {/* Mobile Menu Trigger */}
              <button
                id="mobile-menu-trigger"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 -ml-1.5 text-brand-800 hover:text-brand-950 flex items-center gap-1.5 focus:outline-none cursor-pointer lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="w-4.5 h-4.5 stroke-[1.5]" />
                <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase hidden sm:inline-block">Menu</span>
              </button>

              {/* Desktop Logo */}
              <button
                id="brand-logo-desktop"
                onClick={() => {
                  setActiveTab('shop');
                  setSelectedCategory('All');
                }}
                className="text-xl lg:text-2xl xl:text-3xl font-serif tracking-[0.2em] xl:tracking-[0.25em] text-brand-950 hover:opacity-80 transition-opacity focus:outline-none cursor-pointer hidden lg:block"
              >
                ATELIER
              </button>
            </div>

            {/* Center Column: Logo on Mobile/Tablet OR Desktop Navigation on Desktop */}
            <div className="flex-initial flex items-center justify-center">
              {/* Mobile/Tablet Logo */}
              <button
                id="brand-logo-mobile"
                onClick={() => {
                  setActiveTab('shop');
                  setSelectedCategory('All');
                }}
                className="text-lg sm:text-2xl font-serif tracking-[0.2em] sm:tracking-[0.25em] text-brand-950 hover:opacity-80 transition-opacity focus:outline-none cursor-pointer lg:hidden"
              >
                ATELIER
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex space-x-5 xl:space-x-8 items-center justify-center">
                {CATEGORIES.slice(0, 5).map((category) => (
                  <button
                    id={`nav-cat-${category.toLowerCase()}`}
                    key={category}
                    onClick={() => {
                      setActiveTab('shop');
                      setSelectedCategory(category);
                    }}
                    className={`text-xs uppercase tracking-widest font-sans font-medium transition-colors duration-300 relative py-1 cursor-pointer ${
                      activeTab === 'shop' && selectedCategory === category
                        ? 'text-brand-950 font-semibold'
                        : 'text-brand-400 hover:text-brand-950'
                    }`}
                  >
                    {category}
                    {activeTab === 'shop' && selectedCategory === category && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-950 rounded-full" />
                    )}
                  </button>
                ))}
                <button
                  id="nav-orders"
                  onClick={() => setActiveTab('orders')}
                  className={`text-xs uppercase tracking-widest font-sans font-medium transition-colors duration-300 relative py-1 cursor-pointer ${
                    activeTab === 'orders'
                      ? 'text-brand-950 font-semibold'
                      : 'text-brand-400 hover:text-brand-950'
                  }`}
                >
                  My Orders
                  {activeTab === 'orders' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-950 rounded-full" />
                  )}
                </button>
              </nav>
            </div>

            {/* Right Column: Utility Icons (Search, Favorites, Cart) */}
            <div className="flex-1 flex items-center justify-end space-x-1 sm:space-x-3.5">
              
              {/* Search Trigger Button */}
              <button
                id="search-btn"
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 text-brand-850 hover:text-brand-950 hover:bg-brand-50 rounded-full transition-all cursor-pointer focus:outline-none"
                aria-label="Search items"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.5]" />
              </button>

              {/* Favorites Icon */}
              <button
                id="favorites-drawer-btn"
                onClick={onFavoritesClick}
                className="p-1.5 text-brand-850 hover:text-brand-950 hover:bg-brand-50 rounded-full transition-all relative cursor-pointer focus:outline-none"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.5]" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-800 text-white text-[8px] sm:text-[9px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center scale-90 border border-white">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* Cart Icon */}
              <button
                id="cart-drawer-btn"
                onClick={onCartClick}
                className="p-1.5 text-brand-850 hover:text-brand-950 hover:bg-brand-50 rounded-full transition-all relative cursor-pointer focus:outline-none"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.5]" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-950 text-white text-[8px] sm:text-[9px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center scale-90 border border-white">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Premium Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-brand-950/40 backdrop-blur-xs"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[85%] max-w-sm bg-[#FAF9F5] shadow-2xl flex flex-col justify-between p-6 sm:p-8 border-r border-brand-200/40 overflow-y-auto z-10"
            >
              <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-brand-100 pb-5">
                  <span className="font-serif text-xl tracking-[0.2em] text-brand-950">ATELIER</span>
                  <button
                    id="close-mobile-menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-brand-500 hover:text-brand-950 hover:bg-brand-100 rounded-full transition-colors focus:outline-none cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 stroke-[1.5]" />
                  </button>
                </div>

                {/* Navigation Categories */}
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-brand-400 block">
                    Curated Capsules
                  </span>
                  <motion.nav 
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.05 }
                      }
                    }}
                    className="flex flex-col space-y-3"
                  >
                    {CATEGORIES.map((category) => (
                      <motion.button
                        variants={{
                          hidden: { opacity: 0, x: -12 },
                          show: { opacity: 1, x: 0 }
                        }}
                        id={`drawer-cat-${category.toLowerCase()}`}
                        key={category}
                        onClick={() => {
                          setActiveTab('shop');
                          setSelectedCategory(category);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`text-left text-xl sm:text-2xl font-serif font-light tracking-wide transition-all hover:pl-2 cursor-pointer ${
                          activeTab === 'shop' && selectedCategory === category
                            ? 'text-brand-950 font-medium italic pl-2 border-l-2 border-brand-950 bg-brand-50/60 py-1 pr-4'
                            : 'text-brand-500 hover:text-brand-950 py-1'
                        }`}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </motion.nav>
                </div>

                {/* Secondary navigation */}
                <div className="space-y-3 pt-6 border-t border-brand-100">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-brand-400 block">
                    Client Services
                  </span>
                  <motion.div 
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.05, delayChildren: 0.2 }
                      }
                    }}
                    className="flex flex-col space-y-3"
                  >
                    <motion.button
                      variants={{
                        hidden: { opacity: 0, x: -8 },
                        show: { opacity: 1, x: 0 }
                      }}
                      id="drawer-orders"
                      onClick={() => {
                        setActiveTab('orders');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-left text-xs uppercase tracking-widest font-sans font-bold transition-colors cursor-pointer ${
                        activeTab === 'orders' ? 'text-brand-950' : 'text-brand-500 hover:text-brand-950'
                      }`}
                    >
                      My Orders & Archives
                    </motion.button>
                    <motion.button
                      variants={{
                        hidden: { opacity: 0, x: -8 },
                        show: { opacity: 1, x: 0 }
                      }}
                      id="drawer-lookbook"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        const el = document.getElementById('lookbook-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-left text-xs uppercase tracking-widest font-sans font-bold text-brand-500 hover:text-brand-950 transition-colors cursor-pointer"
                    >
                      Curated Lookbook
                    </motion.button>
                    <motion.button
                      variants={{
                        hidden: { opacity: 0, x: -8 },
                        show: { opacity: 1, x: 0 }
                      }}
                      id="drawer-materials"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        const el = document.getElementById('editorial-story-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-left text-xs uppercase tracking-widest font-sans font-bold text-brand-500 hover:text-brand-950 transition-colors cursor-pointer"
                    >
                      Artisanal Heritage
                    </motion.button>
                  </motion.div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-8 border-t border-brand-100 mt-auto space-y-4 text-brand-400 font-sans">
                <p className="text-[9px] uppercase tracking-[0.2em] leading-relaxed">
                  ATELIER Archive & Co.<br />
                  Designed for perpetual wear.
                </p>
                <div className="flex gap-4 text-[10px] text-brand-500 font-medium pt-1">
                  <a href="#" className="hover:text-brand-950 transition-colors tracking-widest uppercase">Instagram</a>
                  <span className="text-brand-200">/</span>
                  <a href="#" className="hover:text-brand-950 transition-colors tracking-widest uppercase">Journal</a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
