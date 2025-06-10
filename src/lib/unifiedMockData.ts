
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
  mediaGallery?: Array<{
    type: 'image' | 'video';
    url: string;
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
    logoUrl: '/lovable-uploads/dec3a07c-5760-46de-8667-f64d47df6447.png',
    website: 'https://netabresler.co.il',
    experience: 'מנטליסט מקצועי עם מעל 10 שנות ניסיון במופעים ברחבי הארץ. מתמחה במופעי חברות, אירועים פרטיים והרצאות העשרה.',
    categories: ['מנטליזם', 'אמני חושים', 'מופעים']
  }
];

// Mock services data - נטע ברסלר
const mockServices: MockService[] = [
  {
    id: 'neta-nomad-show',
    name: 'מופע נודד',
    description: 'מופע מנטליזם אינטימי ומותאם אישית שמתאים לכל מקום - בית, משרד, או כל סביבה קטנה. המופע כולל אינטראקציה ישירה עם הקהל וחוויה אישית בלתי נשכחת.',
    provider: 'נטע ברסלר - אמן המחשבות',
    providerId: 'neta-bresler-id',
    price: 2500,
    priceUnit: 'למופע',
    duration: '45 דקות',
    imageUrl: '/lovable-uploads/33049452-08d3-4f00-b0b1-98fe7d42c906.png',
    category: 'הזמנת מופעים',
    subcategory: 'אמני חושים',
    location: 'בכל הארץ',
    rating: 4.9,
    reviewCount: 23,
    features: [
      'מופע אינטימי ואישי',
      'מתאים לקבוצות קטנות',
      'אינטראקציה ישירה עם הקהל',
      'גמישות במיקום',
      'חוויה בלתי נשכחת'
    ],
    tags: ['מנטליזם', 'אינטימי', 'נייד', 'אירועי חברה'],
    mediaGallery: [
      { type: 'image', url: '/lovable-uploads/33049452-08d3-4f00-b0b1-98fe7d42c906.png' }
    ]
  },
  {
    id: 'neta-stage-show',
    name: 'מופע במה',
    description: 'מופע מנטליזם מרכזי ומרשים המתאים לאירועים גדולים. כולל הפעלת קהל רחבה, טריקים מרהיבים וחוויה קולקטיבית מותחת.',
    provider: 'נטע ברסלר - אמן המחשבות',
    providerId: 'neta-bresler-id',
    price: 4500,
    priceUnit: 'למופע',
    duration: '60 דקות',
    imageUrl: '/lovable-uploads/33049452-08d3-4f00-b0b1-98fe7d42c906.png',
    category: 'הזמנת מופעים',
    subcategory: 'אמני חושים',
    location: 'בכל הארץ',
    rating: 4.9,
    reviewCount: 45,
    features: [
      'מופע מרכזי מרהיב',
      'מתאים לקהל גדול',
      'טריקים מתקדמים',
      'הפעלת קהל מקצועית',
      'חוויה קולקטיבית'
    ],
    tags: ['מנטליזם', 'במה', 'קהל גדול', 'מרכזי'],
    mediaGallery: [
      { type: 'image', url: '/lovable-uploads/33049452-08d3-4f00-b0b1-98fe7d42c906.png' }
    ]
  },
  {
    id: 'neta-combined-show',
    name: 'מופע משולב',
    description: 'שילוב מושלם של מופע קבלת פנים ומופע מרכזי. מתחיל עם מנטליזם אינטימי בין האורחים ומסתיים במופע מרכזי מרהיב.',
    provider: 'נטע ברסלר - אמן המחשבות',
    providerId: 'neta-bresler-id',
    price: 6000,
    priceUnit: 'למופע',
    duration: '90 דקות',
    imageUrl: '/lovable-uploads/33049452-08d3-4f00-b0b1-98fe7d42c906.png',
    category: 'הזמנת מופעים',
    subcategory: 'אמני חושים',
    location: 'בכל הארץ',
    rating: 5.0,
    reviewCount: 34,
    features: [
      'שילוב של שני מופעים',
      'קבלת פנים אינטימית',
      'מופע מרכזי מרהיב',
      'ערך מוסף מקסימלי',
      'חוויה מקיפה'
    ],
    tags: ['מנטליזם', 'משולב', 'קבלת פנים', 'מרכזי'],
    mediaGallery: [
      { type: 'image', url: '/lovable-uploads/33049452-08d3-4f00-b0b1-98fe7d42c906.png' }
    ]
  },
  {
    id: 'neta-lecture',
    name: 'הרצאה במחשבה שניה',
    description: 'הרצאה מרתקת המשלבת מנטליזם עם תובנות על כוח המחשבה, קריאת אנשים ופסיכולוגיה. מתאימה לכנסים עסקיים ואירועי העשרה.',
    provider: 'נטע ברסלר - אמן המחשבות',
    providerId: 'neta-bresler-id',
    price: 3500,
    priceUnit: 'להרצאה',
    duration: '50 דקות',
    imageUrl: '/lovable-uploads/33049452-08d3-4f00-b0b1-98fe7d42c906.png',
    category: 'הרצאות',
    subcategory: 'אמני חושים',
    location: 'בכל הארץ',
    rating: 4.8,
    reviewCount: 19,
    features: [
      'שילוב מנטליזם והרצאה',
      'תובנות פסיכולוגיות',
      'מתאים לכנסים עסקיים',
      'תוכן העשרה',
      'מעורבות הקהל'
    ],
    tags: ['הרצאה', 'מנטליזם', 'עסקי', 'העשרה'],
    mediaGallery: [
      { type: 'image', url: '/lovable-uploads/33049452-08d3-4f00-b0b1-98fe7d42c906.png' }
    ]
  },
  {
    id: 'neta-error-show',
    name: 'מופע ERROR - לחברות היטק',
    description: 'מופע מנטליזם ייחודי המותאם במיוחד לעולם ההיטק והטכנולוגיה. כולל התייחסויות לעולם הדיגיטלי, בינה מלאכותית וחשיבה אלגוריתמית.',
    provider: 'נטע ברסלר - אמן המחשבות',
    providerId: 'neta-bresler-id',
    price: 5500,
    priceUnit: 'למופע',
    duration: '55 דקות',
    imageUrl: '/lovable-uploads/33049452-08d3-4f00-b0b1-98fe7d42c906.png',
    category: 'הזמנת מופעים',
    subcategory: 'אמני חושים',
    location: 'בכל הארץ',
    rating: 4.9,
    reviewCount: 28,
    features: [
      'מותאם לעולם ההיטק',
      'התייחסויות טכנולוגיות',
      'תוכן מקורי ויצירתי',
      'רלוונטי לחברות היטק',
      'שפה מקצועית'
    ],
    tags: ['מנטליזם', 'היטק', 'טכנולוגיה', 'חדשני'],
    mediaGallery: [
      { type: 'image', url: '/lovable-uploads/33049452-08d3-4f00-b0b1-98fe7d42c906.png' }
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

// Export the data
export { mockProviders, mockServices };
export type { MockProvider, MockService };
