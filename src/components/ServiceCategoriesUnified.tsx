
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useEventContext } from "@/context/EventContext";
import { useAutoCarousel } from "@/hooks/useAutoCarousel";
import {
  Utensils,
  Mic,
  Car,
  Lightbulb,
  MapPin,
  Camera,
  Music,
  Gift,
  Clock,
  TentTree,
  Sparkles,
  Building
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import useIsMobile from "@/hooks/use-mobile";

const iconMapping: Record<string, React.ComponentType<any>> = {
  "Utensils": Utensils,
  "Music": Music,
  "TentTree": TentTree,
  "Sparkles": Sparkles,
  "Building": Building,
  "MapPin": MapPin,
  "Gift": Gift,
  "Mic": Mic,
  "Car": Car,
  "Lightbulb": Lightbulb,
  "Camera": Camera,
  "Clock": Clock,
};

const ServiceCategoriesUnified = () => {
  const { hebrewCategories, isLoading, error } = useEventContext();
  const isMobile = useIsMobile();
  const { emblaRef } = useAutoCarousel({ delay: 3000 });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50" dir="rtl">
        <div className="container px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !hebrewCategories || hebrewCategories.length === 0) {
    return (
      <section className="py-16 bg-gray-50" dir="rtl">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">שגיאה בטעינת הקטגוריות</h2>
          <p className="text-xl text-gray-600">{error || "לא נמצאו קטגוריות במערכת"}</p>
        </div>
      </section>
    );
  }

  // חלוקת הקטגוריות לחבילות של 3 בקטגוריה רגילה, 1 במובייל
  const itemsPerSlide = isMobile ? 1 : 3;
  const slides = [];
  
  // יצירת רשימה מתרחבת כדי להבטיח שורות שלמות
  const extendedCategories = [...hebrewCategories];
  while (extendedCategories.length % itemsPerSlide !== 0) {
    extendedCategories.push(...hebrewCategories.slice(0, itemsPerSlide - (extendedCategories.length % itemsPerSlide)));
  }
  
  for (let i = 0; i < extendedCategories.length; i += itemsPerSlide) {
    slides.push(extendedCategories.slice(i, i + itemsPerSlide));
  }

  return (
    <section className="py-16 bg-gray-50" dir="rtl">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">קטגוריות שירותים</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            בחר מתוך מגוון רחב של קטגוריות כדי למצוא את השירות המושלם לאירוע שלך
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {slides.map((slideCategories, slideIndex) => (
                <div 
                  key={slideIndex} 
                  className="flex-[0_0_100%] min-w-0"
                >
                  <div className={`grid gap-6 ${
                    isMobile 
                      ? 'grid-cols-1' 
                      : 'grid-cols-3'
                  }`}>
                    {slideCategories.map((category, index) => {
                      const Icon = iconMapping[category.icon || "MapPin"];
                      const subcategoryCount = category.subcategories ? category.subcategories.length : 0;
                      
                      return (
                        <Link
                          key={`${category.id}-${slideIndex}-${index}`}
                          to={`/categories/${category.id}`}
                          className="group block"
                        >
                          <Card className={`h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105 ${
                            isMobile ? 'h-20' : 'h-auto'
                          }`}>
                            <CardContent className={`text-center ${
                              isMobile ? 'p-4 flex items-center' : 'p-6'
                            }`}>
                              <div className={`${isMobile ? 'mr-4' : 'mb-4'} flex ${isMobile ? '' : 'justify-center'}`}>
                                <div className={`bg-brand-100 rounded-full flex items-center justify-center group-hover:bg-brand-200 transition-colors ${
                                  isMobile ? 'w-12 h-12' : 'w-16 h-16'
                                }`}>
                                  {Icon && <Icon className={`text-brand-600 ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`} />}
                                </div>
                              </div>
                              <div className={isMobile ? 'flex-1' : ''}>
                                <h3 className={`font-semibold group-hover:text-brand-600 transition-colors ${
                                  isMobile ? 'text-base mb-1 text-right' : 'text-lg mb-2'
                                }`}>
                                  {category.name}
                                </h3>
                                {!isMobile && category.description && (
                                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                    {category.description}
                                  </p>
                                )}
                                <div className={`text-brand-600 font-medium ${
                                  isMobile ? 'text-sm text-right' : 'text-sm mt-4'
                                }`}>
                                  {subcategoryCount} תתי קטגוריות
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* אינדיקטורי קרוסלה */}
          <div className="flex justify-center mt-6 space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategoriesUnified;
