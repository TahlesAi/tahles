
import { 
  HebrewHierarchy, 
  HebrewCategory, 
  HebrewSubcategory,
  HebrewServiceType,
  HebrewConcept,
  HebrewSubconcept 
} from "./types/hierarchy";

// Define Hebrew categories according to the prompt
export const hebrewCategories: HebrewCategory[] = [
  {
    id: "locations",
    name: "לוקיישנים",
    icon: "MapPin",
    description: "מקומות לאירועים וכנסים",
    subcategories: [
      { id: "shared-workspaces", name: "חללי עבודה משותפים", categoryId: "locations", icon: "LayoutGrid" },
      { id: "rental-spaces", name: "חללי עבודה להשכרה", categoryId: "locations", icon: "Home" },
      { id: "event-halls", name: "אולמות", categoryId: "locations", icon: "Building" },
      { id: "lofts", name: "לופטים", categoryId: "locations", icon: "Building" },
      { id: "villas", name: "וילות אירוח", categoryId: "locations", icon: "Home" },
      { id: "public-spaces", name: "מקומות ציבוריים", categoryId: "locations", icon: "Users" },
      { id: "sports-facilities", name: "מתקני ספורט", categoryId: "locations", icon: "Dumbbell" },
      { id: "bars", name: "ברים", categoryId: "locations", icon: "Wine" },
      { id: "restaurants", name: "מסעדות", categoryId: "locations", icon: "Utensils" },
      { id: "private-rooms", name: "חדרים פרטיים", categoryId: "locations", icon: "Door" },
      { id: "meeting-rooms", name: "חדרי ישיבות", categoryId: "locations", icon: "Users" },
      { id: "nature-yards", name: "טבע וחצר", categoryId: "locations", icon: "Flower" },
      { id: "beach-sea", name: "ים וחוף", categoryId: "locations", icon: "Waves" },
      { id: "cinema", name: "קולנוע", categoryId: "locations", icon: "Film" }
    ]
  },
  {
    id: "food-drinks",
    name: "מזון ומשקאות",
    icon: "Utensils",
    description: "שירותי הסעדה וקייטרינג",
    subcategories: [
      { id: "catering", name: "קייטרינג", categoryId: "food-drinks", icon: "Utensils" },
      { id: "bar-services", name: "שרותי בר", categoryId: "food-drinks", icon: "Wine" },
      { id: "private-chef", name: "שף פרטי", categoryId: "food-drinks", icon: "ChefHat" },
      { id: "food-trucks", name: "פודטראקים", categoryId: "food-drinks", icon: "Truck" },
      { id: "food-workshops", name: "סדנאות אוכל", categoryId: "food-drinks", icon: "Utensils" },
      { id: "cocktail-workshops", name: "סדנאות קוקטיילים", categoryId: "food-drinks", icon: "Wine" }
    ]
  },
  {
    id: "performances",
    name: "מופעים ואמני במה",
    icon: "Mic2",
    description: "אמנים, מוזיקאים ומופעים",
    subcategories: [
      { id: "musicians-bands", name: "מוזיקאים ולהקות", categoryId: "performances", icon: "Music" },
      { id: "dancers", name: "רקדנים", categoryId: "performances", icon: "Music" },
      { id: "standup", name: "סטנדאפיסטים", categoryId: "performances", icon: "Mic2" },
      { id: "mentalists", name: "אמני חושים", categoryId: "performances", icon: "Sparkles" },
      { id: "circus", name: "קרקס", categoryId: "performances", icon: "PartyPopper" },
      { id: "theater", name: "תיאטרון", categoryId: "performances", icon: "Theater" }
    ]
  },
  {
    id: "trips-attractions",
    name: "טיולים, אטרקציות וימי גיבוש בשטח",
    icon: "Map",
    description: "טיולים, אטרקציות וימי כיף",
    subcategories: [
      { id: "accommodations", name: "מקומות לינה", categoryId: "trips-attractions", icon: "Hotel" },
      { id: "attractions", name: "אטרקציות", categoryId: "trips-attractions", icon: "PartyPopper" },
      { id: "guides", name: "מדריכי טיולים", categoryId: "trips-attractions", icon: "User" },
      { id: "security", name: "אבטחה", categoryId: "trips-attractions", icon: "Shield" },
      { id: "transportation", name: "הסעות", categoryId: "trips-attractions", icon: "Bus" },
      { id: "atvs", name: "טרקטורונים", categoryId: "trips-attractions", icon: "Car" },
      { id: "hot-air-balloons", name: "בלונים פורחים", categoryId: "trips-attractions", icon: "Cloud" },
      { id: "water-sports", name: "ספורט ימי", categoryId: "trips-attractions", icon: "Waves" },
      { id: "cable-car", name: "רכבל", categoryId: "trips-attractions", icon: "ArrowUp" },
      { id: "balloons", name: "בלונים", categoryId: "trips-attractions", icon: "Cloud" }
    ]
  },
  {
    id: "lectures-trainings",
    name: "הרצאות והכשרות",
    icon: "BookOpen",
    description: "הרצאות, סדנאות והעשרה",
    subcategories: [
      { id: "enrichment", name: "העשרה", categoryId: "lectures-trainings", icon: "Lightbulb" },
      { id: "personal-empowerment", name: "העצמה אישית", categoryId: "lectures-trainings", icon: "Trophy" },
      { id: "general-learning", name: "למידה כללי", categoryId: "lectures-trainings", icon: "BookOpen" },
      { id: "security-training", name: "בטחוני", categoryId: "lectures-trainings", icon: "Shield" },
      { id: "financial", name: "פיננסי", categoryId: "lectures-trainings", icon: "DollarSign" },
      { id: "teamwork", name: "עבודת צוות", categoryId: "lectures-trainings", icon: "Users" },
      { id: "beauty", name: "יופי", categoryId: "lectures-trainings", icon: "Smile" },
      { id: "nutrition", name: "תזונה", categoryId: "lectures-trainings", icon: "Apple" },
      { id: "performance-improvement", name: "שיפור ביצועים", categoryId: "lectures-trainings", icon: "TrendingUp" },
      { id: "camera-presence", name: "עמידה מול מצלמה", categoryId: "lectures-trainings", icon: "Camera" },
      { id: "laughter-workshops", name: "סדנאות צחוק", categoryId: "lectures-trainings", icon: "Laugh" },
      { id: "thoughts", name: "מחשבות", categoryId: "lectures-trainings", icon: "Brain" },
      { id: "memory", name: "זיכרון", categoryId: "lectures-trainings", icon: "Brain" },
      { id: "chef-workshops", name: "סדנאות שף", categoryId: "lectures-trainings", icon: "ChefHat" }
    ]
  },
  {
    id: "production-services",
    name: "שירותי הפקה",
    icon: "Monitor",
    description: "שירותי הפקה, הגברה ואווירה",
    subcategories: [
      { id: "producers", name: "מפיקים", categoryId: "production-services", icon: "UserCheck" },
      { id: "licensing", name: "שרותי רישוי", categoryId: "production-services", icon: "FileText" },
      { id: "security-services", name: "אבטחה", categoryId: "production-services", icon: "Shield" },
      { id: "personnel", name: "אדם (כ\"א)", categoryId: "production-services", icon: "User" },
      { id: "amplification", name: "הגברה", categoryId: "production-services", icon: "Volume2" },
      { id: "amplification-sound", name: "הגברה וסאונד", categoryId: "production-services", icon: "Speaker" },
      { id: "hosting", name: "אירוח", categoryId: "production-services", icon: "Users" },
      { id: "pyrotechnics", name: "פירוטכניקה", categoryId: "production-services", icon: "Sparkles" },
      { id: "attendance-confirmation", name: "אישורי הגעה", categoryId: "production-services", icon: "Check" },
      { id: "outdoor-events", name: "אירועי חוץ", categoryId: "production-services", icon: "Sun" },
      { id: "cashiers", name: "קופות", categoryId: "production-services", icon: "DollarSign" },
      { id: "toilets", name: "שירותים (שירותים ניידים)", categoryId: "production-services", icon: "Home" },
      { id: "photographers", name: "צלמים", categoryId: "production-services", icon: "Camera" },
      { id: "design-decor", name: "עיצוב ודקורציה", categoryId: "production-services", icon: "Palette" },
      { id: "pr-services", name: "שרותי יח\"צ", categoryId: "production-services", icon: "Share2" },
      { id: "mc-services", name: "שרותי הנחיה", categoryId: "production-services", icon: "Mic2" }
    ]
  },
  {
    id: "gifts-tickets",
    name: "מתנות וכרטיסים",
    icon: "Gift",
    description: "מתנות, כרטיסים ושי לעובדים",
    subcategories: [
      { id: "gift-cards", name: "תווי קניה", categoryId: "gifts-tickets", icon: "CreditCard" },
      { id: "designed-gifts", name: "מתנות מעוצבות", categoryId: "gifts-tickets", icon: "Gift" },
      { id: "birth-gifts", name: "מתנות לידה", categoryId: "gifts-tickets", icon: "Baby" },
      { id: "event-tickets", name: "כרטיסים לאירועים", categoryId: "gifts-tickets", icon: "Ticket" },
      { id: "retirement-gifts", name: "מתנות פרישה", categoryId: "gifts-tickets", icon: "Award" }
    ]
  },
  {
    id: "other",
    name: "אחר – לא מצאתי",
    icon: "PlusCircle",
    description: "מוצרים או שירותים שלא הוגדרו/הותאמו עדיין",
    subcategories: [
      { id: "other-subcategory", name: "אחר", categoryId: "other", icon: "PlusCircle" }
    ]
  }
];

