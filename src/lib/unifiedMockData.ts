
// Mock data provider for enhanced service and provider profiles

interface MockProvider {
  id: string;
  name: string;
  description: string;
  email?: string;
  phone?: string;
  city?: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  logoUrl?: string;
  website?: string;
  experience?: string;
  categories?: string[];
}

interface MockService {
  id: string;
  name: string;
  description: string;
  provider: string;
  providerId: string;
  price: number | string;
  priceUnit?: string;
  duration?: string;
  imageUrl: string;
  category?: string;
  subcategory?: string;
  location?: string;
  rating: number;
  reviewCount: number;
  features?: string[];
  tags?: string[];
  videoUrl?: string;
  mediaGallery?: Array<{
    type: 'image' | 'video';
    url: string;
  }>;
  priceRange?: {
    min: number;
    max: number;
  };
  variants?: Array<{
    name: string;
    duration: number;
    basePrice: number;
  }>;
}

// Mock providers data
const mockProviders: MockProvider[] = [
  {
    id: 'neta-bresler-id',
    name: 'נטע ברסלר - אמן המחשבות',
    description: 'נטע ברסלר - אמן המחשבות, מנטליסט ישראלי מוביל המתמחה במופעי מנטליזם מרתקים ומותאמים אישית לכל סוג של אירוע. עם ניסיון עשיר במופעים עסקיים ופרטיים, נטע מביא חוויה בלתי נשכחת המשלבת אומנות, פסיכולוגיה וקסם.',
    email: 'neta@mindartist.co.il',
    phone: '054-1234567',
    city: 'תל אביב',
    rating: 4.9,
    reviewCount: 127,
    isVerified: true,
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    website: 'https://neta.live',
    experience: 'מנטליסט מקצועי עם מעל 10 שנות ניסיון במופעים ברחבי הארץ. מתמחה במופעי חברות, אירועים פרטיים והרצאות העשרה.',
    categories: ['מנטליזם', 'אמני חושים', 'מופעים']
  }
];

