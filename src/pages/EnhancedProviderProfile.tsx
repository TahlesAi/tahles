
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProviderBusinessProfile from "@/components/provider/ProviderBusinessProfile";
import ProductGrid from "@/components/provider/ProductGrid";
import { useEventContext } from "@/context/EventContext";
import { mockProviders } from '@/lib/mockData';
import { expandedMockProviders } from '@/lib/mockDataExpanded';
import { Provider } from '@/lib/types/hierarchy';
import { ProviderProfile } from '@/lib/types';

const EnhancedProviderProfile = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const { providers, services } = useEventContext();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [providerServices, setProviderServices] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    if (!providerId) return;

    // Try to find provider in context first
    let foundProvider = providers.find(p => p.id === providerId);
    
    // If not found in context, try mock data
    if (!foundProvider) {
      const combinedMockProviders = [...expandedMockProviders, ...mockProviders];
      const mockProvider = combinedMockProviders.find(p => p.id === providerId) as any;
      
      if (mockProvider) {
        // Convert ProviderProfile to Provider format
        foundProvider = {
          id: mockProvider.id,
          name: mockProvider.name || mockProvider.businessName || '',
          description: mockProvider.description || '',
          city: mockProvider.city || '',
          contact_phone: mockProvider.contact_phone || mockProvider.phone || '',
          contact_email: mockProvider.contact_email || mockProvider.email || '',
          contact_person: mockProvider.contact_person || mockProvider.contactPerson || '',
          address: mockProvider.address || '',
          website: mockProvider.website || '',
          rating: mockProvider.rating || 0,
          review_count: mockProvider.review_count || mockProvider.reviewCount || 0,
          is_verified: mockProvider.is_verified || mockProvider.verified || false,
          logo_url: mockProvider.logo_url || mockProvider.logo || '',
          subcategory_ids: mockProvider.subcategory_ids || [],
          category_ids: mockProvider.category_ids || mockProvider.categories || [],
          service_type_ids: mockProvider.service_type_ids || [],
          services: mockProvider.services || []
        };
      }
    }

    if (foundProvider) {
      // Ensure provider has all required Provider type properties
      const enhancedProvider: Provider = {
        id: foundProvider.id,
        name: foundProvider.name || '',
        description: foundProvider.description || '',
        city: foundProvider.city || '',
        contact_phone: foundProvider.contact_phone || '',
        contact_email: foundProvider.contact_email || '',
        contact_person: foundProvider.contact_person || '',
        address: foundProvider.address || '',
        website: foundProvider.website || '',
        rating: foundProvider.rating || 0,
        review_count: foundProvider.review_count || 0,
        is_verified: foundProvider.is_verified || false,
        logo_url: foundProvider.logo_url || '',
        subcategory_ids: foundProvider.subcategory_ids || [],
        category_ids: foundProvider.category_ids || [],
        service_type_ids: foundProvider.service_type_ids || [],
        services: foundProvider.services || [],
        serviceAreas: foundProvider.serviceAreas || [foundProvider.city || 'כל הארץ'],
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
        socialLinks: foundProvider.socialLinks || {},
        mediaLinks: foundProvider.mediaLinks || [],
        clientRecommendations: foundProvider.clientRecommendations || []
      };

      setProvider(enhancedProvider);

      // Get services for this provider
      const relatedServices = services.filter(s => 
        s.provider_id === providerId
      );
      
      // Convert services to expected format
      const formattedServices = relatedServices.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        price: typeof service.price === 'number' ? service.price : 
               parseFloat(service.price_range?.replace(/[^\d.-]/g, '') || '0'),
        price_unit: service.price_unit || 'לאירוע',
        imageUrl: service.imageUrl,
        audienceSize: service.audience_size ? `${service.audience_size}` : undefined,
        duration: service.duration || 'משך האירוע יתואם',
        location: service.location || foundProvider.city || 'כל הארץ',
        rating: service.rating,
        review_count: service.review_count,
        tags: service.tags || [],
        is_featured: service.is_featured,
        suitableFor: service.suitableFor || [],
        technicalRequirements: service.technical_requirements || []
      }));

      setProviderServices(formattedServices);

      // Create gallery from provider and services
      const galleryItems = [];
      
      // Add provider logo as first image
      if (enhancedProvider.logo_url) {
        galleryItems.push({
          type: 'image',
          url: enhancedProvider.logo_url
        });
      }

      // Add service images
      relatedServices.forEach(service => {
        if (service.imageUrl) {
          galleryItems.push({
            type: 'image',
            url: service.imageUrl
          });
        }
        
        // Add additional images
        const additionalImages = service.additional_images || [];
        additionalImages.forEach((img: string) => {
          galleryItems.push({
            type: 'image',
            url: img
          });
        });

        // Add videos
        const videos = service.videos || [];
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
