import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProductCard from '../components/ProductCard';
import { heroSlides, products } from '../mock';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[600px] bg-gray-100 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-6">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-90">{slide.subtitle}</p>
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 rounded-full px-8 font-medium"
                  onClick={() => navigate('/products')}
                >
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Slider controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slider dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-[1440px] mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured</h2>
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={() => navigate('/products')}
          >
            Shop All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-[1440px] mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={() => navigate('/products?filter=new')}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Cards */}
      <section className="max-w-[1440px] mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="relative h-[400px] overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => navigate('/products?gender=men')}
          >
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
              alt="Men's"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-3xl font-bold text-white mb-2">Men's</h3>
              <Button className="bg-white text-black hover:bg-gray-200 rounded-full">
                Shop Now
              </Button>
            </div>
          </div>

          <div
            className="relative h-[400px] overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => navigate('/products?gender=women')}
          >
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
              alt="Women's"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-3xl font-bold text-white mb-2">Women's</h3>
              <Button className="bg-white text-black hover:bg-gray-200 rounded-full">
                Shop Now
              </Button>
            </div>
          </div>

          <div
            className="relative h-[400px] overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => navigate('/products?gender=kids')}
          >
            <img
              src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80"
              alt="Kids'"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-3xl font-bold text-white mb-2">Kids'</h3>
              <Button className="bg-white text-black hover:bg-gray-200 rounded-full">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width banner */}
      <section className="my-16">
        <div className="relative h-[500px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1600&q=80"
            alt="Move to Zero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-2xl px-6">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">MOVE TO ZERO</h2>
              <p className="text-lg md:text-xl mb-8">
                Our journey towards a zero carbon and zero waste future
              </p>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 rounded-full px-8 font-medium"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
