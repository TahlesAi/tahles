// General Types
export interface SearchSuggestion {
  id: string;
  value: string;
  type?: string;
  icon?: React.ReactNode;
}

// Alias imports from central types
export type {
  User,
  Provider,
  Service,
  SearchResultService,
  Booking,
  BookingRequest,
  Review,
  Commission,
  SystemConfig,
  SearchFilters,
  ProviderProfile,
  ServiceProfile,
  CateringLead
} from '@/types';

// Keep only types that are specific to this module and not duplicated
export interface ProviderProfile {
  id: string;
  userId?: string;
  businessName: string;
  description: string;
  contactPerson: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  website?: string;
  categories: string[];
  logo?: string;
  coverImage?: string;
  gallery: string[];
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  verified?: boolean;
  services?: Service[];
  specialties?: string[];
  yearsExperience?: number;
  insurance?: boolean;
  testimonials?: any[];
}

export interface ServiceProfile {
  id: string;
  providerId: string;
  name: string;
  description: string;
  price: number;
  priceUnit?: string;
  duration?: number;
  maxAttendees?: number;
  images: string[];
  category: string;
  subcategory?: string;
  suitableFor: string[];
  featured?: boolean;
  setupTime?: number;
  audienceSize?: number;
  audienceAges?: string[];
  technicalRequirements?: string[];
  eventTypes?: string[];
  isReceptionService?: boolean;
  videos?: string[];
  additionalImages?: string[];
  additional_images?: string[];
  video_urls?: string[];
  features?: string[];
  additionalOptions?: {
    id: string;
    name: string;
    price: number;
    description?: string;
  }[];
  rating?: number;
  reviewCount?: number;
  location?: string;
  tags?: string[];
}
