import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('stun_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('stun_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, variant, quantity = 1) => {
    setCart(prev => {
      const itemKey = `${product.id}-${variant?.sku || 'default'}`;
      const existing = prev.find(item => item.itemKey === itemKey);
      
      const price = variant?.salePrice || variant?.price || product.salePrice || product.price;
      
      if (existing) {
        return prev.map(item => 
          item.itemKey === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      
      return [...prev, {
        itemKey,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        image: variant?.image || product.images?.[0] || '',
        variantName: variant?.name || null,
        variantSku: variant?.sku || product.sku,
        price,
        quantity
      }];
    });
  };

  const updateQuantity = (itemKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCart(prev => prev.map(item => item.itemKey === itemKey ? { ...item, quantity } : item));
  };

  const removeFromCart = (itemKey) => {
    setCart(prev => prev.filter(item => item.itemKey !== itemKey));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, subtotal, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}