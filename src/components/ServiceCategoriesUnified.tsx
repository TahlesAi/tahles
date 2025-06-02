import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2, List } from "lucide-react";
import { useUnifiedEventContext } from "@/context/UnifiedEventContext";
import GuidedSearchButton from "./GuidedSearch/GuidedSearchButton";

const ServiceCategoriesUnified = () => {
  const { hebrewCategories, isLoading } = useUnifiedEventContext();
  const [guidedSearchOpen, setGuidedSearchOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  
  // טיפול במצב טעינה
  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50" dir="rtl">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">הקטגוריות שלנו</h2>
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback במקרה שאין נתונים
  if (!hebrewCategories || hebrewCategories.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50" dir="rtl">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">הקטגוריות שלנו</h2>
            <p className="text-gray-600 mb-8">אנחנו עובדים על הכנת התוכן עבורכם...</p>
            <GuidedSearchButton 
              isOpen={guidedSearchOpen}
              onOpenChange={setGuidedSearchOpen}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
            />
          </div>
        </div>
      </section>
    );
  }

  const categoriesPerPage = 6;
  const totalPages = Math.ceil(hebrewCategories.length / categoriesPerPage);
  const startIndex = currentIndex * categoriesPerPage;
  const currentCategories = hebrewCategories.slice(startIndex, startIndex + categoriesPerPage);

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // ניווט ישיר לתתי קטגוריות - עם debugging מפורט
  const handleCategoryClick = (category: any) => {
    console.log('🚀 Category clicked on homepage:');
    console.log('- Category ID:', category.id);
    console.log('- Category Name:', category.name);
    console.log('- Full Category Object:', category);
    console.log('- Available Hebrew Categories:', hebrewCategories.map(cat => ({ id: cat.id, name: cat.name })));
    
    // וידוא שהקטגוריה קיימת
    const categoryExists = hebrewCategories.find(cat => cat.id === category.id);
    if (!categoryExists) {
      console.error('❌ Category not found in hebrewCategories!');
      return;
    }
    
    console.log('✅ Category found, navigating to subcategories...');
    navigate(`/search/subcategories?categoryId=${category.id}`);
  };

  // ניווט לדף כל הקטגוריות
  const handleShowAllCategories = () => {
    navigate('/categories');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50" dir="rtl">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            מצא את השירות המושלם לאירוע שלך
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            אלפי ספקים מוכשרים ומאומתים ממתינים לך
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <GuidedSearchButton 
              isOpen={guidedSearchOpen}
              onOpenChange={setGuidedSearchOpen}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
            />
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleShowAllCategories}
              className="px-6 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <List className="h-5 w-5 ml-2" />
              כל הקטגוריות
            </Button>
            
            {/* כפתור למעבר לדף ניהול - רק בפיתוח */}
            {process.env.NODE_ENV === 'development' && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/admin/hierarchy')}
                className="px-6 py-4 border-2 border-green-600 text-green-600 hover:bg-green-50"
              >
                דף ניהול היררכיה
              </Button>
            )}
          </div>
          
          {/* הצגת מידע debug */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 text-sm">
              <strong>Debug Info:</strong> 
              {hebrewCategories.length} קטגוריות טעונות מ-UnifiedEventContext
            </div>
          )}
        </div>

        <div className="relative">
          {totalPages > 1 && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm"
                onClick={prevPage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm"
                onClick={nextPage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8">
            {currentCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="group block cursor-pointer"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 border-transparent hover:border-blue-200 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {category.icon || "🎯"}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {category.description}
                      </p>
                    )}
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 group-hover:bg-blue-200">
                      {category.subcategories?.length || 0} תת-קטגוריות
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={i === currentIndex ? "default" : "outline"}
                  size="sm"
                  className="w-3 h-3 p-0 rounded-full"
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategoriesUnified;
