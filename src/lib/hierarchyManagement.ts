
// מערכת ניהול היררכיה מאוחדת
export interface CategoryHierarchy {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  subcategories: ExtendedSubcategory[];
  isSimulated?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExtendedSubcategory {
  id: string;
  name: string;
  categoryId: string;
  description?: string;
  icon?: string;
  providersCount: number;
  servicesCount: number;
  isSimulated?: boolean;
  providers: ExtendedProvider[];
}

export interface ExtendedProvider {
  id: string;
  name: string;
  businessName: string;
  description: string;
  categoryIds: string[];
  subcategoryIds: string[];
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  address?: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured: boolean;
  calendarActive: boolean;
  hasAvailableCalendar: boolean;
  services: ExtendedService[];
  isSimulated?: boolean;
  simulationTags?: string[];
  lastCalendarSync?: string;
  defaultAvailability?: DefaultAvailability;
}

export interface ExtendedService {
  id: string;
  providerId: string;
  name: string;
  description: string;
  categoryId: string;
  subcategoryId: string;
  price: number;
  priceUnit: string;
  duration?: number;
  imageUrl: string;
  additionalImages: string[];
  videos: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  available: boolean;
  tags: string[];
  conceptTags?: string[]; // *** הוספת שדה conceptTags ***
  suitableFor: string[];
  audienceSize: {
    min: number;
    max: number;
    optimal: number;
  };
  technicalRequirements: string[];
  setupTime: number;
  isReceptionService: boolean;
  isSimulated?: boolean;
  type?: 'real' | 'simulated';
  availabilitySlots?: AvailabilitySlot[];
}

export interface DefaultAvailability {
  workingDays: string[];
  workingHours: {
    start: string;
    end: string;
  };
  exceptions: {
    date: string;
    available: boolean;
    reason?: string;
  }[];
}

export interface AvailabilitySlot {
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxBookings: number;
  currentBookings: number;
}

// מפת קטגוריות רשמית מורחבת
export const officialCategoryHierarchy: CategoryHierarchy[] = [
  {
    id: "cat-001",
    name: "זמרים, נגנים ולהקות",
    description: "מוזיקאים ואמני ביצוע מקצועיים",
    icon: "🎵",
    subcategories: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "cat-002",
    name: "שחקנים ומיצגים",
    description: "אמני תיאטרון ומופעי רחוב",
    icon: "🎭",
    subcategories: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "cat-003",
    name: "קוסמים וקרקס",
    description: "מופעי קסמים ואטרקציות קרקס",
    icon: "🎪",
    subcategories: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "cat-004",
    name: "תיאטרון",
    description: "הצגות תיאטרון והופעות דרמה",
    icon: "🎬",
    subcategories: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "cat-005",
    name: "צילום ווידאו",
    description: "שירותי צילום מקצועיים",
    icon: "📸",
    subcategories: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "cat-006",
    name: "אטרקציות",
    description: "משחקים ואטרקציות לאירועים",
    icon: "🎠",
    subcategories: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "cat-007",
    name: "הרצאות וסדנאות",
    description: "תוכן חינוכי והעשרה",
    icon: "📚",
    subcategories: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "cat-008",
    name: "אומני חושים",
    description: "מנטליזם וקריאת מחשבות",
    icon: "🔮",
    subcategories: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "cat-009",
    name: "סטנדאפיסטים",
    description: "קומיקאים וסטנדאפ",
    icon: "😂",
    subcategories: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "cat-010",
    name: "מזון ומשקאות",
    description: "קייטרינג ושירותי אוכל",
    icon: "🍽️",
    subcategories: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// פונקציית יצירת תתי קטגוריות אוטומטית
export const generateSubcategoriesForCategory = (categoryId: string, categoryName: string): ExtendedSubcategory[] => {
  const subcategoriesTemplates = {
    "cat-001": [
      "זמרי פופ", "זמרי רוק", "זמרי ג'אז", "זמרי קלאסי", "זמרי מזרחי", "זמרי חסידי",
      "זמרי ילדים", "להקות רוק", "להקות פופ", "להקות מזרחיות", "להקות חסידיות",
      "נגני פסנתר", "נגני גיטרה", "נגני כינור", "נגני סקסופון", "נגני חצוצרה",
      "להקות ג'אז", "להקות קלאסיות", "להקות עולמיות", "קריוקי ודי ג'יי", "הרכבי קאמרי",
      "מקהלות", "זמרי אופרה", "זמרי קאנטרי", "זמרי בלוז", "זמרי סול", "זמרי פאנק",
      "זמרי מטאל", "זמרי אלקטרוני", "זמרי אתני"
    ],
    "cat-002": [
      "שחקני תיאטרון", "מיצגי רחוב", "פנטומימה", "מופעי ספורט", "ליצנים מקצועיים",
      "הופעות אישיות", "מופעי אלתור", "תיאטרון ילדים", "תיאטרון רחוב", "מופעי זוגות",
      "מיצגי תלבושות", "מופעי היסטוריה", "מיצגי מקום", "מופעי מדע", "תיאטרון בובות",
      "מופעי מטאל", "תיאטרון פיזי", "מופעי דרמה", "מופעי קומדיה", "מופעי מחול",
      "מיצגי סביבה", "תיאטרון קהילתי", "מופעי ספורט", "מיצגי טבע", "תיאטרון ניסיוני",
      "מופעי אומנויות", "מיצגי חברה", "תיאטרון דיגיטלי", "מופעי מורשת", "מיצגי זכרון"
    ],
    "cat-003": [
      "קוסמי במה", "קוסמי קרוב", "קוסמי ילדים", "מופעי קרקס", "להטוטנים", "אקרובטים",
      "קלאונים", "מופעי חיות", "רוכבי אופניים", "מופעי אש", "מופעי מים", "טרמפוליסטים",
      "מופעי חבלים", "קוסמי מנטליזם", "מופעי בלונים", "קוסמי רחוב", "מופעי פיזיקה",
      "קוסמי שולחן", "מופעי תחפושות", "קוסמי אלקטרוני", "מופעי אור", "קוסמי מקצועי",
      "מופעי צללים", "קוסמי קורט", "מופעי מכשפה", "קוסמי מדע", "מופעי טבע", "קוסמי אינטראקטיבי",
      "מופעי מסתורין", "קוסמי מתקדם"
    ],
    "cat-004": [
      "תיאטרון דרמה", "תיאטרון מחזמר", "תיאטרון קומדיה", "תיאטרון ילדים", "תיאטרון ניסיוני",
      "תיאטרון רחוב", "תיאטרון פיזי", "תיאטרון בובות", "תיאטרון אלתור", "תיאטרון קלאסי",
      "תיאטרון עכשווי", "תיאטרון אקטואלי", "תיאטרון עממי", "תיאטרון מחתרתי", "תיאטרון מורשת",
      "תיאטרון בינלאומי", "תיאטרון שיטחי", "תיאטרון מונולוג", "תיאטרון זוגי", "תיאטרון עלילתי",
      "תיאטרון פנטסטי", "תיאטרון רומנטי", "תיאטרון היסטורי", "תיאטרון פסיכולוגי", "תיאטרון פוליטי",
      "תיאטרון מודרני", "תיאטרון פואטי", "תיאטרון סוריאליסטי", "תיאטרון אבסטרקטי", "תיאטרון מינימליסטי"
    ],
    "cat-005": [
      "צילום חתונות", "צילום אירועי חברה", "צילום בר מצווה", "צילום יום הולדת", "צילום מסיבות",
      "צילום הצגות", "צילום קונצרטים", "צילום ספורט", "צילום אופנה", "צילום דוקומנטרי",
      "צילום וידאו", "צילום עילי", "צילום מקצועי", "צילום אמנותי", "צילום טבע",
      "צילום ילדים", "צילום משפחות", "צילום פורטרטים", "צילום מוצרים", "צילום אדריכלות",
      "צילום תעשייתי", "צילום רפואי", "צילום אוכל", "צילום נסיעות", "צילום חוף",
      "צילום הרים", "צילום לילה", "צילום מאקרו", "צילום רחוב", "צילום נוף"
    ],
    "cat-006": [
      "משחקי מים", "משחקי ספורט", "משחקי שולחן", "משחקי מחשב", "משחקי בריחה", "משחקי לוח",
      "משחקי חשיבה", "משחקי כוח", "משחקי מהירות", "משחקי זיכרון", "משחקי יצירתיות",
      "משחקי צוות", "משחקי אסטרטגיה", "משחקי רגש", "משחקי קרב", "משחקי הרפתקה",
      "משחקי פזל", "משחקי סימולציה", "משחקי חינוך", "משחקי מסיבה", "משחקי יום הולדת",
      "משחקי גיבוש", "משחקי חוף", "משחקי גן", "משחקי חצר", "משחקי בית", "משחקי שטח",
      "משחקי חורף", "משחקי קיץ", "משחקי אביב"
    ],
    "cat-007": [
      "הרצאות מוטיבציה", "הרצאות כלכלה", "הרצאות בריאות", "הרצאות חינוך", "הרצאות מדע",
      "הרצאות טכנולוגיה", "הרצאות אמנות", "הרצאות היסטוריה", "הרצאות פילוסופיה", "הרצאות דת",
      "סדנאות יצירה", "סדנאות בישול", "סדנאות צילום", "סדנאות מוזיקה", "סדנאות מחול",
      "סדנאות כתיבה", "סדנאות משחק", "סדנאות מלאכה", "סדנאות ספורט", "סדנאות מחשב",
      "סדנאות ניהול", "סדנאות שפות", "סדנאות אומנות", "סדנאות טבע", "סדנאות מדעים",
      "סדנאות פסיכולוגיה", "סדנאות רוחניות", "סדנאות משפחה", "סדנאות חברה", "סדנאות עסקים"
    ],
    "cat-008": [
      "קריאת מחשבות", "מנטליזם במה", "מנטליזם קרוב", "אשליות מנטליות", "ניחוש מספרים",
      "בדיקת פוליגרף", "קריאת כפות", "קריאת קלפים", "קריאת עתיד", "מדיום",
      "כישוף מחשבות", "השפעה מנטלית", "טלפתיה", "מופעי מסתורין", "כישוף אלקטרוני",
      "מנטליזם מדעי", "פסיכולוגיה מעשית", "קוסמות נפש", "רפואה נטורופתית", "ריפוי אנרגטי",
      "אבחון אורתי", "קריאת אמוציות", "מדידת שדות", "ביואנרגטיקה", "קינסיולוגיה",
      "רפלקסולוגיה", "אירידולוגיה", "נומרולוגיה", "אסטרולוגיה", "טארוט"
    ],
    "cat-009": [
      "סטנדאפ קלאסי", "סטנדאפ מתחילים", "סטנדאפ מתקדמים", "סטנדאפ משפחתי", "סטנדאפ עסקי",
      "סטנדאפ ילדים", "סטנדאפ מבוגרים", "סטנדאפ אלתור", "סטנדאפ תכנותי", "סטנדאפ אישי",
      "סטנדאפ זוגי", "סטנדאפ קבוצתי", "סטנדאפ אתני", "סטנדאפ דתי", "סטנדאפ חילוני",
      "סטנדאפ פוליטי", "סטנדאפ חברתי", "סטנדאפ כלכלי", "סטנדאפ טכנולוגי", "סטנדאפ ספורט",
      "סטנדאפ מזון", "סטנדאפ נסיעות", "סטנדאפ בית", "סטנדאפ עבודה", "סטנדאפ בריאות",
      "סטנדאפ יופי", "סטנדאפ חינוך", "סטנדאפ מדעי", "סטנדאפ אמנותי", "סטנדאפ פילוסופי"
    ],
    "cat-010": [
      "קייטרינג בשרי", "קייטרינג חלבי", "קייטרינג פרווה", "קייטרינג כשר", "קייטרינג טבעוני",
      "קייטרינג גורמה", "קייטרינג ביתי", "קייטרינג מזרחי", "קייטרינג איטלקי", "קייטרינג סיני",
      "קייטרינג הודי", "קייטרינג מקסיקני", "קייטרינג יפני", "קייטרינג תאילנדי", "קייטרינג ים תיכוני",
      "קייטרינג ברביקיו", "קייטרינג דגים", "קייטרינג עוף", "קייטרינג בקר", "קייטרינג צמחוני",
      "קייטרינג קינוחים", "קייטרינג משקאות", "קייטרינג אלכוהול", "קייטרינג קפה", "קייטרינג מיצים",
      "קייטרינג פירות", "קייטרינג ירקות", "קייטרינג לחמים", "קייטרינג גלידה", "קייטרינג שוקולד"
    ]
  };

  const templates = subcategoriesTemplates[categoryId as keyof typeof subcategoriesTemplates] || [];
  
  return templates.map((name, index) => ({
    id: `${categoryId}-sub-${index + 1}`,
    name,
    categoryId,
    description: `תת קטגוריה של ${categoryName}`,
    providersCount: 0,
    servicesCount: 0,
    providers: [],
    isSimulated: templates.length < 30
  }));
};

// יצירת ספקים סימולציה
export const generateSimulatedProviders = (subcategoryId: string, subcategoryName: string, count: number = 50): ExtendedProvider[] => {
  const providers: ExtendedProvider[] = [];
  
  for (let i = 1; i <= count; i++) {
    const providerId = `sim-provider-${subcategoryId}-${i}`;
    
    providers.push({
      id: providerId,
      name: `${subcategoryName} - ספק ${i}`,
      businessName: `עסק ${subcategoryName} ${i}`,
      description: `ספק מקצועי בתחום ${subcategoryName} עם ניסיון רב ושירות מעולה`,
      categoryIds: [subcategoryId.split('-sub-')[0]],
      subcategoryIds: [subcategoryId],
      contactPerson: `איש קשר ${i}`,
      email: `provider${i}@${subcategoryId}.co.il`,
      phone: `050-${String(i).padStart(7, '0')}`,
      city: ['תל אביב', 'ירושלים', 'חיפה', 'באר שבע', 'נתניה'][i % 5],
      rating: 4.0 + (Math.random() * 1.0),
      reviewCount: Math.floor(Math.random() * 200) + 10,
      verified: Math.random() > 0.3,
      featured: Math.random() > 0.8,
      calendarActive: true,
      hasAvailableCalendar: true,
      services: [],
      isSimulated: true,
      simulationTags: ['auto-generated', subcategoryName],
      defaultAvailability: {
        workingDays: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'],
        workingHours: {
          start: '09:00',
          end: '22:00'
        },
        exceptions: []
      }
    });
  }
  
  return providers;
};

// יצירת שירותים סימולציה
export const generateSimulatedServices = (providerId: string, providerName: string, subcategoryName: string): ExtendedService[] => {
  const conceptTagsOptions = [
    'יום הולדת', 'בר מצווה', 'בת מצווה', 'חתונה', 'אירועי חברה', 
    'מסיבת רווקים', 'מסיבת רווקות', 'ערב גיבוש', 'מסיבת סיום',
    'יום העצמאות', 'חנוכה', 'פורים', 'ראש השנה', 'יום כיפור'
  ];
  
  // בחירה אקראית של 2-4 קונספטים
  const selectedConcepts = conceptTagsOptions
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3) + 2);

  return [{
    id: `sim-service-${providerId}-1`,
    providerId,
    name: `שירות ${subcategoryName} מקצועי`,
    description: `שירות איכותי ומקצועי בתחום ${subcategoryName} מאת ${providerName}`,
    categoryId: providerId.split('-')[2].split('-sub-')[0],
    subcategoryId: providerId.split('-')[2] + '-sub-' + providerId.split('-')[3],
    price: Math.floor(Math.random() * 3000) + 500,
    priceUnit: 'לאירוע',
    duration: Math.floor(Math.random() * 180) + 30,
    imageUrl: `https://images.unsplash.com/photo-${Date.now()}?w=400&h=300&fit=crop`,
    additionalImages: [],
    videos: [],
    rating: 4.0 + (Math.random() * 1.0),
    reviewCount: Math.floor(Math.random() * 100) + 5,
    featured: Math.random() > 0.7,
    available: true,
    tags: [subcategoryName, 'מקצועי', 'איכותי'],
    conceptTags: selectedConcepts, // *** הוספת קונספטים דמיים ***
    suitableFor: ['אירועי חברה', 'אירועים פרטיים'],
    audienceSize: {
      min: 10,
      max: 200,
      optimal: 50
    },
    technicalRequirements: ['חשמל', 'מקום מתאים'],
    setupTime: 30,
    isReceptionService: Math.random() > 0.7,
    isSimulated: true,
    type: 'simulated',
    availabilitySlots: generateDefaultAvailabilitySlots()
  }];
};

// יצירת זמינות ברירת מחדל
export const generateDefaultAvailabilitySlots = (): AvailabilitySlot[] => {
  const slots: AvailabilitySlot[] = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    // דילוג על שישי ושבת
    if (date.getDay() === 5 || date.getDay() === 6) continue;
    
    slots.push({
      date: date.toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '22:00',
      isAvailable: true,
      maxBookings: 1,
      currentBookings: 0
    });
  }
  
