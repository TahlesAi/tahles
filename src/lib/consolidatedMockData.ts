
// מבנה נתונים מאוחד ומלא עם כל הקטגוריות, ספקים ומוצרים
import { hebrewHierarchy } from './hebrewHierarchyData';

// ספקים מורחבים לכל תת קטגוריה
export const consolidatedProviders = [
  // לוקיישנים - חללי עבודה משותפים
  {
    id: "cowork-1", name: "מינדספייס תל אביב", description: "חללי עבודה יוקרתיים במרכז תל אביב",
    categories: ["coworking-spaces"], contactPerson: "דנה לוי", email: "dana@mindspace.co.il", phone: "03-1234567",
    rating: 4.8, reviewCount: 156, featured: true, verified: true, calendarActive: true, address: "רוטשילד 1, תל אביב"
  },
  {
    id: "cowork-2", name: "וויוורק הרצליה", description: "חללי עבודה חדשניים",
    categories: ["coworking-spaces"], contactPerson: "יוסי כהן", email: "yossi@wework.co.il", phone: "09-1234567",
    rating: 4.6, reviewCount: 98, featured: false, verified: true, calendarActive: true, address: "הרצליה פיתוח"
  },

  // לוקיישנים - אולמות
  {
    id: "hall-1", name: "אולמי הרצליה", description: "אולמות יוקרתיים לאירועים",
    categories: ["halls"], contactPerson: "מירי אברהם", email: "miri@halls.co.il", phone: "09-7654321",
    rating: 4.9, reviewCount: 234, featured: true, verified: true, calendarActive: true, address: "הרצליה"
  },
  {
    id: "hall-2", name: "גן האירועים נתניה", description: "אולם גן יפהפה",
    categories: ["halls"], contactPerson: "אבי רוזן", email: "avi@gardenevents.co.il", phone: "09-8765432",
    rating: 4.7, reviewCount: 187, featured: true, verified: true, calendarActive: true, address: "נתניה"
  },

  // מופעים - אמני חושים
  {
    id: "mind-artist-1", name: "נטע ברסלר", description: "אמן מחשבות מוביל בישראל",
    categories: ["אמני חושים"], contactPerson: "נטע ברסלר", email: "neta@mindartist.co.il", phone: "054-1234567",
    rating: 4.9, reviewCount: 327, featured: true, verified: true, calendarActive: true, address: "תל אביב"
  },
  {
    id: "mind-artist-2", name: "רון יהודה", description: "מנטליסט מקצועי",
    categories: ["אמני חושים"], contactPerson: "רון יהודה", email: "ron@mentalist.co.il", phone: "052-7654321",
    rating: 4.7, reviewCount: 198, featured: true, verified: true, calendarActive: true, address: "ירושלים"
  },

  // זמרים ונגנים
  {
    id: "singer-1", name: "עידן רייכל", description: "זמר ויוצר מוביל",
    categories: ["זמרים ונגנים"], contactPerson: "מנג'ר עידן", email: "manager@eidan.co.il", phone: "03-9876543",
    rating: 4.9, reviewCount: 445, featured: true, verified: true, calendarActive: true, address: "תל אביב"
  },
  {
    id: "band-1", name: "להקת רוק ישראלי", description: "להקת רוק מובילה",
    categories: ["זמרים ונגנים"], contactPerson: "מנהל הלהקה", email: "manager@rockband.co.il", phone: "054-5555555",
    rating: 4.6, reviewCount: 234, featured: false, verified: true, calendarActive: true, address: "חיפה"
  },

  // קייטרינג
  {
    id: "catering-1", name: "טעמי השף", description: "קייטרינג יוקרתי לכל אירוע",
    categories: ["catering-meat"], contactPerson: "השף דוד", email: "chef@tasteschef.co.il", phone: "03-2222222",
    rating: 4.8, reviewCount: 312, featured: true, verified: true, calendarActive: true, address: "תל אביב"
  },
  {
    id: "catering-2", name: "קייטרינג הגליל", description: "אוכל טרי מהצפון",
    categories: ["catering-dairy"], contactPerson: "שרה לוי", email: "sara@galilee.co.il", phone: "04-3333333",
    rating: 4.7, reviewCount: 189, featured: false, verified: true, calendarActive: true, address: "נצרת"
  },

  // הרצאות
  {
    id: "speaker-1", name: "אמיר גורן - מרצה מוטיבציה", description: "מרצה מוטיבציה מוביל",
    categories: ["personal-empowerment"], contactPerson: "אמיר גורן", email: "amir@motivation.co.il", phone: "052-4444444",
    rating: 4.8, reviewCount: 278, featured: true, verified: true, calendarActive: true, address: "רמת גן"
  },

  // שירותי הפקה
  {
    id: "sound-1", name: "סאונד פרו", description: "הגברה ותאורה מקצועית",
    categories: ["sound-equipment"], contactPerson: "טכנאי ראשי", email: "tech@soundpro.co.il", phone: "03-7777777",
    rating: 4.6, reviewCount: 156, featured: false, verified: true, calendarActive: true, address: "פתח תקווה"
  },

  // צלמים
  {
    id: "photographer-1", name: "דני כהן צילום", description: "צילום אירועים מקצועי",
    categories: ["photographers"], contactPerson: "דני כהן", email: "danny@photography.co.il", phone: "054-8888888",
    rating: 4.9, reviewCount: 334, featured: true, verified: true, calendarActive: true, address: "רעננה"
  }
];

