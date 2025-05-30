
import { ProviderProfile, ServiceProfile } from "./types";

// תבניות עיצוב לפי קטגוריות
export const categoryTemplates = [
  {
    id: 'mind-artists',
    name: 'אומני חושים',
    colors: {
      primary: '#8B5CF6',
      secondary: '#A78BFA', 
      accent: '#C4B5FD'
    },
    styling: {
      cardStyle: 'artistic' as const,
      imageStyle: 'dramatic' as const,
      fontStyle: 'bold' as const
    },
    locationPreferences: ['תל אביב', 'ירושלים', 'חיפה', 'רמת גן'],
    priceRange: [800, 2500],
    specialties: ['מנטליזם', 'קריאת מחשבות', 'אשליות אופטיות', 'הזיות מדעיות'],
    eventTypes: ['ערבי חברה', 'בר מצווה', 'חתונות', 'אירועי עסקים']
  },
  {
    id: 'magicians',
    name: 'קוסמים',
    colors: {
      primary: '#DC2626',
      secondary: '#EF4444',
      accent: '#FCA5A5'
    },
    styling: {
      cardStyle: 'artistic' as const,
      imageStyle: 'vibrant' as const,
      fontStyle: 'bold' as const
    },
    locationPreferences: ['תל אביב', 'פתח תקווה', 'רעננה', 'הרצליה'],
    priceRange: [600, 2000],
    specialties: ['קסמי במה', 'קסמי סלון', 'בלונים', 'בידור לילדים'],
    eventTypes: ['ימי הולדת', 'בר מצווה', 'אירועי ילדים', 'פעילויות משפחה']
  },
  {
    id: 'singers',
    name: 'זמרים',
    colors: {
      primary: '#059669',
      secondary: '#10B981',
      accent: '#86EFAC'
    },
    styling: {
      cardStyle: 'elegant' as const,
      imageStyle: 'elegant' as const,
      fontStyle: 'elegant' as const
    },
    locationPreferences: ['תל אביב', 'ירושלים', 'חיפה', 'באר שבע'],
    priceRange: [1000, 4000],
    specialties: ['מוזיקה קלאסית', 'מוזיקה מזרחית', 'רוק', 'ג\'אז'],
    eventTypes: ['חתונות', 'בר מצווה', 'ערבי נוסטלגיה', 'קונצרטים']
  },
  {
    id: 'musicians',
    name: 'נגנים',
    colors: {
      primary: '#7C3AED',
      secondary: '#8B5CF6',
      accent: '#C4B5FD'
    },
    styling: {
      cardStyle: 'elegant' as const,
      imageStyle: 'elegant' as const,
      fontStyle: 'elegant' as const
    },
    locationPreferences: ['תל אביב', 'רמת גן', 'פתח תקווה', 'חיפה'],
    priceRange: [800, 3000],
    specialties: ['גיטרה', 'פסנתר', 'כינור', 'תופים'],
    eventTypes: ['חתונות', 'ערבי אירוח', 'קונצרטים', 'ערבי סלון']
  },
  {
    id: 'bands',
    name: 'להקות',
    colors: {
      primary: '#DB2777',
      secondary: '#EC4899',
      accent: '#F9A8D4'
    },
    styling: {
      cardStyle: 'modern' as const,
      imageStyle: 'vibrant' as const,
      fontStyle: 'bold' as const
    },
    locationPreferences: ['תל אביב', 'ירושלים', 'חיפה', 'נתניה'],
    priceRange: [2000, 8000],
    specialties: ['רוק', 'ג\'אז', 'פופ', 'מוזיקה מזרחית'],
    eventTypes: ['חתונות', 'בר מצווה', 'פסטיבלים', 'ערבי חברה']
  },
  {
    id: 'comedians',
    name: 'סטנדאפיסטים',
    colors: {
      primary: '#EA580C',
      secondary: '#FB923C',
      accent: '#FED7AA'
    },
    styling: {
      cardStyle: 'modern' as const,
      imageStyle: 'vibrant' as const,
      fontStyle: 'casual' as const
    },
    locationPreferences: ['תל אביב', 'רמת גן', 'הרצליה', 'פתח תקווה'],
    priceRange: [800, 2500],
    specialties: ['סטנדאפ', 'אמפרוביזציה', 'בידור עסקי', 'הופעות אישיות'],
    eventTypes: ['ערבי חברה', 'אירועי עסקים', 'ימי הולדת למבוגרים', 'ערבי בידור']
  }
];

