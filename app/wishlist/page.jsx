'use client';

import { useState } from 'react'; 
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, moveToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleMoveToCart = (product) => {
    const selectedSize = selectedSizes[product.id];
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }
    moveToCart(product, selectedSize);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-white">My Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-12 bg-white/10 backdrop-blur-md rounded-2xl">
            <p className="text-xl text-white mb-4">Your wishlist is empty</p>
            <a href="/products" className="inline-block px-6 py-3 bg-white text-purple-900 rounded-lg hover:bg-opacity-90 transition">
              Explore Products
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <div key={product.id} className="bg-white/80 backdrop-blur-md rounded-xl overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[300px] object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                      {product.gender}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-2xl font-bold text-violet-600 mb-4">₹{product.price}</p>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Size</label>
                    <div className="flex gap-2">
                      {availableSizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSizes({ ...selectedSizes, [product.id]: size })}
                          className={`px-3 py-1 rounded-lg border ${selectedSizes[product.id] === size
                            ? 'bg-violet-600 text-white border-violet-600'
                            : 'border-gray-300 hover:border-violet-600'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="flex-1 bg-gradient-to-r from-violet-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:from-violet-700 hover:to-pink-700 transition-all duration-300"
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}