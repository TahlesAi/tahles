
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { 
  Package, 
  Calendar, 
  Users, 
  MapPin, 
  Star, 
  CheckCircle,
  AlertTriangle 
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  base_price: number;
  price_unit: string;
  duration_minutes: number;
  min_participants: number;
  max_participants: number;
  image_url: string;
  is_visible: boolean;
  calendar_required: boolean;
  provider: {
    name: string;
    city: string;
    rating: number;
  };
  subcategory: {
    name: string;
    category: {
      name: string;
    };
  };
}

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select(`
          id,
          name,
          description,
          base_price,
          price_unit,
          duration_minutes,
          min_participants,
          max_participants,
          image_url,
          is_visible,
          calendar_required,
          providers!inner (
            name,
            city,
            rating
          ),
          subcategories!inner (
            name,
            categories!inner (
              name
            )
          )
        `)
        .eq('is_visible', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedServices = data?.map(service => ({
        ...service,
        provider: service.providers,
        subcategory: {
          name: service.subcategories.name,
          category: service.subcategories.categories
        }
      })) || [];

      setServices(formattedServices);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('שגיאה בטעינת השירותים');
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
            <p>טוען שירותים...</p>
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
              <Package className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold">כל השירותים במערכת</h1>
              <Badge variant="secondary">{services.length} שירותים</Badge>
            </div>
            <p className="text-gray-600">
              רשימת כל השירותים הזמינים במערכת תכלס - עם מחירים, זמינות ופרטים מלאים
            </p>
          </div>

          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {services.length === 0 ? (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                אין שירותים זמינים כרגע במערכת
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    {service.image_url && (
                      <img 
                        src={service.image_url} 
                        alt={service.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                      {service.is_visible && (
                        <Badge className="bg-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          פעיל
                        </Badge>
                      )}
                      {service.calendar_required && (
                        <Badge variant="outline" className="bg-white">
                          <Calendar className="h-3 w-3 mr-1" />
                          יומן
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{service.subcategory.category.name}</span>
                      <span>•</span>
                      <span>{service.subcategory.name}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {service.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span>{service.min_participants}-{service.max_participants} משתתפים</span>
                      </div>
                      {service.duration_minutes && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-green-600" />
                          <span>{service.duration_minutes} דקות</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{service.provider.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{service.provider.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-blue-600">
                            ₪{service.base_price.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">{service.price_unit}</div>
                        </div>
                        <Button size="sm">
                          צפה בפרטים
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 border-t pt-2">
                      ספק: {service.provider.name}
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

export default ServicesPage;
