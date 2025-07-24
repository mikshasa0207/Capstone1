import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ImageCarousel from './components/ImageCarousel';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative h-screen w-full overflow-hidden">
        <ImageCarousel />
        <div className="absolute inset-0 z-10">
          <Navbar />
          <div className="h-full flex items-center justify-center text-white px-4">
            <div className="text-center space-y-8 max-w-4xl mx-auto relative z-20">
              <h1 className="text-6xl md:text-8xl font-bold font-serif tracking-tight animate-fade-in drop-shadow-2xl">
                FASHION FORWARD
              </h1>
              <p className="text-xl md:text-2xl font-light tracking-wider uppercase text-white drop-shadow-lg">
                Elevate Your Style Journey
              </p>
              <div className="flex gap-6 justify-center mt-8">
                <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white transition duration-300 text-lg uppercase tracking-wider rounded-lg transform hover:scale-105 shadow-xl">
                  Shop Collection
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 transition duration-300 text-lg uppercase tracking-wider rounded-lg transform hover:scale-105 shadow-xl">
                  Explore More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-serif text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            New Arrivals
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Discover our latest collection</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-xl shadow-2xl">
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
                  <div className="w-full h-full transform group-hover:scale-110 transition duration-700 ease-out bg-gradient-to-br from-purple-200 to-pink-200"></div>
                </div>
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="text-white w-full">
                    <h3 className="text-xl font-medium">Trendy Collection</h3>
                    <p className="mt-2 text-pink-300">$299</p>
                    <button className="mt-4 w-full py-2 bg-white text-black rounded-lg transform hover:scale-105 transition duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-serif text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
            Shop by Category
          </h2>
          <p className="text-center text-pink-200/80 mb-16 text-lg">Find your perfect style</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Dresses', 'Accessories', 'Shoes', 'Bags'].map((category) => (
              <div key={category} className="group relative cursor-pointer rounded-xl overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-purple-400/20 to-pink-400/20 overflow-hidden">
                  <div className="w-full h-full transform group-hover:scale-105 transition duration-500 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition duration-300">
                  <h3 className="text-2xl font-light tracking-wider group-hover:scale-110 transition duration-300">
                    {category}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-600">Get 10% off your first order when you sign up</p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 rounded-lg border border-purple-200 focus:outline-none focus:border-purple-400 transition duration-300"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
