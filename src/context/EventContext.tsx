
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
      setCategories(data.categories);
      setSubcategories(data.subcategories);
      setServices(data.services);
      setProviders(data.providers);
      setFeaturedServices(data.featuredServices);
      setTopProviders(data.topProviders);
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
