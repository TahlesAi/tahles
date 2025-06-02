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

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const EventContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<UnifiedService[]>([]);
  const [providers, setProviders] = useState<ProviderProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setServices(consolidatedProducts);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProviders = useCallback(async () => {
    try {
      setLoading(true);
      
      // השתמש בנתונים המאוחדים החדשים
      const providers = consolidatedProviders.map(provider => ({
        ...provider,
        // וודא שכל הפרופרטיז הנדרשים קיימים
        businessName: provider.businessName || provider.name,
        city: provider.city || provider.address?.split(',')[0] || 'לא צוין',
        logo: provider.logo || provider.logo_url,
        contact_person: provider.contact_person || provider.contactPerson,
        contact_email: provider.contact_email || provider.email,
        contact_phone: provider.contact_phone || provider.phone,
        review_count: provider.review_count || provider.reviewCount,
        is_verified: provider.is_verified || provider.verified
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
