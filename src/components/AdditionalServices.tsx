
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ServiceType {
  id: string;
  title: string;
  provider: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string;
}

const premiumServices: ServiceType[] = [
  {
    id: "s1",
    title: "Professional Sound System",
    provider: "SoundMasters Pro",
    rating: 4.9,
    reviewCount: 187,
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop",
    category: "Equipment"
  },
  {
    id: "s2",
    title: "Immersive Light Shows",
    provider: "LightWizards",
    rating: 4.8,
    reviewCount: 142,
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop",
    category: "Production"
  },
  {
    id: "s3",
    title: "Event Photography",
    provider: "MemoryFrames",
    rating: 4.7,
    reviewCount: 213,
    imageUrl: "https://images.unsplash.com/photo-1512813389649-acb9131ced20?w=800&auto=format&fit=crop",
    category: "Photography"
  },
  {
    id: "s4",
    title: "Fireworks Display",
    provider: "Sky Illuminations",
    rating: 4.9,
    reviewCount: 98,
    imageUrl: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=800&auto=format&fit=crop",
    category: "Entertainment"
  }
];

const AdditionalServices = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Premium Services</h2>
          <Link to="/services/premium" className="text-brand-600 hover:underline flex items-center">
            View all premium services
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {premiumServices.map((service) => (
            <Link key={service.id} to={`/services/${service.id}`}>
              <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    {service.category}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">{service.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">{service.provider}</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium ml-1">{service.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({service.reviewCount})</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;
