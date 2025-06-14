// נתונים מאוחדים ומורחבים עם אופטימיזציות ביצועים מתקדמות
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

// Memoization cache
const cache = {
  enhancedCategoryHierarchy: null as CategoryHierarchy[] | null,
  allEnhancedProviders: null as ExtendedProvider[] | null,
  allEnhancedServices: null as ExtendedService[] | null,
  lastBuildTime: 0,
  buildInProgress: false
};

// Cache TTL - 5 minutes
const CACHE_TTL = 5 * 60 * 1000;

// Helper function to check if cache is valid
const isCacheValid = () => {
  return cache.lastBuildTime > 0 && 
         (Date.now() - cache.lastBuildTime) < CACHE_TTL &&
         cache.enhancedCategoryHierarchy !== null;
};

// Optimized category hierarchy builder with chunking
const buildEnhancedCategoryHierarchy = async (): Promise<CategoryHierarchy[]> => {
  if (cache.enhancedCategoryHierarchy && isCacheValid()) {
    return cache.enhancedCategoryHierarchy;
  }

  if (cache.buildInProgress) {
    // Wait for existing build to complete
    while (cache.buildInProgress) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return cache.enhancedCategoryHierarchy || [];
  }

  cache.buildInProgress = true;
  performanceMonitor.start('OptimizedCategoryHierarchy-Build');
  
  try {
    const result: CategoryHierarchy[] = [];
    
    // Process categories in smaller chunks to avoid blocking
    for (let i = 0; i < officialCategoryHierarchy.length; i++) {
      const category = officialCategoryHierarchy[i];
      
      // Yield control between categories
      if (i > 0 && i % 2 === 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
      
      const subcategories = generateSubcategoriesForCategory(category.id, category.name);
      const processedSubcategories = [];
      
      // Process subcategories in smaller batches
      for (let j = 0; j < subcategories.length; j += 5) {
        const batch = subcategories.slice(j, j + 5);
        
        const batchResults = batch.map(subcategory => {
          // Reduced provider count for better performance
          const providers = generateSimulatedProviders(subcategory.id, subcategory.name, 20);
          const providersWithServices = providers.map(provider => ({
            ...provider,
            services: generateSimulatedServices(provider.id, provider.name, subcategory.name) // Fixed: removed 4th parameter
          }));
          
          return {
            ...subcategory,
            providers: providersWithServices,
            providersCount: providersWithServices.length,
            servicesCount: providersWithServices.reduce((sum, p) => sum + p.services.length, 0)
          };
        });
        
        processedSubcategories.push(...batchResults);
        
        // Yield control between batches
        if (j > 0) {
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      }
      
      result.push({
        ...category,
        subcategories: processedSubcategories
      });
    }
    
    cache.enhancedCategoryHierarchy = result;
    cache.lastBuildTime = Date.now();
    
    performanceMonitor.end('OptimizedCategoryHierarchy-Build');
    return result;
  } finally {
    cache.buildInProgress = false;
  }
};

// Lazy loading for providers
const buildAllEnhancedProviders = async (): Promise<ExtendedProvider[]> => {
  if (cache.allEnhancedProviders && isCacheValid()) {
    return cache.allEnhancedProviders;
  }

  performanceMonitor.start('OptimizedProviders-Build');
  
  const hierarchy = await buildEnhancedCategoryHierarchy();
  
  const result = hierarchy.reduce((allProviders, category) => {
    const categoryProviders = category.subcategories.reduce((catProviders, subcategory) => {
      return [...catProviders, ...subcategory.providers];
    }, [] as ExtendedProvider[]);
    
    return [...allProviders, ...categoryProviders];
  }, [] as ExtendedProvider[]);
  
  // Optimized validation - only validate new data
  if (!cache.allEnhancedProviders) {
    const { providers: fixedProviders } = hierarchyValidator.validateAndFixAll(result, []);
    cache.allEnhancedProviders = fixedProviders;
  } else {
    cache.allEnhancedProviders = result;
  }
  
  performanceMonitor.end('OptimizedProviders-Build');
  return cache.allEnhancedProviders;
};

// Optimized services builder with indexing
const buildAllEnhancedServices = async (): Promise<ExtendedService[]> => {
  if (cache.allEnhancedServices && isCacheValid()) {
    return cache.allEnhancedServices;
  }

  performanceMonitor.start('OptimizedServices-Build');
  
  const providers = await buildAllEnhancedProviders();
  
  const result = providers.reduce((allServices, provider) => {
    return [...allServices, ...provider.services];
  }, [] as ExtendedService[]);
  
  // Optimized validation and availability registration
  if (!cache.allEnhancedServices) {
    const { services: fixedServices } = hierarchyValidator.validateAndFixAll([], result);
    
    // Batch register services for better performance
    const registrationPromises = fixedServices.map(service => 
      availabilityManager.registerService(service.id, service.providerId, {
        isAvailable: service.available,
        hasCalendar: true,
        maxConcurrentBookings: service.maxConcurrentBookings || 1
      })
    );
    
    // Register in batches to avoid blocking
    for (let i = 0; i < registrationPromises.length; i += 10) {
      await Promise.all(registrationPromises.slice(i, i + 10));
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
    
    cache.allEnhancedServices = fixedServices;
  } else {
    cache.allEnhancedServices = result;
  }
  
  performanceMonitor.end('OptimizedServices-Build');
  return cache.allEnhancedServices;
};

// Exported lazy-loaded getters
export const getEnhancedCategoryHierarchy = () => buildEnhancedCategoryHierarchy();
export const getAllEnhancedProviders = () => buildAllEnhancedProviders();
export const getAllEnhancedServices = () => buildAllEnhancedServices();

// Immediate exports for backward compatibility (but they'll be empty until first call)
export const enhancedCategoryHierarchy: CategoryHierarchy[] = [];
export const allEnhancedProviders: ExtendedProvider[] = [];
export const allEnhancedServices: ExtendedService[] = [];

// Initialize on first import but don't block
let initializationPromise: Promise<void> | null = null;

const initializeData = async () => {
  try {
    await buildEnhancedCategoryHierarchy();
    await buildAllEnhancedProviders();
    await buildAllEnhancedServices();
    
    // Update the exported arrays
    const hierarchy = await getEnhancedCategoryHierarchy();
    const providers = await getAllEnhancedProviders();
    const services = await getAllEnhancedServices();
    
    enhancedCategoryHierarchy.splice(0, enhancedCategoryHierarchy.length, ...hierarchy);
    allEnhancedProviders.splice(0, allEnhancedProviders.length, ...providers);
    allEnhancedServices.splice(0, allEnhancedServices.length, ...services);
  } catch (error) {
    console.error('Failed to initialize enhanced data:', error);
  }
};

// Start initialization but don't await it
if (typeof window !== 'undefined') {
  initializationPromise = initializeData();
}

// Optimized search with indexing
const searchIndex = new Map<string, ExtendedService[]>();

export const searchServicesWithAvailability = async (
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
): Promise<ExtendedService[]> => {
  performanceMonitor.start('OptimizedSearch', { 
    query, 
    filterCount: Object.keys(filters).length 
  });
  
  // Wait for initialization if needed
  if (initializationPromise) {
    await initializationPromise;
  }
  
  const services = await getAllEnhancedServices();
  
  // Create search cache key
  const cacheKey = JSON.stringify({ query, filters });
  if (searchIndex.has(cacheKey)) {
    performanceMonitor.end('OptimizedSearch');
    return searchIndex.get(cacheKey)!;
  }
  
  let results = [...services];
  
  // Fast filters first (most selective)
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
  
  // Basic availability filter
  results = results.filter(service => service.available);
  
  // Availability check (more expensive)
  if (filters.availableOnly || filters.onlyAvailable) {
    results = availabilityManager.filterAvailableServices(results);
  }
  
  // Text search (most expensive, do last)
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
      
      return searchWords.every(word => searchableText.includes(word));
    });
  }
  
  // Concept filter
  if (filters.conceptTags && filters.conceptTags.length > 0) {
    results = results.filter(service => {
      if (!service.conceptTags || service.conceptTags.length === 0) return false;
      
      return service.conceptTags.some(conceptTag => 
        filters.conceptTags!.some(filterTag => 
          conceptTag.toLowerCase().includes(filterTag.toLowerCase()) ||
          filterTag.toLowerCase().includes(conceptTag.toLowerCase())
        )
      );
    });
  }
  
  // Fast sorting with cached scores
  const sortedResults = results.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    
    if (a.featured) scoreA += 10;
    if (b.featured) scoreB += 10;
    
    scoreA += a.rating * 2;
    scoreB += b.rating * 2;
    
    if (availabilityManager.isServiceAvailable(a.id, a.providerId)) scoreA += 5;
    if (availabilityManager.isServiceAvailable(b.id, b.providerId)) scoreB += 5;
    
    return scoreB - scoreA;
  });
  
  // Cache the results
  searchIndex.set(cacheKey, sortedResults);
  
  // Clear cache periodically
  if (searchIndex.size > 100) {
    const entries = Array.from(searchIndex.entries());
    entries.slice(0, 50).forEach(([key]) => searchIndex.delete(key));
  }
  
  performanceMonitor.end('OptimizedSearch');
  return sortedResults;
};

