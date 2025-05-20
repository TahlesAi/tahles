import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, AlertCircle } from "lucide-react";
import { useEventContext } from "@/context/EventContext";

interface OnboardingStep1Props {
  data: {
    category: string;
  };
  onUpdate: (data: Partial<{category: string}>) => void;
  onNext: () => void;
  adminMode?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon?: string;
  image_url?: string;
  description?: string;
}

const OnboardingStep1: React.FC<OnboardingStep1Props> = ({ 
  data, 
  onUpdate, 
  onNext,
  adminMode = false 
}) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const { categories: contextCategories, isLoading: contextLoading } = useEventContext();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        
        // If we have categories from context, use those
        if (contextCategories && contextCategories.length > 0) {
          setCategories(contextCategories);
          setLoading(false);
          return;
        }
        
        // Otherwise fetch from database
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
          
        if (categoriesError) throw categoriesError;
        
        setCategories(categoriesData || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("שגיאה בטעינת הקטגוריות, אנא נסה שוב מאוחר יותר");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, [contextCategories, contextLoading]);

  const handleSelectCategory = (categoryId: string) => {
    onUpdate({ category: categoryId });
  };
  
  const handleNext = () => {
    if (!data.category && !adminMode) {
      toast.error("יש לבחור קטגוריה כדי להמשיך");
      setError("יש לבחור קטגוריה כדי להמשיך");
      return;
    }
    
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto" dir="rtl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">בחירת קטגוריה</h2>
        <p className="text-gray-600">בחר/י את הקטגוריה הראשית של העסק שלך</p>
      </div>
      
      {adminMode && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <p className="font-medium">מצב מנהל מופעל</p>
          </div>
          <p>ניתן לדלג על בחירת קטגוריה לצורך בדיקת התהליך</p>
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
          {categories.map((category) => (
            <Card 
              key={category.id}
              className={`cursor-pointer transition-all hover:border-brand-300 ${
                data.category === category.id ? "border-2 border-brand-600" : ""
              }`}
              onClick={() => handleSelectCategory(category.id)}
            >
              <CardHeader className="p-4">
                <CardTitle className="text-center text-lg">
                  {category.icon && <span className="mr-2">{category.icon}</span>}
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {category.image_url && (
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={category.image_url} 
                      alt={category.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <div className="mt-8 flex justify-end">
        <Button onClick={handleNext}>
          המשך
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep1;
