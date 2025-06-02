
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Layers, AlertCircle } from "lucide-react";
import { useUnifiedEventContext } from "@/context/UnifiedEventContext";
import SubcategoryGrid from "@/components/search/SubcategoryGrid";
import AdvancedBreadcrumbs from "@/components/navigation/AdvancedBreadcrumbs";

const SearchSubcategories = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { hebrewCategories, isLoading } = useUnifiedEventContext();
  
  const [category, setCategory] = useState<any>(null);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const categoryId = searchParams.get('categoryId');

  useEffect(() => {
    console.log('🔍 === SearchSubcategories Debug Info ===');
    console.log('📍 CategoryId from URL:', categoryId);
    console.log('📚 Available Hebrew Categories:', hebrewCategories);
    console.log('📊 Hebrew Categories length:', hebrewCategories?.length);
    console.log('🏷️ Category IDs in system:', hebrewCategories?.map(cat => cat.id));
    
    if (!categoryId) {
      console.error('❌ No categoryId provided in URL');
      setError("לא סופק מזהה קטגוריה");
      return;
    }

    if (!hebrewCategories || hebrewCategories.length === 0) {
      console.warn('⏳ No hebrew categories available yet - waiting for context to load');
      return;
    }

    // מציאת הקטגוריה בהיררכיה העברית
    console.log('🔎 Searching for category with ID:', categoryId);
    const foundCategory = hebrewCategories.find(cat => {
      console.log(`  Checking: "${cat.id}" === "${categoryId}" ? ${cat.id === categoryId}`);
      return cat.id === categoryId;
    });
    
    if (foundCategory) {
      console.log('✅ Found category:', foundCategory.name);
      console.log('📋 Category subcategories:', foundCategory.subcategories);
      console.log('🔢 Number of subcategories:', foundCategory.subcategories?.length || 0);
      setCategory(foundCategory);
      setError(null);
      
      // הכנת תתי קטגוריות עם parentCategoryId
      const categorySubcategories = foundCategory.subcategories?.map(sub => ({
        ...sub,
        parentCategoryId: categoryId
      })) || [];
      
      console.log('📝 Subcategories prepared for display:', categorySubcategories.length);
      setSubcategories(categorySubcategories);
    } else {
      console.error('❌ Category not found for ID:', categoryId);
      console.error('📋 Available category IDs:', hebrewCategories.map(cat => cat.id));
      console.error('🔍 Exact comparison results:');
      hebrewCategories.forEach(cat => {
        console.error(`  "${cat.id}" (type: ${typeof cat.id}) vs "${categoryId}" (type: ${typeof categoryId})`);
        console.error(`  Length: ${cat.id.length} vs ${categoryId.length}`);
        console.error(`  Equals: ${cat.id === categoryId}`);
      });
      setError(`קטגוריה עם מזהה "${categoryId}" לא נמצאה`);
    }
  }, [categoryId, hebrewCategories]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <AdvancedBreadcrumbs />
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
        <AdvancedBreadcrumbs />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center" dir="rtl">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">שגיאה בטעינת תתי הקטגוריות</h2>
            <p className="mb-6 text-gray-600">{error}</p>
            
            {/* Debug information */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm">
              <h3 className="font-bold mb-2">מידע טכני לפתרון הבעיה:</h3>
              <div className="text-right space-y-1">
                <div><strong>Category ID מה-URL:</strong> "{categoryId}"</div>
                <div><strong>מספר קטגוריות זמינות:</strong> {hebrewCategories?.length || 0}</div>
                <div><strong>Context טעון:</strong> {hebrewCategories ? 'כן' : 'לא'}</div>
                {hebrewCategories && hebrewCategories.length > 0 && (
                  <div>
                    <strong>רשימת IDs זמינים:</strong>
                    <div className="mt-1 text-xs font-mono bg-gray-100 p-2 rounded">
                      {hebrewCategories.map(cat => (
                        <div key={cat.id}>"{cat.id}" - {cat.name}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-x-4">
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה
              </Button>
              <Button onClick={() => navigate("/")}>
                חזרה לדף הבית
              </Button>
              <Button onClick={() => navigate("/admin/hierarchy")} variant="outline">
                דף ניהול היררכיה
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
        <AdvancedBreadcrumbs />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center" dir="rtl">
            <Layers className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">הקטגוריה לא נמצאה</h2>
            <p className="mb-6">לא הצלחנו למצוא את הקטגוריה המבוקשת.</p>
            <Button onClick={() => navigate("/")}>
              חזרה לדף הבית
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
      <AdvancedBreadcrumbs />
      <main className="flex-grow">
        <div className="container px-4 py-6">
          {/* כותרת הקטגוריה */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            {category.description && (
              <p className="text-gray-600 mb-4">
                {category.description}
              </p>
            )}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {subcategories.length} תתי קטגוריות זמינות
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה לדף הבית
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/admin/hierarchy')}
              >
                דף ניהול היררכיה
              </Button>
            </div>
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
