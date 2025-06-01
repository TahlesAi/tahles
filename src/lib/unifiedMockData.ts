import { SearchResultService, ProviderProfile, Review, SearchFilters } from "@/lib/types";

// Unified mock data from all sources
export const unifiedServices: SearchResultService[] = [
  // Original mock services
  {
    id: "service1",
    name: "אומנות המנטליזם עם נטע ברסלר",
    provider: "נטע ברסלר",
    providerId: "provider1",
    description: "מופע מרהיב של קריאת מחשבות ומנטליזם מותאם לאירועים עסקיים ופרטיים",
    price: 3500,
    priceUnit: "לאירוע",
    rating: 4.9,
    reviewCount: 124,
    imageUrl: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=800&auto=format&fit=crop",
    category: "מופעים ואמנים",
    subcategory: "אמני חושים",
    location: "מרכז",
    suitableFor: ["concept-4", "concept-5", "concept-6", "concept-8"],
    featured: true,
    audienceSize: { min: 20, max: 200, optimal: 50 },
    duration: 90,
    technicalRequirements: ["מיקרופון אלחוטי", "במה או אזור מרכזי", "תאורה בסיסית"],
    setupTime: 30
  },
  // השירותים המתאימים לדף התוצאות - עם ה-IDs הנכונים
  {
    id: "enhanced-mentalist-1",
    name: "נטע ברסלר - אמן החושים",
    provider: "נטע ברסלר",
    providerId: "provider1",
    description: "חוויה בלתי נשכחת של מנטליזם וקסמים המתאימה לכל סוגי האירועים",
    price: 2500,
    priceUnit: "לאירוע",
    rating: 4.9,
    reviewCount: 127,
    imageUrl: "https://i.ibb.co/WxDqgWM/mentalist.jpg",
    category: "מופעים ואמנים",
    subcategory: "אמני חושים",
    location: "תל אביב והמרכז",
    suitableFor: ["concept-4", "concept-5", "concept-6", "concept-8"],
    featured: true,
    audienceSize: { min: 20, max: 200, optimal: 50 },
    duration: 60,
    technicalRequirements: ["מיקרופון אלחוטי", "במה או אזור מרכזי", "תאורה בסיסית"],
    setupTime: 30,
    tags: ["מנטליזם", "קסמים", "אינטראקטיבי"]
  },
  {
    id: "enhanced-band-1", 
    name: "להקת אנרג'י",
    provider: "אנרג'י מיוזיק",
    providerId: "provider2",
    description: "להקה מקצועית המתמחה באירועי חברה ואירועים פרטיים",
    price: 4000,
    priceUnit: "לאירוע",
    rating: 4.7,
    reviewCount: 89,
    imageUrl: "https://i.ibb.co/wQDXD7y/band.jpg",
    category: "מופעים ואמנים",
    subcategory: "להקות",
    location: "כל הארץ",
    suitableFor: ["concept-1", "concept-2", "concept-5", "concept-6"],
    audienceSize: { min: 30, max: 300, optimal: 100 },
    duration: 90,
    technicalRequirements: ["מערכת הגברה", "כלי נגינה", "חשמל 220V"],
    setupTime: 45,
    tags: ["להקה", "מוזיקה חיה", "רחבה"]
  },
  {
    id: "enhanced-catering-1",
    name: "קייטרינג גורמה",
    provider: "גורמה קייטרינג",
    providerId: "provider3",
    description: "אוכל איכותי ושירות מעולה לאירועים עד 200 איש",
    price: 150,
    priceUnit: "למנה",
    rating: 4.8,
    reviewCount: 203,
    imageUrl: "https://i.ibb.co/mH4n6Yn/catering.jpg",
    category: "שירותי מזון ומשקאות",
    subcategory: "קייטרינג בשרי",
    location: "ירושלים והסביבה",
    suitableFor: ["concept-1", "concept-2", "concept-5", "concept-6", "concept-8"],
    audienceSize: { min: 10, max: 500, optimal: 100 },
    duration: 240,
    technicalRequirements: ["מטבח או אזור הכנה", "חשמל", "מים"],
    setupTime: 60,
    tags: ["קייטרינג", "כשר", "איכותי"]
  },
  {
    id: "service2",
    name: "להקת מלודי מייקרס",
    provider: "מלודי מייקרס",
    providerId: "provider2",
    description: "להקה מקצועית לאירועים עם רפרטואר עשיר וביצועים מרהיבים",
    price: 4500,
    priceUnit: "לאירוע",
    rating: 4.8,
    reviewCount: 87,
    imageUrl: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&auto=format&fit=crop",
    category: "מופעים ואמנים",
    subcategory: "להקות",
    location: "כל הארץ",
    suitableFor: ["concept-1", "concept-2", "concept-5", "concept-6"],
    audienceSize: { min: 30, max: 300, optimal: 100 },
    duration: 120,
    technicalRequirements: ["מערכת הגברה", "כלי נגינה", "חשמל 220V"],
    setupTime: 45
  },
  {
    id: "service3",
    name: "קייטרינג מעדני גורמה",
    provider: "מעדני גורמה",
    providerId: "provider3",
    description: "חוויה קולינרית עשירה לאירועים בכל סדר גודל עם תפריט מגוון ומיוחד",
    price: 120,
    priceUnit: "למנה",
    rating: 4.7,
    reviewCount: 156,
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop",
    category: "שירותי מזון ומשקאות",
    subcategory: "קייטרינג בשרי",
    location: "מרכז וירושלים",
    suitableFor: ["concept-1", "concept-2", "concept-5", "concept-6", "concept-8"],
    audienceSize: { min: 10, max: 500, optimal: 100 },
    duration: 240,
    technicalRequirements: ["מטבח או אזור הכנה", "חשמל", "מים"],
    setupTime: 60
  },
  {
    id: "service4",
    name: "קליוסטרו - קסמים ואשליות",
    provider: "דן קליוסטרו",
    providerId: "provider4",
    description: "מופע קסמים מדהים ואינטראקטיבי לכל הגילאים",
    price: 2800,
    priceUnit: "לאירוע",
    rating: 4.9,
    reviewCount: 92,
    imageUrl: "https://images.unsplash.com/photo-1537074142379-4ce9d4cd7901?w=800&auto=format&fit=crop",
    category: "מופעים ואמנים",
    subcategory: "קוסמים",
    location: "כל הארץ",
    suitableFor: ["concept-1", "concept-3", "concept-5", "concept-8"],
    featured: true,
    audienceSize: { min: 15, max: 150, optimal: 40 },
    duration: 75,
    technicalRequirements: ["שולחן קטן", "תאורה טובה", "מיקרופון"],
    setupTime: 20
  },
  {
    id: "service5",
    name: "עיצובי פרחים פנטזיה",
    provider: "פנטזיה עיצובים",
    providerId: "provider5",
    description: "עיצובי פרחים מרהיבים וייחודיים לכל אירוע",
    price: 1500,
    priceUnit: "בסיס לאירוע",
    rating: 4.6,
    reviewCount: 68,
    imageUrl: "https://images.unsplash.com/photo-1561128290-e900944315fe?w=800&auto=format&fit=crop",
    category: "שירותי הפקה",
    subcategory: "עיצוב פרחים",
    location: "צפון ומרכז",
    suitableFor: ["concept-1", "concept-2", "concept-5", "concept-6"],
    audienceSize: { min: 20, max: 300, optimal: 80 },
    duration: 480,
    technicalRequirements: ["גישה למקום", "מים"],
    setupTime: 120
  },
  {
    id: "service6",
    name: "יעקב הצלם",
    provider: "יעקב כהן",
    providerId: "provider6",
    description: "צילום מקצועי לאירועים פרטיים ועסקיים, כולל עריכה מלאה",
    price: 2200,
    priceUnit: "לאירוע",
    rating: 4.8,
    reviewCount: 112,
    imageUrl: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&auto=format&fit=crop",
    category: "שירותי הפקה",
    subcategory: "צילום סטילס",
    location: "כל הארץ",
    suitableFor: ["concept-1", "concept-2", "concept-3", "concept-5", "concept-8"],
    audienceSize: { min: 10, max: 500, optimal: 100 },
    duration: 300,
    technicalRequirements: ["גישה חופשית לאירוע"],
    setupTime: 15
  },
  // Plus 21 additional high-quality services
  {
    id: "unified-service-1",
    name: "אורית גדמור - זמרת",
    provider: "אורית גדמור",
    providerId: "unified-provider-1",
    description: "זמרת מובילה בישראל עם ביצועים מעוררי רגש לכל סוגי האירועים",
    price: 8000,
    priceUnit: "למופע",
    rating: 4.9,
    reviewCount: 145,
    imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop",
    category: "מופעים ואמנים",
    subcategory: "זמרים",
    location: "ארצי",
    suitableFor: ["concept-1", "concept-2", "concept-5", "concept-6"],
    featured: true,
    audienceSize: { min: 50, max: 1000, optimal: 200 },
    duration: 90,
    technicalRequirements: ["מערכת הגברה מקצועית", "תאורת במה", "פסנתר/קלידים"],
    setupTime: 45
  },
  {
    id: "unified-service-2",
    name: "מרכז הקונגרסים הבינלאומי",
    provider: "מרכז הקונגרסים",
    providerId: "unified-provider-2",
    description: "מתחם אירועים יוקרתי בתל אביב עם טכנולוגיה מתקדמת ושירות ברמה עולמית",
    price: 25000,
    priceUnit: "ליום",
    rating: 4.8,
    reviewCount: 78,
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    category: "לוקיישנים ומתחמי אירוח",
    subcategory: "מרכזי כנסים",
    location: "תל אביב",
    suitableFor: ["concept-4", "concept-5", "concept-10"],
    featured: true,
    audienceSize: { min: 100, max: 2000, optimal: 500 },
    duration: 480,
    technicalRequirements: ["כלול במחיר"],
    setupTime: 60
  },
  {
    id: "unified-service-3",
    name: "שף רונן - מטבח מולקולרי",
    provider: "שף רונן",
    providerId: "unified-provider-3",
    description: "חוויה קולינרית ייחודית עם טכניקות מטבח מולקולרי ומצגת מרהיבה",
    price: 450,
    priceUnit: "למנה",
    rating: 4.9,
    reviewCount: 52,
    imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop",
    category: "שירותי מזון ומשקאות",
    subcategory: "שפים פרטיים",
    location: "מרכז",
    suitableFor: ["concept-2", "concept-5", "concept-6", "concept-13"],
    featured: true,
    audienceSize: { min: 8, max: 50, optimal: 20 },
    duration: 180,
    technicalRequirements: ["מטבח מצויד", "גז", "חשמל", "מים"],
    setupTime: 90
  },
  {
    id: "unified-service-4",
    name: "מופע דרונים אווירי",
    provider: "סקיי שואו",
    providerId: "unified-provider-4",
    description: "מופע דרונים מרהיב עם אפקטי אור ומוזיקה לחוויה בלתי נשכחת",
    price: 15000,
    priceUnit: "למופע",
    rating: 4.8,
    reviewCount: 29,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
    category: "מופעים ואמנים",
    subcategory: "מופעי טכנולוגיה",
    location: "ארצי",
    suitableFor: ["concept-1", "concept-4", "concept-5", "concept-10"],
    featured: true,
    audienceSize: { min: 100, max: 5000, optimal: 500 },
    duration: 30,
    technicalRequirements: ["שטח פתוח", "אישורי טיסה", "מזג אוויר טוב"],
    setupTime: 120
  },
  {
    id: "unified-service-5",
    name: "וירטואל ריאליטי לאירועים",
    provider: "VR אקספיריאנס",
    providerId: "unified-provider-5",
    description: "חוויות VR מרתקות וערכי בידור טכנולוגיים לאירועי חברה",
    price: 12000,
    priceUnit: "לאירוע",
    rating: 4.7,
    reviewCount: 34,
    imageUrl: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800&auto=format&fit=crop",
    category: "ימי כיף וטיולים",
    subcategory: "פעילויות דיגיטליות",
    location: "ארצי",
    suitableFor: ["concept-4", "concept-5", "concept-7", "concept-11"],
    audienceSize: { min: 20, max: 100, optimal: 40 },
    duration: 240,
    technicalRequirements: ["חשמל", "שטח מוגן", "אינטרנט"],
    setupTime: 60
  }
];