  return slots;
};

// בדיקת נתונים יתומים
export const findOrphanedData = (providers: ExtendedProvider[], services: ExtendedService[]) => {
  const orphanedProviders = providers.filter(provider => 
    !provider.subcategoryIds || provider.subcategoryIds.length === 0
  );
  
  const orphanedServices = services.filter(service => 
    !service.providerId || !providers.find(p => p.id === service.providerId)
  );
  
  return {
    orphanedProviders,
    orphanedServices,
    totalOrphaned: orphanedProviders.length + orphanedServices.length
  };
};

// מערכת snapshot
export interface DataSnapshot {
  id: string;
  timestamp: string;
  version: string;
  categories: CategoryHierarchy[];
  totalProviders: number;
  totalServices: number;
  changes: string[];
}

export const createDataSnapshot = (categories: CategoryHierarchy[], changes: string[]): DataSnapshot => {
  const totalProviders = categories.reduce((sum, cat) => 
    sum + cat.subcategories.reduce((subSum, sub) => subSum + sub.providers.length, 0), 0
  );
  
  const totalServices = categories.reduce((sum, cat) => 
    sum + cat.subcategories.reduce((subSum, sub) => 
      subSum + sub.providers.reduce((serviceSum, provider) => serviceSum + provider.services.length, 0), 0
    ), 0
  );
  
  return {
    id: `snapshot-${Date.now()}`,
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    categories,
    totalProviders,
    totalServices,
    changes
  };
};
