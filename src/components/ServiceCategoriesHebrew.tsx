
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Music, Camera, Utensils, MapPin, Mic2, Monitor, 
  Gift, Sparkles, Calendar, Wand2, PartyPopper, 
  TentTree, User, PlusCircle, Users, Headphones,
  Loader2, Lightbulb, AlignRight, Clock, Building
} from "lucide-react";
import { useEventContext } from "@/context/EventContext";
import { Button } from '@/components/ui/button';
import { HebrewCategory, HebrewSubcategory } from '@/lib/types/hierarchy';
import { Badge } from './ui/badge';

// מיפוי אייקונים
const iconMap: Record<string, React.ReactNode> = {
  "Music": <Music className="h-8 w-8" />,
  "Camera": <Camera className="h-8 w-8" />,
  "Utensils": <Utensils className="h-8 w-8" />,
  "MapPin": <MapPin className="h-8 w-8" />,
  "Mic": <Mic2 className="h-8 w-8" />,
  "Mic2": <Mic2 className="h-8 w-8" />,
  "Monitor": <Monitor className="h-8 w-8" />,
  "Gift": <Gift className="h-8 w-8" />,
  "Sparkles": <Sparkles className="h-8 w-8" />,
  "Calendar": <Calendar className="h-8 w-8" />,
  "Wand2": <Wand2 className="h-8 w-8" />,
  "PartyPopper": <PartyPopper className="h-8 w-8" />,
  "TentTree": <TentTree className="h-8 w-8" />,
  "User": <User className="h-8 w-8" />,
  "PlusCircle": <PlusCircle className="h-8 w-8" />,
  "Users": <Users className="h-8 w-8" />,
  "Headphones": <Headphones className="h-8 w-8" />,
  "Building": <Building className="h-8 w-8" />,
  "Lightbulb": <Lightbulb className="h-8 w-8" />
};

export default function ServiceCategoriesHebrew() {
  const { hebrewCategories, hebrewConcepts, isLoading, featuredServices } = useEventContext();
  const [selectedCategory, setSelectedCategory] = useState<HebrewCategory | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<HebrewSubcategory[]>([]);
  
  useEffect(() => {
    if (hebrewCategories && hebrewCategories.length > 0) {
      // עדכון הקטגוריה הנבחרת הראשונית
      setSelectedCategory(hebrewCategories[0]);
      // עדכון תת-הקטגוריות הנבחרות הראשוניות
      setSelectedSubcategories(hebrewCategories[0].subcategories.slice(0, 6));
    }
  }, [hebrewCategories]);

  // החלפת קטגוריה נבחרת
  const handleCategoryChange = (category: HebrewCategory) => {
    setSelectedCategory(category);
    setSelectedSubcategories(category.subcategories.slice(0, 6));
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">קטגוריות שירותים</h2>
            <p className="text-gray-600">מגוון השירותים שלנו להפקת אירועים מושלמים</p>
          </div>
          <div className="flex justify-center items-center my-12">
            <Loader2 className="h-12 w-12 text-brand-600 animate-spin" />
            <span className="mr-3 text-lg text-gray-600">טוען קטגוריות...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">קטגוריות שירותים</h2>
          <p className="text-gray-600">מגוון השירותים שלנו להפקת אירועים מושלמים, הרצאות, ימי כיף ואמנים מובילים</p>
        </div>
        
        {/* קטגוריות ראשיות */}
        <h3 className="text-2xl font-bold mb-6 text-right">קטגוריות ראשיות</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {hebrewCategories && hebrewCategories.map((category) => (
            <Link key={category.id} to={`/categories/${category.id}`}>
              <Card className={`h-full hover:shadow-md transition-all transform hover:-translate-y-1 duration-300 ${
                selectedCategory?.id === category.id ? 'border-brand-600 border-2' : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleCategoryChange(category);
              }}>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                    <div className="text-brand-600">
                      {category.icon && iconMap[category.icon] ? iconMap[category.icon] : (
                        <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white">
                          {category.name.substring(0, 1)}
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{category.description || ""}</p>
                  {category.subcategories && category.subcategories.length > 0 && (
                    <span className="mt-3 text-xs px-2 py-1 bg-brand-50 text-brand-700 rounded-full">
                      {category.subcategories.length} תתי-קטגוריות
                    </span>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* תת קטגוריות של הקטגוריה הנבחרת */}
        {selectedCategory && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">תת-קטגוריות ב{selectedCategory.name}</h3>
              <Link to={`/categories/${selectedCategory.id}`} className="text-brand-600 hover:text-brand-700">
                צפה בכל תת-הקטגוריות
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {selectedSubcategories.map((subcategory) => (
                <Link key={subcategory.id} to={`/subcategories/${subcategory.id}`}>
                  <Card className="h-full hover:shadow-md transition-all transform hover:-translate-y-1 duration-200">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <h3 className="font-medium text-sm mb-1">{subcategory.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              
              {selectedCategory.subcategories.length > 6 && (
                <Link to={`/categories/${selectedCategory.id}`}>
                  <Card className="h-full hover:shadow-md transition-all bg-gray-50 border-dashed">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                      <PlusCircle className="h-6 w-6 text-gray-400 mb-1" />
                      <span className="text-sm text-gray-500">עוד {selectedCategory.subcategories.length - 6} תתי-קטגוריות</span>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </div>
          </>
        )}

        {/* קונספטים מובילים */}
        <h3 className="text-2xl font-bold mb-6 text-right">קונספטים פופולריים</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {hebrewConcepts && hebrewConcepts.slice(0, 5).map((concept) => (
            <Link key={concept.id} to={`/concepts/${concept.id}`}>
              <Card className="h-full hover:shadow-md transition-all transform hover:-translate-y-1 duration-300">
                <CardContent className="flex flex-col items-center justify-center p-4 text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-accent1-50 flex items-center justify-center mb-3">
                    <div className="text-accent1-600">
                      {concept.icon && iconMap[concept.icon] ? iconMap[concept.icon] : (
                        <div className="w-6 h-6 rounded-full bg-accent1-500 flex items-center justify-center text-white">
                          {concept.name.substring(0, 1)}
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold text-base mb-1">{concept.name}</h3>
                  {concept.subconcepts && (
                    <span className="mt-2 text-xs px-2 py-1 bg-accent1-50 text-accent1-700 rounded-full">
                      {concept.subconcepts.length} סוגי אירועים
                    </span>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* שירותים מובילים - על בסיס featuredServices מהקונטקסט */}
        {featuredServices && featuredServices.length > 0 && (
          <>
            <h3 className="text-2xl font-bold mb-6 text-right">שירותים מובילים</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredServices.slice(0, 4).map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <Link to={`/services/${service.id}`}>
                    <div className="aspect-[5/3] w-full overflow-hidden relative">
                      <img 
                        src={service.imageUrl || "/placeholder.svg"} 
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                      {service.price && (
                        <Badge className="absolute bottom-2 left-2 bg-brand-600">
                          {service.price} ₪
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium line-clamp-1">{service.name}</h4>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-1">{service.description}</div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link to="/featured-services">כל השירותים המובילים</Link>
              </Button>
            </div>
          </>
        )}
        
        <div className="text-center mt-12">
          <Link 
            to="/categories" 
            className="inline-flex items-center text-brand-600 font-medium hover:text-brand-700"
          >
            צפייה בכל הקטגוריות
            <svg className="w-5 h-5 mr-1 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