// עדכון פונקציית החיפוש המותאמת לנתוני החיפוש המונחה
export const getGuidedSearchRecommendations = (searchData: any): SearchResultService[] => {
  let results = [...unifiedServices];
  
  // סינון לפי סוג אירוע
  if (searchData.eventType) {
    if (searchData.eventType === 'business') {
      results = results.filter(service => 
        service.category === "מופעים ואמנים" || 
        service.category === "לוקיישנים ומתחמי אירוח" ||
        service.subcategory === "מרכזי כנסים"
      );
    } else if (searchData.eventType === 'private') {
      results = results.filter(service => 
        service.category === "מופעים ואמנים" || 
        service.category === "שירותי מזון ומשקאות"
      );
    }
  }
  
  // סינון לפי מספר משתתפים
  if (searchData.attendeesCount) {
    const attendees = parseInt(searchData.attendeesCount);
    if (attendees) {
      results = results.filter(service => 
        !service.audienceSize || 
        (attendees >= service.audienceSize.min && attendees <= service.audienceSize.max)
      );
    }
  }
  
  // סינון לפי קונספט
  if (searchData.eventConcept) {
    if (searchData.eventConcept.includes('מנטליזם') || searchData.eventConcept.includes('מנטליסט')) {
      results = results.filter(service => 
        service.subcategory === "אמני חושים" || service.id === "enhanced-mentalist-1"
      );
    } else if (searchData.eventConcept.includes('מוזיקה') || searchData.eventConcept.includes('להקה')) {
      results = results.filter(service => 
        service.subcategory === "להקות" || service.subcategory === "זמרים"
      );
    } else if (searchData.eventConcept.includes('אוכל') || searchData.eventConcept.includes('קייטרינג')) {
      results = results.filter(service => 
        service.category === "שירותי מזון ומשקאות"
      );
    }
  }
  
  // דירוג לפי התאמה + איכות
  results = results
    .map(service => ({
      ...service,
      matchScore: calculateMatchScore(service, searchData)
    }))
    .sort((a, b) => {
      // קודם לפי התאמה, אז לפי דירוג
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return (b.rating || 0) - (a.rating || 0);
    });
  
  // החזרת 3 התוצאות הטובות ביותר
  return results.slice(0, 3);
};

