import { Category, Provider, Service, Subcategory, ServiceType } from "@/types";

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
  providers: Provider[],
  serviceTypeId: string
): Provider[] => {
  return providers.filter(
    (provider) => provider.service_type_ids.includes(serviceTypeId)
  );
};

export const getServicesByProvider = (
  services: Service[],
  providerId: string
): Service[] => {
  return services.filter(
    (service) => service.provider_id === providerId
  );
};

// חיפוש ספקים לפי קטגוריה
export const getProvidersByCategory = (
  providers: Provider[],
  categoryId: string
): Provider[] => {
  return providers.filter(
    (provider) => provider.category_ids?.includes(categoryId)
  );
};

// חיפוש ספקים לפי תת-קטגוריה
export const getProvidersBySubcategory = (
  providers: Provider[],
  subcategoryId: string
): Provider[] => {
  return providers.filter(
    (provider) => provider.subcategory_ids?.includes(subcategoryId)
  );
};

// חיפוש שירותים לפי קטגוריה
export const getServicesByCategory = (
  services: Service[],
  categoryId: string
): Service[] => {
  return services.filter(
    (service) => service.category_id === categoryId
  );
};

// חיפוש שירותים לפי תת-קטגוריה
export const getServicesBySubcategory = (
  services: Service[],
  subcategoryId: string
): Service[] => {
  return services.filter(
    (service) => service.subcategory_id === subcategoryId
  );
};

// חיפוש שירותים לפי קונספט
export const getServicesByConcept = (
  services: Service[],
  conceptId: string
): Service[] => {
  return services.filter(
    (service) => service.suitableFor?.includes(conceptId)
  );
};

// בדיקה אם קיימים שירותים לקטגוריה מסוימת
export const hasServicesForCategory = (
  services: Service[],
  categoryId: string
): boolean => {
  return services.some((service) => service.category_id === categoryId);
};

// בדיקה אם קיימים ספקים לתת-קטגוריה מסוימת
export const hasProvidersForSubcategory = (
  providers: Provider[],
  subcategoryId: string
): boolean => {
  return providers.some((provider) => provider.subcategory_ids?.includes(subcategoryId));
};

// חיפוש שירותים מובילים
export const getTopServices = (services: Service[], limit: number = 12): Service[] => {
  return services
    .filter(service => service.is_featured)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
};

// חיפוש ספקים מובילים
export const getTopProviders = (providers: Provider[], limit: number = 12): Provider[] => {
  return providers
    .filter(provider => provider.rating && provider.rating > 4.0)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
};
