
import React, { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Tag, Plus, Save, X, Edit, ListPlus, Category } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  
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
  
  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };
  
  const handleEditCategories = () => {
    setIsEditing(true);
    // Auto-expand all categories when entering edit mode
    setExpandedCategories(new Set(
      Array.from(new Set(allSubcategories.map(sub => sub.category_id)))
    ));
  };
  
  const handleCancelEdit = () => {
    setSelectedSubcategories(providerSubcategories);
    setIsEditing(false);
    setExpandedCategories(new Set());
  };
  
  const toggleSubcategory = (subcategoryId: string) => {
    setSelectedSubcategories(prev => 
      prev.includes(subcategoryId)
        ? prev.filter(id => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };
  
  const selectAllInCategory = (categoryId: string) => {
    const categorySubcats = allSubcategories
      .filter(sub => sub.category_id === categoryId)
      .map(sub => sub.id);
      
    // Check if all subcategories in this category are already selected
    const allSelected = categorySubcats.every(id => selectedSubcategories.includes(id));
    
    if (allSelected) {
      // Deselect all in this category
      setSelectedSubcategories(prev => 
        prev.filter(id => !categorySubcats.includes(id))
      );
    } else {
      // Select all in this category
      const newSelected = [...selectedSubcategories];
      categorySubcats.forEach(id => {
        if (!newSelected.includes(id)) {
          newSelected.push(id);
        }
      });
      setSelectedSubcategories(newSelected);
    }
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
      setExpandedCategories(new Set());
      
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
        description: "קטגוריות השירות עודכנו ויופיעו בתוצאות החיפוש המתאימות",
        variant: "success"
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
  
  const isCategoryFullySelected = (categoryId: string) => {
    const categorySubcats = allSubcategories
      .filter(sub => sub.category_id === categoryId)
      .map(sub => sub.id);
      
    return categorySubcats.length > 0 && 
      categorySubcats.every(id => selectedSubcategories.includes(id));
  };
  
  const getCategorySelectedCount = (categoryId: string) => {
    const categorySubcats = allSubcategories
      .filter(sub => sub.category_id === categoryId)
      .map(sub => sub.id);
      
    return categorySubcats.filter(id => 
      selectedSubcategories.includes(id)
    ).length;
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
            <Edit className="ml-2 h-4 w-4" /> עריכת קטגוריות
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
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <ScrollArea className="h-[450px] pr-4" type="always">
              <div className="space-y-6 mt-2">
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
                      const selectedCount = getCategorySelectedCount(categoryId);
                      
                      return (
                        <div key={categoryId} className="border rounded-lg overflow-hidden">
                          <div 
                            className="flex items-center justify-between p-3 bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                            onClick={() => toggleCategory(categoryId)}
                          >
                            <div className="flex items-center gap-2">
                              <Category className="h-5 w-5 text-muted-foreground" />
                              <span className="font-medium">{categoryName}</span>
                              {selectedCount > 0 && (
                                <Badge variant="secondary" className="mr-2">
                                  {selectedCount} נבחרו
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-7 px-2 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectAllInCategory(categoryId);
                                }}
                              >
                                <ListPlus className="h-3.5 w-3.5 ml-1" />
                                {isCategoryFullySelected(categoryId) ? "נקה הכל" : "בחר הכל"}
                              </Button>
                              
                              <div className="text-muted-foreground">
                                {expandedCategories.has(categoryId) ? (
                                  <X className="h-4 w-4" />
                                ) : (
                                  <Plus className="h-4 w-4" />
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {expandedCategories.has(categoryId) && (
                            <div className="p-3 pt-2 border-t bg-white">
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                                {subcategories.map((subcategory) => (
                                  <Badge
                                    key={subcategory.id}
                                    variant={selectedSubcategories.includes(subcategory.id) ? "default" : "outline"}
                                    className="cursor-pointer py-1.5 px-3 justify-between hover:bg-primary-100 transition-all"
                                    onClick={() => toggleSubcategory(subcategory.id)}
                                  >
                                    <span>{subcategory.name}</span>
                                    {selectedSubcategories.includes(subcategory.id) && (
                                      <X className="h-3 w-3 mr-1 hover:text-white/80" />
                                    )}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    
                    <div className="text-right text-sm text-gray-500 mt-6">
                      סה"כ {selectedSubcategories.length} קטגוריות נבחרו
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <div>
          {categories.length === 0 ? (
            <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed">
              <Category className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">לא נמצאו קטגוריות לשירות זה.</p>
              {isOwner && (
                <Button onClick={handleEditCategories} variant="outline" size="sm" className="mt-2">
                  <Plus className="ml-1 h-4 w-4" /> הוסף קטגוריות
                </Button>
              )}
            </div>
          ) : (
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-6">
                  {categories.map((category) => (
                    <div key={category.id} className="mb-6">
                      <div className="flex items-center mb-3">
                        <Category className="h-5 w-5 text-muted-foreground mr-2" />
                        <h3 className="font-medium text-lg">{category.name}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories.map((subcategory) => (
                          <Badge key={subcategory.id} variant="secondary" className="py-1 px-3">
                            {subcategory.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </TabsContent>
  );
};

export default CategoryTab;
