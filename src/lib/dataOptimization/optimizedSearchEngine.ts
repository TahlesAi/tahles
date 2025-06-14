
// מנוע חיפוש אופטימלי
import { ExtendedService } from '../hierarchyManagement';
import { performanceMonitor } from '@/utils/performanceMonitor';
import { availabilityManager } from '../availabilityManager';

export class OptimizedSearchEngine {
  private searchIndex = new Map<string, ExtendedService[]>();

  public async searchServices(
    services: ExtendedService[],
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
  ): Promise<ExtendedService[]> {
    performanceMonitor.start('OptimizedSearch', { 
      query, 
      filterCount: Object.keys(filters).length 
    });
    
    // Create search cache key
    const cacheKey = JSON.stringify({ query, filters });
    if (this.searchIndex.has(cacheKey)) {
      performanceMonitor.end('OptimizedSearch');
      return this.searchIndex.get(cacheKey)!;
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
    
    // Availability check
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
    this.searchIndex.set(cacheKey, sortedResults);
    
    // Clear cache periodically
    if (this.searchIndex.size > 100) {
      const entries = Array.from(this.searchIndex.entries());
      entries.slice(0, 50).forEach(([key]) => this.searchIndex.delete(key));
    }
    
    performanceMonitor.end('OptimizedSearch');
    return sortedResults;
  }

  public clearSearchCache(): void {
    this.searchIndex.clear();
  }
}

export const optimizedSearchEngine = new OptimizedSearchEngine();
