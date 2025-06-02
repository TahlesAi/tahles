
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Layers, ChevronLeft, AlertCircle } from "lucide-react";
import { useUnifiedEventContext } from "@/context/UnifiedEventContext";
import SubcategoryGrid from "@/components/search/SubcategoryGrid";

const SearchSubcategories = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { hebrewCategories, isLoading } = useUnifiedEventContext();
  
  const [category, setCategory] = useState<any>(null);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const categoryId = searchParams.get('categoryId');

  useEffect(() => {
    console.log('CategoryId from URL:', categoryId);
    
    if (!categoryId) {
      setError("לא סופק מזהה קטגוריה");
      return;
    }

    // מציאת הקטגוריה בהיררכיה העברית
    const foundCategory = hebrewCategories.find(cat => cat.id === categoryId);
    
    if (foundCategory) {
      console.log('Found category:', foundCategory.name);
      setCategory(foundCategory);
      setError(null);
      
      // הכנת תתי קטגוריות עם parentCategoryId
      const categorySubcategories = foundCategory.subcategories?.map(sub => ({
        ...sub,
        parentCategoryId: categoryId
      })) || [];
      
      console.log('Subcategories loaded:', categorySubcategories.length);
      setSubcategories(categorySubcategories);
    } else {
      console.log('Category not found for ID:', categoryId);
      setError(`קטגוריה עם מזהה "${categoryId}" לא נמצאה`);
    }
  }, [categoryId, hebrewCategories]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container px-4 py-6">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
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
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">שגיאה בטעינת תתי הקטגוריות</h2>
            <p className="mb-6 text-gray-600">{error}</p>
            <div className="space-x-4">
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה
              </Button>
              <Button onClick={() => navigate("/search")}>
                חזרה לחיפוש
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center" dir="rtl">
            <Layers className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">הקטגוריה לא נמצאה</h2>
            <p className="mb-6">לא הצלחנו למצוא את הקטגוריה המבוקשת.</p>
            <Button onClick={() => navigate("/search")}>
              חזרה לחיפוש
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
        <div className="container px-4 py-6">
          {/* ניווט נתיב */}
          <nav className="flex items-center space-x-2 mb-6" dir="rtl">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/search")}
              className="text-gray-500 hover:text-brand-600"
            >
              חיפוש
            </Button>
            <ChevronLeft className="h-4 w-4 text-gray-400" />
            <span className="text-brand-600 font-medium">{category.name}</span>
          </nav>

          {/* כותרת הקטגוריה */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            {category.description && (
              <p className="text-gray-600 mb-4">
                {category.description}
              </p>
            )}
            <Badge variant="outline">
              {subcategories.length} תתי קטגוריות
            </Badge>
          </div>

          {/* תתי קטגוריות */}
          {subcategories.length === 0 ? (
            <div className="text-center py-12">
              <Layers className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                אין תתי קטגוריות זמינות
              </h3>
              <p className="text-gray-500 mb-6">
                לא נמצאו תתי קטגוריות עבור קטגוריה זו כרגע.
              </p>
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה
              </Button>
            </div>
          ) : (
            <SubcategoryGrid categories={subcategories} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchSubcategories;
