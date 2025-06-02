
import { useState } from 'react';
import { Category, Subcategory, ProviderProfile, SearchResultService } from '@/types';
import { hebrewHierarchy } from '@/lib/hebrewHierarchyData';
import { unifiedServices, unifiedProviders } from '@/lib/unifiedMockData';

export const useEventDataFetcher = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Loading data from unified Hebrew hierarchy...');

      // המרת הקטגוריות העבריות לפורמט Category
      const hebrewCategoriesConverted: Category[] = hebrewHierarchy.categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        description: cat.description || '',
        icon: cat.icon || 'MapPin',
        image_url: `/assets/categories/${cat.id}.jpg`
      }));

      // המרת תתי הקטגוריות לפורמט Subcategory
      const hebrewSubcategoriesConverted: Subcategory[] = hebrewHierarchy.categories
        .flatMap(cat => cat.subcategories?.map(sub => ({
          id: sub.id,
          name: sub.name,
          description: sub.name,
          icon: 'Tag',
          category_id: cat.id
        })) || []);

      console.log('Using unified services:', unifiedServices.length);
      console.log('Using unified providers:', unifiedProviders.length);

      // המרת שירותים מאוחדים
      const typedServices: SearchResultService[] = unifiedServices.map((service: any) => {
        const provider = unifiedProviders.find(p => p.id === service.providerId);
        
        return {
          id: service.id,
          name: service.name,
          provider: service.provider,
          providerId: service.providerId || '',
          description: service.description || '',
          price: service.price,
          priceUnit: service.priceUnit || 'לאירוע',
          rating: service.rating,
          reviewCount: service.reviewCount,
          imageUrl: service.imageUrl,
          category: service.category || '',
          subcategory: service.subcategory || '',
          location: service.location || provider?.city || 'כל הארץ',
          suitableFor: service.suitableFor || [],
          featured: service.featured || false,
          additionalImages: service.additionalImages || [],
          videos: service.videos || [],
          audienceSize: service.audienceSize || {
            min: 10,
            max: 200,
            optimal: 50
          },
          technicalRequirements: service.technicalRequirements || [],
          setupTime: service.setupTime || 30,
          tags: service.tags || [],
          features: service.features || []
        };
      });

      // המרת ספקים מאוחדים
      const typedProviders: ProviderProfile[] = unifiedProviders.map((provider: any) => {
        return {
          id: provider.id,
          businessName: provider.businessName,
          description: provider.description,
          contactPerson: provider.contactPerson || '',
          email: provider.email || '',
          phone: provider.phone || '',
          address: provider.address || '',
          city: provider.city || '',
          website: provider.website || '',
          rating: provider.rating || 0,
          reviewCount: provider.reviewCount || 0,
          featured: provider.verified || false,
          verified: provider.verified || false,
          logo: provider.logo || '',
          categories: provider.categories || [],
          gallery: [],
          specialties: ['מקצועיות גבוהה', 'שירות אישי', 'אמינות'],
          yearsExperience: 5,
          insurance: true,
          testimonials: []
        };
      });

      const featuredServices = typedServices.filter(service => service.featured).slice(0, 12);
      const topProvidersList = typedProviders
        .filter(provider => provider.rating > 4.0)
        .sort((a: ProviderProfile, b: ProviderProfile) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 12);
      
      console.log('Unified data loading completed successfully');
      
      return {
        categories: hebrewCategoriesConverted,
        subcategories: hebrewSubcategoriesConverted,
        services: typedServices,
        providers: typedProviders,
        featuredServices,
        topProviders: topProvidersList
      };
    } catch (error: any) {
      console.error('Error loading unified data:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, isLoading, error };
};