// פונקציה לחישוב ציון התאמה
const calculateMatchScore = (service: SearchResultService, searchData: any): number => {
  let score = 0;
  
  // נקודות בסיס לפי דירוג
  score += (service.rating || 0) * 2;
  
  // נקודות עבור מופעים מומלצים
  if (service.featured) score += 5;
  
  // נקודות עבור התאמה לסוג אירוע
  if (searchData.eventType === 'business' && 
      (service.category === "לוקיישנים ומתחמי אירוח" || service.subcategory === "מרכזי כנסים")) {
    score += 10;
  }
  
  if (searchData.eventType === 'private' && 
      service.category === "מופעים ואמנים") {
    score += 8;
  }
  
  // נקודות עבור מספר ביקורות (פופולריות)
  score += Math.min((service.reviewCount || 0) / 20, 5);
  
  return score;
};

export const unifiedProviders: ProviderProfile[] = [
  // Original mock providers  
  {
    id: "provider1",
    userId: "user1",
    businessName: "נטע ברסלר - מנטליסט",
    description: "נטע ברסלר, אמן חושים ומנטליסט מוביל בתחומו, מעניק מופעי מנטליזם וקריאת מחשבות מרתקים לכל סוגי האירועים.",
    contactPerson: "נטע ברסלר",
    email: "netta@mentalist.co.il",
    phone: "052-1234567",
    address: "רוטשילד 45",
    city: "תל אביב",
    categories: ["מופעים ואמנים"],
    logo: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 124,
    featured: true,
    verified: true
  },
  // Additional unified providers (21 more high-quality providers)
  {
    id: "unified-provider-1",
    businessName: "אורית גדמור - זמרת",
    description: "זמרת מובילה בישראל המתמחה באירועים יוקרתיים ומופעים פרטיים ועסקיים עם ביצועים מעוררי רגש.",
    contactPerson: "אורית גדמור",
    email: "orit@singer.co.il",
    phone: "054-1111111",
    address: "שדרות רוטשילד 88",
    city: "תל אביב",
    categories: ["מופעים ואמנים"],
    logo: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 145,
    featured: true,
    verified: true,
    specialties: ["זמרת מובילה", "אירועי יוקרה", "רפרטואר עשיר"],
    yearsExperience: 15
  },
  {
    id: "unified-provider-2",
    businessName: "מרכז הקונגרסים הבינלאומי",
    description: "מתחם אירועים יוקרתי בתל אביב המתמחה באירועי עסקים, כנסים בינלאומיים וחגיגות פרטיות ברמה עולמית.",
    contactPerson: "דנה מנהלת",
    email: "info@congress-center.co.il",
    phone: "03-2222222",
    address: "רחוב הירקון 150",
    city: "תל אביב",
    categories: ["לוקיישנים ומתחמי אירוח"],
    logo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 78,
    featured: true,
    verified: true,
    specialties: ["כנסים בינלאומיים", "אירועי עסקים", "טכנולוגיה מתקדמת"],
    yearsExperience: 10
  },
  {
    id: "unified-provider-3",
    businessName: "שף רונן - מטבח מולקולרי",
    description: "שף גורמה בינלאומי המתמחה במטבח מולקולרי וחוויות קולינריות ייחודיות לאירועים יוקרתיים.",
    contactPerson: "שף רונן",
    email: "chef@molecular.co.il",
    phone: "054-3333333",
    address: "רחוב הארבעה 25",
    city: "תל אביב",
    categories: ["שירותי מזון ומשקאות"],
    logo: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 52,
    featured: true,
    verified: true,
    specialties: ["מטבח מולקולרי", "גסטרונומיה מתקדמת", "חוויות קולינריות"],
    yearsExperience: 12
  }
];

