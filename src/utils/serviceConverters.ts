
import { SearchResultService } from "@/types";

/**
 * המרה מאובייקט Service להיררכיה לאובייקט SearchResultService שמשמש לתצוגת תוצאות חיפוש
 */
export function convertServiceToSearchResult(service: SearchResultService, providerName: string = ""): SearchResultService {
  return {
    id: service.id,
    name: service.name,
    provider: providerName,
    providerId: service.providerId,
    description: service.description || "",
    price: typeof service.price === 'number' ? service.price : 0,
    priceUnit: service.priceUnit || "",
    rating: service.rating || 0,
    reviewCount: service.reviewCount || 0,
    imageUrl: service.imageUrl || "",
    category: service.category || "",
    subcategory: service.subcategory || "",
    location: service.location || "",
    suitableFor: service.suitableFor || [],
    featured: service.featured || false,
    additionalImages: service.additionalImages || [],
    videos: service.videos || [],
    // הוספת הפרופרטיז החסרים עם ערכי ברירת מחדל
    audienceSize: {
      min: 10,
      max: 200,
      optimal: 50
    },
    technicalRequirements: [],
    setupTime: 30,
    tags: [],
    features: []
  };
}

/**
 * המרת מערך של Service למערך של SearchResultService
 */
export function convertServicesToSearchResults(
  services: SearchResultService[], 
  providersMap: Record<string, string> = {}
): SearchResultService[] {
  return services.map(service => 
    convertServiceToSearchResult(service, providersMap[service.providerId] || "")
  );
}
