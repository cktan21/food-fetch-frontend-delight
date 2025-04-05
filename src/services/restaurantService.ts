
import api from '@/lib/api';

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  image: string;
  address: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  categories: string[];
  featured?: boolean;
};

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await api.get('/restaurants');
  return response.data;
};

export const getFeaturedRestaurants = async (): Promise<Restaurant[]> => {
  const response = await api.get('/restaurants/featured');
  return response.data;
};

export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  const response = await api.get(`/restaurants/${id}`);
  return response.data;
};
