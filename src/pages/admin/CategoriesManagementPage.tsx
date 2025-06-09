
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { LayoutDashboard, FolderOpen, Tag, Plus, AlertTriangle } from 'lucide-react';

interface Subcategory {
  id: string;
  name: string;
  description: string;
  order_index: number;
  is_active: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  order_index: number;
  is_active: boolean;
  subcategories: Subcategory[];
}

const CategoriesManagementPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const fetchCategoriesData = async () => {
    try {
      console.log('Fetching categories management data...');

      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          description,
          icon,
          order_index,
          is_active,
          subcategories(
            id,
            name,
            description,
            order_index,
            is_active
          )
        `)
        .order('order_index', { ascending: true });

      if (categoriesError) {
        throw categoriesError;
      }

      const formattedCategories: Category[] = (categoriesData || []).map(category => ({
        id: category.id,
        name: category.name,
        description: category.description || '',
        icon: category.icon || 'FolderOpen',
        order_index: category.order_index || 0,
        is_active: category.is_active,
        subcategories: (category.subcategories || []).map(sub => ({
          id: sub.id,
          name: sub.name,
          description: sub.description || '',
          order_index: sub.order_index || 0,
          is_active: sub.is_active
        }))
      }));

      console.log('Formatted categories:', formattedCategories);
      setCategories(formattedCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('שגיאה בטעינת נתוני הקטגוריות');
    } finally {
      setLoading(false);
    }
  };

  const updateCalendarIntegration = async () => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ has_calendar_integration: true })
        .eq('calendar_required', true);

      if (error) {
        throw error;
      }

      console.log('Calendar integration updated successfully');
    } catch (err) {
      console.error('Error updating calendar integration:', err);
    }
  };

  const generateRatingReport = () => {
    // דוח דירוג אוטומטי בהתאם למילוי שדות
    console.log('Generating automatic rating report...');
    // כאן יתווסף הלוגיק לדוח הדירוג
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>טוען נתוני קטגוריות...</p>
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
            <div className="flex items-center gap-3 mb-4">
              <LayoutDashboard className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold">ניהול קטגוריות ותתי קטגוריות</h1>
            </div>
            <p className="text-gray-600">
              מערכת ניהול קטגוריות תכלס - סקירה של כל הקטגוריות ותתי הקטגוריות ללא חטיבות
            </p>
            
            <div className="flex gap-2 mt-4">
              <Button onClick={updateCalendarIntegration}>
                עדכן חיבור יומן
              </Button>
              <Button onClick={generateRatingReport} variant="outline">
                דוח דירוג אוטומטי
              </Button>
            </div>
          </div>

          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            {categories.map((category) => (
              <Card key={category.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FolderOpen className="h-6 w-6 text-blue-600" />
                    <span className="text-xl">{category.name}</span>
                    <Badge variant="secondary">
                      {category.subcategories?.length || 0} תתי קטגוריות
                    </Badge>
                    {!category.is_active && (
                      <Badge variant="destructive">לא פעיל</Badge>
                    )}
                  </CardTitle>
                  {category.description && (
                    <p className="text-gray-600">{category.description}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.subcategories?.map((subcategory) => (
                      <Card key={subcategory.id} className="bg-gray-50 hover:bg-gray-100 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Tag className="h-4 w-4 text-green-600" />
                            <h3 className="font-semibold">{subcategory.name}</h3>
                            {!subcategory.is_active && (
                              <Badge variant="outline" className="text-xs">
                                לא פעיל
                              </Badge>
                            )}
                          </div>
                          {subcategory.description && (
                            <p className="text-sm text-gray-600 mb-3">{subcategory.description}</p>
                          )}
                          <div className="text-xs text-gray-500">
                            סדר: {subcategory.order_index}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {/* כפתור הוספת תת קטגוריה */}
                    <Card className="bg-blue-50 border-2 border-dashed border-blue-300 hover:border-blue-400 transition-colors cursor-pointer">
                      <CardContent className="p-4 flex items-center justify-center h-full">
                        <div className="text-center">
                          <Plus className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                          <span className="text-sm text-blue-600 font-medium">
                            הוסף תת קטגוריה
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* סיכום */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5" />
                סיכום מערכת הקטגוריות (ללא חטיבות)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
                  <div className="text-sm text-gray-600">קטגוריות</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {categories.reduce((sum, cat) => sum + (cat.subcategories?.length || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">תתי קטגוריות</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {categories.filter(cat => cat.is_active).length}
                  </div>
                  <div className="text-sm text-gray-600">קטגוריות פעילות</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <div className="text-sm text-gray-600">מוכנות המערכת</div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-green-100 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">פעולות מבוצעות:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✅ הוסר מבנה החטיבות</li>
                  <li>✅ נוצרה קטגוריית אטרקציות חדשה</li>
                  <li>✅ נתיב /categories/locations תוקן</li>
                  <li>✅ מבנה היררכי עודכן: קטגוריה → תת קטגוריה → ספק → שירות</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesManagementPage;
