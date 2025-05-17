
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Users, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Share2,
  Heart,
  Bookmark,
  Image as ImageIcon,
  Play,
  CheckCircle,
  X,
  Info
} from "lucide-react";
import { mockSearchResults, mockProviders, mockReviews } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { saveServiceForLater, isServiceSaved, removeSavedService } from "@/components/provider/ServiceCard";
import ServiceDetailInfo from "@/components/service/ServiceDetailInfo";

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [mediaGallery, setMediaGallery] = useState<{type: 'image' | 'video', url: string}[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if service is saved
    if (id) {
      setIsSaved(isServiceSaved(id));
    }
    
    const fetchServiceDetails = async () => {
      if (!id) {
        setError("מזהה שירות חסר");
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Fetch service data
        const { data: serviceData, error: serviceError } = await supabase
          .from('services')
          .select(`
            *,
            providers:provider_id (*)
          `)
          .eq('id', id)
          .single();
        
        if (serviceError) {
          throw serviceError;
        }
        
        if (!serviceData) {
          throw new Error("השירות לא נמצא");
        }
        
        setService(serviceData);
        setProvider(serviceData.providers);
        
        // Create media gallery
        const gallery = [];
        
        // Add main image first
        if (serviceData.image_url) {
          gallery.push({ type: 'image', url: serviceData.image_url });
        }
        
        // Check for additional images - make sure it exists and is an array
        if (serviceData.additional_images && 
            Array.isArray(serviceData.additional_images)) {
          serviceData.additional_images.forEach((img: string) => {
            if (img) { // Additional null check
              gallery.push({ type: 'image', url: img });
            }
          });
        }
        
        // Check for videos - make sure it exists and is an array
        if (serviceData.videos && 
            Array.isArray(serviceData.videos)) {
          serviceData.videos.forEach((video: string) => {
            if (video) { // Additional null check
              gallery.push({ type: 'video', url: video });
            }
          });
        }
        
        setMediaGallery(gallery);
        
        // Fetch reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('*')
          .eq('service_id', id)
          .eq('is_approved', true)
          .order('created_at', { ascending: false });
          
        if (reviewsError) {
          console.error("Error fetching reviews:", reviewsError);
        } else {
          setReviews(reviewsData || []);
        }
        
      } catch (error: any) {
        console.error("Error fetching service details:", error);
        setError(error.message);
        toast.error("שגיאה בטעינת השירות", {
          description: error.message
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServiceDetails();
    
    // Listen for saved services updates
    const handleSavedServicesUpdate = () => {
      if (id) {
        setIsSaved(isServiceSaved(id));
      }
    };
    
    window.addEventListener("savedServicesUpdated", handleSavedServicesUpdate);
    
    return () => {
      window.removeEventListener("savedServicesUpdated", handleSavedServicesUpdate);
    };
  }, [id]);
  
  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? mediaGallery.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === mediaGallery.length - 1 ? 0 : prev + 1));
  };
  
  const toggleSave = () => {
    if (!service) return;
    
    if (isSaved) {
      removeSavedService(service.id);
      setIsSaved(false);
      toast.success("השירות הוסר מהשמורים");
    } else {
      const serviceToSave = {
        id: service.id,
        name: service.name,
        short_description: service.description,
        price_range: service.price_range,
        provider_id: service.provider_id,
        provider_name: provider?.name || "ספק שירות",
        image_url: service.image_url,
        saved_at: new Date().toISOString()
      };
      
      saveServiceForLater(serviceToSave);
      setIsSaved(true);
      toast.success("השירות נשמר בהצלחה");
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !service || !provider) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-sm">
            <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">השירות לא נמצא</h2>
            <p className="mb-4 text-gray-600">{error || "לא הצלחנו למצוא את השירות המבוקש"}</p>
            <Button onClick={() => navigate(-1)}>חזרה</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-2">
          <div className="container px-4">
            <div className="flex text-sm text-gray-600">
              <Link to="/" className="hover:text-brand-600">ראשי</Link>
              <span className="mx-2">/</span>
              <Link to="/categories" className="hover:text-brand-600">קטגוריות</Link>
              {service.category_name && (
                <>
                  <span className="mx-2">/</span>
                  <Link 
                    to={`/categories/${service.category_id}`} 
                    className="hover:text-brand-600"
                  >
                    {service.category_name}
                  </Link>
                </>
              )}
              {service.subcategory_name && (
                <>
                  <span className="mx-2">/</span>
                  <Link 
                    to={`/subcategories/${service.subcategory_id}`}
                    className="hover:text-brand-600"
                  >
                    {service.subcategory_name}
                  </Link>
                </>
              )}
              <span className="mx-2">/</span>
              <span className="text-gray-800 font-medium">{service.name}</span>
            </div>
          </div>
        </div>
        
        <div className="container px-4 py-8">
          <div className="flex flex-col-reverse lg:flex-row gap-8">
            {/* Service Details */}
            <div className="lg:w-2/3">
              {/* Image Gallery */}
              <div className="relative rounded-xl overflow-hidden mb-8 aspect-[16/9]">
                {mediaGallery.length > 0 && mediaGallery[selectedImageIndex].type === 'image' ? (
                  <img 
                    src={mediaGallery[selectedImageIndex].url || "/placeholder.svg"} 
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                ) : mediaGallery.length > 0 && mediaGallery[selectedImageIndex].type === 'video' ? (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <video 
                      src={mediaGallery[selectedImageIndex].url} 
                      controls 
                      className="max-h-full max-w-full"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-gray-300" />
                  </div>
                )}
                
                {/* Media type indicator */}
                {mediaGallery.length > 0 && (
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center">
                    {mediaGallery[selectedImageIndex].type === 'image' ? (
                      <>
                        <ImageIcon className="h-3 w-3 ml-1" />
                        תמונה
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3 ml-1" />
                        סרטון
                      </>
                    )}
                  </div>
                )}
                
                {/* Image Navigation */}
                {mediaGallery.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="rounded-full bg-white/80"
                      onClick={handlePrevImage}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="rounded-full bg-white/80"
                      onClick={handleNextImage}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                  </div>
                )}
                
                {/* Image Counter */}
                {mediaGallery.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {selectedImageIndex + 1} / {mediaGallery.length}
                  </div>
                )}
              </div>
              
              {/* Thumbnails */}
              {mediaGallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
                  {mediaGallery.map((media, idx) => (
                    <div 
                      key={idx} 
                      className={`w-20 h-20 rounded overflow-hidden cursor-pointer flex-shrink-0 border-2 relative ${
                        idx === selectedImageIndex ? 'border-brand-500' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImageIndex(idx)}
                    >
                      {media.type === 'image' ? (
                        <img 
                          src={media.url} 
                          alt={`תמונה ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Service Info */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
                
                <div className="flex flex-wrap gap-y-2 items-center text-sm text-gray-600 mb-4">
                  {reviews.length > 0 && (
                    <div className="flex items-center ml-4">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
                      <span className="font-medium">{averageRating.toFixed(1)}</span>
                      <span className="text-gray-500 mr-1">({reviews.length} ביקורות)</span>
                    </div>
                  )}
                  
                  {service.location && (
                    <div className="flex items-center ml-4">
                      <MapPin className="h-4 w-4 ml-1" />
                      <span>{service.location}</span>
                    </div>
                  )}
                  
                  {service.duration && (
                    <div className="flex items-center ml-4">
                      <Clock className="h-4 w-4 ml-1" />
                      <span>{service.duration}</span>
                    </div>
                  )}
                </div>
                
                {/* Provider Info */}
                <Link 
                  to={`/providers/${provider.id}`}
                  className="flex items-center mb-6 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={provider.logo_url} alt={provider.name} />
                    <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="mr-3">
                    <div className="font-medium">{provider.name}</div>
                    <div className="text-sm text-gray-500">ספק שירות מאומת</div>
                  </div>
                </Link>
                
                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">תיאור השירות</h2>
                  <p className="text-gray-700 leading-relaxed">{service.description}</p>
                </div>
                
                {/* Service Features */}
                {service.features && service.features.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">יתרונות השירות</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-brand-500 shrink-0 mt-0.5 ml-2" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Using the ServiceDetailInfo component for service details */}
                <ServiceDetailInfo service={service} showMedia={false} />
              </div>
              
              {/* Tabs */}
              <Tabs defaultValue="reviews">
                <TabsList className="w-full">
                  <TabsTrigger value="reviews" className="flex-1">ביקורות</TabsTrigger>
                  <TabsTrigger value="availability" className="flex-1">זמינות</TabsTrigger>
                  <TabsTrigger value="location" className="flex-1">מיקום</TabsTrigger>
                </TabsList>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews" className="pt-4">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">דירוג וביקורות</h3>
                    <div className="flex items-center mb-4">
                      <div className="text-4xl font-bold ml-3">{averageRating.toFixed(1)}</div>
                      <div>
                        <div className="flex">
                          {Array(5).fill(0).map((_, idx) => (
                            <Star 
                              key={idx} 
                              className={`h-5 w-5 ${
                                idx < Math.floor(averageRating) 
                                  ? "text-yellow-400 fill-yellow-400" 
                                  : "text-gray-300"
                              }`} 
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-500">{reviews.length} ביקורות</div>
                      </div>
                    </div>
                  </div>
                  
                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map((review: any) => (
                        <div key={review.id} className="border-b pb-4">
                          <div className="flex items-start">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{review.customer_name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="mr-3 flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <div className="font-medium">{review.customer_name}</div>
                                <div className="text-sm text-gray-500">
                                  {format(new Date(review.created_at), 'dd/MM/yyyy')}
                                </div>
                              </div>
                              <div className="flex mb-2">
                                {Array(5).fill(0).map((_, idx) => (
                                  <Star 
                                    key={idx} 
                                    className={`h-4 w-4 ${
                                      idx < review.rating 
                                        ? "text-yellow-400 fill-yellow-400" 
                                        : "text-gray-300"
                                    }`} 
                                  />
                                ))}
                              </div>
                              {review.comment && <p className="text-gray-700">{review.comment}</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <Star className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                      <h3 className="text-lg font-medium mb-1">אין ביקורות עדיין</h3>
                      <p className="text-gray-500">היה הראשון לכתוב ביקורת על שירות זה!</p>
                    </div>
                  )}
                </TabsContent>
                
                {/* Availability Tab */}
                <TabsContent value="availability" className="pt-4">
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Calendar className="h-10 w-10 mx-auto mb-2 text-gray-500" />
                    <h3 className="text-lg font-medium mb-2">בדיקת זמינות והזמנה</h3>
                    <p className="text-gray-500 mb-4 max-w-md mx-auto">
                      לבדיקת זמינות והזמנה עבור השירות שבחרתם, לחצו על כפתור "הזמן עכשיו" ומלאו את הפרטים הנדרשים
                    </p>
                    <Button onClick={() => navigate(`/booking/${service.id}`)}>הזמן עכשיו</Button>
                  </div>
                </TabsContent>
                
                {/* Location Tab */}
                <TabsContent value="location" className="pt-4">
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <MapPin className="h-10 w-10 mx-auto mb-4 text-gray-500" />
                    {provider.address || service.location ? (
                      <>
                        <h3 className="font-medium mb-2">מיקום השירות</h3>
                        <p className="text-gray-700">{provider.address || service.location}</p>
                        {provider.travel_distance && (
                          <div className="mt-4 text-sm p-2 bg-gray-100 rounded inline-block">
                            ספק השירות מוכן להגיע למרחק של עד {provider.travel_distance} ק"מ
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <h3 className="font-medium mb-2">מיקום לא זמין</h3>
                        <p className="text-gray-500">אין פרטי מיקום זמינים לשירות זה</p>
                        <p className="text-sm mt-2">
                          צרו קשר עם הספק לפרטים נוספים אודות מיקום השירות
                        </p>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Card */}
            <div className="lg:w-1/3">
              <div className="border rounded-lg bg-white p-6 shadow-sm sticky top-20">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-2xl font-bold">{service.price_range}</div>
                  <div className="text-gray-500">{service.price_unit || 'לאירוע'}</div>
                </div>
                
                <div className="border-t border-b py-4 my-4">
                  <Button 
                    className="w-full bg-brand-600 hover:bg-brand-700 mb-3"
                    onClick={() => navigate(`/booking/${service.id}`)}
                  >
                    הזמן עכשיו
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={toggleSave}
                  >
                    {isSaved ? (
                      <>
                        <Bookmark className="ml-2 h-4 w-4 fill-current" />
                        נשמר למועדפים
                      </>
                    ) : (
                      <>
                        <Bookmark className="ml-2 h-4 w-4" />
                        שמור למועדפים
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex">
                    <div className="w-5 text-gray-500 ml-2">
                      <User className="h-4 w-4" />
                    </div>
                    <div>איש קשר: {provider.contact_person || provider.name}</div>
                  </div>
                  
                  {(provider.address || service.location) && (
                    <div className="flex">
                      <div className="w-5 text-gray-500 ml-2">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>מיקום: {provider.address || service.location}</div>
                    </div>
                  )}
                  
                  {reviews.length > 0 && (
                    <div className="flex">
                      <div className="w-5 text-gray-500 ml-2">
                        <Star className="h-4 w-4" />
                      </div>
                      <div>דירוג: {averageRating.toFixed(1)} ({reviews.length} ביקורות)</div>
                    </div>
                  )}
                </div>
                
                <Card className="mt-4 border-brand-100 bg-brand-50">
                  <CardContent className="p-3 text-sm">
                    <p className="font-medium mb-1 text-brand-700">אחריות מלאה</p>
                    <p className="text-gray-600">
                      אנו מבטיחים חוויית לקוח מושלמת ושירות אמין.
                      אחריות על כל השירותים המוצעים באתר.
                    </p>
                  </CardContent>
                </Card>
                
                <Button 
                  variant="ghost" 
                  className="w-full mt-4 text-gray-500"
                  onClick={() => {
                    // In a real app, this would open a share dialog
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("הקישור הועתק", { description: "כעת ניתן לשתף את השירות עם אחרים" });
                  }}
                >
                  <Share2 className="ml-2 h-4 w-4" />
                  שתף
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
