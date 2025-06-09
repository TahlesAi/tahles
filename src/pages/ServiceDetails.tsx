
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
  Package, 
  Building, 
  Star,
  Clock,
  Users,
  MapPin
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  name: string;
  description: string;
  base_price: number;
  price_unit: string;
  duration: string;
  image_url: string;
  additional_images: string[];
  features: string[];
  technical_requirements: string[];
  min_participants: number;
  max_participants: number;
  provider_id: string;
}

interface Provider {
  id: string;
  name: string;
  description: string;
  city: string;
  is_verified: boolean;
  rating: number;
  review_count: number;
}

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('לא נמצא מזהה שירות');
      setLoading(false);
      return;
    }

    fetchServiceData();
  }, [id]);

  const fetchServiceData = async () => {
    try {
      setLoading(true);
      
      // טעינת נתוני השירות
      const { data: serviceData, error: serviceError } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .eq('is_visible', true)
        .single();

      if (serviceError) {
        throw new Error('שירות לא נמצא');
      }

      const formattedService: Service = {
        id: serviceData.id,
        name: serviceData.name,
        description: serviceData.description || '',
        base_price: serviceData.base_price || 0,
        price_unit: serviceData.price_unit || 'לאירוע',
        duration: serviceData.duration || '',
        image_url: serviceData.image_url || '',
        additional_images: serviceData.additional_images || [],
        features: serviceData.features || [],
        technical_requirements: serviceData.technical_requirements || [],
        min_participants: serviceData.min_participants || 0,
        max_participants: serviceData.max_participants || 0,
        provider_id: serviceData.provider_id
      };

      setService(formattedService);

      // טעינת נתוני הספק
      const { data: providerData, error: providerError } = await supabase
        .from('providers')
        .select('*')
        .eq('id', serviceData.provider_id)
        .single();

      if (providerError) {
        console.warn('לא הצלחנו לטעון את נתוני הספק');
      } else {
        setProvider(providerData);
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
              <div className="lg:col-span-2">
                <Skeleton className="h-96 mb-6" />
                <Skeleton className="h-32" />
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-64" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center" dir="rtl">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">שגיאה בטעינת השירות</h2>
            <p className="mb-6 text-gray-600">{error}</p>
            <Button onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 ml-2" />
              חזרה
            </Button>
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
            {/* פרטי השירות */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Package className="h-8 w-8 text-blue-600 mt-1" />
                    <div className="flex-grow">
                      <CardTitle className="text-2xl mb-2">{service.name}</CardTitle>
                      <div className="text-2xl font-bold text-blue-600 mb-4">
                        {formatPrice(service.base_price, service.price_unit)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {service.image_url && (
                    <img 
                      src={service.image_url}
                      alt={service.name}
                      className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                  )}
                  
                  {service.description && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">תיאור השירות</h3>
                      <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {service.duration && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span><strong>משך השירות:</strong> {service.duration}</span>
                      </div>
                    )}
                    
                    {(service.min_participants > 0 || service.max_participants > 0) && (
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-gray-500" />
                        <span>
                          <strong>מספר משתתפים:</strong> 
                          {service.min_participants > 0 && service.max_participants > 0 
                            ? ` ${service.min_participants}-${service.max_participants}`
                            : service.min_participants > 0 
                              ? ` מ-${service.min_participants}`
                              : ` עד ${service.max_participants}`
                          }
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {service.features && service.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">מה כלול בשירות</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, index) => (
                          <Badge key={index} variant="secondary">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {service.technical_requirements && service.technical_requirements.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">דרישות טכניות</h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {service.technical_requirements.map((requirement, index) => (
                          <li key={index}>{requirement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {service.additional_images && service.additional_images.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">תמונות נוספות</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {service.additional_images.map((image, index) => (
                          <img 
                            key={index}
                            src={image}
                            alt={`${service.name} - תמונה ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* פרטי הספק והזמנה */}
            <div className="lg:col-span-1">
              {provider && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      פרטי הספק
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <Link 
                      to={`/provider/${provider.id}`}
                      className="block mb-4 hover:text-blue-600"
                    >
                      <h4 className="text-lg font-semibold">{provider.name}</h4>
                    </Link>
                    
                    {provider.rating > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{provider.rating.toFixed(1)}</span>
                        <span className="text-gray-500">({provider.review_count} ביקורות)</span>
                      </div>
                    )}
                    
                    {provider.city && (
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{provider.city}</span>
                      </div>
                    )}
                    
                    {provider.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {provider.description}
                      </p>
                    )}
                    
                    <Link to={`/provider/${provider.id}`}>
                      <Button variant="outline" className="w-full">
                        צפה בספק
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle>הזמנת השירות</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {formatPrice(service.base_price, service.price_unit)}
                    </div>
                    <p className="text-gray-600 text-sm">מחיר בסיס</p>
                  </div>
                  
                  <Button className="w-full mb-3">
                    הזמן עכשיו
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    צור קשר לפרטים
                  </Button>
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

export default ServiceDetails;
