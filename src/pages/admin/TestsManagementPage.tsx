import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { 
  TestTube,
  Play,
  CheckCircle,
  RefreshCw,
  FileText,
  Users,
  Database,
  Layout,
  AlertTriangle,
  CheckSquare,
  Settings,
  X,
  ExternalLink,
  Zap,
  Shield
} from 'lucide-react';
import TestStatusIndicator from '@/components/admin/TestStatusIndicator';
import { 
  waitForPageLoad, 
  checkElementExists, 
  validateFormFields,
  createTestResult,
  validateAccessibility,
  checkPerformanceBasics,
  TestContext
} from '@/utils/testHelpers';

export interface TestResult {
  id: string;
  name: string;
  status: 'passed' | 'failed';
  timestamp: string;
  details: string;
  errorLocation?: string;
  suggestedFix?: string;
  formName?: string;
  errorCode?: string;
  testedRoute?: string;
}

interface TestDetails {
  errorLocation: string;
  specificIssue: string;
  suggestedFix: string;
  formName: string;
  affectedComponents: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const TestsManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTestDetails, setSelectedTestDetails] = useState<TestDetails | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // בדיקות מוגדרות מראש עם test-ids יציבים
  const availableTests = [
    {
      id: 'booking-forms',
      name: 'בדיקות טפסי הזמנה',
      description: 'בדיקת תקינות טפסי הזמנה וולידציה',
      category: 'Forms' as const,
      icon: FileText,
      color: 'text-blue-600',
      route: '/booking/neta-bresler-mentalist'
    },
    {
      id: 'provider-registration',
      name: 'בדיקות הרשמת ספקים',
      description: 'בדיקת תהליך הרשמה של ספקים חדשים',
      category: 'Forms' as const,
      icon: Users,
      color: 'text-green-600',
      route: '/provider-onboarding'
    },
    {
      id: 'search-filters',
      name: 'בדיקות מסנני חיפוש',
      description: 'בדיקת תקינות כל מסנני החיפוש',
      category: 'UI' as const,
      icon: Settings,
      color: 'text-purple-600',
      route: '/search'
    },
    {
      id: 'navigation',
      name: 'בדיקות ניווט',
      description: 'בדיקת כל הקישורים והנתיבים',
      category: 'Navigation' as const,
      icon: Layout,
      color: 'text-orange-600',
      route: '/'
    },
    {
      id: 'accessibility',
      name: 'בדיקות נגישות',
      description: 'בדיקת תקינות נגישות האתר',
      category: 'Accessibility' as const,
      icon: Shield,
      color: 'text-indigo-600',
      route: '/'
    },
    {
      id: 'performance',
      name: 'בדיקות ביצועים',
      description: 'בדיקת מהירות טעינה וביצועים',
      category: 'Performance' as const,
      icon: Zap,
      color: 'text-yellow-600',
      route: '/'
    },
    {
      id: 'data-integrity',
      name: 'בדיקות שלמות נתונים',
      description: 'בדיקת תקינות המידע והחיבורים',
      category: 'Data' as const,
      icon: Database,
      color: 'text-red-600',
      route: '/provider/neta-bresler'
    }
  ];

  // פונקציה מאוחדת לביצוע בדיקות עם שימוש בפונקציות העזר
  const performTestOnCorrectPage = async (testId: string, targetRoute: string): Promise<{ success: boolean; details: TestDetails | null }> => {
    console.log(`🧪 מתחיל בדיקה: ${testId} בנתיב: ${targetRoute}`);
    
    // ניווט לעמוד הנכון
    navigate(targetRoute);
    await waitForPageLoad(1500);
    
    const context: TestContext = {
      testId,
      testName: availableTests.find(t => t.id === testId)?.name || testId,
      targetRoute,
      timestamp: new Date().toLocaleString('he-IL')
    };
    
    switch (testId) {
      case 'booking-forms':
        return await testBookingForms(context);
      case 'provider-registration':
        return await testProviderRegistration(context);
      case 'search-filters':
        return await testSearchFilters(context);
      case 'navigation':
        return await testNavigation(context);
      case 'accessibility':
        return await testAccessibility(context);
      case 'performance':
        return await testPerformance(context);
      case 'data-integrity':
        return await testDataIntegrity(context);
      default:
        return { success: true, details: null };
    }
  };

  // בדיקת טפסי הזמנה משופרת
  const testBookingForms = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
    const requiredFields = [
      'serviceName', 'eventDate', 'eventTime', 'customerName', 
      'customerEmail', 'customerPhone', 'customerAddress', 'customerCity'
    ];
    
    // בדיקת קיום טופס עם test-id או selector כללי
    const formCheck = checkElementExists('form', 'booking-form', 'טופס הזמנה');
    
    if (!formCheck.found) {
      return {
        success: false,
        details: {
          errorLocation: `דף הזמנה (${context.targetRoute})`,
          specificIssue: 'טופס הזמנה לא נמצא בעמוד',
          suggestedFix: 'יש לוודא שקומפוננט BookingForm נטען בעמוד /booking/[serviceId] עם data-testid="booking-form"',
          formName: 'טופס הזמנת שירות',
          affectedComponents: ['BookingPage', 'BookingForm'],
          severity: 'high'
        }
      };
    }

    // בדיקת שדות נדרשים
    const fieldsValidation = validateFormFields(requiredFields);
    
    if (fieldsValidation.missingFields.length > 0) {
      return {
        success: false,
        details: {
          errorLocation: `טופס הזמנה (${context.targetRoute})`,
          specificIssue: `חסרים שדות נדרשים: ${fieldsValidation.missingFields.join(', ')}`,
          suggestedFix: 'יש להוסיף את השדות החסרים לטופס ההזמנה',
          formName: 'טופס הזמנת שירות',
          affectedComponents: ['BookingForm', 'CustomerDetailsForm'],
          severity: 'high'
        }
      };
    }

    console.log(`✅ טופס הזמנה: נמצאו ${fieldsValidation.foundFields.length} שדות מתוך ${requiredFields.length}`);
    return { success: true, details: null };
  };

  // בדיקת הרשמת ספקים משופרת
  const testProviderRegistration = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
    // בדיקת קיום container עיקרי
    const containerCheck = checkElementExists('.onboarding-container', 'onboarding', 'מכולת הרשמה');
    
    if (!containerCheck.found) {
      return {
        success: false,
        details: {
          errorLocation: `דף הרשמת ספק (${context.targetRoute})`,
          specificIssue: 'מכולת ההרשמה לא נטענה',
          suggestedFix: 'יש לוודא שקומפוננט OnboardingContainer נטען עם className="onboarding-container"',
          formName: 'טופס הרשמת ספק חדש',
          affectedComponents: ['OnboardingContainer'],
          severity: 'high'
        }
      };
    }

    // בדיקת progress bar
    const progressCheck = checkElementExists('[role="progressbar"]');
    const stepsCheck = checkElementExists('[role="tab"]');
    
    if (!progressCheck.found || !stepsCheck.found) {
      return {
        success: false,
        details: {
          errorLocation: `דף הרשמת ספק (${context.targetRoute})`,
          specificIssue: 'חסרים רכיבי התקדמות או שלבים',
          suggestedFix: 'יש לוודא שה-Progress Bar והשלבים מוגדרים עם role="progressbar" ו-role="tab"',
          formName: 'מערכת הרשמת ספקים',
          affectedComponents: ['OnboardingContainer', 'ProgressTracker'],
          severity: 'medium'
        }
      };
    }

    console.log('✅ הרשמת ספקים: כל הרכיבים נטענו בהצלחה');
    return { success: true, details: null };
  };

  const testSearchFilters = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
    const filtersCheck = checkElementExists('[data-testid="search-filters"]', 'search-filters', 'מסנני חיפוש');
    
    if (!filtersCheck.found) {
      return {
        success: false,
        details: {
          errorLocation: `דף חיפוש (${context.targetRoute})`,
          specificIssue: 'רכיב מסנני החיפוש לא נמצא',
          suggestedFix: 'יש לוודא שקומפוננט SearchFilters נטען עם data-testid="search-filters"',
          formName: 'מסנני חיפוש מתקדם',
          affectedComponents: ['SearchFilters', 'SearchPage'],
          severity: 'medium'
        }
      };
    }

    const filterButtons = document.querySelectorAll('.filter-button, button[aria-pressed]');
    const priceSlider = document.querySelector('[role="slider"]');
    
    if (filterButtons.length < 4 || !priceSlider) {
      return {
        success: false,
        details: {
          errorLocation: `מסנני חיפוש (${context.targetRoute})`,
          specificIssue: 'מספר לא מספיק של כפתורי סינון או חסר slider מחירים',
          suggestedFix: 'יש לוודא שיש לפחות 4 כפתורי סינון ו-slider למחירים',
          formName: 'מסנני חיפוש',
          affectedComponents: ['SearchFilters'],
          severity: 'medium'
        }
      };
    }

    console.log('✅ מסנני חיפוש: כל הרכיבים פעילים');
    return { success: true, details: null };
  };

  const testNavigation = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
    const headerCheck = checkElementExists('header nav, header', 'header-navigation', 'ניווט header');
    
    if (!headerCheck.found) {
      return {
        success: false,
        details: {
          errorLocation: `Header (${context.targetRoute})`,
          specificIssue: 'Header או ניווט לא נמצאו',
          suggestedFix: 'יש לוודא שקומפוננט Header נטען עם תג nav',
          formName: 'מערכת ניווט ראשית',
          affectedComponents: ['Header', 'Navigation'],
          severity: 'medium'
        }
      };
    }

    const headerLinks = document.querySelectorAll('header a[href]');
    const footerLinks = document.querySelectorAll('footer a[href]');
    
    if (headerLinks.length < 3 || footerLinks.length < 3) {
      return {
        success: false,
        details: {
          errorLocation: `ניווט ראשי (${context.targetRoute})`,
          specificIssue: 'מספר לא מספיק של קישורי ניווט',
          suggestedFix: 'יש לוודא שה-Header וה-Footer מכילים לפחות 3 קישורים כל אחד',
          formName: 'מערכת ניווט',
          affectedComponents: ['Header', 'Footer'],
          severity: 'medium'
        }
      };
    }

    console.log('✅ ניווט: כל הקישורים פעילים');
    return { success: true, details: null };
  };

  const testAccessibility = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
    const accessibilityData = validateAccessibility();
    
    if (accessibilityData.score < 60) {
      return {
        success: false,
        details: {
          errorLocation: `נגישות כללית (${context.targetRoute})`,
          specificIssue: `ציון נגישות נמוך: ${accessibilityData.score}/100`,
          suggestedFix: 'יש לשפר רכיבי נגישות: ARIA labels, alt text, screen reader support',
          formName: 'מערכת נגישות',
          affectedComponents: ['AccessibilityEnhancer', 'כלל הרכיבים'],
          severity: 'high'
        }
      };
    }

    console.log(`✅ נגישות: ציון ${accessibilityData.score}/100`);
    return { success: true, details: null };
  };

  const testPerformance = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
    const performanceData = checkPerformanceBasics();
    
    if (performanceData.isHeavy) {
      return {
        success: false,
        details: {
          errorLocation: `ביצועים (${context.targetRoute})`,
          specificIssue: `עמוד כבד: ${performanceData.domElements} אלמנטים, ${performanceData.imagesCount} תמונות`,
          suggestedFix: 'יש לשקול lazy loading, פיצול רכיבים או אופטימיזציה',
          formName: 'מערכת ביצועים',
          affectedComponents: ['כלל הרכיבים'],
          severity: 'medium'
        }
      };
    }

    console.log('✅ ביצועים: העמוד אופטימלי');
    return { success: true, details: null };
  };

  const testDataIntegrity = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
    const providerCheck = checkElementExists('[data-provider-id], .provider-profile', 'provider-profile', 'פרופיל ספק');
    
    if (!providerCheck.found) {
      return {
        success: false,
        details: {
          errorLocation: `דף ספק (${context.targetRoute})`,
          specificIssue: 'נתוני ספק לא נטענו',
          suggestedFix: 'יש לוודא שנתוני הספק נטענים ומוצגים נכון',
          formName: 'מערכת נתוני ספקים',
          affectedComponents: ['ProviderProfile'],
          severity: 'medium'
        }
      };
    }

    const servicesCheck = document.querySelectorAll('.service-card, [data-service]');
    
    if (servicesCheck.length === 0) {
      return {
        success: false,
        details: {
          errorLocation: `שירותי ספק (${context.targetRoute})`,
          specificIssue: 'לא נמצאו שירותים לספק',
          suggestedFix: 'יש לוודא שרשימת השירותים נטענת ומוצגת',
          formName: 'שירותי ספק',
          affectedComponents: ['ServiceCards'],
          severity: 'medium'
        }
      };
    }

    console.log('✅ שלמות נתונים: כל המידע נטען בהצלחה');
    return { success: true, details: null };
  };

  const runTest = async (testId: string) => {
    setIsRunning(true);
    
    const testInfo = availableTests.find(t => t.id === testId);
    if (!testInfo) {
      setIsRunning(false);
      return;
    }

    console.log(`🚀 מריץ בדיקה משופרת: ${testInfo.name}`);
    
    try {
      const testResult = await performTestOnCorrectPage(testId, testInfo.route);
      
      const context: TestContext = {
        testId,
        testName: testInfo.name,
        targetRoute: testInfo.route,
        timestamp: new Date().toLocaleString('he-IL')
      };
      
      const newResult = createTestResult(
        context,
        testResult.success,
        testResult.success ? 'הבדיקה עברה בהצלחה ✅' : testResult.details?.specificIssue || 'נמצאו בעיות',
        testResult.details ? {
          location: testResult.details.errorLocation,
          suggestedFix: testResult.details.suggestedFix,
          formName: testResult.details.formName,
          components: testResult.details.affectedComponents,
          severity: testResult.details.severity
        } : undefined
      );
      
      setTestResults(prev => [newResult, ...prev.slice(0, 9)]);
      navigate('/admin/tests');
      
    } catch (error) {
      console.error(`❌ שגיאה בבדיקה ${testId}:`, error);
      
      const context: TestContext = {
        testId,
        testName: testInfo.name,
        targetRoute: testInfo.route,
        timestamp: new Date().toLocaleString('he-IL')
      };
      
      const errorResult = createTestResult(
        context,
        false,
        'שגיאה בביצוע הבדיקה',
        {
          location: `מערכת הבדיקות (${testInfo.route})`,
          suggestedFix: 'יש לבדוק את יומן הקונסול לפרטים נוספים',
          formName: 'מערכת בדיקות',
          components: ['TestsManagementPage'],
          severity: 'high'
        }
      );
      
      setTestResults(prev => [errorResult, ...prev.slice(0, 9)]);
      navigate('/admin/tests');
    }
    
    setIsRunning(false);
  };

  const runAllTests = async () => {
    console.log('🚀 מתחיל ריצת כלל הבדיקות המשופרות');
    
    for (const test of availableTests) {
      await runTest(test.id);
      await waitForPageLoad(500);
    }
    
    console.log('✅ סיום ריצת כלל הבדיקות');
  };

  const openTestDetails = (result: TestResult) => {
    if (result.status === 'failed') {
      setSelectedTestDetails({
        errorLocation: result.errorLocation || 'מיקום לא מזוהה',
        specificIssue: result.details,
        suggestedFix: result.suggestedFix || 'יש לבדוק את הקוד ידנית',
        formName: result.formName || 'רכיב לא מזוהה',
        affectedComponents: ['רכיב עיקרי'],
        severity: 'medium'
      });
      setIsDetailsModalOpen(true);
    }
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedTestDetails(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8" dir="rtl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <TestTube className="h-8 w-8 text-red-600" />
              <h1 className="text-3xl font-bold">🧪 ניהול בדיקות המערכת</h1>
              <Badge variant="outline" className="bg-red-100 text-red-800">
                מערכת מתקדמת v2.0
              </Badge>
            </div>
            
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>🔧 מערכת משופרת:</strong> בדיקות אופטימליות עם פונקציות עזר, test-ids יציבים, ודיווח מפורט על ביצועים ונגישות
              </AlertDescription>
            </Alert>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* פאנל בדיקות זמינות */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  בדיקות מתקדמות זמינות
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={runAllTests} 
                  disabled={isRunning}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin ml-2" />
                      מריץ כלל הבדיקות...
                    </>
                  ) : (
                    '🚀 הרץ את כלל הבדיקות המשופרות'
                  )}
                </Button>
                
                <div className="space-y-3">
                  {availableTests.map((test) => {
                    const IconComponent = test.icon;
                    return (
                      <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <IconComponent className={`h-5 w-5 ${test.color}`} />
                          <div>
                            <h4 className="font-medium">{test.name}</h4>
                            <p className="text-sm text-gray-600">{test.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{test.category}</Badge>
                              <Badge variant="secondary" className="text-xs">
                                <ExternalLink className="h-3 w-3 ml-1" />
                                {test.route}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => runTest(test.id)}
                          disabled={isRunning}
                          variant="outline"
                        >
                          🧪 הרץ
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* פאנל תוצאות משופר */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  תוצאות אחרונות
                </CardTitle>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    ⏳ עדיין לא הורצו בדיקות
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testResults.map((result, index) => {
                      const testInfo = availableTests.find(t => t.id === result.id);
                      return (
                        <div key={index} className="p-3 border rounded-lg">
                          <TestStatusIndicator
                            status={result.status}
                            testType={testInfo?.category || 'Data'}
                            onViewDetails={() => openTestDetails(result)}
                            showDetailsButton={result.status === 'failed'}
                            timestamp={result.timestamp}
                            errorCode={result.errorCode}
                            testedRoute={result.testedRoute}
                          />
                          <div className="mt-2">
                            <h4 className="font-medium text-sm">{result.name}</h4>
                            <p className="text-xs text-gray-600">{result.details}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* סטטיסטיקות משופרות */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>📊 סטטיסטיקות בדיקות מתקדמות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">
                    {testResults.filter(r => r.status === 'passed').length}
                  </div>
                  <div className="text-sm text-green-700">✅ עברו בהצלחה</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-red-600">
                    {testResults.filter(r => r.status === 'failed').length}
                  </div>
                  <div className="text-sm text-red-700">❌ נכשלו</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">
                    {testResults.length}
                  </div>
                  <div className="text-sm text-blue-700">🧪 סך הכל</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">
                    {testResults.length > 0 ? Math.round((testResults.filter(r => r.status === 'passed').length / testResults.length) * 100) : 0}%
                  </div>
                  <div className="text-sm text-purple-700">📈 אחוז הצלחה</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modal משופר לפירוט תקלות */}
        <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden" dir="rtl">
            <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
              <div>
                <DialogTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  🔍 פירוט תקלה מפורט
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600 mt-1">
                  מידע מפורט על התקלה שזוהתה במערכת המתקדמת
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={closeDetailsModal}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">סגור</span>
                </Button>
              </DialogClose>
            </DialogHeader>
            
            <ScrollArea className="max-h-[calc(90vh-120px)] overflow-auto">
              {selectedTestDetails && (
                <div className="space-y-6 p-1">
                  <div className={`p-4 rounded-lg border ${getSeverityColor(selectedTestDetails.severity)}`}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      🚨 רמת חומרה
                    </h4>
                    <p className="text-sm">
                      {selectedTestDetails.severity === 'critical' ? '🔴 קריטית - דורש טיפול מיידי' : 
                       selectedTestDetails.severity === 'high' ? '🟠 גבוהה - יש לטפל בהקדם' :
                       selectedTestDetails.severity === 'medium' ? '🟡 בינונית - יש לטפל בהמשך' : '🔵 נמוכה - לא דחוף'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Layout className="h-4 w-4" />
                      📍 מיקום התקלה
                    </h4>
                    <p className="text-sm font-mono bg-white p-2 rounded border">
                      {selectedTestDetails.errorLocation}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-blue-800">
                      <FileText className="h-4 w-4" />
                      🏷️ שם הטופס / רכיב
                    </h4>
                    <p className="text-sm text-blue-700 bg-white p-2 rounded border">
                      {selectedTestDetails.formName}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-red-800">
                      <AlertTriangle className="h-4 w-4" />
                      ❌ בעיה ספציפית
                    </h4>
                    <p className="text-sm text-red-700 bg-white p-3 rounded border leading-relaxed">
                      {selectedTestDetails.specificIssue}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      🔧 תיקון מוצע
                    </h4>
                    <p className="text-sm text-green-700 bg-white p-3 rounded border leading-relaxed">
                      {selectedTestDetails.suggestedFix}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-purple-800">
                      <Settings className="h-4 w-4" />
                      🛠️ רכיבים מושפעים
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedTestDetails.affectedComponents.map((component, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className="text-xs bg-white border-purple-300 text-purple-700"
                        >
                          {component}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </ScrollArea>
            
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={closeDetailsModal}>
                ✅ סגור
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default TestsManagementPage;
