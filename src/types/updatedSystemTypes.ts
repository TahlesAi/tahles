
// טייפים מעודכנים למערכת החדשה
export interface UpdatedDivision {
  id: string;
  name: string;
  description: string;
  icon: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  categories?: UpdatedCategory[];
}

export interface UpdatedCategory {
  id: string;
  division_id: string;
  name: string;
  description: string;
  icon?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  subcategories?: UpdatedSubcategory[];
}

export interface UpdatedSubcategory {
  id: string;
  category_id: string;
  name: string;
  description: string;
  icon?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  providers?: UpdatedProvider[];
}

export interface UpdatedProvider {
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
  services?: UpdatedService[];
}

export interface UpdatedService {
  id: string;
  provider_id: string;
  subcategory_id: string;
  name: string;
  description: string;
  
  // שדות חובה חדשים
  main_image?: string;
  icon?: string;
  base_price: number;
  pricing_model?: 'fixed' | 'variable' | 'tiered';
  
  // קהלי יעד (חובה)
  target_age_groups?: string[];
  target_gender?: 'mixed' | 'men' | 'women';
  target_religion?: string[];
  
  // פרטי אירוע (חובה)
  budget_range?: string;
  participant_range?: string;
  event_type?: 'business' | 'social' | 'family' | 'children';
  location_type?: 'outdoor' | 'indoor' | 'home' | 'hall';
  is_outdoor_event?: boolean;
  
  // סוג שירות
  service_type?: 'digital' | 'frontal' | 'hybrid';
  service_language?: string[];
  
  // זמינות ויומן (חובה)
  has_calendar_integration?: boolean;
  availability_schedule?: Record<string, any>;
  working_days?: string[];
  working_hours_start?: string;
  working_hours_end?: string;
  
  // זמני הכנה ופירוק
  setup_time_required?: number;
  teardown_time_required?: number;
  travel_time_required?: number;
  
  // תנאי ביטול
  free_cancellation_days?: number;
  
  // מוצרים קשורים
  can_show_similar?: boolean;
  can_show_complementary?: boolean;
  
  // תוספות
  has_addons?: boolean;
  addons?: ServiceAddon[];
  
  // שדות מותאמים אישית
  custom_fields?: Record<string, any>;
  
  // אפשרויות נוספות
  can_duplicate?: boolean;
  is_visible?: boolean;
  
  // שדות נוספים מהטבלה הקיימת
  duration?: string;
  image_url?: string;
  price_range?: string;
  features?: string[];
  technical_requirements?: string[];
  
  created_at: string;
  updated_at: string;
}

export interface ServiceAddon {
  id: string;
  service_id: string;
  name: string;
  description?: string;
  price: number;
  is_required: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceRelationship {
  id: string;
  source_service_id: string;
  related_service_id: string;
  relationship_type: 'similar' | 'complementary';
  created_at: string;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  service_id: string;
  created_at: string;
  service?: UpdatedService;
}

export interface GuidedSearchFilters {
  division_id?: string;
  category_id?: string;
  subcategory_id?: string;
  
  // פילטרים לפי חטיבה
  event_date?: string;
  event_time?: string;
  participant_count?: number;
  budget_range?: string;
  location?: string;
  
  // פילטרים ספציפיים לכרטיסים
  genre?: string;
  date_range?: [string, string];
  ticket_count?: number;
  venue_area?: string;
  
  // פילטרים ספציפיים להעשרה
  delivery_method?: 'frontal' | 'online' | 'hybrid';
  duration?: number;
  language?: string;
  area?: string;
  
  // פילטרים כלליים
  concept_ids?: string[];
  event_type?: 'business' | 'social' | 'family' | 'children';
  location_type?: 'outdoor' | 'indoor' | 'home' | 'hall';
  service_type?: 'digital' | 'frontal' | 'hybrid';
}

export interface VisibilityRules {
  showEmptyDivisions: boolean;
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