// Define Hebrew concepts according to the prompt
export const hebrewConcepts: HebrewConcept[] = [
  {
    id: "family-event",
    name: "אירוע משפחתי",
    icon: "Users",
    subconcepts: [
      { id: "birthdays", name: "ימי הולדת", conceptId: "family-event", icon: "Cake" },
      { id: "bar-mitzvah", name: "בר/בת מצווה", conceptId: "family-event", icon: "Star" },
      { id: "weddings", name: "חתונות", conceptId: "family-event", icon: "Heart" },
      { id: "bachelor-party", name: "מסיבת רווקים/ות", conceptId: "family-event", icon: "PartyPopper" },
      { id: "golden-wedding", name: "חתונת זהב", conceptId: "family-event", icon: "Award" },
      { id: "intimate-meeting", name: "מפגש סלון אינטימי", conceptId: "family-event", icon: "Coffee" },
      { id: "other-family", name: "אחר", conceptId: "family-event", icon: "PlusCircle" }
    ]
  },
  {
    id: "company-event",
    name: "אירוע חברה",
    icon: "Briefcase",
    subconcepts: [
      { id: "team-building", name: "גיבוש צוות", conceptId: "company-event", icon: "Users" },
      { id: "retirement-party", name: "מסיבות פרישה", conceptId: "company-event", icon: "Award" },
      { id: "excellence-ceremony", name: "טקס מצטיינים", conceptId: "company-event", icon: "Trophy" },
      { id: "employee-party", name: "מסיבת עובדים", conceptId: "company-event", icon: "PartyPopper" },
      { id: "office-activities", name: "הפעלות עובדים במשרד", conceptId: "company-event", icon: "Activity" },
      { id: "toast-ceremonies", name: "הרמות כוסית", conceptId: "company-event", icon: "Wine" },
      { id: "other-company", name: "אחר", conceptId: "company-event", icon: "PlusCircle" }
    ]
  },
  {
    id: "personal-development",
    name: "התפתחות אישית והעשרה",
    icon: "TrendingUp",
    subconcepts: [
      { id: "training", name: "הדרכות", conceptId: "personal-development", icon: "BookOpen" },
      { id: "workshops", name: "סדנאות", conceptId: "personal-development", icon: "Tool" },
      { id: "courses", name: "הכשרות", conceptId: "personal-development", icon: "Award" },
      { id: "other-development", name: "אחר", conceptId: "personal-development", icon: "PlusCircle" }
    ]
  },
  {
    id: "outdoor-attractions",
    name: "גיבוש חוץ, אטרקציות וטיולים",
    icon: "MapPin",
    subconcepts: [
      { id: "restaurants-vip", name: "מסעדות וחדרי VIP", conceptId: "outdoor-attractions", icon: "Utensils" },
      { id: "indoor-attractions", name: "אטרקציות indoor", conceptId: "outdoor-attractions", icon: "Home" },
      { id: "escape-rooms", name: "חדרי בריחה", conceptId: "outdoor-attractions", icon: "Key" },
      { id: "bowling", name: "באולינג", conceptId: "outdoor-attractions", icon: "Circle" },
      { id: "cinema-event", name: "קולנוע", conceptId: "outdoor-attractions", icon: "Film" },
      { id: "karaoke-rooms", name: "חדרי קראיוקי", conceptId: "outdoor-attractions", icon: "Mic2" },
      { id: "trips", name: "טיולים", conceptId: "outdoor-attractions", icon: "Map" },
      { id: "family-vacation", name: "נופש משפחתי", conceptId: "outdoor-attractions", icon: "Home" },
      { id: "outdoor-attractions-sub", name: "אטרקציות שטח", conceptId: "outdoor-attractions", icon: "Mountain" },
      { id: "other-attractions", name: "אחר", conceptId: "outdoor-attractions", icon: "PlusCircle" }
    ]
  },
  {
    id: "gifts-tickets-concept",
    name: "מתנות וכרטיסים",
    icon: "Gift",
    subconcepts: [
      { id: "birth-gift", name: "מתנת לידה", conceptId: "gifts-tickets-concept", icon: "Baby" },
      { id: "retirement-gift", name: "מתנת פרישה", conceptId: "gifts-tickets-concept", icon: "Award" },
      { id: "gift-cards-concept", name: "תווי קניה", conceptId: "gifts-tickets-concept", icon: "CreditCard" },
      { id: "show-tickets", name: "כרטיסים להופעות", conceptId: "gifts-tickets-concept", icon: "Music" },
      { id: "theater-tickets", name: "כרטיסים להצגות", conceptId: "gifts-tickets-concept", icon: "Theater" },
      { id: "party-tickets", name: "כרטיסים למסיבות", conceptId: "gifts-tickets-concept", icon: "PartyPopper" },
      { id: "pool-tickets", name: "כרטיסים לבריכה", conceptId: "gifts-tickets-concept", icon: "Droplet" },
      { id: "other-gifts", name: "אחר", conceptId: "gifts-tickets-concept", icon: "PlusCircle" }
    ]
  }
];

// Combine everything into a single hierarchy object
export const hebrewHierarchy: HebrewHierarchy = {
  categories: hebrewCategories,
  concepts: hebrewConcepts
};

export default hebrewHierarchy;
