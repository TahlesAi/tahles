
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Category, Subcategory, ServiceType, Provider, Service } from '@/lib/types/hierarchy';
import { hebrewHierarchy } from '@/lib/hebrewHierarchyData';
import { unifiedServices, unifiedProviders } from '@/lib/unifiedMockData';

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
      console.log('Loading data from Supabase and unified sources...');

      // Start with unified data as primary source
      console.log('Using unified services:', unifiedServices.length);
      console.log('Using unified providers:', unifiedProviders.length);

      // Convert unified services to match Service type
      const typedServices: Service[] = unifiedServices.map((service: any) => {
        const provider = unifiedProviders.find(p => p.id === service.providerId);
        
        return {
          id: service.id,
          name: service.name,
          description: service.description || '',
          price: service.price,
          price_unit: service.priceUnit || 'לאירוע',
          imageUrl: service.imageUrl,
          additional_images: service.additionalImages || [],
          provider_id: service.providerId || '',
          category_id: service.category || '',
          subcategory_id: service.subcategory || '',
          service_type_id: '',
          rating: service.rating,
          review_count: service.reviewCount,
          tags: service.tags || [],
          is_featured: service.featured || false,
          suitableFor: service.suitableFor || [],
          audience_size: "31-50" as any,
          location: service.location || provider?.city || 'כל הארץ',
          videos: service.videos || []
        };
      });

      // Convert unified providers to match Provider type
      const typedProviders: Provider[] = unifiedProviders.map((provider: any) => {
        return {
          id: provider.id,
          name: provider.businessName,
          description: provider.description,
          city: provider.city || '',
          contact_phone: provider.phone || '',
          contact_email: provider.email || '',
          contact_person: provider.contactPerson || '',
          address: provider.address || '',
          website: provider.website || '',
          rating: provider.rating || 0,
          review_count: provider.reviewCount || 0,
          is_verified: provider.verified || false,
          logo_url: provider.logo || '',
          subcategory_ids: [], // Will be mapped based on categories
          category_ids: provider.categories || [],
          service_type_ids: [],
          services: [],
          serviceAreas: [provider.city || 'כל הארץ'],
          experience: 'מעל 5 שנות ניסיון בתחום',
          specialties: ['מקצועיות גבוהה', 'שירות אישי', 'אמינות'],
          testimonials: [],
          socialLinks: {},
          mediaLinks: [],
          clientRecommendations: []
        };
      });

      setServices(typedServices);
      setProviders(typedProviders);

      // Try to fetch additional data from Supabase
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
          
        if (!categoriesError && categoriesData) {
          console.log('Categories fetched from Supabase:', categoriesData.length);
          setCategories(categoriesData);
        }

        // Fetch subcategories
        const { data: subcategoriesData, error: subcategoriesError } = await supabase
          .from('subcategories')
          .select('*')
          .order('name');
          
        if (!subcategoriesError && subcategoriesData) {
          console.log('Subcategories fetched from Supabase:', subcategoriesData.length);
          setSubcategories(subcategoriesData);
        }

        // Fetch additional services from Supabase
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .order('name');
          
        if (!servicesError && servicesData) {
          console.log('Additional services fetched from Supabase:', servicesData.length);
          
          // Merge with unified services, avoiding duplicates
          const additionalServices = servicesData
            .filter((dbService: any) => !typedServices.some(us => us.id === dbService.id))
            .map((service: any) => ({
              id: service.id,
              name: service.name,
              description: service.description || '',
              price: parseFloat(service.price_range?.replace(/[^\d.-]/g, '') || '0'),
              price_unit: service.price_unit || 'לאירוע',
              imageUrl: service.image_url || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
              additional_images: service.additional_images || [],
              provider_id: service.provider_id,
              category_id: service.category_id || '',
              subcategory_id: service.subcategory_id || '',
              service_type_id: '',
              rating: 4.5 + Math.random() * 0.5,
              review_count: Math.floor(Math.random() * 50) + 10,
              tags: service.features || [],
              is_featured: Math.random() > 0.7,
              suitableFor: service.event_types || ['אירועים פרטיים'],
              audience_size: service.audience_size ? `${service.audience_size}` as any : "31-50",
              location: 'כל הארץ',
              videos: service.videos || []
            }));

          setServices([...typedServices, ...additionalServices]);
        }

        // Fetch additional providers from Supabase
        const { data: providersData, error: providersError } = await supabase
          .from('providers')
          .select(`
            *,
            provider_subcategories(subcategory_id)
          `)
          .order('name');
          
        if (!providersError && providersData) {
          console.log('Additional providers fetched from Supabase:', providersData.length);
          
          // Merge with unified providers, avoiding duplicates
          const additionalProviders = providersData
            .filter((dbProvider: any) => !typedProviders.some(up => up.id === dbProvider.id))
            .map((provider: any) => {
              const subcategoryIds = provider.provider_subcategories?.map((ps: any) => ps.subcategory_id) || [];
              
              return {
                id: provider.id,
                name: provider.name,
                description: provider.description || '',
                city: provider.city || '',
                contact_phone: provider.phone || '',
                contact_email: provider.email || '',
                contact_person: provider.contact_person || '',
                address: provider.address || '',
                website: provider.website || '',
                rating: provider.rating || 0,
                review_count: provider.review_count || 0,
                is_verified: provider.is_verified || false,
                logo_url: provider.logo_url || '',
                subcategory_ids: subcategoryIds,
                category_ids: [],
                service_type_ids: [],
                services: [],
                serviceAreas: [provider.city || 'כל הארץ'],
                experience: 'מעל 5 שנות ניסיון בתחום',
                specialties: ['מקצועיות גבוהה', 'שירות אישי', 'אמינות'],
                testimonials: [],
                socialLinks: {},
                mediaLinks: [],
                clientRecommendations: []
              };
            });

          setProviders([...typedProviders, ...additionalProviders]);
        }

      } catch (supabaseError) {
        console.warn('Supabase fetch failed, using unified data only:', supabaseError);
      }

      // Set featured services
      const allServices = services.length > 0 ? services : typedServices;
      const featured = allServices.filter(service => service.is_featured).slice(0, 12);
      setFeaturedServices(featured);

      // Set top providers
      const allProviders = providers.length > 0 ? providers : typedProviders;
      const topProvidersList = allProviders
        .filter(provider => provider.rating > 4.0)
        .sort((a: Provider, b: Provider) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 12);
        
      setTopProviders(topProvidersList);
      
      console.log('Data loading completed successfully');
    } catch (error: any) {
      console.error('Error loading data:', error);
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