// Fast lookup functions with caching
const providerCache = new Map<string, ExtendedProvider>();
const serviceCache = new Map<string, ExtendedService>();

export const getProviderById = async (providerId: string): Promise<ExtendedProvider | undefined> => {
  if (providerCache.has(providerId)) {
    return providerCache.get(providerId);
  }
  
  const providers = await getAllEnhancedProviders();
  const provider = providers.find(p => p.id === providerId);
  
  if (provider) {
    providerCache.set(providerId, provider);
  }
  
  return provider;
};

export const getServiceById = async (serviceId: string): Promise<ExtendedService | undefined> => {
  if (serviceCache.has(serviceId)) {
    return serviceCache.get(serviceId);
  }
  
  const services = await getAllEnhancedServices();
  const service = services.find(s => s.id === serviceId);
  
  if (service) {
    serviceCache.set(serviceId, service);
  }
  
  return service;
};

// Fast category-based lookups
export const getServicesByCategory = async (categoryId: string): Promise<ExtendedService[]> => {
  const services = await getAllEnhancedServices();
  return services.filter(service => service.categoryId === categoryId);
};

export const getServicesBySubcategory = async (subcategoryId: string): Promise<ExtendedService[]> => {
  const services = await getAllEnhancedServices();
  return services.filter(service => service.subcategoryId === subcategoryId);
};

