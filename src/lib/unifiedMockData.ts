
// src/lib/unifiedMockData.ts

import { expandedMockSearchResults, expandedMockProviders, expandedMockReviews } from './mockDataExpanded';
import { expandedMockProducts, filterProductsForGuidedSearch, getProductsByCategory, getProductsBySubcategory } from './expandedMockData';

export const allServices = expandedMockProducts;

// Export the expanded data from mockDataExpanded
export const unifiedServices = [...expandedMockSearchResults, ...expandedMockProducts];
export const unifiedProviders = expandedMockProviders;

// Helper functions for finding services and providers
export const getServiceById = (id: string) => {
  return unifiedServices.find(service => service.id === id);
};

export const getProviderById = (id: string) => {
  return unifiedProviders.find(provider => provider.id === provider.id);
};

export const getServicesByProvider = (providerId: string) => {
  return unifiedServices.filter(service => service.providerId === providerId);
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
