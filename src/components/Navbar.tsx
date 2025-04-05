
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, User, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems } = useCart();
  const cartItemCount = cartItems.length;

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-6 mt-10">
                  <Link to="/" className="text-lg font-medium hover:text-food-orange transition-colors">
                    Home
                  </Link>
                  <Link to="/restaurants" className="text-lg font-medium hover:text-food-orange transition-colors">
                    Restaurants
                  </Link>
                  <Link to="/cart" className="text-lg font-medium hover:text-food-orange transition-colors">
                    Cart
                  </Link>
                  <Link to="/account" className="text-lg font-medium hover:text-food-orange transition-colors">
                    Account
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold">
              <span className="text-food-orange">Food</span>
              <span className="text-food-red">Fetch</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-food-orange transition-colors">
              Home
            </Link>
            <Link to="/restaurants" className="font-medium hover:text-food-orange transition-colors">
              Restaurants
            </Link>
          </div>

          {/* Right Side - Search, Account, Cart */}
          <div className="flex items-center space-x-2">
            {isSearchOpen ? (
              <div className="absolute inset-0 bg-white z-50 flex items-center p-4 md:p-0 md:relative md:bg-transparent md:inset-auto">
                <Input 
                  type="search"
                  placeholder="Search for food, restaurants..."
                  className="w-full md:w-40 lg:w-60" 
                  autoFocus
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-2"
                  onClick={() => setIsSearchOpen(false)}
                >
                  ✕
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-food-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
