
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Division, 
  SystemCategory, 
  SystemSubcategory, 
  SystemProvider, 
  SystemService,
  ExternalConcept,
  SubConcept,
  UserRole,
  VisibilityRules,
  SearchFilters 
} from '@/types/newSystemTypes';

export const useNewSystemData = () => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [concepts, setConcepts] = useState<ExternalConcept[]>([]);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const visibilityRules: VisibilityRules = {
    showEmptyDivisions: false,
    showEmptyCategories: false,
    showEmptySubcategories: false,
    showInactiveProviders: false,
    requireActiveServices: true
  };

  // טעינת חטיבות עם היררכיה מלאה
  const loadDivisions = useCallback(async () => {
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

      // טעינת ספקים
      const { data: providersData, error: providersError } = await supabase
        .from('providers')
        .select(`
          *,
          provider_subcategories!inner(subcategory_id)
        `)
        .eq('is_verified', true);

      if (providersError) throw providersError;

      // טעינת שירותים זמינים
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select(`
          *,
          service_concepts(
            concept_id,
            subconcept_id,
            concepts(id, name, concept_type),
            subconcepts(id, name)
          )
        `)
        .eq('is_visible', true);

      if (servicesError) throw servicesError;

      // בניית היררכיה עם כללי תצוגה
      const hierarchyWithVisibility = buildHierarchyWithVisibility(
        divisionsData || [],
        categoriesData || [],
        subcategoriesData || [],
        providersData || [],
        servicesData || [],
        visibilityRules
      );

      setDivisions(hierarchyWithVisibility);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת הנתונים');
    } finally {
      setLoading(false);
    }
  }, []);

  // טעינת קונספטים חיצוניים
  const loadConcepts = useCallback(async () => {
    try {
      const { data: conceptsData, error: conceptsError } = await supabase
        .from('concepts')
        .select(`
          *,
          subconcepts(*)
        `)
        .eq('is_active', true);

      if (conceptsError) throw conceptsError;

      setConcepts(conceptsData || []);
    } catch (err) {
      console.error('Error loading concepts:', err);
    }
  }, []);

  // בדיקת תפקיד המשתמש הנוכחי
  const loadUserRole = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (roleError && roleError.code !== 'PGRST116') {
        throw roleError;
      }

      setUserRole(roleData);
    } catch (err) {
      console.error('Error loading user role:', err);
    }
  }, []);

  // חיפוש שירותים מתקדם
  const searchServices = useCallback(async (filters: SearchFilters) => {
    try {
      let query = supabase
        .from('services')
        .select(`
          *,
          providers(*),
          subcategories(*),
          service_concepts(
            concepts(*),
            subconcepts(*)
          )
        `)
        .eq('is_visible', true);

      // סינון לפי מחיר
      if (filters.price_range) {
        // כאן נוסיף לוגיקת סינון מחיר מתקדמת
      }

      // סינון לפי מספר משתתפים
      if (filters.participant_count) {
        query = query
          .lte('min_participants', filters.participant_count)
          .gte('max_participants', filters.participant_count);
      }

      // סינון לפי אירועי חוץ
      if (filters.is_outdoor_event !== undefined) {
        query = query.eq('is_outdoor_event', filters.is_outdoor_event);
      }

      // סינון לפי מיקום גיאוגרפי
      if (filters.location) {
        query = query.contains('geographic_coverage', [filters.location]);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data || [];
    } catch (err) {
      console.error('Error searching services:', err);
      return [];
    }
  }, []);

  useEffect(() => {
    loadDivisions();
    loadConcepts();
    loadUserRole();
  }, [loadDivisions, loadConcepts, loadUserRole]);

  return {
    divisions,
    concepts,
    userRole,
    loading,
    error,
    searchServices,
    refreshData: () => {
      loadDivisions();
      loadConcepts();
      loadUserRole();
    }
  };
};

// פונקציה לבניית היררכיה עם כללי תצוגה
const buildHierarchyWithVisibility = (
  divisions: any[],
  categories: any[],
  subcategories: any[],
  providers: any[],
  services: any[],
  rules: VisibilityRules
): Division[] => {
  return divisions.map(division => {
    // קטגוריות השייכות לחטיבה
    const divisionCategories = categories
      .filter(cat => cat.division_id === division.id)
      .map(category => {
        // תת-קטגוריות השייכות לקטגוריה
        const categorySubcategories = subcategories
          .filter(sub => sub.category_id === category.id)
          .map(subcategory => {
            // ספקים השייכים לתת-קטגוריה
            const subcategoryProviders = providers
              .filter(provider => 
                provider.provider_subcategories?.some((ps: any) => ps.subcategory_id === subcategory.id)
              )
              .map(provider => {
                // שירותים של הספק בתת-קטגוריה
                const providerServices = services.filter(service => 
                  service.provider_id === provider.id && 
                  service.subcategory_id === subcategory.id &&
                  (!rules.requireActiveServices || service.is_visible)
                );

                return {
                  ...provider,
                  services: providerServices
                };
              })
              // הצגת ספקים רק אם יש להם שירותים זמינים
              .filter(provider => 
                !rules.requireActiveServices || provider.services.length > 0
              );

            return {
              ...subcategory,
              providers: subcategoryProviders
            };
          })
          // הצגת תת-קטגוריות רק אם יש בהן ספקים עם שירותים
          .filter(subcategory => 
            !rules.showEmptySubcategories || subcategory.providers.length > 0
          );

        return {
          ...category,
          subcategories: categorySubcategories
        };
      })
      // הצגת קטגוריות רק אם יש בהן תת-קטגוריות עם תוכן
      .filter(category => 
        !rules.showEmptyCategories || category.subcategories.length > 0
      );

    return {
      ...division,
      categories: divisionCategories
    };
  })
  // הצגת חטיבות רק אם יש בהן קטגוריות עם תוכן
  .filter(division => 
    !rules.showEmptyDivisions || division.categories.length > 0
  );
};
