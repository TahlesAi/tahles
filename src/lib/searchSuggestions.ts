
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
  Plane,
  Award,
  GraduationCap,
  Baby,
  Users,
  Star,
  Heart,
  Trophy,
  Puzzle,
  Gamepad,
  KeySquare,
  DoorClosed,
  Headphones
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
  { id: "venue-12", value: "סדנאות מארחות", type: "תת-קטגוריה" },
  { id: "venue-13", value: "חדרי קריוקי", type: "תת-קטגוריה" },
  { id: "venue-14", value: "חדרי בריחה", type: "תת-קטגוריה" }
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

// קונספטים לחיפוש - כולל דייט ראשון
export const eventConcepts: SearchSuggestion[] = [
  { id: "concept-1", value: "בר/בת מצווה", type: "קונספט", icon: createIcon(PartyPopper) },
  { id: "concept-2", value: "חתונה", type: "קונספט", icon: createIcon(Heart) },
  { id: "concept-3", value: "ברית/ה", type: "קונספט", icon: createIcon(Baby) },
  { id: "concept-4", value: "גיבוש צוות", type: "קונספט", icon: createIcon(Users) },
  { id: "concept-5", value: "מסיבת עובדים", type: "קונספט", icon: createIcon(PartyPopper) },
  { id: "concept-6", value: "אירוע פרישה", type: "קונספט", icon: createIcon(Award) },
  { id: "concept-7", value: "העשרה", type: "קונספט", icon: createIcon(GraduationCap) },
  { id: "concept-8", value: "יום הולדת", type: "קונספט", icon: createIcon(Cake) },
  { id: "concept-9", value: "סעודה", type: "קונספט", icon: createIcon(Utensils) },
  { id: "concept-10", value: "אירוע השקה", type: "קונספט", icon: createIcon(Award) },
  { id: "concept-11", value: "עובדים מצטיינים", type: "קונספט", icon: createIcon(Trophy) },
  { id: "concept-12", value: "חתונת זהב", type: "קונספט", icon: createIcon(Star) },
  { id: "concept-13", value: "מסיבת רווקות/ים", type: "קונספט", icon: createIcon(Wine) },
  { id: "concept-14", value: "דייט ראשון", type: "קונספט", icon: createIcon(Heart) }
];

// תתי קטגוריות עבור דייטים ראשונים
export const firstDateSubcategories: SearchSuggestion[] = [
  { id: "first-date-1", value: "ספא זוגי", type: "תת-קטגוריה" },
  { id: "first-date-2", value: "טיול רומנטי על סוסים", type: "תת-קטגוריה" },
  { id: "first-date-3", value: "חדרי אירוח יוקרתיים", type: "תת-קטגוריה" },
  { id: "first-date-4", value: "סדנאות זוגיות", type: "תת-קטגוריה" },
  { id: "first-date-5", value: "ארוחות רומנטיות", type: "תת-קטגוריה" },
  { id: "first-date-6", value: "טיולי יאכטה", type: "תת-קטגוריה" },
  { id: "first-date-7", value: "חוויות קולינריות", type: "תת-קטגוריה" },
  { id: "first-date-8", value: "אטרקציות זוגיות", type: "תת-קטגוריה" },
  { id: "first-date-9", value: "חדרי בריחה רומנטיים", type: "תת-קטגוריה" },
  { id: "first-date-10", value: "סיורים מיוחדים", type: "תת-קטגוריה" },
  { id: "first-date-11", value: "חווית יין וטעימות", type: "תת-קטגוריה" },
  { id: "first-date-12", value: "פעילויות אומנות", type: "תת-קטגוריה" }
];

// ספקים פופולריים
export const popularProviders: SearchSuggestion[] = [
  { id: "provider-1", value: "נטע ברסלר - קריאת מחשבות", type: "ספק" },
  { id: "provider-2", value: "להקת מלודי מייקרס", type: "ספק" },
  { id: "provider-3", value: "קייטרינג מעדני גורמה", type: "ספק" },
  { id: "provider-4", value: "קליספרו - קסמים ואשליות", type: "ספק" },
  { id: "provider-5", value: "עיצובי פרחים פנטזיה", type: "ספק" },
  { id: "provider-6", value: "דורון רוזן - מנטליסט", type: "ספק" },
  { id: "provider-7", value: "מאיה הקוסמת - מופע קסמים", type: "ספק" },
  { id: "provider-8", value: "להקת ג'אז קלאסיקה", type: "ספק" },
  { id: "provider-9", value: "הרכב אקפלה וואקל", type: "ספק" },
  { id: "provider-10", value: "אלון הופר - סטנדאפיסט", type: "ספק" },
  { id: "provider-11", value: "טוויסט - תקליטן אירועים", type: "ספק" },
  { id: "provider-12", value: "גיל קופטש - מנחה אירועים", type: "ספק" },
  { id: "provider-13", value: "מופע אש ולהטוטים", type: "ספק" },
  { id: "provider-14", value: "מור אירוח - מופע שף", type: "ספק" },
  { id: "provider-15", value: "יקב טוליפ - יינות לאירועים", type: "ספק" },
  { id: "provider-16", value: "ארומה גורמה - דוכני קפה", type: "ספק" },
  { id: "provider-17", value: "צלמי האיכות - צילום אירועים", type: "ספק" },
  { id: "provider-18", value: "אקסטרים הפקות - פעילות ODT", type: "ספק" },
  { id: "provider-19", value: "לירון סאונד - הגברה ותאורה", type: "ספק" },
  { id: "provider-20", value: "ורד המדבר - חוויות מדבריות", type: "ספק" },
  { id: "provider-21", value: "מגע קולינרי - סדנאות בישול", type: "ספק" },
  { id: "provider-22", value: "מנהרת הזמן - חדרי בריחה", type: "ספק" },
  { id: "provider-23", value: "מתנאי - מתנות ממותגות", type: "ספק" },
  { id: "provider-24", value: "לופט TLV - מרחב אירועים", type: "ספק" },
  { id: "provider-25", value: "מגנטיקס - צילומי מגנטים", type: "ספק" },
  { id: "provider-26", value: "גני הטבע - אירועי חוץ", type: "ספק" },
  { id: "provider-27", value: "טעם הכרם - קייטרינג בשרי", type: "ספק" },
  { id: "provider-28", value: "חלומות מתוקים - קינוחים", type: "ספק" },
  { id: "provider-29", value: "הפקות בקצב - להקת קאברים", type: "ספק" },
  { id: "provider-30", value: "שמש הפקות - אוהלים לאירועים", type: "ספק" },
  { id: "provider-31", value: "קריוקי זמן - חדרי קריוקי", type: "ספק" },
  { id: "provider-32", value: "אסקייפ מאסטר - חדרי בריחה", type: "ספק" }
];

