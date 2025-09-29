import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, FulfilmentMode } from '@/types';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  fulfilmentMode: FulfilmentMode;
  setFulfilmentMode: (mode: FulfilmentMode) => void;
  generateWhatsAppMessage: (customerInfo: {
    name: string;
    phone: string;
    location: string;
    notes?: string;
  }) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const fulfilmentModes: FulfilmentMode[] = [
  {
    id: 'uber_flash',
    label: 'Uber Flash (Colombo & Nearby)',
    description: 'Instant courier. Fees apply at actuals (paid to rider).',
    payment: 'Pay rider directly',
    availability_note: 'Subject to rider availability & weather'
  },
  {
    id: 'preorder_cod',
    label: 'Pre-Order (COD)',
    description: 'Prepare & reserve your order. Pay cash on delivery.',
    lead_time: '1–2 days',
    coverage: 'Island-wide'
  }
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [fulfilmentMode, setFulfilmentMode] = useState<FulfilmentMode>(fulfilmentModes[0]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('roshan-grams-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('roshan-grams-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const existingItem = cartItems.find(
      cartItem => 
        cartItem.productId === item.productId && 
        cartItem.weightOption.label === item.weightOption.label
    );

    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + item.quantity);
    } else {
      const newItem: CartItem = {
        ...item,
        id: `${item.productId}-${item.weightOption.label}-${Date.now()}`
      };
      setCartItems(prev => [...prev, newItem]);
      toast({
        title: "Added to cart!",
        description: `${item.name} (${item.weightOption.label}) has been added to your cart.`,
      });
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('roshan-grams-cart');
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.weightOption.price * item.quantity), 0);
  };

  const generateWhatsAppMessage = (customerInfo: {
    name: string;
    phone: string;
    location: string;
    notes?: string;
  }) => {
    const orderLines = cartItems.map(item => 
      `- ${item.quantity} x ${item.name} (${item.weightOption.label}) — LKR ${item.weightOption.price * item.quantity}`
    ).join('\n');

    const message = `Roshan Grams Order:
${orderLines}

Subtotal: LKR ${getSubtotal()}
Fulfilment: ${fulfilmentMode.label}
${fulfilmentMode.lead_time ? `Lead Time: ${fulfilmentMode.lead_time}` : ''}

Customer Details:
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
Location: ${customerInfo.location}
${customerInfo.notes ? `Notes: ${customerInfo.notes}` : ''}

Please confirm availability and total amount including delivery charges.`;

    return encodeURIComponent(message);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getSubtotal,
      fulfilmentMode,
      setFulfilmentMode,
      generateWhatsAppMessage
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};