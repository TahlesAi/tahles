// מקור יחיד ומאוחד לכל הנתונים במערכת
import { HebrewHierarchy } from "@/types";

export const hebrewHierarchy: HebrewHierarchy = {
  // קטגוריות ראשיות - מאוחדות ומלאות
  categories: [
    {
      id: "locations",
      name: "לוקיישנים",
      icon: "MapPin",
      description: "מקומות לאירועים ופעילויות",
      subcategories: [
        { id: "coworking-spaces", name: "חללי עבודה משותפים", categoryId: "locations" },
        { id: "rental-spaces", name: "חללי עבודה להשכרה", categoryId: "locations" },
        { id: "halls", name: "אולמות אירועים", categoryId: "locations" },
        { id: "lofts", name: "לופטים", categoryId: "locations" },
        { id: "villas", name: "וילות אירוח", categoryId: "locations" },
        { id: "public-spaces", name: "מקומות ציבוריים", categoryId: "locations" },
        { id: "sport-facilities", name: "מתקני ספורט", categoryId: "locations" },
        { id: "bars", name: "ברים", categoryId: "locations" },
        { id: "restaurants", name: "מסעדות אירועים", categoryId: "locations" },
        { id: "private-rooms", name: "חדרים פרטיים", categoryId: "locations" },
        { id: "meeting-rooms", name: "חדרי ישיבות", categoryId: "locations" },
        { id: "nature", name: "טבע וחצר", categoryId: "locations" },
        { id: "beach", name: "ים וחוף", categoryId: "locations" },
        { id: "cinema", name: "קולנוע", categoryId: "locations" },
        { id: "escape-rooms", name: "חדרי בריחה", categoryId: "locations" },
        { id: "karaoke-rooms", name: "חדרי קריוקי", categoryId: "locations" },
        { id: "bowling", name: "באולינג", categoryId: "locations" }
      ]
    },
    {
      id: "food-drinks",
      name: "מזון ומשקאות",
      icon: "Utensils",
      description: "אוכל ושתייה לכל אירוע",
      subcategories: [
        { id: "catering-meat", name: "קייטרינג בשרי", categoryId: "food-drinks" },
        { id: "catering-dairy", name: "קייטרינג חלבי", categoryId: "food-drinks" },
        { id: "catering-vegan", name: "קייטרינג טבעוני", categoryId: "food-drinks" },
        { id: "bar-services", name: "שרותי בר", categoryId: "food-drinks" },
        { id: "private-chef", name: "שף פרטי", categoryId: "food-drinks" },
        { id: "food-trucks", name: "פודטראקים", categoryId: "food-drinks" },
        { id: "food-workshops", name: "סדנאות אוכל", categoryId: "food-drinks" },
        { id: "cocktail-workshops", name: "סדנאות קוקטיילים", categoryId: "food-drinks" },
        { id: "coffee-mobile", name: "בתי קפה ניידים", categoryId: "food-drinks" },
        { id: "cakes-pastries", name: "עוגות ומאפים", categoryId: "food-drinks" },
        { id: "chocolate-treats", name: "שוקולד ופרלינים", categoryId: "food-drinks" }
      ]
    },
    {
      id: "performances-stage",
      name: "מופעים ואמני במה",
      icon: "Music",
      description: "הופעות ואמנים לכל סוג אירוע",
      subcategories: [
        { id: "mind-artists", name: "אמני חושים", categoryId: "performances-stage" },
        { id: "mentalists", name: "מנטליסטים", categoryId: "performances-stage" },
        { id: "magicians", name: "קוסמים", categoryId: "performances-stage" },
        { id: "musicians", name: "זמרים ונגנים", categoryId: "performances-stage" },
        { id: "bands", name: "להקות", categoryId: "performances-stage" },
        { id: "comedians", name: "סטנדאפיסטים", categoryId: "performances-stage" },
        { id: "dancers", name: "רקדנים", categoryId: "performances-stage" },
        { id: "circus", name: "קרקס", categoryId: "performances-stage" },
        { id: "theater", name: "תיאטרון", categoryId: "performances-stage" },
        { id: "djs", name: "תקליטנים", categoryId: "performances-stage" },
        { id: "karaoke-services", name: "שירותי קריוקי", categoryId: "performances-stage" }
      ]
    },
    {
      id: "trips-attractions",
      name: "טיולים ואטרקציות",
      icon: "TentTree",
      description: "חוויות בטבע ואטרקציות מיוחדות",
      subcategories: [
        { id: "lodging", name: "מקומות לינה", categoryId: "trips-attractions" },
        { id: "attractions", name: "אטרקציות", categoryId: "trips-attractions" },
        { id: "tour-guides", name: "מדריכי טיולים", categoryId: "trips-attractions" },
        { id: "security", name: "אבטחה", categoryId: "trips-attractions" },
        { id: "transportation", name: "הסעות", categoryId: "trips-attractions" },
        { id: "atvs", name: "טרקטורונים", categoryId: "trips-attractions" },
        { id: "hot-air-balloons", name: "בלונים פורחים", categoryId: "trips-attractions" },
        { id: "water-sports", name: "ספורט ימי", categoryId: "trips-attractions" },
        { id: "cable-car", name: "רכבל", categoryId: "trips-attractions" },
        { id: "balloons", name: "בלונים", categoryId: "trips-attractions" }
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
        { id: "general-learning", name: "למידה כללית", categoryId: "lectures-training" },
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
      name: "שירותי הפקה",
      icon: "Building",
      description: "שירותים מקצועיים להפקת אירועים",
      subcategories: [
        { id: "producers", name: "מפיקים", categoryId: "production-services" },
        { id: "licensing", name: "שרותי רישוי", categoryId: "production-services" },
        { id: "security-services", name: "אבטחה", categoryId: "production-services" },
        { id: "staffing", name: "כוח אדם", categoryId: "production-services" },
        { id: "sound", name: "הגברה", categoryId: "production-services" },
        { id: "sound-equipment", name: "ציוד סאונד", categoryId: "production-services" },
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
      name: "מתנות וכרטיסים",
      icon: "Gift",
      description: "מתנות, כרטיסים ותווי קניה",
      subcategories: [
        { id: "gift-cards", name: "תווי קניה", categoryId: "gifts-tickets" },
        { id: "designer-gifts", name: "מתנות מעוצבות", categoryId: "gifts-tickets" },
        { id: "birth-gifts", name: "מתנות לידה", categoryId: "gifts-tickets" },
        { id: "event-tickets", name: "כרטיסים לאירועים", categoryId: "gifts-tickets" },
        { id: "theater-tickets", name: "כרטיסים להצגות", categoryId: "gifts-tickets" },
        { id: "concert-tickets", name: "כרטיסים להופעות", categoryId: "gifts-tickets" },
        { id: "retirement-gifts", name: "מתנות פרישה", categoryId: "gifts-tickets" }
      ]
    }
  ],
  
  // קונספטים מאוחדים - כולל הכל מכל המקורות
  concepts: [
    // קונספטים משפחתיים
    { 
      id: 'birthday-kids', 
      name: 'יום הולדת - ילדים (עד גיל 12)', 
      icon: 'Cake',
      subconcepts: [
        { id: 'birthday-toddlers', name: 'גילאי 2-4', conceptId: 'birthday-kids' },
        { id: 'birthday-school', name: 'גילאי 5-8', conceptId: 'birthday-kids' },
        { id: 'birthday-preteens', name: 'גילאי 9-12', conceptId: 'birthday-kids' }
      ]
    },
    { 
      id: 'birthday-teens', 
      name: 'יום הולדת - נוער (13-18)', 
      icon: 'PartyPopper',
      subconcepts: [
        { id: 'birthday-early-teens', name: 'גילאי 13-15', conceptId: 'birthday-teens' },
        { id: 'birthday-late-teens', name: 'גילאי 16-18', conceptId: 'birthday-teens' }
      ]
    },
    { 
      id: 'birthday-adults', 
      name: 'יום הולדת - מבוגרים', 
      icon: 'Users',
      subconcepts: [
        { id: 'birthday-young-adults', name: 'גילאי 20-35', conceptId: 'birthday-adults' },
        { id: 'birthday-middle-age', name: 'גילאי 36-55', conceptId: 'birthday-adults' },
        { id: 'birthday-seniors', name: 'גילאי 55+', conceptId: 'birthday-adults' }
      ]
    },
    { 
      id: 'bar-bat-mitzvah', 
      name: 'בר/בת מצווה', 
      icon: 'Star',
      subconcepts: [
        { id: 'bar-mitzvah', name: 'בר מצווה', conceptId: 'bar-bat-mitzvah' },
        { id: 'bat-mitzvah', name: 'בת מצווה', conceptId: 'bar-bat-mitzvah' }
      ]
    },
    { 
      id: 'wedding-events', 
      name: 'חתונות ואירועי נישואין', 
      icon: 'Heart',
      subconcepts: [
        { id: 'engagement', name: 'אירוסין', conceptId: 'wedding-events' },
        { id: 'bachelor-party', name: 'מסיבת רווקים', conceptId: 'wedding-events' },
        { id: 'bachelorette-party', name: 'מסיבת רווקות', conceptId: 'wedding-events' },
        { id: 'wedding-ceremony', name: 'חתונה', conceptId: 'wedding-events' },
        { id: 'golden-wedding', name: 'חתונת זהב', conceptId: 'wedding-events' }
      ]
    },
    { 
      id: 'first-date', 
      name: 'דייט ראשון', 
      icon: 'Heart',
      subconcepts: [
        { id: 'casual-date', name: 'דייט נינוח', conceptId: 'first-date' },
        { id: 'activity-date', name: 'דייט פעילות', conceptId: 'first-date' },
        { id: 'dinner-date', name: 'דייט ארוחה', conceptId: 'first-date' }
      ]
    },
    
    // קונספטים עסקיים
    { 
      id: 'company-events', 
      name: 'אירועי חברה',
      icon: 'Building',
      subconcepts: [
        { id: 'team-building', name: 'גיבוש צוות', conceptId: 'company-events' },
        { id: 'retirement-party', name: 'מסיבות פרישה', conceptId: 'company-events' },
        { id: 'excellence-ceremony', name: 'טקס מצטיינים', conceptId: 'company-events' },
        { id: 'employee-party', name: 'מסיבת עובדים', conceptId: 'company-events' },
        { id: 'office-activities', name: 'הפעלות עובדים במשרד', conceptId: 'company-events' },
        { id: 'toasts', name: 'הרמות כוסית', conceptId: 'company-events' },
        { id: 'conferences', name: 'כנסים מקצועיים', conceptId: 'company-events' }
      ]
    },
    
    // קונספטים חינוכיים והעשרה
    { 
      id: 'personal-development', 
      name: 'התפתחות אישית והעשרה',
      icon: 'Sparkles',
      subconcepts: [
        { id: 'training', name: 'הדרכות', conceptId: 'personal-development' },
        { id: 'workshops', name: 'סדנאות', conceptId: 'personal-development' },
        { id: 'qualifications', name: 'הכשרות', conceptId: 'personal-development' },
        { id: 'lectures', name: 'הרצאות', conceptId: 'personal-development' }
      ]
    },
    
    // קונספטים של בילוי וטיולים
    { 
      id: 'outdoor-activities', 
      name: 'פעילויות חוץ וטיולים',
      icon: 'TentTree',
      subconcepts: [
        { id: 'nature-trips', name: 'טיולים בטבע', conceptId: 'outdoor-activities' },
        { id: 'family-vacation', name: 'נופש משפחתי', conceptId: 'outdoor-activities' },
        { id: 'outdoor-attractions', name: 'אטרקציות שטח', conceptId: 'outdoor-activities' },
        { id: 'adventure-sports', name: 'ספורט אתגרי', conceptId: 'outdoor-activities' }
      ]
    },
    { 
      id: 'indoor-entertainment', 
      name: 'בילויים מקורים',
      icon: 'Building',
      subconcepts: [
        { id: 'restaurants-vip', name: 'מסעדות וחדרי VIP', conceptId: 'indoor-entertainment' },
        { id: 'indoor-attractions', name: 'אטרקציות indoor', conceptId: 'indoor-entertainment' },
        { id: 'escape-rooms', name: 'חדרי בריחה', conceptId: 'indoor-entertainment' },
        { id: 'bowling', name: 'באולינג', conceptId: 'indoor-entertainment' },
        { id: 'cinema', name: 'קולנוע', conceptId: 'indoor-entertainment' },
        { id: 'karaoke', name: 'חדרי קריוקי', conceptId: 'indoor-entertainment' }
      ]
    },
    
    // קונספטים של מתנות וכרטיסים
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
        { id: 'pool-tickets', name: 'כרטיסים לבריכה', conceptId: 'gifts-and-tickets' }
      ]
    }
  ]
};

export default hebrewHierarchy;
