
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  UpdatedDivision, 
  UpdatedService, 
  GuidedSearchFilters,
  VisibilityRules,
  BusinessLogic,
  WishlistItem
} from '@/types/updatedSystemTypes';

export const useUpdatedSystemData = () => {
  const [divisions, setDivisions] = useState<UpdatedDivision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const visibilityRules: VisibilityRules = {
    showEmptyDivisions: false,
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

  const loadDivisionsWithHierarchy = useCallback(async () => {
    try {
      setLoading(true);
      
      // טעינת חטיבות
      const { data: divisionsData, error: divisionsError } = await supabase
        .from('divisions')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (divisionsError) throw divisionsError;

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
        .from('active_services')
        .select(`
          *,
          service_addons(*)
        `);

      if (servicesError) throw servicesError;

      // בניית היררכיה עם כללי תצוגה
      const hierarchyWithActiveServices = buildActiveHierarchy(
        divisionsData || [],
        categoriesData || [],
        subcategoriesData || [],
        providersData || [],
        servicesData || [],
        visibilityRules,
        businessLogic
      );

      setDivisions(hierarchyWithActiveServices);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת הנתונים');
    } finally {
      setLoading(false);
    }
  }, []);

  const guidedSearch = useCallback(async (filters: GuidedSearchFilters) => {
    try {
      let query = supabase
        .from('active_services')
        .select(`
          *,
          providers(*),
          subcategories(*),
          categories(*),
          service_addons(*)
        `);

      // סינון לפי חטיבה
      if (filters.division_id) {
        query = query.eq('categories.division_id', filters.division_id);
      }

      // סינון לפי קטגוריה
      if (filters.category_id) {
        query = query.eq('subcategories.category_id', filters.category_id);
      }

      // סינון לפי תת-קטגוריה
      if (filters.subcategory_id) {
        query = query.eq('subcategory_id', filters.subcategory_id);
      }

      // סינון לפי מספר משתתפים
      if (filters.participant_count) {
        query = query
          .lte('min_participants', filters.participant_count)
          .gte('max_participants', filters.participant_count);
      }

      // סינון לפי סוג אירוע
      if (filters.event_type) {
        query = query.eq('event_type', filters.event_type);
      }

      // סינון לפי סוג מיקום
      if (filters.location_type) {
        query = query.eq('location_type', filters.location_type);
      }

      // סינון לפי סוג שירות
      if (filters.service_type) {
        query = query.eq('service_type', filters.service_type);
      }

      // סינון לפי טווח תקציב
      if (filters.budget_range) {
        query = query.eq('budget_range', filters.budget_range);
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
      return data || [];
    } catch (err) {
      console.error('Error loading wishlist:', err);
      return [];
    }
  }, []);

  useEffect(() => {
    loadDivisionsWithHierarchy();
  }, [loadDivisionsWithHierarchy]);

  return {
    divisions,
    loading,
    error,
    businessLogic,
    guidedSearch,
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    refreshData: loadDivisionsWithHierarchy
  };
};

// פונקציה לבניית היררכיה עם שירותים פעילים בלבד
const buildActiveHierarchy = (
  divisions: any[],
  categories: any[],
  subcategories: any[],
  providers: any[],
  services: any[],
  rules: VisibilityRules,
  logic: BusinessLogic
): UpdatedDivision[] => {
  return divisions.map(division => {
    const divisionCategories = categories
      .filter(cat => cat.division_id === division.id)
      .map(category => {
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
                  ...provider,
                  services: providerServices
                };
              });

            return {
              ...subcategory,
              providers: subcategoryProviders
            };
          })
          .filter(subcategory => subcategory.providers.length > 0);

        return {
          ...category,
          subcategories: categorySubcategories
        };
      })
      .filter(category => category.subcategories.length > 0);

    return {
      ...division,
      categories: divisionCategories
    };
  })
  .filter(division => division.categories.length > 0);
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
