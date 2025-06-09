
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, AlertTriangle, FolderOpen, Layers } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Subcategory {
  id: string;
  name: string;
  description: string;
  category_id: string;
}

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('לא נמצא מזהה קטגוריה');
      setLoading(false);
      return;
    }

    fetchCategoryData();
  }, [id]);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      
      // טעינת נתוני הקטגוריה
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (categoryError) {
        throw new Error('קטגוריה לא נמצאה');
      }

      setCategory(categoryData);

      // טעינת תתי-קטגוריות
      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category_id', id)
        .eq('is_active', true)
        .order('order_index');

      if (subcategoriesError) {
        throw subcategoriesError;
      }

      setSubcategories(subcategoriesData || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת הנתונים');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8" dir="rtl">
            <div className="mb-6">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64 mb-4" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center" dir="rtl">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">שגיאה בטעינת הקטגוריה</h2>
            <p className="mb-6 text-gray-600">{error}</p>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              חזרה לקטגוריות
            </Link>
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
          {/* כותרת הקטגוריה */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Link
                to="/categories"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <FolderOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold">{category.name}</h1>
              <Badge variant="secondary">{subcategories.length} תתי קטגוריות</Badge>
            </div>
            
            {category.description && (
              <p className="text-gray-600 text-lg mr-14">
                {category.description}
              </p>
            )}
          </div>

          {/* תתי קטגוריות */}
          {subcategories.length === 0 ? (
            <Alert className="max-w-md mx-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                אין תתי קטגוריות זמינות בקטגוריה זו כרגע
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcategories.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  to={`/subcategories/${subcategory.id}`}
                  className="group block"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <Layers className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-grow">
                          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                            {subcategory.name}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {subcategory.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {subcategory.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-end text-blue-600 text-sm font-medium group-hover:underline">
                        <span>עיין בתת-קטגוריה</span>
                        <ArrowLeft className="h-4 w-4 mr-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
