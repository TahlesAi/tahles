
import { TestResult } from '@/pages/admin/TestsManagementPage';

export interface TestContext {
  testId: string;
  testName: string;
  targetRoute: string;
  timestamp: string;
}

export interface TestValidation {
  selector: string;
  required: boolean;
  description: string;
  testId?: string;
}

export interface TestDetails {
  errorLocation: string;
  specificIssue: string;
  suggestedFix: string;
  formName: string;
  affectedComponents: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// יצוא של TestResult 
export { TestResult };

// פונקציה להמתנה לטעינת עמוד
export const waitForPageLoad = (timeout: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

// פונקציה לבדיקת קיום אלמנט עם test-id או selector
export const checkElementExists = (
  selector: string, 
  testId?: string,
  description?: string
): { found: boolean; element: Element | null } => {
  let element: Element | null = null;
  
  if (testId) {
    element = document.querySelector(`[data-testid="${testId}"]`);
  }
  
  if (!element) {
    element = document.querySelector(selector);
  }
  
  console.log(`🔍 בדיקת אלמנט: ${description || selector} - ${element ? '✅ נמצא' : '❌ לא נמצא'}`);
  
  return {
    found: !!element,
    element
  };
};

// בדיקת קיום שדות טופס נדרשים
export const validateFormFields = (
  requiredFields: string[],
  formSelector: string = 'form'
): { missingFields: string[]; foundFields: string[] } => {
  const foundFields: string[] = [];
  const missingFields: string[] = [];
  
  requiredFields.forEach(field => {
    const selectors = [
      `input[id="${field}"]`,
      `textarea[id="${field}"]`,
      `select[id="${field}"]`,
      `input[name="${field}"]`,
      `textarea[name="${field}"]`,
      `select[name="${field}"]`,
      `[data-testid="${field}"]`
    ];
    
    const fieldFound = selectors.some(selector => 
      document.querySelector(`${formSelector} ${selector}`)
    );
    
    if (fieldFound) {
      foundFields.push(field);
    } else {
      missingFields.push(field);
    }
  });
  
  return { missingFields, foundFields };
};

// יצירת תוצאת בדיקה סטנדרטית
export const createTestResult = (
  context: TestContext,
  success: boolean,
  details: string,
  errorDetails?: {
    location?: string;
    suggestedFix?: string;
    formName?: string;
    components?: string[];
    severity?: 'low' | 'medium' | 'high' | 'critical';
  }
): TestResult => {
  return {
    id: context.testId,
    name: context.testName,
    status: success ? 'passed' : 'failed',
    timestamp: context.timestamp,
    details,
    errorLocation: errorDetails?.location,
    suggestedFix: errorDetails?.suggestedFix,
    formName: errorDetails?.formName,
    errorCode: success ? undefined : `ERR_${context.testId.toUpperCase()}_${Date.now()}`,
    testedRoute: context.targetRoute
  };
};

// פונקציה לבדיקת נגישות בסיסית
export const validateAccessibility = (): {
  ariaElements: number;
  imagesWithAlt: number;
  totalImages: number;
  screenReaderElements: number;
  score: number;
} => {
  const ariaElements = document.querySelectorAll('[aria-label], [aria-labelledby], [role]').length;
  const imagesWithAlt = document.querySelectorAll('img[alt]').length;
  const totalImages = document.querySelectorAll('img').length;
  const screenReaderElements = document.querySelectorAll('.sr-only').length;
  
  let score = 0;
  if (ariaElements >= 5) score += 30;
  if (totalImages === 0 || imagesWithAlt / totalImages >= 0.8) score += 30;
  if (screenReaderElements > 0) score += 20;
  if (ariaElements >= 10) score += 20;
  
  return {
    ariaElements,
    imagesWithAlt,
    totalImages,
    screenReaderElements,
    score
  };
};

// פונקציה לבדיקת ביצועים בסיסיים
export const checkPerformanceBasics = (): {
  domElements: number;
  imagesCount: number;
  scriptsCount: number;
  isHeavy: boolean;
} => {
  const domElements = document.querySelectorAll('*').length;
  const imagesCount = document.querySelectorAll('img').length;
  const scriptsCount = document.querySelectorAll('script').length;
  
  const isHeavy = domElements > 1000 || imagesCount > 20 || scriptsCount > 10;
  
  return {
    domElements,
    imagesCount,
    scriptsCount,
    isHeavy
  };
};

// פונקציות בדיקה ספציפיות - יישום מלא
export const testBookingForms = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
  const requiredFields = ['fullName', 'email', 'phone', 'eventDate'];
  const validation = validateFormFields(requiredFields);
  
  if (validation.missingFields.length > 0) {
    return {
      success: false,
      details: {
        errorLocation: `טופס הזמנה (${context.targetRoute})`,
        specificIssue: `שדות חובה חסרים: ${validation.missingFields.join(', ')}`,
        suggestedFix: 'יש להוסיף את השדות החסרים לטופס ההזמנה',
        formName: 'טופס הזמנת שירות',
        affectedComponents: ['BookingForm', 'CustomerDetailsForm'],
        severity: 'high'
      }
    };
  }
  
  return { success: true, details: null };
};

export const testProviderRegistration = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
  const onboardingContainer = checkElementExists('.onboarding-container', 'onboarding-container');
  
