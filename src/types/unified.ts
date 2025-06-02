
// Base Types
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// User and Authentication Types
export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
  role: 'client' | 'provider' | 'admin';
  phone?: string;
}

// Hebrew Hierarchy Types (הועברו מקובץ hierarchy)
export interface HebrewCategory {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  subcategories?: HebrewSubcategory[];
}

export interface HebrewSubcategory {
  id: string;
  name: string;
  categoryId: string;
  description?: string;
}

export interface HebrewConcept {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  subconcepts?: HebrewSubconcept[];
}

export interface HebrewSubconcept {
  id: string;
  name: string;
  conceptId: string;
  description?: string;
}

export interface HebrewHierarchy {
  categories: HebrewCategory[];
  concepts: HebrewConcept[];
}

// Provider Types
export interface Provider extends BaseEntity {
  userId?: string;
  businessName?: string;
  name?: string;
  description: string;
  contactPerson?: string;
  contact_person?: string;
  email?: string;
  contact_email?: string;
  phone?: string;
  contact_phone?: string;
  address?: string;
  city?: string;
  website?: string;
  categories?: string[];
  category_ids?: string[];
  subcategory_ids?: string[];
  service_type_ids: string[];
  logo?: string;
  logo_url?: string;
  coverImage?: string;
  gallery?: string[];
  rating?: number;
  reviewCount?: number;
  review_count?: number;
  featured?: boolean;
  verified?: boolean;
  is_verified?: boolean;
  specialties?: string[];
  yearsExperience?: number;
  insurance?: boolean;
  testimonials?: Testimonial[];
  calendar?: ProviderCalendar;
  workingHours?: WorkingHours;
  setupTeardownTime?: number;
  services?: Service[];
  serviceAreas?: string[];
  experience?: string;
  socialLinks?: Record<string, string>;
  mediaLinks?: string[];
  clientRecommendations?: string[];
}

// Calendar and Availability Types
export interface WorkingHours {
  [key: string]: {
    start: string;
    end: string;
    available: boolean;
  };
}

export interface ProviderCalendar {
  id: string;
  providerId: string;
  isIntegrated: boolean;
  externalCalendarType?: 'google' | 'outlook' | 'apple' | 'custom';
  defaultAvailableHours: number;
  bookings: CalendarBooking[];
  blockedSlots: BlockedSlot[];
}

export interface CalendarBooking {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  serviceId: string;
  serviceName: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  source: 'tachles' | 'external';
  setupTime?: number;
  teardownTime?: number;
}

export interface BlockedSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  isRecurring?: boolean;
}

// Calendar Slot for provider calendar hooks
export interface CalendarSlot {
  id: string;
  provider_id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  service_area?: string;
  max_bookings: number;
  current_bookings: number;
}

// Pricing and Service Types
export interface PricingRule {
  type: 'audience' | 'distance' | 'duration' | 'kosher' | 'special_requirements' | 'quantity' | 'setup_time' | 'season' | 'day_of_week';
  condition: string;
  modifier: number;
  modifierType: 'fixed' | 'percentage' | 'per_unit';
  description: string;
  isActive: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  basePrice: number;
  priceUnit: 'per_event' | 'per_person' | 'per_hour' | 'per_item' | 'per_day';
  inventory?: InventoryInfo;
  maxQuantity?: number;
  pricingRules: PricingRule[];
  setupRequirements?: SetupRequirements;
}

export interface InventoryInfo {
  type: 'unlimited' | 'limited' | 'time_based';
  currentStock?: number;
  maxStock?: number;
  reorderLevel?: number;
  maxConcurrent?: number;
  cooldownPeriod?: number;
}

export interface SetupRequirements {
  setupTimeMinutes: number;
  teardownTimeMinutes: number;
  requiresTechnicalCrew: boolean;
  requiredSpace?: string;
  powerRequirements?: string;
}

