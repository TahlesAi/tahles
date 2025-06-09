
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Building, 
  Package, 
  Eye, 
  MapPin, 
  Phone, 
  Mail,
  Globe,
  Star,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Provider {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  city: string;
  website: string;
  logo_url: string;
  is_verified: boolean;
  rating: number;
  review_count: number;
}

interface Service {
  id: string;
  name: string;
  description: string;
  base_price: number;
  image_url: string;
  price_unit: string;
  duration: string;
  features: string[];
}

const ProviderProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('לא נמצא מזהה ספק');
      setLoading(false);
      return;
    }

    fetchProviderData();
  }, [id]);

  const fetchProviderData = async () => {
    try {
      setLoading(true);
      
      // טעינת נתוני הספק
      const { data: providerData, error: providerError } = await supabase
        .from('providers')
        .select('*')
        .eq('id', id)
        .single();

      if (providerError) {
        throw new Error('ספק לא נמצא');
      }

      setProvider(providerData);

      // טעינת שירותי הספק
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .eq('provider_id', id)
        .eq('is_visible', true)
        .not('base_price', 'is', null)
        .order('name');

      if (servicesError) {
        console.warn('שגיאה בטעינת שירותים:', servicesError);
        setServices([]);
      } else {
        const formattedServices: Service[] = (servicesData || []).map(service => ({
          id: service.id,
          name: service.name,
          description: service.description || '',
          base_price: service.base_price || 0,
          image_url: service.image_url || '',
          price_unit: service.price_unit || 'לאירוע',
          duration: service.duration || '',
          features: service.features || []
        }));
        
        setServices(formattedServices);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת הנתונים');
    } finally {
      setLoading(false);
    }
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
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Skeleton className="h-64" />
              </div>
              <div className="lg:col-span-2">
                <Skeleton className="h-96" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center" dir="rtl">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">שגיאה בטעינת פרופיל הספק</h2>
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
          {/* כותרת */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              חזרה
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* פרטי הספק */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="text-center">
                    {provider.logo_url ? (
                      <img 
                        src={provider.logo_url} 
                        alt={provider.name}
                        className="w-24 h-24 rounded-lg mx-auto mb-4 object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <Building className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    
                    <CardTitle className="text-xl mb-2 flex items-center justify-center gap-2">
                      {provider.name}
                      {provider.is_verified && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </CardTitle>
                    
                    {provider.rating > 0 && (
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{provider.rating.toFixed(1)}</span>
                        <span className="text-gray-500">({provider.review_count} ביקורות)</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {provider.description && (
                    <p className="text-gray-600 text-center">
                      {provider.description}
                    </p>
                  )}
                  
                  <div className="space-y-2">
                    {provider.city && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{provider.city}</span>
                      </div>
                    )}
                    
                    {provider.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{provider.phone}</span>
                      </div>
                    )}
                    
                    {provider.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{provider.email}</span>
                      </div>
                    )}
                    
                    {provider.website && (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <a 
                          href={provider.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          אתר האינטרנט
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <Button className="w-full">
                    צור קשר
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* מוצרים ושירותים */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-6 w-6" />
                    המוצרים והשירותים שלנו
                    <Badge variant="secondary">{services.length} מוצרים</Badge>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  {services.length === 0 ? (
                    <Alert>
                      <Package className="h-4 w-4" />
                      <AlertDescription>
                        אין מוצרים זמינים כרגע
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {services.map((service) => (
                        <Card key={service.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            {service.image_url && (
                              <img 
                                src={service.image_url}
                                alt={service.name}
                                className="w-full h-32 object-cover rounded-lg mb-3"
                              />
                            )}
                            
                            <h4 className="font-semibold text-lg mb-2">{service.name}</h4>
                            
                            {service.description && (
                              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                {service.description}
                              </p>
                            )}
                            
                            <div className="space-y-2 mb-4">
                              <div className="text-lg font-bold text-blue-600">
                                {formatPrice(service.base_price, service.price_unit)}
                              </div>
                              
                              {service.duration && (
                                <div className="text-sm text-gray-500">
                                  משך: {service.duration}
                                </div>
                              )}
                            </div>
                            
                            {service.features && service.features.length > 0 && (
                              <div className="mb-4">
                                <div className="flex flex-wrap gap-1">
                                  {service.features.slice(0, 3).map((feature, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                  {service.features.length > 3 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{service.features.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            <Link to={`/service/${service.id}`}>
                              <Button variant="outline" className="w-full">
                                <Eye className="h-4 w-4 ml-2" />
                                צפה במוצר
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderProfile;
