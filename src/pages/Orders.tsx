
import { useQuery } from '@tanstack/react-query';
import { getUserOrders } from '@/services/orderService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { formatDistance, format } from 'date-fns';

const Orders = () => {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['user-orders'],
    queryFn: getUserOrders,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gradient-to-br from-orange-50 to-rose-50">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">Your Orders</h1>
          <p className="text-gray-600 mb-8">Track and manage your current and past orders</p>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 mb-4">Failed to load your orders. Please try again.</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : orders && orders.length > 0 ? (
            <div className="space-y-6">
              {/* Active orders section */}
              {orders.some(order => order.status !== 'delivered') && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Active Orders</h2>
                  <div className="space-y-4">
                    {orders
                      .filter(order => order.status !== 'delivered')
                      .map((order) => (
                        <div
                          key={order.id}
                          className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-food-orange"
                        >
                          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                            <div>
                              <p className="font-medium text-lg">Order #{order.id?.slice(-6)}</p>
                              <p className="text-sm text-gray-500">
                                {order.createdAt && format(new Date(order.createdAt), 'PPP')}
                              </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                              <span className={`px-3 py-1 text-sm rounded-full ${
                                order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'delivery' ? 'bg-purple-100 text-purple-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                {order.status === 'preparing' ? 'Preparing' :
                                 order.status === 'delivery' ? 'On Delivery' :
                                 order.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                              </span>
                              <span className="text-sm text-gray-500">
                                Estimated delivery: 30-45 min
                              </span>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="font-medium">Items:</p>
                            <ul className="ml-6 list-disc text-gray-600">
                              {order.items.map((item, index) => (
                                <li key={index}>
                                  {item.quantity}x {item.menuItemId.split('-')[0]}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex flex-wrap justify-between items-center">
                            <p className="font-medium">
                              Total: <span className="text-lg">${order.totalAmount?.toFixed(2) || '0.00'}</span>
                            </p>
                            <Link to={`/orders/${order.id}`}>
                              <Button>Track Order</Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              {/* Past orders section */}
              {orders.some(order => order.status === 'delivered') && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Order History</h2>
                  <div className="space-y-4">
                    {orders
                      .filter(order => order.status === 'delivered')
                      .map((order) => (
                        <div
                          key={order.id}
                          className="bg-white rounded-lg shadow-sm p-6"
                        >
                          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                            <div>
                              <p className="font-medium">Order #{order.id?.slice(-6)}</p>
                              <p className="text-sm text-gray-500">
                                {order.createdAt && format(new Date(order.createdAt), 'PPP')} ·{' '}
                                {order.createdAt && formatDistance(new Date(order.createdAt), new Date(), { addSuffix: true })}
                              </p>
                            </div>
                            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                              Delivered
                            </span>
                          </div>
                          
                          <div className="mb-4">
                            <p className="font-medium">Items:</p>
                            <ul className="ml-6 list-disc text-gray-600">
                              {order.items.map((item, index) => (
                                <li key={index}>
                                  {item.quantity}x {item.menuItemId.split('-')[0]}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex flex-wrap justify-between items-center">
                            <p className="font-medium">
                              Total: <span>${order.totalAmount?.toFixed(2) || '0.00'}</span>
                            </p>
                            <div className="flex gap-2">
                              <Link to={`/orders/${order.id}`}>
                                <Button variant="outline" size="sm">View Details</Button>
                              </Link>
                              <Button variant="outline" size="sm">Reorder</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
              <p className="text-gray-500 mb-8">You haven't placed any orders yet. Start exploring restaurants!</p>
              <Link to="/">
                <Button className="bg-food-orange hover:bg-orange-600">Browse Restaurants</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Orders;