// Optimized availability functions
export const checkProviderAvailability = (providerId: string, date: string, time: string): boolean => {
  return availabilityManager.isServiceAvailable('', providerId);
};

export const getAvailableProviders = async (date: string, time: string): Promise<ExtendedProvider[]> => {
  const providers = await getAllEnhancedProviders();
  return providers.filter(provider => {
    return provider.services.some(service => 
      availabilityManager.isServiceAvailable(service.id, provider.id)
    );
  });
};

// Optimized diagnostic function
export const diagnoseDataIntegrity = async () => {
  performanceMonitor.start('OptimizedDataIntegrityDiagnosis');
  
  const [providers, services] = await Promise.all([
    getAllEnhancedProviders(),
    getAllEnhancedServices()
  ]);
  
  const orphanedData = findOrphanedData(providers, services);
  const availabilityStats = availabilityManager.getAvailabilityStats();
  
  const stats = {
    totalCategories: (await getEnhancedCategoryHierarchy()).length,
    totalSubcategories: (await getEnhancedCategoryHierarchy()).reduce((sum, cat) => sum + cat.subcategories.length, 0),
    totalProviders: providers.length,
    totalServices: services.length,
    simulatedProviders: providers.filter(p => p.isSimulated).length,
    simulatedServices: services.filter(s => s.isSimulated).length,
    providersWithCalendar: providers.filter(p => p.hasAvailableCalendar).length,
    availableServices: services.filter(s => s.available).length,
    orphanedData,
    availabilityStats
  };
  
  performanceMonitor.end('OptimizedDataIntegrityDiagnosis');
  
  return {
    isHealthy: orphanedData.totalOrphaned === 0,
    stats,
    recommendations: generateRecommendations(stats)
  };
};

// Helper functions remain the same
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

// Create snapshot function
export const createCurrentDataSnapshot = async () => {
  const hierarchy = await getEnhancedCategoryHierarchy();
  const changes = [
    'אופטימיזציית ביצועים עם lazy loading',
    'הוספת memoization ו-caching',
    'פיצול עיבוד ל-chunks קטנים יותר',
    'שיפור ביצועי חיפוש עם indexing',
    'הפחתת כמות הנתונים הנוצרים בזמן אמת'
  ];
  
  return createDataSnapshot(hierarchy, changes);
};

// Legacy compatibility exports (async versions)
export const consolidatedProviders = async () => {
  const providers = await getAllEnhancedProviders();
  return providers.map(provider => ({
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
};

export const consolidatedProducts = async () => {
  const services = await getAllEnhancedServices();
  return services.map(service => ({
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
};

export const consolidatedCalendars = async () => {
  const providers = await getAllEnhancedProviders();
  return providers
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
};
