
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const deliveryFee = cartItems.length > 0 ? 2.99 : 0;
  const subtotal = totalPrice;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/checkout');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          <div className="flex items-center mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-600 hover:text-food-orange transition-colors mr-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Continue Shopping
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">Your Cart</h1>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex justify-center items-center p-4 bg-gray-100 rounded-full mb-4">
                <ShoppingCart className="h-10 w-10 text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add items from restaurants to get started.</p>
              <Link to="/">
                <Button className="bg-food-orange hover:bg-orange-600">
                  Browse Restaurants
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">Cart Items ({cartItems.length})</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-500"
                      onClick={() => clearCart()}
                    >
                      Clear Cart
                    </Button>
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  {cartItems.map((item) => (
                    <div key={item.id} className="mb-6">
                      <div className="flex gap-4">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-600 mb-1">
                                from {item.restaurantName}
                              </p>
                              
                              {/* Item options */}
                              {item.options && Object.entries(item.options).length > 0 && (
                                <div className="mt-1 text-sm text-gray-600">
                                  {Object.entries(item.options).map(([key, value]) => (
                                    <div key={key}>
                                      <span className="font-medium">{key}:</span> {value}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <span className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="mx-2 w-6 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-0 h-auto"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-bold text-lg mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-food-orange hover:bg-orange-600 text-white py-6"
                    disabled={cartItems.length === 0 || isLoading}
                    onClick={handleCheckout}
                  >
                    {isLoading ? "Processing..." : "Proceed to Checkout"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
