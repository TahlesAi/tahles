
import { Category, Subcategory, ServiceType, Provider, Service } from "./types/hierarchy";

// Mock categories
export const mockCategories: Category[] = [
  {
    id: "1",
    name: "לוקיישנים",
    description: "מקומות לאירועים וכנסים",
    icon: "MapPin",
    image_url: "/assets/categories/venues.jpg"
  },
  {
    id: "2",
    name: "מזון ומשקאות",
    description: "שירותי הסעדה וקייטרינג",
    icon: "Utensils",
    image_url: "/assets/categories/food.jpg"
  },
  {
    id: "3",
    name: "מופעים ובמה",
    description: "אמנים, מוזיקאים ומופעים",
    icon: "Music",
    image_url: "/assets/categories/performances.jpg"
  },
  {
    id: "4",
    name: "שירותי הפקה",
    description: "הגברה, תאורה ותפאורה",
    icon: "Speaker",
    image_url: "/assets/categories/production.jpg"
  },
  {
    id: "5",
    name: "הרצאות וסדנאות",
    description: "מרצים ומנחי סדנאות",
    icon: "Mic2",
    image_url: "/assets/categories/lectures.jpg"
  },
  {
    id: "6",
    name: "אטרקציות וימי כיף",
    description: "פעילויות גיבוש ובידור",
    icon: "PartyPopper",
    image_url: "/assets/categories/attractions.jpg"
  },
  {
    id: "7",
    name: "מתנות ומזכרות",
    description: "מתנות לאירועים ושי לעובדים",
    icon: "Gift",
    image_url: "/assets/categories/gifts.jpg"
  },
  {
    id: "8",
    name: "אחר",
    description: "שירותים נוספים",
    icon: "PlusCircle",
    image_url: "/assets/categories/other.jpg"
  }
];

// Mock subcategories
export const mockSubcategories: Subcategory[] = [
  // לוקיישנים
  {
    id: "1-1",
    name: "אולמות אירועים",
    description: "אולמות לאירועים גדולים",
    icon: "Building",
    category_id: "1"
  },
  {
    id: "1-2",
    name: "וילות פרטיות",
    description: "בתים ווילות לאירועים",
    icon: "Home",
    category_id: "1"
  },
  {
    id: "1-3",
    name: "חללי עבודה משותפים",
    description: "מרחבים לכנסים ומפגשים",
    icon: "LayoutGrid",
    category_id: "1"
  },
  {
    id: "1-4",
    name: "מסעדות אירועים",
    description: "מסעדות עם חללי אירועים",
    icon: "Utensils",
    category_id: "1"
  },
  // מזון ומשקאות
  {
    id: "2-1",
    name: "קייטרינג",
    description: "שירותי קייטרינג לאירועים",
    icon: "Utensils",
    category_id: "2"
  },
  {
    id: "2-2",
    name: "שפים פרטיים",
    description: "שפים לאירוח ביתי",
    icon: "ChefHat",
    category_id: "2"
  },
  {
    id: "2-3",
    name: "ברים ניידים",
    description: "שירותי בר ומשקאות",
    icon: "Wine",
    category_id: "2"
  },
  // מופעים ובמה
  {
    id: "3-1",
    name: "אמני חושים",
    description: "מנטליסטים וקוסמים",
    icon: "Wand2",
    category_id: "3"
  },
  {
    id: "3-2",
    name: "מוזיקאים",
    description: "זמרים, נגנים ולהקות",
    icon: "Music",
    category_id: "3"
  },
  {
    id: "3-3",
    name: "סטנדאפיסטים",
    description: "מופעי קומדיה והומור",
    icon: "Mic2",
    category_id: "3"
  }
];

// Mock service types
export const mockServiceTypes: ServiceType[] = [
  // אמני חושים
  {
    id: "3-1-1",
    name: "מנטליסטים",
    description: "קריאת מחשבות והיפנוזה",
    icon: "Brain",
    subcategory_id: "3-1"
  },
  {
    id: "3-1-2",
    name: "קוסמים",
    description: "קסמים וטריקים",
    icon: "Sparkle",
    subcategory_id: "3-1"
  },
  // מוזיקאים
  {
    id: "3-2-1",
    name: "זמרים סולו",
    description: "זמרים מובילים להופעה סולו",
    icon: "Mic",
    subcategory_id: "3-2"
  },
  {
    id: "3-2-2",
    name: "להקות",
    description: "הרכבים מוזיקליים לאירועים",
    icon: "Music",
    subcategory_id: "3-2"
  },
  // קייטרינג
  {
    id: "2-1-1",
    name: "קייטרינג בשרי",
    description: "ארוחות בשריות לאירועים",
    icon: "Beef",
    subcategory_id: "2-1"
  },
  {
    id: "2-1-2",
    name: "קייטרינג חלבי",
    description: "ארוחות חלביות לאירועים",
    icon: "Milk",
    subcategory_id: "2-1"
  }
];

