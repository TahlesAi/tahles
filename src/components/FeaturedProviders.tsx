
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

// נתונים לדוגמא
const mockProviders: Provider[] = [
  {
    id: "demo",
    name: "נטע ברסלר - אמן המחשבות",
    image: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=400&auto=format&fit=crop",
    category: "מופעים",
    rating: 4.9,
    reviewCount: 84,
    featured: true
  },
  {
    id: "2",
    name: "מיקי החוויה המוזיקלית",
    image: "https://images.unsplash.com/photo-1511915365630-5fe9c0dc2154?w=400&auto=format&fit=crop",
    category: "מופעים",
    rating: 4.8,
    reviewCount: 56
  },
  {
    id: "3",
    name: "גן האירועים הקסום",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&auto=format&fit=crop",
    category: "לוקיישנים",
    rating: 4.7,
    reviewCount: 112
  },
  {
    id: "4",
    name: "צילום אמנותי - ירון כהן",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&auto=format&fit=crop",
    category: "צילום",
    rating: 4.9,
    reviewCount: 78
  }
];

const FeaturedProviders = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // בפועל זה יהיה שאילתת API לשרת או סופאבייס
    const fetchProviders = async () => {
      setIsLoading(true);
      // במוקאפ נשתמש בנתונים הקבועים
      setTimeout(() => {
        setProviders(mockProviders);
        setIsLoading(false);
      }, 500);
    };

    fetchProviders();
  }, []);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : i < rating
              ? 'text-yellow-400 fill-yellow-400 opacity-50'
              : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">טוענים ספקים מובילים...</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="bg-gray-300 h-48 w-full"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">ספקים מובילים</h2>
          <Link to="/search" className="text-brand-600 hover:underline">צפייה בכל הספקים</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {providers.map(provider => (
            <Link 
              to={provider.id === "demo" ? `/services/demo` : `/providers/${provider.id}`}
              key={provider.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-full h-full object-cover"
                />
                {provider.featured && (
                  <div className="absolute top-2 right-2 bg-accent1-600 text-white text-xs py-1 px-2 rounded-full">
                    מומלץ
                  </div>
                )}
                <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="flex items-center text-white">
                    <span className="font-semibold ml-1">{provider.rating}</span>
                    <div className="flex">{renderStars(provider.rating)}</div>
                    <span className="text-xs mr-1">({provider.reviewCount})</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{provider.name}</h3>
                <span className="text-sm text-gray-600">{provider.category}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild>
            <Link to="/search">חיפוש כל הספקים</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
