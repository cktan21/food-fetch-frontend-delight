
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, MapPin, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart, MenuItem } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartButton from '@/components/CartButton';

// Sample restaurant data
const restaurantData = {
  id: '1',
  name: 'Burger Paradise',
  image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  coverImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  cuisine: 'American, Burgers',
  rating: 4.7,
  reviewCount: 253,
  deliveryTime: '15-25 min',
  deliveryFee: 'Free Delivery',
  minOrder: 10,
  address: '123 Burger Street, Foodville',
  description: 'Serving the juiciest burgers in town since 2010. Our patties are made from 100% grass-fed beef, and all our ingredients are locally sourced when possible.',
  menu: [
    {
      category: 'Popular Items',
      items: [
        {
          id: '101',
          name: 'Classic Cheeseburger',
          description: 'Beef patty, cheddar cheese, lettuce, tomato, onion, pickles, and our special sauce',
          price: 8.99,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          popular: true
        },
        {
          id: '102',
          name: 'Bacon Deluxe Burger',
          description: 'Beef patty, bacon, cheddar cheese, lettuce, tomato, onion, and BBQ sauce',
          price: 10.99,
          image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          popular: true
        },
        {
          id: '103',
          name: 'Truffle Fries',
          description: 'Golden fries tossed with truffle oil, parmesan cheese, and parsley',
          price: 5.99,
          image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          popular: true
        }
      ]
    },
    {
      category: 'Burgers',
      items: [
        {
          id: '201',
          name: 'Veggie Burger',
          description: 'Plant-based patty, lettuce, tomato, onion, pickles, and vegan mayo',
          price: 9.99,
          image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: '202',
          name: 'Double Trouble Burger',
          description: 'Two beef patties, double cheese, bacon, lettuce, tomato, and our special sauce',
          price: 13.99,
          image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: '203',
          name: 'Spicy Jalapeño Burger',
          description: 'Beef patty, pepper jack cheese, jalapeños, lettuce, tomato, and spicy mayo',
          price: 11.99,
          image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        }
      ]
    },
    {
      category: 'Sides',
      items: [
        {
          id: '301',
          name: 'French Fries',
          description: 'Golden crispy fries served with ketchup',
          price: 3.99,
          image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: '302',
          name: 'Onion Rings',
          description: 'Crispy battered onion rings served with ranch',
          price: 4.99,
          image: 'https://images.unsplash.com/photo-1581746139673-8d48a59d7378?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: '303',
          name: 'Mac & Cheese',
          description: 'Creamy mac & cheese with a crispy top',
          price: 5.99,
          image: 'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        }
      ]
    },
    {
      category: 'Drinks',
      items: [
        {
          id: '401',
          name: 'Soft Drink',
          description: 'Choice of Coke, Diet Coke, Sprite, or Fanta',
          price: 2.49,
          image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: '402',
          name: 'Milkshake',
          description: 'Chocolate, vanilla, or strawberry milkshake',
          price: 5.99,
          image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: '403',
          name: 'Craft Beer',
          description: 'Selection of local craft beers',
          price: 6.99,
          image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        }
      ]
    }
  ]
};

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [restaurant, setRestaurant] = useState(restaurantData);
  const [currentTab, setCurrentTab] = useState('Popular Items');
  const [menuCategories, setMenuCategories] = useState<string[]>([]);

  useEffect(() => {
    // In a real app, you would fetch the restaurant data by id
    console.log(`Fetching restaurant with id: ${id}`);
    
    // Extract menu categories
    if (restaurant) {
      const categories = restaurant.menu.map(section => section.category);
      setMenuCategories(categories);
      setCurrentTab(categories[0]);
    }
  }, [id, restaurant]);

  const handleAddToCart = (item: any) => {
    const cartItem: MenuItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      quantity: 1,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name
    };
    
    addToCart(cartItem);
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading restaurant details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Back Button */}
        <div className="container-custom pt-4">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-food-orange transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to restaurants
          </Link>
        </div>
        
        {/* Restaurant Header */}
        <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 mt-4 overflow-hidden">
          <img 
            src={restaurant.coverImage || restaurant.image} 
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container-custom">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
                  
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm md:text-base">
                    <span>{restaurant.cuisine}</span>
                    <span className="h-1 w-1 bg-white rounded-full"></span>
                    
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-food-yellow mr-1" />
                      <span>{restaurant.rating}</span>
                      <span className="ml-1 text-gray-300">({restaurant.reviewCount}+ ratings)</span>
                    </div>
                    
                    <span className="h-1 w-1 bg-white rounded-full"></span>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2 text-sm text-gray-200">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{restaurant.address}</span>
                  </div>
                </div>
                
                <div className="hidden md:flex flex-col items-end">
                  <Badge className="bg-food-orange mb-2">{restaurant.deliveryFee}</Badge>
                  <span className="text-sm">Min. order: ${restaurant.minOrder}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Menu */}
        <div className="container-custom py-8">
          <Tabs defaultValue={currentTab} onValueChange={setCurrentTab} className="w-full">
            <div className="border-b mb-6">
              <TabsList className="bg-transparent h-auto p-0 mb-[-1px]">
                {menuCategories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="px-6 py-3 border-b-2 border-transparent data-[state=active]:border-food-orange rounded-none data-[state=active]:bg-transparent"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {restaurant.menu.map((section) => (
              <TabsContent key={section.category} value={section.category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.items.map((item) => (
                    <div key={item.id} className="food-card flex overflow-hidden">
                      <div className="flex-1 p-4">
                        <div className="flex justify-between">
                          <h3 className="font-bold text-lg">{item.name}</h3>
                          <span className="font-bold">${item.price.toFixed(2)}</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {item.description}
                        </p>
                        
                        {item.popular && (
                          <Badge className="bg-food-red mt-2">Popular</Badge>
                        )}
                        
                        <Button 
                          className="mt-4 bg-food-orange hover:bg-orange-600"
                          size="sm"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                      
                      <div className="w-1/3 relative">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {/* Restaurant Info */}
        <div className="container-custom pb-20">
          <h2 className="text-xl font-bold mb-4">About {restaurant.name}</h2>
          <p className="text-gray-600">{restaurant.description}</p>
        </div>
      </main>
      
      <Footer />
      <CartButton />
    </div>
  );
};

export default RestaurantDetail;
