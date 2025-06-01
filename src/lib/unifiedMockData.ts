
// src/lib/unifiedMockData.ts

import { expandedMockSearchResults, expandedMockProviders, expandedMockReviews } from './mockDataExpanded';
import { expandedMockProducts, filterProductsForGuidedSearch, getProductsByCategory, getProductsBySubcategory } from './expandedMockData';

export const allServices = expandedMockProducts;

// Export the expanded data from mockDataExpanded
export const unifiedServices = [...expandedMockSearchResults, ...expandedMockProducts];
export const unifiedProviders = expandedMockProviders;

// Helper functions for finding services and providers
export const getServiceById = (id: string) => {
  const service = unifiedServices.find(service => service.id === id);
  
  // Ensure all required properties exist for type safety
  if (service) {
    return {
      ...service,
      suitableFor: service.suitableFor || [],
      additionalImages: service.additionalImages || [],
      videos: service.videos || [],
      audienceSize: service.audienceSize || { min: 10, max: 200, optimal: 50 },
      technicalRequirements: service.technicalRequirements || [],
      setupTime: service.setupTime || 30,
      tags: service.tags || [],
      features: service.features || []
    };
  }
  
  return undefined;
};

export const getProviderById = (id: string) => {
  return unifiedProviders.find(provider => provider.id === id);
};

export const getServicesByProvider = (providerId: string) => {
  const services = unifiedServices.filter(service => service.providerId === providerId);
  
  // Ensure all required properties exist for each service
  return services.map(service => ({
    ...service,
    suitableFor: service.suitableFor || [],
    additionalImages: service.additionalImages || [],
    videos: service.videos || [],
    audienceSize: service.audienceSize || { min: 10, max: 200, optimal: 50 },
    technicalRequirements: service.technicalRequirements || [],
    setupTime: service.setupTime || 30,
    tags: service.tags || [],
    features: service.features || []
  }));
};

export const getReviewsByService = (serviceId: string) => {
  return expandedMockReviews.filter(review => review.serviceId === serviceId);
};

export const getFeaturedServices = () => {
  return unifiedServices.filter(service => service.featured).slice(0, 12);
};

export const searchServices = (query: string, filters?: any) => {
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

export const getServicesByCategory = (category: string) => {
  return getProductsByCategory(category);
};

// Updated recommendation algorithm that uses the new expanded products
export const getGuidedSearchRecommendations = (searchData: any) => {
  console.log('Search data for recommendations:', searchData);
  
  // Use the enhanced filtering function from expandedMockData
  const recommendations = filterProductsForGuidedSearch(searchData);
  
  console.log('Filtered recommendations:', recommendations);
  
  // If no results found, return some featured products as fallback
  return recommendations.length > 0 ? recommendations : allServices.filter(s => s.featured).slice(0, 6);
};
