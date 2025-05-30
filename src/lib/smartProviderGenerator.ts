
import { ProviderProfile, ServiceProfile } from './types';

interface CategoryTemplate {
  id: string;
  name: string;
  businessNameTemplates: string[];
  descriptionTemplates: string[];
  specialtiesTemplates: string[];
  serviceTemplates: {
    names: string[];
    descriptions: string[];
    priceRanges: [number, number];
    features: string[];
  };
  locationPreferences: string[];
  mediaKeywords: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  styling: {
    cardStyle: 'modern' | 'classic' | 'artistic' | 'professional';
    imageStyle: 'vibrant' | 'elegant' | 'dramatic' | 'clean';
    fontStyle: 'bold' | 'elegant' | 'casual' | 'modern';
  };
}

const categoryTemplates: CategoryTemplate[] = [
  {
    id: 'mind-artists',
    name: 'אמני חושים',
    businessNameTemplates: [
      '{name} - אמן החושים',
      'קסמי {name}',
      '{name} מנטליסט',
      'אמנות החשיבה - {name}',
      '{name} Mind Magic'
    ],
    descriptionTemplates: [
      'מופעי קריאת מחשבות וטלפתיה ברמה הגבוהה ביותר. {years} שנות ניסיון במופעים פרטיים ועסקיים.',
      'אמן חושים מקצועי המתמחה בהשפעה מנטלית ואשליות מחשבה. ביצועים בלתי נשכחים לכל סוג אירוע.',
      'מנטליסט מוביל עם יכולות יוצאות דופן בקריאת מחשבות וניבוי העתיד. מופעים אינטראקטיביים מרתקים.'
    ],
    specialtiesTemplates: [
      ['קריאת מחשבות', 'השפעה מנטלית', 'ניבוי עתיד', 'אינטראקציה עם הקהל'],
      ['טלפתיה', 'אשליות מנטליות', 'מופעי קסם נפשי', 'התאמה אישית'],
      ['פסיכומטריה', 'קריאה בשפת גוף', 'מניפולציה חיובית', 'חוויות על-חושיות']
    ],
    serviceTemplates: {
      names: [
        'מופע קריאת מחשבות מרכזי',
        'קבלת פנים מנטלית',
        'סדנת השפעה מנטלית',
        'מופע טלפתיה אינטימי',
        'ערב מנטליזם וקסם'
      ],
      descriptions: [
        'מופע מרכזי מרתק של קריאת מחשבות וטלפתיה. האורחים יחוו השפעה מנטלית בלתי נשכחת.',
        'קבלת פנים אינטראקטיבית עם קריאת כפות יד וניבוי אישי לכל אורח.',
        'מופע אינטימי המשלב קסם נפשי עם אינטראקציה אישית.',
        'חוויה קבוצתית של השפעה מנטלית ואשליות מחשבה מדהימות.'
      ],
      priceRanges: [2500, 8000],
      features: [
        'מופע אינטראקטיבי מלא',
        'התאמה לקהל ולאירוע',
        'ציוד מקצועי כלול',
        'גמישות בזמנים',
        'אפשרות למופע דו-לשוני'
      ]
    },
    locationPreferences: ['תל אביב', 'ירושלים', 'חיפה', 'רמת גן', 'פתח תקווה'],
    mediaKeywords: ['מנטליסט', 'קריאת מחשבות', 'קסם נפשי', 'טלפתיה'],
    colors: {
      primary: '#4C1D95', // Purple
      secondary: '#7C3AED',
      accent: '#A855F7'
    },
    styling: {
      cardStyle: 'artistic',
      imageStyle: 'dramatic',
      fontStyle: 'bold'
    }
  },
  {
    id: 'magicians',
    name: 'קוסמים',
    businessNameTemplates: [
      'קסמי {name}',
      '{name} המקסם',
      'עולם הקסמים של {name}',
      '{name} Magic Show',
      'קסם ופלאים - {name}'
    ],
    descriptionTemplates: [
      'קוסם מקצועי עם {years} שנות ניסיון במופעי קסם לכל הגילאים. מופעים מדהימים ואינטראקטיביים.',
      'אמן קסמים מוביל המתמחה במופעי קסם משפחתיים ועסקיים. קסמים מדהימים שיהפכו את האירוע לבלתי נשכח.',
      'קוסם מקצועי עם רפרטואר עשיר של קסמים קלאסיים ומודרניים. התאמה מלאה לכל סוג קהל.'
    ],
    specialtiesTemplates: [
      ['קסמי במה', 'קסמים קרובים', 'בלונים', 'קסמי ילדים'],
      ['אשליות', 'קסמי נעלמות', 'קלפים', 'מניפולציות'],
      ['קסמי קומדיה', 'מופעי במה', 'אינטראקציה', 'קסמי משפחה']
    ],
    serviceTemplates: {
      names: [
        'מופע קסמים מרכזי',
        'קבלת פנים קסמים',
        'סדנת קסמים לילדים',
        'מופע קסמים אינטימי',
        'ערב קסמים וקומדיה'
      ],
      descriptions: [
        'מופע קסמים מרתק ומדהים לכל המשפחה. קסמים גדולים וקטנים שיהפכו את האירוע למיוחד.',
        'קבלת פנים עם קסמים קרובים ואינטראקציה אישית עם האורחים.',
        'מופע קסמים מותאם במיוחד לילדים עם השתתפות והפעלה.',
        'ערב קסמים אינטימי המשלב הומור וקסמים מדהימים.'
      ],
      priceRanges: [1800, 6000],
      features: [
        'מופע מלא עם ציוד',
        'התאמה לגילאי הקהל',
        'אפשרות לסדנה',
        'תחפושות וקסמים',
        'הפעלה אינטראקטיבית'
      ]
    },
    locationPreferences: ['תל אביב', 'חיפה', 'באר שבע', 'אשדוד', 'ראשון לציון'],
    mediaKeywords: ['קוסם', 'קסמים', 'הופעה', 'ילדים'],
    colors: {
      primary: '#DC2626', // Red
      secondary: '#EF4444',
      accent: '#F87171'
    },
    styling: {
      cardStyle: 'modern',
      imageStyle: 'vibrant',
      fontStyle: 'casual'
    }
  },
  {
    id: 'singers',
    name: 'זמרים ונגנים',
    businessNameTemplates: [
      '{name} - אמן קול',
      'מוזיקה של {name}',
      '{name} Live',
      'הופעות {name}',
      '{name} Music'
    ],
    descriptionTemplates: [
      'זמר/ת מקצועי/ת עם {years} שנות ניסיון בהופעות חיות. רפרטואר עשיר בעברית ובאנגלית.',
      'אמן/ית מוזיקלי/ת מוכשר/ת המתמחה בהופעות אינטימיות וקהל גדול. ביצועים מרגשים ומקצועיים.',
      'זמר/ת עם קול יוצא דופן ונוכחות במה מרהיבה. הופעות מותאמות לכל סוג אירוע.'
    ],
    specialtiesTemplates: [
      ['שירה חיה', 'ליווי גיטרה', 'שירים בעברית', 'שירים באנגלית'],
      ['מוזיקה קלאסית', 'פופ ישראלי', 'בלדות', 'שירי זמר'],
      ['ליווי פסנתר', 'הופעות סולו', 'דואטים', 'שירת קהל']
    ],
    serviceTemplates: {
      names: [
        'הופעה חיה מלאה',
        'סט אקוסטי אינטימי',
        'ליווי מוזיקלי לאירוע',
        'ערב זמר ישראלי',
        'מיני קונסרט'
      ],
      descriptions: [
        'הופעה חיה מרגשת עם הלהיטים הגדולים והשירים הכי אהובים.',
        'סט אקוסטי אינטימי המותאם לאווירת האירוע.',
        'ליווי מוזיקלי מקצועי לאורך האירוע.',
        'מופע זמר ישראלי קלאסי עם השירים שכולם אוהבים.'
      ],
      priceRanges: [2000, 7500],
      features: [
        'הופעה חיה מלאה',
        'ציוד הגברה כלול',
        'רפרטואר מגוון',
        'התאמה לקהל',
        'אפשרות לבקשות'
      ]
    },
    locationPreferences: ['תל אביב', 'חיפה', 'ירושלים', 'נתניה', 'רמת גן'],
    mediaKeywords: ['זמר', 'מוזיקה', 'הופעה', 'קונסרט'],
    colors: {
      primary: '#059669', // Green
      secondary: '#10B981',
      accent: '#34D399'
    },
    styling: {
      cardStyle: 'elegant',
      imageStyle: 'vibrant',
      fontStyle: 'modern'
    }
  }
];

