
// מערכת לתיקון והכוונת היררכיית הקטגוריות
export interface HierarchyValidationResult {
  isValid: boolean;
  errors: string[];
  corrections: HierarchyCorrection[];
}

export interface HierarchyCorrection {
  objectId: string;
  objectType: 'provider' | 'service' | 'product';
  currentCategory?: string;
  currentSubcategory?: string;
  suggestedCategory: string;
  suggestedSubcategory: string;
  confidence: number;
}

export class HierarchyValidator {
  private categoryHierarchy: Map<string, string[]> = new Map();
  
  constructor() {
    this.initializeHierarchy();
  }

  private initializeHierarchy() {
    // מיפוי קטגוריות ← תתי קטגוריות
    this.categoryHierarchy.set('locations', ['halls', 'lofts', 'villas', 'public-spaces']);
    this.categoryHierarchy.set('food-drinks', ['catering', 'bar-services', 'private-chef']);
    this.categoryHierarchy.set('performances-stage', ['mind-artists', 'musicians', 'comedians', 'magicians']);
    this.categoryHierarchy.set('production-services', ['sound', 'lighting', 'staging', 'photography']);
    this.categoryHierarchy.set('lectures-training', ['enrichment', 'personal-empowerment', 'teamwork']);
    this.categoryHierarchy.set('trips-attractions', ['tour-guides', 'attractions', 'transportation']);
    this.categoryHierarchy.set('gifts-tickets', ['gift-cards', 'event-tickets', 'designer-gifts']);
  }

  validateObject(obj: any): HierarchyValidationResult {
    const errors: string[] = [];
    const corrections: HierarchyCorrection[] = [];

    // בדיקת שיוך קטגוריה ← תת קטגוריה
    if (obj.category && obj.subcategory) {
      const validSubcategories = this.categoryHierarchy.get(obj.category);
      if (validSubcategories && !validSubcategories.includes(obj.subcategory)) {
        errors.push(`תת קטגוריה '${obj.subcategory}' לא תואמת לקטגוריה '${obj.category}'`);
        
        // הצעת תיקון
        const suggestedCategory = this.findCategoryForSubcategory(obj.subcategory);
        if (suggestedCategory) {
          corrections.push({
            objectId: obj.id,
            objectType: obj.type || 'unknown',
            currentCategory: obj.category,
            currentSubcategory: obj.subcategory,
            suggestedCategory,
            suggestedSubcategory: obj.subcategory,
            confidence: 0.9
          });
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      corrections
    };
  }

  private findCategoryForSubcategory(subcategory: string): string | null {
    for (const [category, subcategories] of this.categoryHierarchy.entries()) {
      if (subcategories.includes(subcategory)) {
        return category;
      }
    }
    return null;
  }

  // פונקציה לתיקון גורף של כל האובייקטים במערכת
  validateAndFixAll(providers: any[], services: any[]): {
    providers: any[];
    services: any[];
    corrections: HierarchyCorrection[];
  } {
    console.time('HierarchyValidation');
    
    const allCorrections: HierarchyCorrection[] = [];
    
    // תיקון ספקים
    const fixedProviders = providers.map(provider => {
      const validation = this.validateObject({ ...provider, type: 'provider' });
      if (!validation.isValid && validation.corrections.length > 0) {
        const correction = validation.corrections[0];
        allCorrections.push(correction);
        return {
          ...provider,
          primaryCategoryId: correction.suggestedCategory,
          subcategoryIds: [correction.suggestedSubcategory]
        };
      }
      return provider;
    });

    // תיקון שירותים
    const fixedServices = services.map(service => {
      const validation = this.validateObject({ ...service, type: 'service' });
      if (!validation.isValid && validation.corrections.length > 0) {
        const correction = validation.corrections[0];
        allCorrections.push(correction);
        return {
          ...service,
          primaryCategoryId: correction.suggestedCategory,
          subcategoryId: correction.suggestedSubcategory
        };
      }
      return service;
    });

    console.timeEnd('HierarchyValidation');
    console.log(`תוקנו ${allCorrections.length} אובייקטים`);

    return {
      providers: fixedProviders,
      services: fixedServices,
      corrections: allCorrections
    };
  }

  // זיהוי אוטומטי של קטגוריה לפי מוצרים
  autoAssignProviderCategory(provider: any, services: any[]): HierarchyCorrection | null {
    const providerServices = services.filter(s => s.providerId === provider.id);
    
    if (providerServices.length === 0) return null;

    // מציאת הקטגוריה הנפוצה ביותר
    const categoryCount: Record<string, number> = {};
    providerServices.forEach(service => {
      if (service.primaryCategoryId) {
        categoryCount[service.primaryCategoryId] = (categoryCount[service.primaryCategoryId] || 0) + 1;
      }
    });

    const mostCommonCategory = Object.keys(categoryCount).reduce((a, b) => 
      categoryCount[a] > categoryCount[b] ? a : b
    );

    if (mostCommonCategory && mostCommonCategory !== provider.primaryCategoryId) {
      return {
        objectId: provider.id,
        objectType: 'provider',
        currentCategory: provider.primaryCategoryId,
        suggestedCategory: mostCommonCategory,
        suggestedSubcategory: this.categoryHierarchy.get(mostCommonCategory)?.[0] || '',
        confidence: categoryCount[mostCommonCategory] / providerServices.length
      };
    }

    return null;
  }
}

export const hierarchyValidator = new HierarchyValidator();
