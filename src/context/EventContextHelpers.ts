import { Category, Provider, Service, Subcategory, ServiceType } from "@/lib/types/hierarchy";

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

// חיפוש ספקים לפי קטגוריה עברית
export const getProvidersByHebrewCategory = (
  providers: Provider[],
  categoryId: string
): Provider[] => {
  return providers.filter(
    (provider) => provider.category_ids?.includes(categoryId)
  );
};

// חיפוש שירותים לפי קטגוריה עברית
export const getServicesByHebrewCategory = (
  services: Service[],
  categoryId: string
): Service[] => {
  return services.filter(
    (service) => service.category_id === categoryId
  );
};

// חיפוש שירותים לפי תת-קטגוריה עברית
export const getServicesByHebrewSubcategory = (
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

// חיפוש אם קיים שירות לקטגוריה מסוימת
export const hasServicesForCategory = (
  services: Service[],
  categoryId: string
): boolean => {
  return services.some((service) => service.category_id === categoryId);
};

// חיפוש שירותים מובילים
export const getTopServices = (services: Service[], limit: number = 12): Service[] => {
  return services
    .filter(service => service.is_featured)
    .slice(0, limit);
};
