'use client';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ImageCarousel from './components/ImageCarousel';
import { useCart } from './context/CartContext';
import { FaHeart, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Home() {
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});

  const newArrivals = [
    {
      id: 2,
      title: "ZAYRA WOMEN T-SHIRT",
      price: 699,
      color: "Red",
      sizes: ["S", "M", "L", "XL", "XXL"],
      image: "https://res.cloudinary.com/ds7hb1nju/image/upload/v1753184287/red_tshirt_women_jumkv9.webp"
    },
    {
      id: 17,
      title: "ZAYRA Men SHOES",
      price: 1299,
      color: "Red",
      sizes: ["UK6", "UK7", "UK8", "UK9", "UK10", "UK11"],
      image: "https://res.cloudinary.com/ds7hb1nju/image/upload/v1753184286/red_men_shoes_mgomcd.webp"
    },
    {
      id: 28,
      title: "ZAYRA KIDS T-SHIRT",
      price: 999,
      color: "Yellow",
      sizes: ["9Y", "12Y", "14Y"],
      image: "https://res.cloudinary.com/ds7hb1nju/image/upload/v1753184288/yellow_tshirt_kids_b4pmmv.avif"
    },
    {
      id: 13,
      title: "ZAYRA WOMEN SHOES",
      price: 699,
      color: "Blue",
      sizes: ["UK5", "UK6", "UK7", "UK8", "UK9"],
      image: "https://res.cloudinary.com/ds7hb1nju/image/upload/v1753184285/blue_shoes_women_x8cbod.avif"
    },
    {
      id: 21,
      title: "ZAYRA MEN TIE",
      price: 299,
      color: "Yellow",
      image: "https://res.cloudinary.com/ds7hb1nju/image/upload/v1753184288/yellow_acc_men_vdcffi.jpg"
    },
    {
      id: 22,
      title: "ZAYRA WOMEN CLUTCH",
      price: 199,
      color: "BLACK",
      image: "https://res.cloudinary.com/ds7hb1nju/image/upload/v1753184284/black_acc_women_nbztt7.webp"
    }
  ];
  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleAddToCart = (product) => {
    if (product.category !== 'Accessories') {
      const selectedSize = selectedSizes[product.id];
      if (!selectedSize) {
        alert('Please select a size first');
        return;
      }
      addToCart({ ...product, selectedSize });
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative h-screen w-full overflow-hidden">
        <ImageCarousel />
        <div className="absolute inset-0 z-10">
          <Navbar />

          <div className="h-full flex items-center justify-center text-white px-4">
            <div className="text-center space-y-8 max-w-4xl mx-auto relative z-20">
              <h1 className="text-6xl md:text-8xl font-bold font-serif tracking-tight animate-fade-in drop-shadow-2xl">
                Elevate Every Moment with ZAYRA
              </h1>
              <p className="text-xl md:text-2xl font-light tracking-wider uppercase text-white drop-shadow-lg">
                Bold looks for bright minds—comfort meets cool
              </p>
              <div className="flex gap-6 justify-center mt-8">
                <Link
                  href="/products"
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white transition duration-300 text-lg uppercase tracking-wider rounded-lg transform hover:scale-105 shadow-xl"
                >
                  Shop Collection
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Arrivals */}
      <section id="new-arrivals" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-orange-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-serif text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            New Arrivals
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Discover our latest collection</p>
          
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
              {newArrivals.map((product) => (
                <div key={product.id} className="flex-none w-80 snap-start group relative overflow-hidden rounded-xl shadow-2xl bg-white">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => handleWishlistToggle(product)}
                      className={`p-2 rounded-full ${wishlist.some(item => item.id === product.id) ? 'bg-red-500' : 'bg-white/70 hover:bg-red-500'} transition duration-300`}
                    >
                      <FaHeart className={`w-5 h-5 ${wishlist.some(item => item.id === product.id) ? 'text-white' : 'text-red-500'}`} />
                    </button>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="text-lg font-medium truncate">{product.title}</h3>
                    <p className="text-purple-600 font-semibold mt-2">₹{product.price}</p>
                    {product.sizes && (
                      <div className="mt-3">
                        <div className="flex gap-2 flex-wrap mb-3">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => handleSizeSelect(product.id, size)}
                              className={`px-2 py-1 text-sm border rounded ${selectedSizes[product.id] === size
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'border-gray-300 hover:border-purple-600'} transition duration-300`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
                        >
                          Add to Cart
                        </button>
                      </div>
                    )}
                    {!product.sizes && (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full mt-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <h2 className="text-5xl md:text-6xl font-serif text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
            Shop by Category
          </h2>
          <p className="text-center text-pink-200/80 mb-16 text-lg">Find your perfect style</p>

          <div className="flex gap-6 snap-x snap-mandatory pb-6 hide-scrollbar">
            {[
              { name: 'Clothing', image: '/carousel/clothing.jpg', category: 'Clothing' },
              { name: 'Accessories', image: '/carousel/acc.jpg', category: 'Accessories' },
              { name: 'Footwear', image: '/carousel/shoes.jpg', category: 'Footwear' },
              { name: 'Kids', image: '/carousel/kids.jpg', category: 'KIDS' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.category}`}
                className="flex-none w-80 snap-start group relative cursor-pointer rounded-xl overflow-hidden aspect-square"
              >
                {/* Background image */}
                <div
                  className="w-full h-full bg-center bg-cover transform group-hover:scale-105 transition duration-500"
                  style={{ backgroundImage: `url(${category.image})` }}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300 z-10" />

                {/* Category name */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-2xl font-light tracking-wider group-hover:scale-110 transition duration-300">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Form */}
      <section id="contact-us" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600">We'd love to hear from you. Send us a message!</p>
          
          <form 
            className="space-y-6 text-left"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              try {
                const response = await fetch('https://formspree.io/f/xldlbgdq', {
                  method: 'POST',
                  body: formData,
                  headers: {
                    'Accept': 'application/json'
                  }
                });
                if (response.ok) {
                  toast.success('Message sent successfully!');
                  // Reset form
                  e.target.reset();
                  // Redirect to home page after a short delay
                  setTimeout(() => {
                    window.location.href = '/';
                  }, 2000);
                } else {
                  toast.error('Failed to send message. Please try again.');
                }
              } catch (error) {
                toast.error('An error occurred. Please try again later.');
              }
            }}
          >
            {/* Form fields remain the same */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="w-full px-4 text-black py-3 rounded-lg border border-purple-200 focus:outline-none focus:border-purple-400 transition duration-300"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  className="w-full text-black px-4 py-3 rounded-lg border border-purple-200 focus:outline-none focus:border-purple-400 transition duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="How can we help you?"
                className="w-full text-black px-4 py-3 rounded-lg border border-purple-200 focus:outline-none focus:border-purple-400 transition duration-300"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your message here..."
                className="w-full text-black px-4 py-3 rounded-lg border border-purple-200 focus:outline-none focus:border-purple-400 transition duration-300"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button 
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
