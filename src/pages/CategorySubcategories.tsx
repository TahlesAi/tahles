
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Layers, ChevronLeft, AlertCircle } from "lucide-react";
import { useEventContext } from "@/context/EventContext";
import { validateCategoryId, mapCategoryId } from "@/lib/hebrewHierarchyMapping";

const CategorySubcategories = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { 
    providers,
    services,
    getProvidersBySubcategory,
    getServicesBySubcategory,
    isLoading,
    hebrewCategories,
    error
  } = useEventContext();
  
  const [category, setCategory] = useState<any>(null);
  const [categorySubcategories, setCategorySubcategories] = useState<any[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) {
      setValidationError("ID קטגוריה לא סופק");
      return;
    }
    
    console.log('Viewing category with ID:', categoryId);
    
    // בדיקת תקינות ID
    if (!validateCategoryId(categoryId)) {
      console.warn('Invalid category ID:', categoryId);
      setValidationError(`קטגוריה עם ID "${categoryId}" לא קיימת במערכת`);
      return;
    }
    
    // מיפוי ID במקרה שצריך
    const mappedCategoryId = mapCategoryId(categoryId);
    
    // מציאת הקטגוריה בהיררכיה העברית
    const foundCategory = hebrewCategories.find(cat => cat.id === mappedCategoryId);
    
    if (foundCategory) {
      console.log('Found Hebrew category:', foundCategory.name);
      setCategory(foundCategory);
      setValidationError(null);
      
      // מציאת תתי הקטגוריות מההיררכיה העברית
      const subs = foundCategory.subcategories || [];
      console.log('Found subcategories:', subs.length);
      
      // עדכון תתי הקטגוריות עם מידע על מספר ספקים ושירותים
      const enrichedSubs = subs.map(sub => {
        const subProviders = getProvidersBySubcategory(sub.id);
        const subServices = getServicesBySubcategory(services, sub.id);
        
        return {
          ...sub,
          providersCount: subProviders.length,
          servicesCount: subServices.length
        };
      });
      
      setCategorySubcategories(enrichedSubs);
    } else {
      console.log('Category not found in Hebrew hierarchy');
      setValidationError(`קטגוריה "${categoryId}" לא נמצאה`);
    }
  }, [categoryId, hebrewCategories, providers, services, getProvidersBySubcategory, getServicesBySubcategory]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container px-4 py-8">
            <nav className="flex items-center space-x-2 mb-8" dir="rtl">
              <Skeleton className="h-4 w-16" />
              <ChevronLeft className="h-4 w-4 text-gray-400" />
              <Skeleton className="h-4 w-20" />
              <ChevronLeft className="h-4 w-4 text-gray-400" />
              <Skeleton className="h-4 w-24" />
            </nav>
            
            <div className="mb-12 text-center">
              <Skeleton className="h-10 w-64 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto mb-6" />
              <Skeleton className="h-8 w-32 mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || validationError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center" dir="rtl">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">שגיאה בטעינת הקטגוריה</h2>
            <p className="mb-6 text-gray-600">{validationError || error}</p>
            <div className="space-x-4">
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה
              </Button>
              <Button onClick={() => navigate("/")} >
                חזרה לדף הבית
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Category not found
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center" dir="rtl">
            <Layers className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">הקטגוריה לא נמצאה</h2>
            <p className="mb-6">לא הצלחנו למצוא את הקטגוריה המבוקשת.</p>
            <div className="space-x-4">
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה
              </Button>
              <Button onClick={() => navigate("/categories")}>
                צפה בכל הקטגוריות
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
            <span className="text-brand-600 font-medium">{category.name}</span>
          </nav>

          {/* כותרת הקטגוריה */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
            {category.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {category.description}
              </p>
            )}
            <div className="mt-6">
              <Badge variant="outline" className="text-base px-4 py-2">
                {categorySubcategories.length} תתי קטגוריות זמינות
              </Badge>
            </div>
          </div>

          {/* רשימת תתי קטגוריות */}
          {categorySubcategories.length === 0 ? (
            <div className="text-center py-16">
              <Layers className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                אין תתי קטגוריות זמינות
              </h3>
              <p className="text-gray-500 mb-6">
                לא נמצאו תתי קטגוריות עבור קטגוריה זו כרגע.
              </p>
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה לקטגוריות
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categorySubcategories.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  to={`/subcategories/${subcategory.id}`}
                  className="group block"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center group-hover:bg-brand-200 transition-colors mb-3">
                          <Layers className="h-6 w-6 text-brand-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-600 transition-colors">
                          {subcategory.name}
                        </h3>
                        {subcategory.description && (
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {subcategory.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                        <span>{subcategory.providersCount} ספקים</span>
                        <span>{subcategory.servicesCount} שירותים</span>
                      </div>
                      
                      <div className="mt-4">
                        <span className="text-brand-600 font-medium text-sm group-hover:underline">
                          צפה בספקים ←
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

export default CategorySubcategories;