// Mock services data - נטע ברסלר - עדכון מלא עם תמונות זמינות ויומן
const mockServices: MockService[] = [
  {
    id: 'neta-8-lies-show',
    name: 'המופע המרכזי - "8 שקרים"',
    description: 'מופע במה מרכזי, מנטליזם משולב סיפור אישי. מופע מרתק המשלב טכניקות מנטליזם מתקדמות עם סיפור אישי מרגש שמותיר את הקהל בהלם.',
    provider: 'נטע ברסלר - אמן המחשבות',
    providerId: 'neta-bresler-id',
    price: '4,000-8,000',
    priceUnit: 'למופע',
    duration: '45-90 דקות',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
    category: 'הזמנת מופעים',
    subcategory: 'אמני חושים',
    location: 'בכל הארץ',
    rating: 4.9,
    reviewCount: 45,
    videoUrl: 'https://www.youtube.com/watch?v=AS8VdiHcnoM',
    priceRange: { min: 4000, max: 8000 },
    variants: [
      { name: '45 דקות', duration: 45, basePrice: 4000 },
      { name: '60 דקות', duration: 60, basePrice: 5500 },
      { name: '75 דקות', duration: 75, basePrice: 6500 },
      { name: '90 דקות', duration: 90, basePrice: 8000 }
    ],
    features: [
      'מופע במה מרכזי',
      'מנטליזם מתקדם',
      'סיפור אישי מרגש',
      'מתאים לקהל גדול',
      'חוויה בלתי נשכחת'
    ],
    tags: ['מנטליזם', 'במה', 'מרכזי', 'אירועי חברה', 'מופע', 'חווייתי'],
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=AS8VdiHcnoM' }
    ]
  },
  {
    id: 'neta-nomad-show',
    name: 'מופע נודד',
    description: 'מופע קז\'ואלי בין הקהל - מופע מתגלגל באירוע. נטע מסתובב בין האורחים ומבצע טריקי מנטליזם אישיים שיוצרים חוויה אינטימית וקסומה.',
    provider: 'נטע ברסלר - אמן המחשבות',
    providerId: 'neta-bresler-id',
    price: '3,000-6,000',
    priceUnit: 'למופע',
    duration: '45-90 דקות',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    category: 'הזמנת מופעים',
    subcategory: 'אמני חושים',
    location: 'בכל הארץ',
    rating: 4.8,
    reviewCount: 32,
    videoUrl: 'https://www.youtube.com/watch?v=EXLmZu-t9-s',
    priceRange: { min: 3000, max: 6000 },
    variants: [
      { name: '45 דקות', duration: 45, basePrice: 3000 },
      { name: '60 דקות', duration: 60, basePrice: 4000 },
      { name: '75 דקות', duration: 75, basePrice: 5000 },
      { name: '90 דקות', duration: 90, basePrice: 6000 }
    ],
    features: [
      'מופע אינטימי ואישי',
      'מתאים לקבוצות קטנות ובינוניות',
      'אינטראקציה ישירה עם האורחים',
      'גמישות במיקום',
      'חוויה קז\'ואלית וחמה'
    ],
    tags: ['מנטליזם', 'נודד', 'אינטימי', 'אירועי חברה', 'משפחתי', 'חווייתי'],
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=400&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=EXLmZu-t9-s' }
    ]
  },
  {
    id: 'neta-second-thought-lecture',
    name: 'הרצאה - "במחשבה שנייה"',
    description: 'הרצאה חווייתית על שליטה בתודעה. שילוב ייחודי של מנטליזם והרצאה מעמיקה על כוח המחשבה, קריאת אנשים ופסיכולוגיה יישומית.',
    provider: 'נטע ברסלר - אמן המחשבות',
    providerId: 'neta-bresler-id',
    price: '6,500-15,000',
    priceUnit: 'להרצאה',
    duration: '45-90 דקות',
    imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&h=400&fit=crop',
    category: 'הרצאות',
    subcategory: 'אמני חושים',
    location: 'בכל הארץ',
    rating: 4.9,
    reviewCount: 28,
    videoUrl: 'https://www.youtube.com/watch?v=50uD8u1Yufg',
    priceRange: { min: 6500, max: 15000 },
    variants: [
      { name: 'גרסה קצרה - 45 דקות', duration: 45, basePrice: 6500 },
      { name: 'גרסה ארוכה - 90 דקות', duration: 90, basePrice: 10000 },
      { name: 'גרסה מותאמת אישית', duration: 90, basePrice: 15000 }
    ],
    features: [
      'שילוב מנטליזם והרצאה',
      'תובנות פסיכולוגיות מעמיקות',
      'מתאים לכנסים עסקיים',
      'תוכן העשרה איכותי',
      'מעורבות הקהל גבוהה'
    ],
    tags: ['הרצאה', 'מנטליזם', 'עסקי', 'העשרה', 'אירועי חברה', 'כנסים'],
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&h=400&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1560523159-6b681bb1e02e?w=600&h=400&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop' },
      { type: 'video', url: 'https://www.youtube.com/watch?v=50uD8u1Yufg' }
    ]
  },
  {
    id: 'neta-combined-show',
    name: 'מופע משולב',
    description: 'מופע במה 45 דק\' + מופע נודד 45 דק\'. שילוב מושלם של מופע מרכזי מרהיב ומופע אינטימי בין האורחים - הטוב משני העולמות.',
    provider: 'נטע ברסלר - אמן המחשבות',
    providerId: 'neta-bresler-id',
    price: '5,000-10,000',
    priceUnit: 'למופע',
    duration: '90 דקות',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    category: 'הזמנת מופעים',
    subcategory: 'אמני חושים',
    location: 'בכל הארץ',
    rating: 5.0,
    reviewCount: 19,
    priceRange: { min: 5000, max: 10000 },
    variants: [
      { name: 'חבילה בסיסית', duration: 90, basePrice: 5000 },
      { name: 'חבילה מורחבת', duration: 90, basePrice: 7500 },
      { name: 'חבילה פרימיום', duration: 90, basePrice: 10000 }
    ],
    features: [
      'שילוב של שני מופעים',
      'מופע במה מרכזי 45 דק\'',
      'מופע נודד אינטימי 45 דק\'',
      'ערך מוסף מקסימלי',
      'חוויה מקיפה ומגוונת'
    ],
    tags: ['מנטליזם', 'משולב', 'במה', 'נודד', 'אירועי חברה', 'מופע'],
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop' }
    ]
  }
];

// Helper functions
export const getProviderById = (id: string): MockProvider | undefined => {
  return mockProviders.find(provider => provider.id === id);
};

export const getServiceById = (id: string): MockService | undefined => {
  return mockServices.find(service => service.id === id);
};

export const getServicesByProvider = (providerId: string): MockService[] => {
  return mockServices.filter(service => service.providerId === providerId);
};

export const getAllProviders = (): MockProvider[] => {
  return mockProviders;
};

export const getAllServices = (): MockService[] => {
  return mockServices;
};

// Featured services for homepage
export const getFeaturedServices = (): MockService[] => {
  return mockServices.slice(0, 4);
};

// Search functionality
export const searchServices = (query: string, filters?: any): MockService[] => {
  let results = [...mockServices];
  
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    results = results.filter(service => 
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      (service.tags && service.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }
  
  return results;
};

// Guided search recommendations
export const getGuidedSearchRecommendations = (criteria: any): MockService[] => {
  let results = [...mockServices];
  
  // Filter based on criteria
  if (criteria.category) {
    results = results.filter(service => 
      service.category === criteria.category || 
      service.subcategory === criteria.subcategory
    );
  }
  
  if (criteria.priceRange) {
    results = results.filter(service => {
      if (service.priceRange) {
        return service.priceRange.min >= criteria.priceRange.min &&
               service.priceRange.max <= criteria.priceRange.max;
      }
      return true;
    });
  }
  
  return results.slice(0, 6);
};

// Export the data
export { mockProviders, mockServices };
export type { MockProvider, MockService };
