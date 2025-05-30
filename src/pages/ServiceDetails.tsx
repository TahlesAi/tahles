
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
import { getServiceById, getProviderById, getReviewsByService } from "@/lib/unifiedMockData";

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
        console.log('Loading service details for ID:', id);
        
        // First try to get from unified mock data
        const mockService = getServiceById(id);
        
        if (mockService) {
          console.log("Found service in unified data:", mockService.name);
          const mockProvider = getProviderById(mockService.providerId);
          const mockReviews = getReviewsByService(id);
          
          if (mockProvider) {
            console.log("Found provider in unified data:", mockProvider.businessName);
            
            // Transform the unified service to match the expected format
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
              featured: mockService.featured
            };
            
            // Transform the provider to match expected format
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
              gallery: mockProvider.gallery || []
            };
            
            setService(transformedService);
            setProvider(transformedProvider);
            setReviews(mockReviews);
            
            // Create media gallery
            const gallery = [];
            
            // Add main image first
            if (mockService.imageUrl) {
              gallery.push({ type: 'image', url: mockService.imageUrl });
            }
            
            // Add provider gallery images
            if (mockProvider.gallery && Array.isArray(mockProvider.gallery)) {
              mockProvider.gallery.forEach((img: string) => {
                if (img && img !== mockService.imageUrl) {
                  gallery.push({ type: 'image', url: img });
                }
              });
            }
            
            // Add additional service images
            if (mockService.additionalImages && Array.isArray(mockService.additionalImages)) {
              mockService.additionalImages.forEach((img: string) => {
                if (img && img !== mockService.imageUrl) {
                  gallery.push({ type: 'image', url: img });
                }
              });
            }
            
            // Add videos
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
        }
        
        console.log('Service not found in unified data, trying Supabase...');
        
        // If not found in mock data, try Supabase
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
