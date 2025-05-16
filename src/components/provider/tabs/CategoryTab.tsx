
import React, { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Tag, Plus, Save, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  category_name: string;
  category_id: string;
}

const CategoryTab = ({ providerId }: { providerId: string }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [providerSubcategories, setProviderSubcategories] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allSubcategories, setAllSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const isOwner = user?.id === providerId;
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch provider's subcategories
        const { data: providerSubcatsData, error: providerError } = await supabase
          .from('provider_subcategories')
          .select('subcategory_id')
          .eq('provider_id', providerId);
          
        if (providerError) throw providerError;
        
        const subcategoryIds = providerSubcatsData.map(item => item.subcategory_id);
        setProviderSubcategories(subcategoryIds);
        setSelectedSubcategories(subcategoryIds);
        
        // Fetch all categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
          
        if (categoriesError) throw categoriesError;
        
        // Fetch all subcategories with category info
        const { data: subcategoriesData, error: subcategoriesError } = await supabase
          .from('subcategories')
          .select(`
            id,
            name,
            category_id,
            categories (
              name
            )
          `)
          .order('name');
          
        if (subcategoriesError) throw subcategoriesError;
        
        // Process subcategories with category name
        const formattedSubcategories = subcategoriesData.map((subcat: any) => ({
          id: subcat.id,
          name: subcat.name,
          category_id: subcat.category_id,
          category_name: subcat.categories?.name || "קטגוריה לא ידועה"
        }));
        
        setAllSubcategories(formattedSubcategories);
        
        // Organize into categories with subcategories
        const categoriesWithSubs = categoriesData.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          subcategories: formattedSubcategories.filter(
            (sub: Subcategory) => sub.category_id === cat.id && subcategoryIds.includes(sub.id)
          )
        })).filter((cat: Category) => cat.subcategories.length > 0);
        
        setCategories(categoriesWithSubs);
      } catch (error) {
        console.error("Error fetching category data:", error);
        toast({
          title: "שגיאה בטעינת נתונים",
          description: "לא ניתן לטעון את נתוני הקטגוריות, אנא נסה שוב מאוחר יותר",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [providerId, toast]);
  
  const handleEditCategories = () => {
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setSelectedSubcategories(providerSubcategories);
    setIsEditing(false);
  };
  
  const toggleSubcategory = (subcategoryId: string) => {
    setSelectedSubcategories(prev => 
      prev.includes(subcategoryId)
        ? prev.filter(id => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };
  
  const handleSaveCategories = async () => {
    try {
      setIsLoading(true);
      
      // Delete existing associations
      await supabase
        .from('provider_subcategories')
        .delete()
        .eq('provider_id', providerId);
        
      // Create new associations
      if (selectedSubcategories.length > 0) {
        const subcategoryMappings = selectedSubcategories.map(subcategoryId => ({
          provider_id: providerId,
          subcategory_id: subcategoryId
        }));
        
        const { error } = await supabase
          .from('provider_subcategories')
          .insert(subcategoryMappings);
          
        if (error) throw error;
      }
      
      setProviderSubcategories(selectedSubcategories);
      setIsEditing(false);
      
      // Reload categories to reflect changes
      const filteredCategories = allSubcategories
        .filter(sub => selectedSubcategories.includes(sub.id))
        .reduce((acc, sub) => {
          const existingCat = acc.find(cat => cat.id === sub.category_id);
          if (existingCat) {
            existingCat.subcategories.push(sub);
          } else {
            acc.push({
              id: sub.category_id,
              name: sub.category_name,
              subcategories: [sub]
            });
          }
          return acc;
        }, [] as Category[]);
      
      setCategories(filteredCategories);
      
      toast({
        title: "קטגוריות עודכנו בהצלחה",
        description: "הקטגוריות השירות עודכנו ויופיעו בתוצאות החיפוש המתאימות",
      });
      
    } catch (error) {
      console.error("Error updating categories:", error);
      toast({
        title: "שגיאה בעדכון קטגוריות",
        description: "אירעה שגיאה בעדכון הקטגוריות, אנא נסה שוב מאוחר יותר",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getSubcategoriesByCategory = (categoryId: string) => {
    return allSubcategories.filter(sub => sub.category_id === categoryId);
  };

  return (
    <TabsContent value="categories" className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          <Tag className="ml-2" />
          קטגוריות שירות
        </h2>
        
        {isOwner && !isEditing && (
          <Button onClick={handleEditCategories} variant="outline" size="sm">
            <Plus className="ml-1 h-4 w-4" /> הוסף/ערוך קטגוריות
          </Button>
        )}
        
        {isEditing && (
          <div className="flex gap-2">
            <Button onClick={handleCancelEdit} variant="outline" size="sm">
              <X className="ml-1 h-4 w-4" /> ביטול
            </Button>
            <Button onClick={handleSaveCategories} size="sm">
              <Save className="ml-1 h-4 w-4" /> שמור שינויים
            </Button>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : isEditing ? (
        <div className="space-y-6">
          {allSubcategories.length === 0 ? (
            <p className="text-gray-500">לא נמצאו קטגוריות זמינות.</p>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                בחר את הקטגוריות המתאימות לשירותים שאתה מציע:
              </p>
              
              {/* Group subcategories by category for editing */}
              {[...new Set(allSubcategories.map(sub => sub.category_id))].map(categoryId => {
                const categoryName = allSubcategories.find(sub => sub.category_id === categoryId)?.category_name;
                const subcategories = getSubcategoriesByCategory(categoryId);
                
                return (
                  <div key={categoryId} className="mb-4">
                    <h3 className="font-medium mb-2">{categoryName}</h3>
                    <div className="flex flex-wrap gap-2">
                      {subcategories.map(subcategory => (
                        <Badge 
                          key={subcategory.id}
                          variant={selectedSubcategories.includes(subcategory.id) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleSubcategory(subcategory.id)}
                        >
                          {subcategory.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
              
              <p className="mt-4 text-right text-sm text-gray-500">
                {selectedSubcategories.length} קטגוריות נבחרו
              </p>
            </>
          )}
        </div>
      ) : (
        <div>
          {categories.length === 0 ? (
            <p className="text-gray-500">לא נמצאו קטגוריות לשירות זה.</p>
          ) : (
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="mb-4">
                  <h3 className="font-medium mb-2">{category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.map((subcategory) => (
                      <Badge key={subcategory.id} variant="secondary">
                        {subcategory.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </TabsContent>
  );
};

export default CategoryTab;
