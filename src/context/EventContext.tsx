
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Category, Subcategory, ServiceType, Provider, Service } from '@/lib/types/hierarchy';
import { hebrewHierarchy } from '@/lib/hebrewHierarchyData';

interface EventContextProps {
  categories: Category[];
  subcategories: Subcategory[];
  serviceTypes: ServiceType[];
  providers: Provider[];
  services: Service[];
  featuredServices: Service[];
  topProviders: Provider[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: Category | null;
  selectedSubcategory: Subcategory | null;
  selectedServiceType: ServiceType | null;
  setSelectedCategory: (category: Category | null) => void;
  setSelectedSubcategory: (subcategory: Subcategory | null) => void;
  setSelectedServiceType: (serviceType: ServiceType | null) => void;
  getProvidersByServiceType: (serviceTypeId: string) => Provider[];
  getProvidersBySubcategory: (subcategoryId: string) => Provider[];
  getServicesByProvider: (providerId: string) => Service[];
  getServicesBySubcategory: (services: Service[], subcategoryId: string) => Service[];
  getSubcategoriesByCategory: (categoryId: string) => Subcategory[];
  getServiceTypesBySubcategory: (subcategoryId: string) => ServiceType[];
  refreshData: () => Promise<void>;
  hebrewCategories: typeof hebrewHierarchy.categories;
  hebrewConcepts: typeof hebrewHierarchy.concepts;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [topProviders, setTopProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching data from Supabase...');

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');
        
      if (categoriesError) {
        console.error('Categories fetch error:', categoriesError);
        throw categoriesError;
      }
      
      console.log('Categories fetched:', categoriesData?.length || 0);
      setCategories(categoriesData || []);

      // Fetch subcategories
      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from('subcategories')
        .select('*')
        .order('name');
        
      if (subcategoriesError) {
        console.error('Subcategories fetch error:', subcategoriesError);
        throw subcategoriesError;
      }
      
      console.log('Subcategories fetched:', subcategoriesData?.length || 0);
      setSubcategories(subcategoriesData || []);

      // For now, we'll use empty service types since we don't have that table yet
      const placeholderServiceTypes: ServiceType[] = [];
      setServiceTypes(placeholderServiceTypes);

      // Fetch providers with enhanced data
      const { data: providersData, error: providersError } = await supabase
        .from('providers')
        .select(`
          *,
          provider_subcategories(subcategory_id)
        `)
        .order('name');
        
      if (providersError) {
        console.error('Providers fetch error:', providersError);
        throw providersError;
      }
      
      console.log('Providers fetched:', providersData?.length || 0);
      
      // Process and format providers data
      const formattedProviders = (providersData || []).map((provider: any) => {
        const subcategoryIds = provider.provider_subcategories?.map((ps: any) => ps.subcategory_id) || [];
        
        // Get category IDs from subcategories
        const categoryIds = subcategoryIds
          .map((subId: string) => {
            const subcategory = subcategoriesData?.find(sub => sub.id === subId);
            return subcategory?.category_id;
          })
          .filter(Boolean);
          
        return {
          ...provider,
          subcategory_ids: subcategoryIds,
          category_ids: [...new Set(categoryIds)], // Remove duplicates
          service_type_ids: [], // Placeholder until service_type_ids are implemented
          contact_email: provider.email || '',
          contact_phone: provider.phone || '',
          is_verified: provider.is_verified || false,
          rating: provider.rating || 0,
          review_count: provider.review_count || 0
        };
      });
      
      setProviders(formattedProviders);

      // Fetch services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('name');
        
      if (servicesError) {
        console.error('Services fetch error:', servicesError);
        throw servicesError;
      }
      
      console.log('Services fetched:', servicesData?.length || 0);
      
      // Convert database services to match our Service type
      const typedServices: Service[] = (servicesData || []).map((service: any) => {
        const provider = formattedProviders.find(p => p.id === service.provider_id);
        
        return {
          id: service.id,
          name: service.name,
          description: service.description || '',
          price: parseFloat(service.price_range?.replace(/[^\d.-]/g, '') || '0'),
          price_unit: service.price_unit || 'לאירוע',
          imageUrl: service.image_url || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
          additional_images: service.additional_images || [],
          provider_id: service.provider_id,
          category_id: service.category_id || (provider?.category_ids?.[0] || ''),
          subcategory_id: service.subcategory_id || (provider?.subcategory_ids?.[0] || ''),
          service_type_id: '',
          rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5
          review_count: Math.floor(Math.random() * 50) + 10, // Random review count
          tags: service.features || [],
          is_featured: Math.random() > 0.7, // 30% chance to be featured
          suitableFor: service.event_types || ['אירועים פרטיים'],
          audience_size: service.audience_size ? `${service.audience_size}` as any : "31-50",
          location: provider?.city || 'כל הארץ',
          videos: service.videos || []
        };
      });
      
      setServices(typedServices);

      // Set featured services
      const featured = typedServices.filter(service => service.is_featured).slice(0, 12);
      setFeaturedServices(featured);

      // Set top providers (highest rated)
      const topProvidersList = formattedProviders
        .filter(provider => provider.rating > 4.0)
        .sort((a: Provider, b: Provider) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 12);
        
      setTopProviders(topProvidersList);
      
      console.log('Data fetch completed successfully');
    } catch (error: any) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getSubcategoriesByCategory = (categoryId: string) => {
    return subcategories.filter(
      (subcategory) => subcategory.category_id === categoryId
    );
  };

  const getServiceTypesBySubcategory = (subcategoryId: string) => {
    return serviceTypes.filter(
      (serviceType) => serviceType.subcategory_id === subcategoryId
    );
  };

  const getProvidersByServiceType = (serviceTypeId: string) => {
    return providers.filter(
      (provider) => provider.service_type_ids.includes(serviceTypeId)
    );
  };

  const getProvidersBySubcategory = (subcategoryId: string) => {
    return providers.filter(
      (provider) => provider.subcategory_ids?.includes(subcategoryId)
    );
  };

  const getServicesByProvider = (providerId: string) => {
    return services.filter(
      (service) => service.provider_id === providerId
    );
  };

  const getServicesBySubcategory = (services: Service[], subcategoryId: string) => {
    return services.filter(
      (service) => service.subcategory_id === subcategoryId
    );
  };

  const refreshData = async () => {
    await fetchData();
  };

  return (
    <EventContext.Provider
      value={{
        categories,
        subcategories,
        serviceTypes,
        providers,
        services,
        featuredServices,
        topProviders,
        isLoading,
        error,
        selectedCategory,
        selectedSubcategory,
        selectedServiceType,
        setSelectedCategory,
        setSelectedSubcategory,
        setSelectedServiceType,
        getProvidersByServiceType,
        getProvidersBySubcategory,
        getServicesByProvider,
        getServicesBySubcategory,
        getSubcategoriesByCategory,
        getServiceTypesBySubcategory,
        refreshData,
        hebrewCategories: hebrewHierarchy.categories,
        hebrewConcepts: hebrewHierarchy.concepts
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
