// נתונים מאוחדים ומורחבים עם היררכיה מלאה - מערכת מתקדמת
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
import { hierarchyValidator } from './hierarchyValidator';
import { availabilityManager } from './availabilityManager';
import { performanceMonitor } from '@/utils/performanceMonitor';

// הרחבת הקטגוריות הקיימות עם אופטימיזציה
export const enhancedCategoryHierarchy: CategoryHierarchy[] = (() => {
  performanceMonitor.start('EnhancedCategoryHierarchy-Build');
  
  const result = officialCategoryHierarchy.map(category => ({
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
  
  performanceMonitor.end('EnhancedCategoryHierarchy-Build');
  return result;
})();

// ספקים מאוחדים מכל הקטגוריות עם מטמון
export const allEnhancedProviders: ExtendedProvider[] = (() => {
  performanceMonitor.start('AllEnhancedProviders-Build');
  
  const result = enhancedCategoryHierarchy.reduce((allProviders, category) => {
    const categoryProviders = category.subcategories.reduce((catProviders, subcategory) => {
      return [...catProviders, ...subcategory.providers];
    }, [] as ExtendedProvider[]);
    
    return [...allProviders, ...categoryProviders];
  }, [] as ExtendedProvider[]);
  
  // תיקון היררכיה אוטומטי
  const { providers: fixedProviders } = hierarchyValidator.validateAndFixAll(result, []);
  
  performanceMonitor.end('AllEnhancedProviders-Build');
  return fixedProviders;
})();

// שירותים מאוחדים מכל הספקים עם אופטימיזציה
export const allEnhancedServices: ExtendedService[] = (() => {
  performanceMonitor.start('AllEnhancedServices-Build');
  
  const result = allEnhancedProviders.reduce((allServices, provider) => {
    return [...allServices, ...provider.services];
  }, [] as ExtendedService[]);
  
  // תיקון היררכיה אוטומטי
  const { services: fixedServices } = hierarchyValidator.validateAndFixAll([], result);
  
  // רישום שירותים במנהל הזמינות
  fixedServices.forEach(service => {
    availabilityManager.registerService(service.id, service.providerId, {
      isAvailable: service.available,
      hasCalendar: true,
      maxConcurrentBookings: service.maxConcurrentBookings || 1
    });
  });
  
  performanceMonitor.end('AllEnhancedServices-Build');
  return fixedServices;
})();

// פונקציות חיפוש מתקדמות עם ביצועים מתקדמים
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
    conceptTags?: string[];
    availableOnly?: boolean;
  } = {}
): ExtendedService[] => {
  performanceMonitor.start('SearchServicesWithAvailability', { 
    query, 
    filterCount: Object.keys(filters).length 
  });
  
  let results = [...allEnhancedServices];
  
  // סינון רק שירותים זמינים (אם מתבקש)
  if (filters.availableOnly || filters.onlyAvailable) {
    results = availabilityManager.filterAvailableServices(results);
  }
  
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
  
  // סינון לפי קונספטים - חיפוש חפיפה מתקדם
  if (filters.conceptTags && filters.conceptTags.length > 0) {
    results = results.filter(service => {
      if (!service.conceptTags || service.conceptTags.length === 0) return false;
      
      // בדיקת חפיפה - אם יש לפחות קונספט אחד משותף
      return service.conceptTags.some(conceptTag => 
        filters.conceptTags!.some(filterTag => 
          conceptTag.toLowerCase().includes(filterTag.toLowerCase()) ||
          filterTag.toLowerCase().includes(conceptTag.toLowerCase())
        )
      );
    });
  }
  
  // סינון לפי חיפוש טקסט מתקדם
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    const searchWords = searchTerm.split(/\s+/);
    
    results = results.filter(service => {
      const searchableText = [
        service.name,
        service.description,
        ...service.tags,
        ...(service.conceptTags || [])
      ].join(' ').toLowerCase();
      
      // חיפוש מתקדם - כל המילים צריכות להופיע
      return searchWords.every(word => searchableText.includes(word));
    });
  }
  
  // שאר הסינונים...
  if (filters.categoryId) {
    results = results.filter(service => service.categoryId === filters.categoryId);
  }
  
  if (filters.subcategoryId) {
    results = results.filter(service => service.subcategoryId === filters.subcategoryId);
  }
  
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    results = results.filter(service => service.price >= min && service.price <= max);
  }
  
  // מיון לפי רלוונטיות מתקדם
  const sortedResults = results.sort((a, b) => {
    // משקל מורכב
    let scoreA = 0;
    let scoreB = 0;
    
    // בונוס למוצגים בראש
    if (a.featured) scoreA += 10;
    if (b.featured) scoreB += 10;
    
    // בונוס לדירוג גבוה
    scoreA += a.rating * 2;
    scoreB += b.rating * 2;
    
    // בונוס לזמינות
    if (availabilityManager.isServiceAvailable(a.id, a.providerId)) scoreA += 5;
    if (availabilityManager.isServiceAvailable(b.id, b.providerId)) scoreB += 5;
    
    return scoreB - scoreA;
  });
  
  performanceMonitor.end('SearchServicesWithAvailability');
  return sortedResults;
};

