
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Category, Subcategory, ServiceType, Provider, Service } from '@/lib/types/hierarchy';
import { hebrewHierarchy } from '@/lib/hebrewHierarchyData';

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

      // Instead of fetching service_types (which might not exist yet), we'll use placeholder data
      // We'll remove this once the new table is created in the database
      // Note: Replace this with actual fetch from 'service_types' table once it's created
      const placeholderServiceTypes: ServiceType[] = [];
      setServiceTypes(placeholderServiceTypes);

      // Fetch providers
      const { data: providersData, error: providersError } = await supabase
        .from('providers')
        .select('*, provider_categories(category_id), provider_subcategories(subcategory_id)')
        .order('name');
        
      if (providersError) throw providersError;
      
      // Process and format providers data
      const formattedProviders = providersData.map((provider: any) => ({
        ...provider,
        category_ids: provider.provider_categories?.map((pc: any) => pc.category_id) || [],
        subcategory_ids: provider.provider_subcategories?.map((ps: any) => ps.subcategory_id) || [],
        service_type_ids: [] // Placeholder until service_type_ids are implemented
      }));
      
      setProviders(formattedProviders);

      // Fetch services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('name');
        
      if (servicesError) throw servicesError;
      
      // Convert database services to match our Service type
      const typedServices: Service[] = (servicesData || []).map((service: any) => ({
        id: service.id,
        name: service.name,
        description: service.description || '',
        price: parseFloat(service.price_range?.replace(/[^\d.-]/g, '') || '0'),
        price_unit: service.price_unit,
        imageUrl: service.image_url || '',
        additional_images: service.additional_images || [],
        provider_id: service.provider_id,
        category_id: '', // These will be populated based on provider's data
        subcategory_id: '',
        service_type_id: '',
        rating: 0, // Placeholder
        review_count: 0, // Placeholder
        tags: service.features || [],
        is_featured: false,
        suitableFor: service.event_types || [],
        audience_size: service.audience_size ? `${service.audience_size}` as any : "0-30",
        location: ''
      }));
      
      setServices(typedServices);

      // Set featured services (most viewed/booked)
      const featuredServiceIds = typedServices
        .filter((_, index) => index < 12) // Take first 12 services as featured for now
        .map(service => service.id);
        
      setFeaturedServices(typedServices.filter(service => featuredServiceIds.includes(service.id)));

      // Set top providers (highest rated)
      const topProviderIds = formattedProviders
        .sort((a: Provider, b: Provider) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 12)
        .map((provider: Provider) => provider.id);
        
      setTopProviders(formattedProviders.filter((provider: Provider) => 
        topProviderIds.includes(provider.id)
      ));
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
        refreshData,
        hebrewCategories: hebrewHierarchy.categories,
        hebrewConcepts: hebrewHierarchy.concepts
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
