
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Provider {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  location: string;
  featured: boolean;
  verifiedBadge?: boolean;
}

const providers: Provider[] = [
  {
    id: "1",
    name: "Melody Makers Band",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Musicians",
    rating: 4.9,
    location: "New York, NY",
    featured: true,
    verifiedBadge: true
  },
  {
    id: "2",
    name: "Visual Memories Photography",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Photographers",
    rating: 4.8,
    location: "Los Angeles, CA",
    featured: true
  },
  {
    id: "3",
    name: "Elite Sound Systems",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Audio Equipment",
    rating: 4.7,
    location: "Chicago, IL",
    featured: true,
    verifiedBadge: true
  },
  {
    id: "4",
    name: "Gourmet Delights Catering",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Catering",
    rating: 4.9,
    location: "Miami, FL",
    featured: true
  }
];

const FeaturedProviders = () => {
  return (
    <section className="py-16">
      <div className="container px-4">
        <h2 className="section-title">Top Rated Providers</h2>
        <p className="section-subtitle">
          Meet our exceptional service providers with proven track records of excellence
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {providers.map((provider) => (
            <Link key={provider.id} to={`/providers/${provider.id}`}>
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="w-full h-full object-cover"
                  />
                  {provider.featured && (
                    <Badge className="absolute top-2 right-2 bg-brand-500">Featured</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-sm">
                      {provider.category}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                      <span className="text-sm font-medium">{provider.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 truncate">
                    {provider.name}
                    {provider.verifiedBadge && (
                      <span className="ml-1 inline-flex items-center justify-center w-4 h-4 bg-brand-500 rounded-full">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500">{provider.location}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
