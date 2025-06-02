
// עדכון לשימוש בנתונים המורחבים החדשים
import { 
  enhancedCategoryHierarchy,
  allEnhancedProviders,
  allEnhancedServices,
  searchServicesWithAvailability,
  getServiceById as getEnhancedServiceById,
  getProviderById as getEnhancedProviderById,
  getServicesByCategory as getEnhancedServicesByCategory,
  getServicesBySubcategory as getEnhancedServicesBySubcategory,
  checkProviderAvailability,
  getAvailableProviders
} from './enhancedConsolidatedData';

// ממפים ויוצאים את הנתונים בפורמט הנדרש
export const allServices = allEnhancedServices.map(service => ({
  id: service.id,
  name: service.name,
  description: service.description,
  provider: allEnhancedProviders.find(p => p.id === service.providerId)?.name || 'לא ידוע',
  providerId: service.providerId,
  price: service.price,
  priceUnit: service.priceUnit,
  rating: service.rating,
  reviewCount: service.reviewCount,
  imageUrl: service.imageUrl,
  category: service.categoryId,
  subcategory: service.subcategoryId,
  location: allEnhancedProviders.find(p => p.id === service.providerId)?.city || 'לא צוין',
  featured: service.featured,
  suitableFor: service.suitableFor,
  additionalImages: service.additionalImages,
  videos: service.videos,
  audienceSize: service.audienceSize,
  technicalRequirements: service.technicalRequirements,
  setupTime: service.setupTime,
  tags: service.tags,
  features: [],
  duration: service.duration,
  isReceptionService: service.isReceptionService,
  is_reception_service: service.isReceptionService
}));

export const unifiedServices = allServices;
export const unifiedProviders = allEnhancedProviders.map(provider => ({
  id: provider.id,
  name: provider.name,
  businessName: provider.businessName,
  description: provider.description,
  contactPerson: provider.contactPerson,
  email: provider.email,
  phone: provider.phone,
  address: provider.address,
  city: provider.city,
  rating: provider.rating,
  reviewCount: provider.reviewCount,
  featured: provider.featured,
  verified: provider.verified,
  categories: provider.subcategoryIds,
  logo: provider.name,
  gallery: []
}));

// נתונים מדומים לביקורות
const mockReviews = [
  {
    id: 'review-1',
    serviceId: 'service-1',
    providerId: 'provider-1',
    customerName: 'יעל כהן',
    rating: 5,
    comment: 'שירות מעולה! המופע היה מרהיב והילדים נהנו מאוד',
    createdAt: '2024-01-15T10:00:00Z',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'review-2',
    serviceId: 'service-1',
    providerId: 'provider-1',
    customerName: 'דוד לוי',
    rating: 4,
    comment: 'מופע טוב, ההגעה הייתה בזמן והאמן היה מקצועי',
    createdAt: '2024-01-10T14:30:00Z',
    created_at: '2024-01-10T14:30:00Z'
  },
  {
    id: 'review-3',
    serviceId: 'service-2',
    providerId: 'provider-2',
    customerName: 'שרה אברהם',
    rating: 5,
    comment: 'האירוע היה מושלם! תודה רבה על השירות המעולה',
    createdAt: '2024-01-08T16:45:00Z',
    created_at: '2024-01-08T16:45:00Z'
  }
];

// פונקציות עזר מעודכנות
export const getServiceById = (id: string) => {
  const service = getEnhancedServiceById(id);
  if (!service) return undefined;
  
  return {
    ...service,
    provider: allEnhancedProviders.find(p => p.id === service.providerId)?.name || 'לא ידוע',
    location: allEnhancedProviders.find(p => p.id === service.providerId)?.city || 'לא צוין'
  };
};

export const getProviderById = (id: string) => {
  return getEnhancedProviderById(id);
};

export const getServicesByProvider = (providerId: string) => {
  return allEnhancedServices
    .filter(service => service.providerId === providerId)
    .map(service => ({
      ...service,
      provider: allEnhancedProviders.find(p => p.id === service.providerId)?.name || 'לא ידוע',
      location: allEnhancedProviders.find(p => p.id === service.providerId)?.city || 'לא צוין'
    }));
};

export const getFeaturedServices = () => {
  return allServices.filter(service => service.featured).slice(0, 12);
};

// פונקציית חיפוש מעודכנת עם בדיקת זמינות
export const searchServices = (
  query: string, 
  filters?: any,
  selectedDate?: string,
  selectedTime?: string
) => {
  const results = searchServicesWithAvailability(query, {
    categoryId: filters?.category,
    subcategoryId: filters?.subcategory,
    date: selectedDate,
    time: selectedTime,
    location: filters?.location,
    priceRange: filters?.priceRange,
    onlyAvailable: true
  });

  return results.map(service => ({
    ...service,
    provider: allEnhancedProviders.find(p => p.id === service.providerId)?.name || 'לא ידוע',
    location: allEnhancedProviders.find(p => p.id === service.providerId)?.city || 'לא צוין',
    category: service.categoryId,
    subcategory: service.subcategoryId
  }));
};

export const getServicesByCategory = (category: string) => {
  return getEnhancedServicesByCategory(category).map(service => ({
    ...service,
    provider: allEnhancedProviders.find(p => p.id === service.providerId)?.name || 'לא ידוע',
    location: allEnhancedProviders.find(p => p.id === service.providerId)?.city || 'לא צוין',
    category: service.categoryId,
    subcategory: service.subcategoryId
  }));
};

// פונקציית המלצות מעודכנת
export const getGuidedSearchRecommendations = (searchData: any) => {
  const filters = {
    categoryId: searchData.category,
    subcategoryId: searchData.subcategory,
    date: searchData.eventDate ? searchData.eventDate.toISOString().split('T')[0] : undefined,
    onlyAvailable: true
  };

  const results = searchServicesWithAvailability('', filters);
  
  return results.slice(0, 6).map(service => ({
    ...service,
    provider: allEnhancedProviders.find(p => p.id === service.providerId)?.name || 'לא ידוע',
    location: allEnhancedProviders.find(p => p.id === service.providerId)?.city || 'לא צוין',
    category: service.categoryId,
    subcategory: service.subcategoryId
  }));
};

// פונקציות זמינות
export const checkServiceAvailability = (serviceId: string, date: string, time: string): boolean => {
  const service = getEnhancedServiceById(serviceId);
  if (!service) return false;
  
  return checkProviderAvailability(service.providerId, date, time);
};

export const getServicesWithAvailability = (date: string, time: string) => {
  const availableProviders = getAvailableProviders(date, time);
  const availableProviderIds = availableProviders.map(p => p.id);
  
  return allServices.filter(service => 
    availableProviderIds.includes(service.providerId)
  );
};

// פונקציה חדשה לקבלת ביקורות לפי שירות
export const getReviewsByService = (serviceId: string) => {
  return mockReviews.filter(review => review.serviceId === serviceId);
};

// פונקציה לקבלת ביקורות לפי ספק
export const getReviewsByProvider = (providerId: string) => {
  return mockReviews.filter(review => review.providerId === providerId);
};

// פונקציות תואמות לאחור
export const expandedMockSearchResults = allServices;
export const expandedMockProviders = unifiedProviders;
export const expandedMockReviews = mockReviews;
