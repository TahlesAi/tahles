
import { SearchResultService, ProviderProfile, Review } from '@/lib/types';

// Unified service data - comprehensive demo with 30+ services
export const unifiedServices: SearchResultService[] = [
  // אמני חושים ומנטליסטים
  {
    id: 'neta-bresler-mentalist',
    name: 'נטע ברסלר - אמן החשיבה',
    provider: 'נטע ברסלר',
    providerId: 'neta-bresler-provider',
    description: 'מופע אמן חושים מרתק המשלב קריאת מחשבות, השפעה מנטלית וקסמים מדהימים. נטע ברסלר הוא אמן חושים מוביל בישראל עם מעל 15 שנות ניסיון במופעים לכל סוגי האירועים - מאירועי חברה ועד חתונות פרטיות. המופע כולל קריאת מחשבות אמיתית, השפעה מנטלית מרהיבה, קסמי נפש מדהימים ואינטראקציה מלאה עם הקהל.',
    price: 3500,
    priceUnit: 'לאירוע',
    rating: 4.9,
    reviewCount: 127,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    category: 'אמני חושים',
    subcategory: 'מנטליסטים',
    location: 'תל אביב והמרכז',
    suitableFor: ['אירועי חברה', 'חתונות', 'בר/בת מצווה', 'אירועים פרטיים', 'ערבי גיבוש'],
    featured: true,
    tags: ['קריאת מחשבות', 'השפעה מנטלית', 'אינטראקטיבי', 'מרתק', 'מקצועי'],
    imageCount: 12,
    videoCount: 5,
    videos: [
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'https://www.youtube.com/embed/ScMzIvxBSi4',
      'https://www.youtube.com/embed/oHg5SJYRHA0'
    ],
    additionalImages: [
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'dani-mentalist',
    name: 'דני קלמן - מנטליסט',
    provider: 'דני קלמן',
    providerId: 'dani-klelman-provider',
    description: 'מנטליסט מקצועי המתמחה בקריאת מחשבות ומופעי השפעה מנטלית לאירועי חברה וערבי גיבוש.',
    price: 2800,
    priceUnit: 'לאירוע',
    rating: 4.7,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1529333166437-7cea30f76a32?w=800&h=600&fit=crop',
    category: 'אמני חושים',
    subcategory: 'מנטליסטים',
    location: 'מרכז וצפון',
    suitableFor: ['אירועי חברה', 'ערבי גיבוש', 'אירועים פרטיים'],
    featured: true,
    tags: ['מנטליזם', 'קריאת מחשבות', 'ערבי גיבוש'],
    additionalImages: [
      'https://images.unsplash.com/photo-1537074142379-4ce9d4cd7901?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'maya-magician',
    name: 'מאיה הקוסמת',
    provider: 'מאיה לוין',
    providerId: 'maya-magician-provider',
    description: 'קוסמת מקצועית עם מופעי קסמים מדהימים המתאימים לכל הגילאים.',
    price: 2200,
    priceUnit: 'לאירוע',
    rating: 4.8,
    reviewCount: 67,
    imageUrl: 'https://images.unsplash.com/photo-1612103198005-b1f1a4f86990?w=800&h=600&fit=crop',
    category: 'קוסמים',
    subcategory: 'קסמי במה',
    location: 'חיפה והצפון',
    suitableFor: ['ימי הולדת', 'אירועי ילדים', 'אירועי משפחה'],
    featured: false,
    tags: ['קסמים', 'ילדים', 'משפחתי']
  },

  // זמרים ונגנים
  {
    id: 'harmony-band',
    name: 'להקת הרמוניה',
    provider: 'להקת הרמוניה',
    providerId: 'harmony-band-provider',
    description: 'להקה מקצועית עם רפרטואר עשיר המתאימה לחתונות ואירועי חברה.',
    price: 5500,
    priceUnit: 'לאירוע',
    rating: 4.6,
    reviewCount: 73,
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    category: 'זמרים ונגנים',
    subcategory: 'להקות',
    location: 'ירושלים והסביבה',
    suitableFor: ['חתונות', 'אירועי חברה', 'אירועים פרטיים'],
    featured: true,
    tags: ['מוזיקה חיה', 'חתונות', 'אירועי חברה']
  },
  {
    id: 'shir-israeli-singer',
    name: 'שיר ישראלי - זמרת',
    provider: 'שיר ישראלי',
    providerId: 'shir-israeli-provider',
    description: 'זמרת מקצועית עם רפרטואר עשיר המתאים לכל סוגי האירועים.',
    price: 2500,
    priceUnit: 'למופע',
    rating: 4.7,
    reviewCount: 63,
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop',
    category: 'זמרים ונגנים',
    subcategory: 'זמרים',
    location: 'ירושלים והמרכז',
    suitableFor: ['חתונות', 'אירועי חברה', 'ימי הולדת'],
    featured: false,
    tags: ['זמרת', 'חתונות', 'מוזיקה']
  },
  {
    id: 'classical-quartet',
    name: 'רביעיית המיתרים הקלאסית',
    provider: 'רביעיית אלגרו',
    providerId: 'classical-quartet-provider',
    description: 'רביעיית מיתרים מקצועית לאירועים אלגנטיים.',
    price: 3200,
    priceUnit: 'למופע',
    rating: 4.9,
    reviewCount: 41,
    imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&h=600&fit=crop',
    category: 'זמרים ונגנים',
    subcategory: 'נגנים',
    location: 'מרכז וצפון',
    suitableFor: ['חתונות', 'אירועים יוקרתיים', 'ערבי תרבות'],
    featured: false,
    tags: ['קלאסי', 'מיתרים', 'אלגנטי']
  },
  {
    id: 'jazz-trio',
    name: 'שלישיית הג\'אז',
    provider: 'ג\'אז סטודיו',
    providerId: 'jazz-trio-provider',
    description: 'שלישיית ג\'אז מקצועית המתאימה לאירועים אינטימיים ויוקרתיים.',
    price: 4000,
    priceUnit: 'לערב',
    rating: 4.8,
    reviewCount: 35,
    imageUrl: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop',
    category: 'זמרים ונגנים',
    subcategory: 'נגנים',
    location: 'תל אביב',
    suitableFor: ['אירועי חברה', 'ערבי קוקטייל', 'מסיבות פרטיות'],
    featured: true,
    tags: ['ג\'אז', 'אינטימי', 'קוקטייל']
  },

  // תקליטנים
  {
    id: 'dj-groove',
    name: 'די ג\'יי גרוב',
    provider: 'אלון גרוב',
    providerId: 'dj-groove-provider',
    description: 'תקליטן מקצועי לכל סוגי האירועים עם ציוד הגברה ותאורה.',
    price: 2800,
    priceUnit: 'לאירוע',
    rating: 4.6,
    reviewCount: 118,
    imageUrl: 'https://images.unsplash.com/photo-1571266028243-e4b018d5b936?w=800&h=600&fit=crop',
    category: 'תקליטנים',
    location: 'כל הארץ',
    suitableFor: ['חתונות', 'מסיבות', 'אירועי חברה'],
    featured: false,
    tags: ['תקליטן', 'מוזיקה', 'מסיבות']
  },
  {
    id: 'dj-party-king',
    name: 'מלך המסיבות',
    provider: 'רוני פרטי',
    providerId: 'party-king-provider',
    description: 'תקליטן מקצועי המתמחה במסיבות צעירים ואירועי נוער.',
    price: 2500,
    priceUnit: 'לאירוע',
    rating: 4.7,
    reviewCount: 92,
    imageUrl: 'https://images.unsplash.com/photo-1504711331083-9c895941bf81?w=800&h=600&fit=crop',
    category: 'תקליטנים',
    location: 'מרכז ודרום',
    suitableFor: ['מסיבות נוער', 'ימי הולדת', 'מסיבות רווקים'],
    featured: false,
    tags: ['נוער', 'מסיבות', 'אנרגטי']
  },

  // סטנדאפיסטים
  {
    id: 'ron-comedian',
    name: 'רון הקומיקאי',
    provider: 'רון לוי',
    providerId: 'ron-comedian-provider',
    description: 'סטנדאפיסט מקצועי עם הומור חכם המתאים לאירועי חברה.',
    price: 4200,
    priceUnit: 'למופע',
    rating: 4.8,
    reviewCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    category: 'סטנדאפיסטים',
    location: 'תל אביב והמרכז',
    suitableFor: ['אירועי חברה', 'ערבי גיבוש', 'אירועים פרטיים'],
    featured: false,
    tags: ['קומדיה', 'בידור למבוגרים', 'הומור']
  },
  {
    id: 'comedy-show',
    name: 'מופע צחוק לייב',
    provider: 'צחוק מקצועי',
    providerId: 'comedy-live-provider',
    description: 'מופע סטנדאפ מותאם אישית לאירועים עסקיים ופרטיים.',
    price: 3000,
    priceUnit: 'למופע',
    rating: 4.6,
    reviewCount: 78,
    imageUrl: 'https://images.unsplash.com/photo-1470019693664-1d202d2c0907?w=800&h=600&fit=crop',
    category: 'סטנדאפיסטים',
    location: 'כל הארץ',
    suitableFor: ['אירועי חברה', 'ערבי גיבוש'],
    featured: false,
    tags: ['סטנדאפ', 'צחוק', 'בידור']
  },

  // קייטרינג
  {
    id: 'gourmet-catering',
    name: 'קייטרינג מעדני גורמה',
    provider: 'מעדני גורמה',
    providerId: 'gourmet-catering-provider',
    description: 'חוויה קולינרית עשירה לאירועים בכל סדר גודל עם תפריט מגוון ומיוחד.',
    price: 120,
    priceUnit: 'למנה',
    rating: 4.7,
    reviewCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=600&fit=crop',
    category: 'שירותי מזון ומשקאות',
    subcategory: 'קייטרינג בשרי',
    location: 'מרכז וירושלים',
    suitableFor: ['חתונות', 'אירועי חברה', 'ערבי גיבוש'],
    featured: true,
    tags: ['גורמה', 'איכותי', 'מתוחכם']
  },
  {
    id: 'vegan-catering',
    name: 'קייטרינג טבעוני אורגני',
    provider: 'טבע המנה',
    providerId: 'vegan-catering-provider',
    description: 'קייטרינג טבעוני אורגני מושקע לאירועים בריאים.',
    price: 95,
    priceUnit: 'למנה',
    rating: 4.6,
    reviewCount: 48,
    imageUrl: 'https://images.unsplash.com/photo-1564675494207-534705c0d7cd?w=800&h=600&fit=crop',
    category: 'שירותי מזון ומשקאות',
    subcategory: 'קייטרינג חלבי',
    location: 'מרכז',
    suitableFor: ['אירועי בריאות', 'אירועים אקולוגיים'],
    featured: false,
    tags: ['טבעוני', 'אורגני', 'בריא']
  },
  {
    id: 'kosher-catering',
    name: 'קייטרינג כשר מהדרין',
    provider: 'טעמי ישראל',
    providerId: 'kosher-catering-provider',
    description: 'קייטרינג כשר מהדרין עם תפריט מסורתי ומודרני.',
    price: 110,
    priceUnit: 'למנה',
    rating: 4.8,
    reviewCount: 134,
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    category: 'שירותי מזון ומשקאות',
    subcategory: 'קייטרינג בשרי',
    location: 'ירושלים ובני ברק',
    suitableFor: ['חתונות כשרות', 'בר/בת מצווה', 'אירועי חג'],
    featured: true,
    tags: ['כשר', 'מהדרין', 'מסורתי']
  },

  // ברים ומשקאות
  {
    id: 'cocktail-bar',
    name: 'בר ניידת קוקטיילס',
    provider: 'קוקטיילס בר',
    providerId: 'cocktail-bar-provider',
    description: 'בר ניידת מקצועית עם ברמנים מנוסים ומבחר משקאות איכותיים.',
    price: 3000,
    priceUnit: 'לאירוע בסיסי',
    rating: 4.5,
    reviewCount: 76,
    imageUrl: 'https://images.unsplash.com/photo-1470338950318-40320a722782?w=800&h=600&fit=crop',
    category: 'שירותי מזון ומשקאות',
    subcategory: 'ברים ניידים',
    location: 'מרכז',
    suitableFor: ['חתונות', 'ערבי קוקטייל', 'אירועי חברה'],
    featured: false,
    tags: ['קוקטיילים', 'ברמנים', 'משקאות']
  },
  {
    id: 'wine-bar',
    name: 'בר יינות בוטיק',
    provider: 'יינות הארץ',
    providerId: 'wine-bar-provider',
    description: 'בר יינות מקצועי עם מבחר יינות איכותיים וטעימות מודרכות.',
    price: 3500,
    priceUnit: 'לאירוע',
    rating: 4.9,
    reviewCount: 52,
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=600&fit=crop',
    category: 'שירותי מזון ומשקאות',
    subcategory: 'ברים ניידים',
    location: 'מרכז וצפון',
    suitableFor: ['אירועי יוקרה', 'ערבי טעימות', 'אירועי חברה'],
    featured: true,
    tags: ['יינות', 'בוטיק', 'טעימות']
  },

  // לוקיישנים
  {
    id: 'tlv-loft',
    name: 'לופט תל אביב',
    provider: 'לופט TLV',
    providerId: 'tlv-loft-provider',
    description: 'לופט מעוצב בלב תל אביב, מתאים לאירועים פרטיים ועסקיים עד 100 איש.',
    price: 7000,
    priceUnit: 'ליום',
    rating: 4.7,
    reviewCount: 43,
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop',
    category: 'לוקיישנים ומתחמי אירוח',
    subcategory: 'לופטים',
    location: 'תל אביב',
    suitableFor: ['אירועי חברה', 'מסיבות פרטיות', 'השקות'],
    featured: false,
    tags: ['לופט', 'מעוצב', 'תל אביב']
  },
  {
    id: 'garden-venue',
    name: 'גן אירועים פסטורלי',
    provider: 'גני הטבע',
    providerId: 'garden-venue-provider',
    description: 'גן אירועים בטבע עם נוף מרהיב לאירועים של עד 250 איש.',
    price: 15000,
    priceUnit: 'לאירוע',
    rating: 4.8,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
    category: 'לוקיישנים ומתחמי אירוח',
    subcategory: 'אולמות אירועים',
    location: 'שרון',
    suitableFor: ['חתונות', 'אירועי חברה', 'חגיגות'],
    featured: true,
    tags: ['טבע', 'נוף', 'גן']
  },
  {
    id: 'luxury-villa',
    name: 'וילה פרטית לאירועים',
    provider: 'וילות הים',
    providerId: 'luxury-villa-provider',
    description: 'וילה יוקרתית עם נוף לים לאירועים אקסקלוסיביים.',
    price: 12000,
    priceUnit: 'ליום',
    rating: 4.9,
    reviewCount: 36,
    imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
    category: 'לוקיישנים ומתחמי אירוח',
    subcategory: 'וילות אירוח',
    location: 'הרצליה',
    suitableFor: ['חתונות יוקרה', 'אירועים פרטיים', 'חגיגות משפחתיות'],
    featured: true,
    tags: ['וילה', 'יוקרה', 'נוף לים']
  },

  // צלמים
  {
    id: 'yaakov-photographer',
    name: 'יעקב הצלם',
    provider: 'יעקב כהן',
    providerId: 'yaakov-photographer-provider',
    description: 'צילום מקצועי לאירועים פרטיים ועסקיים, כולל עריכה מלאה.',
    price: 2200,
    priceUnit: 'לאירוע',
    rating: 4.8,
    reviewCount: 112,
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop',
    category: 'שירותי הפקה',
    subcategory: 'צילום סטילס',
    location: 'כל הארץ',
    suitableFor: ['חתונות', 'אירועי חברה', 'ימי הולדת'],
    featured: false,
    tags: ['צילום', 'מקצועי', 'עריכה']
  },
  {
    id: 'video-pro',
    name: 'צילום וידאו מקצועי',
    provider: 'וידאו פרו',
    providerId: 'video-pro-provider',
    description: 'צילום וידאו מקצועי לאירועים כולל עריכה ותוצר באיכות קולנועית.',
    price: 3500,
    priceUnit: 'לאירוע',
    rating: 4.9,
    reviewCount: 67,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop',
    category: 'שירותי הפקה',
    subcategory: 'צילום וידאו',
    location: 'מרכז וצפון',
    suitableFor: ['חתונות', 'אירועי חברה', 'דוקומנטרי'],
    featured: true,
    tags: ['וידאו', 'קולנועי', 'מקצועי']
  },

  // עיצובים ופרחים
  {
    id: 'flower-fantasy',
    name: 'עיצובי פרחים פנטזיה',
    provider: 'פנטזיה עיצובים',
    providerId: 'flower-fantasy-provider',
    description: 'עיצובי פרחים מרהיבים וייחודיים לכל אירוע.',
    price: 1500,
    priceUnit: 'בסיס לאירוע',
    rating: 4.6,
    reviewCount: 68,
    imageUrl: 'https://images.unsplash.com/photo-1561128290-e900944315fe?w=800&h=600&fit=crop',
    category: 'שירותי הפקה',
    subcategory: 'עיצוב פרחים',
    location: 'צפון ומרכז',
    suitableFor: ['חתונות', 'אירועי חברה', 'חגיגות'],
    featured: false,
    tags: ['פרחים', 'עיצוב', 'אומנות']
  },
  {
    id: 'event-design',
    name: 'עיצוב אירועים כוכב',
    provider: 'כוכב עיצובים',
    providerId: 'event-design-provider',
    description: 'עיצוב אירועים מלא כולל תאורה, בדים, פרחים ואביזרים.',
    price: 5000,
    priceUnit: 'לאירוע בסיסי',
    rating: 4.8,
    reviewCount: 53,
    imageUrl: 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=800&h=600&fit=crop',
    category: 'שירותי הפקה',
    subcategory: 'עיצוב אירועים',
    location: 'מרכז',
    suitableFor: ['חתונות', 'אירועי חברה', 'אירועי יוקרה'],
    featured: true,
    tags: ['עיצוב', 'תאורה', 'יוקרה']
  },

  // הגברה ותאורה
  {
    id: 'sound-boom',
    name: 'הגברה ותאורה מקצועית',
    provider: 'סאונד בום',
    providerId: 'sound-boom-provider',
    description: 'שירותי הגברה ותאורה מקצועיים לכל סוגי האירועים.',
    price: 2800,
    priceUnit: 'לאירוע',
    rating: 4.7,
    reviewCount: 82,
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    category: 'שירותי הפקה',
    subcategory: 'ציוד הגברה',
    location: 'כל הארץ',
    suitableFor: ['אירועי חברה', 'חתונות', 'כנסים'],
    featured: false,
    tags: ['הגברה', 'תאורה', 'ציוד']
  },

  // מתנות
  {
    id: 'magnet-photos',
    name: 'צלמות מגנטים לאירועים',
    provider: 'מגנטיקס',
    providerId: 'magnet-photos-provider',
    description: 'צילומי מגנטים מיוחדים לאירועים עם מגוון אביזרים ורקעים.',
    price: 1200,
    priceUnit: 'לשעתיים',
    rating: 4.6,
    reviewCount: 87,
    imageUrl: 'https://images.unsplash.com/photo-1552334823-ca7f70361452?w=800&h=600&fit=crop',
    category: 'מתנות',
    subcategory: 'מגנטים וצילומי מגנט',
    location: 'כל הארץ',
    suitableFor: ['חתונות', 'בר/בת מצווה', 'אירועי חברה'],
    featured: false,
    tags: ['מגנטים', 'זיכרון', 'צילום']
  },

  // סדנאות
  {
    id: 'chocolate-workshop',
    name: 'סדנת שוקולד',
    provider: 'שוקולאב',
    providerId: 'chocolate-workshop-provider',
    description: 'סדנה חווייתית להכנת פרליני שוקולד, מתאימה לאירועי גיבוש וימי כיף.',
    price: 1800,
    priceUnit: 'ל-20 משתתפים',
    rating: 4.8,
    reviewCount: 54,
    imageUrl: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&h=600&fit=crop',
    category: 'ימי כיף וטיולים',
    subcategory: 'סדנאות בישול',
    location: 'מרכז',
    suitableFor: ['ערבי גיבוש', 'אירועי חברה', 'ימי כיף'],
    featured: false,
    tags: ['סדנה', 'שוקולד', 'גיבוש']
  },

  // הפקות
  {
    id: 'total-events',
    name: 'הפקת אירועים טוטאל',
    provider: 'טוטאל הפקות',
    providerId: 'total-events-provider',
    description: 'הפקה מלאה של אירועים עסקיים, כולל ציוד טכני, קייטרינג ותכנים.',
    price: 15000,
    priceUnit: 'לאירוע בסיסי',
    rating: 4.9,
    reviewCount: 29,
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    category: 'שירותי הפקה',
    subcategory: 'מפיקי אירועים',
    location: 'כל הארץ',
    suitableFor: ['אירועי חברה', 'כנסים', 'השקות'],
    featured: true,
    tags: ['הפקה', 'מקצועי', 'מלא']
  }
];

// Unified provider data - 30+ providers
export const unifiedProviders: ProviderProfile[] = [
  {
    id: 'neta-bresler-provider',
    userId: 'neta-bresler-user',
    businessName: 'נטע ברסלר - אמן החשיבה',
    description: 'אמן חושים מוביל בישראל עם מעל 15 שנות ניסיון. מתמחה במופעי קריאת מחשבות והשפעה מנטלית ברמה הגבוהה ביותר. נטע הופיע באירועי ענק של חברות הייטק מובילות, חתונות יוקרתיות ואירועים פרטיים לאליטה הישראלית.',
    contactPerson: 'נטע ברסלר',
    email: 'neta@mentalist.co.il',
    phone: '052-1234567',
    address: 'רחוב הרצל 25, תל אביב',
    city: 'תל אביב',
    website: 'https://neta-mentalist.co.il',
    categories: ['אמני חושים'],
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=600&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 127,
    featured: true,
    verified: true
  },
  {
    id: 'dani-klelman-provider',
    userId: 'dani-klelman-user',
    businessName: 'דני קלמן - מנטליסט',
    description: 'מנטליסט מקצועי עם ניסיון רב באירועי חברה וערבי גיבוש. מתמחה בקריאת מחשבות ומופעי השפעה מנטלית.',
    contactPerson: 'דני קלמן',
    email: 'dani@mentalist.co.il',
    phone: '054-2345678',
    city: 'חיפה',
    categories: ['אמני חושים'],
    logo: 'https://images.unsplash.com/photo-1529333166437-7cea30f76a32?w=200&h=200&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1537074142379-4ce9d4cd7901?w=800&h=600&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 89,
    featured: true,
    verified: true
  },
  {
    id: 'maya-magician-provider',
    userId: 'maya-magician-user',
    businessName: 'מאיה לוין - קוסמת',
    description: 'קוסמת מקצועית עם מופעי קסמים מדהימים. מתמחה באירועי ילדים ומשפחתיים.',
    contactPerson: 'מאיה לוין',
    email: 'maya@magic.co.il',
    phone: '053-3456789',
    city: 'חיפה',
    categories: ['קוסמים'],
    logo: 'https://images.unsplash.com/photo-1612103198005-b1f1a4f86990?w=200&h=200&fit=crop',
    gallery: [],
    rating: 4.8,
    reviewCount: 67,
    featured: false,
    verified: true
  },
  {
    id: 'harmony-band-provider',
    userId: 'harmony-band-user',
    businessName: 'להקת הרמוניה',
    description: 'להקה מקצועית המתמחה במוזיקה חיה לאירועים. רפרטואר עשיר ומגוון לכל סוגי האירועים.',
    contactPerson: 'מיכל שירה',
    email: 'info@harmony.co.il',
    phone: '02-6543210',
    city: 'ירושלים',
    website: 'https://harmony-band.co.il',
    categories: ['זמרים ונגנים'],
    gallery: [],
    rating: 4.6,
    reviewCount: 73,
    featured: true,
    verified: true
  },
  {
    id: 'shir-israeli-provider',
    userId: 'shir-israeli-user',
    businessName: 'שיר ישראלי - זמרת',
    description: 'זמרת מקצועית עם ניסיון עשיר בהופעות באירועים פרטיים ועסקיים.',
    contactPerson: 'שיר ישראלי',
    email: 'shir@singer.co.il',
    phone: '052-4567890',
    city: 'ירושלים',
    categories: ['זמרים ונגנים'],
    gallery: [],
    rating: 4.7,
    reviewCount: 63,
    featured: false,
    verified: true
  },
  {
    id: 'classical-quartet-provider',
    userId: 'classical-quartet-user',
    businessName: 'רביעיית אלגרו',
    description: 'רביעיית מיתרים קלאסית לאירועים יוקרתיים ואלגנטיים.',
    contactPerson: 'רון לוי',
    email: 'quartet@allegro.co.il',
    phone: '050-5678901',
    city: 'תל אביב',
    categories: ['זמרים ונגנים'],
    gallery: [],
    rating: 4.9,
    reviewCount: 41,
    featured: false,
    verified: true
  },
  {
    id: 'jazz-trio-provider',
    userId: 'jazz-trio-user',
    businessName: 'ג\'אז סטודיו',
    description: 'שלישיית ג\'אז מקצועית לאירועים אינטימיים ויוקרתיים.',
    contactPerson: 'יוסי כהן',
    email: 'info@jazzstudio.co.il',
    phone: '03-6789012',
    city: 'תל אביב',
    categories: ['זמרים ונגנים'],
    gallery: [],
    rating: 4.8,
    reviewCount: 35,
    featured: true,
    verified: true
  },
  {
    id: 'dj-groove-provider',
    userId: 'dj-groove-user',
    businessName: 'אלון גרוב - תקליטן',
    description: 'תקליטן מקצועי עם ציוד מתקדם לכל סוגי האירועים.',
    contactPerson: 'אלון גרוב',
    email: 'alon@djgroove.co.il',
    phone: '054-7890123',
    city: 'תל אביב',
    categories: ['תקליטנים'],
    gallery: [],
    rating: 4.6,
    reviewCount: 118,
    featured: false,
    verified: true
  },
  {
    id: 'party-king-provider',
    userId: 'party-king-user',
    businessName: 'רוני פרטי - מלך המסיבות',
    description: 'תקליטן מקצועי המתמחה במסיבות צעירים ואירועי נוער.',
    contactPerson: 'רוני פרטי',
    email: 'roni@partyking.co.il',
    phone: '052-8901234',
    city: 'באר שבע',
    categories: ['תקליטנים'],
    gallery: [],
    rating: 4.7,
    reviewCount: 92,
    featured: false,
    verified: true
  },
  {
    id: 'ron-comedian-provider',
    userId: 'ron-comedian-user',
    businessName: 'רון לוי - קומיקאי',
    description: 'סטנדאפיסט ותסריטאי עם ניסיון עשיר בכתיבה ובהופעות. מתמחה בהומור חכם ומתוחכם.',
    contactPerson: 'רון לוי',
    email: 'ron@comedy.co.il',
    phone: '054-9012345',
    city: 'תל אביב',
    website: 'https://ron-comedy.co.il',
    categories: ['סטנדאפיסטים'],
    gallery: [],
    rating: 4.8,
    reviewCount: 156,
    featured: false,
    verified: true
  },
  {
    id: 'comedy-live-provider',
    userId: 'comedy-live-user',
    businessName: 'צחוק מקצועי',
    description: 'קבוצת סטנדאפיסטים מקצועיים המציעה מופעי צחוק מותאמים אישית.',
    contactPerson: 'יניב גולן',
    email: 'info@comedylive.co.il',
    phone: '03-0123456',
    city: 'רמת גן',
    categories: ['סטנדאפיסטים'],
    gallery: [],
    rating: 4.6,
    reviewCount: 78,
    featured: false,
    verified: true
  },
  {
    id: 'gourmet-catering-provider',
    userId: 'gourmet-catering-user',
    businessName: 'מעדני גורמה',
    description: 'קייטרינג גורמה לאירועים יוקרתיים עם התמחות במטבח בינלאומי ומקומי איכותי.',
    contactPerson: 'יוסי לוי',
    email: 'info@gourmet-catering.co.il',
    phone: '03-1234567',
    city: 'תל אביב',
    categories: ['שירותי מזון ומשקאות'],
    gallery: [],
    rating: 4.7,
    reviewCount: 156,
    featured: true,
    verified: true
  },
  {
    id: 'vegan-catering-provider',
    userId: 'vegan-catering-user',
    businessName: 'טבע המנה',
    description: 'קייטרינג טבעוני ואורגני מושקע לאירועים בריאותיים.',
    contactPerson: 'נועה גרין',
    email: 'info@vegancatering.co.il',
    phone: '054-2345678',
    city: 'רעננה',
    categories: ['שירותי מזון ומשקאות'],
    gallery: [],
    rating: 4.6,
    reviewCount: 48,
    featured: false,
    verified: true
  },
  {
    id: 'kosher-catering-provider',
    userId: 'kosher-catering-user',
    businessName: 'טעמי ישראל',
    description: 'קייטרינג כשר מהדרין עם תפריט מסורתי ומודרני לכל האירועים.',
    contactPerson: 'משה כהן',
    email: 'info@koshercatering.co.il',
    phone: '02-3456789',
    city: 'ירושלים',
    categories: ['שירותי מזון ומשקאות'],
    gallery: [],
    rating: 4.8,
    reviewCount: 134,
    featured: true,
    verified: true
  },
  {
    id: 'cocktail-bar-provider',
    userId: 'cocktail-bar-user',
    businessName: 'קוקטיילס בר',
    description: 'בר ניידת מקצועית עם ברמנים מיומנים ומבחר משקאות איכותיים.',
    contactPerson: 'דני בר',
    email: 'info@cocktailbar.co.il',
    phone: '03-4567890',
    city: 'תל אביב',
    categories: ['שירותי מזון ומשקאות'],
    gallery: [],
    rating: 4.5,
    reviewCount: 76,
    featured: false,
    verified: true
  },
  {
    id: 'wine-bar-provider',
    userId: 'wine-bar-user',
    businessName: 'יינות הארץ',
    description: 'בר יינות בוטיק עם מבחר יינות איכותיים מיקבי בוטיק ישראליים.',
    contactPerson: 'אורי וינר',
    email: 'info@winebar.co.il',
    phone: '04-5678901',
    city: 'זכרון יעקב',
    categories: ['שירותי מזון ומשקאות'],
    gallery: [],
    rating: 4.9,
    reviewCount: 52,
    featured: true,
    verified: true
  },
  {
    id: 'tlv-loft-provider',
    userId: 'tlv-loft-user',
    businessName: 'לופט TLV',
    description: 'לופט מעוצב ויוקרתי בלב תל אביב למגוון אירועים פרטיים ועסקיים.',
    contactPerson: 'תומר לוי',
    email: 'info@tlvloft.co.il',
    phone: '03-6789012',
    city: 'תל אביב',
    categories: ['לוקיישנים ומתחמי אירוח'],
    gallery: [],
    rating: 4.7,
    reviewCount: 43,
    featured: false,
    verified: true
  },
  {
    id: 'garden-venue-provider',
    userId: 'garden-venue-user',
    businessName: 'גני הטבע',
    description: 'גן אירועים פסטורלי עם נוף מרהיב וטבע עוצר נשימה.',
    contactPerson: 'שרה גרין',
    email: 'info@gardenvenue.co.il',
    phone: '09-7890123',
    city: 'כפר סבא',
    categories: ['לוקיישנים ומתחמי אירוח'],
    gallery: [],
    rating: 4.8,
    reviewCount: 89,
    featured: true,
    verified: true
  },
  {
    id: 'luxury-villa-provider',
    userId: 'luxury-villa-user',
    businessName: 'וילות הים',
    description: 'וילות יוקרתיות עם נוף לים לאירועים אקסקלוסיביים ובלעדיים.',
    contactPerson: 'מיכאל גולד',
    email: 'info@luxuryvilla.co.il',
    phone: '09-8901234',
    city: 'הרצליה',
    categories: ['לוקיישנים ומתחמי אירוח'],
    gallery: [],
    rating: 4.9,
    reviewCount: 36,
    featured: true,
    verified: true
  },
  {
    id: 'yaakov-photographer-provider',
    userId: 'yaakov-photographer-user',
    businessName: 'יעקב כהן - צלם',
    description: 'צלם מקצועי עם ניסיון רב בצילום אירועים פרטיים ועסקיים.',
    contactPerson: 'יעקב כהן',
    email: 'yaakov@photographer.co.il',
    phone: '054-9012345',
    city: 'ירושלים',
    categories: ['שירותי הפקה'],
    gallery: [],
    rating: 4.8,
    reviewCount: 112,
    featured: false,
    verified: true
  },
  {
    id: 'video-pro-provider',
    userId: 'video-pro-user',
    businessName: 'וידאו פרו',
    description: 'צוות צילום וידאו מקצועי המתמחה באירועים ויוצר תוצרים באיכות קולנועית.',
    contactPerson: 'אמיר וידאו',
    email: 'info@videopro.co.il',
    phone: '03-0123456',
    city: 'תל אביב',
    categories: ['שירותי הפקה'],
    gallery: [],
    rating: 4.9,
    reviewCount: 67,
    featured: true,
    verified: true
  },
  {
    id: 'flower-fantasy-provider',
    userId: 'flower-fantasy-user',
    businessName: 'פנטזיה עיצובים',
    description: 'סטודיו עיצוב פרחים המתמחה בעיצובים ייחודיים ומרהיבים לאירועים.',
    contactPerson: 'רונית פרח',
    email: 'info@flowerdesign.co.il',
    phone: '04-1234567',
    city: 'חיפה',
    categories: ['שירותי הפקה'],
    gallery: [],
    rating: 4.6,
    reviewCount: 68,
    featured: false,
    verified: true
  },
  {
    id: 'event-design-provider',
    userId: 'event-design-user',
    businessName: 'כוכב עיצובים',
    description: 'סטודיו עיצוב אירועים המתמחה בעיצוב מלא כולל תאורה, בדים ואביזרים.',
    contactPerson: 'דנה עיצוב',
    email: 'info@eventdesign.co.il',
    phone: '03-2345678',
    city: 'תל אביב',
    categories: ['שירותי הפקה'],
    gallery: [],
    rating: 4.8,
    reviewCount: 53,
    featured: true,
    verified: true
  },
  {
    id: 'sound-boom-provider',
    userId: 'sound-boom-user',
    businessName: 'סאונד בום',
    description: 'חברת הגברה ותאורה מקצועית עם ציוד מתקדם לכל סוגי האירועים.',
    contactPerson: 'גיא סאונד',
    email: 'info@soundboom.co.il',
    phone: '054-3456789',
    city: 'פתח תקווה',
    categories: ['שירותי הפקה'],
    gallery: [],
    rating: 4.7,
    reviewCount: 82,
    featured: false,
    verified: true
  },
  {
    id: 'magnet-photos-provider',
    userId: 'magnet-photos-user',
    businessName: 'מגנטיקס',
    description: 'שירותי צילום מגנטים מיוחדים לאירועים עם אביזרים ורקעים מגוונים.',
    contactPerson: 'ליאור מגנט',
    email: 'info@magnetics.co.il',
    phone: '052-4567890',
    city: 'נתניה',
    categories: ['מתנות'],
    gallery: [],
    rating: 4.6,
    reviewCount: 87,
    featured: false,
    verified: true
  },
  {
    id: 'chocolate-workshop-provider',
    userId: 'chocolate-workshop-user',
    businessName: 'שוקולאב',
    description: 'סטודיו לסדנאות שוקולד חווייתיות המתאימות לערבי גיבוש וימי כיף.',
    contactPerson: 'נועם שוקו',
    email: 'info@chocolab.co.il',
    phone: '03-5678901',
    city: 'רמת גן',
    categories: ['ימי כיף וטיולים'],
    gallery: [],
    rating: 4.8,
    reviewCount: 54,
    featured: false,
    verified: true
  },
  {
    id: 'total-events-provider',
    userId: 'total-events-user',
    businessName: 'טוטאל הפקות',
    description: 'חברת הפקות מלאה לאירועים עסקיים הכוללת כל שירותי ההפקה תחת קורת גג אחת.',
    contactPerson: 'אבי הפקות',
    email: 'info@totalevents.co.il',
    phone: '03-6789012',
    city: 'תל אביב',
    website: 'https://totalevents.co.il',
    categories: ['שירותי הפקה'],
    gallery: [],
    rating: 4.9,
    reviewCount: 29,
    featured: true,
    verified: true
  }
];

// Unified reviews data - comprehensive reviews for services
export const unifiedReviews: Review[] = [
  // נטע ברסלר ביקורות
  {
    id: 'review-1',
    serviceId: 'neta-bresler-mentalist',
    providerId: 'neta-bresler-provider',
    userId: 'user-1',
    userName: 'שרה כהן',
    rating: 5,
    comment: 'מופע מדהים! נטע הצליח להפתיע את כל האורחים באירוע החברה שלנו. מקצועיות ברמה הגבוהה ביותר.',
    date: '2024-01-15',
    verified: true
  },
  {
    id: 'review-2',
    serviceId: 'neta-bresler-mentalist',
    providerId: 'neta-bresler-provider',
    userId: 'user-2',
    userName: 'דוד לוי',
    rating: 5,
    comment: 'באמת קסום! הילדים והמבוגרים נהנו באותה מידה. מומלץ בחום!',
    date: '2024-01-10',
    verified: true
  },
  {
    id: 'review-3',
    serviceId: 'neta-bresler-mentalist',
    providerId: 'neta-bresler-provider',
    userId: 'user-3',
    userName: 'מיכל אברהם',
    rating: 5,
    comment: 'השתתפנו במופע של נטע בחתונה - פשוט מדהים! כל האורחים דיברו על זה שבועות',
    date: '2024-01-05',
    verified: true
  },
  {
    id: 'review-4',
    serviceId: 'neta-bresler-mentalist',
    providerId: 'neta-bresler-provider',
    userId: 'user-4',
    userName: 'אלון גרוס',
    rating: 5,
    comment: 'הופיע באירוע החברה שלנו במיקרוסופט. אין מילים! פשוט מדהים',
    date: '2023-12-28',
    verified: true
  },
  {
    id: 'review-5',
    serviceId: 'neta-bresler-mentalist',
    providerId: 'neta-bresler-provider',
    userId: 'user-5',
    userName: 'רונית שמיר',
    rating: 4,
    comment: 'מופע מרשים מאוד ומקצועי. היחס היה נהדר וההתאמה לאירוע הייתה טובה מאוד.',
    date: '2023-12-20',
    verified: true
  },
  
  // דני קלמן ביקורות
  {
    id: 'review-6',
    serviceId: 'dani-mentalist',
    providerId: 'dani-klelman-provider',
    userId: 'user-6',
    userName: 'יוסי כהן',
    rating: 5,
    comment: 'דני הופיע בערב הגיבוש שלנו והיה פשוט מצוין! כל הצוות נהנה מאוד.',
    date: '2024-01-08',
    verified: true
  },
  {
    id: 'review-7',
    serviceId: 'dani-mentalist',
    providerId: 'dani-klelman-provider',
    userId: 'user-7',
    userName: 'נועה לוין',
    rating: 5,
    comment: 'מופע מרתק וכיפי. המחיר הוגן והשירות מקצועי.',
    date: '2024-01-02',
    verified: true
  },

  // מאיה הקוסמת ביקורות
  {
    id: 'review-8',
    serviceId: 'maya-magician',
    providerId: 'maya-magician-provider',
    userId: 'user-8',
    userName: 'תמר אוחנה',
    rating: 5,
    comment: 'מאיה הופיעה ביום הולדת של הבת שלי והפתיעה את כולם. מומלץ בחום!',
    date: '2024-01-12',
    verified: true
  },

  // להקת הרמוניה ביקורות
  {
    id: 'review-9',
    serviceId: 'harmony-band',
    providerId: 'harmony-band-provider',
    userId: 'user-9',
    userName: 'רן גולדברג',
    rating: 5,
    comment: 'להקה מדהימה! השירה והנגינה ברמה הגבוהה ביותר. הפכו את החתונה שלנו לבלתי נשכחת.',
    date: '2024-01-06',
    verified: true
  },

  // קייטרינג גורמה ביקורות
  {
    id: 'review-10',
    serviceId: 'gourmet-catering',
    providerId: 'gourmet-catering-provider',
    userId: 'user-10',
    userName: 'איריס כהן',
    rating: 5,
    comment: 'איכות מעולה ושירות מקצועי. האוכל היה טעים מאוד וההגשה יפהפייה.',
    date: '2024-01-09',
    verified: true
  },
  {
    id: 'review-11',
    serviceId: 'gourmet-catering',
    providerId: 'gourmet-catering-provider',
    userId: 'user-11',
    userName: 'משה לוי',
    rating: 4,
    comment: 'קייטרינג ברמה גבוהה, מחיר מתאים לאיכות. מומלץ לאירועים חשובים.',
    date: '2024-01-03',
    verified: true
  }
];

// Helper functions for data access
export const getServiceById = (id: string): SearchResultService | undefined => {
  console.log('getServiceById called with id:', id);
  const service = unifiedServices.find(service => service.id === id);
  console.log('Found service:', service);
  return service;
};

export const getProviderById = (id: string): ProviderProfile | undefined => {
  console.log('getProviderById called with id:', id);
  const provider = unifiedProviders.find(provider => provider.id === id);
  console.log('Found provider:', provider);
  return provider;
};

export const getServicesByProvider = (providerId: string): SearchResultService[] => {
  return unifiedServices.filter(service => service.providerId === providerId);
};

export const getReviewsByService = (serviceId: string): Review[] => {
  return unifiedReviews.filter(review => review.serviceId === serviceId);
};

export const getReviewsByProvider = (providerId: string): Review[] => {
  return unifiedReviews.filter(review => review.providerId === providerId);
};

// Enhanced search functionality
export const searchServices = (query: string, filters?: {
  category?: string;
  location?: string;
  priceRange?: [number, number];
  rating?: number;
}): SearchResultService[] => {
  let results = unifiedServices;
  
  // Text search
  if (query) {
    const searchTerm = query.toLowerCase();
    results = results.filter(service => 
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.category.toLowerCase().includes(searchTerm) ||
      service.subcategory?.toLowerCase().includes(searchTerm) ||
      service.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      service.provider.toLowerCase().includes(searchTerm)
    );
  }
  
  // Category filter
  if (filters?.category) {
    results = results.filter(service => 
      service.category === filters.category ||
      service.subcategory === filters.category
    );
  }
  
  // Location filter
  if (filters?.location) {
    results = results.filter(service => 
      service.location.includes(filters.location!) ||
      service.location.includes('כל הארץ') ||
      service.location.includes('ארצי')
    );
  }
  
  // Price range filter
  if (filters?.priceRange) {
    const [minPrice, maxPrice] = filters.priceRange;
    results = results.filter(service => 
      service.price >= minPrice && service.price <= maxPrice
    );
  }
  
  // Rating filter
  if (filters?.rating) {
    results = results.filter(service => 
      service.rating >= filters.rating!
    );
  }
  
  // Sort by relevance (featured first, then by rating)
  results.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.rating - a.rating;
  });
  
  return results;
};

// Get featured services
export const getFeaturedServices = (): SearchResultService[] => {
  return unifiedServices.filter(service => service.featured).slice(0, 8);
};

// Get services by category
export const getServicesByCategory = (category: string): SearchResultService[] => {
  return unifiedServices.filter(service => 
    service.category === category || service.subcategory === category
  );
};
