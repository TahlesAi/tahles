
// Expanded mock data with 50+ diverse products for guided search

export const expandedMockProducts = [
  // אמני חושים ומנטליסטים
  {
    id: "mentalist-1",
    name: "נטע ברסלר - אמן המחשבות",
    description: "מופע אומנות חושים מרהיב המשלב קריאת מחשבות וטלפתיה",
    provider: "נטע ברסלר",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    category: "מופעים",
    subcategory: "אמני חושים",
    price: 3500,
    priceUnit: "למופע",
    duration: 45,
    location: "תל אביב והמרכז",
    rating: 4.9,
    reviewCount: 127,
    tags: ["מופע אינטראקטיבי", "מתאים לכל הגילאים"],
    eventTypes: ["private", "business", "mixed"],
    audienceAges: ["teenagers", "adults", "seniors"],
    targetAudience: ["חילוני", "דתי", "מעורב"],
    minAudience: 20,
    maxAudience: 500,
    featured: true,
    providerId: "provider-1"
  },
  {
    id: "mentalist-2", 
    name: "רון יהודה - קוסם המחשבות",
    description: "מופע מנטליזם מתקדם עם הפעלת הקהל",
    provider: "רון יהודה",
    imageUrl: "https://images.unsplash.com/photo-1561336526-6ca4ac833fb5?w=400&h=300&fit=crop",
    category: "מופעים",
    subcategory: "אמני חושים", 
    price: 4200,
    priceUnit: "למופע",
    duration: 60,
    location: "כל הארץ",
    rating: 4.7,
    reviewCount: 89,
    tags: ["מופע מתקדם", "הפעלת קהל"],
    eventTypes: ["private", "business"],
    audienceAges: ["teenagers", "adults"],
    targetAudience: ["חילוני", "מעורב"],
    minAudience: 30,
    maxAudience: 300,
    featured: true,
    providerId: "provider-2"
  },

  // זמרים ונגנים
  {
    id: "singer-1",
    name: "עידן רייכל - הופעה אקוסטית",
    description: "הופעה אינטימית עם הלהיטים הגדולים", 
    provider: "עידן רייכל",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    category: "מופעים",
    subcategory: "זמרים ונגנים",
    price: 15000,
    priceUnit: "למופע",
    duration: 90,
    location: "מרכז הארץ",
    rating: 4.9,
    reviewCount: 245,
    tags: ["מוזיקה מזרחית", "הופעה אקוסטית"],
    eventTypes: ["private", "business"],
    audienceAges: ["adults", "seniors"],
    targetAudience: ["חילוני", "דתי", "מעורב"],
    minAudience: 100,
    maxAudience: 1000,
    featured: true,
    providerId: "provider-3"
  },
  {
    id: "band-1",
    name: "להקת רוק אלטרנטיבי - The Echoes",
    description: "להקת רוק אלטרנטיבי עם כיסויים וחומר מקורי",
    provider: "The Echoes Band",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop",
    category: "מופעים", 
    subcategory: "זמרים ונגנים",
    price: 8500,
    priceUnit: "לערב",
    duration: 120,
    location: "כל הארץ",
    rating: 4.7,
    reviewCount: 89,
    tags: ["רוק אלטרנטיבי", "הופעה אנרגטית"],
    eventTypes: ["private", "business"],
    audienceAges: ["teenagers", "adults"],
    targetAudience: ["חילוני", "מעורב"],
    minAudience: 50,
    maxAudience: 800,
    featured: true,
    providerId: "provider-4"
  },
  {
    id: "jazz-trio-1",
    name: "שלישיית ג'אז אלגנטית",
    description: "מוזיקת ג'אז עדינה לאירועים מתקדמים",
    provider: "Jazz Trio Elite",
    imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=300&fit=crop",
    category: "מופעים",
    subcategory: "זמרים ונגנים",
    price: 6500,
    priceUnit: "לערב",
    duration: 180,
    location: "תל אביב והמרכז",
    rating: 4.8,
    reviewCount: 156,
    tags: ["ג'אז", "מוזיקה עדינה", "אלגנטי"],
    eventTypes: ["business", "mixed"],
    audienceAges: ["adults", "seniors"],
    targetAudience: ["חילוני", "מעורב"],
    minAudience: 30,
    maxAudience: 200,
    featured: false,
    providerId: "provider-5"
  },

  // סטנדאפיסטים
  {
    id: "comedian-1",
    name: "גיא קמפ - סטנדאפ קומי",
    description: "הופעת סטנדאפ מצחיקה ואינטליגנטית",
    provider: "גיא קמפ",
    imageUrl: "https://images.unsplash.com/photo-1524749292158-7540c2494485?w=400&h=300&fit=crop",
    category: "מופעים",
    subcategory: "סטנדאפיסטים",
    price: 4500,
    priceUnit: "למופע",
    duration: 45,
    location: "תל אביב",
    rating: 4.6,
    reviewCount: 112,
    tags: ["קומדיה", "הומור אינטליגנטי"],
    eventTypes: ["private", "business"],
    audienceAges: ["adults"],
    targetAudience: ["חילוני", "מעורב"],
    minAudience: 40,
    maxAudience: 300,
    featured: false,
    providerId: "provider-6"
  },
  {
    id: "comedian-2",
    name: "שירי מימון - קומדיה נשית",
    description: "הופעת סטנדאפ בנושאי נשים ומשפחה",
    provider: "שירי מימון",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop",
    category: "מופעים",
    subcategory: "סטנדאפיסטים",
    price: 3800,
    priceUnit: "למופע",
    duration: 40,
    location: "מרכז הארץ",
    rating: 4.5,
    reviewCount: 87,
    tags: ["קומדיה נשית", "הומור משפחתי"],
    eventTypes: ["private", "mixed"],
    audienceAges: ["adults", "seniors"],
    targetAudience: ["חילוני", "דתי", "מעורב"],
    minAudience: 25,
    maxAudience: 250,
    featured: false,
    providerId: "provider-7"
  },

  // קוסמים וקרקס
  {
    id: "magician-1",
    name: "אבי פלדמן - הקוסם הגדול",
    description: "מופע קסמים מרהיב לכל המשפחה",
    provider: "אבי פלדמן",
    imageUrl: "https://images.unsplash.com/photo-1510133768164-a8f7e4d64588?w=400&h=300&fit=crop",
    category: "מופעים",
    subcategory: "קוסמים",
    price: 3200,
    priceUnit: "למופע",
    duration: 50,
    location: "כל הארץ",
    rating: 4.7,
    reviewCount: 198,
    tags: ["קסמים", "מתאים לילדים", "אינטראקטיבי"],
    eventTypes: ["private"],
    audienceAges: ["children", "teenagers", "adults"],
    targetAudience: ["חילוני", "דתי", "חרדי"],
    minAudience: 15,
    maxAudience: 400,
    featured: true,
    providerId: "provider-8"
  },
  {
    id: "circus-1",
    name: "להקת קרקס הלומדה",
    description: "מופע קרקס מקצועי עם אקרובטיקה",
    provider: "קרקס הלומדה",
    imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop",
    category: "מופעים", 
    subcategory: "קרקס",
    price: 12000,
    priceUnit: "למופע",
    duration: 75,
    location: "מרכז וצפון",
    rating: 4.8,
    reviewCount: 134,
    tags: ["קרקס", "אקרובטיקה", "מופע משפחתי"],
    eventTypes: ["private", "business", "mixed"],
    audienceAges: ["children", "teenagers", "adults"],
    targetAudience: ["חילוני", "דתי", "מעורב"],
    minAudience: 50,
    maxAudience: 1000,
    featured: true,
    providerId: "provider-9"
  },

  // קייטרינג ומזון
  {
    id: "catering-1",
    name: "קייטרינג גורמה - טעמי השף",
    description: "שירותי קייטרינג יוקרתיים עם תפריטים מגוונים",
    provider: "טעמי השף",
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
    category: "קייטרינג",
    subcategory: "שירותי הסעדה",
    price: 120,
    priceUnit: "לאדם",
    duration: 240,
    location: "תל אביב והסביבה",
    rating: 4.8,
    reviewCount: 156,
    tags: ["כשר למהדרין", "תפריט מגוון"],
    eventTypes: ["private", "business", "mixed"],
    audienceAges: ["children", "teenagers", "adults", "seniors"],
    targetAudience: ["חילוני", "דתי", "חרדי"],
    minAudience: 30,
    maxAudience: 500,
    featured: true,
    providerId: "provider-10"
  },
  {
    id: "food-truck-1",
    name: "משאית אוכל - פלאפל הארץ",
    description: "משאית פלאפל וחומוס איכותי",
    provider: "פלאפל הארץ",
    imageUrl: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=400&h=300&fit=crop",
    category: "קייטרינג",
    subcategory: "משאיות אוכל",
    price: 45,
    priceUnit: "לאדם",
    duration: 180,
    location: "מרכז הארץ",
    rating: 4.5,
    reviewCount: 89,
    tags: ["אוכל רחוב", "פלאפל", "כשר"],
    eventTypes: ["private", "business"],
    audienceAges: ["teenagers", "adults"],
    targetAudience: ["חילוני", "דתי", "מעורב"],
    minAudience: 20,
    maxAudience: 200,
    featured: false,
    providerId: "provider-11"
  },
  {
    id: "chef-private-1",
    name: "שף פרטי - יוסי שרון",
    description: "שף פרטי לארוחות גורמה באירועים אינטימיים",
    provider: "יוסי שרון",
    imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
    category: "קייטרינג",
    subcategory: "שף פרטי",
    price: 800,
    priceUnit: "לערב",
    duration: 300,
    location: "תל אביב ומרכז",
    rating: 4.9,
    reviewCount: 67,
    tags: ["שף פרטי", "גורמה", "אירועים אינטימיים"],
    eventTypes: ["private"],
    audienceAges: ["adults", "seniors"],
    targetAudience: ["חילוני", "מעורב"],
    minAudience: 8,
    maxAudience: 25,
    featured: false,
    providerId: "provider-12"
  },

  // לוקיישנים
  {
    id: "venue-1",
    name: "אולם אירועים אלגנטי - הרצליה",
    description: "אולם יוקרתי עם נוף לים",
    provider: "אולמי הרצליה",
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
    category: "לוקיישנים",
    subcategory: "אולמות",
    price: 8000,
    priceUnit: "לערב",
    duration: 480,
    location: "הרצליה",
    rating: 4.7,
    reviewCount: 234,
    tags: ["אולם יוקרתי", "נוף לים", "חניה"],
    eventTypes: ["private", "business", "mixed"],
    audienceAges: ["adults", "seniors"],
    targetAudience: ["חילוני", "דתי", "מעורב"],
    minAudience: 80,
    maxAudience: 400,
    featured: true,
    providerId: "provider-13"
  },
  {
    id: "villa-1",
    name: "וילה יוקרתית בצפון",
    description: "וילה פרטית עם גינה וברקה לאירועים אינטימיים",
    provider: "וילות הצפון",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    category: "לוקיישנים",
    subcategory: "וילות",
    price: 12000,
    priceUnit: "לערב",
    duration: 720,
    location: "צפון הארץ",
    rating: 4.8,
    reviewCount: 78,
    tags: ["וילה פרטית", "גינה", "ברקה"],
    eventTypes: ["private"],
    audienceAges: ["adults", "seniors"],
    targetAudience: ["חילוני", "מעורב"],
    minAudience: 30,
    maxAudience: 120,
    featured: false,
    providerId: "provider-14"
  },
  {
    id: "beach-venue-1",
    name: "מתחם חוף - אשדוד",
    description: "מתחם על החוף עם במה ואזור ישיבה",
    provider: "חופי אשדוד",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    category: "לוקיישנים",
    subcategory: "חוף ים",
    price: 6500,
    priceUnit: "לערב",
    duration: 360,
    location: "אשדוד",
    rating: 4.6,
    reviewCount: 145,
    tags: ["חוף ים", "במה", "זריחה/שקיעה"],
    eventTypes: ["private", "mixed"],
    audienceAges: ["teenagers", "adults"],
    targetAudience: ["חילוני", "מעורב"],
    minAudience: 40,
    maxAudience: 300,
    featured: false,
    providerId: "provider-15"
  },

  // הרצאות ורשנאות
  {
    id: "lecture-1",
    name: "הרצאה מוטיבציונית - אמיר גורן",
    description: "הרצאה על מנהיגות והצלחה עסקית",
    provider: "אמיר גורן",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
    category: "הרצאות",
    subcategory: "העצמה אישית",
    price: 5500,
    priceUnit: "להרצאה",
    duration: 90,
    location: "כל הארץ",
    rating: 4.7,
    reviewCount: 189,
    tags: ["מוטיבציה", "מנהיגות", "עסקים"],
    eventTypes: ["business"],
    audienceAges: ["adults"],
    targetAudience: ["חילוני", "דתי", "מעורב"],
    minAudience: 25,
    maxAudience: 500,
    featured: false,
    providerId: "provider-16"
  },
  {
    id: "workshop-1",
    name: "סדנת בישול איטלקי",
    description: "סדנת בישול אינטראקטיבית עם שף איטלקי",
    provider: "מטבח איטליה",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    category: "הרצאות",
    subcategory: "סדנאות שף",
    price: 180,
    priceUnit: "לאדם",
    duration: 150,
    location: "תל אביב",
    rating: 4.8,
    reviewCount: 67,
    tags: ["בישול", "איטלקי", "אינטראקטיבי"],
    eventTypes: ["private", "business"],
    audienceAges: ["adults"],
    targetAudience: ["חילוני", "מעורב"],
    minAudience: 10,
    maxAudience: 30,
    featured: false,
    providerId: "provider-17"
  },

  // שירותי הפקה
  {
    id: "sound-1",
    name: "מערכת הגברה מקצועית",
    description: "השכרת ציוד הגברה ותאורה לאירועים",
    provider: "סאונד פרו",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
    category: "שירותי הפקה",
    subcategory: "הגברה ותאורה",
    price: 2500,
    priceUnit: "לערב",
    duration: 480,
    location: "מרכז הארץ",
    rating: 4.6,
    reviewCount: 156,
    tags: ["הגברה", "תאורה", "ציוד מקצועי"],
    eventTypes: ["private", "business", "mixed"],
    audienceAges: ["teenagers", "adults", "seniors"],
    targetAudience: ["חילוני", "דתי", "מעורב"],
    minAudience: 50,
    maxAudience: 1000,
    featured: false,
    providerId: "provider-18"
  },
  {
    id: "photographer-1",
    name: "צילום אירועים - דני כהן",
    description: "צילום מקצועי לאירועים חברתיים ועסקיים",
    provider: "דני כהן",
    imageUrl: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=400&h=300&fit=crop",
    category: "שירותי הפקה",
    subcategory: "צילום ותיעוד",
    price: 3500,
    priceUnit: "לערב",
    duration: 360,
    location: "כל הארץ",
    rating: 4.9,
    reviewCount: 234,
    tags: ["צילום מקצועי", "עריכה", "אלבום דיגיטלי"],
    eventTypes: ["private", "business", "mixed"],
    audienceAges: ["teenagers", "adults", "seniors"],
    targetAudience: ["חילוני", "דתי", "חרדי"],
    minAudience: 10,
    maxAudience: 500,
    featured: true,
    providerId: "provider-19"
  },

  // טיולים ואטרקציות
  {
    id: "tour-1",
    name: "טיול ג'יפים בגולן",
    description: "טיול ג'יפים משפחתי ברמת הגולן",
    provider: "ג'יפי גולן",
    imageUrl: "https://images.unsplash.com/photo-1544967882-4d8b8d25e2c8?w=400&h=300&fit=crop",
    category: "טיולים",
    subcategory: "ג'יפים ורכבי שטח",
    price: 150,
    priceUnit: "לאדם",
    duration: 240,
    location: "רמת הגולן",
    rating: 4.7,
    reviewCount: 123,
    tags: ["ג'יפים", "טיול משפחתי", "טבע"],
    eventTypes: ["private", "business"],
    audienceAges: ["teenagers", "adults"],
    targetAudience: ["חילוני", "דתי", "מעורב"],
    minAudience: 6,
    maxAudience: 40,
    featured: false,
    providerId: "provider-20"
  },
  {
    id: "balloon-1",
    name: "טיסה בכדור פורח",
    description: "חוויית טיסה רומנטית בכדור פורח",
    provider: "כדורי שמיים",
    imageUrl: "https://images.unsplash.com/photo-1507557126634-f6bc35e4e88c?w=400&h=300&fit=crop",
    category: "טיולים",
    subcategory: "כדור פורח",
    price: 450,
    priceUnit: "לאדם",
    duration: 180,
    location: "מרכז הארץ",
    rating: 4.9,
    reviewCount: 89,
    tags: ["כדור פורח", "רומנטי", "חוויה ייחודית"],
    eventTypes: ["private"],
    audienceAges: ["adults"],
    targetAudience: ["חילוני", "מעורב"],
    minAudience: 2,
    maxAudience: 16,
    featured: true,
    providerId: "provider-21"
  }
];

