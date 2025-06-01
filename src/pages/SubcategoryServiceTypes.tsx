import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home, ChevronRight } from "lucide-react";
import { useEventContext } from "@/context/EventContext";
import { designSystem } from "@/lib/designSystem";

const SubcategoryServiceTypes = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const {
    subcategories,
    serviceTypes,
    selectedSubcategory,
    selectedCategory,
    setSelectedSubcategory,
    getServiceTypesBySubcategory,
    isLoading,
    error
  } = useEventContext();

  useEffect(() => {
    if (subcategoryId && subcategories.length > 0) {
      const subcategory = subcategories.find((s) => s.id === subcategoryId);
      setSelectedSubcategory(subcategory || null);
    }
  }, [subcategoryId, subcategories, setSelectedSubcategory]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container px-4 py-4 flex-grow">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-4 w-48 mb-3" />
            <Skeleton className="h-4 w-full mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {Array(10).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !selectedSubcategory) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container px-4 py-16 flex-grow">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">תת-קטגוריה לא נמצאה</h1>
            <p className="text-gray-600 mb-6">מצטערים, תת-הקטגוריה שחיפשת אינה קיימת.</p>
            <Button asChild>
              <Link to="/categories">חזרה לקטגוריות</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const subcategoryServiceTypes = getServiceTypesBySubcategory(subcategoryId as string);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow" dir="rtl">
        <div className="container px-4 py-4">
          {/* פירורי לחם - קומפקטי */}
          <nav className="flex mb-4 text-xs items-center text-gray-500">
            <Link to="/" className="hover:text-brand-600">
              <Home className="h-3 w-3 ml-1" />
            </Link>
            <ChevronLeft className="h-3 w-3 mx-1" />
            <Link to="/categories" className="hover:text-brand-600">קטגוריות</Link>
            {selectedCategory && (
              <>
                <ChevronLeft className="h-3 w-3 mx-1" />
                <Link to={`/categories/${selectedCategory.id}`} className="hover:text-brand-600">
                  {selectedCategory.name}
                </Link>
              </>
            )}
            <ChevronLeft className="h-3 w-3 mx-1" />
            <span className="text-gray-900 font-medium">{selectedSubcategory.name}</span>
          </nav>

          {/* כותרת קומפקטית */}
          <div className="mb-5">
            <h1 className={`${designSystem.typography.title} mb-1`}>{selectedSubcategory.name}</h1>
            <p className="text-sm text-gray-600">{selectedSubcategory.description}</p>
          </div>

          {/* סוגי שירות - רשת צפופה */}
          <div className="mb-6">
            <h2 className={`${designSystem.typography.subtitle} mb-3`}>סוגי שירות:</h2>
            
            {subcategoryServiceTypes.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
                {subcategoryServiceTypes.map((serviceType) => (
                  <Link
                    key={serviceType.id}
                    to={`/service-types/${serviceType.id}`}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                      <CardContent className="p-2.5 text-center">
                        <div className="w-8 h-8 bg-brand-50 rounded-md flex items-center justify-center mb-2 mx-auto group-hover:bg-brand-100 transition-colors">
                          {serviceType.icon && (
                            <div className="h-4 w-4 text-brand-600">{serviceType.icon}</div>
                          )}
                        </div>
                        <h3 className="text-xs font-medium group-hover:text-brand-600 transition-colors line-clamp-2 leading-tight">
                          {serviceType.name}
                        </h3>
                        <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-brand-600 transition-colors mx-auto mt-1" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">לא נמצאו סוגי שירות</p>
                <Button asChild variant="link" size="sm">
                  <Link to="/categories">חזרה לקטגוריות</Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* CTA קומפקטי */}
          <div className="text-center py-4 bg-brand-50 rounded-lg">
            <h3 className="text-sm font-medium mb-1">מעוניין להציע שירותים?</h3>
            <p className="text-xs text-gray-600 mb-2">הצטרף כספק</p>
            <Button asChild size="sm">
              <Link to="/provider-onboarding">הצטרפות</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubcategoryServiceTypes;
