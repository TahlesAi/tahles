
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
    maxAudience: service.maxAudience
  };
}

// נורמליזציה של כל השירותים
const normalizedExpandedProducts = expandedMockProducts.map(normalizeService);
const normalizedSearchResults = expandedMockSearchResults.map(normalizeService);

// איחוד השירותים לאחר נורמליזציה
export const allServices = normalizedExpandedProducts;
export const unifiedServices = [...normalizedSearchResults, ...normalizedExpandedProducts];
export const unifiedProviders = expandedMockProviders;

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

export const searchServices = (query: string, filters?: any): UnifiedService[] => {
  let results = [...unifiedServices];
  
  if (query) {
    const searchTerm = query.toLowerCase();
    results = results.filter(service => 
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.provider.toLowerCase().includes(searchTerm) ||
      service.category.toLowerCase().includes(searchTerm)
    );
  }
  
  if (filters?.category) {
    results = results.filter(service => 
      service.category.toLowerCase() === filters.category.toLowerCase()
    );
  }
  
  if (filters?.priceRange) {
    const [min, max] = filters.priceRange;
    results = results.filter(service => 
      service.price >= min && service.price <= max
    );
  }
  
  return results;
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