// שמות ספקים ותיאורים מותאמים לכל קטגוריה
const providerNames = {
  'mind-artists': [
    'נטע ברסלר - אמן המחשבות',
    'דני קסם - מנטליסט מקצועי', 
    'מיכל רוח - קוראת מחשבות',
    'איתי נפש - אמן האשליות'
  ],
  'magicians': [
    'שלמה הקוסם - מלך הקסמים',
    'דני פלא - הקוסם המדהים',
    'מירי קסמים - קוסמת הילדים',
    'יוסי שטיקיס - מאסטר הבלונים'
  ],
  'singers': [
    'יעל מלודיה - זמרת עם נשמה',
    'דוד קול - קול זהב של ישראל',
    'שירה שיר - המלכה של הבמה',
    'משה נגינה - הזמר של כולם'
  ],
  'musicians': [
    'עמית גיטרה - נגן מקצועי',
    'נועה פסנתר - המלכה של הקלידים',
    'דני תופים - מלך הקצב',
    'שרה כינור - נגנית קלאסית'
  ],
  'bands': [
    'להקת השמש - מוזיקה עם רוח',
    'בני הזמר - החברים של כולם',
    'צלילי הלב - מוזיקה מהלב',
    'להקת הכוכבים - אמני במה מקצועיים'
  ],
  'comedians': [
    'יוני צחוק - הסטנדאפיסט המצחיק',
    'דנה בדיחה - המלכה של הצחוק',
    'רון קומדיה - מלך הבידור',
    'שני שחוק - בידרנית מקצועית'
  ]
};

const descriptions = {
  'mind-artists': [
    'מופע מנטליזם מרתק שישאיר את הקהל עם הפה פתוח. שילוב של קריאת מחשבות, ניבוי עתיד ואשליות מדהימות.',
    'אמן חושים מנוסה עם למעלה מ-15 שנות ניסיון בבידור קהלים. מתמחה בקריאת מחשבות ואשליות מנטליות.',
    'מופע אינטראקטיבי ומרתק של מנטליזם ואמנות החושים. יעניק לכם חוויה בלתי נשכחת.',
    'מנטליסט מקצועי המתמחה באשליות מחשבה ובידור מרתק לכל הגילאים.'
  ],
  'magicians': [
    'קוסם מקצועי עם מעל 20 שנות ניסיון. מתמחה בקסמי במה, בלונים ובידור לילדים.',
    'מופעי קסמים מרתקים לכל המשפחה. שילוב של קסמים קלאסיים וחדשנות מודרנית.',
    'קוסם וילדים המביא שמחה ופלא לכל אירוע. מתמחה בבידור אינטראקטיבי.',
    'אמן קסמים מנוסה המציע מופעים מותאמים לכל סוג קהל ואירוע.'
  ],
  'singers': [
    'זמרת מקצועית עם קול יוצא דופן. רפרטואר עשיר הכולל שירים בעברית, אנגלית וערבית.',
    'זמר עם נשמה וקול חם המרגש קהלים זה שנים רבות. מתמחה במוזיקה מזרחית וישראלית.',
    'אמנית ווקאלית מרגשת עם ביצועים חיים מהלב. מתאימה לכל סוג אירוע.',
    'זמר מקצועי עם ניסיון בהופעות גדולות. קול עוצמתי ונוכחות בימתית מרשימה.'
  ],
  'musicians': [
    'נגן גיטרה מקצועי עם ניסיון של למעלה מ-15 שנה. מתמחה בסגנונות מגוונים.',
    'פסנתרנית קלאסית מוכשרת המביאה אלגנטיות ורגש לכל אירוע.',
    'נגן תופים עם גרוב מדבק וטכניקה מעולה. מתאים לכל סגנון מוזיקלי.',
    'כנרת מקצועית עם השכלה מוזיקלית גבוהה. מביאה יופי וחן לכל אירוע.'
  ],
  'bands': [
    'להקה מקצועית עם שנים של ניסיון בהופעות. רפרטואר עשיר ומגוון לכל טעם.',
    'קבוצת מוזיקאים מנוסים המציעה מופעים איכותיים ומרגשים.',
    'להקה דינמית עם אנרגיה מדבקת. מתמחה ביצירת אווירה מושלמת.',
    'צוות מוזיקלי מקצועי המביא את המוזיקה הטובה ביותר לאירוע שלכם.'
  ],
  'comedians': [
    'סטנדאפיסט מקצועי עם חוש הומור חד ויכולת לקרוא קהל מעולה.',
    'קומיקאית מרגשת שמביאה צחוק וחיוכים לכל אירוע. מתאימה לקהל מבוגר.',
    'בדרן מקצועי עם יכולת אימפרוביזציה מעולה. מתאים לאירועים עסקיים ופרטיים.',
    'אמנית סטנדאפ עם סגנון ייחודי וקומדיה איכותית. מבטיחה ערב מלא צחוקים.'
  ]
};

