
import React from 'react';
import { 
  Music, 
  Utensils, 
  Camera, 
  Map, 
  Mic, 
  Gift, 
  Building,
  Wine,
  Beer,
  Tent,
  PartyPopper,
  Cake,
  Ticket,
  Bus,
  CarFront,
  Plane
} from "lucide-react";

// הממשק עבור הצעת חיפוש
export interface SearchSuggestion {
  id: string;
  value: string;
  type?: string;
  icon?: React.ReactNode;
}

// פונקציה ליצירת אייקונים - מונעת שימוש ב-JSX ישירות בקובץ .ts
export const createIcon = (Icon: React.FC<React.SVGProps<SVGSVGElement>>) => {
  return React.createElement(Icon, { className: "h-4 w-4" });
};

// תתי קטגוריות עבור לוקיישנים ומתחמי אירוח
export const venueSubcategories: SearchSuggestion[] = [
  { id: "venue-1", value: "חדרי ישיבות", type: "תת-קטגוריה" },
  { id: "venue-2", value: "אולמות אירועים", type: "תת-קטגוריה" },
  { id: "venue-3", value: "לופטים", type: "תת-קטגוריה" },
  { id: "venue-4", value: "וילות אירוח", type: "תת-קטגוריה" },
  { id: "venue-5", value: "מקומות קונספט", type: "תת-קטגוריה" },
  { id: "venue-6", value: "מתקני ספורט", type: "תת-קטגוריה" },
  { id: "venue-7", value: "חוות סוסים", type: "תת-קטגוריה" },
  { id: "venue-8", value: "אירוח בחוף", type: "תת-קטגוריה" },
  { id: "venue-9", value: "ספינות אירוח", type: "תת-קטגוריה" },
  { id: "venue-10", value: "אירוח בטבע", type: "תת-קטגוריה" },
  { id: "venue-11", value: "מסעדות לאירועים", type: "תת-קטגוריה" },
  { id: "venue-12", value: "סדנאות מארחות", type: "תת-קטגוריה" }
];

// תתי קטגוריות עבור שירותי מזון ומשקאות
export const foodSubcategories: SearchSuggestion[] = [
  { id: "food-1", value: "קייטרינג חלבי", type: "תת-קטגוריה" },
  { id: "food-2", value: "קייטרינג בשרי", type: "תת-קטגוריה" },
  { id: "food-3", value: "דוכני מזון", type: "תת-קטגוריה" },
  { id: "food-4", value: "שפים פרטיים", type: "תת-קטגוריה" },
  { id: "food-5", value: "בתי קפה ניידים", type: "תת-קטגוריה" },
  { id: "food-6", value: "ברים ניידים", type: "תת-קטגוריה" },
  { id: "food-7", value: "עוגות ומאפים לאירועים", type: "תת-קטגוריה" },
  { id: "food-8", value: "משאיות אוכל", type: "תת-קטגוריה" },
  { id: "food-9", value: "מגשי אירוח", type: "תת-קטגוריה" },
  { id: "food-10", value: "ברמנים לאירועים", type: "תת-קטגוריה" },
  { id: "food-11", value: "שוקולד ופרלינים", type: "תת-קטגוריה" },
  { id: "food-12", value: "יינות לאירועים", type: "תת-קטגוריה" }
];

// תתי קטגוריות עבור שירותי הפקה
export const productionSubcategories: SearchSuggestion[] = [
  { id: "prod-1", value: "מפיקי אירועים", type: "תת-קטגוריה" },
  { id: "prod-2", value: "ציוד הגברה", type: "תת-קטגוריה" },
  { id: "prod-3", value: "תאורה לאירועים", type: "תת-קטגוריה" },
  { id: "prod-4", value: "צילום וידאו", type: "תת-קטגוריה" },
  { id: "prod-5", value: "צילום סטילס", type: "תת-קטגוריה" },
  { id: "prod-6", value: "עיצוב אירועים", type: "תת-קטגוריה" },
  { id: "prod-7", value: "עיצוב פרחים", type: "תת-קטגוריה" },
  { id: "prod-8", value: "במות ומבנים", type: "תת-קטגוריה" },
  { id: "prod-9", value: "אוהלים לאירועים", type: "תת-קטגוריה" },
  { id: "prod-10", value: "הזמנות דיגיטליות", type: "תת-קטגוריה" },
  { id: "prod-11", value: "מסכים ומקרנים", type: "תת-קטגוריה" },
  { id: "prod-12", value: "שילוט לאירועים", type: "תת-קטגוריה" }
];

// תתי קטגוריות עבור מופעים ואמנים
export const performanceSubcategories: SearchSuggestion[] = [
  { id: "perf-1", value: "זמרים", type: "תת-קטגוריה" },
  { id: "perf-2", value: "להקות", type: "תת-קטגוריה" },
  { id: "perf-3", value: "תקליטנים", type: "תת-קטגוריה" },
  { id: "perf-4", value: "נגנים", type: "תת-קטגוריה" },
  { id: "perf-5", value: "קוסמים", type: "תת-קטגוריה" },
  { id: "perf-6", value: "אמני חושים", type: "תת-קטגוריה" },
  { id: "perf-7", value: "סטנדאפיסטים", type: "תת-קטגוריה" },
  { id: "perf-8", value: "רקדנים", type: "תת-קטגוריה" },
  { id: "perf-9", value: "מופעי אש", type: "תת-קטגוריה" },
  { id: "perf-10", value: "מופעי לייזר", type: "תת-קטגוריה" },
  { id: "perf-11", value: "מנחי אירועים", type: "תת-קטגוריה" },
  { id: "perf-12", value: "שחקני תיאטרון", type: "תת-קטגוריה" }
];

