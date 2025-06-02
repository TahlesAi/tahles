// src/lib/unifiedMockData.ts

import { expandedMockSearchResults, expandedMockProviders, expandedMockReviews } from './mockDataExpanded';
import { expandedMockProducts, filterProductsForGuidedSearch, getProductsByCategory, getProductsBySubcategory } from './expandedMockData';

// יצירת אינטרפייס מאוחד לשירותים
interface UnifiedService {
  id: string;
  name: string;
  description: string;
  provider: string;
  providerId: string;
  price: number;
  priceUnit?: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string;
  subcategory?: string;
  location?: string;
  featured?: boolean;
  // פרופרטיז שהיו חסרים ויוצרים שגיאות
  suitableFor: string[];
  additionalImages: string[];
  videos: string[];
  audienceSize: {
    min: number;
    max: number;
    optimal?: number;
  };
  technicalRequirements: string[];
  setupTime: number;
  tags: string[];
  features: string[];
  // פרופרטיז נוספים מהמוצרים המורחבים
  duration?: number;
  eventTypes?: string[];
  audienceAges?: string[];
  targetAudience?: string[];
  minAudience?: number;
  maxAudience?: number;
  // Added missing properties for reception service
  isReceptionService?: boolean;
  is_reception_service?: boolean;
}

// פונקציית נורמליזציה לוודא שכל השירותים יהיו עם מבנה אחיד
function normalizeService(service: any): UnifiedService {
  return {
    id: service.id || '',
    name: service.name || '',
    description: service.description || '',
    provider: service.provider || '',
    providerId: service.providerId || service.provider_id || '',
    price: service.price || 0,
    priceUnit: service.priceUnit || service.price_unit || 'לאירוע',
    rating: service.rating || 0,
    reviewCount: service.reviewCount || service.review_count || 0,
    imageUrl: service.imageUrl || service.image_url || '',
    category: service.category || '',
    subcategory: service.subcategory || '',
    location: service.location || '',
    featured: service.featured || false,
    // ערכי ברירת מחדל לפרופרטיז שחסרים
    suitableFor: service.suitableFor || [],
    additionalImages: service.additionalImages || service.additional_images || [],
    videos: service.videos || service.video_urls || [],
    audienceSize: service.audienceSize || {
      min: service.minAudience || 10,
      max: service.maxAudience || 200,
      optimal: 50
    },
    technicalRequirements: service.technicalRequirements || [],
    setupTime: service.setupTime || 30,
    tags: service.tags || [],
    features: service.features || [],
    // פרופרטיז נוספים
    duration: service.duration,
    eventTypes: service.eventTypes,
    audienceAges: service.audienceAges,
    targetAudience: service.targetAudience,
    minAudience: service.minAudience,
    maxAudience: service.maxAudience,
    // Handle reception service properties
    isReceptionService: service.isReceptionService || service.is_reception_service || false,
    is_reception_service: service.is_reception_service || service.isReceptionService || false
  };
}

// עדכון לשימוש בנתונים החדשים
import { 
  consolidatedProducts, 
  consolidatedProviders,
  getAvailableProductsForDate 
} from './consolidatedMockData';

// עדכון הנתונים המנורמלים
const normalizedExpandedProducts = consolidatedProducts.map(normalizeService);
const normalizedSearchResults = consolidatedProducts.map(normalizeService);

// איחוד השירותים לאחר נורמליזציה
export const allServices = normalizedExpandedProducts;
export const unifiedServices = [...normalizedSearchResults, ...normalizedExpandedProducts];
export const unifiedProviders = consolidatedProviders;

// Helper functions for finding services and providers - עכשיו עם נתונים מנורמלים
export const getServiceById = (id: string): UnifiedService | undefined => {
  return unifiedServices.find(service => service.id === id);
};

export const getProviderById = (id: string) => {
  return unifiedProviders.find(provider => provider.id === id);
};

export const getServicesByProvider = (providerId: string): UnifiedService[] => {
  return unifiedServices.filter(service => service.providerId === providerId);
};

