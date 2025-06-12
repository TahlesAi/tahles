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
  TestContext,
  TestDetails,
  testBookingForms,
  testProviderRegistration,
  testSearchFilters,
  testNavigation,
  testAccessibility,
  testPerformance,
  testDataIntegrity,
  getSeverityColor
} from '@/utils/testHelpers';
import { 
  simulateUserJourney,
  testDynamicComponentRendering,
  testErrorHandlingScenarios,
  generateTestReport,
  TestReport,
  IntegrationTestResult
} from '@/utils/integrationTestHelpers';
import { allIntegrationJourneys } from '@/utils/integrationTestScenarios';

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

const TestsManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTestDetails, setSelectedTestDetails] = useState<TestDetails | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [integrationResults, setIntegrationResults] = useState<IntegrationTestResult[]>([]);
  const [testReport, setTestReport] = useState<TestReport | null>(null);
  const [showIntegrationDetails, setShowIntegrationDetails] = useState(false);

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
    },
    {
      id: 'integration-onboarding',
      name: 'אינטגרציה: הרשמת ספק מלאה',
      description: 'בדיקת זרימה מלאה של תהליך הרשמת ספק',
      category: 'Integration' as const,
      icon: Users,
      color: 'text-emerald-600',
      route: '/provider-onboarding'
    },
    {
      id: 'integration-search-booking',
      name: 'אינטגרציה: מחיפוש להזמנה',
      description: 'תהליך מלא מחיפוש שירות ועד להזמנה',
      category: 'Integration' as const,
      icon: Zap,
      color: 'text-cyan-600',
      route: '/search'
    },
    {
      id: 'complex-dynamic-content',
      name: 'רנדור מורכב: תוכן דינמי',
      description: 'בדיקת רכיבים דינמיים, מחירים וזמינות',
      category: 'UI' as const,
      icon: RefreshCw,
      color: 'text-teal-600',
      route: '/'
    },
    {
      id: 'error-handling-scenarios',
      name: 'תסריטי שגיאה ו־fallback',
      description: 'בדיקת התמודדות עם שגיאות והתאוששות',
      category: 'Data' as const,
      icon: AlertTriangle,
      color: 'text-amber-600',
      route: '/'
    }
  ];

  const performTestOnCorrectPage = async (testId: string, targetRoute: string): Promise<{ success: boolean; details: TestDetails | null }> => {
    console.log(`🧪 מתחיל בדיקה מתקדמת: ${testId} בנתיב: ${targetRoute}`);
    
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
      case 'integration-onboarding':
        return await testIntegrationOnboarding(context);
      case 'integration-search-booking':
        return await testIntegrationSearchBooking(context);
      case 'complex-dynamic-content':
        return await testComplexDynamicContent(context);
      case 'error-handling-scenarios':
        return await testErrorHandlingComplexScenarios(context);
      default:
        return { success: true, details: null };
    }
  };

  const testIntegrationOnboarding = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
    const onboardingJourney = allIntegrationJourneys.find(j => j.id === 'provider-onboarding-full');
    
    if (!onboardingJourney) {
      return {
        success: false,
        details: {
          errorLocation: `תסריט אינטגרציה (${context.targetRoute})`,
          specificIssue: 'תסריט הרשמת ספק לא נמצא',
          suggestedFix: 'יש לוודא שתסריטי האינטגרציה מוגדרים נכון',
          formName: 'אינטגרציה הרשמת ספק',
          affectedComponents: ['OnboardingContainer', 'IntegrationTests'],
          severity: 'high'
        }
      };
    }

    try {
      const result = await simulateUserJourney(onboardingJourney);
      setIntegrationResults(prev => [...prev, result]);
      
      if (!result.overallSuccess) {
        const failedStepName = result.stepResults[result.failedStep! - 1]?.name || 'שלב לא ידוע';
        return {
          success: false,
          details: {
            errorLocation: `שלב ${result.failedStep}: ${failedStepName}`,
            specificIssue: `תהליך האינטגרציה נכשל בשלב ${result.failedStep}`,
            suggestedFix: 'יש לבדוק את התקינות של השלב הכושל ולוודא שהרכיבים נטענים כראוי',
            formName: 'תהליך הרשמת ספק',
            affectedComponents: ['OnboardingContainer', 'OnboardingPersonalInfo'],
            severity: 'high'
          }
        };
      }

      console.log(`✅ אינטגרציה הרשמת ספק: ${result.stepResults.length} שלבים הושלמו בזמן ${result.totalDuration}ms`);
      return { success: true, details: null };
      
    } catch (error) {
      return {
        success: false,
        details: {
          errorLocation: `מערכת אינטגרציה (${context.targetRoute})`,
          specificIssue: `שגיאה בביצוע תסריט אינטגרציה: ${error}`,
          suggestedFix: 'יש לבדוק את יומן הקונסול לפרטים נוספים',
          formName: 'מערכת בדיקות אינטגרציה',
          affectedComponents: ['IntegrationTestSystem'],
          severity: 'critical'
        }
      };
    }
  };

  const testIntegrationSearchBooking = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
    const searchJourney = allIntegrationJourneys.find(j => j.id === 'search-to-booking-full');
    
    if (!searchJourney) {
      return {
        success: false,
        details: {
          errorLocation: `תסריט חיפוש-הזמנה (${context.targetRoute})`,
          specificIssue: 'תסריט חיפוש להזמנה לא נמצא',
          suggestedFix: 'יש לוודא שתסריטי האינטגרציה מוגדרים נכון',
          formName: 'אינטגרציה חיפוש-הזמנה',
          affectedComponents: ['SearchPage', 'BookingPage'],
          severity: 'high'
        }
      };
    }

    try {
      const result = await simulateUserJourney(searchJourney);
      setIntegrationResults(prev => [...prev, result]);
      
      if (!result.overallSuccess) {
        return {
          success: false,
          details: {
            errorLocation: `תהליך חיפוש-הזמנה שלב ${result.failedStep}`,
            specificIssue: `נכשל בשלב ${result.failedStep} מתוך ${result.stepResults.length}`,
            suggestedFix: 'יש לבדוק את רכיבי החיפוש והניתוב להזמנה',
            formName: 'זרימת חיפוש-הזמנה',
            affectedComponents: ['SearchResults', 'ServiceResultCard', 'BookingForm'],
            severity: 'high'
          }
        };
      }

      console.log(`✅ אינטגרציה חיפוש-הזמנה הושלמה בהצלחה`);
      return { success: true, details: null };
      
    } catch (error) {
      return {
        success: false,
        details: {
          errorLocation: `מערכת חיפוש-הזמנה (${context.targetRoute})`,
          specificIssue: `שגיאה בתסריט חיפוש-הזמנה: ${error}`,
          suggestedFix: 'יש לבדוק את חיבור בין רכיבי החיפוש וההזמנה',
          formName: 'מערכת חיפוש-הזמנה',
          affectedComponents: ['SearchPage', 'BookingPage'],
          severity: 'critical'
        }
      };
    }
  };

  const testComplexDynamicContent = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
    try {
      const dynamicResults = await testDynamicComponentRendering();
      
      const successfulComponents = Object.values(dynamicResults).filter(Boolean).length;
      const totalComponents = Object.keys(dynamicResults).length;
      
      if (successfulComponents < totalComponents * 0.5) {
        return {
          success: false,
          details: {
            errorLocation: `רכיבים דינמיים (${context.targetRoute})`,
            specificIssue: `רק ${successfulComponents}/${totalComponents} רכיבים דינמיים פועלים`,
            suggestedFix: 'יש לוודא שרכיבי wishlist, דירוגים, טיימרים ומחירים נטענים כראוי',
            formName: 'מערכת רכיבים דינמיים',
            affectedComponents: ['WishlistManager', 'RatingDisplay', 'BookingTimer', 'PriceDisplay'],
            severity: 'medium'
          }
        };
      }

      console.log(`✅ רכיבים דינמיים: ${successfulComponents}/${totalComponents} פועלים`);
      return { success: true, details: null };
      
    } catch (error) {
      return {
        success: false,
        details: {
          errorLocation: `מערכת רנדור דינמי (${context.targetRoute})`,
          specificIssue: `שגיאה בבדיקת רכיבים דינמיים: ${error}`,
          suggestedFix: 'יש לבדוק את רכיבי התוכן הדינמי',
          formName: 'מערכת רנדור דינמי',
          affectedComponents: ['DynamicContent'],
          severity: 'medium'
        }
      };
    }
  };

  const testErrorHandlingComplexScenarios = async (context: TestContext): Promise<{ success: boolean; details: TestDetails | null }> => {
    try {
      const errorResults = await testErrorHandlingScenarios();
      
      const handledScenarios = Object.values(errorResults).filter(Boolean).length;
      const totalScenarios = Object.keys(errorResults).length;
      
      if (handledScenarios < totalScenarios * 0.75) {
        return {
          success: false,
          details: {
            errorLocation: `מערכת שגיאות (${context.targetRoute})`,
            specificIssue: `רק ${handledScenarios}/${totalScenarios} תסריטי שגיאה מטופלים`,
            suggestedFix: 'יש לשפר את מערכת הטיפול בשגיאות והודעות משתמש',
            formName: 'מערכת טיפול בשגיאות',
            affectedComponents: ['ErrorBoundary', 'ServiceErrorState', 'FormValidation'],
            severity: 'high'
          }
        };
      }

      console.log(`✅ טיפול בשגיאות: ${handledScenarios}/${totalScenarios} תסריטים מטופלים`);
      return { success: true, details: null };
      
    } catch (error) {
      return {
        success: false,
        details: {
          errorLocation: `מערכת טיפול בשגיאות (${context.targetRoute})`,
          specificIssue: `שגיאה בבדיקת תסריטי שגיאות: ${error}`,
          suggestedFix: 'יש לבדוק את רכיבי הטיפול בשגיאות',
          formName: 'מערכת שגיאות',
          affectedComponents: ['ErrorHandling'],
          severity: 'critical'
        }
      };
    }
  };

  const generateComprehensiveReport = () => {
    const report = generateTestReport(testResults);
    setTestReport(report);
    console.log('📊 דוח מערכת נוצר:', report);
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
    console.log('🚀 מתחיל ריצת כלל הבדיקות המתקדמות');
    
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  בדיקות מתקדמות + אינטגרציה
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
                      מריץ כלל הבדיקות + אינטגרציה...
                    </>
                  ) : (
                    '🚀 הרץ בדיקות מלאות + דוח מקיף'
                  )}
                </Button>
                
                <Button 
                  onClick={generateComprehensiveReport}
                  variant="outline"
                  className="w-full"
                >
                  📊 צור דוח בדיקות מקיף
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  תוצאות + אינטגרציה
                  {integrationResults.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowIntegrationDetails(!showIntegrationDetails)}
                    >
                      {showIntegrationDetails ? 'הסתר' : 'הצג'} פרטי אינטגרציה
                    </Button>
                  )}
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
                
                {showIntegrationDetails && integrationResults.length > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold mb-2">📋 פרטי בדיקות אינטגרציה</h4>
                    {integrationResults.map((result, index) => (
                      <div key={index} className="mb-3 p-2 bg-white rounded border">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">
                            {result.overallSuccess ? '✅' : '❌'} 
                            {result.stepResults.length} שלבים
                          </span>
                          <span className="text-xs text-gray-500">
                            {result.totalDuration}ms
                          </span>
                        </div>
                        {result.failedStep && (
                          <div className="text-sm text-red-600">
                            נכשל בשלב {result.failedStep}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>📊 סטטיסטיקות מתקדמות + דוח מערכת</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
                <div>
                  <div className="font-medium">ציון ביצועים</div>
                  <div className="text-2xl font-bold text-blue-600">{testReport?.performanceScore}</div>
                </div>
                <div>
                  <div className="font-medium">ציון נגישות</div>
                  <div className="text-2xl font-bold text-green-600">{testReport?.accessibilityScore}</div>
                </div>
                <div>
                  <div className="font-medium">בדיקות אינטגרציה</div>
                  <div className="text-2xl font-bold text-purple-600">{testReport?.integrationTests}</div>
                </div>
                <div>
                  <div className="font-medium">בעיות קריטיות</div>
                  <div className="text-2xl font-bold text-red-600">{testReport?.criticalIssues.length}</div>
                </div>
              </div>
              
              {testReport && (
                <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold mb-3">📋 דוח מערכת מקיף</h4>
                  {testReport.criticalIssues.length > 0 && (
                    <div className="mt-4 p-3 bg-red-50 rounded border border-red-200">
                      <div className="font-medium text-red-800 mb-2">⚠️ בעיות קריטיות:</div>
                      <ul className="text-sm text-red-700 space-y-1">
                        {testReport.criticalIssues.map((issue, index) => (
                          <li key={index}>• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {testReport.recommendations.length > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                      <div className="font-medium text-yellow-800 mb-2">💡 המלצות:</div>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {testReport.recommendations.map((rec, index) => (
                          <li key={index}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

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
