import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tag, X, Plus, Filter, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface EventConcept {
  id: string;
  name: string;
}

interface AdvancedSearchFiltersProps {
  onCategoriesChange: (categories: string[]) => void;
  onSubcategoriesChange: (subcategories: string[]) => void;
  selectedCategories: string[];
  selectedSubcategories: string[];
  onEventConceptChange?: (concept: string) => void;
  selectedEventConcept?: string;
}

const AdvancedSearchFilters = ({
  onCategoriesChange,
  onSubcategoriesChange,
  selectedCategories,
  selectedSubcategories,
  onEventConceptChange,
  selectedEventConcept = ""
}: AdvancedSearchFiltersProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  // קונספטי אירוע לדוגמה
  const eventConcepts: EventConcept[] = [
    { id: "1", name: "יום הולדת - ילדים (עד גיל 12)" },
    { id: "2", name: "יום הולדת - נוער (13-18)" },
    { id: "3", name: "יום הולדת - מבוגרים" },
    { id: "4", name: "בר/בת מצווה" },
    { id: "5", name: "אירוע חברה/עסקי" },
    { id: "6", name: "ערב גיבוש" },
    { id: "7", name: "כנס מקצועי" },
    { id: "8", name: "מסיבת רווקים/ות" },
    { id: "9", name: "אירוע משפחתי" },
    { id: "10", name: "ארוע מקצועי/עסקי" },
    { id: "11", name: "מפגש חברים" },
    { id: "12", name: "קונספט ספורטיבי" },
    { id: "13", name: "קונספט קלאסי" },
    { id: "14", name: "קונספט שאנטי" },
    { id: "15", name: "קונספט אלגנטי" },
  ];

  // מוק קטגוריות במקרה שהחיבור ל-Supabase נכשל
  const mockCategories = [
    {
      id: "1",
      name: "אמנים ומופעים",
      subcategories: [
        { id: "101", name: "להקות", category_id: "1" },
        { id: "102", name: "זמרים", category_id: "1" },
        { id: "103", name: "אמני חושים", category_id: "1" },
        { id: "104", name: "סטנדאפיסטים", category_id: "1" },
      ]
    },
    {
      id: "2",
      name: "שירותי הפקה",
      subcategories: [
        { id: "201", name: "הגברה ותאורה", category_id: "2" },
        { id: "202", name: "צילום", category_id: "2" },
        { id: "203", name: "עיצוב", category_id: "2" },
      ]
    },
    {
      id: "3",
      name: "לוקיישנים",
      subcategories: [
        { id: "301", name: "אולמות", category_id: "3" },
        { id: "302", name: "גני אירועים", category_id: "3" },
        { id: "303", name: "מתחמי כנסים", category_id: "3" },
      ]
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        // ניסיון לקבל קטגוריות מ-Supabase
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
          
        if (categoriesError) {
          throw categoriesError;
        }
        
        // ניסיון לקבל קטגוריות משנה מ-Supabase
        const { data: subcategoriesData, error: subcategoriesError } = await supabase
          .from('subcategories')
          .select('id, name, category_id')
          .order('name');
          
        if (subcategoriesError) {
          throw subcategoriesError;
        }
        
        // אירגון לפי קטגוריות עם תת-קטגוריות
        if (categoriesData && categoriesData.length > 0 && subcategoriesData && subcategoriesData.length > 0) {
          const categoriesWithSubs = categoriesData.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            subcategories: subcategoriesData.filter((sub: any) => sub.category_id === cat.id)
          }));
          setCategories(categoriesWithSubs);
        } else {
          // שימוש בנתונים מקומיים אם אין נתונים מ-Supabase
          setCategories(mockCategories);
          console.log("Using mock categories data");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories(mockCategories);
        toast({
          variant: "default",
          title: "שגיאה בטעינת קטגוריות",
          description: "משתמש בנתוני דוגמה במקום",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, [toast]);

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
      // הסרת קטגוריה
      onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
      // הסרת כל תת-הקטגוריות של קטגוריה זו
      onSubcategoriesChange(selectedSubcategories.filter(id => !categorySubcategoryIds.includes(id)));
    } else {
      // הוספת קטגוריה
      onCategoriesChange([...selectedCategories, categoryId]);
      // הוספת כל תת-הקטגוריות של קטגוריה זו
      onSubcategoriesChange([...selectedSubcategories, ...categorySubcategoryIds]);
    }
  };

  const toggleSubcategorySelection = (subcategoryId: string, categoryId: string) => {
    const isSubcategorySelected = selectedSubcategories.includes(subcategoryId);
    const categorySubcategoryIds = categories
      .find(cat => cat.id === categoryId)
      ?.subcategories.map(sub => sub.id) || [];
    
    if (isSubcategorySelected) {
      // הסרת תת-קטגוריה
      onSubcategoriesChange(selectedSubcategories.filter(id => id !== subcategoryId));
      
      // בדיקה אם הקטגוריה עדיין מסומנת במלואה
      const remainingSelectedSubcategories = selectedSubcategories.filter(id => id !== subcategoryId);
      const isAnyCategorySubcategorySelected = categorySubcategoryIds.some(id => remainingSelectedSubcategories.includes(id));
      
      // הסרת בחירת הקטגוריה אם אין תת-קטגוריות נבחרות
      if (!isAnyCategorySubcategorySelected) {
        onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
      }
    } else {
      // הוספת תת-קטגוריה
      onSubcategoriesChange([...selectedSubcategories, subcategoryId]);
      
      // בדיקה אם כל תת-הקטגוריות של הקטגוריה נבחרות כעת
      const newSelectedSubcategories = [...selectedSubcategories, subcategoryId];
      const areAllCategorySubcategoriesSelected = categorySubcategoryIds.every(id => newSelectedSubcategories.includes(id));
      
      // הוספת בחירת הקטגוריה אם כל תת-הקטגוריות נבחרו
      if (areAllCategorySubcategoriesSelected && !selectedCategories.includes(categoryId)) {
        onCategoriesChange([...selectedCategories, categoryId]);
      }
    }
  };

  const clearFilters = () => {
    onCategoriesChange([]);
    onSubcategoriesChange([]);
  };

  const handleConceptChange = (concept: string) => {
    if (onEventConceptChange) {
      onEventConceptChange(concept);
    }
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
        
        {(selectedCategories.length > 0 || selectedSubcategories.length > 0 || selectedEventConcept) && (
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
          
          {/* בחירת קונספט האירוע */}
          <div className="mb-4">
            <h4 className="text-md font-medium mb-2">קונספט האירוע</h4>
            <Select 
              value={selectedEventConcept} 
              onValueChange={handleConceptChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="בחרו קונספט" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">כל הקונספטים</SelectItem>
                {eventConcepts.map((concept) => (
                  <SelectItem key={concept.id} value={concept.id}>
                    {concept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
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
      
      {(selectedCategories.length > 0 || selectedSubcategories.length > 0 || selectedEventConcept) && (
        <div className="flex flex-wrap gap-2 mt-2">
          {/* הצגת קונספט אירוע נבחר */}
          {selectedEventConcept && (
            <Badge className="py-1 px-2 bg-accent1-600">
              {eventConcepts.find(c => c.id === selectedEventConcept)?.name || "קונספט נבחר"}
              <X 
                className="h-3 w-3 mr-1 cursor-pointer" 
                onClick={() => handleConceptChange("")} 
              />
            </Badge>
          )}
          
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
