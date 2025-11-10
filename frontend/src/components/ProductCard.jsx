import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-square bg-gray-100 mb-3 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-white text-black text-xs font-medium px-3 py-1.5 rounded-full">
            Just In
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            Sale
          </span>
        )}
        <button
          className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            // Handle wishlist
          }}
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-1">
        <div className="text-xs font-medium text-red-600">{product.isNew ? 'Just In' : ''}</div>
        <h3 className="font-medium text-sm group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600">{product.category}</p>
        <p className="text-xs text-gray-500">{product.colors.length} Colour{product.colors.length > 1 ? 's' : ''}</p>
        <div className="flex items-center space-x-2 pt-1">
          {product.originalPrice ? (
            <>
              <span className="font-medium text-sm">${product.price}</span>
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            </>
          ) : (
            <span className="font-medium text-sm">₹ {product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
