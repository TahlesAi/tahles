
import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  icon?: string;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
  icon?: string;
}

interface CategorySelectorProps {
  selectedSubcategories: string[];
  onSelectionChange: (subcategoryIds: string[]) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedSubcategories,
  onSelectionChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      try {
        setLoading(true);
        
        // Fetch all categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
          
        if (categoriesError) throw categoriesError;
        
        // Fetch all subcategories
        const { data: subcategoriesData, error: subcategoriesError } = await supabase
          .from('subcategories')
          .select('*')
          .order('name');
          
        if (subcategoriesError) throw subcategoriesError;
        
        // Organize subcategories by category
        const categoriesWithSubcategories = categoriesData.map((cat: Category) => ({
          ...cat,
          subcategories: subcategoriesData.filter(
            (subcat: Subcategory) => subcat.category_id === cat.id
          )
        }));
        
        // Check for location category and ensure we have karaoke and escape rooms
        const locationCategory = categoriesWithSubcategories.find(
          (cat: Category) => cat.name === "אולמות ומקומות אירוע" || cat.id === "d0251580-5005-4bd8-ae4d-ddd1084f1c99"
        );

        if (locationCategory) {
          // Check if karaoke and escape room subcategories already exist
          const hasKaraoke = locationCategory.subcategories?.some(
            (subcat: Subcategory) => subcat.name === "חדרי קריוקי"
          );
          
          const hasEscapeRoom = locationCategory.subcategories?.some(
            (subcat: Subcategory) => subcat.name === "חדרי בריחה"
          );
          
          // If they don't exist yet, add them (only for UI display purposes, as we don't modify the database here)
          if (!hasKaraoke) {
            console.log("Adding karaoke rooms to category selector display");
          }
          
          if (!hasEscapeRoom) {
            console.log("Adding escape rooms to category selector display");
          }
        }
        
        setCategories(categoriesWithSubcategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoriesAndSubcategories();
  }, []);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleSubcategory = (subcategoryId: string) => {
    if (selectedSubcategories.includes(subcategoryId)) {
      onSelectionChange(selectedSubcategories.filter(id => id !== subcategoryId));
    } else {
      onSelectionChange([...selectedSubcategories, subcategoryId]);
    }
  };
  
  const getSelectedCount = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category || !category.subcategories) return 0;
    
    return category.subcategories.reduce(
      (count, subcat) => count + (selectedSubcategories.includes(subcat.id) ? 1 : 0),
      0
    );
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>קטגוריות שירות</CardTitle>
        <CardDescription>
          בחרו את הקטגוריות והקטגוריות המשנה המתאימות לשירותים שלכם
        </CardDescription>
      </CardHeader>
      <CardContent dir="rtl">
        <ScrollArea className="h-[320px] pr-4">
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="border rounded-md">
                <div 
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center gap-2">
                    {category.icon && <span>{category.icon}</span>}
                    <span className="font-medium">{category.name}</span>
                    {getSelectedCount(category.id) > 0 && (
                      <Badge variant="secondary" className="mr-2">
                        {getSelectedCount(category.id)} נבחרו
                      </Badge>
                    )}
                  </div>
                  <div>
                    {expandedCategories.has(category.id) ? (
                      <X className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {category.subcategories?.length || 0} תתי קטגוריות
                      </span>
                    )}
                  </div>
                </div>
                
                {expandedCategories.has(category.id) && category.subcategories && (
                  <div className="p-3 pt-0 border-t">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-3">
                      {category.subcategories.map((subcategory) => (
                        <Badge
                          key={subcategory.id}
                          variant={selectedSubcategories.includes(subcategory.id) ? "default" : "outline"}
                          className="cursor-pointer py-1 px-2 justify-between"
                          onClick={() => toggleSubcategory(subcategory.id)}
                        >
                          <span>{subcategory.name}</span>
                          {selectedSubcategories.includes(subcategory.id) && (
                            <Check className="h-3 w-3 mr-1" />
                          )}
                        </Badge>
                      ))}

                      {/* Add special handling for location category */}
                      {category.name === "אולמות ומקומות אירוע" && category.subcategories.every(
                        (subcat: Subcategory) => subcat.name !== "חדרי קריוקי" && subcat.name !== "חדרי בריחה"
                      ) && (
                        <>
                          <Badge
                            variant="outline"
                            className="cursor-pointer py-1 px-2 justify-between"
                          >
                            <span>חדרי קריוקי</span>
                            <span className="text-xs text-gray-400">(בקרוב)</span>
                          </Badge>
                          <Badge
                            variant="outline"
                            className="cursor-pointer py-1 px-2 justify-between"
                          >
                            <span>חדרי בריחה</span>
                            <span className="text-xs text-gray-400">(בקרוב)</span>
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {selectedSubcategories.length} קטגוריות נבחרו
        </div>
        {selectedSubcategories.length > 0 && (
          <Button
            variant="outline"
            onClick={() => onSelectionChange([])}
          >
            נקה בחירה
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CategorySelector;
