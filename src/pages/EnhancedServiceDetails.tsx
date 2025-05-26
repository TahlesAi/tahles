
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DetailedProductPage from "@/components/provider/DetailedProductPage";
import { useEventContext } from "@/context/EventContext";
import { mockSearchResults, mockProviders } from '@/lib/mockData';
import { expandedMockSearchResults, expandedMockProviders } from '@/lib/mockDataExpanded';

const EnhancedServiceDetails = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { services, providers } = useEventContext();
  const [detailedProduct, setDetailedProduct] = useState<any>(null);

  useEffect(() => {
    if (!serviceId) return;

    // Try to find service in context first
    let foundService = services.find(s => s.id === serviceId);
    
    // If not found in context, try mock data
    if (!foundService) {
      const combinedMockServices = [...expandedMockSearchResults, ...mockSearchResults];
      foundService = combinedMockServices.find(s => s.id === serviceId);
    }

    if (foundService) {
      // Find the provider
      const combinedMockProviders = [...expandedMockProviders, ...mockProviders];
      let foundProvider = providers.find(p => 
        p.id === foundService.provider_id || p.id === foundService.providerId
      );
      
      if (!foundProvider) {
        foundProvider = combinedMockProviders.find(p => 
          p.id === foundService.provider_id || p.id === foundService.providerId
        );
      }

      if (foundProvider) {
        // Create detailed product object
        const detailedProduct = {
          id: foundService.id,
          name: foundService.name,
          description: foundService.description || foundService.short_description || '',
          longDescription: foundService.long_description || foundService.description,
          price: typeof foundService.price === 'number' ? foundService.price : 
                 parseFloat(foundService.price_range?.replace(/[^\d.-]/g, '') || '0'),
          priceVariations: foundService.priceVariations || [],
          price_unit: foundService.price_unit || foundService.priceUnit || 'לאירוע',
          imageUrl: foundService.image_url || foundService.imageUrl,
          additionalImages: foundService.additional_images || foundService.additionalImages || [],
          videos: foundService.videos || foundService.video_urls || [],
          provider: {
            id: foundProvider.id,
            name: foundProvider.name || foundProvider.businessName,
            contact_phone: foundProvider.contact_phone || foundProvider.phone,
            contact_email: foundProvider.contact_email || foundProvider.email,
            rating: foundProvider.rating,
            is_verified: foundProvider.is_verified || false
          },
          audienceSize: foundService.audience_size || foundService.audienceSize,
          minAudience: foundService.minAudience,
          maxAudience: foundService.maxAudience,
          duration: foundService.duration,
          setupTime: foundService.setupTime || foundService.setup_time,
          location: foundService.location || foundProvider.city || 'כל הארץ',
          serviceAreas: foundService.serviceAreas || [foundProvider.city || 'כל הארץ'],
          rating: foundService.rating,
          review_count: foundService.review_count || foundService.reviewCount,
          tags: foundService.tags || foundService.features || [],
          is_featured: foundService.is_featured || foundService.featured,
          suitableFor: foundService.suitableFor || foundService.event_types || [],
          targetAudience: foundService.targetAudience || foundService.audience_ages || [],
          technicalRequirements: foundService.technicalRequirements || foundService.technical_requirements || [],
          includedServices: foundService.includedServices || [
            'ייעוץ מקדים',
            'התאמה אישית',
            'תמיכה במהלך האירוע'
          ],
          additionalOptions: foundService.additionalOptions || [],
          availability: foundService.availability || {
            timeSlots: [
              {
                day: 'ראשון',
                slots: [
                  { start: '09:00', end: '12:00', available: true },
                  { start: '14:00', end: '17:00', available: true },
                  { start: '19:00', end: '22:00', available: false }
                ]
              },
              {
                day: 'שני',
                slots: [
                  { start: '09:00', end: '12:00', available: true },
                  { start: '14:00', end: '17:00', available: true },
                  { start: '19:00', end: '22:00', available: true }
                ]
              }
            ]
          }
        };

        setDetailedProduct(detailedProduct);
      }
    }
  }, [serviceId, services, providers]);

  if (!detailedProduct) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">טוען פרטי מוצר...</h2>
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
      <DetailedProductPage product={detailedProduct} />
      <Footer />
    </div>
  );
};

export default EnhancedServiceDetails;