// Service Types
export interface Service extends BaseEntity {
  providerId?: string;
  provider_id: string;
  name: string;
  description: string;
  category?: string;
  category_id: string;
  subcategory?: string;
  subcategory_id: string;
  service_type_id: string;
  images?: string[];
  imageUrl?: string;
  videos?: string[];
  additionalImages?: string[];
  additional_images?: string[];
  variants?: ProductVariant[];
  basePrice?: number;
  price: number;
  priceUnit?: string;
  price_unit: string;
  suitableFor?: string[];
  audienceSize?: {
    min: number;
    max: number;
    optimal?: number;
  };
  audience_size?: string;
  audienceAges?: string[];
  duration?: number;
  maxAttendees?: number;
  technicalRequirements?: string[];
  setupTime?: number;
  location?: string;
  isReceptionService?: boolean;
  featured?: boolean;
  is_featured?: boolean;
  rating?: number;
  reviewCount?: number;
  review_count?: number;
  tags?: string[];
  features?: string[];
  availabilityRules?: AvailabilityRule[];
  additionalOptions?: AdditionalOption[];
}

export interface AvailabilityRule {
  type: 'day_of_week' | 'season' | 'holiday' | 'custom';
  condition: string;
  isAvailable: boolean;
  priceModifier?: number;
}

export interface AdditionalOption {
  id: string;
  name: string;
  price: number;
  description?: string;
  isRequired?: boolean;
  category: 'equipment' | 'time_extension' | 'customization' | 'service';
}

// Search Results and Discovery
export interface SearchResultService {
  id: string;
  name: string;
  provider: string;
  providerId: string;
  description: string;
  price: number;
  priceUnit?: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string;
  subcategory?: string;
  location?: string;
  suitableFor: string[];
  featured?: boolean;
  tags?: string[];
  imageCount?: number;
  videoCount?: number;
  availability?: {
    dates: string[];
    timeSlots?: {
      start: string;
      end: string;
    }[];
  };
  videos?: string[];
  video_urls?: string[];
  additionalImages?: string[];
  additional_images?: string[];
  features?: string[];
  internalRanking?: number;
  isPromoted?: boolean;
  audienceSize?: {
    min: number;
    max: number;
    optimal?: number;
  };
  duration?: number;
  technicalRequirements?: string[];
  setupTime?: number;
}

// Search and Filter Types
export interface SearchFilters {
  category?: string;
  subcategory?: string;
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  audienceSize?: {
    min?: number;
    max?: number;
  };
  eventType?: string;
  date?: string;
  featured?: boolean;
  kosher?: boolean;
  tags?: string[];
}

// Booking Types
export interface BookingRequest {
  serviceId: string;
  userId: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  specialRequests?: string;
  attendees?: number;
  selectedVariant?: string;
  additionalOptions?: string[];
  totalPrice: number;
  commissionAmount: number;
  pricingDetails?: any;
}

export interface Booking extends BookingRequest, BaseEntity {
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  providerConfirmed?: boolean;
  calendarSlotReserved?: boolean;
  commissionPaid?: boolean;
}

// Review Types
export interface Review extends BaseEntity {
  serviceId: string;
  providerId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment?: string;
  date: string;
  verified?: boolean;
  isApproved?: boolean;
  helpfulVotes?: number;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  rating: number;
  company?: string;
  position?: string;
  date?: string;
  isVerified?: boolean;
}

// Category Hierarchy Types
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

// Business Types
export interface Commission {
  rate: number;
  type: 'percentage' | 'fixed';
  minAmount?: number;
  maxAmount?: number;
  includesProcessingFees: boolean;
}

export interface SystemConfig {
  commission: Commission;
  supportedPaymentMethods: string[];
  minimumBookingNotice: number;
  cancellationPolicy: {
    freeUntilHours: number;
    partialRefundUntilHours: number;
    penaltyPercentage: number;
  };
  autoApprovalThreshold: number;
  featuredServicePrice: number;
}

// Profile Types
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

// Utility Types
export interface SearchSuggestion {
  id: string;
  value: string;
  type?: string;
  icon?: React.ReactNode;
}

// Legacy support
export interface CateringLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  kosher?: string;
  menu_type?: string;
  regions?: string[];
  guest_count?: number;
  event_date?: Date;
  budget_range?: number[];
  allow_marketing: boolean;
  created_at: string;
}

export type AudienceSize = '0-30' | '31-50' | '51-100' | '101-200' | '201-500' | '500+';
