// General Types
export interface SearchSuggestion {
  id: string;
  value: string;
  type?: string;
  icon?: React.ReactNode;
}

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'client' | 'provider' | 'admin';
}

// Search related types
export interface SearchResultService {
  id: string;
  name: string;
  provider: string;
  providerId?: string;
  description: string;
  price: number;
  priceUnit?: string; // e.g. "per hour", "per event"
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string;
  subcategory?: string;
  location?: string;
  suitableFor: string[]; // concepts/event types
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
  // הוספת שדות נוספים שנמצאים בשימוש
  videos?: string[];
  video_urls?: string[];
  additionalImages?: string[];
  additional_images?: string[];
  features?: string[];
}

// Booking related types
export interface BookingRequest {
  serviceId: string;
  userId: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  specialRequests?: string;
  attendees?: number;
  totalPrice: number;
}

export interface Booking extends BookingRequest {
  id: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

// Provider related types
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

export interface Service {
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
  eventTypes?: string[]; // רווקים, חתונות, מצטיינים, ימי זיכרון
  isReceptionService?: boolean; // האם זה שירות של קבלת פנים
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
}

// Review related types
export interface Review {
  id: string;
  serviceId: string;
  providerId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment?: string;
  date: string;
  verified?: boolean;
}

// Add the catering lead type
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
