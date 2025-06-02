
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { consolidatedProducts, consolidatedProviders } from '@/lib/consolidatedMockData';
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
      
      // המר את הנתונים לפורמט הנדרש
      const services = consolidatedProducts.map(product => ({
        ...product,
        provider: consolidatedProviders.find(p => p.id === product.providerId)?.name || 'לא ידוע',
        category: product.categoryId,
        subcategory: product.subcategoryId,
        location: consolidatedProviders.find(p => p.id === product.providerId)?.city || 'לא צוין'
      }));

      const providers = consolidatedProviders.map(provider => ({
        ...provider,
        gallery: provider.gallery || []
      }));

      return {
        categories: [],
        subcategories: [],
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
      const mappedServices = consolidatedProducts.map(product => ({
        ...product,
        provider: consolidatedProviders.find(p => p.id === product.providerId)?.name || 'לא ידוע',
        category: product.categoryId,
        subcategory: product.subcategoryId,
        location: consolidatedProviders.find(p => p.id === product.providerId)?.city || 'לא צוין'
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
      
      const providers = consolidatedProviders.map(provider => ({
        ...provider,
        businessName: provider.businessName || provider.name,
        city: provider.city || provider.address?.split(',')[0] || 'לא צוין',
        logo: provider.logo || provider.logo_url,
        contact_person: provider.contact_person || provider.contactPerson,
        contact_email: provider.contact_email || provider.email,
        contact_phone: provider.contact_phone || provider.phone,
        review_count: provider.review_count || provider.reviewCount,
        is_verified: provider.is_verified || provider.verified,
        gallery: provider.gallery || []
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
