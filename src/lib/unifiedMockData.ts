
// src/lib/unifiedMockData.ts

import { expandedMockSearchResults, expandedMockProviders, expandedMockReviews } from './mockDataExpanded';

export const allServices = [
  {
    id: "enhanced-mentalist-1",
    name: "אומן החושים - נטע ברסלר",
    description: "מופע אומנות חושים מרהיב המשלב קריאת מחשבות, טלפתיה ואמנות קסמים מנטלית ברמה עולמית",
    provider: "נטע ברסלר - אמן המחשבות",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    category: "מופעים",
    subcategory: "אומני חושים",
    price: 3500,
    priceUnit: "למופע",
    duration: 45,
    location: "תל אביב והמרכז",
    rating: 4.9,
    reviewCount: 127,
    tags: ["מופע אינטראקטיבי", "מתאים לכל הגילאים", "ללא צורך בהגברה"],
    eventTypes: ["private", "business", "mixed"],
    audienceAges: ["teenagers", "adults", "seniors"],
    targetAudience: ["חילוני", "דתי", "מעורב"],
    minAudience: 20,
    maxAudience: 500,
    priceRange: "3,000-5,000 ₪",
    features: ["מופע אישי", "אינטראקטיבי", "מרהיב"],
    technicalRequirements: ["במה או אזור מרכזי", "תאורה בסיסית"]
  },
  {
    id: "enhanced-band-1", 
    name: "להקת רוק אלטרנטיבי - The Echoes",
    description: "להקת רוק אלטרנטיבי המבצעת כיסויים מרהיבים לשירים מוכרים ויצירות מקוריות",
    provider: "The Echoes Band",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    category: "מופעים",
    subcategory: "להקות",
    price: 8500,
    priceUnit: "לערב",
    duration: 120,
    location: "כל הארץ",
    rating: 4.7,
    reviewCount: 89,
    tags: ["רוק אלטרנטיבי", "כיסויים וחומר מקורי", "הופעה אנרגטית"],
    eventTypes: ["private", "business"],
    audienceAges: ["teenagers", "adults"],
    targetAudience: ["חילוני", "מעורב"],
    minAudience: 50,
    maxAudience: 1000,
    priceRange: "7,500-12,000 ₪",
    features: ["הופעה חיה", "ציוד סאונד מקצועי", "תאורה"],
    technicalRequirements: ["במה", "חיבור חשמל", "מערכת הגברה"]
  },
  {
    id: "enhanced-catering-1",
    name: "קייטרינג גורמה - טעמי השף",
    description: "שירותי קייטרינג יוקרתיים עם תפריטים מגוונים המותאמים לכל סוג אירוע",
    provider: "טעמי השף - קייטרינג",
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
    category: "קייטרינג",
    subcategory: "שירותי הסעדה",
    price: 120,
    priceUnit: "לאדם",
    duration: 240,
    location: "תל אביב והסביבה",
    rating: 4.8,
    reviewCount: 156,
    tags: ["כשר למהדרין", "תפריט מגוון", "שירות מקצועי"],
    eventTypes: ["private", "business", "mixed"],
    audienceAges: ["children", "teenagers", "adults", "seniors"],
    targetAudience: ["חילוני", "דתי", "חרדי"],
    minAudience: 30,
    maxAudience: 500,
    priceRange: "80-200 ₪ לאדם",
    features: ["כשרות מהדרין", "שירות מלא", "עיצוב שולחנות"],
    technicalRequirements: ["מטבח או נקודת הכנה", "חיבור למים וחשמל"]
  }
];

// Export the expanded data from mockDataExpanded
export const unifiedServices = expandedMockSearchResults;
export const unifiedProviders = expandedMockProviders;

// Helper functions for finding services and providers
export const getServiceById = (id: string) => {
  return unifiedServices.find(service => service.id === id);
};

