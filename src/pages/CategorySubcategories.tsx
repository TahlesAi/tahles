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
import { designSystem } from "@/lib/designSystem";

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

  // Loading state - קומפקטי
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container px-4 py-4">
            <nav className="flex items-center space-x-2 mb-4" dir="rtl">
              <Skeleton className="h-3 w-12" />
              <ChevronLeft className="h-3 w-3 text-gray-400" />
              <Skeleton className="h-3 w-16" />
            </nav>
            
            <div className="mb-6">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64 mb-2" />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="h-20" />
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
        <div className="container px-4 py-4">
          {/* ניווט נתיב - קומפקטי */}
          <nav className="flex items-center space-x-2 mb-4" dir="rtl">
            <Link to="/" className="text-gray-500 hover:text-brand-600 transition-colors text-xs">
              דף הבית
            </Link>
            <ChevronLeft className="h-3 w-3 text-gray-400" />
            <Link to="/categories" className="text-gray-500 hover:text-brand-600 transition-colors text-xs">
              קטגוריות
            </Link>
            <ChevronLeft className="h-3 w-3 text-gray-400" />
            <span className="text-brand-600 font-medium text-xs">{category.name}</span>
          </nav>

          {/* כותרת הקטגוריה - קומפקטית */}
          <div className="mb-6">
            <h1 className={`${designSystem.typography.title} mb-1`}>{category.name}</h1>
            {category.description && (
              <p className="text-sm text-gray-600 mb-2">
                {category.description}
              </p>
            )}
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              {categorySubcategories.length} תתי קטגוריות
            </Badge>
          </div>

          {/* רשימת תתי קטגוריות - צפופה מאוד */}
          {categorySubcategories.length === 0 ? (
            <div className="text-center py-8">
              <Layers className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                אין תתי קטגוריות זמינות
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                לא נמצאו תתי קטגוריות עבור קטגוריה זו כרגע.
              </p>
              <Button onClick={() => navigate(-1)} variant="outline" size="sm">
                <ArrowRight className="h-3 w-3 ml-1" />
                חזרה
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
              {categorySubcategories.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  to={`/subcategories/${subcategory.id}`}
                  className="group block"
                >
                  <Card className="h-full hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="p-2.5">
                      <div className="w-8 h-8 bg-brand-100 rounded-md flex items-center justify-center group-hover:bg-brand-200 transition-colors mb-2 mx-auto">
                        <Layers className="h-4 w-4 text-brand-600" />
                      </div>
                      <h3 className="text-xs font-medium mb-1 text-center line-clamp-2 leading-tight group-hover:text-brand-600 transition-colors">
                        {subcategory.name}
                      </h3>
                      
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                        <span>{subcategory.providersCount}</span>
                        <span>{subcategory.servicesCount}</span>
                      </div>
                      
                      <div className="text-center">
                        <span className="text-brand-600 font-medium text-xs group-hover:underline">
                          צפה ←
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
