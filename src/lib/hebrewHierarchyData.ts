
// יש לעדכן את הקובץ הזה עם הקטגוריות והקונספטים שהוגדרו במסמך האפיון
import { HebrewHierarchy } from "./types/hierarchy";

export const hebrewHierarchy: HebrewHierarchy = {
  // קטגוריות ראשיות
  categories: [
    {
      id: "locations",
      name: "לוקיישנים",
      icon: "MapPin",
      description: "מקומות לאירועים ופעילויות",
      subcategories: [
        { id: "coworking-spaces", name: "חללי עבודה משותפים", categoryId: "locations" },
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
        { id: "nature", name: "טבע וחצר", categoryId: "locations" },
        { id: "beach", name: "ים וחוף", categoryId: "locations" },
        { id: "cinema", name: "קולנוע", categoryId: "locations" }
      ]
    },
    {
      id: "food-drinks",
      name: "מזון ומשקאות",
      icon: "Utensils",
      description: "אוכל ושתייה לכל אירוע",
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
      description: "הופעות ואמנים לכל סוג אירוע",
      subcategories: [
        { id: "musicians-bands", name: "מוזיקאים ולהקות", categoryId: "performances" },
        { id: "dancers", name: "רקדנים", categoryId: "performances" },
        { id: "stand-up", name: "סטנדאפיסטים", categoryId: "performances" },
        { id: "mentalists", name: "אמני חושים", categoryId: "performances" },
        { id: "circus", name: "קרקס", categoryId: "performances" },
        { id: "theater", name: "תיאטרון", categoryId: "performances" }
      ]
    },
    {
      id: "trips-activities",
      name: "טיולים, אטרקציות וימי גיבוש בשטח",
      icon: "TentTree",
      description: "חוויות בטבע ואטרקציות מיוחדות",
      subcategories: [
        { id: "lodging", name: "מקומות לינה", categoryId: "trips-activities" },
        { id: "attractions", name: "אטרקציות", categoryId: "trips-activities" },
        { id: "tour-guides", name: "מדריכי טיולים", categoryId: "trips-activities" },
        { id: "security", name: "אבטחה", categoryId: "trips-activities" },
        { id: "transportation", name: "הסעות", categoryId: "trips-activities" },
        { id: "atvs", name: "טרקטורונים", categoryId: "trips-activities" },
        { id: "hot-air-balloons", name: "בלונים פורחים", categoryId: "trips-activities" },
        { id: "water-sports", name: "ספורט ימי", categoryId: "trips-activities" },
        { id: "cable-car", name: "רכבל", categoryId: "trips-activities" },
        { id: "balloons", name: "בלונים", categoryId: "trips-activities" }
      ]
    },
    {
      id: "lectures-training",
      name: "הרצאות והכשרות",
      icon: "Sparkles",
      description: "תוכן מקצועי והעשרה",
      subcategories: [
        { id: "enrichment", name: "העשרה", categoryId: "lectures-training" },
        { id: "personal-empowerment", name: "העצמה אישית", categoryId: "lectures-training" },
        { id: "general-learning", name: "למידה כללי", categoryId: "lectures-training" },
        { id: "security-education", name: "בטחוני", categoryId: "lectures-training" },
        { id: "financial", name: "פיננסי", categoryId: "lectures-training" },
        { id: "teamwork", name: "עבודת צוות", categoryId: "lectures-training" },
        { id: "beauty", name: "יופי", categoryId: "lectures-training" },
        { id: "nutrition", name: "תזונה", categoryId: "lectures-training" },
        { id: "performance-improvement", name: "שיפור ביצועים", categoryId: "lectures-training" },
        { id: "camera-presence", name: "עמידה מול מצלמה", categoryId: "lectures-training" },
        { id: "laughter-workshops", name: "סדנאות צחוק", categoryId: "lectures-training" },
        { id: "thought-workshops", name: "מחשבות", categoryId: "lectures-training" },
        { id: "memory", name: "זיכרון", categoryId: "lectures-training" },
        { id: "chef-workshops", name: "סדנאות שף", categoryId: "lectures-training" }
      ]
    },
    {
      id: "production-services",
      name: "שרותי הפקה",
      icon: "Building",
      description: "שירותים מקצועיים להפקת אירועים",
      subcategories: [
        { id: "producers", name: "מפיקים", categoryId: "production-services" },
        { id: "licensing", name: "שרותי רישוי", categoryId: "production-services" },
        { id: "security-services", name: "אבטחה", categoryId: "production-services" },
        { id: "staffing", name: "אדם", categoryId: "production-services" },
        { id: "sound", name: "הגברה", categoryId: "production-services" },
        { id: "sound-equipment", name: "הגברה וסאונד", categoryId: "production-services" },
        { id: "hospitality", name: "אירוח", categoryId: "production-services" },
        { id: "pyrotechnics", name: "פירוטכניקה", categoryId: "production-services" },
        { id: "rsvp", name: "אישורי הגעה", categoryId: "production-services" },
        { id: "outdoor-events", name: "אירועי חוץ", categoryId: "production-services" },
        { id: "box-office", name: "קופות", categoryId: "production-services" },
        { id: "bathroom-services", name: "שירותים", categoryId: "production-services" },
        { id: "photographers", name: "צלמים", categoryId: "production-services" },
        { id: "design", name: "עיצוב ודקורציה", categoryId: "production-services" },
        { id: "pr-services", name: "שרותי יח\"צ", categoryId: "production-services" },
        { id: "hosting-services", name: "שרותי הנחיה", categoryId: "production-services" }
      ]
    },
    {
      id: "gifts-tickets",
      name: "מתנות",
      icon: "Gift",
      description: "מתנות, כרטיסים ותווי קניה",
      subcategories: [
        { id: "gift-cards", name: "תווי קניה", categoryId: "gifts-tickets" },
        { id: "designer-gifts", name: "מתנות מעוצבות", categoryId: "gifts-tickets" },
        { id: "birth-gifts", name: "מתנות לידה", categoryId: "gifts-tickets" },
        { id: "event-tickets", name: "כרטיסים לאירועים", categoryId: "gifts-tickets" },
        { id: "retirement-gifts", name: "מתנות פרישה", categoryId: "gifts-tickets" }
      ]
    },
    {
      id: "other-category",
      name: "אחר - לא מצאתי",
      icon: "PlusCircle",
      description: "קטגוריות נוספות",
      subcategories: [
        { id: "other-subcategory", name: "אחר", categoryId: "other-category" }
      ]
    }
  ],
  // קונספטים נוספים לפי האפיון
  concepts: [
    { 
      id: 'family-event', 
      name: 'אירוע משפחתי', 
      icon: 'Users',
      subconcepts: [
        { id: 'birthday', name: 'ימי הולדת', conceptId: 'family-event' },
        { id: 'bar-bat-mitzvah', name: 'בר/בת מצווה', conceptId: 'family-event' },
        { id: 'wedding', name: 'חתונות', conceptId: 'family-event' },
        { id: 'bachelor-party', name: 'מסיבת רווקים', conceptId: 'family-event' },
        { id: 'golden-wedding', name: 'חתונת זהב', conceptId: 'family-event' },
        { id: 'intimate-meeting', name: 'מפגש סלון אינטימי', conceptId: 'family-event' },
        { id: 'other-family', name: 'אחר', conceptId: 'family-event' }
      ]
    },
    { 
      id: 'company-event', 
      name: 'אירוע חברה',
      icon: 'Building',
      subconcepts: [
        { id: 'team-building', name: 'גיבוש צוות', conceptId: 'company-event' },
        { id: 'retirement-party', name: 'מסיבות פרישה', conceptId: 'company-event' },
        { id: 'excellence-ceremony', name: 'טקס מצטיינים', conceptId: 'company-event' },
        { id: 'employee-party', name: 'מסיבת עובדים', conceptId: 'company-event' },
        { id: 'office-activities', name: 'הפעלות עובדים במשרד', conceptId: 'company-event' },
        { id: 'toasts', name: 'הרמות כוסית', conceptId: 'company-event' },
        { id: 'other-company', name: 'אחר', conceptId: 'company-event' }
      ]
    },
    { 
      id: 'personal-development', 
      name: 'התפתחות אישית והעשרה',
      icon: 'Sparkles',
      subconcepts: [
        { id: 'training', name: 'הדרכות', conceptId: 'personal-development' },
        { id: 'workshops', name: 'סדנאות', conceptId: 'personal-development' },
        { id: 'qualifications', name: 'הכשרות', conceptId: 'personal-development' },
        { id: 'other-development', name: 'אחר', conceptId: 'personal-development' }
      ]
    },
    { 
      id: 'outdoor-team-building', 
      name: 'גיבוש חוץ חופשות וטיולים',
      icon: 'TentTree',
      subconcepts: [
        { id: 'restaurants-vip', name: 'מסעדות וחדרי VIP', conceptId: 'outdoor-team-building' },
        { id: 'indoor-attractions', name: 'אטרקציות indoor', conceptId: 'outdoor-team-building' },
        { id: 'escape-rooms', name: 'חדרי בריחה', conceptId: 'outdoor-team-building' },
        { id: 'bowling', name: 'באולינג', conceptId: 'outdoor-team-building' },
        { id: 'cinema', name: 'קולנוע', conceptId: 'outdoor-team-building' },
        { id: 'karaoke', name: 'חדרי קראיוקי', conceptId: 'outdoor-team-building' },
        { id: 'trips', name: 'טיולים', conceptId: 'outdoor-team-building' },
        { id: 'family-vacation', name: 'נופש משפחתי', conceptId: 'outdoor-team-building' },
        { id: 'outdoor-attractions', name: 'אטרקציות שטח', conceptId: 'outdoor-team-building' },
        { id: 'other-outdoor', name: 'אחר', conceptId: 'outdoor-team-building' }
      ]
    },
    { 
      id: 'gifts-and-tickets', 
      name: 'מתנות וכרטיסים',
      icon: 'Gift',
      subconcepts: [
        { id: 'birth-gifts', name: 'מתנת לידה', conceptId: 'gifts-and-tickets' },
        { id: 'retirement-gifts', name: 'מתנת פרישה', conceptId: 'gifts-and-tickets' },
        { id: 'gift-cards', name: 'תווי קניה', conceptId: 'gifts-and-tickets' },
        { id: 'concert-tickets', name: 'כרטיסים להופעות', conceptId: 'gifts-and-tickets' },
        { id: 'theater-tickets', name: 'כרטיסים להצגות', conceptId: 'gifts-and-tickets' },
        { id: 'party-tickets', name: 'כרטיסים למסיבות', conceptId: 'gifts-and-tickets' },
        { id: 'pool-tickets', name: 'כרטיסים לבריכה', conceptId: 'gifts-and-tickets' },
        { id: 'other-gifts', name: 'אחר', conceptId: 'gifts-and-tickets' }
      ]
    }
  ]
};

export default hebrewHierarchy;