// מוצרים מורחבים לכל ספק
export const consolidatedProducts = [
  // מוצרי נטע ברסלר - אמני חושים
  {
    id: "mind-show-1", providerId: "mind-artist-1", name: "מופע קריאת מחשבות קלאסי",
    description: "מופע אומנות חושים מרהיב עם קריאת מחשבות וטלפתיה",
    categoryId: "performances-stage", subcategoryId: "mind-artists", conceptId: "company-events",
    price: 3500, priceUnit: "למופע", duration: 45, location: "כל הארץ",
    rating: 4.9, reviewCount: 127, featured: true, available: true,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    audienceSize: { min: 20, max: 500, optimal: 100 },
    eventTypes: ["private", "business"], isReceptionService: false,
    tags: ["מופע אינטראקטיבי", "מתאים לכל הגילאים"]
  },
  {
    id: "mind-show-2", providerId: "mind-artist-1", name: "מופע קבלת פנים אינטראקטיבי",
    description: "מופע קצר לקבלת פנים עם אינטראקציה עם הקהל",
    categoryId: "performances-stage", subcategoryId: "mind-artists", conceptId: "company-events",
    price: 2500, priceUnit: "למופע", duration: 25, location: "מרכז הארץ",
    rating: 4.8, reviewCount: 89, featured: false, available: true,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    audienceSize: { min: 30, max: 200, optimal: 75 },
    eventTypes: ["business"], isReceptionService: true,
    tags: ["קבלת פנים", "אינטראקטיבי"]
  },

  // מוצרי רון יהודה - מנטליסט
  {
    id: "mentalist-show-1", providerId: "mind-artist-2", name: "מופע מנטליזם מתקדם",
    description: "מופע מנטליזם עם הפעלת קהל וקריאת מחשבות",
    categoryId: "performances-stage", subcategoryId: "mind-artists", conceptId: "company-events",
    price: 4200, priceUnit: "למופע", duration: 60, location: "כל הארץ",
    rating: 4.7, reviewCount: 156, featured: true, available: true,
    imageUrl: "https://images.unsplash.com/photo-1561336526-6ca4ac833fb5?w=400&h=300&fit=crop",
    audienceSize: { min: 30, max: 300, optimal: 120 },
    eventTypes: ["private", "business"], isReceptionService: false,
    tags: ["מופע מתקדם", "הפעלת קהל"]
  },

  // מוצרי עידן רייכל
  {
    id: "singer-show-1", providerId: "singer-1", name: "הופעה אקוסטית אינטימית",
    description: "הופעה אקוסטית עם הלהיטים הגדולים",
    categoryId: "performances-stage", subcategoryId: "musicians", conceptId: "private",
    price: 15000, priceUnit: "למופע", duration: 90, location: "מרכז הארץ",
    rating: 4.9, reviewCount: 245, featured: true, available: true,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    audienceSize: { min: 100, max: 1000, optimal: 300 },
    eventTypes: ["private", "business"], isReceptionService: false,
    tags: ["מוזיקה מזרחית", "הופעה אקוסטית"]
  },

  // מוצרי קייטרינג
  {
    id: "catering-meat-1", providerId: "catering-1", name: "תפריט בשרי יוקרתי",
    description: "תפריט בשרי מלא עם מנות גורמה",
    categoryId: "food-drinks", subcategoryId: "catering-meat", conceptId: "company-events",
    price: 150, priceUnit: "לאדם", duration: 240, location: "תל אביב והמרכז",
    rating: 4.8, reviewCount: 234, featured: true, available: true,
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
    audienceSize: { min: 30, max: 500, optimal: 100 },
    eventTypes: ["private", "business"], isReceptionService: false,
    tags: ["כשר למהדרין", "תפריט מגוון"]
  },

  // מוצרי הרצאות
  {
    id: "lecture-motivation-1", providerId: "speaker-1", name: "הרצאת מוטיבציה לעובדים",
    description: "הרצאה על מנהיגות והצלחה עסקית",
    categoryId: "lectures-training", subcategoryId: "personal-empowerment", conceptId: "company-events",
    price: 5500, priceUnit: "להרצאה", duration: 90, location: "כל הארץ",
    rating: 4.7, reviewCount: 189, featured: false, available: true,
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
    audienceSize: { min: 25, max: 500, optimal: 80 },
    eventTypes: ["business"], isReceptionService: false,
    tags: ["מוטיבציה", "מנהיגות", "עסקים"]
  },

  // לוקיישנים
  {
    id: "cowork-space-1", providerId: "cowork-1", name: "אולם ישיבות יוקרתי",
    description: "אולם ישיבות עם ציוד מתקדם",
    categoryId: "locations", subcategoryId: "coworking-spaces", conceptId: "company-events",
    price: 500, priceUnit: "ליום", duration: 480, location: "תל אביב",
    rating: 4.8, reviewCount: 156, featured: true, available: true,
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    audienceSize: { min: 10, max: 50, optimal: 25 },
    eventTypes: ["business"], isReceptionService: false,
    tags: ["ציוד מתקדם", "מיקום מרכזי"]
  },

  {
    id: "hall-event-1", providerId: "hall-1", name: "אולם אירועים גדול",
    description: "אולם יוקרתי לאירועים גדולים",
    categoryId: "locations", subcategoryId: "halls", conceptId: "wedding-events",
    price: 8000, priceUnit: "לערב", duration: 480, location: "הרצליה",
    rating: 4.9, reviewCount: 234, featured: true, available: true,
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
    audienceSize: { min: 80, max: 400, optimal: 200 },
    eventTypes: ["private"], isReceptionService: false,
    tags: ["אולם יוקרתי", "נוף לים", "חניה"]
  }
];

