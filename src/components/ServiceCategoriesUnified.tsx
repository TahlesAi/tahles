
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useEventContext } from "@/context/EventContext";
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

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50" dir="rtl">
        <div className="container px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
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

  return (
    <section className="py-16 bg-gray-50" dir="rtl">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">קטגוריות שירותים</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            בחר מתוך מגוון רחב של קטגוריות כדי למצוא את השירות המושלם לאירוע שלך
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hebrewCategories.map((category) => {
            const Icon = iconMapping[category.icon || "MapPin"];
            const subcategoryCount = category.subcategories ? category.subcategories.length : 0;
            
            return (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="group block"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center group-hover:bg-brand-200 transition-colors">
                        {Icon && <Icon className="h-8 w-8 text-brand-600" />}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-600 transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-gray-500 leading-relaxed mb-4">
                        {category.description}
                      </p>
                    )}
                    <div className="mt-4 text-sm text-brand-600 font-medium">
                      {subcategoryCount} תתי קטגוריות
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategoriesUnified;
