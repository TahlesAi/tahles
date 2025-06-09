
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { 
  MapPin, 
  Building, 
  ArrowRight, 
  Calendar, 
  Users, 
  Star, 
  CheckCircle,
  AlertTriangle 
} from 'lucide-react';

interface LocationProvider {
  id: string;
  name: string;
  description: string;
  city: string;
  rating: number;
  review_count: number;
  is_verified: boolean;
  logo_url: string;
  subcategory_name: string;
  service_count: number;
}

const LocationsPage: React.FC = () => {
  const [providers, setProviders] = useState<LocationProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLocationProviders();
  }, []);

  const fetchLocationProviders = async () => {
    try {
      console.log('Fetching location providers...');

      // מציאת קטגוריית הלוקיישנים
      const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', 'לוקיישנים')
        .single();

      if (categoryError || !category) {
        console.log('Category לוקיישנים not found, creating it...');
        
        // יצירת קטגוריית לוקיישנים אם לא קיימת
        const { data: newCategory, error: createError } = await supabase
          .from('categories')
          .insert({
            name: 'לוקיישנים',
            description: 'מקומות לאירועים ופעילויות',
            icon: 'MapPin'
          })
          .select('id')
          .single();

        if (createError) {
          throw createError;
        }
        
        console.log('Created category:', newCategory);
        return;
      }

      // שליפת תתי קטגוריות של לוקיישנים
      const { data: subcategories, error: subError } = await supabase
        .from('subcategories')
        .select('id')
        .eq('category_id', category.id);

      if (subError) {
        throw subError;
      }

      if (!subcategories || subcategories.length === 0) {
        console.log('No subcategories found for locations');
        setProviders([]);
        return;
      }

      const subcategoryIds = subcategories.map(sub => sub.id);

      // שליפת ספקים לפי תתי קטגוריות
      const { data: providersData, error: providersError } = await supabase
        .from('providers')
        .select(`
          id,
          name,
          description,
          city,
          rating,
          review_count,
          is_verified,
          logo_url,
          provider_subcategories!inner(
            subcategory_id,
            subcategories!inner(
              name,
              category_id
            )
          )
        `)
        .in('provider_subcategories.subcategory_id', subcategoryIds);

      if (providersError) {
        throw providersError;
      }

      // עיבוד הנתונים
      const formattedProviders: LocationProvider[] = (providersData || []).map(provider => {
        const subcategory = provider.provider_subcategories[0]?.subcategories;
        
        return {
          id: provider.id,
          name: provider.name || 'ספק ללא שם',
          description: provider.description || '',
          city: provider.city || 'עיר לא צוינה',
          rating: provider.rating || 0,
          review_count: provider.review_count || 0,
          is_verified: provider.is_verified || false,
          logo_url: provider.logo_url || '',
          subcategory_name: subcategory?.name || 'תת קטגוריה לא צוינה',
          service_count: 0 // יעודכן בהמשך
        };
      });

      // שליפת מספר שירותים לכל ספק
      for (const provider of formattedProviders) {
        const { count } = await supabase
          .from('services')
          .select('*', { count: 'exact', head: true })
          .eq('provider_id', provider.id)
          .eq('is_visible', true);
        
        provider.service_count = count || 0;
      }

      console.log('Final formatted providers:', formattedProviders);
      setProviders(formattedProviders);
    } catch (err) {
      console.error('Error fetching location providers:', err);
      setError('שגיאה בטעינת ספקי הלוקיישנים');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>טוען ספקי לוקיישנים...</p>
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
              <MapPin className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold">לוקיישנים</h1>
              <Badge variant="secondary">{providers.length} ספקים</Badge>
            </div>
            <p className="text-gray-600">
              מקומות לאירועים, אולמות, לופטים, ברים ועוד - מצא את המקום המושלם לאירוע שלך
            </p>
            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה לדף הבית
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/categories')}
              >
                כל הקטגוריות
              </Button>
            </div>
          </div>

          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {providers.length === 0 ? (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                אין ספקי לוקיישנים זמינים כרגע במערכת
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <Card 
                  key={provider.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/provider/${provider.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                        {provider.logo_url ? (
                          <img 
                            src={provider.logo_url} 
                            alt={provider.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-blue-100">
                            <Building className="h-6 w-6 text-blue-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{provider.name}</CardTitle>
                          {provider.is_verified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {provider.subcategory_name}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {provider.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{provider.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span>{provider.service_count} שירותים</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{provider.rating.toFixed(1)}</span>
                        <span className="text-sm text-gray-500">
                          ({provider.review_count} ביקורות)
                        </span>
                      </div>
                      <Button size="sm" variant="outline">
                        צפה בפרטים
                      </Button>
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

export default LocationsPage;