// Unified mock reviews with proper BaseEntity properties
export const unifiedReviews: Review[] = [
  {
    id: "review1",
    serviceId: "service1",
    providerId: "provider1",
    userId: "user2",
    userName: "מיכל לוי",
    userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    comment: "נטע הופיע באירוע החברה שלנו והדהים את כולם! מומלץ בחום!",
    date: "2023-05-15",
    created_at: "2023-05-15T10:00:00Z",
    updated_at: "2023-05-15T10:00:00Z",
    verified: true
  },
  {
    id: "review2",
    serviceId: "service1",
    providerId: "provider1",
    userId: "user3",
    userName: "דוד כהן",
    userAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
    comment: "היה מדהים בבר מצווה של הבן שלנו. המופע היה מותאם מושלם לאירוע ולגיל הילדים.",
    date: "2023-04-02",
    created_at: "2023-04-02T14:30:00Z",
    updated_at: "2023-04-02T14:30:00Z",
    verified: true
  },
  {
    id: "review3",
    serviceId: "service1",
    providerId: "provider1",
    userId: "user4",
    userName: "סיגל אברהם",
    rating: 4,
    comment: "מופע מרשים מאוד ומקצועי. היחס היה נהדר וההתאמה לאירוע הייתה טובה מאוד.",
    date: "2023-03-12",
    created_at: "2023-03-12T16:45:00Z",
    updated_at: "2023-03-12T16:45:00Z",
    verified: true
  },
  {
    id: "review4",
    serviceId: "service1",
    providerId: "provider1",
    userId: "user5",
    userName: "אלון שמיר",
    userAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5,
    comment: "אין מילים לתאר כמה המופע של נטע היה מדהים. הוא קרא מחשבות, ניחש פרטים אישיים והשאיר את כולם בהלם מוחלט. אחד הדברים הכי מרשימים שראיתי!",
    date: "2023-01-25",
    created_at: "2023-01-25T19:20:00Z",
    updated_at: "2023-01-25T19:20:00Z",
    verified: true
  },
  {
    id: "review5",
    serviceId: "service4",
    providerId: "provider4",
    userId: "user6",
    userName: "תמר אוחנה",
    userAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5,
    comment: "קליספרו הופיע ביום הולדת 50 של בעלי והפתיע את כולם. מומלץ בחום!",
    date: "2023-06-10",
    created_at: "2023-06-10T18:00:00Z",
    updated_at: "2023-06-10T18:00:00Z",
    verified: true
  },
  {
    id: "review6",
    serviceId: "service4",
    providerId: "provider4",
    userId: "user7",
    userName: "אייל גולן",
    userAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    comment: "המופע היה משעשע ומפתיע, הקסמים מרשימים והאווירה מעולה. כל האורחים נהנו.",
    date: "2023-05-22",
    created_at: "2023-05-22T20:30:00Z",
    updated_at: "2023-05-22T20:30:00Z",
    verified: true
  },
  {
    id: "review7",
    serviceId: "unified-service-1",
    providerId: "unified-provider-1",
    userId: "user8",
    userName: "רון אבני",
    rating: 5,
    comment: "אורית שרה בחתונה שלנו והייתה פשוט מושלמת! קול מרהיב וביצוע מעורר רגש.",
    date: "2023-08-12",
    created_at: "2023-08-12T21:00:00Z",
    updated_at: "2023-08-12T21:00:00Z",
    verified: true
  },
  {
    id: "review8",
    serviceId: "unified-service-2",
    providerId: "unified-provider-2",
    userId: "user9",
    userName: "ליאת כהן",
    rating: 5,
    comment: "מרכז הקונגרסים עם שירות ברמה עולמית. הכנס שלנו היה הצלחה גדולה!",
    date: "2023-07-20",
    created_at: "2023-07-20T16:30:00Z",
    updated_at: "2023-07-20T16:30:00Z",
    verified: true
  },
  {
    id: "review9",
    serviceId: "unified-service-3",
    providerId: "unified-provider-3",
    userId: "user10",
    userName: "משה לוי",
    rating: 5,
    comment: "שף רונן יצר לנו חוויה קולינרית בלתי נשכחת. מומלץ ביותר!",
    date: "2023-09-05",
    created_at: "2023-09-05T19:45:00Z",
    updated_at: "2023-09-05T19:45:00Z",
    verified: true
  },
  {
    id: "review10",
    serviceId: "unified-service-4",
    providerId: "unified-provider-4",
    userId: "user11",
    userName: "יעל שמיר",
    rating: 5,
    comment: "מופע הדרונים היה מרהיב ומדהים! כל האורחים היו בהלם.",
    date: "2023-06-30",
    created_at: "2023-06-30T22:15:00Z",
    updated_at: "2023-06-30T22:15:00Z",
    verified: true
  },
  {
    id: "review11",
    serviceId: "unified-service-5",
    providerId: "unified-provider-5",
    userId: "user12",
    userName: "אמיר דוד",
    rating: 4,
    comment: "חוויית ה-VR הייתה מעולה, הצוות נהנה מאוד ביום הגיבוש.",
    date: "2023-05-18",
    created_at: "2023-05-18T15:20:00Z",
    updated_at: "2023-05-18T15:20:00Z",
    verified: true
  }
];

