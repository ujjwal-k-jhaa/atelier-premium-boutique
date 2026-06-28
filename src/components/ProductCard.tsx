import React from 'react';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  isFavorite: boolean;
  onFavoriteToggle: (e: React.MouseEvent) => void;
  onQuickView: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

export default function ProductCard({
  product,
  isFavorite,
  onFavoriteToggle,
  onQuickView,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white overflow-hidden transition-all duration-500"
    >
      {/* Product Image Stage */}
      <div
        onClick={onQuickView}
        className="relative aspect-[3/4] overflow-hidden bg-brand-50 rounded-xs mb-4 cursor-pointer"
      >
        
        {/* Main Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-all duration-700 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-brand-950 text-white text-[9px] uppercase tracking-widest font-sans font-semibold py-1 px-2.5 rounded-full shadow-xs">
              New
            </span>
          )}
          {!product.inStock && (
            <span className="bg-brand-200 text-brand-700 text-[9px] uppercase tracking-widest font-sans font-semibold py-1 px-2.5 rounded-full border border-brand-300">
              Sold Out
            </span>
          )}
        </div>

        {/* Favorite Wishlist Icon Button */}
        <button
          id={`fav-btn-${product.id}`}
          onClick={onFavoriteToggle}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md shadow-xs transition-all duration-300 focus:outline-none ${
            isFavorite
              ? 'bg-brand-950 text-white scale-105'
              : 'bg-white/90 text-brand-700 hover:bg-brand-950 hover:text-white hover:scale-105'
          }`}
          aria-label={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className="w-3.5 h-3.5" fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Editorial Hover Overlay Toolbar */}
        <div className="absolute inset-0 bg-brand-950/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-2">
          
          {/* Quick View Button */}
          <button
            id={`quickview-btn-${product.id}`}
            onClick={onQuickView}
            className="flex items-center gap-2 bg-white text-brand-950 hover:bg-brand-950 hover:text-white px-4 py-2.5 text-[10px] uppercase tracking-widest font-sans font-bold transition-all duration-300 shadow-sm transform translate-y-2 group-hover:translate-y-0 focus:outline-none"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>

          {/* Quick Add To Bag Button (Only if in stock) */}
          {product.inStock && (
            <button
              id={`quickadd-btn-${product.id}`}
              onClick={onAddToCart}
              className="flex items-center justify-center bg-brand-950 text-white hover:bg-brand-800 p-2.5 transition-all duration-300 shadow-sm transform translate-y-2 group-hover:translate-y-0 focus:outline-none"
              title="Add to Bag"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Meta Product Details */}
      <div className="flex flex-col flex-1 px-1">
        
        {/* Category & Color Swatches row */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-brand-400">
            {product.category}
          </span>
          
          {/* Color Preview Swatches */}
          <div className="flex space-x-1">
            {product.colors.map((color) => (
              <span
                key={color.name}
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-brand-200/60 shadow-xs"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Product Title (Elegant Serif Style) */}
        <button
          id={`title-btn-${product.id}`}
          onClick={onQuickView}
          className="text-left font-serif text-[13px] sm:text-[16px] text-brand-900 group-hover:text-brand-500 transition-colors duration-300 font-medium tracking-tight leading-snug mb-1.5 focus:outline-none cursor-pointer"
        >
          {product.name}
        </button>

        {/* Product Price & Rating with Mobile Quick-Add */}
        <div className="flex items-center justify-between mt-auto gap-2">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-xs sm:text-sm font-sans font-medium text-brand-950 tracking-wide">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center gap-0.5">
              <span className="text-amber-500 text-[10px] sm:text-xs">★</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-brand-400">
                {product.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Touch-Friendly Mobile Quick-Add Button (Hidden on desktop) */}
          {product.inStock && (
            <button
              id={`mobile-quickadd-${product.id}`}
              onClick={onAddToCart}
              className="md:hidden p-2 rounded-full bg-brand-950 text-white hover:bg-brand-900 active:scale-95 transition-all cursor-pointer shadow-xs"
              title="Add to Bag"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
