import { Product, Category } from '@/types';
import masalaGramImage from '@/assets/masala-gram-product.jpg';
import giftBoxImage from '@/assets/gift-box-product.jpg';
import kaluDodolImage from '@/assets/kalu-dodol-product.jpg';

export const categories: Category[] = [
  { id: 'mixtures', name: 'Mixtures', icon: 'Blend', description: 'Crispy mixed snacks with perfect spice blends' },
  { id: 'grams', name: 'Grams', icon: 'CircleDot', description: 'Roasted chickpeas and lentils with aromatic spices' },
  { id: 'sweets', name: 'Sweets', icon: 'Candy', description: 'Traditional heritage sweets made with pure ingredients' },
  { id: 'gifts', name: 'Gift Packs', icon: 'Gift', description: 'Curated assortments perfect for every occasion' }
];

export const products: Product[] = [
  {
    id: 'masala-gram-250',
    name: 'Masala Gram',
    category: 'grams',
    images: [masalaGramImage, masalaGramImage, masalaGramImage],
    weights: [
      { label: '250g', price: 650 },
      { label: '500g', price: 1190 },
      { label: '1kg', price: 2190 }
    ],
    badges: ['Bestseller', 'Spicy'],
    spice_level: 'Medium',
    sku: 'RG-MG-250',
    ingredients: ['Chickpeas', 'Chili', 'Curry Leaves', 'Spices', 'Salt'],
    description: 'Hand-roasted chickpeas with our signature spice blend. Perfectly crunchy with a medium heat that builds beautifully.'
  },
  {
    id: 'mix-crispy-500',
    name: 'Crispy Mixture',
    category: 'mixtures',
    images: [masalaGramImage, masalaGramImage],
    weights: [
      { label: '250g', price: 590 },
      { label: '500g', price: 990 }
    ],
    badges: ['Light & Crunchy'],
    spice_level: 'Mild',
    sku: 'RG-MIX-500',
    ingredients: ['Gram Flour', 'Peanuts', 'Curry Leaves', 'Salt'],
    description: 'A delicate mixture with gram flour crisps, roasted peanuts, and fresh curry leaves. Perfect for tea time.'
  },
  {
    id: 'kalu-dodol-400',
    name: 'Kalu Dodol',
    category: 'sweets',
    images: [kaluDodolImage, kaluDodolImage],
    weights: [
      { label: '400g', price: 1690 },
      { label: '800g', price: 3190 }
    ],
    badges: ['Rich & Gooey'],
    sku: 'RG-DOD-400',
    ingredients: ['Coconut Milk', 'Jaggery', 'Rice Flour', 'Spices'],
    description: 'Traditional Sri Lankan dark sweet made with rich coconut milk and pure jaggery. Slow-cooked to perfection.'
  },
  {
    id: 'spiced-cashews',
    name: 'Spiced Cashews',
    category: 'mixtures',
    images: [masalaGramImage],
    weights: [
      { label: '200g', price: 890 },
      { label: '400g', price: 1650 }
    ],
    badges: ['Premium', 'Crunchy'],
    spice_level: 'Mild',
    sku: 'RG-CASH-200',
    ingredients: ['Cashews', 'Turmeric', 'Chili', 'Curry Leaves'],
    description: 'Premium cashews lightly spiced with turmeric and curry leaves. A sophisticated snack.'
  },
  {
    id: 'gift-festive-1',
    name: 'Festive Gift Box (Small)',
    category: 'gifts',
    images: [giftBoxImage],
    weights: [{ label: 'Assorted', price: 2890 }],
    badges: ['Customizable'],
    sku: 'RG-GIFT-S',
    bundle_builder: true,
    description: 'A beautifully curated selection of our bestselling mixtures and sweets, perfect for gifting.'
  },
  {
    id: 'coconut-rolls',
    name: 'Coconut Rolls',
    category: 'sweets',
    images: [kaluDodolImage],
    weights: [
      { label: '300g', price: 1290 },
      { label: '600g', price: 2390 }
    ],
    badges: ['Traditional'],
    sku: 'RG-COC-300',
    ingredients: ['Fresh Coconut', 'Jaggery', 'Cardamom'],
    description: 'Delicate rolls made with fresh grated coconut and pure jaggery, flavored with cardamom.'
  },
  {
    id: 'bombay-mix',
    name: 'Bombay Mix',
    category: 'mixtures',
    images: [masalaGramImage],
    weights: [
      { label: '300g', price: 720 },
      { label: '600g', price: 1390 }
    ],
    badges: ['Classic'],
    spice_level: 'Medium',
    sku: 'RG-BOM-300',
    ingredients: ['Gram Flour', 'Lentils', 'Peanuts', 'Spices'],
    description: 'The classic Indian mixture with a perfect balance of textures and our signature spice blend.'
  },
  {
    id: 'gift-premium-large',
    name: 'Premium Gift Box (Large)',
    category: 'gifts',
    images: [giftBoxImage],
    weights: [{ label: 'Assorted', price: 4990 }],
    badges: ['Premium', 'Customizable'],
    sku: 'RG-GIFT-L',
    bundle_builder: true,
    description: 'Our most luxurious gift box featuring an extensive selection of premium mixtures and heritage sweets.'
  }
];

export const featuredProducts = products.filter(p => p.badges?.includes('Bestseller') || p.badges?.includes('Premium'));
export const newProducts = products.slice(-4);
export const giftProducts = products.filter(p => p.category === 'gifts');