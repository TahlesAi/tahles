
import { SearchResultService, ProviderProfile, Review } from '@/lib/types';

// Unified service data - combining all mock services with consistent structure
export const unifiedServices: SearchResultService[] = [
  // Mental artists - core category
  {
    id: 'neta-bresler-mentalist',
    name: 'נטע ברסלר - אמן החשיבה',
    provider: 'נטע ברסלר',
    providerId: 'neta-bresler-provider',
    description: 'מופע אמן חושים מרתק המשלב קריאת מחשבות, השפעה מנטלית וקסמים מדהימים. מתאים לכל סוגי האירועים.',
    price: 3500,
    priceUnit: 'לאירוע',
    rating: 4.9,
    reviewCount: 127,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    category: 'אמני חושים',
    subcategory: 'מנטליסטים',
    location: 'תל אביב והמרכז',
    suitableFor: ['אירועי חברה', 'חתונות', 'בר/בת מצווה', 'אירועים פרטיים'],
    featured: true,
    tags: ['קריאת מחשבות', 'השפעה מנטלית', 'אינטראקטיבי'],
    imageCount: 8,
    videoCount: 3,
    videos: [
      'https://www.youtube.com/watch?v=example1',
      'https://www.youtube.com/watch?v=example2'
    ],
    additionalImages: [
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'magic-show-professional',
    name: 'מופע קסמים מקצועי',
    provider: 'דני הקוסם',
    providerId: 'danny-magician-provider',
    description: 'מופע קסמים מקצועי ומרהיב המתאים לכל הגילאים. שילוב של קסמי במה וקסמים אינטימיים.',
    price: 2800,
    priceUnit: 'לאירוע',
    rating: 4.7,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    category: 'קוסמים',
    subcategory: 'קסמי במה',
    location: 'כל הארץ',
    suitableFor: ['ימי הולדת', 'אירועי ילדים', 'אירועי חברה'],
    featured: true,
    tags: ['קסמי במה', 'אינטראקטיבי', 'משפחתי'],
    imageCount: 6,
    videoCount: 2
  },
  {
    id: 'standup-comedian-show',
    name: 'מופע סטנדאפ',
    provider: 'רון קומדיאן',
    providerId: 'ron-comedian-provider',
    description: 'מופע סטנדאפ קומדיה איכותי ומתוחכם. התאמה אישית לקהל ולאירוע.',
    price: 4200,
    priceUnit: 'לאירוע',
    rating: 4.8,
    reviewCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    category: 'סטנדאפיסטים',
    location: 'תל אביב והמרכז',
    suitableFor: ['אירועי חברה', 'ערבי גיבוש', 'אירועים פרטיים'],
    featured: false,
    tags: ['קומדיה', 'בידור למבוגרים', 'אינטראקטיבי'],
    imageCount: 4,
    videoCount: 1
  },
  {
    id: 'musical-performance',
    name: 'מופע מוזיקלי',
    provider: 'להקת הרמוניה',
    providerId: 'harmony-band-provider',
    description: 'מופע מוזיקלי חי עם שירה וניגון. רפרטואר מגוון המתאים לכל סוגי האירועים.',
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
    tags: ['מוזיקה חיה', 'שירה', 'ניגון'],
    imageCount: 5,
    videoCount: 3
  }
];

// Unified provider data
export const unifiedProviders: ProviderProfile[] = [
  {
    id: 'neta-bresler-provider',
    userId: 'neta-bresler-user',
    businessName: 'נטע ברסלר - אמן החשיבה',
    description: 'אמן חושים מוביל בישראל עם מעל 15 שנות ניסיון. מתמחה במופעי קריאת מחשבות והשפעה מנטלית ברמה הגבוהה ביותר.',
    contactPerson: 'נטע ברסלר',
    email: 'neta@mentalist.co.il',
    phone: '052-1234567',
    address: 'רחוב הרצל 25',
    city: 'תל אביב',
    website: 'https://neta-mentalist.co.il',
    categories: ['אמני חושים'],
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 127,
    featured: true,
    verified: true
  },
  {
    id: 'danny-magician-provider',
    userId: 'danny-magician-user',
    businessName: 'דני הקוסם',
    description: 'קוסם מקצועי עם יותר מ-10 שנות ניסיון במופעי קסמים לכל הגילאים. מתמחה בקסמי במה וקסמים אינטימיים.',
    contactPerson: 'דני כהן',
    email: 'danny@magic.co.il',
    phone: '053-9876543',
    city: 'חיפה',
    website: 'https://danny-magic.co.il',
    categories: ['קוסמים'],
    logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 89,
    featured: true,
    verified: true
  },
  {
    id: 'ron-comedian-provider',
    userId: 'ron-comedian-user',
    businessName: 'רון קומדיאן',
    description: 'סטנדאפיסט ותסריטאי עם ניסיון עשיר בכתיבה ובהופעות. מתמחה בהומור חכם ומתוחכם.',
    contactPerson: 'רון לוי',
    email: 'ron@comedy.co.il',
    phone: '054-5551234',
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
    id: 'harmony-band-provider',
    userId: 'harmony-band-user',
    businessName: 'להקת הרמוניה',
    description: 'להקה מוזיקלית מקצועית המתמחה במוזיקה חיה לאירועים. רפרטואר עשיר ומגוון לכל סוגי האירועים.',
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
  }
];

// Unified reviews data
export const unifiedReviews: Review[] = [
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
    serviceId: 'magic-show-professional',
    providerId: 'danny-magician-provider',
    userId: 'user-3',
    userName: 'רחל אברהם',
    rating: 5,
    comment: 'דני הקוסם הפך את יום ההולדת של הילדה שלי לבלתי נשכח. כל הילדים היו מרותקים!',
    date: '2024-01-08',
    verified: true
  }
];

// Helper functions for data access
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

export const getReviewsByProvider = (providerId: string): Review[] => {
  return unifiedReviews.filter(review => review.providerId === providerId);
};
