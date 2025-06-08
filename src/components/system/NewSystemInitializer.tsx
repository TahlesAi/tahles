
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Database, Loader2, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const NewSystemInitializer: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState('');
  const [results, setResults] = useState<{
    divisionsFound: number;
    categoriesFound: number;
    subcategoriesFound: number;
    conceptsFound: number;
    errors: string[];
  }>({ divisionsFound: 0, categoriesFound: 0, subcategoriesFound: 0, conceptsFound: 0, errors: [] });
  const { toast } = useToast();

  const checkSystemStatus = async () => {
    setIsInitializing(true);
    setStatus('running');
    setProgress(0);
    setResults({ divisionsFound: 0, categoriesFound: 0, subcategoriesFound: 0, conceptsFound: 0, errors: [] });

    try {
      setCurrentStep('בודק חטיבות קיימות...');
      setProgress(25);

      // בדיקת חטיבות
      const { data: divisions, error: divisionError } = await supabase
        .from('divisions')
        .select('id, name')
        .order('order_index');

      if (divisionError) {
        throw new Error(`שגיאה בשליפת חטיבות: ${divisionError.message}`);
      }

      setResults(prev => ({ ...prev, divisionsFound: divisions?.length || 0 }));
      setCurrentStep('בודק קטגוריות...');
      setProgress(50);

      // בדיקת קטגוריות
      const { data: categories, error: categoryError } = await supabase
        .from('categories')
        .select('id, name, division_id')
        .order('order_index');

      if (categoryError) {
        throw new Error(`שגיאה בשליפת קטגוריות: ${categoryError.message}`);
      }

      setResults(prev => ({ ...prev, categoriesFound: categories?.length || 0 }));
      setCurrentStep('בודק תתי קטגוריות...');
      setProgress(75);

      // בדיקת תתי קטגוריות
      const { data: subcategories, error: subcategoryError } = await supabase
        .from('subcategories')
        .select('id, name, category_id')
        .order('order_index');

      if (subcategoryError) {
        throw new Error(`שגיאה בשליפת תתי קטגוריות: ${subcategoryError.message}`);
      }

      setResults(prev => ({ ...prev, subcategoriesFound: subcategories?.length || 0 }));
      
      // בדיקת קונספטים
      const { data: concepts, error: conceptError } = await supabase
        .from('concepts')
        .select('id, name')
        .eq('is_active', true);

      if (conceptError) {
        throw new Error(`שגיאה בשליפת קונספטים: ${conceptError.message}`);
      }

      setResults(prev => ({ ...prev, conceptsFound: concepts?.length || 0 }));
      setProgress(100);
      setCurrentStep('השלמה בהצלחה!');
      setStatus('success');
      
      toast({
        title: "בדיקת המערכת הושלמה בהצלחה!",
        description: `נמצאו: ${divisions?.length} חטיבות, ${categories?.length} קטגוריות, ${subcategories?.length} תתי קטגוריות`,
      });

    } catch (error) {
      console.error('Error checking system:', error);
      setStatus('error');
      setResults(prev => ({
        ...prev,
        errors: [...prev.errors, `שגיאה כללית: ${error}`]
      }));
      
      toast({
        title: "שגיאה בבדיקת המערכת",
        description: "אנא נסה שוב או פנה לתמיכה טכנית",
        variant: "destructive"
      });
    } finally {
      setIsInitializing(false);
    }
  };

  // בדיקה אוטומטית בטעינה
  useEffect(() => {
    checkSystemStatus();
  }, []);

  const isSystemReady = () => {
    return results.divisionsFound === 5 && 
           results.categoriesFound === 12 && 
           results.subcategoriesFound >= 80 &&
           results.conceptsFound >= 4;
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          בדיקת מערכת תכל'ס החדשה
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-blue-200 bg-blue-50">
          <Settings className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>בדיקת מערכת:</strong> בודק את המבנה החדש עם 5 חטיבות ו-86 תתי קטגוריות
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
          <Alert className={`${isSystemReady() ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
            <CheckCircle className={`h-4 w-4 ${isSystemReady() ? 'text-green-600' : 'text-yellow-600'}`} />
            <AlertDescription className={isSystemReady() ? 'text-green-800' : 'text-yellow-800'}>
              <strong>תוצאות בדיקה:</strong>
              <div className="mt-2 space-y-1">
                <div>📊 {results.divisionsFound} חטיבות נמצאו (צפוי: 5)</div>
                <div>📁 {results.categoriesFound} קטגוריות נמצאו (צפוי: 12)</div>
                <div>📂 {results.subcategoriesFound} תתי קטגוריות נמצאו (צפוי: 86)</div>
                <div>🎯 {results.conceptsFound} קונספטים נמצאו (צפוי: 4+)</div>
                <div className="font-bold mt-3">
                  {isSystemReady() ? 
                    '✅ המערכת החדשה מוכנה לשימוש!' : 
                    '⚠️ המערכת טעונה השלמה'}
                </div>
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
          <h4 className="font-medium mb-2">המבנה החדש של תכל'ס:</h4>
          <div className="space-y-2 text-sm">
            <div><strong>הפקות</strong> - 4 קטגוריות, 55 תתי קטגוריות</div>
            <div><strong>העשרה</strong> - 2 קטגוריות, 16 תתי קטגוריות</div>
            <div><strong>מתנות</strong> - 2 קטגוריות, 7 תתי קטגוריות</div>
            <div><strong>כרטיסים</strong> - 3 קטגוריות, 12 תתי קטגוריות</div>
            <div><strong>טיולים</strong> - 2 קטגוריות, 13 תתי קטגוריות</div>
            <div className="pt-2 border-t font-bold text-blue-600">
              סה"כ: 5 חטיבות, 13 קטגוריות, 103 תתי קטגוריות
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={checkSystemStatus}
            disabled={isInitializing}
            variant={isSystemReady() ? "default" : "outline"}
          >
            {isInitializing ? 'בודק...' : 'רענן בדיקה'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewSystemInitializer;