// תתי קטגוריות עבור מתנות
export const giftsSubcategories: SearchSuggestion[] = [
  { id: "gift-1", value: "מתנות לאורחים", type: "תת-קטגוריה" },
  { id: "gift-2", value: "מתנות ממותגות", type: "תת-קטגוריה" },
  { id: "gift-3", value: "מזכרות מאירועים", type: "תת-קטגוריה" },
  { id: "gift-4", value: "סלסלות שי", type: "תת-קטגוריה" },
  { id: "gift-5", value: "מתנות VIP", type: "תת-קטגוריה" },
  { id: "gift-6", value: "מגנטים וצילומי מגנט", type: "תת-קטגוריה" },
  { id: "gift-7", value: "ספרי ברכות", type: "תת-קטגוריה" },
  { id: "gift-8", value: "תכשיטים", type: "תת-קטגוריה" },
  { id: "gift-9", value: "מוצרי יודאיקה", type: "תת-קטגוריה" },
  { id: "gift-10", value: "חבילות פינוק", type: "תת-קטגוריה" },
  { id: "gift-11", value: "כרטיסי מתנה", type: "תת-קטגוריה" },
  { id: "gift-12", value: "זרי פרחים", type: "תת-קטגוריה" }
];

// תתי קטגוריות עבור ימי כיף וטיולים
export const tripsSubcategories: SearchSuggestion[] = [
  { id: "trip-1", value: "ימי גיבוש לחברות", type: "תת-קטגוריה" },
  { id: "trip-2", value: "טיולי ג'יפים", type: "תת-קטגוריה" },
  { id: "trip-3", value: "סדנאות ODT", type: "תת-קטגוריה" },
  { id: "trip-4", value: "סיורים מודרכים", type: "תת-קטגוריה" },
  { id: "trip-5", value: "אטרקציות מים", type: "תת-קטגוריה" },
  { id: "trip-6", value: "חדרי בריחה", type: "תת-קטגוריה" },
  { id: "trip-7", value: "סדנאות בישול", type: "תת-קטגוריה" },
  { id: "trip-8", value: "הסעות מאורגנות", type: "תת-קטגוריה" },
  { id: "trip-9", value: "טיולי אופניים", type: "תת-קטגוריה" },
  { id: "trip-10", value: "פעילויות אקסטרים", type: "תת-קטגוריה" },
  { id: "trip-11", value: "מסעדות לקבוצות", type: "תת-קטגוריה" },
  { id: "trip-12", value: "טיולי יום", type: "תת-קטגוריה" }
];

// קטגוריות ראשיות לחיפוש
export const mainCategories: SearchSuggestion[] = [
  { id: "cat-1", value: "לוקיישנים ומתחמי אירוח", type: "קטגוריה", icon: createIcon(Building) },
  { id: "cat-2", value: "שירותי מזון ומשקאות", type: "קטגוריה", icon: createIcon(Utensils) },
  { id: "cat-3", value: "שירותי הפקה", type: "קטגוריה", icon: createIcon(Camera) },
  { id: "cat-4", value: "מופעים ואמנים", type: "קטגוריה", icon: createIcon(Mic) },
  { id: "cat-5", value: "מתנות", type: "קטגוריה", icon: createIcon(Gift) },
  { id: "cat-6", value: "ימי כיף וטיולים", type: "קטגוריה", icon: createIcon(Plane) }
];

// קונספטים לחיפוש
export const eventConcepts: SearchSuggestion[] = [
  { id: "concept-1", value: "בר/בת מצווה", type: "קונספט", icon: createIcon(PartyPopper) },
  { id: "concept-2", value: "ערבי גיבוש", type: "קונספט", icon: createIcon(Cake) },
  { id: "concept-3", value: "מסיבות רווקים/ות", type: "קונספט", icon: createIcon(Wine) },
  { id: "concept-4", value: "אירועי חברה", type: "קונספט", icon: createIcon(Building) },
  { id: "concept-5", value: "ימי הולדת", type: "קונספט", icon: createIcon(Cake) },
  { id: "concept-6", value: "שעות מתוקות", type: "קונספט", icon: createIcon(Cake) }
];

// ספקים פופולריים
export const popularProviders: SearchSuggestion[] = [
  { id: "provider-1", value: "נטע ברסלר", type: "ספק" },
  { id: "provider-2", value: "להקת מלודי מייקרס", type: "ספק" },
  { id: "provider-3", value: "קייטרינג מעדני גורמה", type: "ספק" },
  { id: "provider-4", value: "קליוסטרו - קסמים ואשליות", type: "ספק" },
  { id: "provider-5", value: "עיצובי פרחים פנטזיה", type: "ספק" }
];

// פונקציה להחזרת כל ההצעות לחיפוש
export const getAllSearchSuggestions = (): SearchSuggestion[] => {
  return [
    ...mainCategories,
    ...eventConcepts,
    ...venueSubcategories,
    ...foodSubcategories,
    ...productionSubcategories,
    ...performanceSubcategories,
    ...giftsSubcategories,
    ...tripsSubcategories,
    ...popularProviders
  ];
};

// הוק לשיתוף הצעות החיפוש בין כל הקומפוננטים
export const useSearchSuggestions = () => {
  const searchSuggestions = getAllSearchSuggestions();
  
  return { 
    searchSuggestions,
    mainCategories,
    eventConcepts,
    venueSubcategories,
    foodSubcategories,
    productionSubcategories,
    performanceSubcategories,
    giftsSubcategories,
    tripsSubcategories,
    popularProviders
  };
};
