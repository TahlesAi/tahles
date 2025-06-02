
// סכמת נתונים מורחבת עם תמיכה בכל הדרישות החדשות
export interface ExtendedProviderProfile {
  id: string;
  created_at: string;
  updated_at: string;
  
  // פרטים בסיסיים
  name: string;
  businessName: string;
  description: string;
  contactPerson: string;
  email: string;
  phone: string;
  address?: string;
  city: string;
  
  // קטגוריות מרובות
  primaryCategoryId: string;
  secondaryCategoryIds: string[];
  subcategoryIds: string[];
  
  // מזהים ייחודיים
  businessId?: string; // ח.פ/ע.מ
  taxId?: string;
  licenseNumber?: string;
  
  // מאפיינים
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured: boolean;
  
  // סימונים מיוחדים
  isMock: boolean; // סימון פיקטיבי
  simulationType?: 'demo' | 'completion' | 'testing';
  
  // יומן וזמינות
  calendarActive: boolean;
  hasAvailableCalendar: boolean;
  defaultCalendar: DefaultCalendarSettings;
  workingHours: WorkingHoursConfig;
  
  // שירותים
  services: ExtendedServiceProfile[];
  
  // נתונים נוספים
  gallery: string[];
  logo?: string;
  coverImage?: string;
  testimonials: Testimonial[];
  
  // מטא-דאטה
  lastSync?: string;
  dataIntegrity: DataIntegrityStatus;
}

export interface ExtendedServiceProfile {
  id: string;
  providerId: string;
  created_at: string;
  updated_at: string;
  
  // פרטים בסיסיים
  name: string;
  description: string;
  
  // קטגוריות מרובות
  primaryCategoryId: string;
  secondaryCategoryIds: string[];
  subcategoryId: string;
  
  // תיוג מושגים מרובה
  conceptTags: string[];
  eventTypes: string[];
  audienceTypes: string[];
  
  // מחירים וזמנים
  price: number;
  priceUnit: string;
  duration?: number;
  setupTime: number;
  
  // זמינות ותכולה
  available: boolean;
  maxConcurrentBookings: number;
  softHoldDuration: number; // דקות לחסימה זמנית
  
  // מאפיינים
  rating: number;
  reviewCount: number;
  featured: boolean;
  
  // מטא-דאטה
  isMock: boolean;
  tags: string[];
  technicalRequirements: string[];
  suitableFor: string[];
  
  // מדיה
  imageUrl: string;
  additionalImages: string[];
  videos: string[];
  
  // זמינות מתקדמת
  availabilitySlots: AvailabilitySlot[];
  softHolds: SoftHold[];
}

export interface DefaultCalendarSettings {
  workingDays: DayOfWeek[];
  startTime: string;
  endTime: string;
  breakTimes: BreakTime[];
  holidaySettings: HolidaySettings;
  shabbatSettings: ShabbatSettings;
}

export interface WorkingHoursConfig {
  sunday: DaySchedule;
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
}

export interface DaySchedule {
  isWorking: boolean;
  startTime?: string;
  endTime?: string;
  breaks: BreakTime[];
}

export interface BreakTime {
  startTime: string;
  endTime: string;
  reason?: string;
}

export interface HolidaySettings {
  observeJewishHolidays: boolean;
  observeNationalHolidays: boolean;
  customHolidays: CustomHoliday[];
}

export interface ShabbatSettings {
  observeShabbat: boolean;
  startTime: string; // זמן כניסת שבת
  endTime: string; // זמן יציאת שבת
  bufferMinutes: number; // זמן חישוב מראש
}

export interface CustomHoliday {
  id: string;
  name: string;
  date: string;
  isRecurring: boolean;
  type: 'full_day' | 'partial';
  startTime?: string;
  endTime?: string;
}

export interface SoftHold {
  id: string;
  serviceId: string;
  providerId: string;
  holderId: string; // מזהה המשתמש שמחזיק
  startTime: string;
  expiresAt: string;
  reason: 'booking_process' | 'comparison' | 'consultation';
  isActive: boolean;
}

export interface DataIntegrityStatus {
  lastCheck: string;
  hasErrors: boolean;
  errors: DataIntegrityError[];
  warnings: DataIntegrityWarning[];
  score: number; // 0-100
}

export interface DataIntegrityError {
  type: 'missing_field' | 'invalid_reference' | 'duplicate' | 'conflict';
  field: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface DataIntegrityWarning {
  type: 'incomplete_data' | 'outdated' | 'suspicious';
  field: string;
  message: string;
  suggestion?: string;
}

export type DayOfWeek = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
}

export interface AvailabilitySlot {
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxBookings: number;
  currentBookings: number;
  softHolds: number;
}
