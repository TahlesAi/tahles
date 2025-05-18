
import { Service } from "@/lib/types/hierarchy";
import { SearchResultService } from "@/lib/types";

/**
 * המרה מאובייקט Service להיררכיה לאובייקט SearchResultService שמשמש לתצוגת תוצאות חיפוש
 */
export function convertServiceToSearchResult(service: Service, providerName: string = ""): SearchResultService {
  return {
    id: service.id,
    name: service.name,
    provider: providerName,
    providerId: service.provider_id,
    description: service.description || "",
    price: typeof service.price === 'number' ? service.price : 0,
    priceUnit: service.price_unit || "",
    rating: service.rating || 0,
    reviewCount: service.review_count || 0,
    imageUrl: service.imageUrl || "",
    category: service.category_id || "",
    subcategory: service.subcategory_id || "",
    location: service.location || "",
    suitableFor: service.suitableFor || [],
    featured: service.is_featured || false,
    additionalImages: service.additional_images || [],
    // בדיקה אם המאפיין videos קיים, אם לא מחזירים מערך ריק
    videos: service.videos || []
  };
}

/**
 * המרת מערך של Service למערך של SearchResultService
 */
export function convertServicesToSearchResults(
  services: Service[], 
  providersMap: Record<string, string> = {}
): SearchResultService[] {
  return services.map(service => 
    convertServiceToSearchResult(service, providersMap[service.provider_id] || "")
  );
}