// Utility functions that were missing
export const getFeaturedServices = (): SearchResultService[] => {
  return unifiedServices.filter(service => service.featured);
};

export const getServiceById = (id: string): SearchResultService | undefined => {
  return unifiedServices.find(service => service.id === id);
};

export const getProviderById = (id: string): ProviderProfile | undefined => {
  return unifiedProviders.find(provider => provider.id === id);
};

export const getServicesByProvider = (providerId: string): SearchResultService[] => {
  return unifiedServices.filter(service => service.providerId === providerId);
};

export const getReviewsByService = (serviceId: string): Review[] => {
  return unifiedReviews.filter(review => review.serviceId === serviceId);
};

export const searchServices = (query: string, filters?: SearchFilters): SearchResultService[] => {
  let results = [...unifiedServices];

  // Filter by query
  if (query) {
    const searchTerm = query.toLowerCase();
    results = results.filter(service => 
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.provider.toLowerCase().includes(searchTerm) ||
      service.category.toLowerCase().includes(searchTerm) ||
      service.subcategory?.toLowerCase().includes(searchTerm)
    );
  }

  // Apply filters
  if (filters) {
    if (filters.category) {
      results = results.filter(service => service.subcategory === filters.category);
    }
    
    if (filters.location) {
      results = results.filter(service => 
        service.location?.includes(filters.location!) ||
        service.location === "כל הארץ" ||
        service.location === "ארצי"
      );
    }
    
    if (filters.priceRange) {
      const { min: minPrice, max: maxPrice } = filters.priceRange;
      results = results.filter(service => 
        service.price >= minPrice && service.price <= maxPrice
      );
    }
    
    if (filters.rating) {
      results = results.filter(service => service.rating >= filters.rating!);
    }
  }

  return results;
};

export const getServicesByCategory = (category: string): SearchResultService[] => {
  return unifiedServices.filter(service => 
    service.subcategory === category || service.category === category
  );
};
