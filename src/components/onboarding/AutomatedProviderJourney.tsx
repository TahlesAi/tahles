
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Play, 
  RotateCcw,
  User,
  Building,
  Tag,
  Package,
  Calendar,
  DollarSign,
  Eye,
  Rocket
} from 'lucide-react';

interface JourneyStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'pending' | 'running' | 'success' | 'failed';
  duration?: number;
  errorMessage?: string;
  details?: string;
}

interface AutomatedProviderJourneyProps {
  onComplete: (results: JourneyResults) => void;
  onStepUpdate?: (step: number, status: string) => void;
}

interface JourneyResults {
  overallSuccess: boolean;
  completedSteps: number;
  totalSteps: number;
  failedSteps: string[];
  providerData: any;
  duration: number;
}

const AutomatedProviderJourney: React.FC<AutomatedProviderJourneyProps> = ({
  onComplete,
  onStepUpdate
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [journeyResults, setJourneyResults] = useState<JourneyResults | null>(null);

  const initialSteps: JourneyStep[] = [
    {
      id: 1,
      title: "אימות SMS",
      description: "אימות מספר טלפון עם קוד SMS",
      icon: User,
      status: 'pending'
    },
    {
      id: 2,
      title: "פרטי עסק",
      description: "הזנת פרטי עסק ואיש קשר",
      icon: Building,
      status: 'pending'
    },
    {
      id: 3,
      title: "בחירת קטגוריה",
      description: "בחירת קטגוריה ותת-קטגוריה",
      icon: Tag,
      status: 'pending'
    },
    {
      id: 4,
      title: "הוספת מוצר ראשון",
      description: "יצירת מוצר '8 שקרים' לנטע ברסלר",
      icon: Package,
      status: 'pending'
    },
    {
      id: 5,
      title: "שיוך לקונספטים",
      description: "הגדרת קונספטי אירועים רלוונטיים",
      icon: Tag,
      status: 'pending'
    },
    {
      id: 6,
      title: "הגדרת זמינות",
      description: "יצירת יומן ושעות פעילות",
      icon: Calendar,
      status: 'pending'
    },
    {
      id: 7,
      title: "הגדרת מחיר",
      description: "קביעת מחיר ותנאי תשלום",
      icon: DollarSign,
      status: 'pending'
    },
    {
      id: 8,
      title: "תצוגה מקדימה",
      description: "אישור פרטי הספק והמוצר",
      icon: Eye,
      status: 'pending'
    },
    {
      id: 9,
      title: "פרסום למערכת",
      description: "הפעלת הספק במערכת",
      icon: Rocket,
      status: 'pending'
    }
  ];

  const [steps, setSteps] = useState<JourneyStep[]>(initialSteps);

  // נתוני דמה של נטע ברסלר
  const mockProviderData = {
    // שלב 1: אימות SMS
    phone: "050-1234567",
    smsCode: "1234",
    
    // שלב 2: פרטי עסק
    businessName: "נטע ברסלר - אומן החושים",
    contactPerson: "נטע ברסלר",
    email: "neta.bresler@example.com",
    city: "תל אביב",
    address: "רחוב הרצל 15, תל אביב",
    businessId: "123456789",
    
    // שלב 3: קטגוריה
    primaryCategory: "cat-008", // אומני חושים
    subcategory: "mentalism",
    
    // שלב 4: מוצר ראשון
    firstProduct: {
      name: "8 שקרים",
      description: "מופע מרתק של קריאת מחשבות ואמת מול שקר. נטע ברסלר מציגה 8 טענות על עצמה, 7 מהן שקרים ואחת אמת - הקהל צריך לנחש איזו האמת!",
      duration: "45 דקות",
      audienceSize: "20-100 אנשים",
      price: 2500,
      priceUnit: "לאירוע",
      setupTime: 15,
      features: [
        "אינטראקציה עם הקהל",
        "מתאים לכל הגילאים",
        "ללא צורך בציוד מיוחד",
        "מופע בעברית"
      ]
    },
    
    // שלב 5: קונספטים
    concepts: [
      "יום הולדת",
      "אירועי חברה", 
      "ערב גיבוש",
      "בר מצווה",
      "בת מצווה"
    ],
    
    // שלב 6: זמינות
    availability: {
      workingDays: ["ראשון", "שני", "שלישי", "רביעי", "חמישי"],
      workingHours: {
        start: "18:00",
        end: "23:00"
      },
      advanceNotice: 7 // ימים
    },
    
    // שלב 7: מחיר
    pricing: {
      basePrice: 2500,
      currency: "₪",
      travelFee: 200,
      maxTravelDistance: 50
    }
  };

  const updateStepStatus = useCallback((stepId: number, status: JourneyStep['status'], errorMessage?: string, details?: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, status, errorMessage, details, duration: status === 'success' ? Math.floor(Math.random() * 1000) + 500 : undefined }
        : step
    ));
    
    if (onStepUpdate) {
      onStepUpdate(stepId, status);
    }
  }, [onStepUpdate]);

  const simulateStep = async (stepId: number): Promise<boolean> => {
    const step = steps.find(s => s.id === stepId);
    if (!step) return false;

    updateStepStatus(stepId, 'running');
    
    // סימולציה של זמן ביצוע
    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 1500) + 500));
    
    // סימולציה של הצלחה/כישלון (95% הצלחה)
    const success = Math.random() > 0.05;
    
    if (success) {
      let details = '';
      switch (stepId) {
        case 1:
          details = `SMS נשלח ל-${mockProviderData.phone}, קוד אומת בהצלחה`;
          break;
        case 2:
          details = `עסק "${mockProviderData.businessName}" נרשם בהצלחה`;
          break;
        case 3:
          details = 'נבחרה קטגוריה: אומני חושים';
          break;
        case 4:
          details = `מוצר "${mockProviderData.firstProduct.name}" נוצר בהצלחה`;
          break;
        case 5:
          details = `${mockProviderData.concepts.length} קונספטים נבחרו`;
          break;
        case 6:
          details = `יומן הוגדר: ${mockProviderData.availability.workingDays.length} ימי עבודה`;
          break;
        case 7:
          details = `מחיר בסיס: ${mockProviderData.pricing.basePrice}₪`;
          break;
        case 8:
          details = 'פרטי הספק אושרו לפרסום';
          break;
        case 9:
          details = 'הספק פעיל במערכת ומוכן לקבל הזמנות';
          break;
      }
      updateStepStatus(stepId, 'success', undefined, details);
      return true;
    } else {
      const errorMessages = [
        'שגיאת תקשורת עם השרת',
        'נתונים לא תקינים',
        'שגיאה בשמירת המידע',
        'בעיית רשת זמנית'
      ];
      updateStepStatus(stepId, 'failed', errorMessages[Math.floor(Math.random() * errorMessages.length)]);
      return false;
    }
  };

  const runAutomatedJourney = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setJourneyResults(null);
    
    // איפוס כל השלבים
    setSteps(initialSteps);
    
    const startTime = Date.now();
    let completedSteps = 0;
    const failedSteps: string[] = [];
    
    for (let i = 1; i <= 9; i++) {
      setCurrentStep(i);
      const success = await simulateStep(i);
      
      if (success) {
        completedSteps++;
      } else {
        failedSteps.push(`שלב ${i}: ${steps.find(s => s.id === i)?.title}`);
        break; // עצירה בשלב הכישלון
      }
    }
    
    const duration = Date.now() - startTime;
    const overallSuccess = completedSteps === 9;
    
    const results: JourneyResults = {
      overallSuccess,
      completedSteps,
      totalSteps: 9,
      failedSteps,
      providerData: mockProviderData,
      duration
    };
    
    setJourneyResults(results);
    setIsRunning(false);
    setCurrentStep(0);
    
    onComplete(results);
  };

  const resetJourney = () => {
    setSteps(initialSteps);
    setCurrentStep(0);
    setJourneyResults(null);
    setIsRunning(false);
  };

  const getStepIcon = (step: JourneyStep) => {
    const IconComponent = step.icon;
    
    switch (step.status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'running':
        return <Clock className="h-5 w-5 text-blue-600 animate-spin" />;
      default:
        return <IconComponent className="h-5 w-5 text-gray-400" />;
    }
  };

  const progress = steps.filter(s => s.status === 'success').length / steps.length * 100;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>מסע הצטרפות ספק אוטומטי - נטע ברסלר</span>
          <Badge variant="outline">
            {journeyResults ? 
              (journeyResults.overallSuccess ? 'הושלם בהצלחה' : 'נכשל') :
              (isRunning ? 'רץ כעת...' : 'מוכן להפעלה')
            }
          </Badge>
        </CardTitle>
        <Progress value={progress} className="mt-2" />
        <p className="text-sm text-gray-600">
          מוצר לדוגמה: "8 שקרים" - מופע אומן חושים של נטע ברסלר
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* כפתורי פקדה */}
        <div className="flex gap-2 mb-6">
          <Button 
            onClick={runAutomatedJourney}
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            {isRunning ? 'רץ כעת...' : 'הפעל מסע אוטומטי'}
          </Button>
          
          <Button 
            variant="outline"
            onClick={resetJourney}
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            איפוס
          </Button>
        </div>

        {/* תוצאות כלליות */}
        {journeyResults && (
          <Alert className={journeyResults.overallSuccess ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
            <AlertDescription>
              <div className="flex justify-between items-center">
                <span>
                  <strong>תוצאה:</strong> {journeyResults.completedSteps}/{journeyResults.totalSteps} שלבים הושלמו
                </span>
                <span className="text-sm text-gray-600">
                  זמן ביצוע: {(journeyResults.duration / 1000).toFixed(1)} שניות
                </span>
              </div>
              {journeyResults.failedSteps.length > 0 && (
                <div className="mt-2">
                  <strong>שלבים שנכשלו:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {journeyResults.failedSteps.map((step, index) => (
                      <li key={index} className="text-red-700">{step}</li>
                    ))}
                  </ul>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* רשימת השלבים */}
        <div className="space-y-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                currentStep === step.id 
                  ? 'border-blue-300 bg-blue-50' 
                  : step.status === 'success'
                  ? 'border-green-200 bg-green-50'
                  : step.status === 'failed'
                  ? 'border-red-200 bg-red-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex-shrink-0">
                {getStepIcon(step)}
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">שלב {step.id}: {step.title}</h3>
                  {step.duration && (
                    <Badge variant="outline" className="text-xs">
                      {step.duration}ms
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{step.description}</p>
                
                {step.details && (
                  <p className="text-sm text-green-700 mt-1">✓ {step.details}</p>
                )}
                
                {step.errorMessage && (
                  <p className="text-sm text-red-700 mt-1">✗ {step.errorMessage}</p>
                )}
              </div>
              
              <div className="flex-shrink-0">
                <Badge 
                  variant={
                    step.status === 'success' ? 'default' :
                    step.status === 'failed' ? 'destructive' :
                    step.status === 'running' ? 'secondary' : 'outline'
                  }
                  className="text-xs"
                >
                  {step.status === 'pending' ? 'ממתין' :
                   step.status === 'running' ? 'רץ' :
                   step.status === 'success' ? 'הצליח' : 'נכשל'}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* פרטי הספק שנוצר */}
        {journeyResults && journeyResults.overallSuccess && (
          <Card className="mt-6 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg text-green-800">פרטי הספק שנוצר</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>שם העסק:</strong> {mockProviderData.businessName}
                </div>
                <div>
                  <strong>איש קשר:</strong> {mockProviderData.contactPerson}
                </div>
                <div>
                  <strong>עיר:</strong> {mockProviderData.city}
                </div>
                <div>
                  <strong>טלפון:</strong> {mockProviderData.phone}
                </div>
                <div>
                  <strong>מוצר ראשון:</strong> {mockProviderData.firstProduct.name}
                </div>
                <div>
                  <strong>מחיר:</strong> {mockProviderData.pricing.basePrice}₪
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default AutomatedProviderJourney;
