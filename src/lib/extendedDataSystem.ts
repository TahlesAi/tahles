
import { 
  ExtendedProviderProfile, 
  ExtendedServiceProfile,
  DataIntegrityStatus 
} from '@/types/extendedSchema';
import { generateDefaultCalendar, generateDefaultWorkingHours, generateAvailabilitySlots } from '@/utils/defaultCalendarGenerator';
import { runDataIntegrityCheck } from '@/utils/dataIntegrityChecker';

export class ExtendedDataSystem {
  private providers: ExtendedProviderProfile[] = [];
  private services: ExtendedServiceProfile[] = [];
  private integrityStatus: DataIntegrityStatus | null = null;
  private cache: Map<string, any> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 דקות

  constructor() {
    this.initializeSystem();
  }

  private initializeSystem() {
    // יצירת נתונים בסיסיים לדוגמה
    this.createSampleData();
    
    // הרצה ראשונית של בדיקת שלמות
    this.runIntegrityCheck();
  }

  // מתודה מועדפת לCache
  private getCachedData<T>(key: string, generator: () => T): T {
    const now = Date.now();
    const expiry = this.cacheExpiry.get(key);
    
    if (expiry && now < expiry && this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    const data = generator();
    this.cache.set(key, data);
    this.cacheExpiry.set(key, now + this.CACHE_DURATION);
    
    return data;
  }

  private createSampleData() {
    // יצירת ספק לדוגמה (מעודכן עם שדות נוספים)
    const sampleProvider: ExtendedProviderProfile = {
      id: 'provider-sample-001',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      
      name: 'נטע ברסלר - אמן המחשבות',
      businessName: 'נטע ברסלר - אמן המחשבות בע"מ',
      description: 'מנטליסט מקצועי עם ניסיון של 15 שנה בתחום אומני החושים. מתמחה במופעים אינטראקטיביים המשלבים קריאת מחשבות, ניחוש ופעלולי מנטליזם מרהיבים.',
      contactPerson: 'נטע ברסלר',
      email: 'neta@example.com',
      phone: '050-1234567',
      city: 'תל אביב',
      address: 'רחוב הבימה 15, תל אביב',
      
      primaryCategoryId: 'cat-008',
      secondaryCategoryIds: ['cat-009'],
      subcategoryIds: ['cat-008-sub-1', 'cat-008-sub-2'],
      
      businessId: '123456789', // ח.פ
      taxId: '123456789',
      
      rating: 4.8,
      reviewCount: 156,
      verified: true,
      featured: true,
      
      isMock: true, // מסומן כפיקטיבי
      isSimulated: true, // הוספת השדה החסר
      simulationType: 'demo',
      
      calendarActive: true,
      hasAvailableCalendar: true,
      defaultCalendar: generateDefaultCalendar('provider-sample-001'),
      workingHours: generateDefaultWorkingHours(),
      
      services: [],
      gallery: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
      ],
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
      testimonials: [
        {
          id: 'test-001',
          text: 'מופע מדהים! נטע הצליח לקרוא את המחשבות של כל האורחים. האווירה הייתה מהממת והכל נהנו מאוד!',
          author: 'יעל כהן',
          rating: 5,
          date: '2024-01-15',
          verified: true
        },
        {
          id: 'test-002',
          text: 'מקצועיות ברמה גבוהה, הגיע בזמן והיה מוכן לחלוטין. המופע עצמו היה פשוט מרהיב!',
          author: 'דני לוי',
          rating: 5,
          date: '2024-01-10',
          verified: true
        }
      ],
      
      dataIntegrity: {
        lastCheck: new Date().toISOString(),
        hasErrors: false,
        errors: [],
        warnings: [],
        score: 95
      }
    };

    // יצירת שירות לדוגמה (מעודכן)
    const sampleService: ExtendedServiceProfile = {
      id: 'service-sample-001',
      providerId: 'provider-sample-001',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      
      name: 'מופע מנטליזם מרכזי',
      description: 'מופע מרתק של קריאת מחשבות ומנטליזם לכל סוגי האירועים. כולל אינטראקציה עם הקהל, ניחושים מדויקים ופעלולי מנטליזם מרהיבים.',
      
      primaryCategoryId: 'cat-008',
      secondaryCategoryIds: [],
      subcategoryId: 'cat-008-sub-1',
      
      conceptTags: ['יום הולדת', 'בר מצווה', 'אירועי חברה', 'ערב גיבוש', 'חתונה'],
      eventTypes: ['מופע מרכזי', 'אינטראקטיבי'],
      audienceTypes: ['מבוגרים', 'נוער'],
      
      price: 2500,
      priceUnit: 'לאירוע',
      duration: 45,
      setupTime: 15,
      
      available: true,
      maxConcurrentBookings: 1,
      softHoldDuration: 15,
      
      rating: 4.9,
      reviewCount: 89,
      featured: true,
      
      isMock: true,
      isSimulated: true, // הוספת השדה החסר
      tags: ['מנטליזם', 'קריאת מחשבות', 'בידור', 'אינטראקטיבי'],
      technicalRequirements: ['מיקרופון', 'במה מוגבהת (רצוי)', 'תאורה בסיסית'],
      suitableFor: ['אירועי חברה', 'חתונות', 'בר מצווה', 'ימי הולדת'],
      
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      additionalImages: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400'
      ],
      videos: ['https://example.com/sample-video.mp4'],
      
      availabilitySlots: generateAvailabilitySlots(
        generateDefaultCalendar('provider-sample-001'),
        generateDefaultWorkingHours()
      ),
      softHolds: []
    };

    this.providers = [sampleProvider];
    this.services = [sampleService];
    
