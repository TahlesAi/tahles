
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, User, Star, MapPin, ChevronLeft, CheckCircle } from "lucide-react";
import { useEventContext } from "@/context/EventContext";

const SubcategoryProviders = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const navigate = useNavigate();
  const { 
    getProvidersBySubcategory,
    getServicesByProvider,
    isLoading,
    hebrewCategories
  } = useEventContext();
  
  const [subcategory, setSubcategory] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [subcategoryProviders, setSubcategoryProviders] = useState<any[]>([]);

  useEffect(() => {
    if (!subcategoryId) return;
    
    console.log('Viewing subcategory with ID:', subcategoryId);
    
    // חיפוש תת הקטגוריה בהיררכיה העברית
    let foundSubcategory = null;
    let foundCategory = null;
    
    for (const cat of hebrewCategories) {
      const sub = cat.subcategories?.find(s => s.id === subcategoryId);
      if (sub) {
        foundSubcategory = sub;
        foundCategory = cat;
        break;
      }
    }
    
    if (foundSubcategory && foundCategory) {
      console.log('Found Hebrew subcategory:', foundSubcategory.name);
      setSubcategory(foundSubcategory);
      setCategory(foundCategory);
      
      // מציאת הספקים
      const providers = getProvidersBySubcategory(subcategoryId);
      console.log('Found providers:', providers.length);
      
      // עדכון הספקים עם מידע על מספר שירותים
      const enrichedProviders = providers.map(provider => {
        const providerServices = getServicesByProvider(provider.id);
        
        return {
          ...provider,
          servicesCount: providerServices.length,
          averagePrice: providerServices.length > 0 
            ? Math.round(providerServices.reduce((sum, service) => sum + (service.price || 0), 0) / providerServices.length)
            : 0
        };
      });
      
      setSubcategoryProviders(enrichedProviders);
    } else {
      console.log('Subcategory not found in Hebrew hierarchy');
    }
  }, [subcategoryId, hebrewCategories, getProvidersBySubcategory, getServicesByProvider]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">טוען ספקים...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!subcategory) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">תת הקטגוריה לא נמצאה</h2>
            <p className="mb-6">לא הצלחנו למצוא את תת הקטגוריה המבוקשת.</p>
            <Button onClick={() => navigate(-1)}>
              <ArrowRight className="h-4 w-4 ml-2" />
              חזרה
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      <main className="flex-grow">
        <div className="container px-4 py-8">
          {/* ניווט נתיב */}
          <nav className="flex items-center space-x-2 mb-8" dir="rtl">
            <Link to="/" className="text-gray-500 hover:text-brand-600 transition-colors">
              דף הבית
            </Link>
            <ChevronLeft className="h-4 w-4 text-gray-400" />
            <Link to="/categories" className="text-gray-500 hover:text-brand-600 transition-colors">
              קטגוריות
            </Link>
            <ChevronLeft className="h-4 w-4 text-gray-400" />
            {category && (
              <>
                <Link 
                  to={`/categories/${category.id}`} 
                  className="text-gray-500 hover:text-brand-600 transition-colors"
                >
                  {category.name}
                </Link>
                <ChevronLeft className="h-4 w-4 text-gray-400" />
              </>
            )}
            <span className="text-brand-600 font-medium">{subcategory.name}</span>
          </nav>

          {/* כותרת תת הקטגוריה */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">{subcategory.name}</h1>
            {subcategory.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {subcategory.description}
              </p>
            )}
            <div className="mt-6">
              <Badge variant="outline" className="text-base px-4 py-2">
                {subcategoryProviders.length} ספקים זמינים
              </Badge>
            </div>
          </div>

          {/* רשימת ספקים */}
          {subcategoryProviders.length === 0 ? (
            <div className="text-center py-16">
              <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                אין ספקים זמינים
              </h3>
              <p className="text-gray-500 mb-6">
                לא נמצאו ספקים עבור תת קטגוריה זו כרגע.
              </p>
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה לתתי קטגוריות
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcategoryProviders.map((provider) => (
                <Link
                  key={provider.id}
                  to={`/enhanced-providers/${provider.id}`}
                  className="group block"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-start mb-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                          {provider.logo_url ? (
                            <img 
                              src={provider.logo_url} 
                              alt={provider.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-brand-100">
                              <User className="h-8 w-8 text-brand-600" />
                            </div>
                          )}
                        </div>
                        <div className="mr-4 flex-grow">
                          <div className="flex items-center">
                            <h3 className="text-lg font-semibold group-hover:text-brand-600 transition-colors">
                              {provider.name}
                            </h3>
                            {provider.is_verified && (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="mr-1 text-sm font-medium">
                              {provider.rating?.toFixed(1) || '4.5'}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({provider.review_count || 0} ביקורות)
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {provider.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {provider.description}
                        </p>
                      )}
                      
                      <div className="space-y-2">
                        {provider.city && (
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 ml-1" />
                            <span>{provider.city}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">{provider.servicesCount} שירותים</span>
                          {provider.averagePrice > 0 && (
                            <span className="text-brand-600 font-medium">
                              מ-₪{provider.averagePrice}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <span className="text-brand-600 font-medium text-sm group-hover:underline">
                          צפה בפרופיל ←
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubcategoryProviders;
