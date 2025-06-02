import { Category, ProviderProfile, SearchResultService, Subcategory, ServiceType } from "@/types";

// Helper functions for EventContext to keep the main file clean

export const getSubcategoriesByCategory = (
  subcategories: Subcategory[],
  categoryId: string
): Subcategory[] => {
  return subcategories.filter(
    (subcategory) => subcategory.category_id === categoryId
  );
};

export const getServiceTypesBySubcategory = (
  serviceTypes: ServiceType[],
  subcategoryId: string
): ServiceType[] => {
  return serviceTypes.filter(
    (serviceType) => serviceType.subcategory_id === subcategoryId
  );
};

export const getProvidersByServiceType = (
  providers: ProviderProfile[],
  serviceTypeId: string
): ProviderProfile[] => {
  return providers.filter(
    (provider) => provider.categories.includes(serviceTypeId)
  );
};

export const getServicesByProvider = (
  services: SearchResultService[],
  providerId: string
): SearchResultService[] => {
  return services.filter(
    (service) => service.providerId === providerId
  );
};

// חיפוש ספקים לפי קטגוריה
export const getProvidersByCategory = (
  providers: ProviderProfile[],
  categoryId: string
): ProviderProfile[] => {
  return providers.filter(
    (provider) => provider.categories?.includes(categoryId)
  );
};

// חיפוש ספקים לפי תת-קטגוריה
export const getProvidersBySubcategory = (
  providers: ProviderProfile[],
  subcategoryId: string
): ProviderProfile[] => {
  return providers.filter(
    (provider) => provider.categories?.includes(subcategoryId)
  );
};

// חיפוש שירותים לפי קטגוריה
export const getServicesByCategory = (
  services: SearchResultService[],
  categoryId: string
): SearchResultService[] => {
  return services.filter(
    (service) => service.category === categoryId
  );
};

// חיפוש שירותים לפי תת-קטגוריה
export const getServicesBySubcategory = (
  services: SearchResultService[],
  subcategoryId: string
): SearchResultService[] => {
  return services.filter(
    (service) => service.subcategory === subcategoryId
  );
};

// חיפוש שירותים לפי קונספט
export const getServicesByConcept = (
  services: SearchResultService[],
  conceptId: string
): SearchResultService[] => {
  return services.filter(
    (service) => service.suitableFor?.includes(conceptId)
  );
};

// בדיקה אם קיימים שירותים לקטגוריה מסוימת
export const hasServicesForCategory = (
  services: SearchResultService[],
  categoryId: string
): boolean => {
  return services.some((service) => service.category === categoryId);
};

// בדיקה אם קיימים ספקים לתת-קטגוריה מסוימת
export const hasProvidersForSubcategory = (
  providers: ProviderProfile[],
  subcategoryId: string
): boolean => {
  return providers.some((provider) => provider.categories?.includes(subcategoryId));
};

// חיפוש שירותים מובילים
export const getTopServices = (services: SearchResultService[], limit: number = 12): SearchResultService[] => {
  return services
    .filter(service => service.featured)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
};

// חיפוש ספקים מובילים
export const getTopProviders = (providers: ProviderProfile[], limit: number = 12): ProviderProfile[] => {
  return providers
    .filter(provider => provider.rating && provider.rating > 4.0)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
};
