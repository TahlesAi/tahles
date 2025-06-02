
// נתונים מאוחדים ומורחבים עם היררכיה מלאה
import { 
  CategoryHierarchy, 
  ExtendedProvider, 
  ExtendedService,
  officialCategoryHierarchy,
  generateSubcategoriesForCategory,
  generateSimulatedProviders,
  generateSimulatedServices,
  createDataSnapshot,
  findOrphanedData
} from './hierarchyManagement';

// הרחבת הקטגוריות הקיימות
export const enhancedCategoryHierarchy: CategoryHierarchy[] = officialCategoryHierarchy.map(category => ({
  ...category,
  subcategories: generateSubcategoriesForCategory(category.id, category.name).map(subcategory => {
    const providers = generateSimulatedProviders(subcategory.id, subcategory.name, 50);
    const providersWithServices = providers.map(provider => ({
      ...provider,
      services: generateSimulatedServices(provider.id, provider.name, subcategory.name)
    }));
    
    return {
      ...subcategory,
      providers: providersWithServices,
      providersCount: providersWithServices.length,
      servicesCount: providersWithServices.reduce((sum, p) => sum + p.services.length, 0)
    };
  })
}));

// ספקים מאוחדים מכל הקטגוריות
export const allEnhancedProviders: ExtendedProvider[] = enhancedCategoryHierarchy.reduce((allProviders, category) => {
  const categoryProviders = category.subcategories.reduce((catProviders, subcategory) => {
    return [...catProviders, ...subcategory.providers];
  }, [] as ExtendedProvider[]);
  
  return [...allProviders, ...categoryProviders];
}, [] as ExtendedProvider[]);

// שירותים מאוחדים מכל הספקים
export const allEnhancedServices: ExtendedService[] = allEnhancedProviders.reduce((allServices, provider) => {
  return [...allServices, ...provider.services];
}, [] as ExtendedService[]);

// פונקציות חיפוש מתקדמות עם בדיקת זמינות וקונספטים
export const searchServicesWithAvailability = (
  query: string,
  filters: {
    categoryId?: string;
    subcategoryId?: string;
    date?: string;
    time?: string;
    location?: string;
    priceRange?: [number, number];
    onlyAvailable?: boolean;
    conceptTags?: string[]; // *** תמיכה בסינון לפי קונספטים ***
  } = {}
): ExtendedService[] => {
  let results = [...allEnhancedServices];
  
  // סינון בסיסי - רק שירותים זמינים
  results = results.filter(service => service.available);
  
  // סינון לפי זמינות תאריך ושעה
  if (filters.onlyAvailable && filters.date && filters.time) {
    results = results.filter(service => {
      if (!service.availabilitySlots) return false;
      
      return service.availabilitySlots.some(slot => {
        const slotDate = slot.date === filters.date;
        const slotTime = slot.startTime <= filters.time! && slot.endTime >= filters.time!;
        const slotAvailable = slot.isAvailable && slot.currentBookings < slot.maxBookings;
        
        return slotDate && slotTime && slotAvailable;
      });
    });
  }
  
  // *** סינון לפי קונספטים - חיפוש חפיפה ***
  if (filters.conceptTags && filters.conceptTags.length > 0) {
    results = results.filter(service => {
      if (!service.conceptTags || service.conceptTags.length === 0) return false;
      
      // בדיקת חפיפה - אם יש לפחות קונספט אחד משותף
      return service.conceptTags.some(conceptTag => 
        filters.conceptTags!.includes(conceptTag)
      );
    });
  }
  
  // סינון לפי חיפוש טקסט
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    results = results.filter(service =>
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      (service.conceptTags && service.conceptTags.some(conceptTag => 
        conceptTag.toLowerCase().includes(searchTerm)
      ))
    );
  }
  
  // סינון לפי קטגוריה
  if (filters.categoryId) {
    results = results.filter(service => service.categoryId === filters.categoryId);
  }
  
  // סינון לפי תת קטגוריה
  if (filters.subcategoryId) {
    results = results.filter(service => service.subcategoryId === filters.subcategoryId);
  }
  
  // סינון לפי טווח מחירים
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    results = results.filter(service => service.price >= min && service.price <= max);
  }
  
  // מיון לפי רלוונטיות
  return results.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.rating - a.rating;
  });
};

// פונקציית בדיקת זמינות ספק
export const checkProviderAvailability = (providerId: string, date: string, time: string): boolean => {
  const provider = allEnhancedProviders.find(p => p.id === providerId);
  if (!provider || !provider.hasAvailableCalendar) return false;
  
  return provider.services.some(service => 
    service.availabilitySlots?.some(slot => 
      slot.date === date && 
      slot.startTime <= time && 
      slot.endTime >= time && 
      slot.isAvailable && 
      slot.currentBookings < slot.maxBookings
    )
  );
};

// פונקציית קבלת ספקים לפי זמינות
export const getAvailableProviders = (date: string, time: string): ExtendedProvider[] => {
  return allEnhancedProviders.filter(provider => 
    checkProviderAvailability(provider.id, date, time)
  );
};

