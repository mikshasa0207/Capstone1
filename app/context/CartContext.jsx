'use client';

import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product, size) => {
    if (!cart.some(item => item.id === product.id)) {
      setCart(prev => [...prev, { ...product, selectedSize: size }]);
      toast.success('Added to cart successfully!');
    } else {
      toast.error('Item already in cart!');
    }
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    toast.success('Removed from cart!');
  };

  const addToWishlist = (product) => {
    if (!wishlist.some(item => item.id === product.id)) {
      setWishlist(prev => [...prev, product]);
      toast.success('Added to wishlist!');
    } else {
      toast.error('Item already in wishlist!');
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
    toast.success('Removed from wishlist!');
  };

  const moveToCart = (product, size) => {
    removeFromWishlist(product.id);
    addToCart(product, size);
    toast.success('Moved to cart successfully!');
  };

  const moveToWishlist = (product) => {
    removeFromCart(product.id);
    addToWishlist(product);
    toast.success('Moved to wishlist successfully!');
  };

  return (
    <CartContext.Provider value={{
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      addToWishlist,
      removeFromWishlist,
      moveToCart,
      moveToWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}