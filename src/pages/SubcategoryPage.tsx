
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, AlertTriangle, Layers, Building, Package, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Subcategory {
  id: string;
  name: string;
  description: string;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  base_price: number;
  image_url: string;
  price_unit: string;
}

interface Provider {
  id: string;
  name: string;
  description: string;
  is_verified: boolean;
  services: Service[];
}

const SubcategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedProviders, setExpandedProviders] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!id) {
      setError('לא נמצא מזהה תת-קטגוריה');
      setLoading(false);
      return;
    }

    fetchSubcategoryData();
  }, [id]);

  const fetchSubcategoryData = async () => {
    try {
      setLoading(true);
      
      // טעינת נתוני תת-הקטגוריה
      const { data: subcategoryData, error: subcategoryError } = await supabase
        .from('subcategories')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (subcategoryError) {
        throw new Error('תת-קטגוריה לא נמצאה');
      }

      setSubcategory(subcategoryData);

      // טעינת נתוני הקטגוריה האב
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id, name')
        .eq('id', subcategoryData.category_id)
        .single();

      if (categoryError) {
        console.warn('לא הצלחנו לטעון את נתוני הקטגוריה האב');
      } else {
        setCategory(categoryData);
      }

      // טעינת ספקים עם השירותים שלהם
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select(`
          id,
          name,
          description,
          base_price,
          image_url,
          price_unit,
          provider_id,
          providers (
            id,
            name,
            description,
            is_verified
          )
        `)
        .eq('subcategory_id', id)
        .eq('is_visible', true)
        .not('base_price', 'is', null);

      if (servicesError) {
        console.warn('שגיאה בטעינת שירותים:', servicesError);
        setProviders([]);
      } else {
        // ארגון השירותים לפי ספקים
        const providersMap = new Map<string, Provider>();
        
        servicesData?.forEach(service => {
          if (service.providers) {
            const provider = service.providers;
            const serviceData: Service = {
              id: service.id,
              name: service.name,
              description: service.description || '',
              base_price: service.base_price || 0,
              image_url: service.image_url || '',
              price_unit: service.price_unit || 'לאירוע'
            };

            if (providersMap.has(provider.id)) {
              providersMap.get(provider.id)!.services.push(serviceData);
            } else {
              providersMap.set(provider.id, {
                id: provider.id,
                name: provider.name,
                description: provider.description || '',
                is_verified: provider.is_verified || false,
                services: [serviceData]
              });
            }
          }
        });

        setProviders(Array.from(providersMap.values()));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת הנתונים');
    } finally {
      setLoading(false);
    }
  };

  const toggleProviderExpansion = (providerId: string) => {
    const newExpanded = new Set(expandedProviders);
    if (newExpanded.has(providerId)) {
      newExpanded.delete(providerId);
    } else {
      newExpanded.add(providerId);
    }
    setExpandedProviders(newExpanded);
  };

  const formatPrice = (price: number, unit: string) => {
    return `₪${price.toLocaleString()} ${unit}`;
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

  if (error || !subcategory) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center" dir="rtl">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">שגיאה בטעינת תת-הקטגוריה</h2>
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
          {/* ניווט נתיב */}
          <nav className="flex items-center gap-2 mb-6 text-sm">
            <Link to="/categories" className="text-gray-500 hover:text-blue-600">
              קטגוריות
            </Link>
            <span className="text-gray-400">/</span>
            {category && (
              <>
                <Link to={`/categories/${category.id}`} className="text-gray-500 hover:text-blue-600">
                  {category.name}
                </Link>
                <span className="text-gray-400">/</span>
              </>
            )}
            <span className="text-blue-600 font-medium">{subcategory.name}</span>
          </nav>

          {/* כותרת תת-הקטגוריה */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Link
                to={category ? `/categories/${category.id}` : '/categories'}
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <Layers className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold">{subcategory.name}</h1>
              <Badge variant="secondary">{providers.length} ספקים</Badge>
            </div>
            
            {subcategory.description && (
              <p className="text-gray-600 text-lg mr-14">
                {subcategory.description}
              </p>
            )}
          </div>

          {/* ספקים */}
          {providers.length === 0 ? (
            <Alert className="max-w-md mx-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                אין ספקים זמינים בתת-קטגוריה זו כרגע
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <Card key={provider.id} className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Building className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-grow">
                        <CardTitle className="text-lg">
                          <Link 
                            to={`/provider/${provider.id}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {provider.name}
                          </Link>
                          {provider.is_verified && (
                            <Badge variant="outline" className="mr-2 text-xs">
                              מאומת
                            </Badge>
                          )}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {provider.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {provider.description}
                      </p>
                    )}
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {provider.services.length} מוצרים זמינים
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleProviderExpansion(provider.id)}
                          className="h-8"
                        >
                          {expandedProviders.has(provider.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      
                      {expandedProviders.has(provider.id) && (
                        <div className="space-y-2 border-t pt-2">
                          {provider.services.length > 0 ? (
                            provider.services.map((service) => (
                              <Link
                                key={service.id}
                                to={`/service/${service.id}`}
                                className="block p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <Package className="h-4 w-4 text-gray-500" />
                                  <div className="flex-grow">
                                    <div className="text-sm font-medium text-gray-900">
                                      {service.name}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                      {formatPrice(service.base_price, service.price_unit)}
                                    </div>
                                  </div>
                                  <Eye className="h-4 w-4 text-gray-400" />
                                </div>
                              </Link>
                            ))
                          ) : (
                            <div className="text-sm text-gray-500 p-2">
                              אין מוצרים זמינים כרגע
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-end text-blue-600 text-sm font-medium">
                      <Link 
                        to={`/provider/${provider.id}`}
                        className="hover:underline flex items-center gap-1"
                      >
                        <span>צפה בספק</span>
                        <ArrowLeft className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubcategoryPage;
