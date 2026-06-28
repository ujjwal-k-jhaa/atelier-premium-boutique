import React from 'react';
import { X, Heart, ShoppingCart, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteProducts: Product[];
  onRemoveFavorite: (id: string) => void;
  onQuickView: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favoriteProducts,
  onRemoveFavorite,
  onQuickView,
  onMoveToCart,
}: FavoritesDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            id="favorites-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-950/40 backdrop-blur-xs"
          />

          {/* Drawer Body */}
          <motion.div
            id="favorites-drawer-body"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 h-full w-full max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-brand-950 fill-brand-950" />
                <h2 className="text-base uppercase tracking-widest font-sans font-semibold text-brand-950">
                  My Favorites ({favoriteProducts.length})
                </h2>
              </div>
              <button
                id="close-favorites-btn"
                onClick={onClose}
                className="p-1.5 text-brand-500 hover:text-brand-950 hover:bg-brand-50 rounded-full transition-all focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {favoriteProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-brand-300" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-brand-900 mb-1">Your Wishlist is empty</h3>
                  <p className="text-xs text-brand-400 font-sans max-w-[240px] mb-6 font-light">
                    Tap the heart on any product to save it here for later.
                  </p>
                  <button
                    id="favorites-continue-btn"
                    onClick={onClose}
                    className="border border-brand-950 text-brand-950 hover:bg-brand-950 hover:text-white px-6 py-3 text-[10px] uppercase tracking-widest font-sans font-bold transition-colors focus:outline-none cursor-pointer"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                favoriteProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 border-b border-brand-100/50 pb-5 last:border-b-0 last:pb-0"
                  >
                    {/* Thumb */}
                    <div className="w-20 aspect-[3/4] bg-brand-50 rounded-xs overflow-hidden flex-shrink-0 relative group border border-brand-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      {/* Small Action overlay on thumbnail */}
                      <button
                        onClick={() => onQuickView(product)}
                        className="absolute inset-0 bg-brand-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-serif text-sm font-medium text-brand-900 leading-tight">
                          {product.name}
                        </h4>
                        <button
                          id={`remove-fav-${product.id}`}
                          onClick={() => onRemoveFavorite(product.id)}
                          className="text-brand-300 hover:text-brand-950 p-0.5 transition-colors cursor-pointer"
                          title="Remove Favorite"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="text-[10px] uppercase tracking-wider text-brand-400 mb-2">
                        {product.category}
                      </span>

                      <span className="text-xs font-mono font-semibold text-brand-950 mb-3">
                        ${product.price.toFixed(2)}
                      </span>

                      {/* Move to bag actions */}
                      <div className="flex gap-2">
                        {product.inStock ? (
                          <button
                            id={`move-cart-btn-${product.id}`}
                            onClick={() => onMoveToCart(product)}
                            className="flex-1 py-2 bg-brand-950 text-white hover:bg-brand-800 text-[10px] uppercase tracking-wider font-sans font-medium transition-colors flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            Move to Bag
                          </button>
                        ) : (
                          <span className="flex-1 py-2 bg-brand-100 text-brand-400 text-center text-[10px] uppercase tracking-wider font-sans font-semibold">
                            Out of Stock
                          </span>
                        )}
                        <button
                          id={`quickview-fav-btn-${product.id}`}
                          onClick={() => onQuickView(product)}
                          className="p-2 border border-brand-200 text-brand-700 hover:border-brand-950 hover:text-brand-950 transition-colors focus:outline-none cursor-pointer"
                          title="Quick View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
