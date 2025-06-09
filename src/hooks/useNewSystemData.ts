
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SimpleCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories?: SimpleSubcategory[];
}

export interface SimpleSubcategory {
  id: string;
  name: string;
  description: string;
  category_id: string;
  providers?: SimpleProvider[];
}

export interface SimpleProvider {
  id: string;
  name: string;
  description: string;
  verified: boolean;
  services?: SimpleService[];
}

export interface SimpleService {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  subcategory_id: string;
}

export interface SimpleConcept {
  id: string;
  name: string;
  description: string;
  concept_type: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  role: string;
}

export const useNewSystemData = () => {
  const [categories, setCategories] = useState<SimpleCategory[]>([]);
  const [concepts, setConcepts] = useState<SimpleConcept[]>([]);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // טעינת קטגוריות עם היררכיה מלאה
  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      
      // טעינת קטגוריות
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (categoriesError) throw categoriesError;

      // טעינת תת-קטגוריות
      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from('subcategories')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (subcategoriesError) throw subcategoriesError;

      // טעינת ספקים
      const { data: providersData, error: providersError } = await supabase
        .from('providers')
        .select('*')
        .eq('is_verified', true);

      if (providersError) throw providersError;

      // טעינת שירותים זמינים
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .eq('is_visible', true);

      if (servicesError) throw servicesError;

      // בניית היררכיה
      const hierarchyWithData = buildSimpleHierarchy(
        categoriesData || [],
        subcategoriesData || [],
        providersData || [],
        servicesData || []
      );

      setCategories(hierarchyWithData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת הנתונים');
    } finally {
      setLoading(false);
    }
  }, []);

  // טעינת קונספטים
  const loadConcepts = useCallback(async () => {
    try {
      const { data: conceptsData, error: conceptsError } = await supabase
        .from('concepts')
        .select('*')
        .eq('is_active', true);

      if (conceptsError) throw conceptsError;

      const simpleConcepts = (conceptsData || []).map(concept => ({
        id: concept.id,
        name: concept.name,
        description: concept.description || '',
        concept_type: concept.concept_type || '',
        is_active: concept.is_active,
        created_at: concept.created_at,
        updated_at: concept.updated_at
      })) as SimpleConcept[];

      setConcepts(simpleConcepts);
    } catch (err) {
      console.error('Error loading concepts:', err);
    }
  }, []);

  // טעינת תפקיד משתמש
  const loadUserRole = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .single();
        
        setUserRole(roleData ? { role: roleData.role } : { role: 'user' });
      } else {
        setUserRole({ role: 'guest' });
      }
    } catch (err) {
      console.error('Error loading user role:', err);
      setUserRole({ role: 'guest' });
    }
  }, []);

  // פונקציית חיפוש שירותים
  const searchServices = useCallback(async (query: string, filters?: any) => {
    try {
      let servicesQuery = supabase
        .from('services')
        .select('*')
        .eq('is_visible', true);

      if (query) {
        servicesQuery = servicesQuery.ilike('name', `%${query}%`);
      }

      if (filters?.category_id) {
        const { data: subcategoryIds } = await supabase
          .from('subcategories')
          .select('id')
          .eq('category_id', filters.category_id);
        
        if (subcategoryIds && subcategoryIds.length > 0) {
          servicesQuery = servicesQuery.in('subcategory_id', subcategoryIds.map(s => s.id));
        }
      }

      const { data, error } = await servicesQuery;
      if (error) throw error;

      return data || [];
    } catch (err) {
      console.error('Error searching services:', err);
      return [];
    }
  }, []);

  useEffect(() => {
    loadCategories();
    loadConcepts();
    loadUserRole();
  }, [loadCategories, loadConcepts, loadUserRole]);

  return {
    categories,
    concepts,
    userRole,
    loading,
    error,
    searchServices,
    refreshData: () => {
      loadCategories();
      loadConcepts();
      loadUserRole();
    }
  };
};

// פונקציה לבניית היררכיה פשוטה
const buildSimpleHierarchy = (
  categories: any[],
  subcategories: any[],
  providers: any[],
  services: any[]
): SimpleCategory[] => {
  return categories.map(category => {
    const categorySubcategories = subcategories
      .filter(sub => sub.category_id === category.id)
      .map(subcategory => {
        const subcategoryProviders = providers
          .filter(provider => {
            // בדיקה שלספק יש שירותים בתת-קטגוריה זו
            const hasServices = services.some(service => 
              service.provider_id === provider.id && 
              service.subcategory_id === subcategory.id &&
              service.is_visible
            );
            return hasServices;
          })
          .map(provider => {
            const providerServices = services.filter(service => 
              service.provider_id === provider.id && 
              service.subcategory_id === subcategory.id &&
              service.is_visible
            );

            return {
              id: provider.id,
              name: provider.name,
              description: provider.description || '',
              verified: provider.is_verified || false,
              services: providerServices.map(service => ({
                id: service.id,
                name: service.name,
                description: service.description || '',
                price: service.base_price || 0,
                available: service.is_visible,
                subcategory_id: service.subcategory_id
              }))
            };
          });

        return {
          id: subcategory.id,
          name: subcategory.name,
          description: subcategory.description || '',
          category_id: subcategory.category_id,
          providers: subcategoryProviders
        };
      })
      .filter(subcategory => subcategory.providers.length > 0);

    return {
      id: category.id,
      name: category.name,
      description: category.description || '',
      icon: category.icon || 'FolderOpen',
      subcategories: categorySubcategories
    };
  })
  .filter(category => category.subcategories && category.subcategories.length > 0);
};
