
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart, MenuItem } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample food item data
const foodItem = {
  id: '101',
  name: 'Classic Cheeseburger',
  description: 'Our signature burger with a juicy beef patty, melted cheese, fresh lettuce, tomato, onion, pickles, and our special sauce on a toasted bun.',
  price: 8.99,
  image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  restaurant: {
    id: '1',
    name: 'Burger Paradise'
  },
  options: [
    {
      name: 'Size',
      required: true,
      items: [
        { id: 'size-1', name: 'Regular', price: 0 },
        { id: 'size-2', name: 'Large', price: 2.00 }
      ]
    },
    {
      name: 'Patty Type',
      required: true,
      items: [
        { id: 'patty-1', name: 'Beef', price: 0 },
        { id: 'patty-2', name: 'Chicken', price: 0 },
        { id: 'patty-3', name: 'Vegetarian', price: 1.00 }
      ]
    }
  ],
  extras: [
    { id: 'extra-1', name: 'Extra Cheese', price: 1.00 },
    { id: 'extra-2', name: 'Bacon', price: 1.50 },
    { id: 'extra-3', name: 'Avocado', price: 2.00 },
    { id: 'extra-4', name: 'Fried Egg', price: 1.00 }
  ]
};

const FoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // In a real app, you would fetch the food item details based on the id

  const handleOptionChange = (optionName: string, itemId: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionName]: itemId
    });
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(
      selectedExtras.includes(extraId)
        ? selectedExtras.filter(id => id !== extraId)
        : [...selectedExtras, extraId]
    );
  };

  const calculateTotalPrice = () => {
    let total = foodItem.price * quantity;
    
    // Add option prices
    Object.entries(selectedOptions).forEach(([optionName, itemId]) => {
      const option = foodItem.options.find(opt => opt.name === optionName);
      if (option) {
        const item = option.items.find(i => i.id === itemId);
        if (item) {
          total += item.price * quantity;
        }
      }
    });
    
    // Add extras prices
    selectedExtras.forEach(extraId => {
      const extra = foodItem.extras.find(e => e.id === extraId);
      if (extra) {
        total += extra.price * quantity;
      }
    });
    
    return total;
  };

  const handleAddToCart = () => {
    // Create options object with readable names for display
    const optionsForCart: Record<string, string> = {};
    
    Object.entries(selectedOptions).forEach(([optionName, itemId]) => {
      const option = foodItem.options.find(opt => opt.name === optionName);
      if (option) {
        const item = option.items.find(i => i.id === itemId);
        if (item) {
          optionsForCart[optionName] = item.name;
        }
      }
    });
    
    // Add selected extras
    if (selectedExtras.length > 0) {
      const extrasNames = selectedExtras.map(id => {
        const extra = foodItem.extras.find(e => e.id === id);
        return extra ? extra.name : '';
      }).filter(Boolean);
      
      optionsForCart['Extras'] = extrasNames.join(', ');
    }
    
    // Add special instructions if any
    if (specialInstructions) {
      optionsForCart['Special Instructions'] = specialInstructions;
    }
    
    const item: MenuItem = {
      id: `${foodItem.id}-${Date.now()}`, // Make unique ID for customized items
      name: foodItem.name,
      description: foodItem.description,
      price: calculateTotalPrice() / quantity, // Price per item with options
      image: foodItem.image,
      quantity,
      restaurantId: foodItem.restaurant.id,
      restaurantName: foodItem.restaurant.name,
      options: optionsForCart
    };
    
    addToCart(item);
    navigate(`/restaurant/${foodItem.restaurant.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pb-20">
        {/* Back Button */}
        <div className="container-custom pt-4">
          <Link 
            to={`/restaurant/${foodItem.restaurant.id}`} 
            className="inline-flex items-center text-gray-600 hover:text-food-orange transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to {foodItem.restaurant.name}
          </Link>
        </div>
        
        {/* Food Item Details */}
        <div className="container-custom py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="rounded-xl overflow-hidden">
              <img 
                src={foodItem.image} 
                alt={foodItem.name}
                className="w-full h-80 object-cover"
              />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">{foodItem.name}</h1>
              <p className="text-gray-600 mb-4">{foodItem.description}</p>
              <div className="text-xl font-bold mb-6">${foodItem.price.toFixed(2)}</div>
              
              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 font-medium w-8 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Options */}
              {foodItem.options.map((option, index) => (
                <div key={index} className="mb-6">
                  <h3 className="font-medium mb-2">
                    {option.name} {option.required && <span className="text-food-red">*</span>}
                  </h3>
                  <RadioGroup 
                    defaultValue={option.items[0].id}
                    onValueChange={(value) => handleOptionChange(option.name, value)}
                  >
                    {option.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value={item.id} id={item.id} />
                        <Label htmlFor={item.id} className="flex-1">
                          {item.name}
                        </Label>
                        {item.price > 0 && (
                          <span className="text-gray-600">+${item.price.toFixed(2)}</span>
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
              
              {/* Extras */}
              {foodItem.extras.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Extras</h3>
                  {foodItem.extras.map((extra) => (
                    <div key={extra.id} className="flex items-center space-x-2 mb-2">
                      <Checkbox 
                        id={extra.id} 
                        checked={selectedExtras.includes(extra.id)}
                        onCheckedChange={() => handleExtraToggle(extra.id)}
                      />
                      <Label htmlFor={extra.id} className="flex-1">
                        {extra.name}
                      </Label>
                      <span className="text-gray-600">+${extra.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Special Instructions */}
              <div className="mb-8">
                <h3 className="font-medium mb-2">Special Instructions</h3>
                <textarea 
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  placeholder="Any special requests or allergies?"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                ></textarea>
              </div>
              
              {/* Add to Cart Button */}
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold">
                  Total: ${calculateTotalPrice().toFixed(2)}
                </div>
                <Button 
                  className="bg-food-orange hover:bg-orange-600 px-8"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FoodDetail;
