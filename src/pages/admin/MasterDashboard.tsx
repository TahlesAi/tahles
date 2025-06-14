
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BarChart3, 
  Settings, 
  CheckCircle, 
  AlertTriangle,
  Loader2,
  RefreshCw,
  Database,
  Users,
  Package,
  Eye
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SystemStats {
  categories: number;
  subcategories: number;
  providers: number;
  services: number;
}

interface CategoryWithSubs {
  id: string;
  name: string;
  subcategory_count: number;
}

const MasterDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    categories: 0,
    subcategories: 0,
    providers: 0,
    services: 0
  });
  const [categories, setCategories] = useState<CategoryWithSubs[]>([]);
  const [testingSystem, setTestingSystem] = useState(false);
  const [systemStatus, setSystemStatus] = useState<'healthy' | 'warning' | 'error'>('healthy');

  const loadSystemData = async () => {
    try {
      setLoading(true);
      
      // טעינת סטטיסטיקות
      const [categoriesRes, subcategoriesRes, providersRes, servicesRes] = await Promise.all([
        supabase.from('categories').select('*', { count: 'exact' }),
        supabase.from('subcategories').select('*', { count: 'exact' }),
        supabase.from('providers').select('*', { count: 'exact' }),
        supabase.from('services').select('*', { count: 'exact' })
      ]);

      setSystemStats({
        categories: categoriesRes.count || 0,
        subcategories: subcategoriesRes.count || 0,
        providers: providersRes.count || 0,
        services: servicesRes.count || 0
      });

      // טעינת קטגוריות עם מספר תת-קטגוריות
      const { data: categoriesData } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          subcategories(count)
        `)
        .order('order_index');

      if (categoriesData) {
        const processedCategories = categoriesData.map(cat => ({
          id: cat.id,
          name: cat.name,
          subcategory_count: cat.subcategories?.length || 0
        }));
        setCategories(processedCategories);
      }

    } catch (error) {
      console.error('שגיאה בטעינת נתוני המערכת:', error);
      toast.error('שגיאה בטעינת נתונים');
      setSystemStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const runSystemCheck = async () => {
    setTestingSystem(true);
    try {
      // בדיקת חיבור למסד נתונים
      const { error: dbError } = await supabase.from('categories').select('count');
      if (dbError) throw new Error('בעיה בחיבור למסד נתונים');

      // בדיקת קטגוריות
      if (systemStats.categories < 6) {
        throw new Error('חסרות קטגוריות במערכת');
      }

      // בדיקת תת-קטגוריות
      if (systemStats.subcategories < 12) {
        setSystemStatus('warning');
        toast.warning('יש פחות מ-12 תת-קטגוריות במערכת');
      } else {
        setSystemStatus('healthy');
        toast.success('בדיקת המערכת הושלמה בהצלחה');
      }

    } catch (error: any) {
      console.error('שגיאה בבדיקת המערכת:', error);
      setSystemStatus('error');
      toast.error(`שגיאה בבדיקת המערכת: ${error.message}`);
    } finally {
      setTestingSystem(false);
    }
  };

  useEffect(() => {
    loadSystemData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">טוען את דשבורד הניהול...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8" dir="rtl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">מערכת ניהול תכלס החדשה</h1>
            <p className="text-gray-600 mb-4">מבנה חדש</p>
            <Alert className="bg-blue-50 border-blue-200">
              <Database className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                המבנה החדש מבוסס על 6 קטגוריות ראשיות ללא חטיבות
              </AlertDescription>
            </Alert>
          </div>

          {/* סטטיסטיקות מערכת */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{systemStats.categories}</div>
                <div className="text-sm text-gray-600">קטגוריות</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Package className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{systemStats.subcategories}</div>
                <div className="text-sm text-gray-600">תתי קטגוריות</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{systemStats.providers}</div>
                <div className="text-sm text-gray-600">ספקים</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Settings className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">{systemStats.services}</div>
                <div className="text-sm text-gray-600">שירותים</div>
              </CardContent>
            </Card>
          </div>

          {/* כפתורי ניהול */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  תקינות המערכת
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>מצב מערכת:</span>
                    <Badge variant={systemStatus === 'healthy' ? 'default' : systemStatus === 'warning' ? 'outline' : 'destructive'}>
                      {systemStatus === 'healthy' ? 'תקין' : systemStatus === 'warning' ? 'אזהרה' : 'שגיאה'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    נתוני מערכת: {systemStats.categories} קטגוריות פעילות, 
                    סך {systemStats.subcategories} תתי קטגוריות, 
                    {systemStats.providers} ספקים מאומתים
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  בדיקת מערכת
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  בדיקה מקיפה של המערכת והנתונים
                </p>
                <Button 
                  onClick={runSystemCheck}
                  disabled={testingSystem}
                  className="w-full"
                  variant="outline"
                >
                  {testingSystem ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin ml-2" />
                      בודק מערכת...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 ml-2" />
                      רענון בדיקה
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  סקירה כללית
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  תצוגה מפורטת של מבנה המערכת
                </p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="w-full"
                  variant="outline"
                >
                  <RefreshCw className="h-4 w-4 ml-2" />
                  רענן נתונים
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* פירוט המבנה החדש */}
          <Card>
            <CardHeader>
              <CardTitle>המבנה החדש של תכלס</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  <strong>קטגוריות במערכת:</strong>
                </div>
                
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="outline">{category.subcategory_count} תתי קטגוריות</Badge>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">תיאור המבנה:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>• לוקיישנים - אולמות, גנים, חופים</div>
                    <div>• מזון ומשקאות - קייטרינג, שף פרטי, בר</div>
                    <div>• מופעים ובמה - אמנים, זמרים, קוסמים</div>
                    <div>• שירותי הפקה - הגברה, צילום, אבטחה</div>
                    <div>• הרצאות והכשרות - העשרה, גיבוש צוות</div>
                    <div>• אטרקציות - כרטיסים, מתנות, טיולים</div>
                    <div className="font-medium mt-2">סה"כ: 6 קטגוריות ראשיות</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MasterDashboard;
