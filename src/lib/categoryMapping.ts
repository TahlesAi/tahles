
// מיפוי אחיד בין שמות קטגוריות בהיררכיה העברית לנתונים המאוחדים
export const unifiedCategoryMapping: { [key: string]: string } = {
  // From Hebrew hierarchy to unified data
  'mind-artists': 'אמני חושים',
  'אמני חושים': 'אמני חושים',
  'comedians': 'סטנדאפיסטים', 
  'סטנדאפיסטים': 'סטנדאפיסטים',
  'musicians': 'זמרים ונגנים',
  'זמרים ונגנים': 'זמרים ונגנים',
  'magicians': 'קוסמים',
  'קוסמים': 'קוסמים',
  'dancers': 'רקדנים',
  'רקדנים': 'רקדנים',
  'circus': 'קרקס',
  'קרקס': 'קרקס',
  'theater': 'תיאטרון',
  'תיאטרון': 'תיאטרון'
};

// Reverse mapping - from unified data to Hebrew hierarchy
export const reverseUnifiedCategoryMapping: { [key: string]: string } = {
  'אמני חושים': 'mind-artists',
  'סטנדאפיסטים': 'comedians',
  'זמרים ונגנים': 'musicians', 
  'קוסמים': 'magicians',
  'רקדנים': 'dancers',
  'קרקס': 'circus',
  'תיאטרון': 'theater'
};

// פונקציה להמרת קטגוריה מההיררכיה העברית לנתונים המאוחדים
export const mapToUnifiedCategory = (hebrewCategory: string): string => {
  return unifiedCategoryMapping[hebrewCategory] || hebrewCategory;
};

// פונקציה להמרת קטגוריה מהנתונים המאוחדים להיררכיה העברית
export const mapToHebrewCategory = (unifiedCategory: string): string => {
  return reverseUnifiedCategoryMapping[unifiedCategory] || unifiedCategory;
};

// פונקציה לקבלת כל הקטגוריות הזמינות בנתונים המאוחדים
export const getAvailableUnifiedCategories = (): string[] => {
  return Object.values(unifiedCategoryMapping).filter((value, index, self) => 
    self.indexOf(value) === index
  );
};

// פונקציה לבדיקה אם קטגוריה קיימת בנתונים המאוחדים
export const isValidUnifiedCategory = (category: string): boolean => {
  return getAvailableUnifiedCategories().includes(category);
};
