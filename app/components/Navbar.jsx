'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthModals from './AuthModals';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { cart, wishlist } = useCart();

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-30 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <Link href="/" className="text-2xl font-serif">LUXE</Link>
              <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wider">
                <Link href="/products?category=Women" className="hover:text-gray-300 transition">Women</Link>
                <Link href="/products?category=Men" className="hover:text-gray-300 transition">Men</Link>
                <Link href="/products?category=Accessories" className="hover:text-gray-300 transition">Accessories</Link>
                <Link href="/products?category=KIDS" className="hover:text-gray-300 transition">Kids</Link>
                <Link href="/products?category=Footwear" className="hover:text-gray-300 transition">Footwear</Link>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button className="p-2 hover:text-gray-300 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link href="/wishlist" className="p-2 hover:text-gray-300 transition relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={wishlist.length > 0 ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="p-2 hover:text-gray-300 transition relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition duration-300"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AuthModals
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode="register"
      />
    </>
  );
}