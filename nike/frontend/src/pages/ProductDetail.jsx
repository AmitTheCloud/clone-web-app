import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Truck, Package, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { products } from '../mock';
import { useToast } from '../hooks/use-toast';

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]);
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: 'Please select a size',
        variant: 'destructive',
      });
      return;
    }

    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1,
    });

    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (!product) return null;

  const relatedProducts = products
    .filter((p) => p.type === product.type && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-100 mb-4 overflow-hidden rounded-lg">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square bg-gray-100 cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-black' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-6">{product.category}</p>

          <div className="flex items-center space-x-3 mb-8">
            {product.originalPrice ? (
              <>
                <span className="text-2xl font-bold">${product.price}</span>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-full">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">₹ {product.price}</span>
            )}
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Select Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-lg text-sm transition-all ${
                    selectedColor === color
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Select Size</h3>
              <button className="text-sm text-gray-600 hover:text-black">Size Guide</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border rounded-lg text-sm font-medium transition-all ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-3 mb-8">
            <Button
              size="lg"
              className="w-full rounded-full text-base font-medium"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-full text-base font-medium"
            >
              <Heart className="w-5 h-5 mr-2" />
              Favorite
            </Button>
          </div>

          {/* Product Description */}
          <div className="border-t pt-6 mb-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Features */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-start space-x-3">
              <Truck className="w-5 h-5 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Free Delivery</h4>
                <p className="text-sm text-gray-600">Free shipping on orders above $150</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Package className="w-5 h-5 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Fast Shipping</h4>
                <p className="text-sm text-gray-600">Arrives in 2-3 business days</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RotateCcw className="w-5 h-5 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Easy Returns</h4>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="cursor-pointer group"
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <div className="aspect-square bg-gray-100 mb-3 overflow-hidden rounded-lg">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium text-sm mb-1">{relatedProduct.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{relatedProduct.category}</p>
                <p className="font-medium text-sm">₹ {relatedProduct.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
