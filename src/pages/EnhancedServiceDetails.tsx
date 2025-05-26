
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DetailedProductPage from "@/components/provider/DetailedProductPage";
import { useEventContext } from "@/context/EventContext";
import { mockSearchResults, mockProviders } from '@/lib/mockData';
import { expandedMockSearchResults, expandedMockProviders } from '@/lib/mockDataExpanded';
import { Service, Provider } from '@/lib/types/hierarchy';

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
      const mockService = combinedMockServices.find(s => s.id === serviceId);
      
      if (mockService) {
        // Convert SearchResultService to Service format
        foundService = {
          id: mockService.id,
          name: mockService.name,
          description: mockService.description || '',
          price: typeof mockService.price === 'number' ? mockService.price : 0,
          price_unit: mockService.priceUnit || 'לאירוע',
          imageUrl: mockService.imageUrl,
          additional_images: mockService.additionalImages || mockService.additional_images || [],
          provider_id: mockService.providerId || '',
          category_id: '',
          subcategory_id: '',
          service_type_id: '',
          rating: mockService.rating,
          review_count: mockService.reviewCount,
          tags: mockService.tags || [],
          is_featured: mockService.featured || false,
          suitableFor: mockService.suitableFor || [],
          audience_size: mockService.category || 'כללי',
          audience_ages: [],
          location: mockService.location || '',
          duration: '',
          videos: mockService.videos || mockService.video_urls || [],
          technical_requirements: []
        } as Service;
      }
    }

    if (foundService) {
      // Find the provider
      const combinedMockProviders = [...expandedMockProviders, ...mockProviders];
      let foundProvider = providers.find(p => 
        p.id === foundService.provider_id
      );
      
      if (!foundProvider) {
        const mockProvider = combinedMockProviders.find(p => 
          p.id === foundService.provider_id || p.id === (foundService as any).providerId
        ) as any;
        
        if (mockProvider) {
          // Convert ProviderProfile to Provider format with all required fields
          foundProvider = {
            id: mockProvider.id,
            name: mockProvider.name || mockProvider.businessName || '',
            description: mockProvider.description || '',
            contact_phone: mockProvider.contact_phone || mockProvider.phone || '',
            contact_email: mockProvider.contact_email || mockProvider.email || '',
            contact_person: mockProvider.contact_person || mockProvider.contactPerson || '',
            address: mockProvider.address || '',
            city: mockProvider.city || '',
            website: mockProvider.website || '',
            rating: mockProvider.rating || 0,
            review_count: mockProvider.review_count || mockProvider.reviewCount || 0,
            is_verified: mockProvider.is_verified || mockProvider.verified || false,
            logo_url: mockProvider.logo_url || mockProvider.logo || '',
            subcategory_ids: mockProvider.subcategory_ids || [],
            category_ids: mockProvider.category_ids || mockProvider.categories || [],
            service_type_ids: mockProvider.service_type_ids || [],
            services: []
          } as Provider;
        }
      }

      if (foundProvider) {
        // Create detailed product object
        const detailedProduct = {
          id: foundService.id,
          name: foundService.name,
          description: foundService.description || '',
          longDescription: foundService.description,
          price: typeof foundService.price === 'number' ? foundService.price : 
                 parseFloat((foundService as any).price_range?.replace(/[^\d.-]/g, '') || '0'),
          priceVariations: [],
          price_unit: foundService.price_unit || 'לאירוע',
          imageUrl: foundService.imageUrl,
          additionalImages: foundService.additional_images || [],
          videos: foundService.videos || [],
          provider: {
            id: foundProvider.id,
            name: foundProvider.name || '',
            contact_phone: foundProvider.contact_phone || '',
            contact_email: foundProvider.contact_email || '',
            rating: foundProvider.rating,
            is_verified: foundProvider.is_verified || false
          },
          audienceSize: foundService.audience_size ? `${foundService.audience_size}` : undefined,
          minAudience: undefined,
          maxAudience: undefined,
          duration: foundService.duration || 'משך האירוע יתואם',
          setupTime: undefined,
          location: foundService.location || foundProvider.city || 'כל הארץ',
          serviceAreas: [foundProvider.city || 'כל הארץ'],
          rating: foundService.rating,
          review_count: foundService.review_count,
          tags: foundService.tags || [],
          is_featured: foundService.is_featured || false,
          suitableFor: foundService.suitableFor || [],
          targetAudience: foundService.audience_ages || [],
          technicalRequirements: foundService.technical_requirements || [],
          includedServices: [
            'ייעוץ מקדים',
            'התאמה אישית',
            'תמיכה במהלך האירוע'
          ],
          additionalOptions: [],
          availability: {
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
