
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Category, Subcategory, ServiceType, ProviderProfile, SearchResultService } from '@/types';
import { hebrewHierarchy } from '@/lib/hebrewHierarchyData';
import { unifiedServices, unifiedProviders } from '@/lib/unifiedMockData';

interface EventContextProps {
  categories: Category[];
  subcategories: Subcategory[];
  serviceTypes: ServiceType[];
  providers: ProviderProfile[];
  services: SearchResultService[];
  featuredServices: SearchResultService[];
  topProviders: ProviderProfile[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: Category | null;
  selectedSubcategory: Subcategory | null;
  selectedServiceType: ServiceType | null;
  setSelectedCategory: (category: Category | null) => void;
  setSelectedSubcategory: (subcategory: Subcategory | null) => void;
  setSelectedServiceType: (serviceType: ServiceType | null) => void;
  getProvidersByServiceType: (serviceTypeId: string) => ProviderProfile[];
  getProvidersBySubcategory: (subcategoryId: string) => ProviderProfile[];
  getServicesByProvider: (providerId: string) => SearchResultService[];
  getServicesBySubcategory: (services: SearchResultService[], subcategoryId: string) => SearchResultService[];
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
  const [providers, setProviders] = useState<ProviderProfile[]>([]);
  const [services, setServices] = useState<SearchResultService[]>([]);
  const [featuredServices, setFeaturedServices] = useState<SearchResultService[]>([]);
  const [topProviders, setTopProviders] = useState<ProviderProfile[]>([]);
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
      const typedServices: SearchResultService[] = unifiedServices.map((service: any) => {
        const provider = unifiedProviders.find(p => p.id === service.providerId);
        
        return {
          id: service.id,
          name: service.name,
          provider: service.provider,
          providerId: service.providerId || '',
          description: service.description || '',
          price: service.price,
          priceUnit: service.priceUnit || 'לאירוע',
          rating: service.rating,
          reviewCount: service.reviewCount,
          imageUrl: service.imageUrl,
          category: service.category || '',
          subcategory: service.subcategory || '',
          location: service.location || provider?.city || 'כל הארץ',
          suitableFor: service.suitableFor || [],
          featured: service.featured || false,
          additionalImages: service.additionalImages || [],
          videos: service.videos || [],
          audienceSize: service.audienceSize || {
            min: 10,
            max: 200,
            optimal: 50
          },
          technicalRequirements: service.technicalRequirements || [],
          setupTime: service.setupTime || 30,
          tags: service.tags || [],
          features: service.features || []
        };
      });

      // המרת ספקים מאוחדים
      const typedProviders: ProviderProfile[] = unifiedProviders.map((provider: any) => {
        return {
          id: provider.id,
          businessName: provider.businessName,
          description: provider.description,
          contactPerson: provider.contactPerson || '',
          email: provider.email || '',
          phone: provider.phone || '',
          address: provider.address || '',
          city: provider.city || '',
          website: provider.website || '',
          rating: provider.rating || 0,
          reviewCount: provider.reviewCount || 0,
          featured: provider.verified || false,
          verified: provider.verified || false,
          logo: provider.logo || '',
          categories: provider.categories || [],
          gallery: [],
          specialties: ['מקצועיות גבוהה', 'שירות אישי', 'אמינות'],
          yearsExperience: 5,
          insurance: true,
          testimonials: []
        };
      });

      setServices(typedServices);
      setProviders(typedProviders);

      // הגדרת שירותים מומלצים
      const featured = typedServices.filter(service => service.featured).slice(0, 12);
      setFeaturedServices(featured);

      // הגדרת ספקים מובילים
      const topProvidersList = typedProviders
        .filter(provider => provider.rating > 4.0)
        .sort((a: ProviderProfile, b: ProviderProfile) => (b.rating || 0) - (a.rating || 0))
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
      (provider) => provider.categories.includes(serviceTypeId)
    );
  };

  const getProvidersBySubcategory = (subcategoryId: string) => {
    return providers.filter(
      (provider) => provider.categories?.includes(subcategoryId)
    );
  };

  const getServicesByProvider = (providerId: string) => {
    return services.filter(
      (service) => service.providerId === providerId
    );
  };

  const getServicesBySubcategory = (services: SearchResultService[], subcategoryId: string) => {
    return services.filter(
      (service) => service.subcategory === subcategoryId
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
