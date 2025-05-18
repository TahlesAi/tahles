
// יש לעדכן את הקובץ הזה עם הקטגוריות והקונספטים שהוגדרו במסמך האפיון
import { 
  MapPin,
  Utensils,
  Music,
  TentTree,
  Sparkles,
  Building,
  Gift
} from "lucide-react";

export const hebrewHierarchy = {
  // קטגוריות ראשיות
  categories: [
    {
      id: "locations",
      name: "לוקיישנים",
      icon: "MapPin",
      subcategories: [
        { id: "coworking-spaces", name: "חללי עבודה משותפים" },
        { id: "rental-spaces", name: "חללי עבודה להשכרה" },
        { id: "halls", name: "אולמות" },
        { id: "lofts", name: "לופטים" },
        { id: "villas", name: "וילות אירוח" },
        { id: "public-spaces", name: "מקומות ציבוריים" },
        { id: "sport-facilities", name: "מתקני ספורט" },
        { id: "bars", name: "ברים" },
        { id: "restaurants", name: "מסעדות" },
        { id: "private-rooms", name: "חדרים פרטיים" },
        { id: "meeting-rooms", name: "חדרי ישיבות" },
        { id: "nature", name: "טבע וחצר" },
        { id: "beach", name: "ים וחוף" },
        { id: "cinema", name: "קולנוע" }
      ]
    },
    {
      id: "food-drinks",
      name: "מזון ומשקאות",
      icon: "Utensils",
      subcategories: [
        { id: "catering", name: "קייטרינג" },
        { id: "bar-services", name: "שרותי בר" },
        { id: "private-chef", name: "שף פרטי" },
        { id: "food-trucks", name: "פודטראקים" },
        { id: "food-workshops", name: "סדנאות אוכל" },
        { id: "cocktail-workshops", name: "סדנאות קוקטיילים" }
      ]
    },
    {
      id: "performances",
      name: "מופעים ואמני במה",
      icon: "Music",
      subcategories: [
        { id: "musicians-bands", name: "מוזיקאים ולהקות" },
        { id: "dancers", name: "רקדנים" },
        { id: "stand-up", name: "סטנדאפיסטים" },
        { id: "mentalists", name: "אמני חושים" },
        { id: "circus", name: "קרקס" },
        { id: "theater", name: "תיאטרון" }
      ]
    },
    {
      id: "trips-activities",
      name: "טיולים, אטרקציות וימי גיבוש בשטח",
      icon: "TentTree",
      subcategories: [
        { id: "lodging", name: "מקומות לינה" },
        { id: "attractions", name: "אטרקציות" },
        { id: "tour-guides", name: "מדריכי טיולים" },
        { id: "security", name: "אבטחה" },
        { id: "transportation", name: "הסעות" },
        { id: "atvs", name: "טרקטורונים" },
        { id: "hot-air-balloons", name: "בלונים פורחים" },
        { id: "water-sports", name: "ספורט ימי" },
        { id: "cable-car", name: "רכבל" },
        { id: "balloons", name: "בלונים" }
      ]
    },
    {
      id: "lectures-training",
      name: "הרצאות והכשרות",
      icon: "Sparkles",
      subcategories: [
        { id: "enrichment", name: "העשרה" },
        { id: "personal-empowerment", name: "העצמה אישית" },
        { id: "general-learning", name: "למידה כללי" },
        { id: "security-education", name: "בטחוני" },
        { id: "financial", name: "פיננסי" },
        { id: "teamwork", name: "עבודת צוות" },
        { id: "beauty", name: "יופי" },
        { id: "nutrition", name: "תזונה" },
        { id: "performance-improvement", name: "שיפור ביצועים" },
        { id: "camera-presence", name: "עמידה מול מצלמה" },
        { id: "laughter-workshops", name: "סדנאות צחוק" },
        { id: "thought-workshops", name: "מחשבות" },
        { id: "memory", name: "זיכרון" },
        { id: "chef-workshops", name: "סדנאות שף" }
      ]
    },
    {
      id: "production-services",
      name: "שרותי הפקה",
      icon: "Building",
      subcategories: [
        { id: "producers", name: "מפיקים" },
        { id: "licensing", name: "שרותי רישוי" },
        { id: "security-services", name: "אבטחה" },
        { id: "staffing", name: "אדם" },
        { id: "sound", name: "הגברה" },
        { id: "sound-equipment", name: "הגברה וסאונד" },
        { id: "hospitality", name: "אירוח" },
        { id: "pyrotechnics", name: "פירוטכניקה" },
        { id: "rsvp", name: "אישורי הגעה" },
        { id: "outdoor-events", name: "אירועי חוץ" },
        { id: "box-office", name: "קופות" },
        { id: "bathroom-services", name: "שירותים" },
        { id: "photographers", name: "צלמים" },
        { id: "design", name: "עיצוב ודקורציה" },
        { id: "pr-services", name: "שרותי יח\"צ" },
        { id: "hosting-services", name: "שרותי הנחיה" }
      ]
    },
    {
      id: "gifts-tickets",
      name: "מתנות",
      icon: "Gift",
      subcategories: [
        { id: "gift-cards", name: "תווי קניה" },
        { id: "designer-gifts", name: "מתנות מעוצבות" },
        { id: "birth-gifts", name: "מתנות לידה" },
        { id: "event-tickets", name: "כרטיסים לאירועים" },
        { id: "retirement-gifts", name: "מתנות פרישה" }
      ]
    }
  ],
  // קונספטים נוספים לפי האפיון
  concepts: [
    { id: 'family-event', name: 'אירוע משפחתי' },
    { id: 'company-event', name: 'אירוע חברה' },
    { id: 'personal-development', name: 'התפתחות אישית והעשרה' },
    { id: 'outdoor-team-building', name: 'גיבוש חוץ חופשות וטיולים' },
    { id: 'gifts-and-tickets', name: 'מתנות וכרטיסים' }
  ]
};

export default hebrewHierarchy;
