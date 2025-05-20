import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useEventContext } from "@/context/EventContext";
import { toast } from "sonner";
import { Loader2, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

interface OnboardingStep2Props {
  data: {
    category: string;
    subcategory: string;
  };
  onUpdate: (data: Partial<{subcategory: string}>) => void;
  onNext: () => void;
  onBack: () => void;
  adminMode?: boolean;
}

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
  icon?: string;
  image_url?: string;
  description?: string;
}

const OnboardingStep2: React.FC<OnboardingStep2Props> = ({ 
  data, 
  onUpdate, 
  onNext, 
  onBack,
  adminMode = false
}) => {
  const [loading, setLoading] = useState(true);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [error, setError] = useState("");
  const { 
    subcategories: contextSubcategories,
    getSubcategoriesByCategory,
    isLoading: contextLoading,
    categories
  } = useEventContext();
  
  const selectedCategory = categories.find(c => c.id === data.category);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        setLoading(true);
        setError("");
        
        // If we have no category selected and not in admin mode, show error
        if (!data.category && !adminMode) {
          setError("לא נבחרה קטגוריה. יש לחזור אחורה ולבחור קטגוריה");
          setLoading(false);
          return;
        }
        
        // If we have subcategories from context, use those
        if (contextSubcategories && contextSubcategories.length > 0) {
          const filteredSubcategories = data.category ? 
            getSubcategoriesByCategory(data.category) : 
            contextSubcategories;
          
          setSubcategories(filteredSubcategories);
          setLoading(false);
          return;
        }
        
        // Otherwise fetch from database
        const query = supabase
          .from('subcategories')
          .select('*')
          .order('name');
          
        // Add filter if category is selected
        if (data.category) {
          query.eq('category_id', data.category);
        }
        
        const { data: subcategoriesData, error: subcategoriesError } = await query;
          
        if (subcategoriesError) throw subcategoriesError;
        
        setSubcategories(subcategoriesData || []);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setError("שגיאה בטעינת תתי-הקטגוריות, אנא נסה שוב מאוחר יותר");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubcategories();
  }, [data.category, contextSubcategories, contextLoading, getSubcategoriesByCategory]);

  const handleSelectSubcategory = (subcategoryId: string) => {
    onUpdate({ subcategory: subcategoryId });
  };
  
  const handleNext = () => {
    if (!data.subcategory && !adminMode) {
      toast.error("יש לבחור תת-קטגוריה כדי להמשיך");
      setError("יש לבחור תת-קטגוריה כדי להמשיך");
      return;
    }
    
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto" dir="rtl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">בחירת תת-קטגוריה</h2>
        <p className="text-gray-600">
          בחר/י את תת-הקטגוריה המתאימה ביותר לשירותים שלך
          {selectedCategory && ` בקטגוריית ${selectedCategory.name}`}
        </p>
      </div>
      
      {adminMode && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <p className="font-medium">מצב מנהל מופעל</p>
          </div>
          <p>ניתן לדלג על בחירת תת-קטגוריה לצורך בדיקת התהליך</p>
        </div>
      )}
      
      {error && !adminMode && (
        <div className="bg-red-50 text-red-800 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {subcategories.length > 0 ? (
            subcategories.map((subcategory) => (
              <Card 
                key={subcategory.id}
                className={`cursor-pointer transition-all hover:border-brand-300 ${
                  data.subcategory === subcategory.id ? "border-2 border-brand-600" : ""
                }`}
                onClick={() => handleSelectSubcategory(subcategory.id)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    {subcategory.icon && <span className="mr-2">{subcategory.icon}</span>}
                    <span>{subcategory.name}</span>
                  </div>
                  {data.subcategory === subcategory.id && (
                    <CheckCircle className="h-5 w-5 text-brand-600" />
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-gray-500">
              לא נמצאו תתי-קטגוריות עבור הקטגוריה שנבחרה
            </div>
          )}
        </div>
      )}
      
      <div className="mt-8 flex justify-between">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center gap-1"
        >
          <ArrowRight className="h-4 w-4" />
          חזרה
        </Button>
        <Button onClick={handleNext}>
          המשך
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep2;
