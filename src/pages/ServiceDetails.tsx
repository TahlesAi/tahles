
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

import { saveServiceForLater, isServiceSaved, removeSavedService } from "@/components/provider/ServiceCard";
import { mockSearchResults, mockProviders, mockReviews } from "@/lib/mockData";
import { expandedMockSearchResults, expandedMockProviders, expandedMockReviews } from "@/lib/mockDataExpanded";

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
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
        
        // ראשית, ננסה להביא מידע ממאגר הנתונים המוגדל
        const combinedMockServices = [...expandedMockSearchResults, ...mockSearchResults];
        const combinedMockProviders = [...expandedMockProviders, ...mockProviders];
        const combinedMockReviews = [...expandedMockReviews, ...mockReviews];
        
        // חפש את השירות לפי המזהה שלו
        const mockService = combinedMockServices.find(s => s.id === id);
        
        // אם נמצא שירות, מצא את הספק המתאים
        const mockProvider = mockService ? 
          combinedMockProviders.find(p => p.id === mockService.providerId) : 
          null;
        
        // מצא ביקורות רלוונטיות לשירות זה
        const mockServiceReviews = combinedMockReviews.filter(r => r.serviceId === id);
        
        if (mockService && mockProvider) {
          // השתמש בנתונים המדומים
          console.log("Using mock data for service:", mockService.name);
          setService(mockService);
          setProvider(mockProvider);
          setReviews(mockServiceReviews);
          
          // יצירת גלריית מדיה
          const gallery = [];
          
          // הוסף תמונה ראשית תחילה
          if (mockService.imageUrl) {
            gallery.push({ type: 'image', url: mockService.imageUrl });
          }
          
          // הוסף תמונות מגלריית הספק
          if (mockProvider.gallery && Array.isArray(mockProvider.gallery)) {
            mockProvider.gallery.forEach((img: string) => {
              if (img) {
                gallery.push({ type: 'image', url: img });
              }
            });
          }
          
          // הוסף תמונות נוספות מהשירות אם יש כאלו
          if (mockService.additionalImages && Array.isArray(mockService.additionalImages)) {
            mockService.additionalImages.forEach((img: string) => {
              if (img) {
                gallery.push({ type: 'image', url: img });
              }
            });
          }
          
          // הוסף סרטונים אם יש כאלו
          if (mockService.videos && Array.isArray(mockService.videos)) {
            mockService.videos.forEach((video: string) => {
              if (video) {
                gallery.push({ type: 'video', url: video });
              }
            });
          }
          
          setMediaGallery(gallery);
          setIsLoading(false);
          return;
        }
        
        // אם לא נמצאו נתונים מדומים, ננסה להביא מ-Supabase
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
        
        // יצירת גלריית מדיה
        const gallery = [];
        
        // הוסף תמונה ראשית תחילה
        if (serviceData.image_url) {
          gallery.push({ type: 'image', url: serviceData.image_url });
        }
        
        // וודא שיש תמונות נוספות וזה מערך
        if (serviceData.additional_images && 
            Array.isArray(serviceData.additional_images)) {
          serviceData.additional_images.forEach((img: string) => {
            if (img) { // בדיקת null נוספת
              gallery.push({ type: 'image', url: img });
            }
          });
        }
        
        // וודא שיש סרטונים וזה מערך
        if (serviceData.videos && 
            Array.isArray(serviceData.videos)) {
          serviceData.videos.forEach((video: string) => {
            if (video) { // בדיקת null נוספת
              gallery.push({ type: 'video', url: video });
            }
          });
        }
        
        setMediaGallery(gallery);
        
        // הבא ביקורות
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
    
    // האזן לעדכונים בשירותים שמורים
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
        price_range: service.price_range || `${service.price} ${service.priceUnit || ''}`,
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
  
  // חישוב דירוג ממוצע
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : (service?.rating || 0);
  
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
          <ServiceErrorState error={error} />
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
              
              {/* Tabs */}
              <Tabs defaultValue="reviews">
                <TabsList className="w-full">
                  <TabsTrigger value="reviews" className="flex-1">ביקורות</TabsTrigger>
                  <TabsTrigger value="availability" className="flex-1">זמינות</TabsTrigger>
                  <TabsTrigger value="location" className="flex-1">מיקום</TabsTrigger>
                </TabsList>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <ServiceReviewsTab reviews={reviews} averageRating={averageRating} />
                </TabsContent>
                
                {/* Availability Tab */}
                <TabsContent value="availability">
                  <ServiceAvailabilityTab serviceId={service.id} />
                </TabsContent>
                
                {/* Location Tab */}
                <TabsContent value="location">
                  <ServiceLocationTab 
                    provider={provider} 
                    serviceLocation={service.location} 
                  />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Card */}
            <div className="lg:w-1/3">
              <ServiceBookingCard 
                service={service}
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
