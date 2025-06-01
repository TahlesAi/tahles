
// Unified types for the entire system with hierarchical relationships

export interface UnifiedCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  image_url?: string;
  subcategories: UnifiedSubcategory[];
  created_at?: string;
  updated_at?: string;
}

export interface UnifiedSubcategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  image_url?: string;
  category_id: string; // Required - must belong to a category
  providers: UnifiedProvider[];
  created_at?: string;
  updated_at?: string;
}

export interface UnifiedProvider {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  cover_image?: string;
  contact_email: string;
  contact_phone: string;
  contact_person?: string;
  address?: string;
  city?: string;
  website?: string;
  rating?: number;
  review_count?: number;
  subcategory_ids: string[]; // Required - must belong to at least one subcategory
  is_verified: boolean;
  services: UnifiedService[];
  // Profile data
  gallery: string[];
  experience?: string;
  specialties?: string[];
  testimonials?: Array<{
    id: string;
    text: string;
    author: string;
    rating: number;
    company?: string;
    position?: string;
  }>;
  social_links?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  media_links?: Array<{
    id: string;
    title: string;
    url: string;
    source: string;
    date?: string;
  }>;
  created_at?: string;
  updated_at?: string;
}

export interface UnifiedService {
  id: string;
  name: string;
  description: string;
  provider_id: string; // Required - must belong to a provider
  category_id: string;
  subcategory_id: string;
  images: string[];
  videos?: string[];
  base_price: number;
  price_unit: string;
  // Audience and suitability
  suitable_for: string[];
  audience_size?: {
    min: number;
    max: number;
    optimal?: number;
  };
  audience_ages?: string[];
  // Technical details
  duration?: number;
  technical_requirements?: string[];
  setup_time?: number;
  is_reception_service?: boolean;
  // Business
  featured?: boolean;
  rating?: number;
  review_count?: number;
  tags?: string[];
  features?: string[];
  // Flexible pricing variants
  pricing_variants: PricingVariant[];
  created_at?: string;
  updated_at?: string;
}

export interface PricingVariant {
  id: string;
  name: string;
  description?: string;
  base_price: number;
  price_modifiers: PriceModifier[];
}

export interface PriceModifier {
  type: 'geographic_zone' | 'attendee_count' | 'event_type' | 'addon' | 'duration';
  condition: string;
  modifier: number;
  modifier_type: 'fixed' | 'percentage' | 'per_unit';
  description: string;
}

// Validation functions to ensure hierarchical integrity
export function validateProvider(provider: Partial<UnifiedProvider>): string[] {
  const errors: string[] = [];
  
  if (!provider.subcategory_ids || provider.subcategory_ids.length === 0) {
    errors.push('Provider must belong to at least one subcategory');
  }
  
  if (!provider.contact_email) {
    errors.push('Provider must have contact email');
  }
  
  if (!provider.contact_phone) {
    errors.push('Provider must have contact phone');
  }
  
  return errors;
}

export function validateService(service: Partial<UnifiedService>): string[] {
  const errors: string[] = [];
  
  if (!service.provider_id) {
    errors.push('Service must belong to a provider');
  }
  
  if (!service.category_id) {
    errors.push('Service must belong to a category');
  }
  
  if (!service.subcategory_id) {
    errors.push('Service must belong to a subcategory');
  }
  
  return errors;
}

export function validateSubcategory(subcategory: Partial<UnifiedSubcategory>): string[] {
  const errors: string[] = [];
  
  if (!subcategory.category_id) {
    errors.push('Subcategory must belong to a category');
  }
  
  return errors;
}
