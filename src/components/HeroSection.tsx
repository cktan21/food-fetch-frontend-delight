
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Here you would typically navigate to search results page
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          filter: "brightness(40%)" 
        }}
      />
      
      <div className="relative container-custom py-20 md:py-32 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
          Delicious Food, <br /> Delivered Fast
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: "200ms" }}>
          Order from your favorite local restaurants with free delivery on your first order!
        </p>
        
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-full overflow-hidden flex items-center p-1 shadow-lg animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          <Input
            type="text"
            placeholder="Search for food or restaurants..."
            className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" size="sm" className="rounded-full bg-food-orange hover:bg-orange-600">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
