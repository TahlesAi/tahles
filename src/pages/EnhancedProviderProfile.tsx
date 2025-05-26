
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProviderBusinessProfile from "@/components/provider/ProviderBusinessProfile";
import ProductGrid from "@/components/provider/ProductGrid";
import { useEventContext } from "@/context/EventContext";
import { mockProviders } from '@/lib/mockData';

const EnhancedProviderProfile = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const { providers, services } = useEventContext();
  const [provider, setProvider] = useState<any>(null);
  const [providerServices, setProviderServices] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    if (!providerId) return;

    // Try to find provider in context first
    let foundProvider = providers.find(p => p.id === providerId);
    
    // If not found in context, try mock data
    if (!foundProvider) {
      foundProvider = mockProviders.find(p => p.id === providerId);
    }

    if (foundProvider) {
      // Enhance provider with additional business profile data
      const enhancedProvider = {
        ...foundProvider,
        serviceAreas: foundProvider.serviceAreas || ['כל הארץ'],
        experience: foundProvider.experience || 'מעל 5 שנות ניסיון בתחום',
        specialties: foundProvider.specialties || ['מקצועיות גבוהה', 'שירות אישי', 'אמינות'],
        testimonials: foundProvider.testimonials || [
          {
            id: '1',
            text: 'שירות מעולה ומקצועי. הייתי מרוצה מאוד מהביצוע!',
            author: 'לקוח מרוצה',
            rating: 5
          }
        ],
        socialLinks: foundProvider.socialLinks || {}
      };

      setProvider(enhancedProvider);

      // Get services for this provider
      const relatedServices = services.filter(s => 
        s.provider_id === providerId || s.providerId === providerId
      );
      
      // Convert services to expected format
      const formattedServices = relatedServices.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        price: typeof service.price === 'number' ? service.price : 
               parseFloat(service.price_range?.replace(/[^\d.-]/g, '') || '0'),
        price_unit: service.price_unit || service.priceUnit || 'לאירוע',
        imageUrl: service.image_url || service.imageUrl,
        audienceSize: service.audience_size || service.audienceSize,
        duration: service.duration,
        location: service.location || foundProvider.city || 'כל הארץ',
        rating: service.rating,
        review_count: service.review_count || service.reviewCount,
        tags: service.tags || service.features || [],
        is_featured: service.is_featured,
        suitableFor: service.suitableFor || service.event_types || [],
        technicalRequirements: service.technicalRequirements || service.technical_requirements || []
      }));

      setProviderServices(formattedServices);

      // Create gallery from provider and services
      const galleryItems = [];
      
      // Add provider logo as first image
      if (foundProvider.logo_url) {
        galleryItems.push({
          type: 'image',
          url: foundProvider.logo_url
        });
      }

      // Add service images
      relatedServices.forEach(service => {
        if (service.image_url || service.imageUrl) {
          galleryItems.push({
            type: 'image',
            url: service.image_url || service.imageUrl
          });
        }
        
        // Add additional images
        const additionalImages = service.additional_images || service.additionalImages || [];
        additionalImages.forEach((img: string) => {
          galleryItems.push({
            type: 'image',
            url: img
          });
        });

        // Add videos
        const videos = service.videos || service.video_urls || [];
        videos.forEach((video: string) => {
          galleryItems.push({
            type: 'video',
            url: video
          });
        });
      });

      setGallery(galleryItems);
    }
  }, [providerId, providers, services]);

  if (!provider) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">טוען פרטי ספק...</h2>
            <p className="text-gray-600">אנא המתן</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container px-4 py-8">
          <div className="space-y-8">
            {/* Business Profile */}
            <ProviderBusinessProfile 
              provider={provider} 
              gallery={gallery}
            />
            
            {/* Products Grid */}
            <ProductGrid 
              products={providerServices}
              providerId={provider.id}
              providerName={provider.name}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EnhancedProviderProfile;
