
import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export type Restaurant = {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  featured?: boolean;
  promotion?: string;
}

type RestaurantCardProps = {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="block">
      <div className="food-card overflow-hidden group">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {restaurant.promotion && (
            <Badge className="absolute top-3 left-3 bg-food-orange hover:bg-orange-600">
              {restaurant.promotion}
            </Badge>
          )}
          
          {restaurant.featured && (
            <Badge className="absolute top-3 right-3 bg-food-red hover:bg-rose-600">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg line-clamp-1">{restaurant.name}</h3>
            <div className="flex items-center text-sm bg-green-50 text-green-700 px-2 py-1 rounded">
              <Star className="h-3 w-3 fill-current mr-1" />
              <span>{restaurant.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm mt-1">{restaurant.cuisine}</p>
          
          <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <span>{restaurant.deliveryFee}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
