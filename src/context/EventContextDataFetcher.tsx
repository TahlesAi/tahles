
// עדכון לשימוש בנתונים המורחבים
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { 
  enhancedCategoryHierarchy,
  allEnhancedProviders,
  allEnhancedServices 
} from '@/lib/enhancedConsolidatedData';
import { ProviderProfile, UnifiedService } from '@/types';

interface EventContextProps {
  services: UnifiedService[];
  providers: ProviderProfile[];
  loading: boolean;
  fetchServices: () => Promise<void>;
  fetchProviders: () => Promise<void>;
}

export const useEventDataFetcher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // המרת נתונים מורחבים לפורמט הנדרש
      const services = allEnhancedServices.map(service => ({
        ...service,
        provider: allEnhancedProviders.find(p => p.id === service.providerId)?.name || 'לא ידוע',
        category: service.categoryId,
        subcategory: service.subcategoryId,
        location: allEnhancedProviders.find(p => p.id === service.providerId)?.city || 'לא צוין'
      }));

      const providers = allEnhancedProviders.map(provider => ({
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
        // תאימות עם Services מורחבים
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

      const categories = enhancedCategoryHierarchy.map(cat => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        subcategories: cat.subcategories.map(sub => ({
          id: sub.id,
          name: sub.name,
          categoryId: sub.categoryId,
          category_id: sub.categoryId, // Required field
          description: sub.description
        }))
      }));

      const subcategories = enhancedCategoryHierarchy.reduce((all, cat) => [
        ...all, 
        ...cat.subcategories.map(sub => ({
          id: sub.id,
          name: sub.name,
          category_id: sub.categoryId,
          categoryId: sub.categoryId, // Compatibility field
          description: sub.description
        }))
      ], [] as any[]);

      return {
        categories,
        subcategories,
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

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const EventContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<UnifiedService[]>([]);
  const [providers, setProviders] = useState<ProviderProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const mappedServices = allEnhancedServices.map(service => ({
        ...service,
        provider: allEnhancedProviders.find(p => p.id === service.providerId)?.name || 'לא ידוע',
        category: service.categoryId,
        subcategory: service.subcategoryId,
        location: allEnhancedProviders.find(p => p.id === service.providerId)?.city || 'לא צוין'
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
      
      const providers = allEnhancedProviders.map(provider => ({
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
        // המרת Services עם כל השדות הנדרשים
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
    fetchServices();
    fetchProviders();
  }, [fetchServices, fetchProviders]);

  const value: EventContextProps = {
    services,
    providers,
    loading,
    fetchServices,
    fetchProviders,
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = (): EventContextProps => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within a EventContextProvider');
  }
  return context;
};
