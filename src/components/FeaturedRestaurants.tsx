
import { useState, useEffect } from 'react';
import RestaurantCard, { Restaurant } from './RestaurantCard';

// Sample restaurant data
const sampleRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Paradise',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    cuisine: 'American, Burgers',
    rating: 4.7,
    deliveryTime: '15-25 min',
    deliveryFee: 'Free Delivery',
    featured: true,
    promotion: '20% OFF'
  },
  {
    id: '2',
    name: 'Pizza Heaven',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    cuisine: 'Italian, Pizza',
    rating: 4.5,
    deliveryTime: '20-30 min',
    deliveryFee: '$2.99 Delivery',
    featured: true
  },
  {
    id: '3',
    name: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    cuisine: 'Japanese, Sushi',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: '$3.99 Delivery',
    featured: true
  },
  {
    id: '4',
    name: 'Taco Fiesta',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    cuisine: 'Mexican, Tacos',
    rating: 4.3,
    deliveryTime: '15-30 min',
    deliveryFee: '$1.99 Delivery',
    featured: true,
    promotion: 'Buy One Get One'
  },
  {
    id: '5',
    name: 'Green Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    cuisine: 'Healthy, Salads',
    rating: 4.6,
    deliveryTime: '10-20 min',
    deliveryFee: '$2.49 Delivery',
    featured: true
  },
  {
    id: '6',
    name: 'Curry House',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356cf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    cuisine: 'Indian, Curry',
    rating: 4.4,
    deliveryTime: '25-40 min',
    deliveryFee: '$2.99 Delivery',
    featured: true
  }
];

type FeaturedRestaurantsProps = {
  title?: string;
  filterFeatured?: boolean;
  maxItems?: number;
}

const FeaturedRestaurants = ({ 
  title = "Featured Restaurants", 
  filterFeatured = true,
  maxItems = 6
}: FeaturedRestaurantsProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    // In a real app, you would fetch from an API here
    let filteredRestaurants = sampleRestaurants;
    if (filterFeatured) {
      filteredRestaurants = sampleRestaurants.filter(r => r.featured);
    }
    
    setRestaurants(filteredRestaurants.slice(0, maxItems));
  }, [filterFeatured, maxItems]);

  return (
    <section className="py-8">
      <div className="container-custom">
        <h2 className="section-title">{title}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
