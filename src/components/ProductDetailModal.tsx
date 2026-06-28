import React, { useState } from 'react';
import { X, Heart, Star, Check, HelpCircle, Shield, RotateCcw, Ruler } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onClose: () => void;
  onAddToCart: (size: string, color: { name: string; hex: string }, quantity: number) => void;
}

interface SizeMeasurement {
  size: string;
  [key: string]: string;
}

const GET_SIZE_GUIDE = (category: string): { columns: string[]; rows: SizeMeasurement[]; notes: string } => {
  switch (category) {
    case 'Pants':
      return {
        columns: ['Size', 'Waist (in)', 'Hip (in)', 'Inseam (in)', 'Rise (in)'],
        rows: [
          { size: 'XS (24-25)', 'Waist (in)': '24" - 25"', 'Hip (in)': '34" - 35"', 'Inseam (in)': '30"', 'Rise (in)': '11"' },
          { size: 'S (26-27)', 'Waist (in)': '26" - 27"', 'Hip (in)': '36" - 37"', 'Inseam (in)': '30.5"', 'Rise (in)': '11.5"' },
          { size: 'M (28-29)', 'Waist (in)': '28" - 29"', 'Hip (in)': '38" - 39"', 'Inseam (in)': '31"', 'Rise (in)': '12"' },
          { size: 'L (30-31)', 'Waist (in)': '30" - 31"', 'Hip (in)': '40" - 41"', 'Inseam (in)': '31.5"', 'Rise (in)': '12.5"' }
        ],
        notes: 'Our trousers feature a relaxed tailored rise. If you are between sizes, we recommend sizing down for a high-waisted snug fit, or sizing up for a modern slouched look.'
      };
    case 'Shoes':
      return {
        columns: ['EU Size', 'US Size', 'UK Size', 'Foot Length'],
        rows: [
          { size: '36', 'US Size': '5.5', 'UK Size': '3.5', 'Foot Length': '230 mm' },
          { size: '37', 'US Size': '6.5', 'UK Size': '4.5', 'Foot Length': '235 mm' },
          { size: '38', 'US Size': '7.5', 'UK Size': '5.5', 'Foot Length': '240 mm' },
          { size: '39', 'US Size': '8.5', 'UK Size': '6.5', 'Foot Length': '245 mm' },
          { size: '40', 'US Size': '9.5', 'UK Size': '7.5', 'Foot Length': '250 mm' }
        ],
        notes: 'Handcrafted in Amalfi, our fine calf-leather slides and loafers will stretch and form perfectly to your foot shape within 3-4 wears.'
      };
    case 'Outerwear':
      return {
        columns: ['Size', 'Chest (in)', 'Shoulder (in)', 'Sleeve (in)', 'Length (in)'],
        rows: [
          { size: 'S', 'Chest (in)': '34" - 36"', 'Shoulder (in)': '17.5"', 'Sleeve (in)': '33.5"', 'Length (in)': '45"' },
          { size: 'M', 'Chest (in)': '38" - 40"', 'Shoulder (in)': '18.25"', 'Sleeve (in)': '34.5"', 'Length (in)': '46"' },
          { size: 'L', 'Chest (in)': '42" - 44"', 'Shoulder (in)': '19"', 'Sleeve (in)': '35.5"', 'Length (in)': '47"' },
          { size: 'XL', 'Chest (in)': '46" - 48"', 'Shoulder (in)': '19.75"', 'Sleeve (in)': '36.5"', 'Length (in)': '48"' }
        ],
        notes: 'Designed for a slouchy duster silhouette. Double-breasted closures allow customizable waist belt-clamping to sculpt your preferred drape.'
      };
    case 'Fragrance':
      return {
        columns: ['Item', 'Volume / Mass', 'Burn Time', 'Dimensions'],
        rows: [
          { size: 'Candle', 'Volume / Mass': '250g / 8.8 oz', 'Burn Time': '60 Hours', 'Dimensions': '9cm H x 8cm D' },
          { size: 'Eau de Parfum', 'Volume / Mass': '100ml / 3.4 fl oz', 'Burn Time': 'N/A', 'Dimensions': '12cm H x 6cm W' }
        ],
        notes: 'Stored in dense violet protective glass jars to preserve active perfume molecules from UV and light exposure.'
      };
    case 'Accessories':
      return {
        columns: ['Item', 'Dimensions', 'Strap Drop', 'Material'],
        rows: [
          { size: 'Leather Tote', 'Dimensions': '38cm x 30cm x 15cm', 'Strap Drop': '24cm', 'Material': 'Vegetable-Tanned Calfskin' },
          { size: 'Cashmere Scarf', 'Dimensions': '180cm x 45cm', 'Strap Drop': 'N/A', 'Material': 'Mongolian Cashmere' }
        ],
        notes: 'All dimensions are measured flat. Slight variances represent the unique fingerprint of our hand-sewing.'
      };
    case 'Tops':
    case 'Knitwear':
    default:
      return {
        columns: ['Size', 'Bust / Chest (in)', 'Waist (in)', 'Back Length (in)'],
        rows: [
          { size: 'XS', 'Bust / Chest (in)': '31.5" - 33"', 'Waist (in)': '24" - 25.5"', 'Back Length (in)': '22"' },
          { size: 'S', 'Bust / Chest (in)': '33.5" - 35"', 'Waist (in)': '26" - 27.5"', 'Back Length (in)': '22.5"' },
          { size: 'M', 'Bust / Chest (in)': '35.5" - 37"', 'Waist (in)': '28" - 29.5"', 'Back Length (in)': '23"' },
          { size: 'L', 'Bust / Chest (in)': '37.5" - 39.5"', 'Waist (in)': '30" - 32"', 'Back Length (in)': '24"' }
        ],
        notes: 'Our silk tops are bias-cut to trace your contours naturally. Knitwear uses ribbed gauge stretch. Fits true to size.'
      };
  }
};

