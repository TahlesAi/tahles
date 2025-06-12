
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
  XCircle,
  Clock,
  RefreshCw,
  FileText,
  Users,
  Database,
  Layout,
  Eye,
  AlertTriangle,
  CheckSquare,
  Settings,
  X,
  ExternalLink
} from 'lucide-react';

interface TestResult {
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

  // בדיקות מוגדרות מראש עם נתיבים נכונים
  const availableTests = [
    {
      id: 'booking-forms',
      name: 'בדיקות טפסי הזמנה',
      description: 'בדיקת תקינות טפסי הזמנה וולידציה',
      category: 'Forms',
      icon: FileText,
      color: 'text-blue-600',
      route: '/booking/neta-bresler-mentalist'
    },
    {
      id: 'provider-registration',
      name: 'בדיקות הרשמת ספקים',
      description: 'בדיקת תהליך הרשמה של ספקים חדשים',
      category: 'Forms',
      icon: Users,
      color: 'text-green-600',
      route: '/provider-onboarding'
    },
    {
      id: 'search-filters',
      name: 'בדיקות מסנני חיפוש',
      description: 'בדיקת תקינות כל מסנני החיפוש',
      category: 'UI',
      icon: Settings,
      color: 'text-purple-600',
      route: '/search'
    },
    {
      id: 'navigation',
      name: 'בדיקות ניווט',
      description: 'בדיקת כל הקישורים והנתיבים',
      category: 'Navigation',
      icon: Layout,
      color: 'text-orange-600',
      route: '/'
    },
    {
      id: 'accessibility',
      name: 'בדיקות נגישות',
      description: 'בדיקת תקינות נגישות האתר',
      category: 'Accessibility',
      icon: CheckSquare,
      color: 'text-indigo-600',
      route: '/'
    },
    {
      id: 'data-integrity',
      name: 'בדיקות שלמות נתונים',
      description: 'בדיקת תקינות המידע והחיבורים',
      category: 'Data',
      icon: Database,
      color: 'text-red-600',
      route: '/provider/neta-bresler'
    }
  ];

