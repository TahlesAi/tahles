
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

      // Apply filters
      if (filters.main_concept_id) {
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

      // Transform data to match EnhancedService interface
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
