export interface BottomBarFilter {
  id: string;
  label: string;
  icon: string | null;
}

export interface CategoryMenuItem {
  label: string;
  filter: string;
  submenu?: string;
}

export interface CategoryMenuLevel {
  id: string;
  name: string;
  parentId: string | null;
  filter: string;
  items: CategoryMenuItem[];
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  category: 'jackets' | 'shirts' | 'dresses' | 'trousers' | 'shoes';
  subcategory: string;
  tags: string[];
  images: string[];
  size: 'normal' | 'large';
  material: string;
  fit: string;
  care: string;
}

export interface CartLineItem extends Product {
  quantity: number;
}

export const BOTTOM_BAR_FILTERS: BottomBarFilter[] = [
  { id: 'all', label: 'All', icon: null },
  { id: 'jackets', label: 'Jackets', icon: 'icon--jacket' },
  { id: 'shirts', label: 'Shirts', icon: 'icon--shirt' },
  { id: 'dresses', label: 'Dresses', icon: 'icon--dress' },
  { id: 'trousers', label: 'Trousers', icon: 'icon--trousers' },
  { id: 'shoes', label: 'Shoes', icon: 'icon--shoe' },
];

export const CATEGORY_MENUS: Record<string, CategoryMenuLevel> = {
  main: {
    id: 'main',
    name: 'all',
    parentId: null,
    filter: 'all',
    items: [
      { label: 'All Products', filter: 'all' },
      { label: 'Jackets', submenu: 'submenu-jackets', filter: 'jackets' },
      { label: 'Shirts', submenu: 'submenu-shirts', filter: 'shirts' },
      { label: 'Dresses', submenu: 'submenu-dresses', filter: 'dresses' },
      { label: 'Trousers', submenu: 'submenu-trousers', filter: 'trousers' },
      { label: 'Shoes', submenu: 'submenu-shoes', filter: 'shoes' },
    ],
  },
  'submenu-jackets': {
    id: 'submenu-jackets',
    name: 'Jackets',
    parentId: 'main',
    filter: 'jackets',
    items: [
      { label: 'All Jackets', filter: 'jackets' },
      { label: 'Leather & Biker', filter: 'leather-jackets' },
      { label: 'Bomber Jackets', filter: 'bomber-jackets' },
      { label: 'Parkas & Coats', filter: 'parkas-coats' },
      { label: 'Denim Jackets', filter: 'denim-jackets' },
      { label: 'Sale %', submenu: 'submenu-jackets-sale', filter: 'jackets-sale' },
    ],
  },
  'submenu-jackets-sale': {
    id: 'submenu-jackets-sale',
    name: 'Sale %',
    parentId: 'submenu-jackets',
    filter: 'jackets-sale',
    items: [
      { label: 'Winter Clearance', filter: 'winter-clearance' },
      { label: 'Limited Edition', filter: 'limited-jackets' },
    ],
  },
  'submenu-shirts': {
    id: 'submenu-shirts',
    name: 'Shirts',
    parentId: 'main',
    filter: 'shirts',
    items: [
      { label: 'All Shirts', filter: 'shirts' },
      { label: 'Oxford Button-Downs', filter: 'oxford-shirts' },
      { label: 'Casual Tees', filter: 'casual-tees' },
      { label: 'Flannel & Overshirts', filter: 'flannel-shirts' },
      { label: 'Polo Shirts', filter: 'polo-shirts' },
      { label: 'Special Selection', submenu: 'submenu-shirts-special', filter: 'shirts-special' },
    ],
  },
  'submenu-shirts-special': {
    id: 'submenu-shirts-special',
    name: 'Special Selection',
    parentId: 'submenu-shirts',
    filter: 'shirts-special',
    items: [
      { label: 'Organic Cotton', filter: 'organic-cotton' },
      { label: 'Linen Collection', filter: 'linen-shirts' },
    ],
  },
  'submenu-dresses': {
    id: 'submenu-dresses',
    name: 'Dresses',
    parentId: 'main',
    filter: 'dresses',
    items: [
      { label: 'All Dresses', filter: 'dresses' },
      { label: 'Evening Gowns', filter: 'evening-dresses' },
      { label: 'Summer Sundresses', filter: 'summer-dresses' },
      { label: 'Cocktail Dresses', filter: 'cocktail-dresses' },
      { label: 'Maxi Dresses', filter: 'maxi-dresses' },
      { label: 'Runway Edit', submenu: 'submenu-dresses-runway', filter: 'dresses-runway' },
    ],
  },
  'submenu-dresses-runway': {
    id: 'submenu-dresses-runway',
    name: 'Runway Edit',
    parentId: 'submenu-dresses',
    filter: 'dresses-runway',
    items: [
      { label: 'Silk & Satin', filter: 'silk-dresses' },
      { label: 'Designer Capsule', filter: 'designer-dresses' },
    ],
  },
  'submenu-trousers': {
    id: 'submenu-trousers',
    name: 'Trousers',
    parentId: 'main',
    filter: 'trousers',
    items: [
      { label: 'All Trousers', filter: 'trousers' },
      { label: 'Tailored Chinos', filter: 'chinos' },
      { label: 'Slim Fit Denim', filter: 'slim-jeans' },
      { label: 'Pleated Wool', filter: 'pleated-trousers' },
      { label: 'Cargo & Utility', filter: 'cargo-pants' },
      { label: 'Promo Packs', submenu: 'submenu-trousers-promo', filter: 'trousers-promo' },
    ],
  },
  'submenu-trousers-promo': {
    id: 'submenu-trousers-promo',
    name: 'Promo Packs',
    parentId: 'submenu-trousers',
    filter: 'trousers-promo',
    items: [
      { label: 'Two-Pack Chinos', filter: 'two-pack-chinos' },
      { label: 'Workwear Bundle', filter: 'workwear-bundle' },
    ],
  },
  'submenu-shoes': {
    id: 'submenu-shoes',
    name: 'Shoes',
    parentId: 'main',
    filter: 'shoes',
    items: [
      { label: 'All Shoes', filter: 'shoes' },
      { label: 'Chelsea & Leather Boots', filter: 'leather-boots' },
      { label: 'Runner Sneakers', filter: 'runner-sneakers' },
      { label: 'Classic Loafers', filter: 'classic-loafers' },
      { label: 'Canvas Low-Tops', filter: 'canvas-shoes' },
      { label: 'Artisan Selection', submenu: 'submenu-shoes-selection', filter: 'shoes-selection' },
    ],
  },
  'submenu-shoes-selection': {
    id: 'submenu-shoes-selection',
    name: 'Artisan Selection',
    parentId: 'submenu-shoes',
    filter: 'shoes-selection',
    items: [
      { label: 'Handcrafted Italian', filter: 'handcrafted-shoes' },
      { label: 'Weatherproof Series', filter: 'weatherproof-shoes' },
    ],
  },
};

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Classic Oxford Button-Down',
    brand: 'Atelier Nord',
    price: 89,
    category: 'shirts',
    subcategory: 'Oxford Button-Downs',
    tags: ['shirts', 'oxford-shirts'],
    images: ['/images/shirt.png', '/images/shirt.png', '/images/shirt.png'],
    size: 'normal',
    material: '100% Supima Cotton',
    fit: 'Tailored Fit',
    care: 'Machine wash cold',
  },
  {
    id: 'prod-2',
    title: 'Milan Leather Chelsea Boot',
    brand: 'Vero Passo',
    price: 210,
    category: 'shoes',
    subcategory: 'Chelsea & Leather Boots',
    tags: ['shoes', 'leather-boots', 'shoes-selection', 'handcrafted-shoes'],
    images: ['/images/shoe.png', '/images/shoe.png', '/images/shoe.png'],
    size: 'normal',
    material: 'Full-Grain Calfskin',
    fit: 'True to Size',
    care: 'Condition with leather balm',
  },
  {
    id: 'prod-3',
    title: 'Riviera Midi Sundress',
    brand: 'Lumière Paris',
    price: 135,
    category: 'dresses',
    subcategory: 'Summer Sundresses',
    tags: ['dresses', 'summer-dresses'],
    images: ['/images/dress.png', '/images/dress.png', '/images/dress.png'],
    size: 'normal',
    material: 'Linen & Viscose Blend',
    fit: 'Relaxed A-Line',
    care: 'Gentle cycle or dry clean',
  },
  {
    id: 'prod-4',
    title: 'Organic Pima Crewneck Shirt',
    brand: 'Pure Loom',
    price: 65,
    category: 'shirts',
    subcategory: 'Organic Cotton',
    tags: ['shirts', 'casual-tees', 'shirts-special', 'organic-cotton'],
    images: ['/images/shirt.png', '/images/shirt.png', '/images/shirt.png'],
    size: 'large',
    material: '100% GOTS Organic Cotton',
    fit: 'Modern Regular',
    care: 'Machine wash warm',
  },
  {
    id: 'prod-5',
    title: 'Savile Stretch Tapered Chinos',
    brand: 'Kensington & Co.',
    price: 115,
    category: 'trousers',
    subcategory: 'Tailored Chinos',
    tags: ['trousers', 'chinos'],
    images: ['/images/trousers.png', '/images/trousers.png', '/images/trousers.png'],
    size: 'normal',
    material: '98% Cotton, 2% Elastane',
    fit: 'Slim Tapered',
    care: 'Machine wash cold, line dry',
  },
  {
    id: 'prod-6',
    title: 'Moto Full-Grain Biker Jacket',
    brand: 'Iron & Hide',
    price: 340,
    category: 'jackets',
    subcategory: 'Leather & Biker',
    tags: ['jackets', 'leather-jackets', 'jackets-sale', 'limited-jackets'],
    images: ['/images/jacket.png', '/images/jacket.png', '/images/jacket.png'],
    size: 'large',
    material: '100% Distressed Lambskin',
    fit: 'Structured Moto Fit',
    care: 'Specialist leather clean only',
  },
  {
    id: 'prod-7',
    title: 'CloudStride Knit Runner',
    brand: 'Veloce Lab',
    price: 145,
    category: 'shoes',
    subcategory: 'Runner Sneakers',
    tags: ['shoes', 'runner-sneakers'],
    images: ['/images/shoe.png', '/images/shoe.png', '/images/shoe.png'],
    size: 'normal',
    material: 'Engineered Mesh & EVA Sole',
    fit: 'Athletic Snug',
    care: 'Spot clean with mild soap',
  },
  {
    id: 'prod-8',
    title: 'Brushed Highland Flannel Shirt',
    brand: 'Caledonia Mill',
    price: 95,
    category: 'shirts',
    subcategory: 'Flannel & Overshirts',
    tags: ['shirts', 'flannel-shirts'],
    images: ['/images/shirt.png', '/images/shirt.png', '/images/shirt.png'],
    size: 'normal',
    material: '100% Brushed Twill Cotton',
    fit: 'Relaxed Layering Fit',
    care: 'Wash cold with similar colors',
  },
  {
    id: 'prod-9',
    title: 'Mayfair Penny Loafer',
    brand: 'Vero Passo',
    price: 195,
    category: 'shoes',
    subcategory: 'Classic Loafers',
    tags: ['shoes', 'classic-loafers', 'shoes-selection', 'handcrafted-shoes'],
    images: ['/images/shoe.png', '/images/shoe.png', '/images/shoe.png'],
    size: 'normal',
    material: 'Hand-Burnished Suede',
    fit: 'Classic European',
    care: 'Brush with suede protector',
  },
  {
    id: 'prod-10',
    title: 'Noir Velvet Cocktail Dress',
    brand: 'Maison Étoile',
    price: 225,
    category: 'dresses',
    subcategory: 'Cocktail Dresses',
    tags: ['dresses', 'cocktail-dresses', 'dresses-runway', 'designer-dresses'],
    images: ['/images/dress.png', '/images/dress.png', '/images/dress.png'],
    size: 'normal',
    material: 'Silk-Blend Crushed Velvet',
    fit: 'Contoured Midi',
    care: 'Dry clean only',
  },
  {
    id: 'prod-11',
    title: 'Coastal Pure Linen Shirt',
    brand: 'Amalfi Sun',
    price: 108,
    category: 'shirts',
    subcategory: 'Linen Collection',
    tags: ['shirts', 'shirts-special', 'linen-shirts'],
    images: ['/images/shirt.png', '/images/shirt.png', '/images/shirt.png'],
    size: 'normal',
    material: '100% Belgian Flax Linen',
    fit: 'Breezy Relaxed',
    care: 'Cold wash, steam while damp',
  },
  {
    id: 'prod-12',
    title: 'Selvedge Raw Indigo Denim',
    brand: 'Kuroki Works',
    price: 165,
    category: 'trousers',
    subcategory: 'Slim Fit Denim',
    tags: ['trousers', 'slim-jeans'],
    images: ['/images/trousers.png', '/images/trousers.png', '/images/trousers.png'],
    size: 'normal',
    material: '14oz Japanese Selvedge Cotton',
    fit: 'Slim Straight',
    care: 'Soak inside out in cold water',
  },
  {
    id: 'prod-13',
    title: 'MA-1 Flight Bomber Jacket',
    brand: 'Aero Archive',
    price: 179,
    category: 'jackets',
    subcategory: 'Bomber Jackets',
    tags: ['jackets', 'bomber-jackets'],
    images: ['/images/jacket.png', '/images/jacket.png', '/images/jacket.png'],
    size: 'normal',
    material: 'Water-Repellent Flight Nylon',
    fit: 'Classic Boxy Ribbed',
    care: 'Dry clean or gentle wipe',
  },
  {
    id: 'prod-14',
    title: 'Nordic Gore-Tex Trail Boot',
    brand: 'Fjord Trek',
    price: 230,
    category: 'shoes',
    subcategory: 'Weatherproof Series',
    tags: ['shoes', 'leather-boots', 'shoes-selection', 'weatherproof-shoes'],
    images: ['/images/shoe.png', '/images/shoe.png', '/images/shoe.png'],
    size: 'normal',
    material: 'Waterproof Nubuck & Vibram',
    fit: 'All-Terrain Support',
    care: 'Rinse mud and waterproof spray',
  },
  {
    id: 'prod-15',
    title: 'Silk Charmeuse Evening Gown',
    brand: 'Maison Étoile',
    price: 310,
    category: 'dresses',
    subcategory: 'Evening Gowns',
    tags: ['dresses', 'evening-dresses', 'dresses-runway', 'silk-dresses'],
    images: ['/images/dress.png', '/images/dress.png', '/images/dress.png'],
    size: 'large',
    material: '100% Mulberry Silk',
    fit: 'Bias-Cut Floor Length',
    care: 'Specialist silk dry clean',
  },
  {
    id: 'prod-16',
    title: 'Utility Ripstop Cargo Pant',
    brand: 'Field & Forge',
    price: 128,
    category: 'trousers',
    subcategory: 'Cargo & Utility',
    tags: ['trousers', 'cargo-pants', 'trousers-promo', 'workwear-bundle'],
    images: ['/images/trousers.png', '/images/trousers.png', '/images/trousers.png'],
    size: 'normal',
    material: 'Heavyweight Cotton Ripstop',
    fit: 'Relaxed Articulated Knee',
    care: 'Machine wash warm',
  },
  {
    id: 'prod-17',
    title: 'Boardwalk Vulcanized Canvas Low',
    brand: 'Pacific Coast',
    price: 78,
    category: 'shoes',
    subcategory: 'Canvas Low-Tops',
    tags: ['shoes', 'canvas-shoes'],
    images: ['/images/shoe.png', '/images/shoe.png', '/images/shoe.png'],
    size: 'normal',
    material: '12oz Organic Duck Canvas',
    fit: 'Everyday Low Profile',
    care: 'Air dry away from direct heat',
  },
  {
    id: 'prod-18',
    title: 'Arctic Down Expedition Parka',
    brand: 'Fjord Trek',
    price: 285,
    category: 'jackets',
    subcategory: 'Parkas & Coats',
    tags: ['jackets', 'parkas-coats', 'jackets-sale', 'winter-clearance'],
    images: ['/images/jacket.png', '/images/jacket.png', '/images/jacket.png'],
    size: 'normal',
    material: '700-Fill Recycled Down',
    fit: 'Insulated Longline',
    care: 'Tumble dry low with tennis balls',
  },
  {
    id: 'prod-19',
    title: 'Merino Piqué Knit Polo',
    brand: 'Atelier Nord',
    price: 92,
    category: 'shirts',
    subcategory: 'Polo Shirts',
    tags: ['shirts', 'polo-shirts'],
    images: ['/images/shirt.png', '/images/shirt.png', '/images/shirt.png'],
    size: 'normal',
    material: 'Extra-Fine Merino Wool',
    fit: 'Slim Athletic',
    care: 'Hand wash cold, dry flat',
  },
  {
    id: 'prod-20',
    title: 'Bohemian Tiered Maxi Dress',
    brand: 'Lumière Paris',
    price: 158,
    category: 'dresses',
    subcategory: 'Maxi Dresses',
    tags: ['dresses', 'maxi-dresses'],
    images: ['/images/dress.png', '/images/dress.png', '/images/dress.png'],
    size: 'normal',
    material: 'Crinkle Voile Cotton',
    fit: 'Flowing Tiered Silhouette',
    care: 'Machine wash delicate',
  },
  {
    id: 'prod-21',
    title: 'Essential Two-Pack Chino Bundle',
    brand: 'Kensington & Co.',
    price: 185,
    category: 'trousers',
    subcategory: 'Two-Pack Chinos',
    tags: ['trousers', 'chinos', 'trousers-promo', 'two-pack-chinos'],
    images: ['/images/trousers.png', '/images/trousers.png', '/images/trousers.png'],
    size: 'large',
    material: 'Brushed Peached Twill (2-Pack)',
    fit: 'Modern Tailored',
    care: 'Machine wash cold',
  },
  {
    id: 'prod-22',
    title: 'Vintage Sherpa Trucker Denim Jacket',
    brand: 'Iron & Hide',
    price: 160,
    category: 'jackets',
    subcategory: 'Denim Jackets',
    tags: ['jackets', 'denim-jackets', 'jackets-sale', 'winter-clearance'],
    images: ['/images/jacket.png', '/images/jacket.png', '/images/jacket.png'],
    size: 'normal',
    material: '13oz Denim with Fleece Lining',
    fit: 'Classic Trucker',
    care: 'Machine wash cold inside out',
  },
  {
    id: 'prod-23',
    title: 'Pleated Flannel Dress Trousers',
    brand: 'Savile Row Co.',
    price: 175,
    category: 'trousers',
    subcategory: 'Pleated Wool',
    tags: ['trousers', 'pleated-trousers'],
    images: ['/images/trousers.png', '/images/trousers.png', '/images/trousers.png'],
    size: 'normal',
    material: '100% Virgin Worsted Wool',
    fit: 'High-Rise Single Pleat',
    care: 'Dry clean only',
  },
];

export function getMainCategoryForFilter(filter: string): string {
  if (!filter || filter === 'all') return 'all';
  if (['jackets', 'shirts', 'dresses', 'trousers', 'shoes'].includes(filter)) {
    return filter;
  }
  const match = PRODUCTS.find((p) => p.tags.includes(filter));
  return match ? match.category : 'all';
}

export function getFilterDisplayName(filter: string): string {
  if (!filter || filter === 'all') return 'All Products';
  for (const menu of Object.values(CATEGORY_MENUS)) {
    for (const item of menu.items) {
      if (item.filter === filter) {
        return item.label;
      }
    }
  }
  return filter;
}
