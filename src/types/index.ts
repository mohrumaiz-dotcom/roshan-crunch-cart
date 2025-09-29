// Roshan Grams Type Definitions

export interface Product {
  id: string;
  name: string;
  category: 'mixtures' | 'grams' | 'sweets' | 'gifts';
  images: string[];
  weights: {
    label: string;
    price: number;
  }[];
  badges?: string[];
  spice_level?: 'Mild' | 'Medium' | 'Hot';
  sku: string;
  ingredients?: string[];
  description?: string;
  bundle_builder?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  weightOption: {
    label: string;
    price: number;
  };
  quantity: number;
  image: string;
}

export interface FulfilmentMode {
  id: 'uber_flash' | 'preorder_cod';
  label: string;
  description: string;
  payment?: string;
  lead_time?: string;
  coverage?: string;
  availability_note?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface WhatsAppOrder {
  items: CartItem[];
  subtotal: number;
  fulfilment: FulfilmentMode;
  customerInfo: {
    name: string;
    phone: string;
    location: string;
    notes?: string;
  };
  preferredTime?: string;
}