// יומני זמינות לספקים
export const consolidatedCalendars = [
  // יומן נטע ברסלר
  {
    providerId: "mind-artist-1",
    slots: [
      { date: "2025-06-10", startTime: "19:00", endTime: "21:00", isAvailable: true, maxBookings: 1, currentBookings: 0 },
      { date: "2025-06-15", startTime: "20:00", endTime: "22:00", isAvailable: true, maxBookings: 1, currentBookings: 0 },
      { date: "2025-06-20", startTime: "19:30", endTime: "21:30", isAvailable: true, maxBookings: 1, currentBookings: 0 }
    ]
  },
  // יומן רון יהודה
  {
    providerId: "mind-artist-2",
    slots: [
      { date: "2025-06-12", startTime: "19:00", endTime: "21:00", isAvailable: true, maxBookings: 1, currentBookings: 0 },
      { date: "2025-06-18", startTime: "20:00", endTime: "22:00", isAvailable: true, maxBookings: 1, currentBookings: 0 }
    ]
  },
  // יומן עידן רייכל
  {
    providerId: "singer-1",
    slots: [
      { date: "2025-06-25", startTime: "21:00", endTime: "23:00", isAvailable: true, maxBookings: 1, currentBookings: 0 }
    ]
  }
];

// פונקציות עזר לבדיקת תקינות הנתונים
export const validateDataIntegrity = () => {
  const issues: string[] = [];
  
  // בדיקה שכל מוצר משויך לספק קיים
  consolidatedProducts.forEach(product => {
    const provider = consolidatedProviders.find(p => p.id === product.providerId);
    if (!provider) {
      issues.push(`מוצר ${product.name} (${product.id}) לא משויך לספק קיים`);
    }
  });
  
  // בדיקה שכל ספק פעיל יש לו יומן
  consolidatedProviders.forEach(provider => {
    if (provider.calendarActive) {
      const calendar = consolidatedCalendars.find(c => c.providerId === provider.id);
      if (!calendar || calendar.slots.length === 0) {
        issues.push(`לספק ${provider.name} (${provider.id}) אין יומן זמינות`);
      }
    }
  });
  
  // בדיקה שכל מוצר זמין משויך לקטגוריה תקינה
  consolidatedProducts.forEach(product => {
    if (product.available && (!product.categoryId || !product.subcategoryId)) {
      issues.push(`מוצר זמין ${product.name} (${product.id}) חסר שיוך קטגוריה`);
    }
  });
  
  return {
    isValid: issues.length === 0,
    issues
  };
};

// פונקציות חיפוש מעודכנות
export const getAvailableProductsForDate = (date: string, startTime?: string) => {
  const availableProviders = consolidatedCalendars
    .filter(calendar => 
      calendar.slots.some(slot => 
        slot.date === date && 
        slot.isAvailable && 
        slot.currentBookings < slot.maxBookings &&
        (!startTime || slot.startTime <= startTime)
      )
    )
    .map(calendar => calendar.providerId);
  
  return consolidatedProducts.filter(product => 
    product.available && 
    availableProviders.includes(product.providerId)
  );
};

export const getProductsByCategory = (categoryId: string) => {
  return consolidatedProducts.filter(product => 
    product.available && 
    product.categoryId === categoryId
  );
};

export const getProductsBySubcategory = (subcategoryId: string) => {
  return consolidatedProducts.filter(product => 
    product.available && 
    product.subcategoryId === subcategoryId
  );
};