// Helper function to get products by category
export const getProductsByCategory = (category: string) => {
  return expandedMockProducts.filter(product => 
    product.category.toLowerCase().includes(category.toLowerCase())
  );
};

// Helper function to get products by subcategory
export const getProductsBySubcategory = (subcategory: string) => {
  return expandedMockProducts.filter(product => 
    product.subcategory.toLowerCase().includes(subcategory.toLowerCase())
  );
};

// Helper function for guided search filtering
export const filterProductsForGuidedSearch = (searchData: any) => {
  let filtered = [...expandedMockProducts];
  
  // Filter by event type
  if (searchData.eventType) {
    filtered = filtered.filter(product => 
      product.eventTypes.includes(searchData.eventType)
    );
  }
  
  // Filter by attendees count
  if (searchData.attendeesCount) {
    const count = parseInt(searchData.attendeesCount);
    filtered = filtered.filter(product => 
      count >= product.minAudience && count <= product.maxAudience
    );
  }
  
  // Filter by budget
  if (searchData.budget && searchData.budget.max > 0) {
    filtered = filtered.filter(product => {
      let totalPrice = product.price;
      if (product.priceUnit === "לאדם" && searchData.attendeesCount) {
        totalPrice *= parseInt(searchData.attendeesCount);
      }
      return totalPrice >= searchData.budget.min && totalPrice <= searchData.budget.max;
    });
  }
  
  // Filter by concept/category
  if (searchData.selectedCategory) {
    filtered = filtered.filter(product => 
      product.category.toLowerCase().includes(searchData.selectedCategory.toLowerCase())
    );
  }
  
  if (searchData.selectedSubcategory) {
    filtered = filtered.filter(product => 
      product.subcategory.toLowerCase().includes(searchData.selectedSubcategory.toLowerCase())
    );
  }
  
  return filtered.sort((a, b) => b.rating - a.rating).slice(0, 6);
};
