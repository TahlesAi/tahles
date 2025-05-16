
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tag, X, Plus, Filter, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
}

interface AdvancedSearchFiltersProps {
  onCategoriesChange: (categories: string[]) => void;
  onSubcategoriesChange: (subcategories: string[]) => void;
  selectedCategories: string[];
  selectedSubcategories: string[];
}

const AdvancedSearchFilters = ({
  onCategoriesChange,
  onSubcategoriesChange,
  selectedCategories,
  selectedSubcategories
}: AdvancedSearchFiltersProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        // Fetch all categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
          
        if (categoriesError) throw categoriesError;
        
        // Fetch all subcategories
        const { data: subcategoriesData, error: subcategoriesError } = await supabase
          .from('subcategories')
          .select('id, name, category_id')
          .order('name');
          
        if (subcategoriesError) throw subcategoriesError;
        
        // Organize into categories with subcategories
        const categoriesWithSubs = categoriesData.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          subcategories: subcategoriesData.filter((sub: any) => sub.category_id === cat.id)
        }));
        
        setCategories(categoriesWithSubs);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
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

  const toggleCategorySelection = (categoryId: string) => {
    const isCategorySelected = selectedCategories.includes(categoryId);
    const categorySubcategoryIds = categories
      .find(cat => cat.id === categoryId)
      ?.subcategories.map(sub => sub.id) || [];
    
    if (isCategorySelected) {
      // Remove category
      onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
      // Remove all subcategories of this category
      onSubcategoriesChange(selectedSubcategories.filter(id => !categorySubcategoryIds.includes(id)));
    } else {
      // Add category
      onCategoriesChange([...selectedCategories, categoryId]);
      // Add all subcategories of this category
      onSubcategoriesChange([...selectedSubcategories, ...categorySubcategoryIds]);
    }
  };

  const toggleSubcategorySelection = (subcategoryId: string, categoryId: string) => {
    const isSubcategorySelected = selectedSubcategories.includes(subcategoryId);
    const categorySubcategoryIds = categories
      .find(cat => cat.id === categoryId)
      ?.subcategories.map(sub => sub.id) || [];
    
    if (isSubcategorySelected) {
      // Remove subcategory
      onSubcategoriesChange(selectedSubcategories.filter(id => id !== subcategoryId));
      
      // Check if category is still fully selected
      const remainingSelectedSubcategories = selectedSubcategories.filter(id => id !== subcategoryId);
      const isAnyCategorySubcategorySelected = categorySubcategoryIds.some(id => remainingSelectedSubcategories.includes(id));
      
      // Remove category selection if no subcategories are selected
      if (!isAnyCategorySubcategorySelected) {
        onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
      }
    } else {
      // Add subcategory
      onSubcategoriesChange([...selectedSubcategories, subcategoryId]);
      
      // Check if all category subcategories are selected now
      const newSelectedSubcategories = [...selectedSubcategories, subcategoryId];
      const areAllCategorySubcategoriesSelected = categorySubcategoryIds.every(id => newSelectedSubcategories.includes(id));
      
      // Add category selection if all subcategories are selected
      if (areAllCategorySubcategoriesSelected && !selectedCategories.includes(categoryId)) {
        onCategoriesChange([...selectedCategories, categoryId]);
      }
    }
  };

  const clearFilters = () => {
    onCategoriesChange([]);
    onSubcategoriesChange([]);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            <span>חיפוש מתקדם לפי קטגוריות</span>
            {showFilters ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>
        
        {(selectedCategories.length > 0 || selectedSubcategories.length > 0) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            נקה סינונים
          </Button>
        )}
      </div>
      
      {showFilters && (
        <div className="mb-4 bg-white p-4 rounded-md border">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Tag className="h-4 w-4 ml-2" />
            סינון לפי קטגוריות
          </h3>
          
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ScrollArea className="h-[250px]">
              <Accordion type="multiple" className="w-full">
                {categories.map(category => (
                  <AccordionItem key={category.id} value={category.id}>
                    <AccordionTrigger className="py-2 px-1">
                      <div className="flex items-center">
                        <Badge 
                          variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                          className="cursor-pointer ml-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCategorySelection(category.id);
                          }}
                        >
                          {selectedCategories.includes(category.id) && (
                            <Check className="h-3 w-3 ml-1" />
                          )}
                          {category.name}
                        </Badge>
                        
                        {selectedSubcategories.some(id => 
                          category.subcategories.some(sub => sub.id === id)
                        ) && (
                          <Badge variant="secondary" className="ml-2">
                            {category.subcategories.filter(sub => 
                              selectedSubcategories.includes(sub.id)
                            ).length} נבחרו
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-2 pr-4">
                        {category.subcategories.map(subcategory => (
                          <Badge
                            key={subcategory.id}
                            variant={selectedSubcategories.includes(subcategory.id) ? "default" : "outline"}
                            className="cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => toggleSubcategorySelection(subcategory.id, category.id)}
                          >
                            {selectedSubcategories.includes(subcategory.id) && (
                              <Check className="h-3 w-3 ml-1" />
                            )}
                            {subcategory.name}
                          </Badge>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              נבחרו {selectedSubcategories.length} קטגוריות משנה
            </p>
          </div>
        </div>
      )}
      
      {(selectedCategories.length > 0 || selectedSubcategories.length > 0) && (
        <div className="flex flex-wrap gap-2 mt-2">
          {categories
            .filter(cat => selectedCategories.includes(cat.id) || 
              cat.subcategories.some(sub => selectedSubcategories.includes(sub.id)))
            .map(category => (
              <React.Fragment key={category.id}>
                {selectedCategories.includes(category.id) ? (
                  <Badge className="py-1 px-2">
                    {category.name}
                    <X 
                      className="h-3 w-3 mr-1 cursor-pointer" 
                      onClick={() => toggleCategorySelection(category.id)} 
                    />
                  </Badge>
                ) : (
                  category.subcategories
                    .filter(sub => selectedSubcategories.includes(sub.id))
                    .map(sub => (
                      <Badge key={sub.id} className="py-1 px-2" variant="secondary">
                        {`${category.name} > ${sub.name}`}
                        <X 
                          className="h-3 w-3 mr-1 cursor-pointer" 
                          onClick={() => toggleSubcategorySelection(sub.id, category.id)} 
                        />
                      </Badge>
                    ))
                )}
              </React.Fragment>
            ))}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchFilters;
