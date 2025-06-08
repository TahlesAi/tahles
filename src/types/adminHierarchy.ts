
// מבנה ניהולי חדש עם חטיבות כרמה עליונה
export interface Division {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  categories: Category[];
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  divisionId: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  subcategories: Subcategory[];
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  icon?: string;
  order: number;
  providers: Provider[];
  customFields: CustomField[];
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

export interface Provider {
  id: string;
  subcategoryIds: string[];
  name: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  verified: boolean;
  products: Product[];
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  providerId: string;
  subcategoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  conceptTags: string[];
  targetAudiences: string[];
  isAvailable: boolean;
  created_at: string;
  updated_at: string;
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'boolean';
  required: boolean;
  options?: string[];
}

// החטיבות הראשיות
export const MAIN_DIVISIONS: Division[] = [
  {
    id: 'div-productions',
    name: 'הפקות',
    description: 'שירותי הפקה ואירועים',
    icon: 'Building',
    order: 1,
    categories: [],
    isActive: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'div-enrichment',
    name: 'העשרה',
    description: 'הרצאות, סדנאות והכשרות',
    icon: 'Sparkles',
    order: 2,
    categories: [],
    isActive: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'div-gifts',
    name: 'מתנות',
    description: 'מתנות ומזכרות',
    icon: 'Gift',
    order: 3,
    categories: [],
    isActive: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'div-tickets',
    name: 'כרטיסים',
    description: 'כרטיסים לאירועים והצגות',
    icon: 'Ticket',
    order: 4,
    categories: [],
    isActive: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'div-trips',
    name: 'טיולים',
    description: 'טיולים ואטרקציות',
    icon: 'TentTree',
    order: 5,
    categories: [],
    isActive: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];
