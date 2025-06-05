
// סכמת המערכת החדשה לפי הדרישות המעודכנות
export interface NewSystemCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewSystemSubcategory {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  icon?: string;
  order: number;
  customFields: CustomField[];
  requiredFields: string[];
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'multiselect' | 'date' | 'file';
  required: boolean;
  options?: string[]; // עבור select/multiselect
  validation?: FieldValidation;
  displayOrder: number;
}

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  fileTypes?: string[];
}

// קונספטים חדשים עם שיוך לסוגי אירועים
export interface EventConcept {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  eventTypes: EventType[];
  isActive: boolean;
  usageCount: number; // כמה פעמים נבחר
  created_at: string;
  updated_at: string;
}

export type EventType = 'אירוע חברה' | 'אירוע משפחתי' | 'אירוע חברים' | 'מפגש ילדים';

// ספק במבנה החדש
export interface NewSystemProvider {
  id: string;
  created_at: string;
  updated_at: string;
  
  // פרטים בסיסיים
  name: string;
  description: string;
  profileImage?: string;
  coverImage?: string;
  promotionalVideo?: string;
  
  // יצירת קשר
  email: string;
  phone: string;
  website?: string;
  
  // מיקום ואזורי שירות
  city: string;
  serviceAreas: string[];
  
  // קהלי יעד ושפות
  targetAudiences: TargetAudience[];
  languages: string[];
  
  // זמינות
  calendarSettings: CalendarSettings;
  defaultAvailability: ProviderAvailability;
  specialAvailability: SpecialAvailability[];
  
  // תדמית ושיווק
  mediaGallery: MediaItem[];
  clientTestimonials: ClientTestimonial[];
  pressArticles: PressArticle[];
  
  // דירוגים ונתונים עסקיים
  overallRating: number;
  totalReviews: number;
  totalBookings: number;
  
  // מסמכים ואימותים
  businessDocuments: BusinessDocument[];
  
  // מצב ספק
  status: 'active' | 'frozen' | 'deleted';
  isVerified: boolean;
  verificationDate?: string;
  
  // שיוך למוצרים (נקבע אוטומטית)
  subcategoryIds: string[]; // מחושב לפי המוצרים
}

export type TargetAudience = 'ילדים' | 'מבוגרים' | 'דתיים' | 'נשים' | 'גברים' | 'גיל שלישי' | 'חיילים' | 'רב-גוני';

// מוצר במבנה החדש
export interface NewSystemProduct {
  id: string;
  providerId: string;
  subcategoryId: string;
  created_at: string;
  updated_at: string;
  
  // פרטים בסיסיים
  name: string;
  description: string;
  mainImage: string;
  promotionalVideo?: string;
  coverImage?: string;
  imageGallery: string[];
  
  // קהלי יעד
  targetAudiences: TargetAudience[];
  
  // מחירים ווריאנטים
  basePrice: number;
  priceUnit: 'per_event' | 'per_hour' | 'per_person' | 'per_day';
  variants: ProductVariant[];
  
  // תוקף והזמנות
  offerValidityDays?: number; // תוקף להצעה
  isRecurring: boolean; // שירותים חודשיים
  
  // זמינות חכמה
  smartCalendar: ProductAvailability;
  
  // דירוגים
  productRating: number;
  productReviews: number;
  
  // תנאי סחר
  terms: TradingTerms;
  paymentType: 'immediate' | 'subscription';
  
  // היסטוריה
  totalBookings: number;
  
  // תקשורת וחשיפה
  pressArticles: PressArticle[];
  
  // מסמכים נדרשים
  requiredDocuments: RequiredDocument[];
  
  // קונספטים
  conceptIds: string[]; // לפחות אחד נדרש
  
  // שדות מותאמים אישית (לפי תת-קטגוריה)
  customFieldValues: Record<string, any>;
  
  // מצב מוצר
  status: 'active' | 'hidden' | 'out_of_stock';
  isAvailable: boolean; // חושב אוטומטית
  canChargeImmediately: boolean; // חובה = true
}

export interface ProductVariant {
  id: string;
  name: string;
  priceModifier: number;
  modifierType: 'fixed' | 'percentage';
  description?: string;
  isDefault: boolean;
}

export interface ProductAvailability {
  connectedCalendar: boolean;
  calendarRules: CalendarRule[];
  blockedDates: BlockedDate[];
  workingHours: WorkingHours;
}

export interface CalendarRule {
  type: 'shabbat_observer' | 'holidays' | 'custom';
  isActive: boolean;
  settings: Record<string, any>;
}

export interface BlockedDate {
  date: string;
  reason: string;
  isRecurring: boolean;
}

export interface WorkingHours {
  [key: string]: {
    isWorking: boolean;
    startTime?: string;
    endTime?: string;
  };
}

export interface TradingTerms {
  cancellationPolicy: string;
  refundPolicy: string;
  advanceNotice: number; // ימים
  setupRequirements: string[];
}

export interface RequiredDocument {
  type: 'business_registration' | 'license' | 'insurance' | 'other';
  name: string;
  isRequired: boolean;
  expiryDate?: string;
  reminderDays: number; // התראה לפני פקיעה
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title?: string;
  description?: string;
  order: number;
}

export interface ClientTestimonial {
  id: string;
  clientName: string;
  text: string;
  rating: number;
  date: string;
  isVerified: boolean;
  imageUrl?: string;
}

export interface PressArticle {
  id: string;
  title: string;
  publication: string;
  url: string;
  date: string;
  excerpt?: string;
}

export interface BusinessDocument {
  id: string;
  type: 'accounting_approval' | 'business_license' | 'tax_exemption' | 'id_document';
  name: string;
  fileUrl: string;
  expiryDate?: string;
  isValid: boolean;
  reminderDays: number;
}

export interface CalendarSettings {
  integratedCalendar: boolean;
  calendarType?: 'google' | 'outlook' | 'apple' | 'custom';
  syncFrequency: number; // דקות
  lastSync?: string;
}

export interface ProviderAvailability {
  workingDays: string[];
  workingHours: {
    start: string;
    end: string;
  };
  isFlexible: boolean;
}

export interface SpecialAvailability {
  id: string;
  date: string;
  isAvailable: boolean;
  reason: string;
  specialHours?: {
    start: string;
    end: string;
  };
}

// חוקים עסקיים
export interface BusinessRules {
  hideUnavailableProducts: boolean;
  requireImmediatePayment: boolean;
  noCustomPricingOnly: boolean;
  requireClearPricing: boolean;
  ratingsAffectFiltering: boolean;
  enableProductComparison: boolean;
  enableWishlist: boolean;
  requireSMSVerification: boolean;
  requireProviderIDVerification: boolean;
  enableCRMIntegration: boolean;
  hideBrandingDuringLaunch: boolean;
}

// מערכת Wishlist
export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  providerId: string;
  addedDate: string;
  notes?: string;
}

// מערכת תזכורות
export interface DocumentReminder {
  id: string;
  providerId: string;
  documentType: string;
  expiryDate: string;
  reminderDate: string;
  isActive: boolean;
  reminderSent: boolean;
}
