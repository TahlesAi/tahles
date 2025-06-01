
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceBreadcrumbs from "@/components/service/ServiceBreadcrumbs";
import ServiceGallery from "@/components/service/ServiceGallery";
import ServiceHeader from "@/components/service/ServiceHeader";
import ServiceDetailInfo from "@/components/service/ServiceDetailInfo";
import ServiceBookingCard from "@/components/service/ServiceBookingCard";
import ServiceReviewsTab from "@/components/service/ServiceReviewsTab";
import ServiceAvailabilityTab from "@/components/service/ServiceAvailabilityTab";
import ServiceLocationTab from "@/components/service/ServiceLocationTab";
import ServiceLoadingState from "@/components/service/ServiceLoadingState";
import ServiceErrorState from "@/components/service/ServiceErrorState";
import ServiceAvailabilityCalendar from "@/components/service/ServiceAvailabilityCalendar";
import AdvancedServiceDetails from "@/components/service/AdvancedServiceDetails";

import { saveServiceForLater, isServiceSaved, removeSavedService } from "@/components/provider/ServiceCard";
import { getServiceById, getProviderById, getReviewsByService } from "@/lib/unifiedMockData";
import { Commission } from "@/types";

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [mediaGallery, setMediaGallery] = useState<{type: 'image' | 'video', url: string}[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pricingDetails, setPricingDetails] = useState<any>({});
  const [selectedDateTime, setSelectedDateTime] = useState<{date: string, time: string}>({date: '', time: ''});
  
  // הגדרת עמלה דיפולטיבית - 5% כפי שציינת
  const commission: Commission = {
    rate: 0.05, // 5%
    type: 'percentage',
    includesProcessingFees: true
  };
  
  useEffect(() => {
    console.log('ServiceDetails: Starting with ID:', id);
    
    // Check if service is saved
    if (id) {
      setIsSaved(isServiceSaved(id));
    }
    
    const fetchServiceDetails = async () => {
      if (!id) {
        console.error('No service ID provided');
        setError("מזהה שירות חסר");
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        console.log('Fetching service details for ID:', id);
        
        // Try unified mock data first
        const mockService = getServiceById(id);
        console.log('Found mock service:', mockService?.name || 'Not found');
        
        if (mockService) {
          const mockProvider = getProviderById(mockService.providerId);
          console.log('Found mock provider:', mockProvider?.businessName || 'Not found');
          
          if (mockProvider) {
            const mockReviews = getReviewsByService(id);
            console.log('Found mock reviews:', mockReviews.length);
            
            // Transform unified service to expected format with safe property access
            const transformedService = {
              id: mockService.id,
              name: mockService.name,
              description: mockService.description,
              price: mockService.price,
              price_unit: mockService.priceUnit || 'לאירוע',
              price_range: `₪${mockService.price} ${mockService.priceUnit || 'לאירוע'}`,
              imageUrl: mockService.imageUrl,
              image_url: mockService.imageUrl,
              additional_images: mockService.additionalImages || [],
              videos: mockService.videos || [],
              provider_id: mockService.providerId,
              providerId: mockService.providerId,
              category: mockService.category,
              subcategory: mockService.subcategory,
              location: mockService.location,
              suitableFor: mockService.suitableFor || [],
              tags: mockService.tags || [],
              rating: mockService.rating,
              reviewCount: mockService.reviewCount,
              featured: mockService.featured,
              // Enhanced features for new system - safe access
              audienceSize: mockService.audienceSize || { min: 10, max: 200, optimal: 50 },
              duration: mockService.duration || 120, // 2 hours in minutes
              features: [
                'ביצוע מקצועי ברמה הגבוהה ביותר',
                'התאמה מלאה לקהל הלקוחות',
                'ציוד מקצועי כלול במחיר',
                'גמישות בתאריכים ושעות',
                'אחריות מלאה על הביצוע'
              ],
              technicalRequirements: mockService.technicalRequirements || [],
              setupTime: mockService.setupTime || 30
            };
            
            // Transform provider to expected format with calendar info
            const transformedProvider = {
              id: mockProvider.id,
              name: mockProvider.businessName,
              businessName: mockProvider.businessName,
              description: mockProvider.description,
              city: mockProvider.city,
              contact_phone: mockProvider.phone,
              contact_email: mockProvider.email,
              website: mockProvider.website,
              rating: mockProvider.rating,
              review_count: mockProvider.reviewCount,
              is_verified: mockProvider.verified,
              logo_url: mockProvider.logo,
              gallery: mockProvider.gallery || [],
              // Calendar information
              workingHours: {
                sunday: { start: '09:00', end: '22:00', available: true },
                monday: { start: '09:00', end: '22:00', available: true },
                tuesday: { start: '09:00', end: '22:00', available: true },
                wednesday: { start: '09:00', end: '22:00', available: true },
                thursday: { start: '09:00', end: '22:00', available: true },
                friday: { start: '09:00', end: '15:00', available: true },
                saturday: { start: '20:00', end: '23:00', available: true }
              }
            };
            
            console.log('Setting service and provider data with enhanced features');
            setService(transformedService);
            setProvider(transformedProvider);
            setReviews(mockReviews);
            
            // Create comprehensive media gallery
            const gallery = [];
            
            // Add main service image
            if (mockService.imageUrl) {
              gallery.push({ type: 'image', url: mockService.imageUrl });
            }
            
            // Add additional service images - safe access
            if (mockService.additionalImages && Array.isArray(mockService.additionalImages)) {
              mockService.additionalImages.forEach((img: string) => {
                if (img && img !== mockService.imageUrl) {
                  gallery.push({ type: 'image', url: img });
                }
              });
            }
            
            // Add provider gallery images
            if (mockProvider.gallery && Array.isArray(mockProvider.gallery)) {
              mockProvider.gallery.forEach((img: string) => {
                if (img && img !== mockService.imageUrl) {
                  gallery.push({ type: 'image', url: img });
                }
              });
            }
            
            // Add videos - safe access
            if (mockService.videos && Array.isArray(mockService.videos)) {
              mockService.videos.forEach((video: string) => {
                if (video) {
                  gallery.push({ type: 'video', url: video });
                }
              });
            }
            
            console.log('Created media gallery with', gallery.length, 'items');
            setMediaGallery(gallery);
            setIsLoading(false);
            return;
          }
        }
        
        console.log('Service not found in unified data, trying Supabase...');
        
        // Fallback to Supabase if mock data not found
        const { data: serviceData, error: serviceError } = await supabase
          .from('services')
          .select(`
            *,
            providers:provider_id (*)
          `)
          .eq('id', id)
          .single();
        
        if (serviceError) {
          console.error('Supabase service error:', serviceError);
          throw new Error("השירות לא נמצא במערכת");
        }
        
        if (!serviceData) {
          throw new Error("השירות לא נמצא");
        }
        
        setService(serviceData);
        setProvider(serviceData.providers);
        
        // Create media gallery from Supabase data
        const gallery = [];
        
        if (serviceData.image_url) {
          gallery.push({ type: 'image', url: serviceData.image_url });
        }
        
        if (serviceData.additional_images && Array.isArray(serviceData.additional_images)) {
          serviceData.additional_images.forEach((img: string) => {
            if (img) {
              gallery.push({ type: 'image', url: img });
            }
          });
        }
        
        if (serviceData.videos && Array.isArray(serviceData.videos)) {
          serviceData.videos.forEach((video: string) => {
            if (video) {
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
  
  const handlePriceUpdate = (newPrice: number, details: any) => {
    setTotalPrice(newPrice);
    setPricingDetails(details);
    console.log('Price updated:', newPrice, 'Commission:', details.commission);
  };

  const handleDateTimeSelect = (date: string, timeSlot: string) => {
    setSelectedDateTime({ date, time: timeSlot });
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
        price_range: service.price_range || `${service.price} ${service.price_unit || ''}`,
        provider_id: service.provider_id || service.providerId,
        provider_name: provider?.name || provider?.businessName || "ספק שירות",
        image_url: service.image_url || service.imageUrl,
        saved_at: new Date().toISOString()
      };
      
      saveServiceForLater(serviceToSave);
      setIsSaved(true);
      toast.success("השירות נשמר בהצלחה");
    }
  };
  
  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : (service?.rating || 0);
  
  console.log('Render state - isLoading:', isLoading, 'service:', !!service, 'provider:', !!provider, 'error:', error);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <ServiceLoadingState />
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !service || !provider) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <ServiceErrorState error={error || "השירות לא נמצא"} />
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ServiceBreadcrumbs service={service} />
        
        <div className="container px-4 py-8">
          <div className="flex flex-col-reverse lg:flex-row gap-8">
            {/* Service Details */}
            <div className="lg:w-2/3">
              <ServiceGallery mediaGallery={mediaGallery} serviceName={service.name} />
              
              <ServiceHeader 
                service={service} 
                provider={provider} 
                averageRating={averageRating} 
                reviewCount={reviews.length || service.reviewCount || 0} 
              />
              
              <ServiceDetailInfo service={service} showMedia={false} />
              
              {/* Advanced Service Details with Enhanced Pricing and Commission */}
              <div className="mb-8">
                <AdvancedServiceDetails
                  service={service}
                  provider={provider}
                  onPriceUpdate={handlePriceUpdate}
                  commission={commission}
                />
              </div>
              
              {/* Availability Calendar */}
              <div className="mb-8">
                <ServiceAvailabilityCalendar 
                  serviceId={service.id}
                  onDateSelect={handleDateTimeSelect}
                />
              </div>
              
              {/* Tabs */}
              <Tabs defaultValue="reviews">
                <TabsList className="w-full">
                  <TabsTrigger value="reviews" className="flex-1">ביקורות</TabsTrigger>
                  <TabsTrigger value="availability" className="flex-1">זמינות</TabsTrigger>
                  <TabsTrigger value="location" className="flex-1">מיקום</TabsTrigger>
                  <TabsTrigger value="technical" className="flex-1">מידע טכני</TabsTrigger>
                </TabsList>
                
                <TabsContent value="reviews">
                  <ServiceReviewsTab reviews={reviews} averageRating={averageRating} />
                </TabsContent>
                
                <TabsContent value="availability">
                  <ServiceAvailabilityTab serviceId={service.id} />
                </TabsContent>
                
                <TabsContent value="location">
                  <ServiceLocationTab 
                    provider={provider} 
                    serviceLocation={service.location} 
                  />
                </TabsContent>
                
                <TabsContent value="technical">
                  <div className="pt-4">
                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                      <h3 className="text-lg font-semibold mb-4">דרישות טכניות והערות</h3>
                      {service.technicalRequirements && service.technicalRequirements.length > 0 ? (
                        <ul className="space-y-2">
                          {service.technicalRequirements.map((req: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">אין דרישות טכניות מיוחדות לשירות זה</p>
                      )}
                      
                      <div className="mt-4 p-4 bg-white rounded border">
                        <h4 className="font-medium mb-2">הערות נוספות:</h4>
                        <p className="text-sm text-gray-600">
                          • הגעה לאתר {service.setupTime || 30} דקות לפני תחילת המופע
                          • במקרה של שינויים דחופים, יש ליצור קשר 24 שעות מראש
                          • במקרה של אירוע חיצוני, יש לספק מזג אוויר מתאים או הגנה
                          • עמלת פלטפורמה: {(commission.rate * 100).toFixed(1)}% כלולה במחיר הסופי
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Card */}
            <div className="lg:w-1/3">
              <ServiceBookingCard 
                service={{
                  ...service,
                  calculatedPrice: totalPrice || service.price,
                  pricingDetails,
                  selectedDateTime,
                  commission: {
                    amount: totalPrice * commission.rate,
                    rate: commission.rate,
                    included: commission.includesProcessingFees
                  }
                }}
                provider={provider}
                averageRating={averageRating}
                reviewCount={reviews.length || service.reviewCount || 0}
                isSaved={isSaved}
                toggleSave={toggleSave}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
