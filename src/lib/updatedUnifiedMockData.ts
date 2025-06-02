
// עדכון מערכת הנתונים המאוחדת עם הנתונים החדשים
import { 
  consolidatedProviders, 
  consolidatedProducts, 
  consolidatedCalendars,
  getAvailableProductsForDate,
  getProductsByCategory,
  getProductsBySubcategory
} from './consolidatedMockData';

// עדכון הפונקציות הקיימות לעבוד עם הנתונים החדשים
export const searchServicesWithAvailability = (
  query: string, 
  filters?: any,
  selectedDate?: string,
  selectedTime?: string
) => {
  let results = [...consolidatedProducts];
  
  // סינון ראשוני - רק מוצרים זמינים
  results = results.filter(product => product.available);
  
  // סינון לפי זמינות אם נבחרו תאריך ושעה
  if (selectedDate && selectedTime) {
    const availableProducts = getAvailableProductsForDate(selectedDate, selectedTime);
    const availableProductIds = availableProducts.map(p => p.id);
    results = results.filter(product => availableProductIds.includes(product.id));
  }
  
  // סינון לפי חיפוש טקסט
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    results = results.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }
  
  // סינון לפי קטגוריה
  if (filters?.category) {
    results = results.filter(product => 
      product.categoryId === filters.category
    );
  }
  
  // סינון לפי תת קטגוריה
  if (filters?.subcategory) {
    results = results.filter(product => 
      product.subcategoryId === filters.subcategory
    );
  }
  
  // סינון לפי טווח מחירים
  if (filters?.priceRange && Array.isArray(filters.priceRange)) {
    const [min, max] = filters.priceRange;
    results = results.filter(product => 
      product.price >= min && product.price <= max
    );
  }
  
  // מיון לפי רלוונטיות
  return results.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.rating - a.rating;
  });
};

// פונקציות עזר לחיפוש מתקדם
export const getRecommendationsWithAvailability = (
  searchData: any,
  selectedDate?: string,
  selectedTime?: string
) => {
  let products = [...consolidatedProducts];
  
  // סינון בסיסי - רק מוצרים זמינים
  products = products.filter(product => product.available);
  
  // סינון לפי זמינות
  if (selectedDate) {
    const availableProducts = getAvailableProductsForDate(selectedDate, selectedTime);
    const availableProductIds = availableProducts.map(p => p.id);
    products = products.filter(product => availableProductIds.includes(product.id));
  }
  
  // סינון לפי קריטריונים נוספים
  if (searchData.category) {
    products = products.filter(product => 
      product.categoryId === searchData.category
    );
  }
  
  if (searchData.subcategory) {
    products = products.filter(product => 
      product.subcategoryId === searchData.subcategory
    );
  }
  
  if (searchData.attendeesCount) {
    const count = parseInt(searchData.attendeesCount);
    products = products.filter(product => 
      product.audienceSize && 
      count >= product.audienceSize.min && 
      count <= product.audienceSize.max
    );
  }
  
  if (searchData.isReception) {
    products = products.filter(product => product.isReceptionService);
  }
  
  // מיון וחזרת תוצאות מוגבלות
  return products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
};

// עדכון ייצוא הנתונים
export const updatedUnifiedServices = consolidatedProducts;
export const updatedUnifiedProviders = consolidatedProviders;
export const updatedCalendars = consolidatedCalendars;

// פונקציות תואמות לממשק הקיים
export const getServiceById = (id: string) => {
  return consolidatedProducts.find(product => product.id === id);
};

export const getProviderById = (id: string) => {
  return consolidatedProviders.find(provider => provider.id === id);
};

export const getServicesByProvider = (providerId: string) => {
  return consolidatedProducts.filter(product => product.providerId === providerId);
};