export const getProviderById = (id: string) => {
  return unifiedProviders.find(provider => provider.id === id);
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
  return unifiedServices.filter(service => 
    service.category.toLowerCase() === category.toLowerCase()
  );
};

// Updated recommendation algorithm that considers search data
export const getGuidedSearchRecommendations = (searchData: any) => {
  console.log('Search data for recommendations:', searchData);
  
  let filteredServices = [...allServices];
  
  // Filter by event type
  if (searchData.eventType) {
    filteredServices = filteredServices.filter(service => 
      service.eventTypes?.includes(searchData.eventType) || 
      service.eventTypes?.includes('mixed')
    );
  }
  
  // Filter by attendees count
  if (searchData.attendeesCount) {
    const attendeeCount = parseInt(searchData.attendeesCount);
    filteredServices = filteredServices.filter(service => 
      (!service.minAudience || attendeeCount >= service.minAudience) &&
      (!service.maxAudience || attendeeCount <= service.maxAudience)
    );
  }
  
  // Filter by budget if provided
  if (searchData.budget && (searchData.budget.min > 0 || searchData.budget.max > 0)) {
    filteredServices = filteredServices.filter(service => {
      const servicePrice = service.price;
      const budgetMin = searchData.budget.min || 0;
      const budgetMax = searchData.budget.max || Infinity;
      
      // For per-person pricing, estimate total cost based on attendees
      if (service.priceUnit === 'לאדם' && searchData.attendeesCount) {
        const totalPrice = servicePrice * parseInt(searchData.attendeesCount);
        return totalPrice >= budgetMin && totalPrice <= budgetMax;
      }
      
      return servicePrice >= budgetMin && servicePrice <= budgetMax;
    });
  }
  
  // Filter by event concept/category
  if (searchData.eventConcept || searchData.selectedCategory) {
    const conceptKeywords = [
      searchData.eventConcept,
      searchData.selectedCategory,
      searchData.selectedSubcategory
    ].filter(Boolean).map(k => k.toLowerCase());
    
    if (conceptKeywords.length > 0) {
      filteredServices = filteredServices.filter(service => {
        const serviceKeywords = [
          service.category,
          service.subcategory,
          service.name,
          ...(service.tags || [])
        ].join(' ').toLowerCase();
        
        return conceptKeywords.some(keyword => 
          serviceKeywords.includes(keyword)
        );
      });
    }
  }
  
  // Calculate relevance score
  const scoredServices = filteredServices.map(service => {
    let score = service.rating * 20; // Base score from rating
    
    // Boost score for exact event type match
    if (searchData.eventType && service.eventTypes?.includes(searchData.eventType)) {
      score += 15;
    }
    
    // Boost score for optimal audience size
    if (searchData.attendeesCount) {
      const attendeeCount = parseInt(searchData.attendeesCount);
      const optimalRange = service.maxAudience ? (service.minAudience + service.maxAudience) / 2 : attendeeCount;
      const sizeDiff = Math.abs(attendeeCount - optimalRange) / optimalRange;
      score += Math.max(0, 10 * (1 - sizeDiff));
    }
    
    // Boost score for budget fit
    if (searchData.budget && searchData.budget.max > 0) {
      const budgetMid = (searchData.budget.min + searchData.budget.max) / 2;
      let servicePrice = service.price;
      
      if (service.priceUnit === 'לאדם' && searchData.attendeesCount) {
        servicePrice *= parseInt(searchData.attendeesCount);
      }
      
      const priceDiff = Math.abs(servicePrice - budgetMid) / budgetMid;
      score += Math.max(0, 10 * (1 - priceDiff));
    }
    
    // Add review count bonus
    score += Math.min(service.reviewCount / 10, 10);
    
    return {
      ...service,
      relevanceScore: score
    };
  });
  
  // Sort by relevance score and return top results
  const sortedServices = scoredServices
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 6);
  
  console.log('Filtered and scored services:', sortedServices);
  
  return sortedServices.length > 0 ? sortedServices : allServices.slice(0, 3);
};
