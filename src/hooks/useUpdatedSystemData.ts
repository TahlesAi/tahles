
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UpdatedCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories: UpdatedSubcategory[];
}

export interface UpdatedSubcategory {
  id: string;
  name: string;
  description: string;
  category_id: string;
  providers: UpdatedProvider[];
}

export interface UpdatedProvider {
  id: string;
  name: string;
  description: string;
  verified: boolean;
  services: UpdatedService[];
}

export interface UpdatedService {
  id: string;
  name: string;
  description: string;
  pricing_model: 'fixed' | 'variable' | 'tiered';
  price: number;
  available: boolean;
  subcategory_id: string;
}

export interface GuidedSearchFilters {
  date?: string;
  location?: string;
  concept?: string;
  participants?: string;
  category_id?: string;
  subcategory_id?: string;
  budget?: string;
}

export interface VisibilityRules {
  showEmptyCategories: boolean;
  showEmptySubcategories: boolean;
  showInactiveProviders: boolean;
  requireActiveServices: boolean;
}

export interface BusinessLogic {
  participantRanges: {
    production: string[];
    tickets: string[];
  };
  hideUnavailableServices: boolean;
  requirePricing: boolean;
  requireCalendarIntegration: boolean;
  allowSpecialProducts: boolean;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  service_id: string;
  created_at: string;
  service?: UpdatedService;
}

export const useUpdatedSystemData = () => {
  const [categories, setCategories] = useState<UpdatedCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const visibilityRules: VisibilityRules = {
    showEmptyCategories: false,
    showEmptySubcategories: false,
    showInactiveProviders: false,
    requireActiveServices: true
  };

  const businessLogic: BusinessLogic = {
    participantRanges: {
      production: ['0-1000', '1001-3000', '3001-6000', '6001-10000', '10000+'],
      tickets: ['0-300', '301-500', '501-1000', '1001+']
    },
    hideUnavailableServices: true,
    requirePricing: true,
    requireCalendarIntegration: true,
    allowSpecialProducts: true
  };

  const loadCategoriesWithHierarchy = useCallback(async () => {
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

      // טעינת ספקים מאומתים
      const { data: providersData, error: providersError } = await supabase
        .from('providers')
        .select('*')
        .eq('is_verified', true);

      if (providersError) throw providersError;

      // טעינת שירותים פעילים בלבד
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select(`
          *,
          service_addons(*)
        `)
        .eq('is_visible', true)
        .not('base_price', 'is', null);

      if (servicesError) throw servicesError;

      // בניית היררכיה עם כללי תצוגה
      const hierarchyWithActiveServices = buildActiveHierarchy(
        categoriesData || [],
        subcategoriesData || [],
        providersData || [],
        servicesData || [],
        visibilityRules,
        businessLogic
      );

      setCategories(hierarchyWithActiveServices);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת הנתונים');
    } finally {
      setLoading(false);
    }
  }, []);

  const guidedSearch = useCallback(async (filters: GuidedSearchFilters) => {
    try {
      let query = supabase
        .from('services')
        .select(`
          *,
          providers(*),
          subcategories(*),
          categories(*),
          service_addons(*)
        `)
        .eq('is_visible', true)
        .not('base_price', 'is', null);

      // סינון לפי קטגוריה
      if (filters.category_id) {
        const { data: subcategoryIds } = await supabase
          .from('subcategories')
          .select('id')
          .eq('category_id', filters.category_id);
        
        if (subcategoryIds && subcategoryIds.length > 0) {
          query = query.in('subcategory_id', subcategoryIds.map(s => s.id));
        }
      }

      // סינון לפי תת-קטגוריה
      if (filters.subcategory_id) {
        query = query.eq('subcategory_id', filters.subcategory_id);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data || [];
    } catch (err) {
      console.error('Error in guided search:', err);
      return [];
    }
  }, []);

  const addToWishlist = useCallback(async (serviceId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('משתמש לא מחובר');

      const { error } = await supabase
        .from('wishlists')
        .insert({
          user_id: user.id,
          service_id: serviceId
        });

      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      return false;
    }
  }, []);

  const removeFromWishlist = useCallback(async (serviceId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('משתמש לא מחובר');

      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('service_id', serviceId);

      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      return false;
    }
  }, []);

  const getWishlist = useCallback(async (): Promise<WishlistItem[]> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('wishlists')
        .select(`
          *,
          service:services(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      
      // המרה בטוחה של הנתונים לטיפוסים הנכונים
      const wishlistItems: WishlistItem[] = (data || []).map(item => ({
        id: item.id,
        user_id: item.user_id,
        service_id: item.service_id,
        created_at: item.created_at,
        service: item.service ? {
          ...item.service,
          pricing_model: (item.service.pricing_model as 'fixed' | 'variable' | 'tiered') || 'fixed'
        } as UpdatedService : undefined
      }));
      
      return wishlistItems;
    } catch (err) {
      console.error('Error loading wishlist:', err);
      return [];
    }
  }, []);

  useEffect(() => {
    loadCategoriesWithHierarchy();
  }, [loadCategoriesWithHierarchy]);

  return {
    categories,
    loading,
    error,
    businessLogic,
    guidedSearch,
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    refreshData: loadCategoriesWithHierarchy
  };
};

// פונקציה לבניית היררכיה עם שירותים פעילים בלבד
const buildActiveHierarchy = (
  categories: any[],
  subcategories: any[],
  providers: any[],
  services: any[],
  rules: VisibilityRules,
  logic: BusinessLogic
): UpdatedCategory[] => {
  return categories.map(category => {
    const categorySubcategories = subcategories
      .filter(sub => sub.category_id === category.id)
      .map(subcategory => {
        const subcategoryProviders = providers
          .filter(provider => {
            // בדיקה שלספק יש שירותים פעילים בתת-קטגוריה זו
            const hasActiveServices = services.some(service => 
              service.provider_id === provider.id && 
              service.subcategory_id === subcategory.id &&
              isServiceActive(service, logic)
            );
            return hasActiveServices;
          })
          .map(provider => {
            const providerServices = services.filter(service => 
              service.provider_id === provider.id && 
              service.subcategory_id === subcategory.id &&
              isServiceActive(service, logic)
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
                pricing_model: (service.pricing_model as 'fixed' | 'variable' | 'tiered') || 'fixed',
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
  .filter(category => category.subcategories.length > 0);
};

// פונקציה לבדיקת שירות פעיל
const isServiceActive = (service: any, logic: BusinessLogic): boolean => {
  if (!service.is_visible) return false;
  
  if (logic.requirePricing && (!service.base_price || service.base_price <= 0)) {
    return false;
  }
  
  if (logic.requireCalendarIntegration && !service.has_calendar_integration) {
    return false;
  }
  
  return true;
};
