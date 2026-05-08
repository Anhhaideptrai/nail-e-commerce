export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  collection: string;
  description: string;
  material: string;
  inStock: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  availableSizes: string[];
  availableShapes: string[];
  availableLengths: string[];
  processingTime: string;
  tags: string[];
  rating: number;
  reviewCount: number;
}

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'Custom Size'];
export const SHAPES = ['Square', 'Rounded Square', 'Round', 'Oval', 'Almond', 'Stiletto', 'Coffin'];
export const LENGTHS = ['Short', 'Medium', 'Long', 'Extra Long'];

export const COLLECTIONS = [
  { id: 'all', label: 'All Collections' },
  { id: 'french-classic', label: 'French & Classic' },
  { id: 'glitter-metallic', label: 'Glitter & Metallic' },
  { id: 'nail-art', label: 'Nail Art' },
  { id: 'solid-colors', label: 'Solid Colors' },
  { id: 'custom', label: 'Custom' },
];

export const DISCOUNT_CODES: Record<string, number> = {
  LUNELLE10: 0.1,
  WELCOME15: 0.15,
  EU20: 0.2,
};

const img1 = 'https://images.unsplash.com/photo-1696341980130-4bdff3322802?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800';
const img2 = 'https://images.unsplash.com/photo-1777287852750-53eb2ca506e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800';
const img3 = 'https://images.unsplash.com/photo-1646235833267-4e077ebfb591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800';
const img4 = 'https://images.unsplash.com/photo-1720487051716-dc968613784f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800';
const img5 = 'https://images.unsplash.com/photo-1772191530787-b9546da02fbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800';
const img6 = 'https://images.unsplash.com/photo-1722061608664-f84242d3d2cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800';
const img7 = 'https://images.unsplash.com/photo-1736628293375-ff94e4874aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800';
const img8 = 'https://images.unsplash.com/photo-1671397548908-688f17194415?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800';
const img9 = 'https://images.unsplash.com/photo-1674383600495-bfa0405f3c93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800';