  // פונקציה לביצוע בדיקה אמיתית בעמוד הנכון
  const performRealTestOnCorrectPage = async (testId: string, targetRoute: string): Promise<{ success: boolean; details: TestDetails | null }> => {
    // ניווט לעמוד הנכון
    navigate(targetRoute);
    
    // המתנה קצרה לטעינת העמוד
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    switch (testId) {
      case 'booking-forms':
        // בדיקת טופס הזמנה בעמוד /booking/neta-bresler-mentalist
        const bookingForm = document.querySelector('[data-testid="booking-form"]') || 
                           document.querySelector('form');
        
        const requiredFields = [
          'serviceName', 'eventDate', 'eventTime', 'customerName', 
          'customerEmail', 'customerPhone', 'customerAddress', 'customerCity'
        ];
        
        const foundFields = requiredFields.filter(field => 
          document.querySelector(`input[id="${field}"]`) || 
          document.querySelector(`textarea[id="${field}"]`) ||
          document.querySelector(`select[id="${field}"]`) ||
          document.querySelector(`input[name="${field}"]`) ||
          document.querySelector(`textarea[name="${field}"]`) ||
          document.querySelector(`select[name="${field}"]`)
        );
        
        const missingFields = requiredFields.filter(field => !foundFields.includes(field));
        
        if (!bookingForm || missingFields.length > 0) {
          return {
            success: false,
            details: {
              errorLocation: `דף הזמנה (${targetRoute})`,
              specificIssue: `טופס הזמנה לא נמצא או חסרים שדות: ${missingFields.join(', ')}`,
              suggestedFix: 'יש לוודא שהטופס נטען בעמוד /booking/[serviceId] ומכיל את כל השדות הנדרשים',
              formName: 'טופס הזמנת שירות',
              affectedComponents: ['BookingPage', 'BookingForm'],
              severity: 'high'
            }
          };
        }
        return { success: true, details: null };

      case 'provider-registration':
        // בדיקת טופס הרשמת ספק בעמוד /provider-onboarding
        const onboardingContainer = document.querySelector('.onboarding-container') ||
                                  document.querySelector('[data-testid="onboarding"]');
        const progressElement = document.querySelector('[role="progressbar"]');
        const stepElements = document.querySelectorAll('[role="tab"]');
        
        if (!onboardingContainer || !progressElement || stepElements.length < 3) {
          return {
            success: false,
            details: {
              errorLocation: `דף הרשמת ספק (${targetRoute})`,
              specificIssue: 'רכיבי הרשמה לא נטענו, חסר progress bar או מספר שלבים לא מספיק',
              suggestedFix: 'יש לוודא שרכיב OnboardingContainer נטען בעמוד /provider-onboarding',
              formName: 'טופס הרשמת ספק חדש',
              affectedComponents: ['OnboardingContainer', 'OnboardingPersonalInfo', 'OnboardingBusinessProfile'],
              severity: 'high'
            }
          };
        }
        return { success: true, details: null };

      case 'search-filters':
        // בדיקת מסנני חיפוש בעמוד /search
        const searchFilters = document.querySelector('[data-testid="search-filters"]');
        const filterButtons = document.querySelectorAll('.filter-button, button[aria-pressed]');
        const priceSlider = document.querySelector('[role="slider"]');
        
        if (!searchFilters || filterButtons.length < 4 || !priceSlider) {
          return {
            success: false,
            details: {
              errorLocation: `דף תוצאות חיפוש (${targetRoute})`,
              specificIssue: 'מסנני חיפוש לא נמצאו, מספר כפתורי סינון לא מספיק או חסר slider מחירים',
              suggestedFix: 'יש לוודא שרכיב SearchFilters נטען בעמוד /search',
              formName: 'מסנני חיפוש מתקדם',
              affectedComponents: ['SearchFilters', 'SearchResultsPage'],
              severity: 'medium'
            }
          };
        }
        return { success: true, details: null };

      case 'navigation':
        // בדיקת ניווט בדף הבית
        const headerNavigation = document.querySelector('header nav') || document.querySelector('header');
        const headerLinks = document.querySelectorAll('header a[href]');
        const footerLinks = document.querySelectorAll('footer a[href]');
        
        if (!headerNavigation || headerLinks.length < 3 || footerLinks.length < 3) {
          return {
            success: false,
            details: {
              errorLocation: `Header ורכיבי ניווט (${targetRoute})`,
              specificIssue: 'חסרים קישורי ניווט בHeader או Footer',
              suggestedFix: 'יש לוודא שה-Header וה-Footer מכילים מספר מספיק של קישורים פעילים',
              formName: 'מערכת ניווט ראשית',
              affectedComponents: ['Header', 'Footer', 'Navigation'],
              severity: 'medium'
            }
          };
        }
        return { success: true, details: null };

      case 'accessibility':
        // בדיקת נגישות כללית
        const accessibilityElements = document.querySelectorAll('[aria-label], [aria-labelledby], [role]');
        const imagesWithAlt = document.querySelectorAll('img[alt]');
        const totalImages = document.querySelectorAll('img');
        const srOnlyElements = document.querySelectorAll('.sr-only');
        
        if (accessibilityElements.length < 5 || 
            (totalImages.length > 0 && imagesWithAlt.length / totalImages.length < 0.8) ||
            srOnlyElements.length === 0) {
          return {
            success: false,
            details: {
              errorLocation: `נגישות כללית (${targetRoute})`,
              specificIssue: 'חסרים רכיבי נגישות חיוניים (ARIA labels, alt text, screen reader)',
              suggestedFix: 'יש לוודא שרכיב AccessibilityEnhancer פועל ומטפל בנגישות',
              formName: 'מערכת נגישות',
              affectedComponents: ['AccessibilityEnhancer', 'כלל הרכיבים'],
              severity: 'high'
            }
          };
        }
        return { success: true, details: null };

      case 'data-integrity':
        // בדיקת שלמות נתונים בדף ספק
        const providerData = document.querySelector('[data-provider-id], .provider-profile');
        const servicesDisplay = document.querySelectorAll('.service-card, [data-service]');
        
        if (!providerData || servicesDisplay.length === 0) {
          return {
            success: false,
            details: {
              errorLocation: `דף ספק (${targetRoute})`,
              specificIssue: 'נתוני ספק לא נטענו או חסרים שירותים',
              suggestedFix: 'יש לוודא שנתוני הספק נטענים בהצלחה',
              formName: 'מערכת נתוני ספקים',
              affectedComponents: ['ProviderProfile', 'ServiceCards'],
              severity: 'medium'
            }
          };
        }
        return { success: true, details: null };

      default:
        return { success: true, details: null };
    }
  };

  const runTest = async (testId: string) => {
    setIsRunning(true);
    
    const testInfo = availableTests.find(t => t.id === testId);
    if (!testInfo) {
      setIsRunning(false);
      return;
    }

    console.log(`🧪 מריץ בדיקה: ${testInfo.name} בנתיב: ${testInfo.route}`);
    
    try {
      // ביצוע הבדיקה בעמוד הנכון
      const testResult = await performRealTestOnCorrectPage(testId, testInfo.route);
      
      const newResult: TestResult = {
        id: testId,
        name: testInfo.name,
        status: testResult.success ? 'passed' : 'failed',
        timestamp: new Date().toLocaleString('he-IL'),
        details: testResult.success ? 'הבדיקה עברה בהצלחה ✅' : testResult.details?.specificIssue || 'נמצאו בעיות',
        errorLocation: testResult.details?.errorLocation,
        suggestedFix: testResult.details?.suggestedFix,
        formName: testResult.details?.formName,
        errorCode: testResult.success ? undefined : `ERR_${testId.toUpperCase()}_${Date.now()}`,
        testedRoute: testInfo.route
      };
      
      setTestResults(prev => [newResult, ...prev.slice(0, 9)]);
      
      // חזרה לדף הבדיקות
      navigate('/admin/tests');
      
    } catch (error) {
      console.error(`שגיאה בביצוע בדיקה ${testId}:`, error);
      
      const errorResult: TestResult = {
        id: testId,
        name: testInfo.name,
        status: 'failed',
        timestamp: new Date().toLocaleString('he-IL'),
        details: 'שגיאה בביצוע הבדיקה',
        errorCode: `ERR_${testId.toUpperCase()}_${Date.now()}`,
        testedRoute: testInfo.route
      };
      
      setTestResults(prev => [errorResult, ...prev.slice(0, 9)]);
      navigate('/admin/tests');
    }
    
    setIsRunning(false);
  };

