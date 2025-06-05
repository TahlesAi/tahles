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
    enableProductComparison: true, // הפעלנו השוואת מוצרים
    enableWishlist: true, // הפעלנו Wishlist
    requireSMSVerification: false, // נפעיל בהמשך
    requireProviderIDVerification: true, // הפעלנו אימות ת"ז
    enableCRMIntegration: false, // נפעיל בהמשך
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

    // תתי-קטגוריות מורחבות לכל הקטגוריות
    this.subcategories = [
      // הפקות (cat-001)
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
      // העשרה (cat-002)
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
      },
      {
        id: 'sub-004',
        categoryId: 'cat-002',
        name: 'הרצאות ומרצים',
        description: 'מרצים ומומחים לכל נושא',
        icon: 'mic',
        order: 2,
        customFields: this.generateLectureCustomFields(),
        requiredFields: ['lectureType', 'duration'],
        isActive: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      // מתנות (cat-003) - חדש!
      {
        id: 'sub-005',
        categoryId: 'cat-003',
        name: 'מתנות עסקיות',
        description: 'מתנות מותאמות לאירועי חברה',
        icon: 'briefcase',
        order: 1,
        customFields: this.generateGiftCustomFields(),
        requiredFields: ['giftType', 'packaging'],
        isActive: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'sub-006',
        categoryId: 'cat-003',
        name: 'מתנות אישיות',
        description: 'מתנות מיוחדות לאירועים פרטיים',
        icon: 'heart',
        order: 2,
        customFields: this.generatePersonalGiftCustomFields(),
        requiredFields: ['personalization', 'occasion'],
        isActive: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      // כרטיסים (cat-004) - חדש!
      {
        id: 'sub-007',
        categoryId: 'cat-004',
        name: 'כרטיסי מופעים',
        description: 'כרטיסים למופעים ותיאטרון',
        icon: 'ticket',
        order: 1,
        customFields: this.generateTicketCustomFields(),
        requiredFields: ['venue', 'showDate'],
        isActive: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'sub-008',
        categoryId: 'cat-004',
        name: 'כרטיסי ספורט',
        description: 'כרטיסים לאירועי ספורט',
        icon: 'trophy',
        order: 2,
        customFields: this.generateSportsTicketCustomFields(),
        requiredFields: ['team', 'league'],
        isActive: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      // טיולים (cat-005) - חדש!
      {
        id: 'sub-009',
        categoryId: 'cat-005',
        name: 'טיולי גיבוש',
        description: 'טיולים וחוויות לגיבוש צוותים',
        icon: 'users',
        order: 1,
        customFields: this.generateTripCustomFields(),
        requiredFields: ['difficulty', 'duration'],
        isActive: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'sub-010',
        categoryId: 'cat-005',
        name: 'חוויות אתגר',
        description: 'פעילויות אתגר וספורט קיצוני',
        icon: 'mountain',
        order: 2,
        customFields: this.generateAdventureCustomFields(),
        requiredFields: ['riskLevel', 'equipment'],
        isActive: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    // קונספטים מורחבים - מ-11 ל-30!
    this.concepts = [
      // קונספטים קיימים
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
      },
      // קונספטים חדשים - מ-12 עד 30
      {
        id: 'concept-012',
        name: 'כנס מקצועי',
        description: 'כנס או ועידה מקצועית',
        icon: 'conference',
        eventTypes: ['אירוע חברה'],
        isActive: true,
        usageCount: 25,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-013',
        name: 'חתונה',
        description: 'טקס חתונה וחגיגה',
        icon: 'wedding',
        eventTypes: ['אירוע משפחתי'],
        isActive: true,
        usageCount: 200,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-014',
        name: 'אירוע השקה',
        description: 'השקת מוצר או שירות חדש',
        icon: 'rocket',
        eventTypes: ['אירוע חברה'],
        isActive: true,
        usageCount: 15,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-015',
        name: 'מסיבת פרישה',
        description: 'חגיגת פרישה מהעבודה',
        icon: 'retirement',
        eventTypes: ['אירוע חברה', 'אירוע חברים'],
        isActive: true,
        usageCount: 35,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-016',
        name: 'מסיבת יום הולדת ילדים',
        description: 'יום הולדת מיוחד לילדים',
        icon: 'cake',
        eventTypes: ['מפגש ילדים', 'אירוע משפחתי'],
        isActive: true,
        usageCount: 90,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-017',
        name: 'ערב חגיגי',
        description: 'ערב חגיגי אלגנטי',
        icon: 'champagne',
        eventTypes: ['אירוע חברה', 'אירוע חברים'],
        isActive: true,
        usageCount: 45,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-018',
        name: 'טקס הוקרה',
        description: 'טקס הוקרה לעובדים או מתנדבים',
        icon: 'award',
        eventTypes: ['אירוע חברה'],
        isActive: true,
        usageCount: 20,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-019',
        name: 'מסיבת גיוס כספים',
        description: 'אירוע לגיוס כספים למטרה טובה',
        icon: 'fundraising',
        eventTypes: ['אירוע חברה'],
        isActive: true,
        usageCount: 12,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-020',
        name: 'מסיבת בריתה',
        description: 'טקס וחגיגת בריתה',
        icon: 'baby',
        eventTypes: ['אירוע משפחתי'],
        isActive: true,
        usageCount: 60,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-021',
        name: 'יום משפחה',
        description: 'יום כיף למשפחות עובדים',
        icon: 'family',
        eventTypes: ['אירוע חברה', 'מפגש ילדים'],
        isActive: true,
        usageCount: 30,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-022',
        name: 'ערב חידון',
        description: 'ערב חידון וטריוויה',
        icon: 'quiz',
        eventTypes: ['אירוע חברה', 'אירוע חברים'],
        isActive: true,
        usageCount: 25,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-023',
        name: 'מסיבת סילבסטר',
        description: 'חגיגת ראש השנה האזרחית',
        icon: 'fireworks',
        eventTypes: ['אירוע חברה', 'אירוע חברים'],
        isActive: true,
        usageCount: 55,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-024',
        name: 'אירוע חנוכה',
        description: 'חגיגת חנוכה עם הדלקת נרות',
        icon: 'menorah',
        eventTypes: ['אירוע משפחתי', 'אירוע חברה'],
        isActive: true,
        usageCount: 40,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-025',
        name: 'מסיבת פורים',
        description: 'חגיגת פורים עם תחפושות',
        icon: 'mask',
        eventTypes: ['אירוע משפחתי', 'מפגש ילדים'],
        isActive: true,
        usageCount: 70,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-026',
        name: 'סדר פסח',
        description: 'ליל הסדר ומסיבת פסח',
        icon: 'passover',
        eventTypes: ['אירוע משפחתי'],
        isActive: true,
        usageCount: 85,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-027',
        name: 'בת מצווה',
        description: 'חגיגת בת מצווה',
        icon: 'bat-mitzvah',
        eventTypes: ['אירוע משפחתי'],
        isActive: true,
        usageCount: 110,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-028',
        name: 'ערב דיג\'יי',
        description: 'מסיבה עם דיג\'יי ורחבת ריקודים',
        icon: 'music',
        eventTypes: ['אירוע חברים', 'אירוע חברה'],
        isActive: true,
        usageCount: 65,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-029',
        name: 'מסיבת בריכה',
        description: 'מסיבת קיץ בבריכה',
        icon: 'pool',
        eventTypes: ['אירוע חברים', 'מפגש ילדים'],
        isActive: true,
        usageCount: 50,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'concept-030',
        name: 'ערב מיוחד לזוגות',
        description: 'ערב רומנטי או ערב זוגות',
        icon: 'couples',
        eventTypes: ['אירוע חברים'],
        isActive: true,
        usageCount: 35,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    // טעינה של ספקים ומוצרים תתבצע מהמערכת הישנה בתהליך המעבר
    this.providers = [];
    this.products = [];
  }

  // שדות מותאמים אישית לקטגוריות החדשות
  private generateGiftCustomFields(): CustomField[] {
    return [
      {
        id: 'gift-field-001',
        name: 'giftType',
        type: 'select',
        required: true,
        options: ['promotional', 'luxury', 'practical', 'branded'],
        displayOrder: 1
      },
      {
        id: 'gift-field-002',
        name: 'packaging',
        type: 'select',
        required: true,
        options: ['standard', 'premium', 'custom', 'eco-friendly'],
        displayOrder: 2
      },
      {
        id: 'gift-field-003',
        name: 'budget',
        type: 'number',
        required: false,
        validation: { min: 10, max: 5000 },
        displayOrder: 3
      }
    ];
  }

  private generatePersonalGiftCustomFields(): CustomField[] {
    return [
      {
        id: 'personal-gift-001',
        name: 'personalization',
        type: 'boolean',
        required: true,
        displayOrder: 1
      },
      {
        id: 'personal-gift-002',
        name: 'occasion',
        type: 'select',
        required: true,
        options: ['birthday', 'anniversary', 'wedding', 'graduation', 'retirement'],
        displayOrder: 2
      }
    ];
  }

  private generateTicketCustomFields(): CustomField[] {
    return [
      {
        id: 'ticket-field-001',
        name: 'venue',
        type: 'text',
        required: true,
        displayOrder: 1
      },
      {
        id: 'ticket-field-002',
        name: 'showDate',
        type: 'date',
        required: true,
        displayOrder: 2
      },
      {
        id: 'ticket-field-003',
        name: 'seatCategory',
        type: 'select',
        required: false,
        options: ['standard', 'premium', 'vip', 'box'],
        displayOrder: 3
      }
    ];
  }

  private generateSportsTicketCustomFields(): CustomField[] {
    return [
      {
        id: 'sports-ticket-001',
        name: 'team',
        type: 'text',
        required: true,
        displayOrder: 1
      },
      {
        id: 'sports-ticket-002',
        name: 'league',
        type: 'select',
        required: true,
        options: ['football', 'basketball', 'soccer', 'tennis', 'other'],
        displayOrder: 2
      }
    ];
  }

  private generateTripCustomFields(): CustomField[] {
    return [
      {
        id: 'trip-field-001',
        name: 'difficulty',
        type: 'select',
        required: true,
        options: ['easy', 'moderate', 'challenging', 'expert'],
        displayOrder: 1
      },
      {
        id: 'trip-field-002',
        name: 'duration',
        type: 'number',
        required: true,
        validation: { min: 1, max: 14 },
        displayOrder: 2
      }
    ];
  }

  private generateAdventureCustomFields(): CustomField[] {
    return [
      {
        id: 'adventure-field-001',
        name: 'riskLevel',
        type: 'select',
        required: true,
        options: ['low', 'medium', 'high', 'extreme'],
        displayOrder: 1
      },
      {
        id: 'adventure-field-002',
        name: 'equipment',
        type: 'boolean',
        required: true,
        displayOrder: 2
      }
    ];
  }

  private generateLectureCustomFields(): CustomField[] {
    return [
      {
        id: 'lecture-field-001',
        name: 'lectureType',
        type: 'select',
        required: true,
        options: ['motivational', 'educational', 'technical', 'entertainment'],
        displayOrder: 1
      },
      {
        id: 'lecture-field-002',
        name: 'duration',
        type: 'number',
        required: true,
        validation: { min: 30, max: 480 },
        displayOrder: 2
      }
    ];
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

  // פונקציות חדשות לחוקים עסקיים
  public enforceBusinessRules(): void {
    // הסתר מוצרים לא זמינים
    if (this.businessRules.hideUnavailableProducts) {
      this.products = this.products.filter(product => product.isAvailable);
    }

    // אכוף חיוב מיידי
    if (this.businessRules.requireImmediatePayment) {
      this.products.forEach(product => {
        product.canChargeImmediately = true;
      });
    }

    // ולידציה למחירים ברורים
    if (this.businessRules.requireClearPricing) {
      this.products = this.products.filter(product => 
        product.basePrice > 0 && product.priceUnit
      );
    }

    this.saveToStorage();
  }

  // בדיקת תקינות המערכת
  public validateSystemReadiness(): {
    score: number;
    criticalIssues: string[];
    warnings: string[];
    isReady: boolean;
  } {
    const issues: string[] = [];
    const warnings: string[] = [];
    let score = 0;

    // בדיקת קטגוריות (10 נקודות)
    if (this.categories.length >= 5) {
      score += 10;
    } else {
      issues.push('חסרות קטגוריות בסיסיות');
    }

    // בדיקת תתי קטגוריות (15 נקודות)
    const categoriesWithSubs = this.categories.filter(cat => 
      this.subcategories.some(sub => sub.categoryId === cat.id)
    ).length;
    
    if (categoriesWithSubs >= 5) {
      score += 15;
    } else if (categoriesWithSubs >= 3) {
      score += 10;
      warnings.push(`רק ${categoriesWithSubs} קטגוריות עם תתי קטגוריות`);
    } else {
      issues.push('חסרות תתי קטגוריות לרוב הקטגוריות');
    }

    // בדיקת קונספטים (20 נקודות)
    if (this.concepts.length >= 30) {
      score += 20;
    } else if (this.concepts.length >= 20) {
      score += 15;
      warnings.push(`רק ${this.concepts.length} קונספטים מתוך 30 נדרשים`);
    } else if (this.concepts.length >= 15) {
      score += 10;
      warnings.push(`רק ${this.concepts.length} קונספטים - צריך עוד`);
    } else {
      issues.push(`רק ${this.concepts.length} קונספטים - צריך לפחות 30`);
    }

    // בדיקת חוקים עסקיים (25 נקודות)
    const activeRules = Object.values(this.businessRules).filter(Boolean).length;
    const totalRules = Object.keys(this.businessRules).length;
    const rulesScore = (activeRules / totalRules) * 25;
    score += rulesScore;

    if (rulesScore < 15) {
      issues.push('חוקים עסקיים לא מוגדרים במלואם');
    } else if (rulesScore < 20) {
      warnings.push('חלק מהחוקים העסקיים עדיין לא פעילים');
    }

    // בדיקת תשתית (30 נקודות)
    if (this.businessRules.enableWishlist && this.businessRules.enableProductComparison) {
      score += 15;
    } else if (this.businessRules.enableWishlist || this.businessRules.enableProductComparison) {
      score += 10;
      warnings.push('חסרים רכיבי UI מתקדמים');
    } else {
      issues.push('חסרים רכיבי UI בסיסיים (Wishlist, השוואה)');
    }

    if (this.businessRules.requireProviderIDVerification) {
      score += 10;
    } else {
      warnings.push('אימות ת"ז לספקים לא פעיל');
    }

    if (this.businessRules.requireSMSVerification) {
      score += 5;
    } else {
      warnings.push('אימות SMS לא פעיל');
    }

    return {
      score: Math.round(score),
      criticalIssues: issues,
      warnings,
      isReady: score >= 70 && issues.length === 0
    };
  }
}

// יצירת אינסטנס גלובלי של מנהל המערכת החדשה
export const newSystemManager = new NewSystemManager();
