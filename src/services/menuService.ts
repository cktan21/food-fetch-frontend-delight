
import api from '@/lib/api';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
  categories: string[];
  options?: Record<string, string[]>;
};

export const getMenuItems = async (restaurantId: string): Promise<MenuItem[]> => {
  const response = await api.get(`/restaurants/${restaurantId}/menu`);
  return response.data;
};

export const getMenuItemById = async (id: string): Promise<MenuItem> => {
  const response = await api.get(`/menu/${id}`);
  return response.data;
};

export const searchMenuItems = async (query: string): Promise<MenuItem[]> => {
  const response = await api.get(`/menu/search?q=${encodeURIComponent(query)}`);
  return response.data;
};
