
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProviderBusinessProfile from "@/components/provider/ProviderBusinessProfile";
import ProductGrid from "@/components/provider/ProductGrid";
import { useEventContext } from "@/context/EventContext";
import { getProviderById, getServicesByProvider } from '@/lib/unifiedMockData';
import { Provider } from '@/lib/types/hierarchy';

const EnhancedProviderProfile = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const { providers, services } = useEventContext();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [providerServices, setProviderServices] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    console.log('EnhancedProviderProfile: providerId =', providerId);
    if (!providerId) return;

    // First try unified mock data
    const unifiedProvider = getProviderById(providerId);
    const unifiedServices = getServicesByProvider(providerId);
    
    console.log('Found unified provider:', unifiedProvider);
    console.log('Found unified services:', unifiedServices);
    
    if (unifiedProvider) {
      // Convert ProviderProfile to Provider format with enhanced data
      const enhancedProvider: Provider = {
        id: unifiedProvider.id,
        name: unifiedProvider.businessName || '',
        description: unifiedProvider.description || 'ספק מקצועי עם ניסיון רב בתחום',
        city: unifiedProvider.city || '',
        contact_phone: unifiedProvider.phone || '',
        contact_email: unifiedProvider.email || '',
        contact_person: unifiedProvider.contactPerson || '',
        address: unifiedProvider.address || '',
        website: unifiedProvider.website || '',
        rating: unifiedProvider.rating || 0,
        review_count: unifiedProvider.reviewCount || 0,
        is_verified: unifiedProvider.verified || false,
        logo_url: unifiedProvider.logo || '',
        subcategory_ids: [],
        category_ids: unifiedProvider.categories || [],
        service_type_ids: [],
        services: [],
        serviceAreas: [unifiedProvider.city || 'כל הארץ'],
        experience: unifiedProvider.businessName === 'נטע ברסלר - אמן החשיבה' ? 
          'מעל 15 שנות ניסיון בתחום אמנות החושים' : 'מעל 5 שנות ניסיון בתחום',
        specialties: unifiedProvider.businessName === 'נטע ברסלר - אמן החשיבה' ? 
          ['קריאת מחשבות', 'השפעה מנטלית', 'מופעים אינטראקטיביים', 'התאמה אישית לכל אירוע'] :
          ['מקצועיות גבוהה', 'שירות אישי', 'אמינות'],
        testimonials: unifiedProvider.businessName === 'נטע ברסלר - אמן החשיבה' ? [
          {
            id: '1',
            text: 'נטע הפך את אירוע החברה שלנו לחוויה בלתי נשכחת. כל העובדים עדיין מדברים על המופע!',
            author: 'מנכ"ל חברת הייטק',
            rating: 5
          },
          {
            id: '2', 
            text: 'מופע מדהים בחתונה! כל האורחים היו מרותקים למופע של נטע.',
            author: 'כלה מאושרת',
            rating: 5
          }
        ] : [
          {
            id: '1',
            text: 'שירות מעולה ומקצועי. הייתי מרוצה מאוד מהביצוע!',
            author: 'לקוח מרוצה',
            rating: 5
          }
        ],
        socialLinks: unifiedProvider.businessName === 'נטע ברסלר - אמן החשיבה' ? {
          facebook: 'https://facebook.com/netamentalist',
          instagram: 'https://instagram.com/neta_mentalist',
          linkedin: 'https://linkedin.com/in/netamentalist'
        } : {},
        mediaLinks: unifiedProvider.businessName === 'נטע ברסלר - אמן החשיבה' ? [
          { 
            id: '1',
            title: 'ראיון ברדיו על אמנות החושים', 
            url: 'https://example.com/interview1',
            source: 'רדיו תל אביב',
            date: '2024-01-15'
          },
          { 
            id: '2',
            title: 'כתבה בעיתון על המופע המיוחד', 
            url: 'https://example.com/article1',
            source: 'ידיעות אחרונות',
            date: '2024-02-10'
          }
        ] : [],
        clientRecommendations: unifiedProvider.businessName === 'נטע ברסלר - אמן החשיבה' ? [
          {
            id: '1',
            clientName: 'מיקרוסופט ישראל',
            company: 'מיקרוסופט',
            position: 'מנהל אירועים',
            recommendation: 'נטע הפך את אירוע החברה שלנו לחוויה בלתי נשכחת'
          },
          {
            id: '2',
            clientName: 'גוגל תל אביב',
            company: 'גוגל',
            position: 'מנהלת משאבי אנוש',
            recommendation: 'מופע מדהים שכל העובדים עדיין מדברים עליו'
          },
          {
            id: '3',
            clientName: 'אמטק',
            company: 'אמטק',
            recommendation: 'מקצועיות ברמה הגבוהה ביותר'
          },
          {
            id: '4',
            clientName: 'רפאל',
            company: 'רפאל',
            recommendation: 'המופע היה הדבר הכי מרשים באירוע'
          },
          {
            id: '5',
            clientName: 'בית חולים איכילוב',
            company: 'איכילוב',
            recommendation: 'הצליח לשמח את כל הצוות הרפואי'
          }
        ] : []
      };

      setProvider(enhancedProvider);

      // Format services for display with safe property access
      const formattedServices = unifiedServices.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
        price_unit: service.priceUnit || 'לאירוע',
        imageUrl: service.imageUrl,
        location: service.location || unifiedProvider.city || 'כל הארץ',
        rating: service.rating,
        review_count: service.reviewCount,
        tags: service.tags || [],
        is_featured: service.featured,
        suitableFor: service.suitableFor || [],
        technicalRequirements: []
      }));

      setProviderServices(formattedServices);

      // Create gallery with safe property access
      const galleryItems = [];
      
      if (unifiedProvider.logo) {
        galleryItems.push({
          type: 'image',
          url: unifiedProvider.logo
        });
      }

      if (unifiedProvider.gallery && Array.isArray(unifiedProvider.gallery)) {
        unifiedProvider.gallery.forEach((img: string) => {
          galleryItems.push({
            type: 'image',
            url: img
          });
        });
      }

      unifiedServices.forEach(service => {
        if (service.imageUrl) {
          galleryItems.push({
            type: 'image',
            url: service.imageUrl
          });
        }
        
        // Safe access to additionalImages
        if (service.additionalImages && Array.isArray(service.additionalImages)) {
          service.additionalImages.forEach((img: string) => {
            galleryItems.push({
              type: 'image',
              url: img
            });
          });
        }

        // Safe access to videos
        if (service.videos && Array.isArray(service.videos)) {
          service.videos.forEach((video: string) => {
            galleryItems.push({
              type: 'video',
              url: video
            });
          });
        }
      });

      setGallery(galleryItems);
      return;
    }

    // Fallback to context data if unified data not found
    let foundProvider = providers.find(p => p.id === providerId);
    
    if (foundProvider) {
      const enhancedProvider: Provider = {
        id: foundProvider.id,
        name: foundProvider.name || '',
        description: foundProvider.description || 'ספק מקצועי עם ניסיון רב בתחום',
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
        testimonials: foundProvider.testimonials || [],
        socialLinks: foundProvider.socialLinks || {},
        mediaLinks: foundProvider.mediaLinks || [],
        clientRecommendations: foundProvider.clientRecommendations || []
      };

      setProvider(enhancedProvider);

      // Get services for this provider from context
      const relatedServices = services.filter(s => s.provider_id === providerId);
      
      const formattedServices = relatedServices.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        price: typeof service.price === 'number' ? service.price : 
               parseFloat(service.price_range?.replace(/[^\d.-]/g, '') || '0'),
        price_unit: service.price_unit || 'לאירוע',
        imageUrl: service.imageUrl,
        location: service.location || foundProvider.city || 'כל הארץ',
        rating: service.rating,
        review_count: service.review_count,
        tags: service.tags || [],
        is_featured: service.is_featured,
        suitableFor: service.suitableFor || [],
        technicalRequirements: service.technical_requirements || []
      }));

      setProviderServices(formattedServices);
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

  // Create the provider object for ProviderBusinessProfile
  const providerForProfile = {
    id: provider.id,
    name: provider.name,
    description: provider.description,
    city: provider.city,
    contact_phone: provider.contact_phone,
    contact_email: provider.contact_email,
    website: provider.website,
    rating: provider.rating,
    review_count: provider.review_count,
    is_verified: provider.is_verified,
    logo_url: provider.logo_url,
    serviceAreas: provider.serviceAreas,
    experience: provider.experience,
    specialties: provider.specialties,
    testimonials: provider.testimonials,
    socialLinks: provider.socialLinks,
    mediaLinks: provider.mediaLinks,
    clientRecommendations: provider.clientRecommendations
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container px-4 py-8">
          <div className="space-y-8">
            <ProviderBusinessProfile 
              provider={providerForProfile} 
              gallery={gallery}
            />
            
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
