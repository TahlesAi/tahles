
// מנהל המערכת החדשה
import { 
  NewSystemCategory,
  NewSystemSubcategory,
  NewSystemProvider,
  NewSystemProduct,
  EventConcept,
  EventType,
  BusinessRules,
  WishlistItem,
  DocumentReminder
} from '@/types/newSystemSchema';

export class NewSystemManager {
  private categories: NewSystemCategory[] = [];
  private subcategories: NewSystemSubcategory[] = [];
  private providers: NewSystemProvider[] = [];
  private products: NewSystemProduct[] = [];
  private concepts: EventConcept[] = [];
  private businessRules: BusinessRules;
  private wishlistItems: WishlistItem[] = [];
  private documentReminders: DocumentReminder[] = [];

  constructor() {
    this.businessRules = this.getDefaultBusinessRules();
    this.initializeDefaultConcepts();
  }

  private getDefaultBusinessRules(): BusinessRules {
    return {
      hideUnavailableProducts: true,
      requireImmediatePayment: true,
      noCustomPricingOnly: true,
      requireClearPricing: true,
      ratingsAffectFiltering: true,
      enableProductComparison: true,
      enableWishlist: true,
      requireSMSVerification: true,
      requireProviderIDVerification: true,
      enableCRMIntegration: true,
      hideBrandingDuringLaunch: true
    };
  }

