
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Database, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const AutoSystemInitializer: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState('');
  const [results, setResults] = useState<{
    categoriesFound: number;
    subcategoriesFound: number;
    conceptsFound: number;
    errors: string[];
  }>({ categoriesFound: 0, subcategoriesFound: 0, conceptsFound: 0, errors: [] });
  const { toast } = useToast();

  const initializeSystem = async () => {
    setIsInitializing(true);
    setStatus('running');
    setProgress(0);
    setResults({ categoriesFound: 0, subcategoriesFound: 0, conceptsFound: 0, errors: [] });

    try {
      setCurrentStep('בודק קטגוריות קיימות...');
      setProgress(25);

      // בדיקת קטגוריות
      const { data: categories, error: categoryError } = await supabase
        .from('categories')
        .select('id, name')
        .order('order_index');

      if (categoryError) {
        throw new Error(`שגיאה בשליפת קטגוריות: ${categoryError.message}`);
      }

      setResults(prev => ({ ...prev, categoriesFound: categories?.length || 0 }));
      setCurrentStep('בודק תתי קטגוריות...');
      setProgress(50);

      // בדיקת תתי קטגוריות
      const { data: subcategories, error: subcategoryError } = await supabase
        .from('subcategories')
        .select('id, name, category_id')
        .order('order_index');

      if (subcategoryError) {
        throw new Error(`שגיאה בשליפת תתי קטגוריות: ${subcategoryError.message}`);
      }

      setResults(prev => ({ ...prev, subcategoriesFound: subcategories?.length || 0 }));
      setCurrentStep('בודק קונספטים...');
      setProgress(75);
      
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
        description: `נמצאו: ${categories?.length} קטגוריות, ${subcategories?.length} תתי קטגוריות`,
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

  const isSystemReady = () => {
    return results.categoriesFound >= 6 && 
           results.subcategoriesFound >= 20 &&
           results.conceptsFound >= 4;
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          בדיקת מערכת תכל'ס
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-blue-200 bg-blue-50">
          <Database className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>מערכת חדשה:</strong> בדיקת מבנה ללא חטיבות - קטגוריות ותתי קטגוריות
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
                <div>📁 {results.categoriesFound} קטגוריות נמצאו (צפוי: 6+)</div>
                <div>📂 {results.subcategoriesFound} תתי קטגוריות נמצאו (צפוי: 20+)</div>
                <div>🎯 {results.conceptsFound} קונספטים נמצאו (צפוי: 4+)</div>
                <div className="font-bold mt-3">
                  {isSystemReady() ? 
                    '✅ המערכת מוכנה לשימוש!' : 
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

        <div className="flex justify-center">
          <Button 
            onClick={initializeSystem}
            disabled={isInitializing}
            variant={isSystemReady() ? "default" : "outline"}
          >
            {isInitializing ? 'בודק...' : 'בדוק מערכת'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoSystemInitializer;
