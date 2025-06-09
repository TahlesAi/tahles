
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { 
  FolderOpen, 
  Tag, 
  ArrowLeft, 
  AlertTriangle,
  MapPin,
  Utensils,
  Music,
  Building,
  Sparkles,
  Gift,
  TentTree
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories_count: number;
  services_count: number;
}

const iconMap: { [key: string]: any } = {
  'MapPin': MapPin,
  'Utensils': Utensils,
  'Music': Music,
  'Building': Building,
  'Sparkles': Sparkles,
  'Gift': Gift,
  'TentTree': TentTree,
  'FolderOpen': FolderOpen
};

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...');

      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          description,
          icon
        `)
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (categoriesError) {
        throw categoriesError;
      }

      if (!categoriesData || categoriesData.length === 0) {
        console.log('No categories found, creating default categories...');
        await createDefaultCategories();
        return;
      }

      // חישוב מספר תתי קטגוריות ושירותים לכל קטגוריה
      const enrichedCategories: Category[] = [];

      for (const category of categoriesData) {
        // ספירת תתי קטגוריות
        const { count: subcategoriesCount } = await supabase
          .from('subcategories')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', category.id)
          .eq('is_active', true);

        // ספירת שירותים
        const { count: servicesCount } = await supabase
          .from('services')
          .select('subcategory_id', { count: 'exact', head: true })
          .in('subcategory_id', 
            (await supabase
              .from('subcategories')
              .select('id')
              .eq('category_id', category.id)
            ).data?.map(sub => sub.id) || []
          )
          .eq('is_visible', true);

        enrichedCategories.push({
          id: category.id,
          name: category.name,
          description: category.description || '',
          icon: category.icon || 'FolderOpen',
          subcategories_count: subcategoriesCount || 0,
          services_count: servicesCount || 0
        });
      }

      setCategories(enrichedCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('שגיאה בטעינת הקטגוריות');
    } finally {
      setLoading(false);
    }
  };

  const createDefaultCategories = async () => {
    try {
      const defaultCategories = [
        {
          id: 'locations',
          name: 'לוקיישנים',
          description: 'מקומות לאירועים ופעילויות',
          icon: 'MapPin',
          order_index: 1
        },
        {
          id: 'food-drinks',
          name: 'מזון ומשקאות',
          description: 'אוכל ושתייה לכל אירוע',
          icon: 'Utensils',
          order_index: 2
        },
        {
          id: 'performances',
          name: 'מופעים ואמני במה',
          description: 'הופעות ואמנים לכל סוג אירוע',
          icon: 'Music',
          order_index: 3
        },
        {
          id: 'production-services',
          name: 'שירותי הפקה',
          description: 'שירותים מקצועיים להפקת אירועים',
          icon: 'Building',
          order_index: 4
        },
        {
          id: 'lectures-training',
          name: 'הרצאות והכשרות',
          description: 'תוכן מקצועי והעשרה',
          icon: 'Sparkles',
          order_index: 5
        },
        {
          id: 'attractions',
          name: 'אטרקציות',
          description: 'כרטיסים, מתנות, טיולים ואטרקציות',
          icon: 'TentTree',
          order_index: 6
        }
      ];

      const { data, error } = await supabase
        .from('categories')
        .insert(defaultCategories)
        .select();

      if (error) {
        throw error;
      }

      console.log('Created default categories:', data);
      await fetchCategories();
    } catch (err) {
      console.error('Error creating default categories:', err);
      setError('שגיאה ביצירת קטגוריות ברירת מחדל');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>טוען קטגוריות...</p>
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
              <FolderOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold">כל הקטגוריות</h1>
              <Badge variant="secondary">{categories.length} קטגוריות</Badge>
            </div>
            <p className="text-gray-600">
              עיין בכל הקטגוריות הזמינות במערכת תכלס ומצא את השירות המושלם עבורך
            </p>
          </div>

          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {categories.length === 0 ? (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                אין קטגוריות זמינות כרגע במערכת
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const IconComponent = iconMap[category.icon] || FolderOpen;
                const categoryPath = category.id === 'locations' ? '/categories/locations' : `/categories/${category.id}`;
                
                return (
                  <Link
                    key={category.id}
                    to={categoryPath}
                    className="group block"
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <IconComponent className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-grow">
                            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                              {category.name}
                            </CardTitle>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {category.description}
                        </p>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-green-600" />
                            <span>{category.subcategories_count} תתי קטגוריות</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FolderOpen className="h-4 w-4 text-purple-600" />
                            <span>{category.services_count} שירותים</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-end text-blue-600 text-sm font-medium group-hover:underline">
                          <span>עיין בקטגוריה</span>
                          <ArrowLeft className="h-4 w-4 mr-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
