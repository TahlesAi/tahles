
// Mock data for catering companies
export const mockCateringCompanies = [
  {
    id: "catering-001",
    name: "הטעמים של שרה",
    description: "קייטרינג כשר למהדרין המתמחה במטבח ים תיכוני עשיר וטעים",
    city: "תל אביב",
    phone: "03-1234567",
    kosher: true,
    kosherType: "מהדרין",
    menuTypes: ["מזרחי", "ים תיכוני"],
    minGuests: 50,
    maxGuests: 500,
    pricePerGuest: { min: 120, max: 200 },
    regions: ["תל אביב וגוש דן", "השפלה"],
    images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033",
      "https://images.unsplash.com/photo-1547573854-74d2a71d0826",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
    ],
    featuredImage: "https://images.unsplash.com/photo-1555244162-803834f70033",
    rating: 4.7,
    reviewCount: 124
  },
  {
    id: "catering-002",
    name: "גורמה אקספרס",
    description: "קייטרינג המתמחה במטבח הצרפתי והאיטלקי העכשווי עם טוויסט ישראלי",
    city: "ירושלים",
    phone: "02-9876543",
    kosher: true,
    kosherType: "רבנות",
    menuTypes: ["אירופאי", "קונדיטוריה"],
    minGuests: 20,
    maxGuests: 300,
    pricePerGuest: { min: 150, max: 300 },
    regions: ["ירושלים", "השפלה"],
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      "https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f",
      "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9"
    ],
    featuredImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    rating: 4.9,
    reviewCount: 87
  },
  {
    id: "catering-003",
    name: "טעימה בצלחת",
    description: "קייטרינג המתמחה בבישול ביתי מסורתי, המשלב מתכונים מהבית עם חומרי גלם איכותיים",
    city: "חיפה",
    phone: "04-8765432",
    kosher: false,
    menuTypes: ["ביתי", "פיוז'ן"],
    minGuests: 30,
    maxGuests: 200,
    pricePerGuest: { min: 90, max: 180 },
    regions: ["חיפה והסביבה", "צפון השרון"],
    images: [
      "https://images.unsplash.com/photo-1555139902-7759a34c8521",
      "https://images.unsplash.com/photo-1621841957884-0c1a04defa7d",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1"
    ],
    featuredImage: "https://images.unsplash.com/photo-1555139902-7759a34c8521",
    rating: 4.5,
    reviewCount: 56
  },
  {
    id: "catering-004",
    name: "פרי הארץ",
    description: "קייטרינג המתמחה במטבח צמחוני וטבעוני טרי ובריא, המבוסס על תוצרת מקומית עונתית",
    city: "באר שבע",
    phone: "08-6543210",
    kosher: true,
    kosherType: "רבנות",
    menuTypes: ["צמחוני", "טבעוני", "בריאות"],
    minGuests: 10,
    maxGuests: 150,
    pricePerGuest: { min: 110, max: 190 },
    regions: ["דרום", "השפלה"],
    images: [
      "https://images.unsplash.com/photo-1540914124281-342587941389",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      "https://images.unsplash.com/photo-1607532941433-304659e8198a"
    ],
    featuredImage: "https://images.unsplash.com/photo-1540914124281-342587941389",
    rating: 4.8,
    reviewCount: 42
  },
  {
    id: "catering-005",
    name: "שפים בצפון",
    description: "קייטרינג השף של צפון הארץ, המתמחה באירועים יוקרתיים עם נגיעות מהמטבח הצפוני",
    city: "כרמיאל",
    phone: "04-9876543",
    kosher: true,
    kosherType: "מהדרין",
    menuTypes: ["גורמה", "בשרים"],
    minGuests: 50,
    maxGuests: 800,
    pricePerGuest: { min: 180, max: 400 },
    regions: ["גליל עליון", "רמת הגולן", "טבריה והסביבה"],
    images: [
      "https://images.unsplash.com/photo-1555984512-c722fc9510a6",
      "https://images.unsplash.com/photo-1558030006-450675393462",
      "https://images.unsplash.com/photo-1555651554-95f3d66fe2a5"
    ],
    featuredImage: "https://images.unsplash.com/photo-1555984512-c722fc9510a6",
    rating: 4.9,
    reviewCount: 98
  }
];

// Function to get catering companies that match specific filters
export const getFilteredCateringCompanies = (filters: any) => {
  if (!filters) return mockCateringCompanies;
  
  return mockCateringCompanies.filter(company => {
    // Filter by kosher
    if (filters.kosher !== undefined && company.kosher !== filters.kosher) {
      return false;
    }
    
    // Filter by menu type
    if (filters.menuType && !company.menuTypes.includes(filters.menuType)) {
      return false;
    }
    
    // Filter by regions
    if (filters.regions && filters.regions.length > 0) {
      if (!filters.regions.some((region: string) => company.regions.includes(region))) {
        return false;
      }
    }
    
    // Filter by guest count
    if (filters.guestCount) {
      const guestCount = parseInt(filters.guestCount);
      if (guestCount < company.minGuests || guestCount > company.maxGuests) {
        return false;
      }
    }
    
    // Filter by budget
    if (filters.budgetPerGuest) {
      const [min, max] = filters.budgetPerGuest.split('-').map((price: string) => parseInt(price));
      if (company.pricePerGuest.max < min || company.pricePerGuest.min > max) {
        return false;
      }
    }
    
    return true;
  });
};
