
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

// Provider Types
export interface Provider extends BaseEntity {
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
  specialties?: string[];
  yearsExperience?: number;
  insurance?: boolean;
  testimonials?: Testimonial[];
  // Calendar and availability
  calendar?: ProviderCalendar;
  workingHours?: WorkingHours;
  setupTeardownTime?: number; // minutes needed for setup/teardown
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
  isIntegrated: boolean; // האם משולב עם יומן חיצוני
  externalCalendarType?: 'google' | 'outlook' | 'apple' | 'custom';
  defaultAvailableHours: number; // כמה שעות ביום זמין כברירת מחדל
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
  source: 'tachles' | 'external'; // מהיכן הגיעה ההזמנה
  setupTime?: number; // זמן הקמה בדקות
  teardownTime?: number; // זמן פירוק בדקות
}

export interface BlockedSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  isRecurring?: boolean;
}

// Pricing and Inventory Types
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
  // לשירותים מבוססי זמן
  maxConcurrent?: number; // כמה יכול לעבוד במקביל
  cooldownPeriod?: number; // זמן מינימלי בין הופעות (בדקות)
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
  providerId: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  images: string[];
  videos?: string[];
  additionalImages?: string[];
  
  // Pricing
  variants: ProductVariant[];
  basePrice: number; // מחיר בסיס לתצוגה
  priceUnit: string;
  
  // Audience and Suitability
  suitableFor: string[];
  audienceSize?: {
    min: number;
    max: number;
    optimal?: number;
  };
  audienceAges?: string[];
  
  // Technical and Operational
  duration?: number; // משך זמן בסיסי בדקות
  maxAttendees?: number;
  technicalRequirements?: string[];
  setupTime?: number;
  location?: string;
  isReceptionService?: boolean;
  
  // Business
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  features?: string[];
  
  // Availability
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

// Business and Commission Types
export interface Commission {
  rate: number; // 0.05 for 5%
  type: 'percentage' | 'fixed';
  minAmount?: number;
  maxAmount?: number;
  includesProcessingFees: boolean;
}

export interface BusinessMetrics {
  providerId: string;
  totalRevenue: number;
  commissionPaid: number;
  bookingsCount: number;
  averageRating: number;
  popularServices: string[];
  peakSeasons: string[];
}

// Search and Discovery Types
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
  internalRanking?: number; // דירוג פנימי של המערכת
  isPromoted?: boolean;
  // הוספת המאפיינים החסרים שגורמים לשגיאות TypeScript
  audienceSize?: {
    min: number;
    max: number;
    optimal?: number;
  };
  duration?: number;
  technicalRequirements?: string[];
  setupTime?: number;
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
  date: string; // הוספנו את השדה החסר
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

// Provider Onboarding and Automation Types
export interface ProviderLead {
  id: string;
  businessName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  scrapedData?: ScrapedProviderData;
  status: 'discovered' | 'contacted' | 'interested' | 'onboarding' | 'active' | 'rejected';
  source: 'web_scraping' | 'social_media' | 'referral' | 'manual';
  discoveryDate: string;
  lastContact?: string;
}

export interface ScrapedProviderData {
  businessName?: string;
  description?: string;
  services?: string[];
  pricing?: any[];
  images?: string[];
  reviews?: any[];
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  socialProof?: {
    followers?: number;
    posts?: number;
    engagement?: number;
  };
  confidence: number; // 0-1, כמה אמינים הנתונים
}

// System Configuration Types
export interface SystemConfig {
  commission: Commission;
  supportedPaymentMethods: string[];
  minimumBookingNotice: number; // hours
  cancellationPolicy: {
    freeUntilHours: number;
    partialRefundUntilHours: number;
    penaltyPercentage: number;
  };
  autoApprovalThreshold: number; // rating threshold for auto-approval
  featuredServicePrice: number; // מחיר להדגשת שירות
}

// Provider Profile Types
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

// Legacy Types for Compatibility
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

export interface SearchSuggestion {
  id: string;
  value: string;
  type?: string;
  icon?: React.ReactNode;
}
