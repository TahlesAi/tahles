
// מנהל cache אופטימלי
import { ExtendedProvider, ExtendedService, CategoryHierarchy } from '../hierarchyManagement';

class CacheManager {
  private cache = {
    enhancedCategoryHierarchy: null as CategoryHierarchy[] | null,
    allEnhancedProviders: null as ExtendedProvider[] | null,
    allEnhancedServices: null as ExtendedService[] | null,
    lastBuildTime: 0,
    buildInProgress: false
  };

  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  public isCacheValid(): boolean {
    return this.cache.lastBuildTime > 0 && 
           (Date.now() - this.cache.lastBuildTime) < this.CACHE_TTL &&
           this.cache.enhancedCategoryHierarchy !== null;
  }

  public getCachedHierarchy(): CategoryHierarchy[] | null {
    return this.isCacheValid() ? this.cache.enhancedCategoryHierarchy : null;
  }

  public getCachedProviders(): ExtendedProvider[] | null {
    return this.isCacheValid() ? this.cache.allEnhancedProviders : null;
  }

  public getCachedServices(): ExtendedService[] | null {
    return this.isCacheValid() ? this.cache.allEnhancedServices : null;
  }

  public setCachedData(
    hierarchy: CategoryHierarchy[], 
    providers: ExtendedProvider[], 
    services: ExtendedService[]
  ): void {
    this.cache.enhancedCategoryHierarchy = hierarchy;
    this.cache.allEnhancedProviders = providers;
    this.cache.allEnhancedServices = services;
    this.cache.lastBuildTime = Date.now();
  }

  public isBuildInProgress(): boolean {
    return this.cache.buildInProgress;
  }

  public setBuildInProgress(inProgress: boolean): void {
    this.cache.buildInProgress = inProgress;
  }

  public clearCache(): void {
    this.cache.enhancedCategoryHierarchy = null;
    this.cache.allEnhancedProviders = null;
    this.cache.allEnhancedServices = null;
    this.cache.lastBuildTime = 0;
    this.cache.buildInProgress = false;
  }
}

export const cacheManager = new CacheManager();