  private initializeDefaultConcepts(): void {
    const defaultConcepts: EventConcept[] = [
      {
        id: 'concept-001',
        name: 'יום גיבוש',
        description: 'פעילויות לחיזוק צוותים וקבוצות',
        eventTypes: ['אירוע חברה', 'אירוע חברים'],
        isActive: true,
        usageCount: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-002',
        name: 'מסיבת סיום',
        description: 'חגיגות סיום לימודים או פרויקטים',
        eventTypes: ['אירוע חברים', 'מפגש ילדים'],
        isActive: true,
        usageCount: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-003',
        name: 'שבת חתן',
        description: 'חגיגת שבת לכבוד חתן',
        eventTypes: ['אירוע משפחתי', 'אירוע חברים'],
        isActive: true,
        usageCount: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-004',
        name: 'חינה',
        description: 'טקס חינה מסורתי',
        eventTypes: ['אירוע משפחתי'],
        isActive: true,
        usageCount: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-005',
        name: 'מסיבת רווקות',
        description: 'חגיגה לכבוד הכלה',
        eventTypes: ['אירוע חברים'],
        isActive: true,
        usageCount: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-006',
        name: 'בר מצווה',
        description: 'חגיגת בר/בת מצווה',
        eventTypes: ['אירוע משפחתי'],
        isActive: true,
        usageCount: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-007',
        name: 'מסיבת חצר',
        description: 'מסיבה בחצר הבית',
        eventTypes: ['אירוע משפחתי', 'אירוע חברים'],
        isActive: true,
        usageCount: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-008',
        name: 'הפנינג עובדים',
        description: 'אירוע לעובדי החברה',
        eventTypes: ['אירוע חברה'],
        isActive: true,
        usageCount: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-009',
        name: 'יום הולדת גיל 40',
        description: 'חגיגת יום הולדת מיוחדת',
        eventTypes: ['אירוע משפחתי', 'אירוע חברים'],
        isActive: true,
        usageCount: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-010',
        name: 'סדנת יצירה',
        description: 'סדנה ליצירה והכנה',
        eventTypes: ['מפגש ילדים', 'אירוע חברים'],
        isActive: true,
        usageCount: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-011',
        name: 'קבלת שבת',
        description: 'מפגש לכבוד שבת',
        eventTypes: ['אירוע משפחתי'],
        isActive: true,
        usageCount: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    this.concepts = defaultConcepts;
  }

  // ניהול קטגוריות
  public addCategory(category: Omit<NewSystemCategory, 'id' | 'created_at' | 'updated_at'>): string {
    const newCategory: NewSystemCategory = {
      ...category,
      id: `category-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.categories.push(newCategory);
    return newCategory.id;
  }

  // ניהול תתי קטגוריות
  public addSubcategory(subcategory: Omit<NewSystemSubcategory, 'id' | 'created_at' | 'updated_at'>): string {
    const newSubcategory: NewSystemSubcategory = {
      ...subcategory,
      id: `subcategory-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.subcategories.push(newSubcategory);
    return newSubcategory.id;
  }

  // ניהול ספקים
  public addProvider(provider: Omit<NewSystemProvider, 'id' | 'created_at' | 'updated_at' | 'subcategoryIds'>): string {
    const newProvider: NewSystemProvider = {
      ...provider,
      id: `provider-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      subcategoryIds: [] // יחושב אוטומטית לפי המוצרים
    };

    this.providers.push(newProvider);
    return newProvider.id;
  }

  // ניהול מוצרים
  public addProduct(product: Omit<NewSystemProduct, 'id' | 'created_at' | 'updated_at'>): string {
    // וולידציה - מוצר חייב לפחות קונספט אחד
    if (!product.conceptIds || product.conceptIds.length === 0) {
      throw new Error('מוצר חייב להיות משויך לפחות לקונספט אחד');
    }

    // וולידציה - מוצר חייב להיות זמין לחיוב מיידי
    if (!product.canChargeImmediately) {
      throw new Error('כל מוצר חייב להיות זמין לחיוב מיידי');
    }

    const newProduct: NewSystemProduct = {
      ...product,
      id: `product-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.products.push(newProduct);

    // עדכון תתי קטגוריות של הספק
    this.updateProviderSubcategories(product.providerId, product.subcategoryId);

    return newProduct.id;
  }

  private updateProviderSubcategories(providerId: string, subcategoryId: string): void {
    const provider = this.providers.find(p => p.id === providerId);
    if (provider && !provider.subcategoryIds.includes(subcategoryId)) {
      provider.subcategoryIds.push(subcategoryId);
      provider.updated_at = new Date().toISOString();
    }
  }

  // חיפוש מוצרים לפי קונספטים וסוג אירוע
  public searchProductsByEventType(eventType: EventType, additionalFilters?: {
    subcategoryId?: string;
    targetAudience?: string;
    priceRange?: [number, number];
  }): NewSystemProduct[] {
    // קבלת קונספטים רלוונטיים לסוג האירוע
    const relevantConcepts = this.concepts
      .filter(concept => concept.eventTypes.includes(eventType))
      .map(concept => concept.id);

    // סינון מוצרים
    let filteredProducts = this.products.filter(product => {
      // בדיקה שהמוצר זמין ופעיל
      if (!product.isAvailable || product.status !== 'active') {
        return false;
      }

      // בדיקה שיש חפיפה בקונספטים
      const hasRelevantConcept = product.conceptIds.some(conceptId => 
        relevantConcepts.includes(conceptId)
      );
      
      return hasRelevantConcept;
    });

    // סינונים נוספים
    if (additionalFilters?.subcategoryId) {
      filteredProducts = filteredProducts.filter(p => 
        p.subcategoryId === additionalFilters.subcategoryId
      );
    }

    if (additionalFilters?.targetAudience) {
      filteredProducts = filteredProducts.filter(p => 
        p.targetAudiences.includes(additionalFilters.targetAudience as any)
      );
    }

    if (additionalFilters?.priceRange) {
      const [min, max] = additionalFilters.priceRange;
      filteredProducts = filteredProducts.filter(p => 
        p.basePrice >= min && p.basePrice <= max
      );
    }

    // מיון לפי דירוג ופופולריות
    return filteredProducts.sort((a, b) => {
      const scoreA = a.productRating * 0.7 + (a.totalBookings / 100) * 0.3;
      const scoreB = b.productRating * 0.7 + (b.totalBookings / 100) * 0.3;
      return scoreB - scoreA;
    });
  }

  // ניהול Wishlist
  public addToWishlist(userId: string, productId: string): string {
    const existing = this.wishlistItems.find(item => 
      item.userId === userId && item.productId === productId
    );

    if (existing) {
      throw new Error('המוצר כבר נמצא ברשימת המשאלות');
    }

    const product = this.products.find(p => p.id === productId);
    if (!product) {
      throw new Error('מוצר לא נמצא');
    }

    const wishlistItem: WishlistItem = {
      id: `wishlist-${Date.now()}`,
      userId,
      productId,
      providerId: product.providerId,
      addedDate: new Date().toISOString()
    };

    this.wishlistItems.push(wishlistItem);
    return wishlistItem.id;
  }

  // קבלת רשימת משאלות של משתמש
  public getUserWishlist(userId: string): WishlistItem[] {
    return this.wishlistItems.filter(item => item.userId === userId);
  }

  // מערכת תזכורות למסמכים
  public checkDocumentExpirations(): DocumentReminder[] {
    const now = new Date();
    const expiringSoon: DocumentReminder[] = [];

    this.providers.forEach(provider => {
      provider.businessDocuments.forEach(doc => {
        if (doc.expiryDate && doc.reminderDays > 0) {
          const expiryDate = new Date(doc.expiryDate);
          const reminderDate = new Date(expiryDate);
          reminderDate.setDate(reminderDate.getDate() - doc.reminderDays);

          if (now >= reminderDate && now < expiryDate) {
            const reminder: DocumentReminder = {
              id: `reminder-${Date.now()}-${Math.random()}`,
              providerId: provider.id,
              documentType: doc.type,
              expiryDate: doc.expiryDate,
              reminderDate: reminderDate.toISOString(),
              isActive: true,
              reminderSent: false
            };

            expiringSoon.push(reminder);
          }
        }
      });
    });

    return expiringSoon;
  }

  // getters
  public getCategories(): NewSystemCategory[] {
    return this.categories.filter(c => c.isActive);
  }

  public getSubcategories(categoryId?: string): NewSystemSubcategory[] {
    const active = this.subcategories.filter(s => s.isActive);
    return categoryId ? active.filter(s => s.categoryId === categoryId) : active;
  }

  public getProviders(): NewSystemProvider[] {
    return this.providers.filter(p => p.status === 'active');
  }

  public getProducts(): NewSystemProduct[] {
    return this.products.filter(p => p.status === 'active' && p.isAvailable);
  }

  public getConcepts(): EventConcept[] {
    return this.concepts.filter(c => c.isActive);
  }

  public getConceptsByEventType(eventType: EventType): EventConcept[] {
    return this.concepts.filter(c => c.isActive && c.eventTypes.includes(eventType));
  }

  public getBusinessRules(): BusinessRules {
    return { ...this.businessRules };
  }

  // עדכון חוקים עסקיים
  public updateBusinessRules(rules: Partial<BusinessRules>): void {
    this.businessRules = { ...this.businessRules, ...rules };
  }
}

// יצירת instance גלובלי
export const newSystemManager = new NewSystemManager();
