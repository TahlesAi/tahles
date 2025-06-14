
export interface MainConcept {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  order_index: number;
  is_active: boolean;
  sub_concepts?: SubConcept[];
}

export interface SubConcept {
  id: string;
  main_concept_id: string;
  name: string;
  description?: string;
  order_index: number;
  is_active: boolean;
}

export interface TargetAudience {
  id: string;
  name: string;
  description?: string;
  age_range?: string;
  order_index: number;
  is_active: boolean;
}

export interface GeographicArea {
  id: string;
  name: string;
  description?: string;
  cities: string[];
  order_index: number;
  is_active: boolean;
}

export interface BudgetRange {
  id: string;
  name: string;
  min_amount?: number;
  max_amount?: number;
  description?: string;
  order_index: number;
  is_active: boolean;
}

export interface EnhancedService {
  id: string;
  name: string;
  description?: string;
  provider_id: string;
  base_price?: number;
  main_concept_ids: string[];
  sub_concept_ids: string[];
  target_audience_ids: string[];
  geographic_area_ids: string[];
  budget_range_id?: string;
  location_types: string[];
  service_types: string[];
  duration_category: string;
  service_language: string[];
  auto_assigned_concepts: string[];
  requires_admin_approval: boolean;
  wishlist_enabled: boolean;
  rating_enabled: boolean;
  remote_signing_enabled: boolean;
  is_visible: boolean;
  has_calendar_integration: boolean;
}

export interface ProductPackage {
  id: string;
  name: string;
  description?: string;
  service_ids: string[];
  total_price?: number;
  discount_percentage: number;
  hold_duration_minutes: number;
  is_premium_only: boolean;
}

export interface SearchFilters {
  main_concept_id?: string;
  sub_concept_ids?: string[];
  target_audience_ids?: string[];
  geographic_area_id?: string;
  budget_range_id?: string;
  location_types?: string[];
  service_types?: string[];
  duration_category?: string;
  service_language?: string[];
  min_rating?: number;
  available_only?: boolean;
}