// פונקציה ליצירת ספקים לפי קטגוריה
export const generateProvidersForCategory = (categoryId: string, count: number = 5): ProviderProfile[] => {
  const template = categoryTemplates.find(t => t.id === categoryId);
  if (!template) return [];

  const names = providerNames[categoryId as keyof typeof providerNames] || [];
  const descs = descriptions[categoryId as keyof typeof descriptions] || [];

  const providers: ProviderProfile[] = [];

  for (let i = 0; i < count; i++) {
    const nameIndex = i % names.length;
    const descIndex = i % descs.length;
    
    const provider: ProviderProfile = {
      id: `generated-${categoryId}-${Date.now()}-${i}`,
      businessName: names[nameIndex] || `${template.name} מקצועי ${i + 1}`,
      contactPerson: names[nameIndex]?.split(' - ')[0] || `איש קשר ${i + 1}`,
      description: descs[descIndex] || `${template.name} מקצועי עם ניסיון רב`,
      email: `contact${i + 1}@${categoryId}.co.il`,
      phone: `050-${Math.floor(Math.random() * 9000000) + 1000000}`,
      city: template.locationPreferences[i % template.locationPreferences.length],
      address: `רחוב הדוגמה ${Math.floor(Math.random() * 100) + 1}`,
      website: `www.${categoryId}-${i + 1}.co.il`,
      categories: [template.name],
      logo: `https://images.unsplash.com/photo-${1500000000000 + i}?w=100&h=100&fit=crop&crop=faces`,
      gallery: [
        `https://images.unsplash.com/photo-${1500000000000 + i}?w=400&h=300&fit=crop`,
        `https://images.unsplash.com/photo-${1500000000000 + i + 1}?w=400&h=300&fit=crop`,
        `https://images.unsplash.com/photo-${1500000000000 + i + 2}?w=400&h=300&fit=crop`
      ],
      rating: Math.round((4 + Math.random()) * 10) / 10,
      reviewCount: Math.floor(Math.random() * 100) + 10,
      verified: Math.random() > 0.3,
      featured: Math.random() > 0.7,
      specialties: template.specialties.slice(0, 2 + Math.floor(Math.random() * 2)),
      yearsExperience: Math.floor(Math.random() * 15) + 5,
      insurance: Math.random() > 0.2,
      testimonials: []
    };

    providers.push(provider);
  }

  return providers;
};

// פונקציה ליצירת שירותים לספקים
export const generateServicesForProviders = (providers: ProviderProfile[]): ServiceProfile[] => {
  const services: ServiceProfile[] = [];

  providers.forEach((provider, providerIndex) => {
    const categoryTemplate = categoryTemplates.find(t => 
      provider.categories.some(cat => cat === t.name)
    );

    if (!categoryTemplate) return;

    // יצירת 2-4 שירותים לכל ספק
    const serviceCount = 2 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < serviceCount; i++) {
      const basePrice = categoryTemplate.priceRange[0] + 
        Math.floor(Math.random() * (categoryTemplate.priceRange[1] - categoryTemplate.priceRange[0]));
      
      const service: ServiceProfile = {
        id: `service-${provider.id}-${i}`,
        providerId: provider.id,
        name: `${categoryTemplate.name} - חבילה ${i + 1}`,
        description: `מופע ${categoryTemplate.name} מקצועי המותאם במיוחד לאירוע שלכם`,
        price: basePrice,
        priceUnit: 'לאירוע',
        duration: 60 + (i * 30),
        maxAttendees: 50 + (i * 50),
        images: provider.gallery,
        category: categoryTemplate.name,
        suitableFor: categoryTemplate.eventTypes.slice(0, 2 + i),
        featured: Math.random() > 0.8,
        rating: provider.rating,
        reviewCount: Math.floor((provider.reviewCount || 0) / serviceCount),
        location: provider.city,
        tags: provider.specialties || [],
        features: [
          'ביצוע מקצועי ברמה הגבוהה ביותר',
          'התאמה מלאה לקהל הלקוחות',
          'ציוד מקצועי כלול במחיר',
          'גמישות בתאריכים ושעות'
        ]
      };

      services.push(service);
    }
  });

  return services;
};