export default function ProductDetailModal({
  product,
  isFavorite,
  onFavoriteToggle,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'One Size');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Default', hex: '#000000' });
  const [quantity, setQuantity] = useState(1);
  const [activeSubTab, setActiveSubTab] = useState<'details' | 'shipping' | 'reviews'>('details');
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Zoom on Hover State for premium texture inspection
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  // High-fidelity editorial reviews based on product category
  const mockReviews = [
    {
      id: 'rev-1',
      author: 'Sophia V.',
      rating: 5,
      date: 'June 12, 2026',
      comment: 'Absolutely immaculate quality. The fabric has a gorgeous weight to it, and the seams are finished beautifully. This feels like a heirloom piece.',
    },
    {
      id: 'rev-2',
      author: 'Julian M.',
      rating: 5,
      date: 'May 28, 2026',
      comment: 'Exceeded all expectations. The minimalist aesthetic fits perfectly with my capsule wardrobe. Shipping was remarkably fast and wrapped in tissue and box.',
    }
  ];

  const handleAddToBag = () => {
    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(selectedSize, selectedColor, quantity);
      setIsAdding(false);
      setAddSuccess(true);
      setTimeout(() => setAddSuccess(false), 2000);
    }, 600); // realistic soft luxury transition
  };

  const sizeGuideInfo = GET_SIZE_GUIDE(product.category);

  return (
    <div
      id="product-detail-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-brand-950/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10"
    >
      {/* Container */}
      <div className="relative bg-white w-full max-w-5xl rounded-xs shadow-2xl overflow-hidden animate-slide-up flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]">
        
        {/* Close Button */}
        <button
          id="close-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-brand-500 hover:text-brand-950 hover:bg-brand-100 rounded-full transition-all focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Image Display with Hover-Zoom */}
        <div 
          className="w-full md:w-1/2 relative bg-brand-50 flex items-center justify-center h-[240px] sm:h-[350px] md:h-auto overflow-hidden group cursor-zoom-in shrink-0"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => {
            setIsZooming(false);
            setMousePos({ x: 50, y: 50 });
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-200 ease-out pointer-events-none"
            style={{
              transform: isZooming ? 'scale(2.2)' : 'scale(1)',
              transformOrigin: isZooming ? `${mousePos.x}% ${mousePos.y}%` : 'center center',
            }}
            referrerPolicy="no-referrer"
          />
          {product.isNew && (
            <span className="absolute top-6 left-6 bg-brand-950 text-white text-[10px] uppercase tracking-widest font-sans font-semibold py-1 px-3 rounded-full pointer-events-none">
              New Arrival
            </span>
          )}
          {/* Subtle zoom texture hint */}
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-xs border border-brand-200/50 text-[9px] uppercase tracking-[0.15em] font-sans font-bold px-2.5 py-1.5 rounded-sm text-brand-900 pointer-events-none shadow-xs group-hover:opacity-0 transition-opacity">
            Hover to Zoom Fabric
          </div>
        </div>

        {/* Right Side: Detailed Configuration Panel */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 overflow-y-auto flex flex-col">
          
          {/* Breadcrumbs & Category */}
          <div className="mb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-brand-400">
              Collection / {product.category}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-serif text-brand-950 font-medium tracking-tight mb-3">
            {product.name}
          </h2>

          {/* Price & Rating Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-100 pb-5 mb-5">
            <div className="text-xl font-sans font-medium text-brand-950">
              ${product.price.toFixed(2)}
            </div>
            
            {/* Reviews Count & Stars */}
            <div className="flex items-center space-x-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-brand-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-brand-500">
                {product.rating.toFixed(1)} ({product.reviewsCount} reviews)
              </span>
            </div>
          </div>

          {/* Product Description */}
          <p className="text-sm text-brand-600 font-sans font-light leading-relaxed mb-6">
            {product.description}
          </p>

          {/* CONFIGURATIONS: Color & Size */}
          <div className="space-y-6 mb-8">
            
            {/* Color Swatch Selector */}
            {product.colors.length > 0 && product.colors[0].name !== 'Default' && (
              <div>
                <span className="block text-[11px] uppercase tracking-widest font-sans font-semibold text-brand-400 mb-2.5">
                  Color: <span className="text-brand-950">{selectedColor.name}</span>
                </span>
                <div className="flex space-x-3">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        id={`modal-color-${color.name}`}
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 relative ${
                          isSelected ? 'border-brand-950 scale-110 shadow-xs' : 'border-brand-200 hover:border-brand-400'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-5 h-5 rounded-full block"
                          style={{ backgroundColor: color.hex }}
                        />
                        {isSelected && (
                          <span className="absolute inset-0 rounded-full border border-brand-950 scale-125" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Grid Selector */}
            {product.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="block text-[11px] uppercase tracking-widest font-sans font-semibold text-brand-400">
                    Select Size
                  </span>
                  <button 
                    id="size-guide-btn"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[10px] text-brand-500 hover:text-brand-950 uppercase tracking-wider font-bold underline decoration-brand-200 flex items-center gap-1 cursor-pointer focus:outline-none"
                  >
                    <Ruler className="w-3 h-3 text-brand-400" /> Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        id={`modal-size-${size}`}
                        key={size}
                        disabled={!product.inStock && size !== 'One Size'}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 text-xs font-sans font-medium uppercase transition-all duration-300 border ${
                          isSelected
                            ? 'border-brand-950 bg-brand-950 text-white shadow-xs'
                            : 'border-brand-200 text-brand-800 hover:border-brand-950'
                        } disabled:opacity-30 disabled:pointer-events-none`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            {product.inStock && (
              <div>
                <span className="block text-[11px] uppercase tracking-widest font-sans font-semibold text-brand-400 mb-2.5">
                  Quantity
                </span>
                <div className="inline-flex items-center border border-brand-200 rounded-xs">
                  <button
                    id="qty-minus"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => q - 1)}
                    className="px-3 py-1.5 text-brand-600 hover:text-brand-950 hover:bg-brand-50 disabled:opacity-20 transition-all font-sans"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-mono font-medium text-brand-900">{quantity}</span>
                  <button
                    id="qty-plus"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-brand-600 hover:text-brand-950 hover:bg-brand-50 transition-all font-sans"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Actions: Add to Bag & Add to Wishlist */}
          <div className="flex gap-4 mb-8">
            {product.inStock ? (
              <button
                id="modal-add-to-bag-btn"
                onClick={handleAddToBag}
                disabled={isAdding || addSuccess}
                className={`flex-1 py-4 text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
                  addSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-brand-950 text-white hover:bg-brand-800'
                }`}
              >
                {isAdding ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Placing in Bag...
                  </span>
                ) : addSuccess ? (
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    Added to Bag
                  </span>
                ) : (
                  'Add to Bag'
                )}
              </button>
            ) : (
              <button
                id="modal-sold-out-btn"
                disabled
                className="flex-1 py-4 text-xs font-sans uppercase tracking-[0.2em] font-semibold bg-brand-200 text-brand-500 border border-brand-200"
              >
                Sold Out
              </button>
            )}

            {/* Favorite Toggle Button */}
            <button
              id="modal-fav-btn"
              onClick={onFavoriteToggle}
              className={`p-4 border rounded-xs transition-all duration-300 focus:outline-none ${
                isFavorite
                  ? 'border-brand-950 bg-brand-950 text-white'
                  : 'border-brand-200 text-brand-700 hover:border-brand-950 hover:text-brand-950'
              }`}
              title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Editorial Tabs: Specs, Shipping, Reviews */}
          <div className="mt-auto border-t border-brand-100 pt-6">
            <div className="flex border-b border-brand-100 pb-3 mb-4 gap-6">
              {(['details', 'shipping', 'reviews'] as const).map((tab) => (
                <button
                  id={`detail-tab-${tab}`}
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`text-[11px] uppercase tracking-widest font-sans font-semibold pb-1.5 relative transition-colors ${
                    activeSubTab === tab ? 'text-brand-950' : 'text-brand-400 hover:text-brand-950'
                  }`}
                >
                  {tab === 'details' ? 'Details' : tab === 'shipping' ? 'Shipping' : 'Reviews'}
                  {activeSubTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-950 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Panels */}
            <div className="min-h-[140px]">
              {activeSubTab === 'details' && (
                <ul className="space-y-2">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-brand-600 font-sans font-light">
                      <span className="text-brand-400 mt-1">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}

              {activeSubTab === 'shipping' && (
                <div className="space-y-4 text-xs text-brand-600 font-sans font-light">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-brand-400 flex-shrink-0" />
                    <span>Free complimentary delivery on orders over $250. Beautifully gift-boxed packaging.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-4 h-4 text-brand-400 flex-shrink-0" />
                    <span>Complimentary 30-day return cycle on any unworn apparel in original condition.</span>
                  </div>
                </div>
              )}

              {activeSubTab === 'reviews' && (
                <div className="space-y-4">
                  {mockReviews.map((rev) => (
                    <div key={rev.id} className="border-b border-brand-100/50 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-sans font-semibold text-brand-900">{rev.author}</span>
                        <span className="text-[10px] font-mono text-brand-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-500 mb-1.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs font-sans font-light text-brand-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic Size Guide Modal Overlay */}
      {isSizeGuideOpen && (
        <div
          id="size-guide-modal-overlay"
          className="fixed inset-0 z-[60] bg-brand-950/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-xs shadow-2xl relative border border-brand-100 animate-slide-up space-y-6">
            
            {/* Size Guide Header */}
            <div className="flex justify-between items-start border-b border-brand-100 pb-4">
              <div>
                <h3 className="text-lg font-serif font-medium text-brand-950">Atelier Size Guide</h3>
                <p className="text-xs text-brand-400 font-sans mt-0.5">{product.category} Sizing Capsule</p>
              </div>
              <button
                id="close-size-guide-btn"
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1.5 text-brand-400 hover:text-brand-950 hover:bg-brand-100 rounded-full transition-all focus:outline-none"
                aria-label="Close size guide"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Size Guide Measurements Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-brand-50/55">
                    {sizeGuideInfo.columns.map((col) => (
                      <th
                        key={col}
                        className="text-[10px] uppercase tracking-wider font-sans font-bold text-brand-800 p-2.5 border-b border-brand-200/50"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeGuideInfo.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-brand-50/20 transition-colors">
                      {sizeGuideInfo.columns.map((col) => (
                        <td
                          key={col}
                          className={`text-xs font-sans p-2.5 border-b border-brand-100 text-brand-700 ${
                            col === 'Size' || col === 'EU Size' || col === 'Item' ? 'font-semibold text-brand-900' : ''
                          }`}
                        >
                          {row[col] || row.size}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note & Suggestions */}
            <div className="bg-[#FAF9F5] border border-brand-200/40 p-4 rounded-xs text-xs text-brand-600 font-sans font-light leading-relaxed">
              <span className="font-semibold text-brand-900 block mb-1">Artisan Recommendations</span>
              {sizeGuideInfo.notes}
            </div>

            {/* Return policy fine print */}
            <p className="text-[10px] text-brand-400 font-sans font-light text-center">
              Unsure about your perfect fit? We offer complimentary sizing exchanges & return couriers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
