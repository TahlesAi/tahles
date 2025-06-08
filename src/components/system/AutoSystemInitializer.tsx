
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Database, Loader2, PlayCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Category {
  name: string;
  description: string;
  icon: string;
  subcategories: Array<{
    name: string;
    description: string;
  }>;
}

const COMPLETE_CATEGORIES_DATA: Category[] = [
  {
    name: 'לוקיישנים',
    description: 'מקומות לאירועים ופעילויות',
    icon: 'MapPin',
    subcategories: [
      { name: 'חללי עבודה משותפים', description: 'חללי עבודה משותפים לאירועים' },
      { name: 'חללי עבודה להשכרה', description: 'חללי עבודה להשכרה לאירועים' },
      { name: 'אולמות אירועים', description: 'אולמות מיוחדים לאירועים' },
      { name: 'לופטים', description: 'לופטים לאירועים פרטיים' },
      { name: 'וילות אירוח', description: 'וילות פרטיות לאירועים' },
      { name: 'מקומות ציבוריים', description: 'מקומות ציבוריים לאירועים' },
      { name: 'מתקני ספורט', description: 'מתקני ספורט לאירועים' },
      { name: 'ברים', description: 'ברים לאירועים פרטיים' },
      { name: 'מסעדות אירועים', description: 'מסעדות המתמחות באירועים' },
      { name: 'חדרים פרטיים', description: 'חדרים פרטיים לאירועים אינטימיים' },
      { name: 'חדרי ישיבות', description: 'חדרי ישיבות לאירועים עסקיים' },
      { name: 'טבע וחצר', description: 'אירועים בטבע ובחצר' },
      { name: 'ים וחוף', description: 'אירועים על חוף הים' },
      { name: 'קולנוע', description: 'בתי קולנוע לאירועים פרטיים' },
      { name: 'חדרי בריחה', description: 'חדרי בריחה לפעילויות גיבוש' },
      { name: 'חדרי קריוקי', description: 'חדרי קריוקי לאירועים' },
      { name: 'באולינג', description: 'מסלולי באולינג לאירועים' }
    ]
  },
  {
    name: 'מזון ומשקאות',
    description: 'אוכל ושתייה לכל אירוע',
    icon: 'Utensils',
    subcategories: [
      { name: 'קייטרינג בשרי', description: 'שירותי קייטרינג בשרי' },
      { name: 'קייטרינג חלבי', description: 'שירותי קייטרינג חלבי' },
      { name: 'קייטרינג טבעוני', description: 'שירותי קייטרינג טבעוני' },
      { name: 'שרותי בר', description: 'שרותי בר מקצועיים לאירועים' },
      { name: 'שף פרטי', description: 'שף פרטי לאירועים' },
      { name: 'פודטראקים', description: 'משאיות אוכל לאירועים' },
      { name: 'סדנאות אוכל', description: 'סדנאות בישול לאירועים' },
      { name: 'סדנאות קוקטיילים', description: 'סדנאות הכנת קוקטיילים' },
      { name: 'בתי קפה ניידים', description: 'בתי קפה ניידים לאירועים' },
      { name: 'עוגות ומאפים', description: 'עוגות ומאפים מיוחדים לאירועים' },
      { name: 'שוקולד ופרלינים', description: 'שוקולד ופרלינים מעוצבים' }
    ]
  },
  {
    name: 'מופעים ואמני במה',
    description: 'הופעות ואמנים לכל סוג אירוע',
    icon: 'Music',
    subcategories: [
      { name: 'אמני חושים', description: 'אמנים המתמחים בחושים' },
      { name: 'מנטליסטים', description: 'מנטליסטים לאירועים' },
      { name: 'קוסמים', description: 'קוסמים מקצועיים לאירועים' },
      { name: 'זמרים ונגנים', description: 'זמרים ונגנים לאירועים' },
      { name: 'להקות', description: 'להקות מוזיקליות לאירועים' },
      { name: 'סטנדאפיסטים', description: 'קומיקאים וסטנדאפיסטים' },
      { name: 'רקדנים', description: 'רקדנים מקצועיים לאירועים' },
      { name: 'קרקס', description: 'מופעי קרקס לאירועים' },
      { name: 'תיאטרון', description: 'מופעי תיאטרון לאירועים' },
      { name: 'תקליטנים', description: 'תקליטנים מקצועיים לאירועים' },
      { name: 'שירותי קריוקי', description: 'שירותי קריוקי מקצועיים' }
    ]
  },
  {
    name: 'טיולים ואטרקציות',
    description: 'חוויות בטבע ואטרקציות מיוחדות',
    icon: 'Mountain',
    subcategories: [
      { name: 'מקומות לינה', description: 'מקומות לינה לאירועים' },
      { name: 'אטרקציות', description: 'אטרקציות וחוויות מיוחדות' },
      { name: 'מדריכי טיולים', description: 'מדריכי טיולים מקצועיים' },
      { name: 'אבטחה', description: 'שירותי אבטחה לטיולים' },
      { name: 'הסעות', description: 'שירותי הסעות לטיולים' },
      { name: 'טרקטורונים', description: 'טרקטורונים לחוויות שטח' },
      { name: 'בלונים פורחים', description: 'טיסות בבלון פורח' },
      { name: 'ספורט ימי', description: 'פעילויות ספורט ימי' },
      { name: 'רכבל', description: 'נסיעות ברכבל' },
      { name: 'בלונים', description: 'בלונים לאירועים' }
    ]
  },
  {
    name: 'הרצאות והכשרות',
    description: 'תוכן מקצועי והעשרה',
    icon: 'GraduationCap',
    subcategories: [
      { name: 'העשרה', description: 'הרצאות והעשרה כללית' },
      { name: 'העצמה אישית', description: 'הרצאות והכשרות להעצמה אישית' },
      { name: 'למידה כללית', description: 'הרצאות למידה כללית' },
      { name: 'בטחוני', description: 'הרצאות והכשרות בטחוניות' },
      { name: 'פיננסי', description: 'הרצאות והכשרות פיננסיות' },
      { name: 'עבודת צוות', description: 'הרצאות ופעילויות עבודת צוות' },
      { name: 'יופי', description: 'הרצאות והכשרות יופי' },
      { name: 'תזונה', description: 'הרצאות והכשרות תזונה' },
      { name: 'שיפור ביצועים', description: 'הרצאות לשיפור ביצועים' },
      { name: 'עמידה מול מצלמה', description: 'הכשרות לעמידה מול מצלמה' },
      { name: 'סדנאות צחוק', description: 'סדנאות צחוק טיפולי' },
      { name: 'מחשבות', description: 'הרצאות פילוסופיות ומחשבתיות' },
      { name: 'זיכרון', description: 'הכשרות לשיפור הזיכרון' },
      { name: 'סדנאות שף', description: 'סדנאות בישול עם שף מקצועי' }
    ]
  },
  {
    name: 'שירותי הפקה',
    description: 'שירותים מקצועיים להפקת אירועים',
    icon: 'Settings',
    subcategories: [
      { name: 'מפיקים', description: 'מפיקי אירועים מקצועיים' },
      { name: 'שרותי רישוי', description: 'שירותי רישוי לאירועים' },
      { name: 'אבטחה', description: 'שירותי אבטחה לאירועים' },
      { name: 'כוח אדם', description: 'כוח אדם לאירועים' },
      { name: 'הגברה', description: 'שירותי הגברה מקצועיים' },
      { name: 'ציוד סאונד', description: 'ציוד סאונד מקצועי' },
      { name: 'אירוח', description: 'שירותי אירוח מקצועיים' },
      { name: 'פירוטכניקה', description: 'שירותי פירוטכניקה לאירועים' },
      { name: 'אישורי הגעה', description: 'מערכות לניהול אישורי הגעה' },
      { name: 'אירועי חוץ', description: 'שירותים מיוחדים לאירועי חוץ' },
      { name: 'קופות', description: 'שירותי קופות לאירועים' },
      { name: 'שירותים', description: 'שירותים ניידים לאירועים' },
      { name: 'צלמים', description: 'צלמי אירועים מקצועיים' },
      { name: 'עיצוב ודקורציה', description: 'עיצוב ודקורציה לאירועים' },
      { name: 'שרותי יח"צ', description: 'שירותי יחסי ציבור לאירועים' },
      { name: 'שרותי הנחיה', description: 'שירותי הנחיה מקצועיים' }
    ]
  },
  {
    name: 'מתנות וכרטיסים',
    description: 'מתנות, כרטיסים ותווי קניה',
    icon: 'Gift',
    subcategories: [
      { name: 'תווי קניה', description: 'תווי קניה לחנויות שונות' },
      { name: 'מתנות מעוצבות', description: 'מתנות מעוצבות אישיות' },
      { name: 'מתנות לידה', description: 'מתנות מיוחדות ללידה' },
      { name: 'כרטיסים לאירועים', description: 'כרטיסים לאירועים שונים' },
      { name: 'כרטיסים להצגות', description: 'כרטיסים להצגות תיאטרון' },
      { name: 'כרטיסים להופעות', description: 'כרטיסים להופעות מוזיקליות' },
      { name: 'מתנות פרישה', description: 'מתנות מיוחדות לפרישה' }
    ]
  }
];

