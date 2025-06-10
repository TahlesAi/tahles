
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Provider {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  city: string;
  is_verified: boolean;
  rating: number;
  review_count: number;
  logo_url?: string;
  subcategory_ids?: string[];
}

interface Service {
  id: string;
  name: string;
  description: string;
  provider_id: string;
  base_price: number;
  price_unit: string;
  duration_minutes?: number;
  min_participants?: number;
  max_participants?: number;
  image_url?: string;
  target_age_groups?: string[];
  event_types?: string[];
  service_language?: string[];
  has_calendar_integration: boolean;
  subcategory_id?: string;
  provider?: Provider;
}

interface SearchFilters {
  eventTypes?: string[];
  ageGroups?: string[];
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  subcategory?: string;
  [key: string]: any;
}

export const useProviderData = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // טעינת ספקים עם תתי קטגוריות
      const { data: providersData, error: providersError } = await supabase
        .from('providers')
        .select(`
          *,
          provider_subcategories(subcategory_id)
        `)
        .eq('is_verified', true)
        .order('rating', { ascending: false });

      if (providersError) {
        throw providersError;
      }

      // טעינת שירותים עם פרטי הספק ותת קטגוריות
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select(`
          *,
          provider:providers(*),
          subcategory:subcategories(id, name)
        `)
        .eq('is_visible', true)
        .order('base_price', { ascending: false });

      if (servicesError) {
        throw servicesError;
      }

      // עיבוד נתוני הספקים
      const processedProviders = (providersData || []).map(provider => ({
        ...provider,
        subcategory_ids: provider.provider_subcategories?.map((ps: any) => ps.subcategory_id) || []
      }));

      setProviders(processedProviders);
      setServices(servicesData || []);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת הנתונים');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchServices = (query: string, filters: SearchFilters = {}) => {
    if (!query.trim() && !Object.keys(filters).length) {
      return services;
    }

    return services.filter(service => {
      const searchTerm = query.toLowerCase();
      const matchesQuery = !query.trim() || 
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm) ||
        service.provider?.name.toLowerCase().includes(searchTerm);

      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value || (Array.isArray(value) && !value.length)) return true;
        
        switch (key) {
          case 'eventTypes':
            return Array.isArray(value) && Array.isArray(service.event_types) &&
              service.event_types.some(type => value.includes(type));
          case 'ageGroups':
            return Array.isArray(value) && Array.isArray(service.target_age_groups) &&
              service.target_age_groups.some(age => value.includes(age));
          case 'minPrice':
            return typeof value === 'number' && service.base_price >= value;
          case 'maxPrice':
            return typeof value === 'number' && service.base_price <= value;
          case 'subcategory':
            return service.subcategory_id === value;
          default:
            return true;
        }
      });

      return matchesQuery && matchesFilters;
    });
  };

  const getProvidersBySubcategory = (subcategoryId: string) => {
    return providers.filter(provider => 
      provider.subcategory_ids?.includes(subcategoryId) ||
      services.some(service => 
        service.provider_id === provider.id && 
        service.subcategory_id === subcategoryId
      )
    );
  };

  return {
    providers,
    services,
    loading,
    error,
    searchServices,
    getProvidersBySubcategory,
    refetch: fetchData
  };
};