  const runAllTests = async () => {
    console.log('🚀 מתחיל בריצת כל הבדיקות על העמודים הנכונים');
    
    for (const test of availableTests) {
      await runTest(test.id);
      // מעט עיכוב בין בדיקות
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('✅ סיום ריצת כל הבדיקות');
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
                כלי מפתח מתקדם
              </Badge>
            </div>
            
            <Alert className="mb-6 border-blue-200 bg-blue-50">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>🔧 מערכת בדיקות משודרגת:</strong> כל בדיקה כעת רצה על העמוד הרלוונטי בפועל - טפסי הזמנה ב-/booking, הרשמת ספקים ב-/provider-onboarding, מסנני חיפוש ב-/search ועוד
              </AlertDescription>
            </Alert>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* פאנל בדיקות זמינות */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  בדיקות זמינות
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
                      מריץ בדיקות...
                    </>
                  ) : (
                    'הרץ את כל הבדיקות'
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
                          הרץ
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* פאנל תוצאות */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  תוצאות אחרונות
                </CardTitle>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    עדיין לא הורצו בדיקות
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {result.status === 'passed' ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <div>
                            <h4 className="font-medium">{result.name}</h4>
                            <p className="text-sm text-gray-600">{result.details}</p>
                            {result.testedRoute && (
                              <p className="text-xs text-blue-600 font-mono">נבדק ב: {result.testedRoute}</p>
                            )}
                            {result.errorCode && (
                              <p className="text-xs text-red-500 font-mono">קוד שגיאה: {result.errorCode}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-left flex flex-col gap-2">
                          <Badge 
                            variant={result.status === 'passed' ? 'default' : 'destructive'}
                          >
                            {result.status === 'passed' ? 'עבר' : 'נכשל'}
                          </Badge>
                          {result.status === 'failed' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => openTestDetails(result)}
                              className="text-xs"
                            >
                              <Eye className="h-3 w-3 ml-1" />
                              צפה בפירוט
                            </Button>
                          )}
                          <p className="text-xs text-gray-500">{result.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* סטטיסטיקות */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>סטטיסטיקות בדיקות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {testResults.filter(r => r.status === 'passed').length}
                  </div>
                  <div className="text-sm text-green-700">בדיקות עברו</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {testResults.filter(r => r.status === 'failed').length}
                  </div>
                  <div className="text-sm text-red-700">בדיקות נכשלו</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {testResults.length}
                  </div>
                  <div className="text-sm text-blue-700">סך הכל בדיקות</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {testResults.length > 0 ? Math.round((testResults.filter(r => r.status === 'passed').length / testResults.length) * 100) : 0}%
                  </div>
                  <div className="text-sm text-purple-700">אחוז הצלחה</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modal לפירוט התקלות */}
        <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden" dir="rtl">
            <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
              <div>
                <DialogTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  פירוט תקלה מפורט
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600 mt-1">
                  מידע מפורט על התקלה שזוהתה
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
                      רמת חומרה
                    </h4>
                    <p className="text-sm">
                      {selectedTestDetails.severity === 'critical' ? '🔴 קריטית' : 
                       selectedTestDetails.severity === 'high' ? '🟠 גבוהה' :
                       selectedTestDetails.severity === 'medium' ? '🟡 בינונית' : '🔵 נמוכה'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Layout className="h-4 w-4" />
                      מיקום התקלה
                    </h4>
                    <p className="text-sm font-mono bg-white p-2 rounded border">
                      {selectedTestDetails.errorLocation}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-blue-800">
                      <FileText className="h-4 w-4" />
                      שם הטופס / רכיב
                    </h4>
                    <p className="text-sm text-blue-700 bg-white p-2 rounded border">
                      {selectedTestDetails.formName}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-red-800">
                      <XCircle className="h-4 w-4" />
                      בעיה ספציפית
                    </h4>
                    <p className="text-sm text-red-700 bg-white p-3 rounded border leading-relaxed">
                      {selectedTestDetails.specificIssue}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      תיקון מוצע
                    </h4>
                    <p className="text-sm text-green-700 bg-white p-3 rounded border leading-relaxed">
                      {selectedTestDetails.suggestedFix}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-purple-800">
                      <Settings className="h-4 w-4" />
                      רכיבים מושפעים
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
                סגור
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
