
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home, ChevronRight } from "lucide-react";
import { useEventContext } from "@/context/EventContext";

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
        <div className="container px-4 py-8 flex-grow">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-6 w-full mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-lg" />
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
        <div className="container px-4 py-8">
          {/* פירורי לחם */}
          <nav className="flex mb-6 text-sm items-center text-gray-500">
            <Link to="/" className="hover:text-brand-600">
              <Home className="h-4 w-4 ml-1" />
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

          {/* כותרת */}
          <div className="max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl font-bold mb-2">{selectedSubcategory.name}</h1>
            <p className="text-gray-600">{selectedSubcategory.description}</p>
          </div>

          {/* סוגי שירות */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-6">סוגי שירות זמינים:</h2>
            
            {subcategoryServiceTypes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {subcategoryServiceTypes.map((serviceType) => (
                  <Link
                    key={serviceType.id}
                    to={`/service-types/${serviceType.id}`}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center p-4">
                          <div className="ml-3 p-2 bg-brand-50 rounded-md">
                            {serviceType.icon && (
                              <div className="h-5 w-5 text-brand-600">{serviceType.icon}</div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium group-hover:text-brand-600 transition-colors">
                              {serviceType.name}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2">
                              {serviceType.description}
                            </p>
                          </div>
                          <div className="mr-auto">
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-brand-600 transition-colors" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">לא נמצאו סוגי שירות בתת-קטגוריה זו</p>
                <Button asChild variant="link" className="mt-2">
                  <Link to="/categories">חזרה לקטגוריות</Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* CTA */}
          <div className="text-center py-8 bg-brand-50 rounded-lg mt-10">
            <h3 className="text-xl font-bold mb-2">מעוניינים להציע שירותים בתת-קטגוריה זו?</h3>
            <p className="text-gray-600 mb-4">הצטרפו כספק ופרסמו את השירותים שלכם</p>
            <Button asChild>
              <Link to="/provider-onboarding">הצטרפו כספק</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubcategoryServiceTypes;