// אמני חושים נוספים
export const mentalistProviders: SearchSuggestion[] = [
  { id: "mentalist-1", value: "נטע ברסלר - קריאת מחשבות", type: "ספק" },
  { id: "mentalist-2", value: "קליספרו - אמן חושים", type: "ספק" },
  { id: "mentalist-3", value: "דורון רוזן - מנטליסט", type: "ספק" },
  { id: "mentalist-4", value: "מאיה הקוסמת - מופע קסמים", type: "ספק" },
  { id: "mentalist-5", value: "גיא בביוף - טלפתיה ומנטליזם", type: "ספק" },
  { id: "mentalist-6", value: "אלון חן - קוסם ואמן חושים", type: "ספק" },
  { id: "mentalist-7", value: "דני דניאלי - חידות ומחשבות", type: "ספק" },
  { id: "mentalist-8", value: "שרון כהן - מופע מנטליזם", type: "ספק" },
  { id: "mentalist-9", value: "לירן דגן - אשליות וטריקים", type: "ספק" },
  { id: "mentalist-10", value: "ניב מילמן - קסמים וטלפתיה", type: "ספק" }
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
    ...firstDateSubcategories,
    ...popularProviders,
    ...mentalistProviders
  ];
};

// הוק לשיתוף הצעות החיפוש בין כל הקומפוננטים
export const useSearchSuggestions = () => {
  const searchSuggestions = getAllSearchSuggestions();
  
  const additionalProviders = [
    { id: 'provider-extra-1', value: 'ניצוצות - מופע אש', type: 'ספק' },
    { id: 'provider-extra-2', value: 'משה כהן - זמר חתונות', type: 'ספק' },
    { id: 'provider-extra-3', value: 'הבמה - תיאטרון סאטירה', type: 'ספק' },
    { id: 'provider-extra-4', value: 'רקדני ברייק - ריקוד מודרני', type: 'ספק' },
    { id: 'provider-extra-5', value: 'פאן דיג׳יי - תקליטן אירועים', type: 'ספק' },
    { id: 'provider-extra-6', value: 'חלומות מתוקים - עוגות מעוצבות', type: 'ספק' },
    { id: 'provider-extra-7', value: 'פרחי שושן - עיצוב פרחים', type: 'ספק' },
    { id: 'provider-extra-8', value: 'במות והגברה - ציוד טכני', type: 'ספק' },
    { id: 'provider-extra-9', value: 'אולם האחוזה - אירועים', type: 'ספק' },
    { id: 'provider-extra-10', value: 'וילה ים - אירועי חוף', type: 'ספק' },
    { id: 'provider-extra-11', value: 'מאיר שף - קייטרינג גורמה', type: 'ספק' },
    { id: 'provider-extra-12', value: 'צלצולי פעמונים - הרכב קאמרי', type: 'ספק' },
    { id: 'provider-extra-13', value: 'רביעיית לה סקאלה - מוזיקה קלאסית', type: 'ספק' },
    { id: 'provider-extra-14', value: 'רוקדים בלבן - להקת ריקוד', type: 'ספק' },
    { id: 'provider-extra-15', value: 'המדריך - סיורים אורבניים', type: 'ספק' },
    { id: 'provider-extra-16', value: 'יקב בוטיק - טעימות יין', type: 'ספק' },
    { id: 'provider-extra-17', value: 'יוגה צחוק - סדנאות גיבוש', type: 'ספק' },
    { id: 'provider-extra-18', value: 'מתנות וי איי פי - שי לאורחים', type: 'ספק' },
    { id: 'provider-extra-19', value: 'מופע אקרובטיקה - סרקס דה סוליי', type: 'ספק' },
    { id: 'provider-extra-20', value: 'אמן הבלונים - עיצובים מבלונים', type: 'ספק' },
    { id: 'provider-extra-21', value: 'קריוקי לייב - חווית שירה', type: 'ספק' },
    { id: 'provider-extra-22', value: 'חדר הבריחה המסתורי - חידות ומשחקים', type: 'ספק' }
  ];
  
  additionalProviders.forEach(provider => {
    if (!searchSuggestions.some(s => s.value === provider.value)) {
      searchSuggestions.push(provider);
    }
  });
  
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
    firstDateSubcategories,
    popularProviders,
    mentalistProviders
  };
};
