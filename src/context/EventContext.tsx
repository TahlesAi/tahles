
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Category, Subcategory, ServiceType, ProviderProfile, SearchResultService } from '@/types';
import { hebrewHierarchy } from '@/lib/hebrewHierarchyData';
import { useEventDataFetcher } from './EventContextDataFetcher';
import * as helpers from './EventContextHelpers';

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
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | null>(null);

  const { fetchData, isLoading, error } = useEventDataFetcher();

  const loadData = async () => {
    try {
      const data = await fetchData();
      
      // Convert categories with compatibility fields
      const categoriesWithCompatibility = data.categories.map(cat => ({
        ...cat,
        subcategories: cat.subcategories?.map(sub => ({
          ...sub,
          categoryId: sub.category_id
        })) || []
      }));
      
      // Convert subcategories with compatibility fields
      const subcategoriesWithCompatibility = data.subcategories.map(sub => ({
        ...sub,
        categoryId: sub.category_id
      }));
      
      // Convert providers to match ProviderProfile interface - הוספת שדות חסרים
      const providersWithCompatibility = data.providers.map(provider => ({
        ...provider,
        businessName: provider.businessName || provider.name || '',
        contactPerson: provider.contactPerson || '',
        email: provider.email || '',
        phone: provider.phone || '',
        categories: provider.categories || provider.categoryIds || provider.subcategoryIds || [],
        gallery: provider.gallery || [],
        rating: provider.rating || 0,
        reviewCount: provider.reviewCount || 0,
        featured: provider.featured || false,
        verified: provider.verified || false,
        created_at: provider.created_at || new Date().toISOString(),
        updated_at: provider.updated_at || new Date().toISOString(),
        services: provider.services?.map(service => ({
          ...service,
          provider_id: service.providerId || service.provider_id || provider.id,
          category_id: service.categoryId || service.category_id || '',
          subcategory_id: service.subcategoryId || service.subcategory_id || '',
          service_type_id: service.service_type_id || 'default',
          price: service.price || 0,
          price_unit: service.priceUnit || service.price_unit || 'לאירוע',
          created_at: service.created_at || new Date().toISOString(),
          updated_at: service.updated_at || new Date().toISOString()
        })) || []
      }));
      
      setCategories(categoriesWithCompatibility);
      setSubcategories(subcategoriesWithCompatibility);
      setServices(data.services);
      setProviders(providersWithCompatibility);
      setFeaturedServices(data.featuredServices);
      setTopProviders(providersWithCompatibility.filter(p => p.featured));
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // פונקציות עזר - משימוש ב-EventContextHelpers
  const getSubcategoriesByCategory = (categoryId: string) => {
    return helpers.getSubcategoriesByCategory(subcategories, categoryId);
  };

  const getServiceTypesBySubcategory = (subcategoryId: string) => {
    return helpers.getServiceTypesBySubcategory(serviceTypes, subcategoryId);
  };

  const getProvidersByServiceType = (serviceTypeId: string) => {
    return helpers.getProvidersByServiceType(providers, serviceTypeId);
  };

  const getProvidersBySubcategory = (subcategoryId: string) => {
    return helpers.getProvidersBySubcategory(providers, subcategoryId);
  };

  const getServicesByProvider = (providerId: string) => {
    return helpers.getServicesByProvider(services, providerId);
  };

  const getServicesBySubcategory = (services: SearchResultService[], subcategoryId: string) => {
    return helpers.getServicesBySubcategory(services, subcategoryId);
  };

  const refreshData = async () => {
    await loadData();
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
