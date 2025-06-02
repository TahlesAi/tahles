
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceHeader from "@/components/service/ServiceHeader";
import ServiceGallery from "@/components/service/ServiceGallery";
import ServicePricing from "@/components/service/ServicePricing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  CheckCircle,
  Star,
  Heart,
  Share2
} from "lucide-react";
import { getServiceById, getProviderById, getReviewsByService } from "@/lib/unifiedMockData";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";

const ServiceDetails = () => {
  const { id, serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // נשתמש ב-id או ב-serviceId, כל מה שזמין
  const actualId = id || serviceId;

  useEffect(() => {
    if (actualId) {
      loadServiceData(actualId);
    }
  }, [actualId]);

  const loadServiceData = async (serviceId: string) => {
    setIsLoading(true);
    try {
      // נטען את השירות
      const serviceData = getServiceById(serviceId);
      if (serviceData) {
        setService(serviceData);
        
        // נטען את הספק - תיקון השדה providerId
        const providerId = serviceData.providerId || serviceData.provider_id;
        if (providerId) {
          const providerData = getProviderById(providerId);
          setProvider(providerData);
        }
        
        // נטען ביקורות
        const serviceReviews = getReviewsByService(serviceId);
        setReviews(serviceReviews);
      } else {
        console.warn('Service not found:', serviceId);
      }
    } catch (error) {
      console.error('Error loading service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container px-4">
            <SkeletonLoader variant="card" className="h-64 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SkeletonLoader variant="card" count={2} className="md:col-span-2" />
              <SkeletonLoader variant="card" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container px-4 text-center">
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl font-bold mb-4">השירות לא נמצא</h1>
              <p className="text-gray-600 mb-6">מצטערים, לא הצלחנו למצוא את השירות המבוקש</p>
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : service.rating || 0;

  // יצירת מבנה הגלריה
  const mediaGallery = [];
  
  // הוספת התמונה הראשית
  if (service.imageUrl || service.image_url) {
    mediaGallery.push({
      type: 'image' as const,
      url: service.imageUrl || service.image_url
    });
  }
  
  // הוספת תמונות נוספות
  if (service.additionalImages || service.additional_images) {
    const additionalImages = service.additionalImages || service.additional_images;
    additionalImages.forEach((url: string) => {
      mediaGallery.push({
        type: 'image' as const,
        url
      });
    });
  }
  
  // הוספת סרטונים
  if (service.videos || service.video_urls) {
    const videos = service.videos || service.video_urls;
    videos.forEach((url: string) => {
      mediaGallery.push({
        type: 'video' as const,
        url
      });
    });
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            חזרה
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Service Header */}
              {provider && (
                <ServiceHeader 
                  service={service}
                  provider={provider}
                  averageRating={averageRating}
                  reviewCount={reviews.length}
                />
              )}

              {/* Gallery - תיקון ה-props */}
              <ServiceGallery 
                mediaGallery={mediaGallery}
                serviceName={service.name}
              />

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">סקירה</TabsTrigger>
                  <TabsTrigger value="details">פרטים</TabsTrigger>
                  <TabsTrigger value="reviews">ביקורות</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">תיאור מפורט</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">{service.description}</p>
                      
                      {/* Features */}
                      {service.features && service.features.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">מה כלול בשירות:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {service.features.map((feature: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Suitable For */}
                      {service.suitableFor && service.suitableFor.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3">מתאים עבור:</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.suitableFor.map((audience: string, idx: number) => (
                              <Badge key={idx} variant="outline">{audience}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="details" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">פרטים טכניים</h3>
                      <div className="space-y-4">
                        {service.duration && (
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-gray-400" />
                            <span>משך השירות: {service.duration}</span>
                          </div>
                        )}
                        
                        {service.audienceSize && (
                          <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-gray-400" />
                            <span>
                              גודל קהל: {service.audienceSize.min}-{service.audienceSize.max} משתתפים
                              {service.audienceSize.optimal && ` (אופטימלי: ${service.audienceSize.optimal})`}
                            </span>
                          </div>
                        )}
                        
                        {service.location && (
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <span>אזור שירות: {service.location}</span>
                          </div>
                        )}
                        
                        {service.technicalRequirements && service.technicalRequirements.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">דרישות טכניות:</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {service.technicalRequirements.map((req: string, idx: number) => (
                                <li key={idx}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">ביקורות לקוחות</h3>
                      {reviews.length > 0 ? (
                        <div className="space-y-6">
                          {reviews.map((review) => (
                            <div key={review.id} className="border-b pb-4 last:border-b-0">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{review.customerName || 'לקוח'}</span>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="text-sm mr-1">{review.rating}</span>
                                  </div>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(review.createdAt || review.created_at).toLocaleDateString('he-IL')}
                                </span>
                              </div>
                              {review.comment && (
                                <p className="text-gray-700">{review.comment}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <h4 className="text-lg font-medium text-gray-900 mb-2">עדיין אין ביקורות</h4>
                          <p className="text-gray-600">תהיו הראשונים לכתוב ביקורת על השירות</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Pricing Card - תיקון ה-props */}
              <ServicePricing 
                service={service}
                basePrice={service.price || service.basePrice || 0}
                onPriceUpdate={() => {}}
              />
              
              {/* Provider Card */}
              {provider && (
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">על הספק</h3>
                    <div className="flex items-center gap-3 mb-4">
                      {(provider.logo_url || provider.logoUrl) && (
                        <img 
                          src={provider.logo_url || provider.logoUrl} 
                          alt={provider.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <h4 className="font-medium">{provider.name}</h4>
                        {provider.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm">{Number(provider.rating).toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button asChild variant="outline" className="w-full">
                      <a href={`/provider/${provider.id}`}>צפה בפרופיל המלא</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {/* Actions */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Calendar className="h-4 w-4 ml-2" />
                      הזמן עכשיו
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
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
