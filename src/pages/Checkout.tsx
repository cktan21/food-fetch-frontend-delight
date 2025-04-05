
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Clock, 
  MapPin, 
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formStep, setFormStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    apt: '',
    city: '',
    state: '',
    zipCode: '',
    instructions: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });
  
  const deliveryFee = cartItems.length > 0 ? 2.99 : 0;
  const subtotal = totalPrice;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + deliveryFee + tax;
  
  const handleDeliveryInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDeliveryAddress({
      ...deliveryAddress,
      [name]: value
    });
  };
  
  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };
  
  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(1);
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setIsOrderComplete(true);
      clearCart(); // Clear cart after successful order
    }, 2000);
  };

  if (isOrderComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow py-12">
          <div className="container-custom max-w-md mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Your order has been received and is being prepared. You'll receive updates on your order status via email.
            </p>
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="font-semibold text-center mb-4">Estimated Delivery Time</h2>
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 mr-2 text-food-orange" />
                <span className="text-xl font-bold">30-45 minutes</span>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Delivery times may vary based on traffic and restaurant preparation
              </p>
            </div>
            
            <Button 
              onClick={() => navigate('/')}
              className="w-full bg-food-orange hover:bg-orange-600"
            >
              Return to Home
            </Button>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container-custom max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>
          
          {/* Checkout Progress */}
          <div className="flex items-center mb-10">
            <div className={`flex items-center ${formStep >= 0 ? 'text-food-orange' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                formStep >= 0 ? 'bg-food-orange text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="font-medium">Delivery</span>
            </div>
            
            <ChevronRight className="mx-4 text-gray-300" />
            
            <div className={`flex items-center ${formStep >= 1 ? 'text-food-orange' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                formStep >= 1 ? 'bg-food-orange text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="font-medium">Payment</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Forms */}
            <div className="lg:col-span-2">
              {formStep === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-food-orange" />
                    Delivery Information
                  </h2>
                  
                  <form onSubmit={handleDeliverySubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          name="street"
                          value={deliveryAddress.street}
                          onChange={handleDeliveryInfoChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="apt">Apartment/Suite (optional)</Label>
                        <Input
                          id="apt"
                          name="apt"
                          value={deliveryAddress.apt}
                          onChange={handleDeliveryInfoChange}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={deliveryAddress.city}
                          onChange={handleDeliveryInfoChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={deliveryAddress.state}
                          onChange={handleDeliveryInfoChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={deliveryAddress.zipCode}
                          onChange={handleDeliveryInfoChange}
                          required
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label htmlFor="instructions">Delivery Instructions (optional)</Label>
                        <textarea
                          id="instructions"
                          name="instructions"
                          value={deliveryAddress.instructions}
                          onChange={handleDeliveryInfoChange}
                          className="w-full p-2 border rounded-md"
                          rows={3}
                          placeholder="E.g., Ring doorbell, leave at door, etc."
                        ></textarea>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-food-orange hover:bg-orange-600 mt-4"
                    >
                      Continue to Payment
                    </Button>
                  </form>
                </div>
              )}
              
              {formStep === 1 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-food-orange" />
                    Payment Method
                  </h2>
                  
                  <form onSubmit={handlePaymentSubmit}>
                    <RadioGroup 
                      defaultValue="card" 
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="mb-6"
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">Credit/Debit Card</Label>
                        <div className="flex space-x-1">
                          <div className="w-10 h-6 bg-blue-100 rounded"></div>
                          <div className="w-10 h-6 bg-red-100 rounded"></div>
                          <div className="w-10 h-6 bg-yellow-100 rounded"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex-1 cursor-pointer">PayPal</Label>
                        <div className="w-10 h-6 bg-blue-600 rounded"></div>
                      </div>
                    </RadioGroup>
                    
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name on Card</Label>
                          <Input
                            id="name"
                            name="name"
                            value={cardDetails.name}
                            onChange={handleCardDetailsChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="number">Card Number</Label>
                          <Input
                            id="number"
                            name="number"
                            value={cardDetails.number}
                            onChange={handleCardDetailsChange}
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiration Date</Label>
                            <Input
                              id="expiry"
                              name="expiry"
                              value={cardDetails.expiry}
                              onChange={handleCardDetailsChange}
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              type="password"
                              value={cardDetails.cvv}
                              onChange={handleCardDetailsChange}
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between mt-6">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setFormStep(0)}
                      >
                        Back
                      </Button>
                      
                      <Button 
                        type="submit" 
                        className="bg-food-orange hover:bg-orange-600"
                        disabled={isLoading}
                      >
                        {isLoading ? "Processing..." : "Place Order"}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                
                <div className="max-h-60 overflow-y-auto mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2">
                      <div className="flex items-center">
                        <span className="bg-gray-100 w-6 h-6 rounded-full text-center text-sm mr-2">
                          {item.quantity}
                        </span>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
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
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