  if (!onboardingContainer.found) {
    return {
      success: false,
      details: {
        errorLocation: `הרשמת ספק (${context.targetRoute})`,
        specificIssue: 'קונטיינר הרשמה לא נמצא',
        suggestedFix: 'יש לוודא שרכיב OnboardingContainer נטען כראוי',
        formName: 'טופס הרשמת ספק',
        affectedComponents: ['OnboardingContainer'],
        severity: 'critical'
      }
    };
  }
  
  return { success: true, details: null };
};

export const testSearchFilters = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
  const searchInput = checkElementExists('input[type="search"]', 'search-input');
  const filterElements = document.querySelectorAll('.filter-option, [data-testid*="filter"]');
  
  if (!searchInput.found || filterElements.length === 0) {
    return {
      success: false,
      details: {
        errorLocation: `מסנני חיפוש (${context.targetRoute})`,
        specificIssue: 'מסנני חיפוש או שדה חיפוש לא נמצאו',
        suggestedFix: 'יש לוודא שרכיבי החיפוש והמסננים נטענים כראוי',
        formName: 'מערכת חיפוש ומסננים',
        affectedComponents: ['SearchFilters', 'AutocompleteSearch'],
        severity: 'medium'
      }
    };
  }
  
  return { success: true, details: null };
};

export const testNavigation = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
  const navigationLinks = document.querySelectorAll('nav a, [role="navigation"] a');
  const brokenLinks: string[] = [];
  
  navigationLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('javascript:')) {
      brokenLinks.push(link.textContent || 'קישור ללא טקסט');
    }
  });
  
  if (brokenLinks.length > 0) {
    return {
      success: false,
      details: {
        errorLocation: `ניווט (${context.targetRoute})`,
        specificIssue: `נמצאו קישורים לא תקינים: ${brokenLinks.join(', ')}`,
        suggestedFix: 'יש לתקן את הקישורים השבורים בתפריט הניווט',
        formName: 'מערכת ניווט',
        affectedComponents: ['Header', 'Navigation'],
        severity: 'medium'
      }
    };
  }
  
  return { success: true, details: null };
};

export const testAccessibility = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
  const accessibilityResults = validateAccessibility();
  
  if (accessibilityResults.score < 50) {
    return {
      success: false,
      details: {
        errorLocation: `נגישות (${context.targetRoute})`,
        specificIssue: `ציון נגישות נמוך: ${accessibilityResults.score}/100`,
        suggestedFix: 'יש להוסיף aria-labels, alt texts ואלמנטי נגישות נוספים',
        formName: 'מערכת נגישות',
        affectedComponents: ['AccessibilityEnhancer'],
        severity: 'high'
      }
    };
  }
  
  return { success: true, details: null };
};

export const testPerformance = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
  const performanceResults = checkPerformanceBasics();
  
  if (performanceResults.isHeavy) {
    return {
      success: false,
      details: {
        errorLocation: `ביצועים (${context.targetRoute})`,
        specificIssue: `עמוד כבד: ${performanceResults.domElements} אלמנטים`,
        suggestedFix: 'יש לשקול אופטימיזציה של העמוד והפחתת מספר האלמנטים',
        formName: 'מערכת ביצועים',
        affectedComponents: ['PerformanceOptimizer'],
        severity: 'medium'
      }
    };
  }
  
  return { success: true, details: null };
};

export const testDataIntegrity = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
  const dataElements = document.querySelectorAll('[data-testid*="service"], .service-card, .provider-card');
  
  if (dataElements.length === 0) {
    return {
      success: false,
      details: {
        errorLocation: `שלמות נתונים (${context.targetRoute})`,
        specificIssue: 'לא נמצאו אלמנטי מידע (שירותים/ספקים)',
        suggestedFix: 'יש לוודא שהנתונים נטענים כראוי מהשרת',
        formName: 'מערכת נתונים',
        affectedComponents: ['DataLoader', 'ServiceCard'],
        severity: 'high'
      }
    };
  }
  
  return { success: true, details: null };
};

// פונקציה לקבלת צבע לפי חומרת שגיאה
export const getSeverityColor = (severity: 'low' | 'medium' | 'high' | 'critical'): string => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 border-red-300 text-red-800';
    case 'high':
      return 'bg-orange-100 border-orange-300 text-orange-800';
    case 'medium':
      return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    case 'low':
      return 'bg-blue-100 border-blue-300 text-blue-800';
    default:
      return 'bg-gray-100 border-gray-300 text-gray-800';
  }
};
