
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RatingDisplay from '@/components/rating/RatingDisplay';
import ServiceAvailabilityTab from '@/components/service/ServiceAvailabilityTab';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Package, 
  Building, 
  Star,
  Clock,
  Users,
  MapPin,
  Calendar,
  Heart,
  CheckCircle,
  Phone,
  Mail,
  Play
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
  event_types: string[];
  target_age_groups: string[];
  service_language: string[];
  location_type: string;
  has_calendar_integration: boolean;
  free_cancellation_days: number;
  is_visible: boolean;
  videos: string[];
  price_type: string;
  service_type: string;
}

interface Provider {
  id: string;
  name: string;
  description: string;
  city: string;
  is_verified: boolean;
  rating: number;
  review_count: number;
  phone: string;
  email: string;
  logo_url: string;
}

interface Review {
  id: string;
  customer_name: string;
  comment: string;
  rating: number;
  created_at: string;
  is_approved: boolean;
}

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

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
        provider_id: serviceData.provider_id,
        event_types: serviceData.event_types || [],
        target_age_groups: serviceData.target_age_groups || [],
        service_language: serviceData.service_language || [],
        location_type: serviceData.location_type || '',
        has_calendar_integration: serviceData.has_calendar_integration || false,
        free_cancellation_days: serviceData.free_cancellation_days || 0,
        is_visible: serviceData.is_visible || false,
        videos: serviceData.videos || [],
        price_type: serviceData.price_type || 'package',
        service_type: serviceData.service_type || 'frontal'
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

      // טעינת ביקורות מאושרות
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .eq('service_id', id)
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .limit(10);

      if (!reviewsError && reviewsData) {
        setReviews(reviewsData);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת הנתונים');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, unit: string, priceType: string) => {
    const formattedPrice = `₪${price.toLocaleString()}`;
    
    switch (priceType) {
      case 'per_person':
        return `${formattedPrice} לאדם`;
      case 'per_hour':
        return `${formattedPrice} לשעה`;
      case 'package':
      default:
        return `${formattedPrice} ${unit}`;
    }
  };

  const toggleWishlist = async () => {
    // TODO: Implement wishlist functionality
    setIsInWishlist(!isInWishlist);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8" dir="rtl">
            <Skeleton className="h-8 w-48 mb-6" />
            <Skeleton className="h-64 w-full mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-96 mb-6" />
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
        {/* אזור ויזואלי עליון */}
        <div className="relative">
          {/* תמונת קאבר */}
          {service.image_url && (
            <div className="w-full h-64 md:h-80 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
              <img 
                src={service.image_url}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          )}
          
          {/* תמונת פרופיל ומידע בסיסי */}
          <div className="container mx-auto px-4" dir="rtl">
            <div className="relative -mt-16 mb-8">
              <div className="flex items-start gap-6">
                {/* תמונת פרופיל */}
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex-shrink-0">
                  {provider?.logo_url ? (
                    <img 
                      src={provider.logo_url}
                      alt={provider.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Package className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* מידע בסיסי */}
                <div className="bg-white rounded-lg shadow-lg p-6 flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
                      {provider && (
                        <Link 
                          to={`/provider/${provider.id}`}
                          className="text-blue-600 hover:underline flex items-center gap-2 mb-2"
                        >
                          <Building className="h-4 w-4" />
                          {provider.name}
                          {provider.is_verified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </Link>
                      )}
                    </div>
                    
                    {/* כפתורי פעולה */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleWishlist}
                        className={isInWishlist ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
                      </Button>
                      <Button onClick={() => window.history.back()}>
                        <ArrowLeft className="h-4 w-4 ml-2" />
                        חזרה
                      </Button>
                    </div>
                  </div>
                  
                  {/* מחיר בולט */}
                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    {formatPrice(service.base_price, service.price_unit, service.price_type)}
                  </div>
                  
                  {/* תיאור קצר */}
                  {service.description && (
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* תוכן מפורט */}
        <div className="container mx-auto px-4 pb-8" dir="rtl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* עמודה ראשית */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">פרטים</TabsTrigger>
                  <TabsTrigger value="media">מדיה</TabsTrigger>
                  <TabsTrigger value="reviews">ביקורות</TabsTrigger>
                  <TabsTrigger value="availability">זמינות</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>תיאור מפורט</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {service.description && (
                        <div>
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {service.description}
                          </p>
                        </div>
                      )}
                      
                      {/* פרמטרים תפעוליים */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        
                        {service.location_type && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-gray-500" />
                            <span><strong>סוג מיקום:</strong> {service.location_type}</span>
                          </div>
                        )}
                        
                        {service.free_cancellation_days > 0 && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-gray-500" />
                            <span><strong>ביטול חינם:</strong> עד {service.free_cancellation_days} ימים מראש</span>
                          </div>
                        )}
                      </div>
                      
                      {/* תגיות */}
                      <div className="space-y-4">
                        {service.event_types && service.event_types.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">סוגי אירועים:</h4>
                            <div className="flex flex-wrap gap-2">
                              {service.event_types.map((type, index) => (
                                <Badge key={index} variant="secondary">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {service.target_age_groups && service.target_age_groups.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">קהלי יעד:</h4>
                            <div className="flex flex-wrap gap-2">
                              {service.target_age_groups.map((age, index) => (
                                <Badge key={index} variant="outline">
                                  {age}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {service.service_language && service.service_language.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">שפות:</h4>
                            <div className="flex flex-wrap gap-2">
                              {service.service_language.map((lang, index) => (
                                <Badge key={index} variant="outline">
                                  {lang}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* צרכים טכניים */}
                      {service.technical_requirements && service.technical_requirements.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3">דרישות טכניות:</h4>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {service.technical_requirements.map((requirement, index) => (
                              <li key={index}>{requirement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* מה כלול */}
                      {service.features && service.features.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3">מה כלול בשירות:</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.features.map((feature, index) => (
                              <Badge key={index} variant="secondary">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="media" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>מדיה</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* סרטונים */}
                      {service.videos && service.videos.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">סרטונים:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {service.videos.map((video, index) => (
                              <div key={index} className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Play className="h-12 w-12 text-gray-400" />
                                </div>
                                <p className="text-xs text-gray-500 p-2">סרטון {index + 1}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* תמונות נוספות */}
                      {service.additional_images && service.additional_images.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3">תמונות נוספות:</h4>
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
                      
                      {(!service.videos || service.videos.length === 0) && 
                       (!service.additional_images || service.additional_images.length === 0) && (
                        <p className="text-gray-500 text-center py-8">אין מדיה נוספת זמינה</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>ביקורות</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {reviews.length > 0 ? (
                        <div className="space-y-4">
                          {reviews.map((review) => (
                            <div key={review.id} className="border-b pb-4 last:border-b-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">{review.customer_name}</span>
                                <RatingDisplay rating={review.rating} showText={false} size="sm" />
                                <span className="text-sm text-gray-500">
                                  {new Date(review.created_at).toLocaleDateString('he-IL')}
                                </span>
                              </div>
                              {review.comment && (
                                <p className="text-gray-700">{review.comment}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-8">אין ביקורות עדיין</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="availability" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>זמינות ויומן</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {service.has_calendar_integration ? (
                        <ServiceAvailabilityTab serviceId={service.id} />
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500 mb-4">יומן לא מחובר למערכת</p>
                          <p className="text-sm text-gray-400">
                            ליצירת קשר לבדיקת זמינות, השתמשו בפרטי הקשר של הספק
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* עמודה צדדית */}
            <div className="lg:col-span-1">
              {/* פרטי ספק */}
              {provider && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      פרטי הספק
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <Link 
                        to={`/provider/${provider.id}`}
                        className="block mb-3 hover:text-blue-600"
                      >
                        <h4 className="text-lg font-semibold">{provider.name}</h4>
                      </Link>
                      
                      {provider.rating > 0 && (
                        <RatingDisplay 
                          rating={provider.rating} 
                          reviewCount={provider.review_count}
                          size="sm"
                        />
                      )}
                    </div>
                    
                    {provider.city && (
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{provider.city}</span>
                      </div>
                    )}
                    
                    {provider.phone && (
                      <div className="flex items-center gap-2 mb-3">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{provider.phone}</span>
                      </div>
                    )}
                    
                    {provider.email && (
                      <div className="flex items-center gap-2 mb-4">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{provider.email}</span>
                      </div>
                    )}
                    
                    <Link to={`/provider/${provider.id}`}>
                      <Button variant="outline" className="w-full">
                        צפה בספק
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
              
              {/* כפתורי פעולה */}
              <Card>
                <CardHeader>
                  <CardTitle>הזמנת השירות</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {formatPrice(service.base_price, service.price_unit, service.price_type)}
                    </div>
                    <p className="text-gray-600 text-sm">מחיר בסיס</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full">
                      הזמן עכשיו
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      בקש הצעת מחיר
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={toggleWishlist}
                    >
                      <Heart className={`h-4 w-4 ml-2 ${isInWishlist ? 'fill-current text-red-500' : ''}`} />
                      {isInWishlist ? 'הסר מהמועדפים' : 'הוסף למועדפים'}
                    </Button>
                  </div>
                  
                  {service.free_cancellation_days > 0 && (
                    <Alert className="mt-4">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        ביטול חינם עד {service.free_cancellation_days} ימים לפני האירוע
                      </AlertDescription>
                    </Alert>
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

export default ServiceDetails;
