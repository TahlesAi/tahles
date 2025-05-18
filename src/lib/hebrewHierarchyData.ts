
import { HebrewHierarchy } from "@/lib/types/hierarchy";

// מבנה ההיררכיה בעברית עבור המערכת
export const hebrewHierarchy: HebrewHierarchy = {
  // קטגוריות ראשיות
  categories: [
    {
      id: "locations",
      name: "לוקיישנים",
      icon: "MapPin",
      description: "מקומות לאירועים וכנסים",
      subcategories: [
        { id: "coworking", name: "חללי עבודה משותפים", categoryId: "locations" },
        { id: "rental-spaces", name: "חללי עבודה להשכרה", categoryId: "locations" },
        { id: "halls", name: "אולמות", categoryId: "locations" },
        { id: "lofts", name: "לופטים", categoryId: "locations" },
        { id: "villas", name: "וילות אירוח", categoryId: "locations" },
        { id: "public-spaces", name: "מקומות ציבוריים", categoryId: "locations" },
        { id: "sport-facilities", name: "מתקני ספורט", categoryId: "locations" },
        { id: "bars", name: "ברים", categoryId: "locations" },
        { id: "restaurants", name: "מסעדות", categoryId: "locations" },
        { id: "private-rooms", name: "חדרים פרטיים", categoryId: "locations" },
        { id: "meeting-rooms", name: "חדרי ישיבות", categoryId: "locations" },
        { id: "outdoor-nature", name: "טבע וחצר", categoryId: "locations" },
        { id: "beach-sea", name: "ים וחוף", categoryId: "locations" },
        { id: "cinema", name: "קולנוע", categoryId: "locations" }
      ]
    },
    {
      id: "food-drinks",
      name: "מזון ומשקאות",
      icon: "Utensils",
      description: "שירותי הסעדה וקייטרינג",
      subcategories: [
        { id: "catering", name: "קייטרינג", categoryId: "food-drinks" },
        { id: "bar-services", name: "שרותי בר", categoryId: "food-drinks" },
        { id: "private-chef", name: "שף פרטי", categoryId: "food-drinks" },
        { id: "food-trucks", name: "פודטראקים", categoryId: "food-drinks" },
        { id: "food-workshops", name: "סדנאות אוכל", categoryId: "food-drinks" },
        { id: "cocktail-workshops", name: "סדנאות קוקטיילים", categoryId: "food-drinks" }
      ]
    },
    {
      id: "performances",
      name: "מופעים ואמני במה",
      icon: "Music",
      description: "אמנים, מוזיקאים ומופעים",
      subcategories: [
        { id: "musicians-bands", name: "מוזיקאים ולהקות", categoryId: "performances" },
        { id: "dancers", name: "רקדנים", categoryId: "performances" },
        { id: "standup", name: "סטנדאפיסטים", categoryId: "performances" },
        { id: "mentalists", name: "אמני חושים", categoryId: "performances" },
        { id: "circus", name: "קרקס", categoryId: "performances" },
        { id: "theater", name: "תיאטרון", categoryId: "performances" }
      ]
    },
    {
      id: "tours-attractions",
      name: "טיולים, אטרקציות וימי גיבוש בשטח",
      icon: "TentTree",
      description: "פעילויות גיבוש ובידור",
      subcategories: [
        { id: "accommodation", name: "מקומות לינה", categoryId: "tours-attractions" },
        { id: "attractions", name: "אטרקציות", categoryId: "tours-attractions" },
        { id: "tour-guides", name: "מדריכי טיולים", categoryId: "tours-attractions" },
        { id: "security", name: "אבטחה", categoryId: "tours-attractions" },
        { id: "transportation", name: "הסעות", categoryId: "tours-attractions" },
        { id: "atvs", name: "טרקטורונים", categoryId: "tours-attractions" },
        { id: "hot-air-balloons", name: "בלונים פורחים", categoryId: "tours-attractions" },
        { id: "water-sports", name: "ספורט ימי", categoryId: "tours-attractions" },
        { id: "cable-cars", name: "רכבל", categoryId: "tours-attractions" },
        { id: "balloons", name: "בלונים", categoryId: "tours-attractions" }
      ]
    },
    {
      id: "lectures-training",
      name: "הרצאות והכשרות",
      icon: "Mic2",
      description: "מרצים ומנחי סדנאות",
      subcategories: [
        { id: "enrichment", name: "העשרה", categoryId: "lectures-training" },
        { id: "personal-empowerment", name: "העצמה אישית", categoryId: "lectures-training" },
        { id: "general-learning", name: "למידה כללי", categoryId: "lectures-training" },
        { id: "security-lectures", name: "בטחוני", categoryId: "lectures-training" },
        { id: "financial", name: "פיננסי", categoryId: "lectures-training" },
        { id: "teamwork", name: "עבודת צוות", categoryId: "lectures-training" },
        { id: "beauty", name: "יופי", categoryId: "lectures-training" },
        { id: "nutrition", name: "תזונה", categoryId: "lectures-training" },
        { id: "performance-improvement", name: "שיפור ביצועים", categoryId: "lectures-training" },
        { id: "camera-presence", name: "עמידה מול מצלמה", categoryId: "lectures-training" },
        { id: "laughter-workshops", name: "סדנאות צחוק", categoryId: "lectures-training" },
        { id: "mind-control", name: "מחשבות", categoryId: "lectures-training" },
        { id: "memory", name: "זיכרון", categoryId: "lectures-training" },
        { id: "chef-workshops", name: "סדנאות שף", categoryId: "lectures-training" }
      ]
    },
    {
      id: "production-services",
      name: "שירותי הפקה",
      icon: "Sparkles",
      description: "הגברה, תאורה ותפאורה",
      subcategories: [
        { id: "producers", name: "מפיקים", categoryId: "production-services" },
        { id: "licensing-services", name: "שרותי רישוי", categoryId: "production-services" },
        { id: "security-services", name: "אבטחה", categoryId: "production-services" },
        { id: "human-resources", name: "אדם", categoryId: "production-services" },
        { id: "amplification", name: "הגברה", categoryId: "production-services" },
        { id: "sound", name: "הגברה וסאונד", categoryId: "production-services" },
        { id: "hosting", name: "אירוח", categoryId: "production-services" },
        { id: "fireworks", name: "פירוטכניקה", categoryId: "production-services" },
        { id: "arrival-confirmations", name: "אישורי הגעה", categoryId: "production-services" },
        { id: "outdoor-events", name: "אירועי חוץ", categoryId: "production-services" },
        { id: "ticket-offices", name: "קופות", categoryId: "production-services" },
        { id: "portable-toilets", name: "שירותים", categoryId: "production-services" },
        { id: "photographers", name: "צלמים", categoryId: "production-services" },
        { id: "design-decor", name: "עיצוב ודקורציה", categoryId: "production-services" },
        { id: "pr-services", name: "שרותי יח\"צ", categoryId: "production-services" },
        { id: "hosting-services", name: "שרותי הנחיה", categoryId: "production-services" }
      ]
    },
    {
      id: "gifts",
      name: "מתנות וכרטיסים",
      icon: "Gift",
      description: "מתנות לאירועים ושי לעובדים",
      subcategories: [
        { id: "gift-vouchers", name: "תווי קניה", categoryId: "gifts" },
        { id: "designer-gifts", name: "מתנות מעוצבות", categoryId: "gifts" },
        { id: "birth-gifts", name: "מתנות לידה", categoryId: "gifts" },
        { id: "event-tickets", name: "כרטיסים לאירועים", categoryId: "gifts" },
        { id: "retirement-gifts", name: "מתנות פרישה", categoryId: "gifts" }
      ]
    },
    {
      id: "other",
      name: "אחר - לא מצאתי",
      icon: "PlusCircle",
      description: "שירותים נוספים",
      subcategories: [
        { id: "waiting-list", name: "רשימת המתנה", categoryId: "other" }
      ]
    }
  ],

  // קונספטים ראשיים
  concepts: [
    {
      id: "family-event",
      name: "אירוע משפחתי",
      icon: "Users",
      subconcepts: [
        { id: "birthdays", name: "ימי הולדת", conceptId: "family-event" },
        { id: "bar-bat-mitzvah", name: "בר/בת מצווה", conceptId: "family-event" },
        { id: "weddings", name: "חתונות", conceptId: "family-event" },
        { id: "bachelor-parties", name: "מסיבת רווקים/ות", conceptId: "family-event" },
        { id: "golden-wedding", name: "חתונת זהב", conceptId: "family-event" },
        { id: "intimate-salon", name: "מפגש סלון אינטימי", conceptId: "family-event" },
        { id: "other-family", name: "אחר", conceptId: "family-event" }
      ]
    },
    {
      id: "company-event",
      name: "אירוע חברה",
      icon: "Building",
      subconcepts: [
        { id: "team-building", name: "גיבוש צוות", conceptId: "company-event" },
        { id: "retirement-parties", name: "מסיבות פרישה", conceptId: "company-event" },
        { id: "excellence-ceremony", name: "טקס מצטיינים", conceptId: "company-event" },
        { id: "employee-party", name: "מסיבת עובדים", conceptId: "company-event" },
        { id: "office-activities", name: "הפעלות עובדים במשרד", conceptId: "company-event" },
        { id: "toast-events", name: "הרמות כוסית", conceptId: "company-event" },
        { id: "other-company", name: "אחר", conceptId: "company-event" }
      ]
    },
    {
      id: "personal-development",
      name: "התפתחות אישית והעשרה",
      icon: "Lightbulb",
      subconcepts: [
        { id: "training", name: "הדרכות", conceptId: "personal-development" },
        { id: "workshops", name: "סדנאות", conceptId: "personal-development" },
        { id: "qualifications", name: "הכשרות", conceptId: "personal-development" },
        { id: "other-development", name: "אחר", conceptId: "personal-development" }
      ]
    },
    {
      id: "outdoor-activities",
      name: "גיבוש חוץ, אטרקציות וטיולים",
      icon: "TentTree",
      subconcepts: [
        { id: "vip-rooms", name: "מסעדות וחדרי VIP", conceptId: "outdoor-activities" },
        { id: "indoor-attractions", name: "אטרקציות indoor", conceptId: "outdoor-activities" },
        { id: "escape-rooms", name: "חדרי בריחה", conceptId: "outdoor-activities" },
        { id: "bowling", name: "באולינג", conceptId: "outdoor-activities" },
        { id: "cinema-activity", name: "קולנוע", conceptId: "outdoor-activities" },
        { id: "karaoke", name: "חדרי קראיוקי", conceptId: "outdoor-activities" },
        { id: "trips", name: "טיולים", conceptId: "outdoor-activities" },
        { id: "family-vacation", name: "נופש משפחתי", conceptId: "outdoor-activities" },
        { id: "outdoor-attractions", name: "אטרקציות שטח", conceptId: "outdoor-activities" },
        { id: "other-outdoor", name: "אחר", conceptId: "outdoor-activities" }
      ]
    },
    {
      id: "gifts-tickets",
      name: "מתנות וכרטיסים",
      icon: "Gift",
      subconcepts: [
        { id: "birth-gift", name: "מתנת לידה", conceptId: "gifts-tickets" },
        { id: "retirement-gift", name: "מתנת פרישה", conceptId: "gifts-tickets" },
        { id: "gift-cards", name: "תווי קניה", conceptId: "gifts-tickets" },
        { id: "show-tickets", name: "כרטיסים להופעות", conceptId: "gifts-tickets" },
        { id: "theater-tickets", name: "כרטיסים להצגות", conceptId: "gifts-tickets" },
        { id: "party-tickets", name: "כרטיסים למסיבות", conceptId: "gifts-tickets" },
        { id: "pool-tickets", name: "כרטיסים לבריכה", conceptId: "gifts-tickets" },
        { id: "other-gifts", name: "אחר", conceptId: "gifts-tickets" }
      ]
    }
  ]
};
