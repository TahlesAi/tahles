
import { unifiedCategoryMapping, mapToUnifiedCategory, mapToHebrewCategory } from './categoryMapping';

// מיפוי בין IDs של הקטגוריות בהיררכיה העברית למערכת
export const categoryMapping = {
  'locations': 'locations',
  'food-drinks': 'food-drinks', 
  'performances-stage': 'performances-stage',
  'trips-attractions': 'trips-attractions',
  'lectures-training': 'lectures-training',
  'production-services': 'production-services',
  'gifts-tickets': 'gifts-tickets'
};

// מיפוי תתי קטגוריות - מוודא שהם תואמים למה שיש במערכת והנתונים המאוחדים
export const subcategoryMapping = {
  // לוקיישנים
  'coworking-spaces': 'coworking-spaces',
  'rental-spaces': 'rental-spaces',
  'halls': 'halls',
  'lofts': 'lofts',
  'villas': 'villas',
  'public-spaces': 'public-spaces',
  'sport-facilities': 'sport-facilities',
  'bars': 'bars',
  'restaurants': 'restaurants',
  'private-rooms': 'private-rooms',
  'meeting-rooms': 'meeting-rooms',
  'nature': 'nature',
  'beach': 'beach',
  'cinema': 'cinema',
  
  // מזון ומשקאות
  'catering': 'catering',
  'bar-services': 'bar-services',
  'private-chef': 'private-chef',
  'food-trucks': 'food-trucks',
  'food-workshops': 'food-workshops',
  'cocktail-workshops': 'cocktail-workshops',
  
  // מופעים ובמה - מחובר לנתונים המאוחדים
  'mind-artists': 'אמני חושים',
  'musicians': 'זמרים ונגנים',
  'comedians': 'סטנדאפיסטים',
  'dancers': 'רקדנים',
  'circus': 'קרקס',
  'theater': 'תיאטרון',
  'magicians': 'קוסמים',
  
  // שירותי הפקה
  'producers': 'producers',
  'licensing': 'licensing',
  'security-services': 'security-services',
  'staffing': 'staffing',
  'sound': 'sound',
  'sound-equipment': 'sound-equipment',
  'hospitality': 'hospitality',
  'pyrotechnics': 'pyrotechnics',
  'rsvp': 'rsvp',
  'outdoor-events': 'outdoor-events',
  'box-office': 'box-office',
  'bathroom-services': 'bathroom-services',
  'photographers': 'photographers',
  'design': 'design',
  'pr-services': 'pr-services',
  'hosting-services': 'hosting-services',
  
  // הרצאות והכשרות
  'enrichment': 'enrichment',
  'personal-empowerment': 'personal-empowerment',
  'general-learning': 'general-learning',
  'security-education': 'security-education',
  'financial': 'financial',
  'teamwork': 'teamwork',
  'beauty': 'beauty',
  'nutrition': 'nutrition',
  'performance-improvement': 'performance-improvement',
  'camera-presence': 'camera-presence',
  'laughter-workshops': 'laughter-workshops',
  'thought-workshops': 'thought-workshops',
  'memory': 'memory',
  'chef-workshops': 'chef-workshops',
  
  // טיולים ואטרקציות
  'lodging': 'lodging',
  'attractions': 'attractions',
  'tour-guides': 'tour-guides',
  'security': 'security',
  'transportation': 'transportation',
  'atvs': 'atvs',
  'hot-air-balloons': 'hot-air-balloons',
  'water-sports': 'water-sports',
  'cable-car': 'cable-car',
  'balloons': 'balloons',
  
  // מתנות ומזכרות
  'gift-cards': 'gift-cards',
  'designer-gifts': 'designer-gifts',
  'birth-gifts': 'birth-gifts',
  'event-tickets': 'event-tickets',
  'retirement-gifts': 'retirement-gifts'
};

// פונקציה לבדוק תקינות ID
export const validateCategoryId = (id: string): boolean => {
  return Object.keys(categoryMapping).includes(id);
};

export const validateSubcategoryId = (id: string): boolean => {
  return Object.keys(subcategoryMapping).includes(id);
};

// פונקציה להמרת ID למקרה שצריך
export const mapCategoryId = (id: string): string => {
  return categoryMapping[id as keyof typeof categoryMapping] || id;
};

export const mapSubcategoryId = (id: string): string => {
  const mapped = subcategoryMapping[id as keyof typeof subcategoryMapping];
  if (mapped && typeof mapped === 'string') {
    // אם זה קטגוריה בעברית, השתמש בה כמו שהיא
    if (mapped.includes('אמני') || mapped.includes('זמרים') || mapped.includes('סטנדאפ') || mapped.includes('קוסמים')) {
      return mapped;
    }
  }
  return mapped || id;
};

// פונקציה חדשה לחיפוש ספקים לפי תת קטגוריה בנתונים המאוחדים
export const findProvidersForSubcategory = (subcategoryId: string, unifiedProviders: any[]): any[] => {
  const mappedCategory = mapSubcategoryId(subcategoryId);
  console.log('Looking for providers in mapped category:', mappedCategory);
  
  if (typeof mappedCategory === 'string' && mappedCategory.includes('אמני')) {
    // חיפוש ספקים שהקטגוריה שלהם תואמת
    return unifiedProviders.filter(provider => 
      provider.categories.includes(mappedCategory) ||
      provider.categories.includes('אמני חושים')
    );
  }
  
  return unifiedProviders.filter(provider => 
    provider.categories.includes(mappedCategory)
  );
};
