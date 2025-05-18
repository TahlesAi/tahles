
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Category, Subcategory, ServiceType, Provider, Service } from '@/lib/types/hierarchy';

interface EventContextProps {
  categories: Category[];
  subcategories: Subcategory[];
  serviceTypes: ServiceType[];
  providers: Provider[];
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
  getServicesByProvider: (providerId: string) => Service[];
  getSubcategoriesByCategory: (categoryId: string) => Subcategory[];
  getServiceTypesBySubcategory: (subcategoryId: string) => ServiceType[];
  refreshData: () => Promise<void>;
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
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');
        
      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);

      // Fetch subcategories
      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from('subcategories')
        .select('*')
        .order('name');
        
      if (subcategoriesError) throw subcategoriesError;
      setSubcategories(subcategoriesData || []);

      // Fetch service types
      const { data: serviceTypesData, error: serviceTypesError } = await supabase
        .from('service_types')
        .select('*')
        .order('name');
        
      if (serviceTypesError) throw serviceTypesError;
      setServiceTypes(serviceTypesData || []);

      // Fetch providers
      const { data: providersData, error: providersError } = await supabase
        .from('providers')
        .select('*, provider_categories(category_id), provider_subcategories(subcategory_id), provider_service_types(service_type_id)')
        .order('name');
        
      if (providersError) throw providersError;
      
      // Process and format providers data
      const formattedProviders = providersData.map((provider: any) => ({
        ...provider,
        category_ids: provider.provider_categories?.map((pc: any) => pc.category_id) || [],
        subcategory_ids: provider.provider_subcategories?.map((ps: any) => ps.subcategory_id) || [],
        service_type_ids: provider.provider_service_types?.map((pst: any) => pst.service_type_id) || []
      }));
      
      setProviders(formattedProviders);

      // Fetch services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('name');
        
      if (servicesError) throw servicesError;
      setServices(servicesData || []);

      // Set featured services (most viewed/booked)
      const { data: featuredData, error: featuredError } = await supabase
        .from('services')
        .select('*')
        .eq('is_featured', true)
        .limit(12);
        
      if (featuredError) throw featuredError;
      setFeaturedServices(featuredData || []);

      // Set top providers (highest rated)
      const { data: topProvidersData, error: topProvidersError } = await supabase
        .from('providers')
        .select('*')
        .order('rating', { ascending: false })
        .limit(12);
        
      if (topProvidersError) throw topProvidersError;
      setTopProviders(topProvidersData || []);
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

  const getServicesByProvider = (providerId: string) => {
    return services.filter(
      (service) => service.provider_id === providerId
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
        getServicesByProvider,
        getSubcategoriesByCategory,
        getServiceTypesBySubcategory,
        refreshData
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