export const getReviewsByService = (serviceId: string) => {
  return expandedMockReviews.filter(review => review.serviceId === serviceId);
};

export const getFeaturedServices = (): UnifiedService[] => {
  return unifiedServices.filter(service => service.featured).slice(0, 12);
};

// Enhanced search function with availability checking
export const searchServices = (
  query: string, 
  filters?: any,
  selectedDate?: string,
  selectedTime?: string
): UnifiedService[] => {
  let results = [...unifiedServices];
  
  console.log('Search started with query:', query, 'and filters:', filters);
  
  // סינון ראשוני - רק שירותים זמינים
  results = results.filter(service => service.featured !== undefined); // בדיקה שזה שירות תקין
  
  // סינון לפי זמינות אם נבחרו תאריך ושעה
  if (selectedDate) {
    const availableProducts = getAvailableProductsForDate(selectedDate, selectedTime);
    const availableProductIds = availableProducts.map(p => p.id);
    results = results.filter(service => availableProductIds.includes(service.id));
  }
  
  // Filter by search query
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    results = results.filter(service => 
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.provider.toLowerCase().includes(searchTerm) ||
      service.category.toLowerCase().includes(searchTerm) ||
      (service.subcategory && service.subcategory.toLowerCase().includes(searchTerm)) ||
      (service.tags && service.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }
  
  // Filter by category
  if (filters?.category && filters.category.trim()) {
    results = results.filter(service => 
      service.category.toLowerCase().includes(filters.category.toLowerCase()) ||
      (service.subcategory && service.subcategory.toLowerCase().includes(filters.category.toLowerCase()))
    );
  }
  
  // Filter by subcategory
  if (filters?.subcategory && filters.subcategory.trim()) {
    results = results.filter(service => 
      service.subcategory && service.subcategory.toLowerCase().includes(filters.subcategory.toLowerCase())
    );
  }
  
  // Filter by event concept
  if (filters?.eventConcept && filters.eventConcept.trim()) {
    results = results.filter(service => 
      service.eventTypes?.some(type => type.toLowerCase().includes(filters.eventConcept.toLowerCase())) ||
      service.tags.some(tag => tag.toLowerCase().includes(filters.eventConcept.toLowerCase()))
    );
  }
  
  // Filter by price range
  if (filters?.priceRange && Array.isArray(filters.priceRange)) {
    const [min, max] = filters.priceRange;
    results = results.filter(service => 
      service.price >= min && service.price <= max
    );
  }
  
  // Filter by location
  if (filters?.location && filters.location.trim()) {
    results = results.filter(service => 
      service.location && service.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  
  // Filter by rating
  if (filters?.minRating && typeof filters.minRating === 'number') {
    results = results.filter(service => service.rating >= filters.minRating);
  }
  
  console.log('Search completed. Results count:', results.length);
  
  // Sort results by relevance: featured first, then by rating, then by review count
  return results.sort((a, b) => {
    // Featured services first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // Then by rating
    if (a.rating !== b.rating) return b.rating - a.rating;
    
    // Then by review count
    return b.reviewCount - a.reviewCount;
  });
};

export const getServicesByCategory = (category: string): UnifiedService[] => {
  const rawProducts = getProductsByCategory(category);
  return rawProducts.map(normalizeService);
};

// Updated recommendation algorithm that uses the normalized products
export const getGuidedSearchRecommendations = (searchData: any): UnifiedService[] => {
  console.log('Search data for recommendations:', searchData);
  
  // Use the enhanced filtering function from expandedMockData
  const rawRecommendations = filterProductsForGuidedSearch(searchData);
  const normalizedRecommendations = rawRecommendations.map(normalizeService);
  
  console.log('Filtered recommendations:', normalizedRecommendations);
  
  // If no results found, return some featured products as fallback
  return normalizedRecommendations.length > 0 ? normalizedRecommendations : allServices.filter(s => s.featured).slice(0, 6);
};
