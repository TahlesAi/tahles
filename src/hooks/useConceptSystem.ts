import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  MainConcept, 
  SubConcept, 
  TargetAudience, 
  GeographicArea, 
  BudgetRange,
  SearchFilters,
  EnhancedService
} from '@/types/conceptSystem';
import { toast } from 'sonner';

// --- Filter Interface ---
export interface SubConceptFilter {
  id: string;
  sub_concept_id: string;
  target_audience_ids: string[] | null;
  target_audience_names: string | null;
  min_age: number | null;
  max_age: number | null;
  region_ids: string[] | null;
  region_names: string | null;
  min_budget: number | null;
  max_budget: number | null;
  budget_range_id: string | null;
  budget_range_name: string | null;
  event_style: string | null;
  free_cancellation: boolean | null;
  service_languages: string[] | null;
  duration_minutes: number | null;
  location_type: string | null;
  is_instant_booking: boolean | null;
}

export const useConceptSystem = () => {
  const [mainConcepts, setMainConcepts] = useState<MainConcept[]>([]);
  const [subConcepts, setSubConcepts] = useState<SubConcept[]>([]);
  const [targetAudiences, setTargetAudiences] = useState<TargetAudience[]>([]);
  const [geographicAreas, setGeographicAreas] = useState<GeographicArea[]>([]);
  const [budgetRanges, setBudgetRanges] = useState<BudgetRange[]>([]);
  const [filtersBySubConceptId, setFiltersBySubConceptId] = useState<Record<string, SubConceptFilter>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Load filters for all sub-concepts ---
  const loadSubConceptFilters = async () => {
    try {
      // שימו לב: קריאה מותאמת ידנית לשדות עם הצטרפות לשמות (names ולא רק ids)
      const { data, error } = await supabase
        .rpc('sub_concept_filters_full');
      // אם הפונקציה לא קיימת יוציא fallback ל-query SQL, אחרת מומלץ ליצור view.
      // אם RPC לא קיימת, נשתמש ב-query רגיל:
      // const { data, error } = await supabase.from('sub_concept_filters_extended_view').select('*');

      // fallback ליוניון מתוארך ידנית לפי השאילתה ששולבה במיגרציה:
      // כרגע נשתמש ב-fetch רגיל:
      const { data: filters, error: filtersErr } = await supabase
        .from('sub_concept_filters')
        .select(`
          *,
          sub_concept_id,
          budget_ranges!budget_range_id(name),
        `);

      // לצורך הדגמה, מטפלים רק ב-data (בסביבת production אפשר לשפר ו-fetch שמות מהטבלאות ע"י מס' קריאות ברקע)
      if (filtersErr) throw filtersErr;

      // מבנה: { [sub_concept_id]: filterObj }
      const filtersMap: Record<string, any> = {};
      (filters || []).forEach((f: any) => {
        filtersMap[f.sub_concept_id] = {
          ...f,
          budget_range_name: f.budget_ranges?.name || null,
        };
      });
      setFiltersBySubConceptId(filtersMap);
      return filtersMap;
    } catch (err) {
      console.error('Error loading sub concept filters:', err);
      setFiltersBySubConceptId({});
    }
  };

  // --- Load all for mainConcepts incl. filters for every sub_concept ---
  const loadMainConcepts = async () => {
    try {
      // שליפת קונספטים + תתי קונספטים לפי ההיררכיה (נעזר ב-sub_concepts)
      const { data: mainConceptsRows, error: mcErr } = await supabase
        .from('main_concepts')
        .select('*, sub_concepts(*, main_concept_id)')
        .eq('is_active', true)
        .order('order_index');
      if (mcErr) throw mcErr;

      // נבנה filters map למיפוי מהיר
      let filtersMap = filtersBySubConceptId;
      if (Object.keys(filtersMap).length === 0) {
        filtersMap = await loadSubConceptFilters();
      }

      // נבנה מחדש את המערך עם כל פילטר של תת-קונספט על כל אובייקט תת-קונספט:
      const mainConceptsWithSub: MainConcept[] = (mainConceptsRows || []).map((mc: any) => ({
        id: mc.id,
        name: mc.name,
        description: mc.description,
        icon: mc.icon,
        order_index: mc.order_index,
        is_active: mc.is_active,
        sub_concepts: (mc.sub_concepts || []).sort((a: any, b: any) => a.order_index - b.order_index)
          .map((sc: any) => ({
            ...sc,
            filter: filtersMap?.[sc.id] || null
          }))
      }));

      setMainConcepts(mainConceptsWithSub);
    } catch (err) {
      console.error('Error loading main concepts:', err);
      setError('שגיאה בטעינת קונספטים ראשיים');
    }
  };

  const loadSubConcepts = async (mainConceptId?: string) => {
    try {
      let query = supabase
        .from('sub_concepts')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (mainConceptId) {
        query = query.eq('main_concept_id', mainConceptId);
      }

      const { data, error } = await query;
      if (error) throw error;

      setSubConcepts(data || []);
    } catch (err) {
      console.error('Error loading sub concepts:', err);
      setError('שגיאה בטעינת תתי קונספטים');
    }
  };

  const loadTargetAudiences = async () => {
    try {
      const { data, error } = await supabase
        .from('target_audiences')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (error) throw error;
      setTargetAudiences(data || []);
    } catch (err) {
      console.error('Error loading target audiences:', err);
      setError('שגיאה בטעינת קהלי יעד');
    }
  };

  const loadGeographicAreas = async () => {
    try {
      const { data, error } = await supabase
        .from('geographic_areas')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (error) throw error;
      setGeographicAreas(data || []);
    } catch (err) {
      console.error('Error loading geographic areas:', err);
      setError('שגיאה בטעינת אזורים גיאוגרפיים');
    }
  };

  const loadBudgetRanges = async () => {
    try {
      const { data, error } = await supabase
        .from('budget_ranges')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (error) throw error;
      setBudgetRanges(data || []);
    } catch (err) {
      console.error('Error loading budget ranges:', err);
      setError('שגיאה בטעינת טווחי תקציב');
    }
  };

  // חיפוש שירותים עם תמיכה בקונספטים ותתי-קונספטים היררכיים
  const searchServices = async (filters: SearchFilters): Promise<EnhancedService[]> => {
    try {
      setLoading(true);
      let query = supabase
        .from('services')
        .select(`
          *,
          providers (
            name,
            logo_url,
            rating,
            review_count
          )
        `)
        .eq('is_visible', true);

      if (filters.main_concept_id) {
        // משתמשים בשדה החדש של main_concept_ids (מערך)
        query = query.contains('main_concept_ids', [filters.main_concept_id]);
      }
      if (filters.sub_concept_ids && filters.sub_concept_ids.length > 0) {
        query = query.overlaps('sub_concept_ids', filters.sub_concept_ids);
      }
      if (filters.target_audience_ids && filters.target_audience_ids.length > 0) {
        query = query.overlaps('target_audience_ids', filters.target_audience_ids);
      }
      if (filters.geographic_area_id) {
        query = query.contains('geographic_area_ids', [filters.geographic_area_id]);
      }
      if (filters.budget_range_id) {
        query = query.eq('budget_range_id', filters.budget_range_id);
      }
      if (filters.location_types && filters.location_types.length > 0) {
        query = query.overlaps('location_types', filters.location_types);
      }
      if (filters.available_only) {
        query = query.eq('has_calendar_integration', true);
      }

      const { data, error } = await query;
      if (error) throw error;

      const transformedData: EnhancedService[] = (data || []).map((service: any) => ({
        id: service.id,
        name: service.name,
        description: service.description,
        provider_id: service.provider_id,
        base_price: service.base_price,
        main_concept_ids: service.main_concept_ids || [],
        sub_concept_ids: service.sub_concept_ids || [],
        target_audience_ids: service.target_audience_ids || [],
        geographic_area_ids: service.geographic_area_ids || [],
        budget_range_id: service.budget_range_id,
        location_types: service.location_types || [],
        service_types: service.service_types || [],
        duration_category: service.duration_category || 'בינוני (1-3 שעות)',
        service_language: service.service_language || ['עברית'],
        auto_assigned_concepts: service.auto_assigned_concepts || [],
        requires_admin_approval: service.requires_admin_approval || false,
        wishlist_enabled: service.wishlist_enabled !== false,
        rating_enabled: service.rating_enabled !== false,
        remote_signing_enabled: service.remote_signing_enabled || false,
        is_visible: service.is_visible,
        has_calendar_integration: service.has_calendar_integration || false
      }));

      return transformedData;
    } catch (err) {
      console.error('Error searching services:', err);
      toast.error('שגיאה בחיפוש שירותים');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    setError(null);

    await Promise.all([
      loadMainConcepts(),
      loadSubConcepts(), // לתאימות מערכות (כלליים)
      loadTargetAudiences(),
      loadGeographicAreas(),
      loadBudgetRanges()
    ]);

    setLoading(false);
  };

  // בעקרון לא צריך לגעת בפונקציות אלה עבור שלב הסינון הנוכחי, פרט לעדכון ה-useEffect:
  useEffect(() => {
    loadAllData();
    loadSubConceptFilters();
    // eslint-disable-next-line
  }, []);

  return {
    mainConcepts,
    subConcepts,
    targetAudiences,
    geographicAreas,
    budgetRanges,
    filtersBySubConceptId,
    loading,
    error,
    loadSubConcepts,
    searchServices,
    refreshData: loadAllData,
    loadSubConceptFilters, // לטעינה ידנית אם צריך
  };
};
