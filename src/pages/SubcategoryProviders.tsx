
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, User, Star, MapPin, ChevronLeft, CheckCircle } from "lucide-react";
import { useUnifiedEventContext } from "@/context/UnifiedEventContext";

const SubcategoryProviders = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const navigate = useNavigate();
  const { hebrewCategories, providers, isLoading } = useUnifiedEventContext();
  
  const [category, setCategory] = useState<any>(null);
  const [subcategory, setSubcategory] = useState<any>(null);
  const [subcategoryProviders, setSubcategoryProviders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('SubcategoryId from URL:', subcategoryId);
    
    if (!subcategoryId) {
      setError("לא סופק מזהה תת קטגוריה");
      return;
    }

    // מציאת תת הקטגוריה והקטגוריה הראשית
    let foundCategory = null;
    let foundSubcategory = null;
    
    for (const cat of hebrewCategories) {
      const sub = cat.subcategories?.find(s => s.id === subcategoryId);
      if (sub) {
        foundCategory = cat;
        foundSubcategory = sub;
        break;
      }
    }
    
    if (foundCategory && foundSubcategory) {
      console.log('Found subcategory:', foundSubcategory.name, 'in category:', foundCategory.name);
      setCategory(foundCategory);
      setSubcategory(foundSubcategory);
      setError(null);
      
      // סינון ספקים לפי תת הקטגוריה
      const filteredProviders = providers.filter(provider => 
        provider.subcategoryIds?.includes(subcategoryId) || 
        provider.categories?.includes(foundSubcategory.name)
      );
      
      console.log('Found providers for subcategory:', filteredProviders.length);
      setSubcategoryProviders(filteredProviders);
    } else {
      console.log('Subcategory not found for ID:', subcategoryId);
      setError(`תת קטגוריה עם מזהה "${subcategoryId}" לא נמצאה`);
    }
  }, [subcategoryId, hebrewCategories, providers]);

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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center" dir="rtl">
            <h2 className="text-2xl font-bold mb-4">שגיאה בטעינת הספקים</h2>
            <p className="mb-6 text-gray-600">{error}</p>
            <div className="space-x-4">
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה
              </Button>
              <Button onClick={() => navigate("/categories")}>
                חזרה לקטגוריות
              </Button>
            </div>
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
        <div className="container px-4 py-6">
          {/* ניווט נתיב */}
          <nav className="flex items-center space-x-2 mb-6" dir="rtl">
            <Link to="/categories" className="text-gray-500 hover:text-brand-600 transition-colors">
              קטגוריות
            </Link>
            <ChevronLeft className="h-4 w-4 text-gray-400" />
            {category && (
              <>
                <Link 
                  to={`/search/subcategories?categoryId=${category.id}`} 
                  className="text-gray-500 hover:text-brand-600 transition-colors"
                >
                  {category.name}
                </Link>
                <ChevronLeft className="h-4 w-4 text-gray-400" />
              </>
            )}
            <span className="text-brand-600 font-medium">
              {subcategory?.name || 'ספקים'}
            </span>
          </nav>

          {/* כותרת תת הקטגוריה */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              ספקים בתחום {subcategory?.name}
            </h1>
            {subcategory?.description && (
              <p className="text-gray-600 mb-4">
                {subcategory.description}
              </p>
            )}
            <Badge variant="outline">
              {subcategoryProviders.length} ספקים זמינים
            </Badge>
          </div>

          {/* רשימת ספקים */}
          {subcategoryProviders.length === 0 ? (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                אין ספקים זמינים
              </h3>
              <p className="text-gray-500 mb-6">
                לא נמצאו ספקים עבור תת קטגוריה זו כרגע.
              </p>
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcategoryProviders.map((provider) => (
                <Link
                  key={provider.id}
                  to={`/provider/${provider.id}`}
                  className="group block"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-start mb-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                          {provider.logo ? (
                            <img 
                              src={provider.logo} 
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
                              {provider.name || provider.businessName}
                            </h3>
                            {provider.verified && (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="mr-1 text-sm font-medium">
                              {provider.rating?.toFixed(1) || '4.5'}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({provider.reviewCount || 0} ביקורות)
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
                          <span className="text-gray-500">
                            {provider.services?.length || 0} שירותים
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <span className="text-brand-600 font-medium text-sm group-hover:underline">
                          צפה בפרופיל ובשירותים ←
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
