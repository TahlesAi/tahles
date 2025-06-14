import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { 
  getEnhancedCategoryHierarchy,
  getAllEnhancedProviders,
  getAllEnhancedServices 
} from '@/lib/enhancedConsolidatedDataOptimized';
import { ProviderProfile, UnifiedService } from '@/types';

interface OptimizedEventContextProps {
  services: UnifiedService[];
  providers: ProviderProfile[];
  loading: boolean;
  fetchServices: () => Promise<void>;
  fetchProviders: () => Promise<void>;
  isInitialized: boolean;
}

// Custom hook for data fetching
export const useOptimizedEventDataFetcher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [enhancedServices, enhancedProviders, categoryHierarchy] = await Promise.all([
        getAllEnhancedServices(),
        getAllEnhancedProviders(),
        getEnhancedCategoryHierarchy()
      ]);
      
      // Convert to required format
      const services = enhancedServices.map(service => ({
        ...service,
        provider: enhancedProviders.find(p => p.id === service.providerId)?.name || 'לא ידוע',
        category: service.categoryId,
        subcategory: service.subcategoryId,
        location: enhancedProviders.find(p => p.id === service.providerId)?.city || 'לא צוין'
      }));

      const providers = enhancedProviders.map(provider => ({
        ...provider,
        businessName: provider.businessName || provider.name,
        contactPerson: provider.contactPerson,
        email: provider.email,
        phone: provider.phone,
        categories: provider.subcategoryIds || provider.categoryIds || [],
        gallery: [],
        rating: provider.rating || 0,
        reviewCount: provider.reviewCount || 0,
        featured: provider.featured || false,
        verified: provider.verified || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        services: provider.services?.map(service => ({
          ...service,
          provider_id: service.providerId,
          category_id: service.categoryId,
          subcategory_id: service.subcategoryId,
          service_type_id: 'default',
          price: service.price,
          price_unit: service.priceUnit,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })) || []
      }));
      
      return {
        categories: categoryHierarchy.map(cat => ({
          id: cat.id,
          name: cat.name,
          description: cat.description,
          icon: cat.icon,
          subcategories: cat.subcategories.map(sub => ({
            id: sub.id,
            name: sub.name,
            categoryId: sub.categoryId,
            category_id: sub.categoryId,
            description: sub.description
          }))
        })),
        subcategories: categoryHierarchy.reduce((all, cat) => [
          ...all, 
          ...cat.subcategories.map(sub => ({
            id: sub.id,
            name: sub.name,
            category_id: sub.categoryId,
            categoryId: sub.categoryId,
            description: sub.description
          }))
        ], [] as any[]),
        services,
        providers,
        featuredServices: services.filter(s => s.featured),
        topProviders: providers.filter(p => p.featured)
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה לא ידועה');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, isLoading, error };
};

// Context and provider remain the same structure but with optimized data fetching
const OptimizedEventContext = createContext<OptimizedEventContextProps | undefined>(undefined);

export const OptimizedEventContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<UnifiedService[]>([]);
  const [providers, setProviders] = useState<ProviderProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const [enhancedServices, enhancedProviders] = await Promise.all([
        getAllEnhancedServices(),
        getAllEnhancedProviders()
      ]);
      
      const mappedServices = enhancedServices.map(service => ({
        ...service,
        provider: enhancedProviders.find(p => p.id === service.providerId)?.name || 'לא ידוע',
        category: service.categoryId,
        subcategory: service.subcategoryId,
        location: enhancedProviders.find(p => p.id === service.providerId)?.city || 'לא צוין'
      }));
      setServices(mappedServices);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProviders = useCallback(async () => {
    try {
      setLoading(true);
      const enhancedProviders = await getAllEnhancedProviders();
      
      const providers = enhancedProviders.map(provider => ({
        ...provider,
        businessName: provider.businessName || provider.name,
        contactPerson: provider.contactPerson,
        email: provider.email,
        phone: provider.phone,
        categories: provider.subcategoryIds || provider.categoryIds || [],
        gallery: [],
        rating: provider.rating || 0,
        reviewCount: provider.reviewCount || 0,
        featured: provider.featured || false,
        verified: provider.verified || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        services: provider.services?.map(service => ({
          ...service,
          provider_id: service.providerId,
          category_id: service.categoryId,
          subcategory_id: service.subcategoryId,
          service_type_id: 'default',
          price: service.price,
          price_unit: service.priceUnit,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })) || []
      }));
      
      setProviders(providers);
    } catch (error) {
      console.error('Error fetching providers:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      try {
        await Promise.all([fetchServices(), fetchProviders()]);
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize data:', error);
      }
    };
    
    initializeData();
  }, [fetchServices, fetchProviders]);

  const value: OptimizedEventContextProps = {
    services,
    providers,
    loading,
    fetchServices,
    fetchProviders,
    isInitialized,
  };

  return (
    <OptimizedEventContext.Provider value={value}>
      {children}
    </OptimizedEventContext.Provider>
  );
};

export const useOptimizedEventContext = (): OptimizedEventContextProps => {
  const context = useContext(OptimizedEventContext);
  if (!context) {
    throw new Error('useOptimizedEventContext must be used within a OptimizedEventContextProvider');
  }
  return context;
};
