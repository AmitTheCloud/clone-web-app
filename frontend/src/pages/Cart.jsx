import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-20">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-gray-300" />
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Button
            size="lg"
            className="rounded-full"
            onClick={() => navigate('/products')}
          >
            Shop Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              className="flex gap-4 p-4 border rounded-lg"
            >
              <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-sm text-gray-600 space-y-1 mb-3">
                  <p>Color: {item.selectedColor}</p>
                  <p>Size: {item.selectedSize}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 border rounded-full">
                    <button
                      onClick={() => onUpdateQuantity(item, Math.max(1, item.quantity - 1))}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">₹ {(item.price * item.quantity).toFixed(2)}</p>
                    {item.quantity > 1 && (
                      <p className="text-sm text-gray-600">₹ {item.price} each</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : `₹ ${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
                  Add ₹ {(150 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full rounded-full mb-3">
              Checkout
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-full"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>

            <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
              <p>• Secure checkout</p>
              <p>• 30-day return policy</p>
              <p>• Free returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