// פונקציות שימושיות נוספות עם אופטימיזציות
export const checkProviderAvailability = (providerId: string, date: string, time: string): boolean => {
  return availabilityManager.isServiceAvailable('', providerId);
};

export const getAvailableProviders = (date: string, time: string): ExtendedProvider[] => {
  return allEnhancedProviders.filter(provider => {
    return provider.services.some(service => 
      availabilityManager.isServiceAvailable(service.id, provider.id)
    );
  });
};

export const getServicesByCategory = (categoryId: string): ExtendedService[] => {
  return allEnhancedServices.filter(service => service.categoryId === categoryId);
};

export const getServicesBySubcategory = (subcategoryId: string): ExtendedService[] => {
  return allEnhancedServices.filter(service => service.subcategoryId === subcategoryId);
};

export const getProviderById = (providerId: string): ExtendedProvider | undefined => {
  return allEnhancedProviders.find(provider => provider.id === providerId);
};

export const getServiceById = (serviceId: string): ExtendedService | undefined => {
  return allEnhancedServices.find(service => service.id === serviceId);
};

// אבחון נתונים יתומים עם ביצועים מתקדמים
export const diagnoseDataIntegrity = () => {
  performanceMonitor.start('DataIntegrityDiagnosis');
  
  const orphanedData = findOrphanedData(allEnhancedProviders, allEnhancedServices);
  const availabilityStats = availabilityManager.getAvailabilityStats();
  
  const stats = {
    totalCategories: enhancedCategoryHierarchy.length,
    totalSubcategories: enhancedCategoryHierarchy.reduce((sum, cat) => sum + cat.subcategories.length, 0),
    totalProviders: allEnhancedProviders.length,
    totalServices: allEnhancedServices.length,
    simulatedProviders: allEnhancedProviders.filter(p => p.isSimulated).length,
    simulatedServices: allEnhancedServices.filter(s => s.isSimulated).length,
    providersWithCalendar: allEnhancedProviders.filter(p => p.hasAvailableCalendar).length,
    availableServices: allEnhancedServices.filter(s => s.available).length,
    orphanedData,
    availabilityStats
  };
  
  performanceMonitor.end('DataIntegrityDiagnosis');
  
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
  
  if (stats.availabilityStats.activeHolds > 10) {
    recommendations.push(`יש ${stats.availabilityStats.activeHolds} holds פעילים - בדוק ביטול אוטומטי`);
  }
  
  return recommendations;
};

// יצירת snapshot נתונים
export const createCurrentDataSnapshot = () => {
  const changes = [
    'הוספת היררכיה מורחבת',
    'יצירת 50 ספקים לכל תת קטגוריה', 
    'הוספת שירותים לכל ספק',
    'יצירת יומני זמינות ברירת מחדל',
    'תיקון היררכיה אוטומטי',
    'רישום שירותים במנהל הזמינות',
    'אופטימיזציית ביצועים'
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
  conceptTags: service.conceptTags || [],
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