// פונקציית קבלת שירותים לפי קטגוריה
export const getServicesByCategory = (categoryId: string): ExtendedService[] => {
  return allEnhancedServices.filter(service => service.categoryId === categoryId);
};

// פונקציית קבלת שירותים לפי תת קטגוריה
export const getServicesBySubcategory = (subcategoryId: string): ExtendedService[] => {
  return allEnhancedServices.filter(service => service.subcategoryId === subcategoryId);
};

// פונקציית קבלת ספק לפי ID
export const getProviderById = (providerId: string): ExtendedProvider | undefined => {
  return allEnhancedProviders.find(provider => provider.id === providerId);
};

// פונקציית קבלת שירות לפי ID
export const getServiceById = (serviceId: string): ExtendedService | undefined => {
  return allEnhancedServices.find(service => service.id === serviceId);
};

// אבחון נתונים יתומים
export const diagnoseDataIntegrity = () => {
  const orphanedData = findOrphanedData(allEnhancedProviders, allEnhancedServices);
  
  const stats = {
    totalCategories: enhancedCategoryHierarchy.length,
    totalSubcategories: enhancedCategoryHierarchy.reduce((sum, cat) => sum + cat.subcategories.length, 0),
    totalProviders: allEnhancedProviders.length,
    totalServices: allEnhancedServices.length,
    simulatedProviders: allEnhancedProviders.filter(p => p.isSimulated).length,
    simulatedServices: allEnhancedServices.filter(s => s.isSimulated).length,
    providersWithCalendar: allEnhancedProviders.filter(p => p.hasAvailableCalendar).length,
    availableServices: allEnhancedServices.filter(s => s.available).length,
    orphanedData
  };
  
  return {
    isHealthy: orphanedData.totalOrphaned === 0,
    stats,
    recommendations: generateRecommendations(stats)
  };
};

// המלצות לשיפור נתונים
const generateRecommendations = (stats: any): string[] => {
  const recommendations: string[] = [];
  
  if (stats.orphanedData.totalOrphaned > 0) {
    recommendations.push(`נמצאו ${stats.orphanedData.totalOrphaned} נתונים יתומים שצריכים תיקון`);
  }
  
  if (stats.providersWithCalendar < stats.totalProviders) {
    recommendations.push(`${stats.totalProviders - stats.providersWithCalendar} ספקים ללא יומן זמינות`);
  }
  
  if (stats.simulatedProviders > stats.totalProviders * 0.8) {
    recommendations.push('יותר מ-80% מהספקים הם סימולציה - מומלץ להוסיף ספקים אמיתיים');
  }
  
  return recommendations;
};

// יצירת snapshot נתונים
export const createCurrentDataSnapshot = () => {
  const changes = [
    'הוספת היררכיה מורחבת',
    'יצירת 50 ספקים לכל תת קטגוריה',
    'הוספת שירותים לכל ספק',
    'יצירת יומני זמינות ברירת מחדל'
  ];
  
  return createDataSnapshot(enhancedCategoryHierarchy, changes);
};

// ייצוא תואמות לאחור
export const consolidatedProviders = allEnhancedProviders.map(provider => ({
  id: provider.id,
  name: provider.name,
  businessName: provider.businessName,
  description: provider.description,
  categories: provider.subcategoryIds,
  contactPerson: provider.contactPerson,
  contact_person: provider.contactPerson,
  email: provider.email,
  contact_email: provider.email,
  phone: provider.phone,
  contact_phone: provider.phone,
  rating: provider.rating,
  reviewCount: provider.reviewCount,
  review_count: provider.reviewCount,
  featured: provider.featured,
  verified: provider.verified,
  is_verified: provider.verified,
  calendarActive: provider.calendarActive,
  address: provider.address,
  city: provider.city,
  logo: provider.name,
  logo_url: provider.name,
  specialties: [],
  yearsExperience: 5,
  gallery: []
}));

export const consolidatedProducts = allEnhancedServices.map(service => ({
  id: service.id,
  providerId: service.providerId,
  name: service.name,
  description: service.description,
  price: service.price,
  priceUnit: service.priceUnit,
  categoryId: service.categoryId,
  subcategoryId: service.subcategoryId,
  imageUrl: service.imageUrl,
  rating: service.rating,
  reviewCount: service.reviewCount,
  featured: service.featured,
  available: service.available,
  duration: service.duration,
  audienceSize: service.audienceSize,
  isReceptionService: service.isReceptionService,
  tags: service.tags,
  conceptTags: service.conceptTags || [], // *** הוספת conceptTags עם ברירת מחדל ***
  suitableFor: service.suitableFor,
  additionalImages: service.additionalImages,
  videos: service.videos,
  technicalRequirements: service.technicalRequirements,
  setupTime: service.setupTime,
  features: []
}));

export const consolidatedCalendars = allEnhancedProviders
  .filter(provider => provider.hasAvailableCalendar)
  .map(provider => ({
    providerId: provider.id,
    slots: provider.services[0]?.availabilitySlots?.map(slot => ({
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isAvailable: slot.isAvailable,
      maxBookings: slot.maxBookings,
      currentBookings: slot.currentBookings
    })) || []
  }));
