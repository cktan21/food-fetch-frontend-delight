
import HeroSection from '@/components/HeroSection';
import CategoryList from '@/components/CategoryList';
import FeaturedRestaurants from '@/components/FeaturedRestaurants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartButton from '@/components/CartButton';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        <div className="container-custom my-8">
          <CategoryList />
        </div>
        
        <FeaturedRestaurants title="Featured Restaurants" filterFeatured={true} />
        
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                <h2 className="section-title">
                  Download Our <span className="heading-gradient">App</span>
                </h2>
                <p className="text-gray-600 mb-6">
                  Get the full experience on our mobile app. Track your delivery in real-time, access exclusive offers, and order your favorite food with just a few taps.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="flex items-center bg-black text-white px-4 py-2 rounded-lg">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.5639 12.4882C17.5524 9.76602 19.8363 8.86246 19.92 8.82581C18.7587 7.10941 16.9206 6.85436 16.2705 6.83223C14.7332 6.67268 13.2602 7.7367 12.4774 7.7367C11.6771 7.7367 10.4604 6.84745 9.14646 6.87646C7.42387 6.90547 5.83034 7.89781 4.93306 9.43241C3.07312 12.553 4.43004 17.1487 6.21929 19.8188C7.12607 21.1166 8.1741 22.5766 9.57663 22.5237C10.9376 22.4657 11.4651 21.6664 13.1129 21.6664C14.7449 21.6664 15.2409 22.5237 16.6645 22.4893C18.1376 22.4657 19.0306 21.1677 19.8996 19.8557C20.9361 18.3473 21.3488 16.8735 21.3678 16.8016C21.3298 16.7885 17.579 15.3841 17.5639 12.4882Z" />
                      <path d="M15.3448 4.60866C16.0895 3.68398 16.5845 2.41501 16.4323 1.12891C15.3338 1.17725 13.944 1.85919 13.1655 2.75773C12.4729 3.5401 11.8738 4.86755 12.0496 6.09865C13.2854 6.19535 14.5678 5.50922 15.3448 4.60866Z" />
                    </svg>
                    App Store
                  </a>
                  <a href="#" className="flex items-center bg-black text-white px-4 py-2 rounded-lg">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 2.25C3.39834 2.25 3.19667 2.33231 3.04743 2.47891C2.89819 2.62551 2.8125 2.82526 2.8125 3.03398V20.966C2.8125 21.1747 2.89819 21.3745 3.04743 21.5211C3.19667 21.6677 3.39834 21.75 3.609 21.75H20.391C20.6017 21.75 20.8033 21.6677 20.9526 21.5211C21.1018 21.3745 21.1875 21.1747 21.1875 20.966V3.03398C21.1875 2.82526 21.1018 2.62551 20.9526 2.47891C20.8033 2.33231 20.6017 2.25 20.391 2.25H3.609Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M7.875 7.875V16.125L15.75 12L7.875 7.875Z" />
                    </svg>
                    Google Play
                  </a>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1605170439002-90845e8c0137?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Food Delivery App" 
                  className="rounded-lg shadow-xl max-w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedRestaurants title="Top Rated Near You" filterFeatured={false} maxItems={3} />
      </main>
      
      <Footer />
      <CartButton />
    </div>
  );
};

export default Index;
