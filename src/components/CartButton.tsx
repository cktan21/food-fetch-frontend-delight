
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartButton = () => {
  const { cartItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const itemCount = cartItems.length;

  const handleClick = () => {
    navigate('/cart');
  };

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 pointer-events-none flex justify-center px-4">
      <Button 
        onClick={handleClick}
        className="bg-food-orange hover:bg-orange-600 text-white font-medium py-6 px-6 rounded-full shadow-lg pointer-events-auto flex items-center gap-3 group"
      >
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-2 -right-2 bg-food-red text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
            {itemCount}
          </span>
        </div>
        
        <span className="font-bold">View Cart</span>
        
        <div className="bg-white/20 rounded-full px-3 py-1 text-sm">
          ${totalPrice.toFixed(2)}
        </div>
        
        <span className="absolute inset-0 rounded-full border-2 border-white/20 scale-105 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
      </Button>
    </div>
  );
};

export default CartButton;
