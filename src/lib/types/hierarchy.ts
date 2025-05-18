
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
  address?: string;
  website?: string;
  rating?: number;
  review_count?: number;
  subcategory_ids: string[];
  category_ids: string[];
  service_type_ids: string[];
  services?: Service[];
  is_verified: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  price_unit?: string;
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
  audience_size?: AudienceSize;
  location?: string;
}

export type AudienceSize = 
  | "0-30"
  | "31-50" 
  | "51-100"
  | "101-200"
  | "201-300"
  | "301-500"
  | "500+";
