
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
  
  // חישוב ציון נגישות בסיסי
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
  
  // סף בסיסי לזיהוי עמוד "כבד"
  const isHeavy = domElements > 1000 || imagesCount > 20 || scriptsCount > 10;
  
  return {
    domElements,
    imagesCount,
    scriptsCount,
    isHeavy
  };
};
