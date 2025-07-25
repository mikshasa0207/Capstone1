'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    priceRange: [0, 5000],
    rating: 0,
    colors: [],
  });
  const { addToCart, addToWishlist, removeFromWishlist, wishlist: cartWishlist } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});

  const availableColors = ['black', 'blue', 'white', 'yellow', 'red'];

  const getSizeOptions = (product) => {
    if (product.category === 'Accessories') return [];
    if (product.category === 'KIDS') return ['9Y', '12Y', '14Y'];
    if (product.category === 'Footwear') {
      if (product.gender === 'Men') return ['UK6', 'UK7', 'UK8', 'UK9', 'UK10'];
      if (product.gender === 'Women') return ['UK5', 'UK6', 'UK7', 'UK8', 'UK9'];
    }
    return ['S', 'M', 'L', 'XL', 'XXL'];
  };

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setFilters(prev => ({ ...prev, category: categoryFromUrl }));
    }

    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error('Failed to fetch products:', err));
  }, [searchParams]);

  const filteredProducts = products.filter(product => {
    const priceInRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const colorMatch = filters.colors.length === 0 || filters.colors.includes(product.color.toLowerCase());
    const searchMatch = !searchParams.get('search') ||
      product.title.toLowerCase().includes(searchParams.get('search').toLowerCase()) ||
      product.description.toLowerCase().includes(searchParams.get('search').toLowerCase());

    return (
      (!filters.category || product.category === filters.category) &&
      (!filters.gender || product.gender === filters.gender) &&
      (!filters.rating || product.rating >= filters.rating) &&
      priceInRange &&
      colorMatch &&
      searchMatch
    );
  });

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

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
        toast.error('Please select a size first');
        return;
      }
      addToCart({ ...product, selectedSize });
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900">
      <Navbar />

      <main className="container mx-auto px-4 pt-20 pb-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-white">Discover Our Collection</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* FILTER */}
          <div className="lg:w-1/4">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg sticky top-24">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Filters</h2>

              <div className="space-y-6">
                {/* Category VALA Filter */}
                <div className="filter-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-2.5 text-black"
                  >
                    <option value="">All Categories</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories">Accessories</option>
                    <option value="KIDS">Kids</option>
                  </select>
                </div>

                {/* Gender VALA Filter */}
                <div className="filter-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={filters.gender}
                    onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                    className="w-full bg-white/50 border text-black border-gray-200 rounded-xl px-4 py-2.5"
                  >
                    <option value="">All Genders</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>

                {/* Price VALA FILTER */}
                <div className="filter-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }))}
                    className="w-full"
                  />
                </div>

                {/* Color VALA Filter */}
                <div className="filter-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map(color => (
                      <label key={color} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.colors.includes(color)}
                          onChange={(e) => {
                            const newColors = e.target.checked
                              ? [...filters.colors, color]
                              : filters.colors.filter(c => c !== color);
                            setFilters(prev => ({ ...prev, colors: newColors }));
                          }}
                          className="form-checkbox h-4 w-4 text-violet-600"
                        />
                        <span className="ml-2 text-black capitalize">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating VALA Filter LAST */}
                <div className="filter-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
                    className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-2.5 text-black"
                  >
                    <option value="0">All Ratings</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="2">2+ Stars</option>
                    <option value="2">1+ Stars</option>
                  </select>
                </div>

                {/* Clear*/}
                <button
                  onClick={() => setFilters({ category: '', gender: '', priceRange: [0, 5000], rating: 0, colors: [] })}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-xl hover:bg-gray-200 mt-4"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => handleWishlistToggle(product)}
                      className={`absolute top-4 right-4 p-2 rounded-full ${wishlist.some(item => item.id === product.id) ? 'bg-red-500' : 'bg-white/80 hover:bg-red-500'} transition duration-300`}
                    >
                      <svg
                        className={`w-6 h-6 ${wishlist.some(item => item.id === product.id) ? 'text-white' : 'text-red-500'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={wishlist.some(item => item.id === product.id) ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex gap-2 mb-2">
                      <span className="bg-violet-100 text-violet-700 text-sm px-3 py-1 rounded-full">{product.category}</span>
                      <span className="bg-pink-100 text-pink-700 text-sm px-3 py-1 rounded-full">{product.gender}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{product.title}</h3>
                    <p className="text-sm text-gray-500 mb-2 capitalize">{product.color}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-violet-600">₹{product.price}</span>
                      <span className="text-sm text-amber-500">★ {product.rating}</span>
                    </div>

                    {/* Size VAALI GRID */}
                    {product.category !== 'Accessories' && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Size</label>
                        <div className="flex flex-wrap gap-2">
                          {getSizeOptions(product).map((size) => (
                            <button
                              key={size}
                              onClick={() => handleSizeSelect(product.id, size)}
                              className={`px-3 py-1 rounded-lg border ${selectedSizes[product.id] === size
                                ? 'bg-violet-600 text-white border-violet-600'
                                : 'border-gray-300 hover:border-violet-600'} transition duration-300`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-pink-700 transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-white">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
