
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, User, AlertCircle } from "lucide-react";
import { useProviderData } from '@/hooks/useProviderData';
import ProviderCard from '@/components/provider/ProviderCard';
import AdvancedBreadcrumbs from "@/components/navigation/AdvancedBreadcrumbs";
import { SearchResultsSkeleton } from '@/components/loading/AdvancedSkeletonLoader';

const SubcategoryProviders = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const navigate = useNavigate();
  const { providers, services, loading, error, getProvidersBySubcategory } = useProviderData();
  
  const [subcategoryName, setSubcategoryName] = useState<string>('');
  const [subcategoryProviders, setSubcategoryProviders] = useState<any[]>([]);

  useEffect(() => {
    if (!subcategoryId || loading) return;

    console.log('Loading providers for subcategory:', subcategoryId);
    
    // מציאת ספקים לתת הקטגוריה
    const foundProviders = getProvidersBySubcategory(subcategoryId);
    console.log('Found providers:', foundProviders);
    
    setSubcategoryProviders(foundProviders);
    
    // קביעת שם תת הקטגוריה
    if (subcategoryId === 'אמני חושים' || subcategoryId === 'mind-artists') {
      setSubcategoryName('אמני חושים');
    } else {
      setSubcategoryName(subcategoryId);
    }
  }, [subcategoryId, providers, services, loading, getProvidersBySubcategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <AdvancedBreadcrumbs />
        <main className="flex-grow">
          <div className="container px-4 py-8">
            <SearchResultsSkeleton />
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
            <h2 className="text-2xl font-bold mb-4">שגיאה בטעינת הספקים</h2>
            <p className="mb-6 text-gray-600">{error}</p>
            <div className="space-x-4">
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה
              </Button>
              <Button onClick={() => navigate("/")}>
                חזרה לדף הבית
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
      <AdvancedBreadcrumbs />
      <main className="flex-grow">
        <div className="container px-4 py-6">
          {/* כותרת תת הקטגוריה */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              ספקים בתחום {subcategoryName}
            </h1>
            <div className="flex items-center gap-4">
              <Badge variant="outline">
                {subcategoryProviders.length} ספקים זמינים
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(-1)}
              >
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה לתתי הקטגוריות
              </Button>
            </div>
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
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  showServices={true}
                />
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
