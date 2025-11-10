import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, genderOptions } from '../mock';
import { Button } from '../components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    let filtered = [...products];

    // Apply URL params
    const gender = searchParams.get('gender');
    const filterNew = searchParams.get('filter');
    const sale = searchParams.get('sale');

    if (gender) {
      filtered = filtered.filter((p) => p.gender === gender);
    }

    if (filterNew === 'new') {
      filtered = filtered.filter((p) => p.isNew);
    }

    if (sale === 'true') {
      filtered = filtered.filter((p) => p.originalPrice);
    }

    // Apply selected filters
    if (selectedGenders.length > 0) {
      filtered = filtered.filter((p) => selectedGenders.includes(p.gender));
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.type));
    }

    // Apply price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Apply sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [searchParams, selectedGenders, selectedCategories, priceRange, sortBy]);

  const toggleGender = (gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedGenders([]);
    setSelectedCategories([]);
    setPriceRange([0, 200]);
  };

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Gender Filter */}
      <div>
        <h3 className="font-medium mb-3">Gender</h3>
        <div className="space-y-2">
          {genderOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`gender-${option.value}`}
                checked={selectedGenders.includes(option.value)}
                onCheckedChange={() => toggleGender(option.value)}
              />
              <Label
                htmlFor={`gender-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="pt-6 border-t">
        <h3 className="font-medium mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.value}`}
                checked={selectedCategories.includes(category.value)}
                onCheckedChange={() => toggleCategory(category.value)}
              />
              <Label
                htmlFor={`category-${category.value}`}
                className="text-sm cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-6 border-t">
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="space-y-2 text-sm">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="price"
              checked={priceRange[0] === 0 && priceRange[1] === 200}
              onChange={() => setPriceRange([0, 200])}
            />
            <span>All</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="price"
              checked={priceRange[0] === 0 && priceRange[1] === 50}
              onChange={() => setPriceRange([0, 50])}
            />
            <span>Under $50</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="price"
              checked={priceRange[0] === 50 && priceRange[1] === 100}
              onChange={() => setPriceRange([50, 100])}
            />
            <span>$50 - $100</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="price"
              checked={priceRange[0] === 100 && priceRange[1] === 150}
              onChange={() => setPriceRange([100, 150])}
            />
            <span>$100 - $150</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="price"
              checked={priceRange[0] === 150 && priceRange[1] === 200}
              onChange={() => setPriceRange([150, 200])}
            />
            <span>Over $150</span>
          </label>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">All Products</h1>
          <p className="text-sm text-gray-600">{filteredProducts.length} Products</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>

          {/* Mobile filter */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden rounded-full">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterSection />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <FilterSection />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600 mb-4">No products found</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
