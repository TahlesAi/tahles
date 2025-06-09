
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Database, RefreshCw, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface ComplianceResults {
  score: number;
  divisionsCount: number;
  categoriesCount: number;
  subcategoriesCount: number;
  conceptsCount: number;
  providersCount: number;
  servicesCount: number;
  servicesWithPrices: number;
  servicesWithImages: number;
  servicesWithAvailability: number;
  issues: string[];
  recommendations: string[];
}

const SystemComplianceChecker: React.FC = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<ComplianceResults | null>(null);
  const { toast } = useToast();

  const runComplianceCheck = async () => {
    setIsChecking(true);
    try {
      const results: ComplianceResults = {
        score: 0,
        divisionsCount: 0,
        categoriesCount: 0,
        subcategoriesCount: 0,
        conceptsCount: 0,
        providersCount: 0,
        servicesCount: 0,
        servicesWithPrices: 0,
        servicesWithImages: 0,
        servicesWithAvailability: 0,
        issues: [],
        recommendations: []
      };

      // בדיקת חטיבות
      const { data: divisions, error: divisionsError } = await supabase
        .from('divisions')
        .select('*')
        .eq('is_active', true);

      if (divisionsError) throw divisionsError;
      results.divisionsCount = divisions?.length || 0;

      // בדיקת קטגוריות
      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true);

      if (categoriesError) throw categoriesError;
      results.categoriesCount = categories?.length || 0;

      // בדיקת תתי קטגוריות
      const { data: subcategories, error: subcategoriesError } = await supabase
        .from('subcategories')
        .select('*')
        .eq('is_active', true);

      if (subcategoriesError) throw subcategoriesError;
      results.subcategoriesCount = subcategories?.length || 0;

      // בדיקת קונספטים
      const { data: concepts, error: conceptsError } = await supabase
        .from('concepts')
        .select('*')
        .eq('is_active', true);

      if (conceptsError) throw conceptsError;
      results.conceptsCount = concepts?.length || 0;

      // בדיקת ספקים
      const { data: providers, error: providersError } = await supabase
        .from('providers')
        .select('*');

      if (providersError) throw providersError;
      results.providersCount = providers?.length || 0;

      // בדיקת שירותים
      const { data: services, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .eq('is_visible', true);

      if (servicesError) throw servicesError;
      results.servicesCount = services?.length || 0;

      // בדיקת שירותים עם מחירים
      results.servicesWithPrices = services?.filter(s => s.base_price && s.base_price > 0).length || 0;

      // בדיקת שירותים עם תמונות
      results.servicesWithImages = services?.filter(s => s.image_url).length || 0;

      // בדיקת זמינות (יומן או סלוטים)
      const { data: availability } = await supabase
        .from('provider_availability_slots')
        .select('service_id')
        .eq('is_available', true);

      const servicesWithAvailability = new Set(availability?.map(a => a.service_id) || []);
      results.servicesWithAvailability = servicesWithAvailability.size;

      // חישוב ציון
      let score = 0;
      const weights = {
        divisions: 15, // 5 חטיבות = 15 נקודות
        categories: 15, // 12+ קטגוריות = 15 נקודות  
        subcategories: 20, // 80+ תתי קטגוריות = 20 נקודות
        concepts: 10, // 4+ קונספטים = 10 נקודות
        providers: 10, // ספקים = 10 נקודות
        services: 10, // שירותים = 10 נקודות
        pricesComplete: 10, // מחירים = 10 נקודות
        imagesComplete: 5, // תמונות = 5 נקודות
        availabilityComplete: 5 // זמינות = 5 נקודות
      };

      // חישוב ציון לפי קריטריונים
      if (results.divisionsCount >= 5) score += weights.divisions;
      else score += (results.divisionsCount / 5) * weights.divisions;

      if (results.categoriesCount >= 12) score += weights.categories;
      else score += (results.categoriesCount / 12) * weights.categories;

      if (results.subcategoriesCount >= 80) score += weights.subcategories;
      else score += (results.subcategoriesCount / 80) * weights.subcategories;

      if (results.conceptsCount >= 4) score += weights.concepts;
      else score += (results.conceptsCount / 4) * weights.concepts;

      if (results.providersCount > 0) score += weights.providers;
      if (results.servicesCount > 0) score += weights.services;

      if (results.servicesCount > 0) {
        score += (results.servicesWithPrices / results.servicesCount) * weights.pricesComplete;
        score += (results.servicesWithImages / results.servicesCount) * weights.imagesComplete;
        score += (results.servicesWithAvailability / results.servicesCount) * weights.availabilityComplete;
      }

      results.score = Math.round(score);

      // זיהוי בעיות והמלצות
      if (results.divisionsCount < 5) {
        results.issues.push(`חסרות ${5 - results.divisionsCount} חטיבות`);
        results.recommendations.push('הרץ את מערכת האתחול המלאה');
      }

      if (results.subcategoriesCount < 80) {
        results.issues.push(`חסרות ${80 - results.subcategoriesCount} תתי קטגוריות`);
      }

      if (results.providersCount === 0) {
        results.issues.push('אין ספקים במערכת');
        results.recommendations.push('הוסף ספקים לדוגמה או הפעל מחולל ספקים');
      }

      if (results.servicesCount === 0) {
        results.issues.push('אין שירותים במערכת');
        results.recommendations.push('הוסף שירותים לספקים הקיימים');
      }

      if (results.servicesWithPrices < results.servicesCount) {
        results.issues.push(`${results.servicesCount - results.servicesWithPrices} שירותים ללא מחיר`);
        results.recommendations.push('הוסף מחירים לכל השירותים');
      }

      setResults(results);
      
      toast({
        title: "בדיקת תקינות הושלמה",
        description: `ציון המערכת: ${results.score}%`,
        variant: results.score >= 70 ? "default" : "destructive"
      });

    } catch (error) {
      console.error('Error in compliance check:', error);
      toast({
        title: "שגיאה בבדיקת תקינות",
        description: "אנא נסה שוב",
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    runComplianceCheck();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          בדיקת תקינות מערכת תכלס המעודכנת
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {results && (
          <Alert className={getScoreBgColor(results.score)}>
            <CheckCircle className={`h-4 w-4 ${getScoreColor(results.score)}`} />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span className="font-bold">ציון תקינות המערכת:</span>
                <span className={`text-2xl font-bold ${getScoreColor(results.score)}`}>
                  {results.score}%
                </span>
              </div>
              <Progress value={results.score} className="mt-2" />
            </AlertDescription>
          </Alert>
        )}

        {results && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{results.divisionsCount}</div>
              <div className="text-sm text-gray-600">חטיבות (יעד: 5)</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{results.categoriesCount}</div>
              <div className="text-sm text-gray-600">קטגוריות (יעד: 12+)</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{results.subcategoriesCount}</div>
              <div className="text-sm text-gray-600">תתי קטגוריות (יעד: 80+)</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{results.conceptsCount}</div>
              <div className="text-sm text-gray-600">קונספטים (יעד: 4+)</div>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">{results.providersCount}</div>
              <div className="text-sm text-gray-600">ספקים</div>
            </div>
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">{results.servicesCount}</div>
              <div className="text-sm text-gray-600">שירותים</div>
            </div>
            <div className="text-center p-4 bg-cyan-50 rounded-lg">
              <div className="text-2xl font-bold text-cyan-600">{results.servicesWithPrices}</div>
              <div className="text-sm text-gray-600">שירותים עם מחיר</div>
            </div>
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">{results.servicesWithImages}</div>
              <div className="text-sm text-gray-600">שירותים עם תמונות</div>
            </div>
          </div>
        )}

        {results && results.issues.length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>בעיות שזוהו:</strong>
              <ul className="mt-2 space-y-1">
                {results.issues.map((issue, index) => (
                  <li key={index} className="text-sm">• {issue}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {results && results.recommendations.length > 0 && (
          <Alert className="border-blue-200 bg-blue-50">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>המלצות לשיפור:</strong>
              <ul className="mt-2 space-y-1">
                {results.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm">• {rec}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-center">
          <Button 
            onClick={runComplianceCheck}
            disabled={isChecking}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
            {isChecking ? 'בודק...' : 'רענן בדיקה'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemComplianceChecker;
