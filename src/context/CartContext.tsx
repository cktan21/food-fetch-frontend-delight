
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'sonner';

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  quantity?: number;
  restaurantId: string;
  restaurantName: string;
  options?: Record<string, string>; // For customizations
}

type CartItem = MenuItem & {
  quantity: number;
}

type CartState = {
  cartItems: CartItem[];
  totalPrice: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const STORAGE_KEY = 'foodfetch_cart';

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
};

// Load from localStorage if available
const loadState = (): CartState => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading cart state:', error);
  }
  return initialState;
};

const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id
      );

      let newCartItems;

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        newCartItems = [...state.cartItems];
        newCartItems[existingItemIndex] = {
          ...newCartItems[existingItemIndex],
          quantity: newCartItems[existingItemIndex].quantity + (action.payload.quantity || 1)
        };
      } else {
        // Add new item
        newCartItems = [
          ...state.cartItems,
          { ...action.payload, quantity: action.payload.quantity || 1 }
        ];
      }

      const newState = {
        ...state,
        cartItems: newCartItems,
        totalPrice: calculateTotalPrice(newCartItems)
      };

      return newState;
    }

    case 'REMOVE_ITEM': {
      const newCartItems = state.cartItems.filter(item => item.id !== action.payload);
      
      const newState = {
        ...state,
        cartItems: newCartItems,
        totalPrice: calculateTotalPrice(newCartItems)
      };

      return newState;
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is zero or negative
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }
      
      const newCartItems = state.cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      
      const newState = {
        ...state,
        cartItems: newCartItems,
        totalPrice: calculateTotalPrice(newCartItems)
      };

      return newState;
    }

    case 'CLEAR_CART':
      return {
        ...initialState
      };

    default:
      return state;
  }
};

type CartContextType = CartState & {
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, loadState());

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addToCart = (item: MenuItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    toast.success(`${item.name} added to cart!`);
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast.info('Item removed from cart');
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.info('Cart cleared');
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
