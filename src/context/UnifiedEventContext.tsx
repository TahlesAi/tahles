
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { ExtendedProviderProfile, ExtendedServiceProfile } from '@/types/extendedSchema';
import { Category, Subcategory } from '@/types/unified';
import { dataSystem, getExtendedProviders, getExtendedServices } from '@/lib/extendedDataSystem';
import { hebrewHierarchy } from '@/lib/hebrewHierarchyData';

interface UnifiedEventContextProps {
  // נתונים בסיסיים
  providers: ExtendedProviderProfile[];
  services: ExtendedServiceProfile[];
  categories: Category[];
  subcategories: Subcategory[];
  
  // מצב טעינה ושגיאות
  isLoading: boolean;
  error: string | null;
  
  // פונקציות חיפוש וסינון
  searchServices: (query: string, filters?: any) => ExtendedServiceProfile[];
  getServiceById: (id: string) => ExtendedServiceProfile | undefined;
  getProviderById: (id: string) => ExtendedProviderProfile | undefined;
  getServicesByProvider: (providerId: string) => ExtendedServiceProfile[];
  
  // פונקציות Pagination
  loadMoreProviders: () => void;
  loadMoreServices: () => void;
  hasMoreProviders: boolean;
  hasMoreServices: boolean;
  
  // מטא-דאטה
  hebrewCategories: typeof hebrewHierarchy.categories;
  hebrewConcepts: typeof hebrewHierarchy.concepts;
  
  // פונקציות רענון
  refreshData: () => Promise<void>;
}

const UnifiedEventContext = createContext<UnifiedEventContextProps | undefined>(undefined);

export const useUnifiedEventContext = () => {
  const context = useContext(UnifiedEventContext);
  if (!context) {
    throw new Error("useUnifiedEventContext must be used within UnifiedEventProvider");
  }
  return context;
};

// הגדרות Pagination
const PROVIDERS_PER_PAGE = 10;
const SERVICES_PER_PAGE = 20;

export const UnifiedEventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State בסיסי
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State עבור Pagination
  const [providersPage, setProvidersPage] = useState(1);
  const [servicesPage, setServicesPage] = useState(1);
  
  // AbortController לביטול בקשות
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  // נתונים מקוריים (מכל המערכת)
  const [allProviders, setAllProviders] = useState<ExtendedProviderProfile[]>([]);
  const [allServices, setAllServices] = useState<ExtendedServiceProfile[]>([]);

  // נתונים מוצגים (עם Pagination)
  const displayedProviders = useMemo(() => {
    return allProviders.slice(0, providersPage * PROVIDERS_PER_PAGE);
  }, [allProviders, providersPage]);

  const displayedServices = useMemo(() => {
    return allServices.slice(0, servicesPage * SERVICES_PER_PAGE);
  }, [allServices, servicesPage]);

  // בדיקה אם יש עוד נתונים
  const hasMoreProviders = useMemo(() => {
    return allProviders.length > providersPage * PROVIDERS_PER_PAGE;
  }, [allProviders.length, providersPage]);

  const hasMoreServices = useMemo(() => {
    return allServices.length > servicesPage * SERVICES_PER_PAGE;
  }, [allServices.length, servicesPage]);

  // קטגוריות סטטיות (ממוקש)
  const categories = useMemo(() => hebrewHierarchy.categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    description: cat.description,
    icon: cat.icon
  })), []);

  const subcategories = useMemo(() => {
    return hebrewHierarchy.categories.flatMap(cat => 
      cat.subcategories?.map(sub => ({
        id: sub.id,
        name: sub.name,
        category_id: sub.categoryId,
        categoryId: sub.categoryId,
        description: sub.description
      })) || []
    );
  }, []);

  // טעינת נתונים ראשונית
  const loadInitialData = useCallback(async () => {
    // ביטול בקשה קודמת אם קיימת
    if (abortController) {
      abortController.abort();
    }

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    try {
      setIsLoading(true);
      setError(null);

      // בדיקה אם התבטלה הבקשה
      if (newAbortController.signal.aborted) return;

      // טעינה מה-Cache אם קיים
      const cachedProviders = sessionStorage.getItem('cachedProviders');
      const cachedServices = sessionStorage.getItem('cachedServices');
      
      if (cachedProviders && cachedServices) {
        setAllProviders(JSON.parse(cachedProviders));
        setAllServices(JSON.parse(cachedServices));
        setIsLoading(false);
        return;
      }

      // טעינה מהמערכת
      const providers = getExtendedProviders();
      const services = getExtendedServices();

      if (newAbortController.signal.aborted) return;

      setAllProviders(providers);
      setAllServices(services);

      // שמירה ב-Cache
      sessionStorage.setItem('cachedProviders', JSON.stringify(providers));
      sessionStorage.setItem('cachedServices', JSON.stringify(services));

    } catch (err) {
      if (!newAbortController.signal.aborted) {
        console.error('Error loading data:', err);
        setError(err instanceof Error ? err.message : 'שגיאה בטעינת הנתונים');
      }
    } finally {
      if (!newAbortController.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [abortController]);

  // טעינת עוד ספקים
  const loadMoreProviders = useCallback(() => {
    setProvidersPage(prev => prev + 1);
  }, []);

  // טעינת עוד שירותים
  const loadMoreServices = useCallback(() => {
    setServicesPage(prev => prev + 1);
  }, []);

  // חיפוש שירותים (ממוקש)
  const searchServices = useCallback((query: string, filters?: any) => {
    return dataSystem.searchServices(query, filters);
  }, []);

  // קבלת שירות לפי ID (ממוקש)
  const getServiceById = useCallback((id: string) => {
    return allServices.find(service => service.id === id);
  }, [allServices]);

  // קבלת ספק לפי ID (ממוקש)
  const getProviderById = useCallback((id: string) => {
    return allProviders.find(provider => provider.id === id);
  }, [allProviders]);

  // קבלת שירותים לפי ספק (ממוקש)
  const getServicesByProvider = useCallback((providerId: string) => {
    return allServices.filter(service => service.providerId === providerId);
  }, [allServices]);

  // רענון נתונים
  const refreshData = useCallback(async () => {
    // מחיקת Cache
    sessionStorage.removeItem('cachedProviders');
    sessionStorage.removeItem('cachedServices');
    
    // איפוס מצב
    setProvidersPage(1);
    setServicesPage(1);
    
    await loadInitialData();
  }, [loadInitialData]);

  // טעינה ראשונית
  useEffect(() => {
    loadInitialData();

    // Cleanup function
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, []);

  // Cleanup כללי כשהקומפוננט נמחק
  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [abortController]);

  const value: UnifiedEventContextProps = {
    providers: displayedProviders,
    services: displayedServices,
    categories,
    subcategories,
    isLoading,
    error,
    searchServices,
    getServiceById,
    getProviderById,
    getServicesByProvider,
    loadMoreProviders,
    loadMoreServices,
    hasMoreProviders,
    hasMoreServices,
    hebrewCategories: hebrewHierarchy.categories,
    hebrewConcepts: hebrewHierarchy.concepts,
    refreshData
  };

  return (
    <UnifiedEventContext.Provider value={value}>
      {children}
    </UnifiedEventContext.Provider>
  );
};

// Hook ייעודי לחיפוש מתקדם עם Debounce
export const useSearchWithDebounce = (query: string, filters?: any, delay = 300) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const { searchServices } = useUnifiedEventContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timer); // Cleanup timer
  }, [query, delay]);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return searchServices(debouncedQuery, filters);
  }, [debouncedQuery, filters, searchServices]);

  return results;
};