const AutoSystemInitializer: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState('');
  const [results, setResults] = useState<{
    categoriesCreated: number;
    subcategoriesCreated: number;
    errors: string[];
  }>({ categoriesCreated: 0, subcategoriesCreated: 0, errors: [] });
  const { toast } = useToast();

  const initializeCompleteSystem = async () => {
    setIsInitializing(true);
    setStatus('running');
    setProgress(0);
    setResults({ categoriesCreated: 0, subcategoriesCreated: 0, errors: [] });

    try {
      // שליפת החטיבה הראשית
      const { data: divisions, error: divisionError } = await supabase
        .from('divisions')
        .select('id')
        .eq('name', 'תכל\'ס הפקות ומתנות')
        .single();

      if (divisionError || !divisions) {
        throw new Error('לא נמצאה החטיבה הראשית');
      }

      const divisionId = divisions.id;
      const totalSteps = COMPLETE_CATEGORIES_DATA.length * 2;
      let currentStepIndex = 0;

      for (const categoryData of COMPLETE_CATEGORIES_DATA) {
        // יצירת קטגוריה
        setCurrentStep(`יוצר קטגוריה: ${categoryData.name}`);
        
        const { data: newCategory, error: categoryError } = await supabase
          .from('categories')
          .insert({
            name: categoryData.name,
            description: categoryData.description,
            icon: categoryData.icon,
            division_id: divisionId,
            is_active: true,
            order_index: currentStepIndex
          })
          .select('id')
          .single();

        if (categoryError) {
          setResults(prev => ({
            ...prev,
            errors: [...prev.errors, `שגיאה ביצירת קטגוריה ${categoryData.name}: ${categoryError.message}`]
          }));
          continue;
        }

        const categoryId = newCategory.id;
        setResults(prev => ({ ...prev, categoriesCreated: prev.categoriesCreated + 1 }));

        currentStepIndex++;
        setProgress((currentStepIndex / totalSteps) * 100);

        // יצירת תתי קטגוריות
        setCurrentStep(`יוצר תתי קטגוריות עבור: ${categoryData.name}`);
        
        for (let i = 0; i < categoryData.subcategories.length; i++) {
          const subcat = categoryData.subcategories[i];
          
          const { error: subcatError } = await supabase
            .from('subcategories')
            .insert({
              name: subcat.name,
              description: subcat.description,
              category_id: categoryId,
              is_active: true,
              order_index: i
            });

          if (subcatError) {
            setResults(prev => ({
              ...prev,
              errors: [...prev.errors, `שגיאה ביצירת תת קטגוריה ${subcat.name}: ${subcatError.message}`]
            }));
          } else {
            setResults(prev => ({ ...prev, subcategoriesCreated: prev.subcategoriesCreated + 1 }));
          }
        }

        currentStepIndex++;
        setProgress((currentStepIndex / totalSteps) * 100);
      }

      setStatus('success');
      setCurrentStep('הושלם בהצלחה!');
      
      toast({
        title: "אתחול המערכת הושלם בהצלחה!",
        description: `נוצרו ${results.categoriesCreated} קטגוריות ו-${results.subcategoriesCreated} תתי קטגוריות`,
      });

    } catch (error) {
      console.error('Error initializing system:', error);
      setStatus('error');
      setResults(prev => ({
        ...prev,
        errors: [...prev.errors, `שגיאה כללית: ${error}`]
      }));
      
      toast({
        title: "שגיאה באתחול המערכת",
        description: "אנא נסה שוב או פנה לתמיכה טכנית",
        variant: "destructive"
      });
    } finally {
      setIsInitializing(false);
    }
  };

  // אתחול אוטומטי מיד כשהקומפוננט נטען
  useEffect(() => {
    initializeCompleteSystem();
  }, []);

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          אתחול מערכת תכל'ס - אוטומטי
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-blue-200 bg-blue-50">
          <PlayCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>מערכת באתחול:</strong> יוצרת את כל הקטגוריות ותתי הקטגוריות של תכל'ס הפקות
          </AlertDescription>
        </Alert>

        {isInitializing && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm font-medium">{currentStep}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>התקדמות</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {status === 'success' && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>הושלם בהצלחה!</strong>
              <div className="mt-2 space-y-1">
                <div>✅ {results.categoriesCreated} קטגוריות נוצרו</div>
                <div>✅ {results.subcategoriesCreated} תתי קטגוריות נוצרו</div>
                <div className="font-bold">המערכת מוכנה לשימוש!</div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {results.errors.length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>שגיאות שזוהו:</strong>
              <ul className="mt-2 space-y-1">
                {results.errors.map((error, index) => (
                  <li key={index} className="text-sm">• {error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="border rounded-lg p-4 bg-gray-50">
          <h4 className="font-medium mb-2">מה יווצר במערכת:</h4>
          <div className="space-y-2 text-sm">
            {COMPLETE_CATEGORIES_DATA.map((cat, index) => (
              <div key={index}>
                <strong>{cat.name}</strong> - {cat.subcategories.length} תתי קטגוריות
              </div>
            ))}
            <div className="pt-2 border-t font-bold text-blue-600">
              סה"כ: {COMPLETE_CATEGORIES_DATA.length} קטגוריות ו-{COMPLETE_CATEGORIES_DATA.reduce((sum, cat) => sum + cat.subcategories.length, 0)} תתי קטגוריות
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoSystemInitializer;
