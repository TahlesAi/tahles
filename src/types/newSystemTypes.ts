
// טייפים חדשים למערכת הפנימית המעודכנת

export interface Division {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  categories?: SystemCategory[];
}

export interface SystemCategory {
  id: string;
  division_id: string;
  name: string;
  description?: string;
  icon?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  subcategories?: SystemSubcategory[];
}

export interface SystemSubcategory {
  id: string;
  category_id: string;
  name: string;
  description?: string;
  icon?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  providers?: SystemProvider[];
}

export interface SystemProvider {
  id: string;
  name: string;
  description?: string;
  email?: string;
  phone?: string;
  city?: string;
  is_verified: boolean;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
  subcategory_ids: string[];
  services?: SystemService[];
}

export interface SystemService {
  id: string;
  provider_id: string;
  subcategory_id: string;
  name: string;
  description?: string;
  base_price?: number;
  price_type: 'per_person' | 'per_hour' | 'package' | 'subscription';
  price_range?: string;
  min_participants?: number;
  max_participants?: number;
  duration_minutes?: number;
  geographic_coverage?: string[];
  is_outdoor_event: boolean;
  target_budget_range?: string;
  calendar_required: boolean;
  is_visible: boolean;
  image_url?: string;
  additional_images?: string[];
  audience_ages?: string[];
  technical_requirements?: string[];
  event_types?: string[];
  features?: string[];
  service_areas?: string[];
  created_at: string;
  updated_at: string;
  concepts?: ConceptTag[];
}

export interface ExternalConcept {
  id: string;
  name: string;
  description?: string;
  concept_type: 'אירועי חברה' | 'אירועי משפחה' | 'אירועי חברים' | 'מפגשי ילדים';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  subconcepts?: SubConcept[];
}

export interface SubConcept {
  id: string;
  concept_id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ConceptTag {
  service_id: string;
  concept_id: string;
  subconcept_id?: string;
  concept: ExternalConcept;
  subconcept?: SubConcept;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'מנהל-על' | 'מנהל' | 'ספק' | 'לקוח';
  assigned_at: string;
  assigned_by?: string;
  is_active: boolean;
}

export interface VisibilityRules {
  showEmptyDivisions: boolean;
  showEmptyCategories: boolean;
  showEmptySubcategories: boolean;
  showInactiveProviders: boolean;
  requireActiveServices: boolean;
}

export interface SearchFilters {
  division_id?: string;
  category_id?: string;
  subcategory_id?: string;
  concept_ids?: string[];
  price_range?: string;
  participant_count?: number;
  is_outdoor_event?: boolean;
  location?: string;
  date?: string;
  budget_range?: string;
}
