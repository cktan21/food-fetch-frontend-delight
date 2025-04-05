
import { useState } from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const categories = [
  { id: 'all', name: 'All', icon: '🍴' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'burger', name: 'Burgers', icon: '🍔' },
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'salad', name: 'Salads', icon: '🥗' },
  { id: 'dessert', name: 'Desserts', icon: '🍰' },
  { id: 'drink', name: 'Drinks', icon: '🥤' },
  { id: 'indian', name: 'Indian', icon: '🍛' },
  { id: 'mexican', name: 'Mexican', icon: '🌮' },
  { id: 'italian', name: 'Italian', icon: '🍝' },
  { id: 'chinese', name: 'Chinese', icon: '🥡' },
];

type CategoryListProps = {
  onSelectCategory?: (categoryId: string) => void;
}

const CategoryList = ({ onSelectCategory }: CategoryListProps) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
  };

  return (
    <div className="w-full py-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 p-1">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex flex-col items-center px-4 py-3 rounded-lg transition-colors ${
                activeCategory === category.id 
                  ? 'bg-food-orange text-white' 
                  : 'bg-white hover:bg-orange-50 border'
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CategoryList;
