
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

export const useConceptSystem = () => {
  const [mainConcepts, setMainConcepts] = useState<MainConcept[]>([]);
  const [subConcepts, setSubConcepts] = useState<SubConcept[]>([]);
  const [targetAudiences, setTargetAudiences] = useState<TargetAudience[]>([]);
  const [geographicAreas, setGeographicAreas] = useState<GeographicArea[]>([]);
  const [budgetRanges, setBudgetRanges] = useState<BudgetRange[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMainConcepts = async () => {
    try {
      const { data, error } = await supabase
        .from('main_concepts')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (error) throw error;
      setMainConcepts(data || []);
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
        .eq('is_active', true);

      if (mainConceptId) {
        query = query.eq('main_concept_id', mainConceptId);
      }

      const { data, error } = await query.order('order_index');

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

  const searchServices = async (filters: SearchFilters) => {
    try {
      setLoading(true);
      let query = supabase
        .from('services')
        .select(`
          *,
          providers(*)
        `)
        .eq('is_visible', true)
        .not('base_price', 'is', null);

      // סינון לפי קונספט ראשי
      if (filters.main_concept_id) {
        query = query.contains('main_concept_ids', [filters.main_concept_id]);
      }

      // סינון לפי תתי קונספטים
      if (filters.sub_concept_ids?.length) {
        query = query.overlaps('sub_concept_ids', filters.sub_concept_ids);
      }

      // סינון לפי קהל יעד
      if (filters.target_audience_ids?.length) {
        query = query.overlaps('target_audience_ids', filters.target_audience_ids);
      }

      // סינון לפי אזור גיאוגרפי
      if (filters.geographic_area_id) {
        query = query.contains('geographic_area_ids', [filters.geographic_area_id]);
      }

      // סינון לפי תקציב
      if (filters.budget_range_id) {
        query = query.eq('budget_range_id', filters.budget_range_id);
      }

      // סינון לפי סוגי מיקום
      if (filters.location_types?.length) {
        query = query.overlaps('location_types', filters.location_types);
      }

      // סינון לפי זמינות יומן
      if (filters.available_only) {
        query = query.eq('has_calendar_integration', true);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
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
      loadSubConcepts(),
      loadTargetAudiences(),
      loadGeographicAreas(),
      loadBudgetRanges()
    ]);

    setLoading(false);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return {
    mainConcepts,
    subConcepts,
    targetAudiences,
    geographicAreas,
    budgetRanges,
    loading,
    error,
    loadSubConcepts,
    searchServices,
    refreshData: loadAllData
  };
};
