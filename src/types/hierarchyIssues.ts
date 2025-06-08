
export interface HierarchyIssue {
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  count: number;
  category?: string;
  subcategory?: string;
  affectedItems?: string[];
}

export interface HierarchyStats {
  categories: number;
  subcategories: number;
  concepts: number;
  subconcepts: number;
  providers: number;
  services: number;
  simulatedProviders: number;
  simulatedServices: number;
}

export interface SystemReport {
  timestamp: string;
  currentStructure: {
    divisions: number;
    categoriesInDivisions: number;
    hebrewCategories: number;
    subcategories: number;
    providers: number;
    services: number;
  };
  issues: HierarchyIssue[];
  recommendations: string[];
}

export interface MappingRecommendation {
  sourceCategory: string;
  targetDivision: string;
  confidence: number;
  affectedProviders: number;
  affectedServices: number;
}
