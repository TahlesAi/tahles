
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Music, Camera, Utensils, MapPin, Mic, Monitor, 
  Truck, PaintBucket, Gift, PartyPopper, Sparkles
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  imageUrl?: string;
}

const categories: Category[] = [
  { id: "music", name: "Musicians & Bands", icon: <Music className="text-white h-6 w-6" />, count: 248, imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop" },
  { id: "photography", name: "Photographers", icon: <Camera className="text-white h-6 w-6" />, count: 157, imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop" },
  { id: "catering", name: "Catering Services", icon: <Utensils className="text-white h-6 w-6" />, count: 132, imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop" },
  { id: "venues", name: "Venues & Spaces", icon: <MapPin className="text-white h-6 w-6" />, count: 98, imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop" },
  { id: "performers", name: "Performers", icon: <Mic className="text-white h-6 w-6" />, count: 186, imageUrl: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=800&auto=format&fit=crop" },
  { id: "equipment", name: "Audio-Visual Equipment", icon: <Monitor className="text-white h-6 w-6" />, count: 74, imageUrl: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&auto=format&fit=crop" },
  { id: "gifts", name: "Gifts & Favors", icon: <Gift className="text-white h-6 w-6" />, count: 45, imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop" },
  { id: "decor", name: "Decoration", icon: <Sparkles className="text-white h-6 w-6" />, count: 112, imageUrl: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&auto=format&fit=crop" },
];

const ServiceCategories = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section className="py-12 bg-white">
      <div className="container px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Featured Categories</h2>
          <Link to="/categories" className="text-brand-600 hover:underline flex items-center">
            View all categories
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/categories/${category.id}`}
              className="relative overflow-hidden rounded-lg aspect-[4/3] group"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: `url(${category.imageUrl})` }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <div className="mb-2 bg-brand-600/70 p-2 inline-block rounded-full">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <p className="text-sm text-gray-300">{category.count} providers</p>
              </div>
              
              {/* Bottom border on hover */}
              <div 
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand-500 to-accent1-500 w-full transform transition-transform duration-300 ${
                  hoveredCategory === category.id ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
