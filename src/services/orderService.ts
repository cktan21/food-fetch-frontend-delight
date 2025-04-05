
import api from '@/lib/api';
import { MenuItem } from '@/context/CartContext';

export type OrderItem = {
  menuItemId: string;
  quantity: number;
  options?: Record<string, string>;
};

export type Order = {
  id?: string;
  restaurantId: string;
  items: OrderItem[];
  address: {
    street: string;
    city: string;
    zipCode: string;
    notes?: string;
  };
  status?: 'pending' | 'confirmed' | 'preparing' | 'delivery' | 'delivered';
  totalAmount?: number;
  paymentMethod: 'card' | 'cash';
  paymentStatus?: 'pending' | 'completed';
  createdAt?: string;
};

export const createOrder = async (cartItems: MenuItem[], address: Order['address'], paymentMethod: Order['paymentMethod']): Promise<Order> => {
  // Group items by restaurant
  const restaurantGroups = cartItems.reduce((acc, item) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = [];
    }
    acc[item.restaurantId].push({
      menuItemId: item.id,
      quantity: item.quantity || 1,
      options: item.options
    });
    return acc;
  }, {} as Record<string, OrderItem[]>);

  // Create orders for each restaurant
  const orders: Order[] = [];
  
  for (const [restaurantId, items] of Object.entries(restaurantGroups)) {
    const orderData: Order = {
      restaurantId,
      items,
      address,
      paymentMethod
    };
    const response = await api.post('/orders', orderData);
    orders.push(response.data);
  }
  
  // Return the first order for now (we could implement multi-order tracking later)
  return orders[0];
};

export const getOrderById = async (id: string): Promise<Order> => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const getUserOrders = async (): Promise<Order[]> => {
  const response = await api.get('/orders');
  return response.data;
};
