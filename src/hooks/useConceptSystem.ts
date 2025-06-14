
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  MainConcept, 
  SubConcept, 
  TargetAudience, 
  GeographicArea, 
  BudgetRange,
  SearchFilters,
  EnhancedService
} from '@/types/conceptSystem';
import { toast } from 'sonner';

export const useConceptSystem = () => {
  const [mainConcepts, setMainConcepts] = useState<MainConcept[]>([]);
  const [subConcepts, setSubConcepts] = useState<SubConcept[]>([]);
  const [targetAudiences, setTargetAudiences] = useState<TargetAudience[]>([]);
  const [geographicAreas, setGeographicAreas] = useState<GeographicArea[]>([]);
  const [budgetRanges, setBudgetRanges] = useState<BudgetRange[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMainConcepts = async () => {
    try {
      // Since the tables aren't in Supabase types yet, we'll use mock data temporarily
      const mockMainConcepts: MainConcept[] = [
        {
          id: '1',
          name: 'אירועים משפחתיים',
          description: 'חתונות, בר מצווה, ימי הולדת ואירועי משפחה',
          icon: 'Heart',
          order_index: 1,
          is_active: true
        },
        {
          id: '2',
          name: 'אירועים עסקיים',
          description: 'כנסים, גיבושים, אירועי חברה',
          icon: 'Building',
          order_index: 2,
          is_active: true
        },
        {
          id: '3',
          name: 'פנאי ובילוי',
          description: 'מסיבות, בילויים וחוויות פנאי',
          icon: 'Music',
          order_index: 3,
          is_active: true
        },
        {
          id: '4',
          name: 'הרצאות וסדנאות',
          description: 'הרצאות, הכשרות וסדנאות מקצועיות',
          icon: 'GraduationCap',
          order_index: 4,
          is_active: true
        }
      ];
      setMainConcepts(mockMainConcepts);
    } catch (err) {
      console.error('Error loading main concepts:', err);
      setError('שגיאה בטעינת קונספטים ראשיים');
    }
  };

  const loadSubConcepts = async (mainConceptId?: string) => {
    try {
      const mockSubConcepts: SubConcept[] = [
        {
          id: '1',
          main_concept_id: '1',
          name: 'חתונה',
          description: 'אירוע חתונה מלא',
          order_index: 1,
          is_active: true
        },
        {
          id: '2',
          main_concept_id: '1',
          name: 'בר מצווה',
          description: 'חגיגת בר מצווה',
          order_index: 2,
          is_active: true
        },
        {
          id: '3',
          main_concept_id: '1',
          name: 'בת מצווה',
          description: 'חגיגת בת מצווה',
          order_index: 3,
          is_active: true
        },
        {
          id: '4',
          main_concept_id: '2',
          name: 'כנס עסקי',
          description: 'כנס מקצועי או עסקי',
          order_index: 1,
          is_active: true
        },
        {
          id: '5',
          main_concept_id: '2',
          name: 'גיבוש צוות',
          description: 'יום גיבוש לעובדים',
          order_index: 2,
          is_active: true
        }
      ];

      const filteredConcepts = mainConceptId 
        ? mockSubConcepts.filter(sub => sub.main_concept_id === mainConceptId)
        : mockSubConcepts;
      
      setSubConcepts(filteredConcepts);
    } catch (err) {
      console.error('Error loading sub concepts:', err);
      setError('שגיאה בטעינת תתי קונספטים');
    }
  };

  const loadTargetAudiences = async () => {
    try {
      const mockAudiences: TargetAudience[] = [
        {
          id: '1',
          name: 'ילדים',
          description: 'גילאי 3-12',
          age_range: '3-12',
          order_index: 1,
          is_active: true
        },
        {
          id: '2',
          name: 'נוער',
          description: 'גילאי 13-18',
          age_range: '13-18',
          order_index: 2,
          is_active: true
        },
        {
          id: '3',
          name: 'צעירים',
          description: 'גילאי 19-35',
          age_range: '19-35',
          order_index: 3,
          is_active: true
        },
        {
          id: '4',
          name: 'מבוגרים',
          description: 'גילאי 36-65',
          age_range: '36-65',
          order_index: 4,
          is_active: true
        }
      ];
      setTargetAudiences(mockAudiences);
    } catch (err) {
      console.error('Error loading target audiences:', err);
      setError('שגיאה בטעינת קהלי יעד');
    }
  };

  const loadGeographicAreas = async () => {
    try {
      const mockAreas: GeographicArea[] = [
        {
          id: '1',
          name: 'מרכז',
          description: 'אזור המרכז',
          cities: ['תל אביב', 'רמת גן', 'גבעתיים', 'הרצליה'],
          order_index: 1,
          is_active: true
        },
        {
          id: '2',
          name: 'ירושלים',
          description: 'ירושלים והסביבה',
          cities: ['ירושלים', 'בית שמש', 'מעלה אדומים'],
          order_index: 2,
          is_active: true
        },
        {
          id: '3',
          name: 'צפון',
          description: 'אזור הצפון',
          cities: ['חיפה', 'עכו', 'נהריה', 'קריות'],
          order_index: 3,
          is_active: true
        },
        {
          id: '4',
          name: 'דרום',
          description: 'אזור הדרום',
          cities: ['באר שבע', 'אשדוד', 'אשקלון', 'אילת'],
          order_index: 4,
          is_active: true
        }
      ];
      setGeographicAreas(mockAreas);
    } catch (err) {
      console.error('Error loading geographic areas:', err);
      setError('שגיאה בטעינת אזורים גיאוגרפיים');
    }
  };

  const loadBudgetRanges = async () => {
    try {
      const mockRanges: BudgetRange[] = [
        {
          id: '1',
          name: 'תקציב נמוך',
          min_amount: 0,
          max_amount: 5000,
          description: 'עד 5,000 ש"ח',
          order_index: 1,
          is_active: true
        },
        {
          id: '2',
          name: 'תקציב בינוני',
          min_amount: 5000,
          max_amount: 15000,
          description: '5,000-15,000 ש"ח',
          order_index: 2,
          is_active: true
        },
        {
          id: '3',
          name: 'תקציב גבוה',
          min_amount: 15000,
          max_amount: 50000,
          description: '15,000-50,000 ש"ח',
          order_index: 3,
          is_active: true
        },
        {
          id: '4',
          name: 'תקציב פרימיום',
          min_amount: 50000,
          max_amount: undefined,
          description: '50,000+ ש"ח',
          order_index: 4,
          is_active: true
        }
      ];
      setBudgetRanges(mockRanges);
    } catch (err) {
      console.error('Error loading budget ranges:', err);
      setError('שגיאה בטעינת טווחי תקציב');
    }
  };

  const searchServices = async (filters: SearchFilters): Promise<EnhancedService[]> => {
    try {
      setLoading(true);
      
      // Since we don't have real services with the new structure yet, return mock data
      const mockServices: EnhancedService[] = [
        {
          id: '1',
          name: 'מופע קסמים לילדים',
          description: 'מופע קסמים מרהיב לילדים בגילאי 5-12',
          provider_id: '1',
          base_price: 1500,
          main_concept_ids: ['1'],
          sub_concept_ids: ['3'],
          target_audience_ids: ['1'],
          geographic_area_ids: ['1'],
          budget_range_id: '1',
          location_types: ['בית', 'גן ילדים'],
          service_types: ['מופע'],
          duration_category: 'קצר (עד שעה)',
          service_language: ['עברית'],
          auto_assigned_concepts: [],
          requires_admin_approval: false,
          wishlist_enabled: true,
          rating_enabled: true,
          remote_signing_enabled: true,
          is_visible: true,
          has_calendar_integration: true
        },
        {
          id: '2',
          name: 'הרצאת מוטיבציה לעובדים',
          description: 'הרצאה מעוררת השראה לצוותי עבודה',
          provider_id: '2',
          base_price: 3500,
          main_concept_ids: ['2'],
          sub_concept_ids: ['5'],
          target_audience_ids: ['3', '4'],
          geographic_area_ids: ['1', '2'],
          budget_range_id: '2',
          location_types: ['משרד', 'אולם'],
          service_types: ['הרצאה'],
          duration_category: 'בינוני (1-3 שעות)',
          service_language: ['עברית', 'אנגלית'],
          auto_assigned_concepts: [],
          requires_admin_approval: false,
          wishlist_enabled: true,
          rating_enabled: true,
          remote_signing_enabled: true,
          is_visible: true,
          has_calendar_integration: true
        }
      ];

      // Apply basic filtering
      let results = mockServices.filter(service => {
        if (filters.main_concept_id && !service.main_concept_ids.includes(filters.main_concept_id)) {
          return false;
        }
        if (filters.budget_range_id && service.budget_range_id !== filters.budget_range_id) {
          return false;
        }
        return true;
      });

      return results;
    } catch (err) {
      console.error('Error searching services:', err);
      toast.error('שגיאה בחיפוש שירותים');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    setError(null);

    await Promise.all([
      loadMainConcepts(),
      loadSubConcepts(),
      loadTargetAudiences(),
      loadGeographicAreas(),
      loadBudgetRanges()
    ]);

    setLoading(false);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return {
    mainConcepts,
    subConcepts,
    targetAudiences,
    geographicAreas,
    budgetRanges,
    loading,
    error,
    loadSubConcepts,
    searchServices,
    refreshData: loadAllData
  };
};
