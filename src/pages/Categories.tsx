
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUnifiedEventContext } from "@/context/UnifiedEventContext";
import CategoryNavigationGrid from "@/components/search/CategoryNavigationGrid";

const Categories = () => {
  const { 
    isLoading, 
    error, 
    hebrewCategories,
  } = useUnifiedEventContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // מצב של טעינה
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-6">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !hebrewCategories || hebrewCategories.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-xl font-bold mb-4">שגיאה בטעינת הקטגוריות</h1>
            <p className="mb-6">{error || "לא נמצאו קטגוריות במערכת"}</p>
            <Button asChild size="sm">
              <Link to="/">חזרה לדף הבית</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow" dir="rtl">
        <div className="container mx-auto px-4 py-6">
          {/* כותרת */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">קטגוריות שירותים</h1>
            <p className="text-gray-600">בחר קטגוריה לצפייה בתתי הקטגוריות</p>
          </div>

          {/* קטגוריות עיקריות */}
          <div className="mb-8">
            <CategoryNavigationGrid categories={hebrewCategories} />
          </div>

          {/* CTA */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-600 mb-4">
              ספק שירותים? הצטרף למערכת והגע ללקוחות חדשים
            </p>
            <Button asChild>
              <Link to="/provider-onboarding">הצטרפות כספק</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
