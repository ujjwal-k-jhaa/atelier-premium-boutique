import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, Instagram, Facebook, Globe, Compass, RefreshCw, CreditCard, Sparkles } from 'lucide-react';
import { Product, CartItem, Order } from './types';
import { PRODUCTS, CATEGORIES } from './data';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import FavoritesDrawer from './components/FavoritesDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrdersTab from './components/OrdersTab';
import EditorialStory from './components/EditorialStory';
import LookbookSection from './components/LookbookSection';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'shop' | 'orders'>('shop');

  // local storage persistence for ultimate fidelity
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('atelier_cart_v1');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('atelier_favorites_v1');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('atelier_orders_v1');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  
  // Newsletter subscription
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('atelier_cart_v1', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('atelier_favorites_v1', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('atelier_orders_v1', JSON.stringify(orders));
  }, [orders]);

  // Handle addition to bag
  const handleAddToCart = (product: Product, size: string, color: { name: string; hex: string }, quantity: number) => {
    const cartItemId = `${product.id}-${size}-${color.name}`;
    
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex((item) => item.id === cartItemId);
      if (existingIdx > -1) {
        const nextItems = [...prevItems];
        nextItems[existingIdx].quantity += quantity;
        return nextItems;
      } else {
        return [
          ...prevItems,
          {
            id: cartItemId,
            product,
            quantity,
            selectedSize: size,
            selectedColor: color,
          },
        ];
      }
    });
  };

  // Quick add default configuration (first color, first size)
  const handleQuickAdd = (product: Product) => {
    const size = product.sizes[0] || 'One Size';
    const color = product.colors[0] || { name: 'Default', hex: '#000000' };
    handleAddToCart(product, size, color, 1);
    
    // Smooth micro feedback - temporarily open cart
    setIsCartOpen(true);
  };

  // Move product from wishlist/favorites directly into cart
  const handleMoveToCart = (product: Product) => {
    handleQuickAdd(product);
    // Remove from wishlist after moving
    setFavorites((prev) => prev.filter((id) => id !== product.id));
    setIsFavoritesOpen(false);
  };

  // Remove item from shopping bag
  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update item quantity in shopping bag
  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: Math.max(1, nextQty) };
          }
          return item;
        })
    );
  };

  // Toggle favorite / wishlist status
  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Order Placement callback
  const handleOrderPlaced = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]); // Clear shopping bag
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveTab('orders'); // immediately transition to orders tracker
  };

  // Newsletter action
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && /\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  // Filter products by category & search query
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const favoriteProductsList = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div id="atelier-app-root" className="min-h-screen bg-[#FAF9F5] text-brand-900 font-sans flex flex-col antialiased">
      
      {/* Premium Header */}
      <Header
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        favoritesCount={favorites.length}
        onCartClick={() => setIsCartOpen(true)}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Areas */}
      {activeTab === 'shop' ? (
        <main className={`flex-grow ${selectedCategory === 'All' && !searchQuery ? '' : 'pt-28 md:pt-32'}`}>
          
          {/* Hero Campaign (Hidden if search active or category selected) */}
          {selectedCategory === 'All' && !searchQuery && (
            <Hero onExploreClick={() => {
              const el = document.getElementById('catalog-anchor');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} />
          )}

          {/* Catalog Anchor for smooth scroll */}
          <div id="catalog-anchor" className="scroll-mt-24" />

          {/* Elegant Product Directory */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
            
            {/* Editorial Category Title & Header */}
            <div className="mb-8 sm:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6">
              <div>
                <h2 className="text-2xl sm:text-4xl font-serif text-brand-950 font-light tracking-tight leading-tight">
                  {selectedCategory === 'All' ? 'Minimalist Essentials' : selectedCategory}
                </h2>
                <p className="text-[10px] sm:text-xs text-brand-400 uppercase tracking-[0.25em] font-sans mt-2 font-medium">
                  {filteredProducts.length} Curated piece{filteredProducts.length !== 1 ? 's' : ''} available
                </p>
              </div>

              {/* Quiet luxury category navigation (Swipable carousel on mobile, standard on desktop) */}
              <div className="flex gap-5 sm:gap-6 overflow-x-auto whitespace-nowrap scrollbar-none pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 max-w-full scroll-smooth">
                {CATEGORIES.map((cat) => (
                  <button
                    id={`filter-btn-${cat.toLowerCase()}`}
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs uppercase tracking-widest font-sans font-semibold transition-colors duration-300 relative py-1 shrink-0 ${
                      selectedCategory === cat ? 'text-brand-950' : 'text-brand-400 hover:text-brand-950'
                    }`}
                  >
                    {cat}
                    {selectedCategory === cat && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-950 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Empty Search / Filter state */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-brand-100 rounded-xs">
                <p className="font-serif text-lg text-brand-800 mb-2">No boutique items match your query</p>
                <p className="text-xs text-brand-400 max-w-sm mx-auto mb-6">
                  Verify your spelling or reset the filter parameters to browse our signature capsule items.
                </p>
                <button
                  id="reset-filter-btn"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-6 py-3 border border-brand-950 text-brand-950 hover:bg-brand-950 hover:text-white transition-colors uppercase tracking-wider text-[10px] font-sans font-bold"
                >
                  View All Products
                </button>
              </div>
            ) : (
              /* Grid Layout - Optimized for side-by-side display on mobile screens */
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-8 gap-y-8 sm:gap-y-16">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onFavoriteToggle={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    onQuickView={() => setSelectedProductForDetail(product)}
                    onAddToCart={(e) => {
                      e.stopPropagation();
                      handleQuickAdd(product);
                    }}
                  />
                ))}
              </div>
            )}

            {/* Atelier Craftsmanship Showcase section */}
            <div className="mt-16 sm:mt-32 grid md:grid-cols-3 gap-8 sm:gap-12 border-t border-brand-200/60 pt-12 sm:pt-20">
              <div className="space-y-3">
                <Compass className="w-6 h-6 text-brand-800 font-light" />
                <h4 className="font-serif text-base font-medium text-brand-950">Ethically Engineered</h4>
                <p className="text-xs text-brand-500 font-sans font-light leading-relaxed">
                  We collaborate with heritage mills across Lombardy and Alicante to utilize raw, GOTS-certified fibers and secure safe, dignified environments for local craft artisans.
                </p>
              </div>
              <div className="space-y-3">
                <RefreshCw className="w-6 h-6 text-brand-800 font-light" />
                <h4 className="font-serif text-base font-medium text-brand-950">Circular Stewardship</h4>
                <p className="text-xs text-brand-500 font-sans font-light leading-relaxed">
                  Every Atelier garment includes a circular buy-back covenant. Return your pre-loved garments at any period to receive a boutique deposit credit and feed raw fiber recovery.
                </p>
              </div>
              <div className="space-y-3">
                <CreditCard className="w-6 h-6 text-brand-800 font-light" />
                <h4 className="font-serif text-base font-medium text-brand-950">Atelier Private Concierge</h4>
                <p className="text-xs text-brand-500 font-sans font-light leading-relaxed">
                  Enjoy complimentary express door-to-door delivery on orders exceeding $250. Packages are hand-assembled inside heavy structured linen gift boxes.
                </p>
              </div>
            </div>

          </section>

          {/* Immersive Lookbook & Material Storytelling */}
          {selectedCategory === 'All' && !searchQuery && (
            <>
              <LookbookSection
                onAddToCart={handleAddToCart}
                onQuickView={setSelectedProductForDetail}
              />
              <EditorialStory />
            </>
          )}
        </main>
      ) : (
        /* Orders History Tracker View */
        <OrdersTab
          orders={orders}
          onBrowseCollections={() => {
            setActiveTab('shop');
            setSelectedCategory('All');
          }}
        />
      )}

      {/* FOOTER */}
      <footer id="main-footer" className="bg-brand-950 text-white border-t border-brand-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-brand-900 pb-16">
            
            {/* Col 1: Wordmark & Narrative */}
            <div className="space-y-6">
              <h3 className="text-xl font-serif tracking-[0.3em] text-white">ATELIER</h3>
              <p className="text-xs text-brand-400 font-sans font-light leading-relaxed">
                A modern boutique house building luxury capsules. Engineered with meticulous physical restraint, raw organic weaves, and architectural shapes.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-brand-400 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="text-brand-400 hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="text-brand-400 hover:text-white transition-colors" aria-label="Global Store">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-brand-300 font-bold mb-6">Boutique Directory</h4>
              <ul className="space-y-3 text-xs text-brand-400 font-sans font-light">
                {CATEGORIES.slice(1).map((cat) => (
                  <li key={cat}>
                    <button
                      id={`footer-link-${cat.toLowerCase()}`}
                      onClick={() => {
                        setActiveTab('shop');
                        setSelectedCategory(cat);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hover:text-white transition-colors text-left focus:outline-none"
                    >
                      {cat} Selection
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Customer Care */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-brand-300 font-bold mb-6">Concierge Care</h4>
              <ul className="space-y-3 text-xs text-brand-400 font-sans font-light">
                <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Garment Size Blueprint</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainable Care Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Secure Private Account</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Concierge</a></li>
              </ul>
            </div>

            {/* Col 4: Newsletter Register */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-brand-300 font-bold mb-6">The Atelier Dispatch</h4>
              <p className="text-xs text-brand-400 font-sans font-light leading-relaxed">
                Register to receive early access invitations to our strictly limited seasonal capsule events.
              </p>
              
              {newsletterSuccess ? (
                <div className="bg-white/10 p-3 border border-white/10 text-emerald-300 text-xs font-sans rounded-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Successfully subscribed to the dispatch list.
                </div>
              ) : (
                <form id="newsletter-form" onSubmit={handleNewsletterSubmit} className="flex border-b border-brand-800 pb-2">
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-transparent text-xs text-white placeholder-brand-500 focus:outline-none w-full pr-4 font-sans"
                    required
                  />
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="text-brand-300 hover:text-white transition-all focus:outline-none"
                    aria-label="Submit Newsletter"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Legal bottom row */}
          <div className="pt-8 border-t border-brand-800/40 mt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-brand-500 font-sans">
            <div className="space-y-2 text-center md:text-left">
              <div>© 2026 Atelier Boutique Inc. All Rights Reserved.</div>
              <p className="text-[10px] text-brand-400/80 tracking-normal normal-case font-light leading-relaxed max-w-xl">
                This website is created solely for portfolio demonstration purposes. All products, brands, and transactions shown are part of a simulated conceptual experience and do not represent a real commercial business or offer actual items for sale.
              </p>
            </div>
            <div className="flex space-x-6 shrink-0 mt-2 md:mt-0">
              <a href="#" className="hover:text-brand-300 transition-colors">Privacy Blueprint</a>
              <a href="#" className="hover:text-brand-300 transition-colors">Terms of Covenant</a>
            </div>
          </div>

        </div>
      </footer>

      {/* SLIDE OUT CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* SLIDE OUT FAVORITES DRAWER */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteProducts={favoriteProductsList}
        onRemoveFavorite={toggleFavorite}
        onQuickView={(p) => {
          setIsFavoritesOpen(false);
          setSelectedProductForDetail(p);
        }}
        onMoveToCart={handleMoveToCart}
      />

      {/* PREMIUM PRODUCT QUICK VIEW MODAL */}
      {selectedProductForDetail && (
        <ProductDetailModal
          product={selectedProductForDetail}
          isFavorite={favorites.includes(selectedProductForDetail.id)}
          onFavoriteToggle={() => toggleFavorite(selectedProductForDetail.id)}
          onClose={() => setSelectedProductForDetail(null)}
          onAddToCart={(size, color, qty) => {
            handleAddToCart(selectedProductForDetail, size, color, qty);
          }}
        />
      )}

      {/* COMPREHENSIVE LUXURY CHECKOUT EXPERIENCE */}
      {isCheckoutOpen && (
        <CheckoutModal
          cartItems={cartItems}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderPlaced={handleOrderPlaced}
        />
      )}

    </div>
  );
}

