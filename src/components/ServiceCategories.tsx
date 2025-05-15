
import { useState } from "react";
import { Link } from "react-router-dom";
import { Music, Camera, Utensils, MapPin, Mic, Monitor, Truck, PaintBucket } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

const categories: Category[] = [
  { id: "music", name: "Musicians & Bands", icon: <Music className="category-icon" />, count: 248 },
  { id: "photography", name: "Photographers", icon: <Camera className="category-icon" />, count: 157 },
  { id: "catering", name: "Catering Services", icon: <Utensils className="category-icon" />, count: 132 },
  { id: "venues", name: "Venues & Spaces", icon: <MapPin className="category-icon" />, count: 98 },
  { id: "performers", name: "Performers", icon: <Mic className="category-icon" />, count: 186 },
  { id: "equipment", name: "Audio-Visual Equipment", icon: <Monitor className="category-icon" />, count: 74 },
  { id: "logistics", name: "Transportation", icon: <Truck className="category-icon" />, count: 45 },
  { id: "decor", name: "Decoration", icon: <PaintBucket className="category-icon" />, count: 112 },
];

const ServiceCategories = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4">
        <h2 className="section-title">Browse Service Categories</h2>
        <p className="section-subtitle">
          Discover the perfect professionals and services for your next event
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/categories/${category.id}`}
              className="category-card"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className={`transition-transform duration-300 ${
                hoveredCategory === category.id ? 'scale-110' : 'scale-100'
              }`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-center">{category.name}</h3>
              <p className="text-sm text-gray-500 mt-2">{category.count} providers</p>
              {hoveredCategory === category.id && (
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand-500 to-accent1-500 w-full"></div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
