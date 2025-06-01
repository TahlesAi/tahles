
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
      console.log('Loading data from unified Hebrew hierarchy...');

      // המרת הקטגוריות העבריות לפורמט Category
      const hebrewCategoriesConverted: Category[] = hebrewHierarchy.categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        description: cat.description || '',
        icon: cat.icon || 'MapPin',
        image_url: `/assets/categories/${cat.id}.jpg`
      }));

      // המרת תתי הקטגוריות לפורמט Subcategory
      const hebrewSubcategoriesConverted: Subcategory[] = hebrewHierarchy.categories
        .flatMap(cat => cat.subcategories?.map(sub => ({
          id: sub.id,
          name: sub.name,
          description: sub.name,
          icon: 'Tag',
          category_id: cat.id
        })) || []);

      setCategories(hebrewCategoriesConverted);
      setSubcategories(hebrewSubcategoriesConverted);

      // שימוש בנתונים המאוחדים של שירותים וספקים
      console.log('Using unified services:', unifiedServices.length);
      console.log('Using unified providers:', unifiedProviders.length);

      // המרת שירותים מאוחדים
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

      // המרת ספקים מאוחדים
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
          subcategory_ids: [], // יימפה לפי הקטגוריות
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

      // הגדרת שירותים מומלצים
      const featured = typedServices.filter(service => service.is_featured).slice(0, 12);
      setFeaturedServices(featured);

      // הגדרת ספקים מובילים
      const topProvidersList = typedProviders
        .filter(provider => provider.rating > 4.0)
        .sort((a: Provider, b: Provider) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 12);
        
      setTopProviders(topProvidersList);
      
      console.log('Unified data loading completed successfully');
    } catch (error: any) {
      console.error('Error loading unified data:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // פונקציות עזר - משתמשות בנתונים המאוחדים
  const getSubcategoriesByCategory = (categoryId: string) => {
    const hebrewCategory = hebrewHierarchy.categories.find(cat => cat.id === categoryId);
    if (hebrewCategory?.subcategories) {
      return hebrewCategory.subcategories.map(sub => ({
        id: sub.id,
        name: sub.name,
        description: sub.name,
        icon: 'Tag',
        category_id: categoryId
      }));
    }
    return [];
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
