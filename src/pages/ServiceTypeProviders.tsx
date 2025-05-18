
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home, ChevronRight, Star } from "lucide-react";
import { useEventContext } from "@/context/EventContext";

const ServiceTypeProviders = () => {
  const { serviceTypeId } = useParams<{ serviceTypeId: string }>();
  const {
    serviceTypes,
    selectedCategory,
    selectedSubcategory,
    selectedServiceType,
    setSelectedServiceType,
    getProvidersByServiceType,
    isLoading,
    error
  } = useEventContext();

  useEffect(() => {
    if (serviceTypeId && serviceTypes.length > 0) {
      const serviceType = serviceTypes.find((s) => s.id === serviceTypeId);
      setSelectedServiceType(serviceType || null);
    }
  }, [serviceTypeId, serviceTypes, setSelectedServiceType]);

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
                <Skeleton key={i} className="h-64 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !selectedServiceType) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container px-4 py-16 flex-grow">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">סוג שירות לא נמצא</h1>
            <p className="text-gray-600 mb-6">מצטערים, סוג השירות שחיפשת אינו קיים.</p>
            <Button asChild>
              <Link to="/categories">חזרה לקטגוריות</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const providers = getProvidersByServiceType(serviceTypeId as string);

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
            {selectedSubcategory && (
              <>
                <ChevronLeft className="h-3 w-3 mx-1" />
                <Link to={`/subcategories/${selectedSubcategory.id}`} className="hover:text-brand-600">
                  {selectedSubcategory.name}
                </Link>
              </>
            )}
            <ChevronLeft className="h-3 w-3 mx-1" />
            <span className="text-gray-900 font-medium">{selectedServiceType.name}</span>
          </nav>

          {/* כותרת */}
          <div className="max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl font-bold mb-2">{selectedServiceType.name}</h1>
            <p className="text-gray-600">{selectedServiceType.description}</p>
          </div>

          {/* ספקים */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-6">ספקי שירות מובילים:</h2>
            
            {providers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map((provider) => (
                  <Link
                    key={provider.id}
                    to={`/providers/${provider.id}`}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
                      <div className="aspect-video bg-gray-100 flex items-center justify-center">
                        {provider.logo_url ? (
                          <img
                            src={provider.logo_url}
                            alt={provider.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">אין תמונה</span>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium group-hover:text-brand-600 transition-colors mb-1">
                          {provider.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                          {provider.description}
                        </p>
                        
                        {provider.rating && (
                          <div className="flex items-center mb-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                            <span className="text-sm font-medium">{provider.rating.toFixed(1)}</span>
                            {provider.review_count && (
                              <span className="text-xs text-gray-500 mr-1">
                                ({provider.review_count} ביקורות)
                              </span>
                            )}
                          </div>
                        )}
                        
                        {provider.is_verified && (
                          <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            מאומת ✓
                          </div>
                        )}
                        
                        <div className="mt-3 flex justify-end">
                          <span className="text-xs text-brand-600 font-medium">
                            לצפייה בשירותים
                            <ChevronRight className="inline h-4 w-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">לא נמצאו ספקים לסוג שירות זה</p>
                <Button asChild variant="link" className="mt-2">
                  <Link to="/categories">חזרה לקטגוריות</Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* CTA */}
          <div className="text-center py-8 bg-brand-50 rounded-lg mt-10">
            <h3 className="text-xl font-bold mb-2">מעוניינים להציע שירותים מסוג זה?</h3>
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

export default ServiceTypeProviders;
