
// מנהל המערכת החדשה - אחראי על ניהול המבנה החדש
import { 
  NewSystemCategory, 
  NewSystemSubcategory, 
  EventConcept,
  NewSystemProvider,
  NewSystemProduct,
  CustomField,
  BusinessRules 
} from '@/types/newSystemSchema';

class NewSystemManager {
  private categories: NewSystemCategory[] = [];
  private subcategories: NewSystemSubcategory[] = [];
  private concepts: EventConcept[] = [];
  private providers: NewSystemProvider[] = [];
  private products: NewSystemProduct[] = [];
  private businessRules: BusinessRules = {
    hideUnavailableProducts: true,
    requireImmediatePayment: true,
    noCustomPricingOnly: true,
    requireClearPricing: true,
    ratingsAffectFiltering: false,
    enableProductComparison: false,
    enableWishlist: false,
    requireSMSVerification: false,
    requireProviderIDVerification: false,
    enableCRMIntegration: false,
    hideBrandingDuringLaunch: true
  };
  private isActive: boolean = false;

  constructor() {
    this.initializeData();
    this.loadFromStorage();
  }

  private initializeData(): void {
    // יצירת קטגוריות-על לדוגמה
    this.categories = [
      {
        id: 'cat-001',
        name: 'הפקות',
        description: 'פתרונות הפקה לכל סוגי האירועים',
        icon: 'event',
        order: 1,
        isActive: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'cat-002',
        name: 'העשרה',
        description: 'תכני העשרה וסדנאות',
        icon: 'school',
        order: 2,
        isActive: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'cat-003',
        name: 'מתנות',
        description: 'מתנות לכל מטרה ואירוע',
        icon: 'gift',
        order: 3,
        isActive: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'cat-004',
        name: 'כרטיסים',
        description: 'כרטיסים למופעים ואירועים',
        icon: 'ticket',
        order: 4,
        isActive: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'cat-005',
        name: 'טיולים',
        description: 'טיולים וחוויות בחוץ',
        icon: 'map',
        order: 5,
        isActive: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    // תתי-קטגוריות לדוגמה
    this.subcategories = [
      {
        id: 'sub-001',
        categoryId: 'cat-001',
        name: 'אולמות אירועים',
        description: 'אולמות לכל סוגי האירועים',
        icon: 'venue',
        order: 1,
        customFields: this.generateVenueCustomFields(),
        requiredFields: ['capacity', 'hasParking'],
        isActive: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'sub-002',
        categoryId: 'cat-001',
        name: 'שירותי קייטרינג',
        description: 'קייטרינג לאירועים',
        icon: 'food',
        order: 2,
        customFields: this.generateCateringCustomFields(),
        requiredFields: ['isKosher', 'cuisineType'],
        isActive: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'sub-003',
        categoryId: 'cat-002',
        name: 'סדנאות יצירה',
        description: 'סדנאות יצירה לקבוצות',
        icon: 'art',
        order: 1,
        customFields: this.generateWorkshopCustomFields(),
        requiredFields: ['workshopType', 'maxParticipants'],
        isActive: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    // קונספטים לדוגמה
    this.concepts = [
      {
        id: 'concept-001',
        name: 'יום גיבוש',
        description: 'פעילויות ושירותים ליום גיבוש',
        icon: 'team',
        eventTypes: ['אירוע חברה'],
        isActive: true,
        usageCount: 120,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-002',
        name: 'מסיבת סיום',
        description: 'כל מה שצריך למסיבת סיום מושלמת',
        icon: 'graduation',
        eventTypes: ['אירוע חברה', 'אירוע חברים'],
        isActive: true,
        usageCount: 85,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-003',
        name: 'שבת חתן',
        description: 'אירוח ופעילויות לשבת חתן',
        icon: 'groom',
        eventTypes: ['אירוע משפחתי', 'אירוע חברים'],
        isActive: true,
        usageCount: 95,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-004',
        name: 'חינה',
        description: 'מסיבת חינה מסורתית',
        icon: 'henna',
        eventTypes: ['אירוע משפחתי'],
        isActive: true,
        usageCount: 75,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-005',
        name: 'מסיבת רווקות',
        description: 'פעילויות ושירותים למסיבת רווקות',
        icon: 'party',
        eventTypes: ['אירוע חברים'],
        isActive: true,
        usageCount: 110,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-006',
        name: 'בר מצווה',
        description: 'אירוע בר מצווה',
        icon: 'bar-mitzvah',
        eventTypes: ['אירוע משפחתי'],
        isActive: true,
        usageCount: 130,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-007',
        name: 'מסיבת חצר',
        description: 'אירוע לא פורמלי בחצר',
        icon: 'backyard',
        eventTypes: ['אירוע חברים', 'אירוע משפחתי'],
        isActive: true,
        usageCount: 65,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-008',
        name: 'הפנינג עובדים',
        description: 'אירוע חברה גדול לעובדים',
        icon: 'company',
        eventTypes: ['אירוע חברה'],
        isActive: true,
        usageCount: 40,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-009',
        name: 'יום הולדת גיל 40',
        description: 'אירוע מיוחד לגיל 40',
        icon: 'birthday',
        eventTypes: ['אירוע משפחתי', 'אירוע חברים'],
        isActive: true,
        usageCount: 50,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-010',
        name: 'סדנת יצירה',
        description: 'סדנת יצירה לכל מטרה',
        icon: 'workshop',
        eventTypes: ['אירוע חברה', 'מפגש ילדים', 'אירוע חברים'],
        isActive: true,
        usageCount: 80,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-011',
        name: 'קבלת שבת',
        description: 'אירוע קבלת שבת',
        icon: 'shabbat',
        eventTypes: ['אירוע משפחתי', 'אירוע חברים'],
        isActive: true,
        usageCount: 30,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    // טעינה של ספקים ומוצרים תתבצע מהמערכת הישנה בתהליך המעבר
    this.providers = [];
    this.products = [];
  }

  private generateVenueCustomFields(): CustomField[] {
    return [
      {
        id: 'venue-field-001',
        name: 'capacity',
        type: 'number',
        required: true,
        displayOrder: 1,
        validation: {
          min: 10,
          max: 2000
        }
      },
      {
        id: 'venue-field-002',
        name: 'hasParking',
        type: 'boolean',
        required: true,
        displayOrder: 2
      },
      {
        id: 'venue-field-003',
        name: 'indoorOutdoor',
        type: 'select',
        required: true,
        options: ['indoor', 'outdoor', 'both'],
        displayOrder: 3
      },
      {
        id: 'venue-field-004',
        name: 'accessibility',
        type: 'boolean',
        required: false,
        displayOrder: 4
      }
    ];
  }

  private generateCateringCustomFields(): CustomField[] {
    return [
      {
        id: 'catering-field-001',
        name: 'isKosher',
        type: 'boolean',
        required: true,
        displayOrder: 1
      },
      {
        id: 'catering-field-002',
        name: 'cuisineType',
        type: 'multiselect',
        required: true,
        options: ['Israeli', 'Mediterranean', 'Asian', 'European', 'American'],
        displayOrder: 2
      },
      {
        id: 'catering-field-003',
        name: 'servingStyle',
        type: 'select',
        required: false,
        options: ['buffet', 'plated', 'stations', 'family_style'],
        displayOrder: 3
      }
    ];
  }

  private generateWorkshopCustomFields(): CustomField[] {
    return [
      {
        id: 'workshop-field-001',
        name: 'workshopType',
        type: 'select',
        required: true,
        options: ['art', 'cooking', 'crafts', 'science', 'wellness'],
        displayOrder: 1
      },
      {
        id: 'workshop-field-002',
        name: 'maxParticipants',
        type: 'number',
        required: true,
        validation: {
          min: 5,
          max: 100
        },
        displayOrder: 2
      },
      {
        id: 'workshop-field-003',
        name: 'materialsIncluded',
        type: 'boolean',
        required: false,
        displayOrder: 3
      },
      {
        id: 'workshop-field-004',
        name: 'duration',
        type: 'number',
        required: true,
        validation: {
          min: 30,
          max: 480
        },
        displayOrder: 4
      }
    ];
  }

  // שמירה וטעינה מ-localStorage
  private saveToStorage(): void {
    localStorage.setItem('newSystem.categories', JSON.stringify(this.categories));
    localStorage.setItem('newSystem.subcategories', JSON.stringify(this.subcategories));
    localStorage.setItem('newSystem.concepts', JSON.stringify(this.concepts));
    localStorage.setItem('newSystem.businessRules', JSON.stringify(this.businessRules));
    localStorage.setItem('newSystem.isActive', JSON.stringify(this.isActive));
  }

  private loadFromStorage(): void {
    // טעינה מ-localStorage אם קיים
    try {
      const categories = localStorage.getItem('newSystem.categories');
      const subcategories = localStorage.getItem('newSystem.subcategories');
      const concepts = localStorage.getItem('newSystem.concepts');
      const businessRules = localStorage.getItem('newSystem.businessRules');
      const isActive = localStorage.getItem('newSystem.isActive');

      if (categories) this.categories = JSON.parse(categories);
      if (subcategories) this.subcategories = JSON.parse(subcategories);
      if (concepts) this.concepts = JSON.parse(concepts);
      if (businessRules) this.businessRules = JSON.parse(businessRules);
      if (isActive) this.isActive = JSON.parse(isActive);
    } catch (error) {
      console.error('שגיאה בטעינת המערכת החדשה:', error);
    }
  }

  // API ציבורי
  public getCategories(): NewSystemCategory[] {
    return [...this.categories];
  }

  public getSubcategories(): NewSystemSubcategory[] {
    return [...this.subcategories];
  }

  public getSubcategoriesByCategory(categoryId: string): NewSystemSubcategory[] {
    return this.subcategories.filter(sub => sub.categoryId === categoryId);
  }

  public getConcepts(): EventConcept[] {
    return [...this.concepts];
  }

  public getConceptsByEventType(eventType: string): EventConcept[] {
    return this.concepts.filter(concept => 
      concept.eventTypes.includes(eventType as any)
    );
  }

  public getProviders(): NewSystemProvider[] {
    return [...this.providers];
  }

  public getProducts(): NewSystemProduct[] {
    return [...this.products];
  }

  public getBusinessRules(): BusinessRules {
    return {...this.businessRules};
  }

  public activateSystem(): boolean {
    this.isActive = true;
    this.saveToStorage();
    console.log('🚀 המערכת החדשה הופעלה בהצלחה');
    return true;
  }

  public isSystemActive(): boolean {
    return this.isActive;
  }

  // הוספת קטגוריה חדשה
  public addCategory(category: Omit<NewSystemCategory, 'id' | 'created_at' | 'updated_at'>): string {
    const id = `cat-${Date.now()}`;
    const newCategory: NewSystemCategory = {
      ...category,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    this.categories.push(newCategory);
    this.saveToStorage();
    return id;
  }

  // הוספת תת-קטגוריה חדשה
  public addSubcategory(subcategory: Omit<NewSystemSubcategory, 'id' | 'created_at' | 'updated_at'>): string {
    const id = `sub-${Date.now()}`;
    const newSubcategory: NewSystemSubcategory = {
      ...subcategory,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    this.subcategories.push(newSubcategory);
    this.saveToStorage();
    return id;
  }

  // הוספת קונספט חדש
  public addConcept(concept: Omit<EventConcept, 'id' | 'created_at' | 'updated_at'>): string {
    const id = `concept-${Date.now()}`;
    const newConcept: EventConcept = {
      ...concept,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    this.concepts.push(newConcept);
    this.saveToStorage();
    return id;
  }

  // עדכון חוק עסקי
  public updateBusinessRule<K extends keyof BusinessRules>(rule: K, value: BusinessRules[K]): void {
    this.businessRules[rule] = value;
    this.saveToStorage();
  }
}

// יצירת אינסטנס גלובלי של מנהל המערכת החדשה
export const newSystemManager = new NewSystemManager();
