'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, wishlist } = useCart();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const userFirstName = user?.name?.split(' ')[0] || user?.email?.split('@')[0];

  return (
    <nav className="absolute top-0 left-0 right-0 z-30 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo & Links */}
          <div className="flex items-center space-x-12">
            <Link href="/" className="text-3xl font-serif">Zayra</Link>
            <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wider">
              <Link href="/products?category=Clothing" className="hover:text-gray-300 transition">Clothing</Link>
              <Link href="/products?category=Accessories" className="hover:text-gray-300 transition">Accessories</Link>
              <Link href="/products?category=KIDS" className="hover:text-gray-300 transition">Kids</Link>
              <Link href="/products?category=Footwear" className="hover:text-gray-300 transition">Footwear</Link>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-6">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className="p-1 sm:p-2 hover:text-gray-300 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link href="/wishlist" className="p-1 sm:p-2 hover:text-gray-300 transition relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={wishlist.length > 0 ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link href="/cart" className="p-1 sm:p-2 hover:text-gray-300 transition relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm">Hi, {userFirstName}</span>
                <button
                  onClick={handleLogout}
                  className="px-2 sm:px-4 py-2 text-sm bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push('/auth/signup')}
                className="px-2 sm:px-4 py-2 text-sm bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition duration-300 whitespace-nowrap"
              >
                Register
              </button>
            )}
          </div>
        </div>

        {/* Search Modal */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg rounded-b-2xl p-4 mt-2">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-800"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
