
import api from '@/lib/api';

export type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  addresses?: {
    id: string;
    street: string;
    city: string;
    zipCode: string;
    notes?: string;
    isDefault: boolean;
  }[];
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export const login = async (credentials: LoginCredentials): Promise<{ token: string; user: User }> => {
  const response = await api.post('/auth/login', credentials);
  localStorage.setItem('auth_token', response.data.token);
  return response.data;
};

export const register = async (data: RegisterData): Promise<{ token: string; user: User }> => {
  const response = await api.post('/auth/register', data);
  localStorage.setItem('auth_token', response.data.token);
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('auth_token');
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/auth/profile');
  return response.data;
};

export const updateProfile = async (data: Partial<User>): Promise<User> => {
  const response = await api.put('/auth/profile', data);
  return response.data;
};