export const products: Product[] = [
  {
    id: '1',
    name: 'Aurora French Tips',
    slug: 'aurora-french-tips',
    price: 28,
    images: [img1, img3, img5],
    category: 'french-classic',
    collection: 'French & Classic',
    description: 'Timeless French tips crafted with precision and care. Our Aurora French Tips feature a classic white tip on a sheer nude base, perfect for any occasion. Each set is handcrafted to deliver a salon-quality finish that lasts up to 14 days.',
    material: 'Premium ABS acrylic with gel topcoat',
    inStock: true,
    isNew: false,
    isBestSeller: true,
    availableSizes: SIZES,
    availableShapes: ['Square', 'Rounded Square', 'Oval', 'Almond', 'Coffin'],
    availableLengths: ['Short', 'Medium', 'Long'],
    processingTime: '3-5 business days',
    tags: ['french', 'classic', 'bestseller', 'neutral'],
    rating: 4.9,
    reviewCount: 214,
  },
  {
    id: '2',
    name: 'Silver Shimmer',
    slug: 'silver-shimmer',
    price: 32,
    images: [img2, img1, img4],
    category: 'glitter-metallic',
    collection: 'Glitter & Metallic',
    description: 'Luminous silver shimmer that catches every light. Hand-painted with ultra-fine metallic pigment for an otherworldly shine. Each nail is individually crafted to ensure perfection.',
    material: 'Premium ABS acrylic with metallic chrome powder',
    inStock: true,
    isNew: true,
    isBestSeller: false,
    availableSizes: SIZES,
    availableShapes: ['Square', 'Coffin', 'Stiletto', 'Almond'],
    availableLengths: ['Medium', 'Long', 'Extra Long'],
    processingTime: '3-5 business days',
    tags: ['silver', 'metallic', 'glitter', 'new'],
    rating: 4.8,
    reviewCount: 87,
  },
  {
    id: '3',
    name: 'Rose Petal',
    slug: 'rose-petal',
    price: 26,
    images: [img6, img8, img5],
    category: 'solid-colors',
    collection: 'Solid Colors',
    description: 'Soft, romantic rose pink that complements every skin tone. Minimalist yet utterly feminine. A wardrobe staple for every nail enthusiast.',
    material: 'Premium ABS acrylic with gel topcoat',
    inStock: true,
    isNew: false,
    isBestSeller: false,
    availableSizes: SIZES,
    availableShapes: SHAPES,
    availableLengths: LENGTHS,
    processingTime: '2-4 business days',
    tags: ['pink', 'soft', 'feminine', 'daily'],
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: '4',
    name: 'Midnight Noir',
    slug: 'midnight-noir',
    price: 28,
    images: [img5, img7, img1],
    category: 'solid-colors',
    collection: 'Solid Colors',
    description: 'Deep, rich black that exudes sophistication. Perfect for bold statements and evening looks. Ultra-smooth finish with a glossy topcoat for a luxurious appearance.',
    material: 'Premium ABS acrylic with gel topcoat',
    inStock: true,
    isNew: false,
    isBestSeller: false,
    availableSizes: SIZES,
    availableShapes: SHAPES,
    availableLengths: LENGTHS,
    processingTime: '2-4 business days',
    tags: ['black', 'bold', 'classic', 'evening'],
    rating: 4.8,
    reviewCount: 203,
  },
  {
    id: '5',
    name: 'Pearl Luxe Collection',
    slug: 'pearl-luxe-collection',
    price: 35,
    images: [img3, img8, img2],
    category: 'french-classic',
    collection: 'French & Classic',
    description: 'Inspired by the lustrous sheen of natural pearls. Our Pearl Luxe collection features a milky white base with subtle iridescent shimmer, creating an ethereal, otherworldly effect that is unmistakably premium.',
    material: 'Premium ABS acrylic with pearl powder and gel topcoat',
    inStock: true,
    isNew: false,
    isBestSeller: true,
    availableSizes: SIZES,
    availableShapes: ['Oval', 'Almond', 'Coffin', 'Round'],
    availableLengths: ['Short', 'Medium', 'Long'],
    processingTime: '3-5 business days',
    tags: ['pearl', 'iridescent', 'luxury', 'bestseller'],
    rating: 5.0,
    reviewCount: 312,
  },
  {
    id: '6',
    name: 'Crystal Nude',
    slug: 'crystal-nude',
    price: 24,
    images: [img5, img6, img8],
    category: 'french-classic',
    collection: 'French & Classic',
    description: 'Effortlessly natural. Crystal Nude offers a barely-there look that enhances your natural beauty. Perfect for professional settings or everyday elegance.',
    material: 'Premium ABS acrylic with gel topcoat',
    inStock: true,
    isNew: true,
    isBestSeller: false,
    availableSizes: SIZES,
    availableShapes: SHAPES,
    availableLengths: LENGTHS,
    processingTime: '2-4 business days',
    tags: ['nude', 'natural', 'minimal', 'new'],
    rating: 4.6,
    reviewCount: 98,
  },
  {
    id: '7',
    name: 'Botanical Garden',
    slug: 'botanical-garden',
    price: 38,
    images: [img9, img4, img6],
    category: 'nail-art',
    collection: 'Nail Art',
    description: 'Hand-painted botanical motifs inspired by European garden landscapes. Each nail features unique floral and leaf designs, making every set a wearable work of art. No two sets are exactly alike.',
    material: 'Premium ABS acrylic with hand-painted nail art and gel seal',
    inStock: true,
    isNew: false,
    isBestSeller: true,
    availableSizes: SIZES,
    availableShapes: ['Oval', 'Almond', 'Round', 'Rounded Square'],
    availableLengths: ['Short', 'Medium', 'Long'],
    processingTime: '5-7 business days',
    tags: ['floral', 'art', 'handpainted', 'botanical', 'bestseller'],
    rating: 4.9,
    reviewCount: 178,
  },
  {
    id: '8',
    name: 'Gold Rush',
    slug: 'gold-rush',
    price: 34,
    images: [img2, img7, img3],
    category: 'glitter-metallic',
    collection: 'Glitter & Metallic',
    description: 'Dazzling gold that commands attention. Handcrafted with 24K gold-finish powder for a rich, warm luminosity. Ideal for celebrations, events, or whenever you wish to shine.',
    material: 'Premium ABS acrylic with 24K gold powder and gel topcoat',
    inStock: true,
    isNew: false,
    isBestSeller: false,
    availableSizes: SIZES,
    availableShapes: ['Coffin', 'Stiletto', 'Almond', 'Square'],
    availableLengths: ['Medium', 'Long', 'Extra Long'],
    processingTime: '3-5 business days',
    tags: ['gold', 'metallic', 'glitter', 'celebration'],
    rating: 4.7,
    reviewCount: 134,
  },
  {
    id: '9',
    name: 'Classic Rouge',
    slug: 'classic-rouge',
    price: 26,
    images: [img8, img4, img1],
    category: 'solid-colors',
    collection: 'Solid Colors',
    description: 'The timeless red nail, reimagined with exceptional quality. Classic Rouge is vibrant, rich, and undeniably chic. An essential in every collection.',
    material: 'Premium ABS acrylic with gel topcoat',
    inStock: true,
    isNew: false,
    isBestSeller: false,
    availableSizes: SIZES,
    availableShapes: SHAPES,
    availableLengths: LENGTHS,
    processingTime: '2-4 business days',
    tags: ['red', 'classic', 'bold', 'timeless'],
    rating: 4.8,
    reviewCount: 267,
  },
  {
    id: '10',
    name: 'Lavender Mist',
    slug: 'lavender-mist',
    price: 28,
    images: [img7, img5, img9],
    category: 'solid-colors',
    collection: 'Solid Colors',
    description: 'A delicate lavender that feels like spring in Provence. Soft, dreamy, and effortlessly stylish. Perfect for warm weather or whenever you need a touch of gentle color.',
    material: 'Premium ABS acrylic with gel topcoat',
    inStock: true,
    isNew: true,
    isBestSeller: false,
    availableSizes: SIZES,
    availableShapes: SHAPES,
    availableLengths: LENGTHS,
    processingTime: '2-4 business days',
    tags: ['lavender', 'purple', 'soft', 'spring', 'new'],
    rating: 4.6,
    reviewCount: 72,
  },
  {
    id: '11',
    name: 'Marble Luxe',
    slug: 'marble-luxe',
    price: 38,
    salePrice: 29,
    images: [img4, img2, img7],
    category: 'nail-art',
    collection: 'Nail Art',
    description: 'Inspired by Carrara marble, this collection features delicate veining on a white base. Each nail is individually hand-painted to capture the organic beauty of natural stone. A true conversation starter.',
    material: 'Premium ABS acrylic with hand-painted marble art and gel seal',
    inStock: true,
    isNew: false,
    isBestSeller: false,
    availableSizes: SIZES,
    availableShapes: ['Coffin', 'Almond', 'Oval', 'Square'],
    availableLengths: ['Short', 'Medium', 'Long'],
    processingTime: '5-7 business days',
    tags: ['marble', 'art', 'handpainted', 'sale'],
    rating: 4.9,
    reviewCount: 143,
  },
  {
    id: '12',
    name: 'Coral Riviera',
    slug: 'coral-riviera',
    price: 26,
    salePrice: 19,
    images: [img6, img9, img3],
    category: 'solid-colors',
    collection: 'Solid Colors',
    description: 'Sun-kissed coral inspired by the French Riviera. Warm, vibrant, and full of joie de vivre. This season\'s must-have shade for the free-spirited.',
    material: 'Premium ABS acrylic with gel topcoat',
    inStock: false,
    isNew: false,
    isBestSeller: false,
    availableSizes: SIZES,
    availableShapes: SHAPES,
    availableLengths: LENGTHS,
    processingTime: '2-4 business days',
    tags: ['coral', 'summer', 'sale', 'sold-out'],
    rating: 4.5,
    reviewCount: 89,
  },
];

export const getProductById = (id: string) => products.find(p => p.id === id);
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getRelatedProducts = (product: Product, count = 4) =>
  products
    .filter(p => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, count);

export const heroImages = {
  main: 'https://images.unsplash.com/photo-1722061608664-f84242d3d2cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1800',
  secondary: 'https://images.unsplash.com/photo-1696341980130-4bdff3322802?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
  about1: 'https://images.unsplash.com/photo-1736628293375-ff94e4874aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
  about2: 'https://images.unsplash.com/photo-1759563874675-5bc5c17c9393?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
};