// Mock providers
export const mockProviders: Provider[] = [
  {
    id: "p-1",
    name: "נטע ברסלר",
    description: "מנטליסט מוביל בישראל עם מופעים מרתקים",
    logo_url: "https://randomuser.me/api/portraits/men/32.jpg",
    contact_email: "neta@example.com",
    contact_phone: "050-1234567",
    address: "תל אביב",
    website: "www.neta-bresler.com",
    rating: 4.8,
    review_count: 124,
    subcategory_ids: ["3-1"],
    category_ids: ["3"],
    service_type_ids: ["3-1-1"],
    is_verified: true
  },
  {
    id: "p-2",
    name: "להקת הקצב",
    description: "להקה מקצועית לאירועים עם רפרטואר עשיר",
    logo_url: "https://randomuser.me/api/portraits/women/44.jpg",
    contact_email: "band@example.com",
    contact_phone: "050-7654321",
    address: "ירושלים",
    website: "www.rhythm-band.co.il",
    rating: 4.6,
    review_count: 87,
    subcategory_ids: ["3-2"],
    category_ids: ["3"],
    service_type_ids: ["3-2-2"],
    is_verified: true
  }
];

// Mock services
export const mockServices: Service[] = [
  {
    id: "s-1",
    name: "מופע מנטליזם מרתק",
    description: "מופע קריאת מחשבות וניבוי התנהגות לאירועים",
    price: 3500,
    price_unit: "להופעה",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    provider_id: "p-1",
    category_id: "3",
    subcategory_id: "3-1",
    service_type_id: "3-1-1",
    rating: 4.8,
    review_count: 42,
    tags: ["מנטליזם", "קריאת מחשבות", "אינטראקטיבי"],
    is_featured: true,
    suitableFor: ["אירועי חברה", "אירועים פרטיים", "ימי גיבוש"],
    audience_size: "0-30",
    location: "כל הארץ"
  },
  {
    id: "s-2",
    name: "מופע להקה לאירועים",
    description: "הופעה חיה עם מוזיקה מקורית וקאברים",
    price: 5000,
    price_unit: "להופעה",
    imageUrl: "https://images.unsplash.com/photo-1501612780327-45045538702b",
    provider_id: "p-2",
    category_id: "3",
    subcategory_id: "3-2",
    service_type_id: "3-2-2",
    rating: 4.6,
    review_count: 28,
    tags: ["מוזיקה חיה", "להקה", "מסיבות"],
    is_featured: true,
    suitableFor: ["חתונות", "אירועים פרטיים", "מסיבות"],
    audience_size: "51-100",
    location: "מרכז"
  }
];

// Featured services
export const mockFeaturedServices: Service[] = [
  ...mockServices,
  {
    id: "s-3",
    name: "קייטרינג בשרי גורמה",
    description: "מנות בשריות ברמה גבוהה לאירועים",
    price: 120,
    price_unit: "לאדם",
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033",
    provider_id: "p-3",
    category_id: "2",
    subcategory_id: "2-1",
    service_type_id: "2-1-1",
    rating: 4.9,
    review_count: 56,
    tags: ["קייטרינג", "בשרי", "גורמה"],
    is_featured: true,
    suitableFor: ["חתונות", "אירועים עסקיים", "ימי הולדת"],
    audience_size: "101-200",
    location: "שרון"
  }
];

// Top providers
export const mockTopProviders: Provider[] = [
  ...mockProviders,
  {
    id: "p-3",
    name: "גורמה שף",
    description: "קייטרינג גורמה לאירועים יוקרתיים",
    logo_url: "https://randomuser.me/api/portraits/men/66.jpg",
    contact_email: "gourmet@example.com",
    contact_phone: "050-9876543",
    address: "הרצליה",
    website: "www.gourmet-chef.co.il",
    rating: 4.9,
    review_count: 103,
    subcategory_ids: ["2-1"],
    category_ids: ["2"],
    service_type_ids: ["2-1-1"],
    is_verified: true
  }
];
