
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '@/services/orderService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { format } from 'date-fns';
import { ChevronLeft, MapPin, Clock, CreditCard, Check, Truck } from 'lucide-react';

const OrderDetail = () => {
  const { id = '' } = useParams<{ id: string }>();
  
  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });

  const getOrderStatusStep = (status?: string) => {
    switch (status) {
      case 'delivered': return 4;
      case 'delivery': return 3;
      case 'preparing': return 2;
      case 'confirmed': return 1;
      default: return 0; // pending
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gradient-to-br from-orange-50 to-rose-50">
        <div className="container-custom max-w-4xl">
          <Link to="/orders" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Orders
          </Link>
          
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 mb-4">Failed to load order details. Please try again.</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : order ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">Order #{order.id?.slice(-6)}</h1>
                    <p className="text-gray-500">
                      {order.createdAt && format(new Date(order.createdAt), 'PPP p')}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'delivery' ? 'bg-purple-100 text-purple-800' :
                      order.status === 'confirmed' ? 'bg-teal-100 text-teal-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {order.status === 'delivered' ? 'Delivered' :
                       order.status === 'preparing' ? 'Preparing' :
                       order.status === 'delivery' ? 'On Delivery' :
                       order.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Order tracking */}
              {order.status !== 'delivered' && (
                <div className="p-6 border-b bg-gray-50">
                  <h2 className="text-lg font-semibold mb-4">Track Your Order</h2>
                  
                  <div className="relative">
                    {/* Progress bar */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                    <div 
                      className="absolute top-1/2 left-0 h-1 bg-food-orange -translate-y-1/2 z-0"
                      style={{ width: `${getOrderStatusStep(order.status) * 25}%` }}
                    ></div>
                    
                    {/* Steps */}
                    <div className="relative z-10 grid grid-cols-4 gap-2">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                          getOrderStatusStep(order.status) >= 1 ? 'bg-food-orange text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                          <Check className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-center">Confirmed</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                          getOrderStatusStep(order.status) >= 2 ? 'bg-food-orange text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-center">Preparing</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                          getOrderStatusStep(order.status) >= 3 ? 'bg-food-orange text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                          <Truck className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-center">On Delivery</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                          getOrderStatusStep(order.status) >= 4 ? 'bg-food-orange text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                          <Check className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-center">Delivered</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {order.status === 'delivery' 
                          ? 'Estimated arrival in 15-25 minutes'
                          : 'Estimated delivery in 30-45 minutes'}
                      </span>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      Contact Support
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Order details */}
              <div className="p-6 grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Order Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Restaurant</p>
                      <p className="font-medium">Restaurant #{order.restaurantId.slice(0, 8)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Delivery Address</p>
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">{order.address.street}</p>
                          <p className="text-sm">{order.address.city}, {order.address.zipCode}</p>
                          {order.address.notes && (
                            <p className="text-sm text-gray-500 mt-1">{order.address.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="font-medium capitalize">{order.paymentMethod}</p>
                      </div>
                      <p className="text-sm mt-1">
                        Status: <span className={order.paymentStatus === 'completed' ? 'text-green-600' : 'text-orange-600'}>
                          {order.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.quantity}x {item.menuItemId.split('-')[0]}</p>
                          {item.options && Object.entries(item.options).length > 0 && (
                            <ul className="text-sm text-gray-500">
                              {Object.entries(item.options).map(([key, value]) => (
                                <li key={key}>{key}: {value}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <p>${(item.quantity * 8.99).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <p>Subtotal</p>
                      <p>${(order.totalAmount ? order.totalAmount * 0.85 : 0).toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p>Delivery Fee</p>
                      <p>${(order.totalAmount ? order.totalAmount * 0.1 : 0).toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p>Tax</p>
                      <p>${(order.totalAmount ? order.totalAmount * 0.05 : 0).toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between font-medium text-lg pt-2 border-t">
                      <p>Total</p>
                      <p>${order.totalAmount?.toFixed(2) || '0.00'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t bg-gray-50 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">Need help with your order?</p>
                  <p className="text-sm">Contact our <a href="#" className="text-food-orange hover:underline">customer support</a></p>
                </div>
                
                {order.status === 'delivered' && (
                  <Button>Reorder</Button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">Order not found</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderDetail;