const firstNames = [
  'אבי', 'דני', 'יוסי', 'מיכאל', 'רון', 'עמית', 'אלון', 'תומר', 'אור', 'גל',
  'מיכל', 'שרה', 'רונית', 'דנה', 'מירי', 'טלי', 'נעמי', 'יעל', 'לירון', 'ענת'
];

const lastNames = [
  'כהן', 'לוי', 'ברגר', 'שמש', 'רוזן', 'גולד', 'סילבר', 'פרידמן', 'דיין', 'אור',
  'ברסלר', 'זוהר', 'אביב', 'שלום', 'נור', 'בן דוד', 'יוסף', 'משה', 'דוד', 'אברהם'
];

export function generateRandomName(): string {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

export function generateBusinessName(categoryTemplate: CategoryTemplate, name: string): string {
  const template = categoryTemplate.businessNameTemplates[
    Math.floor(Math.random() * categoryTemplate.businessNameTemplates.length)
  ];
  return template.replace('{name}', name);
}

export function generateDescription(categoryTemplate: CategoryTemplate): string {
  const template = categoryTemplate.descriptionTemplates[
    Math.floor(Math.random() * categoryTemplate.descriptionTemplates.length)
  ];
  const years = Math.floor(Math.random() * 10) + 5; // 5-15 years
  return template.replace('{years}', years.toString());
}

export function generateSpecialties(categoryTemplate: CategoryTemplate): string[] {
  const template = categoryTemplate.specialtiesTemplates[
    Math.floor(Math.random() * categoryTemplate.specialtiesTemplates.length)
  ];
  return [...template];
}

export function generateServices(categoryTemplate: CategoryTemplate, providerId: string): ServiceProfile[] {
  const serviceCount = Math.floor(Math.random() * 3) + 2; // 2-4 services
  const services: ServiceProfile[] = [];
  
  for (let i = 0; i < serviceCount; i++) {
    const serviceName = categoryTemplate.serviceTemplates.names[
      Math.floor(Math.random() * categoryTemplate.serviceTemplates.names.length)
    ];
    
    const serviceDescription = categoryTemplate.serviceTemplates.descriptions[
      Math.floor(Math.random() * categoryTemplate.serviceTemplates.descriptions.length)
    ];
    
    const [minPrice, maxPrice] = categoryTemplate.serviceTemplates.priceRanges;
    const price = Math.floor(Math.random() * (maxPrice - minPrice) + minPrice);
    
    const rating = Math.random() * 1.5 + 3.5; // 3.5-5.0
    const reviewCount = Math.floor(Math.random() * 50) + 10;
    
    services.push({
      id: `${providerId}-service-${i + 1}`,
      name: serviceName,
      description: serviceDescription,
      price: price,
      priceUnit: 'לאירוע',
      imageUrl: generateImageUrl(categoryTemplate.mediaKeywords[0]),
      additionalImages: [
        generateImageUrl(categoryTemplate.mediaKeywords[1] || categoryTemplate.mediaKeywords[0]),
        generateImageUrl(categoryTemplate.mediaKeywords[2] || categoryTemplate.mediaKeywords[0])
      ],
      videos: [generateVideoUrl(categoryTemplate.mediaKeywords[0])],
      providerId: providerId,
      category: categoryTemplate.name,
      subcategory: categoryTemplate.name,
      location: categoryTemplate.locationPreferences[
        Math.floor(Math.random() * categoryTemplate.locationPreferences.length)
      ],
      rating: Math.round(rating * 10) / 10,
      reviewCount: reviewCount,
      featured: Math.random() > 0.7,
      tags: categoryTemplate.serviceTemplates.features.slice(0, 3),
      suitableFor: ['אירועי חברה', 'חתונות', 'בר/בת מצווה', 'ימי הולדת'],
      audienceSize: generateAudienceSize(),
      duration: generateDuration()
    });
  }
  
  return services;
}

function generateImageUrl(keyword: string): string {
  const imageIds = [
    '1500x1000', '1600x1200', '1400x900', '1800x1200', '1200x800'
  ];
  const randomId = imageIds[Math.floor(Math.random() * imageIds.length)];
  return `https://picsum.photos/${randomId}?random=${Math.floor(Math.random() * 1000)}&blur=1`;
}

function generateVideoUrl(keyword: string): string {
  return `https://example.com/video/${keyword}-${Math.floor(Math.random() * 100)}.mp4`;
}

function generateAudienceSize(): string {
  const sizes = ['עד 50 אנשים', '50-100 אנשים', '100-200 אנשים', '200+ אנשים'];
  return sizes[Math.floor(Math.random() * sizes.length)];
}

function generateDuration(): string {
  const durations = ['30 דקות', '45 דקות', '60 דקות', '90 דקות', '2 שעות'];
  return durations[Math.floor(Math.random() * durations.length)];
}

export function generateProvider(categoryId: string): ProviderProfile {
  const categoryTemplate = categoryTemplates.find(t => t.id === categoryId);
  if (!categoryTemplate) {
    throw new Error(`Category template not found for ID: ${categoryId}`);
  }
  
  const name = generateRandomName();
  const businessName = generateBusinessName(categoryTemplate, name.split(' ')[0]);
  const description = generateDescription(categoryTemplate);
  const specialties = generateSpecialties(categoryTemplate);
  
  const providerId = `provider-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const rating = Math.random() * 1.5 + 3.5; // 3.5-5.0
  const reviewCount = Math.floor(Math.random() * 100) + 20;
  
  const provider: ProviderProfile = {
    id: providerId,
    contactPerson: name,
    businessName: businessName,
    description: description,
    phone: `05${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
    email: `${name.split(' ')[0].toLowerCase()}@${businessName.split(' ')[0].toLowerCase()}.co.il`,
    city: categoryTemplate.locationPreferences[
      Math.floor(Math.random() * categoryTemplate.locationPreferences.length)
    ],
    address: `רחוב הבימה ${Math.floor(Math.random() * 100) + 1}`,
    website: `www.${businessName.split(' ')[0].toLowerCase()}.co.il`,
    logo: generateImageUrl(categoryTemplate.mediaKeywords[0]),
    gallery: [
      generateImageUrl(categoryTemplate.mediaKeywords[0]),
      generateImageUrl(categoryTemplate.mediaKeywords[1] || categoryTemplate.mediaKeywords[0]),
      generateImageUrl(categoryTemplate.mediaKeywords[2] || categoryTemplate.mediaKeywords[0])
    ],
    rating: Math.round(rating * 10) / 10,
    reviewCount: reviewCount,
    verified: Math.random() > 0.3,
    categories: [categoryTemplate.name],
    specialties: specialties,
    yearsExperience: Math.floor(Math.random() * 15) + 5,
    insurance: true,
    testimonials: [
      {
        text: `${businessName} הפך את האירוע שלנו לבלתי נשכח! ביצוע מקצועי ברמה הגבוהה ביותר.`,
        author: 'לקוח מרוצה',
        rating: 5,
        date: '2024-01-15'
      }
    ]
  };
  
  return provider;
}

export function generateProvidersForCategory(categoryId: string, count: number): ProviderProfile[] {
  const providers: ProviderProfile[] = [];
  
  for (let i = 0; i < count; i++) {
    try {
      const provider = generateProvider(categoryId);
      providers.push(provider);
    } catch (error) {
      console.error(`Error generating provider ${i + 1} for category ${categoryId}:`, error);
    }
  }
  
  return providers;
}

export function generateServicesForProviders(providers: ProviderProfile[]): ServiceProfile[] {
  const allServices: ServiceProfile[] = [];
  
  providers.forEach(provider => {
    const categoryTemplate = categoryTemplates.find(t => 
      provider.categories.includes(t.name)
    );
    
    if (categoryTemplate) {
      const services = generateServices(categoryTemplate, provider.id);
      allServices.push(...services);
    }
  });
  
  return allServices;
}

export { categoryTemplates };