    // עדכון השירות בתוך הספק
    this.providers[0].services = [sampleService];
  }

  // API ציבורי - מעודכן עם Cache
  public getProviders(): ExtendedProviderProfile[] {
    return this.getCachedData('all-providers', () => [...this.providers]);
  }

  public getServices(): ExtendedServiceProfile[] {
    return this.getCachedData('all-services', () => [...this.services]);
  }

  public addProvider(provider: ExtendedProviderProfile): void {
    this.providers.push(provider);
    this.clearCache();
    this.runIntegrityCheck();
  }

  public addService(service: ExtendedServiceProfile): void {
    this.services.push(service);
    
    // עדכון השירות גם בספק
    const provider = this.providers.find(p => p.id === service.providerId);
    if (provider) {
      provider.services = provider.services || [];
      provider.services.push(service);
    }
    
    this.clearCache();
    this.runIntegrityCheck();
  }

  public updateProvider(providerId: string, updates: Partial<ExtendedProviderProfile>): void {
    const index = this.providers.findIndex(p => p.id === providerId);
    if (index !== -1) {
      this.providers[index] = { 
        ...this.providers[index], 
        ...updates, 
        updated_at: new Date().toISOString() 
      };
      this.clearCache();
      this.runIntegrityCheck();
    }
  }

  public updateService(serviceId: string, updates: Partial<ExtendedServiceProfile>): void {
    const index = this.services.findIndex(s => s.id === serviceId);
    if (index !== -1) {
      this.services[index] = { 
        ...this.services[index], 
        ...updates, 
        updated_at: new Date().toISOString() 
      };
      
      // עדכון גם בספק
      const provider = this.providers.find(p => p.id === this.services[index].providerId);
      if (provider && provider.services) {
        const serviceIndex = provider.services.findIndex(s => s.id === serviceId);
        if (serviceIndex !== -1) {
          provider.services[serviceIndex] = this.services[index];
        }
      }
      
      this.clearCache();
      this.runIntegrityCheck();
    }
  }

  public searchServices(query: string, filters: any = {}): ExtendedServiceProfile[] {
    const cacheKey = `search-${query}-${JSON.stringify(filters)}`;
    
    return this.getCachedData(cacheKey, () => {
      let results = [...this.services];

      // חיפוש טקסט (מעודכן)
      if (query && query.trim()) {
        const searchTerm = query.toLowerCase().trim();
        results = results.filter(service =>
          service.name.toLowerCase().includes(searchTerm) ||
          service.description.toLowerCase().includes(searchTerm) ||
          service.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          service.conceptTags.some(conceptTag => conceptTag.toLowerCase().includes(searchTerm))
        );
      }

      // סינון לפי קונספטים
      if (filters.conceptTags && filters.conceptTags.length > 0) {
        results = results.filter(service =>
          service.conceptTags.some(conceptTag => filters.conceptTags.includes(conceptTag))
        );
      }

      // סינון לפי קטגוריה
      if (filters.categoryId) {
        results = results.filter(service => service.primaryCategoryId === filters.categoryId);
      }

      // סינון לפי זמינות
      if (filters.date && filters.time) {
        results = results.filter(service => {
          return service.availabilitySlots.some(slot =>
            slot.date === filters.date &&
            slot.startTime <= filters.time &&
            slot.endTime >= filters.time &&
            slot.isAvailable &&
            slot.currentBookings < slot.maxBookings
          );
        });
      }

      // מיון תוצאות
      return results.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
    });
  }

  private clearCache(): void {
    this.cache.clear();
    this.cacheExpiry.clear();
  }

  public runIntegrityCheck(): DataIntegrityStatus {
    this.integrityStatus = runDataIntegrityCheck(this.providers, this.services);
    return this.integrityStatus;
  }

  public getIntegrityStatus(): DataIntegrityStatus | null {
    return this.integrityStatus;
  }

  // ייצוא נתונים למערכת קיימת
  public exportToLegacyFormat() {
    return this.getCachedData('legacy-export', () => ({
      providers: this.providers.map(provider => ({
        id: provider.id,
        name: provider.name,
        businessName: provider.businessName,
        description: provider.description,
        contactPerson: provider.contactPerson,
        email: provider.email,
        phone: provider.phone,
        city: provider.city,
        categories: [provider.primaryCategoryId, ...provider.secondaryCategoryIds],
        rating: provider.rating,
        reviewCount: provider.reviewCount,
        featured: provider.featured,
        verified: provider.verified,
        created_at: provider.created_at,
        updated_at: provider.updated_at
      })),
      services: this.services.map(service => ({
        id: service.id,
        providerId: service.providerId,
        name: service.name,
        description: service.description,
        category: service.primaryCategoryId,
        subcategory: service.subcategoryId,
        conceptTags: service.conceptTags,
        price: service.price,
        priceUnit: service.priceUnit,
        rating: service.rating,
        reviewCount: service.reviewCount,
        featured: service.featured,
        imageUrl: service.imageUrl,
        tags: service.tags
      }))
    }));
  }
}

// יצירת instance גלובלי
export const dataSystem = new ExtendedDataSystem();

// פונקציות עזר לשימוש חיצוני (מעודכנות)
export const getExtendedProviders = () => dataSystem.getProviders();
export const getExtendedServices = () => dataSystem.getServices();
export const searchExtendedServices = (query: string, filters?: any) => dataSystem.searchServices(query, filters);
export const addExtendedProvider = (provider: ExtendedProviderProfile) => dataSystem.addProvider(provider);
export const updateExtendedService = (serviceId: string, updates: Partial<ExtendedServiceProfile>) => dataSystem.updateService(serviceId, updates);
