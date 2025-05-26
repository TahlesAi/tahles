
// Hierarchical Data Types
export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  image_url?: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  image_url?: string;
  category_id: string;
  service_types?: ServiceType[];
}

export interface ServiceType {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  subcategory_id: string;
  providers?: Provider[];
}

export interface Provider {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  contact_email: string;
  contact_phone: string;
  contact_person?: string;
  address?: string;
  city?: string;
  website?: string;
  rating?: number;
  review_count?: number;
  subcategory_ids: string[];
  category_ids: string[];
  service_type_ids: string[];
  services?: Service[];
  is_verified: boolean;
  serviceAreas?: string[];
  experience?: string;
  specialties?: string[];
  testimonials?: Array<{
    id: string;
    text: string;
    author: string;
    rating: number;
  }>;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  mediaLinks?: Array<{
    id: string;
    title: string;
    url: string;
    source: string;
    date?: string;
  }>;
  clientRecommendations?: Array<{
    id: string;
    clientName: string;
    company: string;
    position?: string;
    logoUrl?: string;
    recommendation: string;
  }>;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  price_unit?: string;
  price_range?: string;
  imageUrl: string;
  additional_images?: string[];
  provider_id: string;
  category_id: string;
  subcategory_id: string;
  service_type_id: string;
  rating?: number;
  review_count?: number;
  tags?: string[];
  is_featured?: boolean;
  suitableFor?: string[]; // Event concepts
  audience_size?: string;
  audience_ages?: string[];
  location?: string;
  duration?: string;
  videos?: string[]; 
  technical_requirements?: string[];
}

// Hebrew Hierarchy Types
export interface HebrewSubcategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  categoryId: string;
}

export interface HebrewCategory {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  subcategories: HebrewSubcategory[];
}

export interface HebrewSubconcept {
  id: string;
  name: string;
  conceptId: string;
  description?: string;
  icon?: string;
}

export interface HebrewConcept {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  subconcepts: HebrewSubconcept[];
}

export interface HebrewHierarchy {
  categories: HebrewCategory[];
  concepts: HebrewConcept[];
}

export type AudienceSize = '0-30' | '31-50' | '51-100' | '101-200' | '201-500' | '500+';
