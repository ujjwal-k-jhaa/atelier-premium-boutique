import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'wool-wrap-coat',
    name: 'The Wool Wrap Coat',
    price: 480,
    category: 'Outerwear',
    description: 'An elegant, enveloping wrap coat crafted from double-faced Italian wool. Featuring a relaxed draped silhouette, deep side slip pockets, and an adjustable self-tie belt to effortlessly cinch the waist.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 34,
    details: [
      '100% Premium Virgin Wool',
      'Unlined design for a natural, fluid drape',
      'Hand-stitched structural seams',
      'Dry clean only',
      'Tailored with pride in Lombardy, Italy'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Charcoal', hex: '#36454F' }
    ],
    inStock: true,
    isFeatured: true,
    isNew: true
  },
  {
    id: 'classic-silk-blouse',
    name: 'Classic Silk Blouse',
    price: 195,
    category: 'Tops',
    description: 'A timeless wardrobe essential cut from fluid sandwashed silk crepe de chine. It features a beautifully relaxed fit, classic pointed collar, double-button cuffs, and signature mother-of-pearl closures.',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    reviewsCount: 19,
    details: [
      '100% Grade-A Mulberry Silk',
      'Sandwashed for a velvet-matte peach skin finish',
      'Genuine mother-of-pearl buttons',
      'Hand wash cold or dry clean',
      'Curated import'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Ivory', hex: '#FAF9F6' },
      { name: 'Sage', hex: '#8F9779' }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'minimalist-leather-tote',
    name: 'The Minimalist Leather Tote',
    price: 350,
    category: 'Accessories',
    description: 'A structural, sculptural shopper bag crafted from full-grain Italian calfskin. Designed with clean, seamless edges, a spacious raw suede interior, and a sleek detachable zipped inner pouch for small valuables.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 42,
    details: [
      '100% Full-Grain Calfskin Leather',
      'Unlined premium raw suede interior',
      'Hand-painted structural raw edges',
      'Magnetic bridge clasp closure',
      'Handcrafted in Alicante, Spain'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Noir', hex: '#111111' },
      { name: 'Chestnut', hex: '#8B5A2B' }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'cropped-cashmere-knit',
    name: 'Cropped Cashmere Knit',
    price: 225,
    category: 'Knitwear',
    description: 'An exceptionally soft, lightweight mock neck sweater knitted from ethically sourced, long-staple Mongolian cashmere. Beautifully finished with dense ribbed trims and an elegant cropped hem.',
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 28,
    details: [
      '100% Premium Mongolian Cashmere (12 Gauge)',
      'Ethically and responsibly sourced long-staple fiber',
      'Resistant to pilling over time',
      'Hand wash cold, dry flat',
      'Slightly boxy silhouette'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Oatmeal', hex: '#EAE6DF' },
      { name: 'Espresso', hex: '#3B2F2F' }
    ],
    inStock: true,
    isNew: true
  },
  {
    id: 'atelier-blazer',
    name: 'The Atelier Wool Blazer',
    price: 380,
    category: 'Outerwear',
    description: 'A sharp, double-breasted jacket designed with classic structured shoulders, elegant peak lapels, and functional four-button surgical cuffs. Tailored beautifully from heavy British wool gabardine.',
    image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=600&auto=format&fit=crop',
    rating: 4.6,
    reviewsCount: 15,
    details: [
      '100% Virgin Wool Gabardine',
      'Fully lined in breathable silk-blend cupro',
      'Structured padded shoulders',
      'Double back vents',
      'Slightly oversized, modern boyfriend fit'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Midnight', hex: '#1D2A44' },
      { name: 'Noir', hex: '#1C1917' }
    ],
    inStock: true
  },
  {
    id: 'tailored-linen-trouser',
    name: 'Tailored Linen Trouser',
    price: 240,
    category: 'Pants',
    description: 'A modern high-rise trouser designed with double front knife pleats, a wide leg, and functional buttoned side tabs. Crafted from a structured, robust linen and virgin wool blend.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
    rating: 4.5,
    reviewsCount: 21,
    details: [
      '60% Irish Linen, 40% Virgin Wool',
      'Flattering high-rise waist',
      'Deep functional side-seam pockets',
      'Adjustable polished brass side buckles',
      'Unfinished hems for custom tailoring'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Sand', hex: '#E2D3C4' },
      { name: 'Charcoal', hex: '#4A4A4A' }
    ],
    inStock: true,
    isNew: true
  },
  {
    id: 'ethereal-perfume',
    name: 'Ethereal Eau de Parfum',
    price: 120,
    category: 'Fragrance',
    description: 'A complex, atmospheric fragrance reminiscent of dry fig orchards at sunrise. Anchored in warm cedarwood and earthy sandalwood, highlighted with bright notes of Sicilian bergamot.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop',
    rating: 5.0,
    reviewsCount: 56,
    details: [
      'Top Notes: Bergamot, Black Tea, Dry Fig',
      'Heart Notes: White Iris, Cardamom, Vetiver',
      'Base Notes: Sandalwood, Virginia Cedarwood, Amber',
      'Hand-bottled in thick, heavy flint glass',
      'Made in Grasse, France'
    ],
    sizes: ['50ml', '100ml'],
    colors: [
      { name: 'Clear', hex: '#F3F4F6' }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'suede-block-heel',
    name: 'Suede Block Heel',
    price: 280,
    category: 'Shoes',
    description: 'An elegant, sculptural court shoe designed with an almond toe, soft glove-like suede upper, and a supportive chunky block heel. Lined with ultra-cushioned memory leather insoles.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    reviewsCount: 11,
    details: [
      '100% Spanish Kid Suede upper',
      'Premium calf leather lining and padded outsole',
      'Stable 55mm self-covered block heel',
      'Nonslip leather sole',
      'Lovingly handcrafted in Alicante, Spain'
    ],
    sizes: ['37', '38', '39', '40'],
    colors: [
      { name: 'Olive Suede', hex: '#4B5320' },
      { name: 'Noir Suede', hex: '#242424' }
    ],
    inStock: false
  },
  {
    id: 'silk-slip-dress',
    name: 'Mulberry Silk Slip Dress',
    price: 260,
    category: 'Tops',
    description: 'A bias-cut masterpiece that flows effortlessly along the body. Featuring an elegant cowl neckline, adjustable delicate shoulder straps, and a clean finished midi-length hem.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 31,
    details: [
      '100% Grade 6A Mulberry Silk (19 Momme)',
      'Bias cut for a beautifully fluid, flattering drape',
      'Refined cowl neck with adjustable crossback straps',
      'Hand-rolled bottom hems',
      'Dry clean recommended to preserve sheen'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne', hex: '#F0E6D2' },
      { name: 'Midnight', hex: '#1D2A44' }
    ],
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: 'tailored-trench-coat',
    name: 'The Editorial Trench Coat',
    price: 520,
    category: 'Outerwear',
    description: 'Our iconic double-breasted duster jacket. Hand-tailored from highly dense, weather-resistant organic cotton gabardine, complete with shoulder epaulets, custom horn buttons, and a storm flap.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 17,
    details: [
      '100% Certified Organic Cotton Gabardine',
      'Authentic buffalo horn custom engraved closures',
      'Deep back rain storm shield flap',
      'Detachable waist and cuff utility straps',
      'Crafted in London, United Kingdom'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Honey', hex: '#D2B48C' },
      { name: 'Stone', hex: '#E5E4E2' }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'structured-wool-trousers',
    name: 'Structured Pleated Trousers',
    price: 290,
    category: 'Pants',
    description: 'A structural, clean-cut trouser constructed with heavy Italian virgin wool. Modeled with sharp, pressed front creases, a flattering high-rise contour, and hidden zip side pockets.',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop',
    rating: 4.6,
    reviewsCount: 14,
    details: [
      '95% Virgin Wool, 5% Elastane for structured movement',
      'Satin waist lining for supreme premium comfort',
      'Hidden front hook-and-eye secure zip closure',
      'Sharp permanent crease lines down the front',
      'Made in Tuscany, Italy'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Taupe', hex: '#B38F7A' },
      { name: 'Noir', hex: '#1C1917' }
    ],
    inStock: true
  },
  {
    id: 'minimalist-leather-slide',
    name: 'Minimalist Leather Slide',
    price: 180,
    category: 'Shoes',
    description: 'An elegant, extremely low-profile slide sandal handcrafted from buttery-soft glove leather. Constructed with a comfortable padded footbed, a subtle square-toe silhouette, and a stacked leather heel.',
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 22,
    details: [
      '100% Vegetable-tanned Italian calf leather',
      'Padded memory leather core insole',
      'Durable non-slip rubberized leather outer sole',
      'Extremely soft seamless single-strap upper',
      'Handmade in Amalfi, Italy'
    ],
    sizes: ['36', '37', '38', '39', '40'],
    colors: [
      { name: 'Tan', hex: '#A0522D' },
      { name: 'Cream', hex: '#FFFDD0' }
    ],
    inStock: true,
    isNew: true
  },
  {
    id: 'merino-knit-polo',
    name: 'Fine Gauge Merino Polo',
    price: 165,
    category: 'Knitwear',
    description: 'A luxurious fine-knit polo shirt woven from ultra-fine Australian merino wool. Designed with a clean, buttonless open collar and engineered ribbed details for a relaxed yet polished resort feel.',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    reviewsCount: 19,
    details: [
      '100% Superfine Australian Merino Wool (18.5 Micron)',
      'Highly breathable, naturally temperature-regulating fiber',
      'Elegant open-knit resort collar',
      'Sartorial ribbed cuffs and bottom band',
      'Dry clean only'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sage Knit', hex: '#778899' },
      { name: 'Oatmeal Knit', hex: '#E6DCC8' }
    ],
    inStock: true
  },
  {
    id: 'amber-wood-candle',
    name: 'Sandalwood & Amber Candle',
    price: 65,
    category: 'Fragrance',
    description: 'A luxurious hand-poured interior scent formulated with raw essential oils and non-toxic coconut soy wax. Features an intricate warm woody throw that elevates any room.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 45,
    details: [
      'Top Notes: Black Cardamom, Dry Cypress',
      'Heart Notes: Warm Amber, Roasted Cocoa',
      'Base Notes: Sandalwood, Virginia Cedar, Leather',
      '60-hour slow-burn crackling wooden wick',
      'Thick hand-blown dark amber glass'
    ],
    sizes: ['250g'],
    colors: [
      { name: 'Amber Glass', hex: '#8B5A2B' }
    ],
    inStock: true
  },
  {
    id: 'cashmere-ribbed-scarf',
    name: 'Ribbed Cashmere Scarf',
    price: 145,
    category: 'Accessories',
    description: 'An exceptionally soft, generously oversized scarf rib-knitted from long-staple Mongolian cashmere. Offers unparalleled lightweight insulation and a refined textural touch.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
    rating: 5.0,
    reviewsCount: 13,
    details: [
      '100% Long-Staple Inner Mongolian Cashmere',
      'Extra-wide 180cm x 45cm coverage for wrapping versatility',
      'Heavy-gauge vertical ribbed stitch design',
      'Naturally hypoallergenic and anti-static',
      'Hand wash cold or dry clean'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Ivory Scarf', hex: '#FAF9F6' },
      { name: 'Charcoal Scarf', hex: '#36454F' }
    ],
    inStock: true,
    isNew: true
  }
];

export const CATEGORIES = ['All', 'Outerwear', 'Knitwear', 'Tops', 'Pants', 'Shoes', 'Accessories', 'Fragrance'];
