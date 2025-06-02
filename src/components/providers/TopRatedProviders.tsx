
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Phone, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopRatedProvider {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  category: string;
  city: string;
  imageUrl: string;
  specialties: string[];
  priceRange: string;
  featured: boolean;
}

interface TopRatedProvidersProps {
  providers: any[];
  maxProviders?: number;
  showTitle?: boolean;
  variant?: 'grid' | 'list' | 'carousel';
}

const TopRatedProviders: React.FC<TopRatedProvidersProps> = ({
  providers,
  maxProviders = 6,
  showTitle = true,
  variant = 'grid'
}) => {
  const navigate = useNavigate();

  // מיון ספקים לפי דירוג וביקורות
  const topProviders = useMemo(() => {
    console.time('TopRatedProviders-Sort');
    
    const sorted = providers
      .filter(provider => provider.rating && provider.reviewCount > 0)
      .sort((a, b) => {
        // משקל מורכב: דירוג * log(ביקורות) + featured bonus
        const scoreA = a.rating * Math.log(a.reviewCount + 1) + (a.featured ? 1 : 0);
        const scoreB = b.rating * Math.log(b.reviewCount + 1) + (b.featured ? 1 : 0);
        return scoreB - scoreA;
      })
      .slice(0, maxProviders);
    
    console.timeEnd('TopRatedProviders-Sort');
    console.log(`Top ${maxProviders} providers selected from ${providers.length}`);
    
    return sorted;
  }, [providers, maxProviders]);

  const handleProviderClick = (providerId: string) => {
    navigate(`/provider/${providerId}`);
  };

  const renderProviderCard = (provider: TopRatedProvider) => (
    <Card 
      key={provider.id}
      className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => handleProviderClick(provider.id)}
    >
      <CardContent className="p-0">
        {/* תמונה */}
        <div className="relative h-40 overflow-hidden rounded-t-lg">
          <img
            src={provider.imageUrl || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400'}
            alt={provider.name}
            className="w-full h-full object-cover"
          />
          {provider.featured && (
            <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
              מומלץ
            </Badge>
          )}
        </div>

        {/* תוכן */}
        <div className="p-4 space-y-3">
          {/* כותרת ודירוג */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
              {provider.name}
            </h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{provider.rating.toFixed(1)}</span>
                <span className="text-sm text-gray-500">
                  ({provider.reviewCount} ביקורות)
                </span>
              </div>
              
              <Badge variant="outline" className="text-xs">
                {provider.category}
              </Badge>
            </div>
          </div>

          {/* מיקום */}
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="h-3 w-3" />
            {provider.city}
          </div>

          {/* התמחויות */}
          {provider.specialties && provider.specialties.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {provider.specialties.slice(0, 3).map((specialty, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs"
                >
                  {specialty}
                </Badge>
              ))}
              {provider.specialties.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{provider.specialties.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* טווח מחירים */}
          {provider.priceRange && (
            <div className="text-sm font-medium text-green-600">
              {provider.priceRange}
            </div>
          )}

          {/* כפתור פעולה */}
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleProviderClick(provider.id);
            }}
          >
            <ExternalLink className="h-3 w-3 ml-1" />
            צפה בפרופיל
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'list':
        return (
          <div className="space-y-4">
            {topProviders.map(renderProviderCard)}
          </div>
        );
      
      case 'carousel':
        return (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {topProviders.map(provider => (
              <div key={provider.id} className="flex-shrink-0 w-72">
                {renderProviderCard(provider)}
              </div>
            ))}
          </div>
        );
      
      case 'grid':
      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {topProviders.map(renderProviderCard)}
          </div>
        );
    }
  };

  if (topProviders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">אין ספקים זמינים להצגה</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              הספקים המובילים שלנו
            </h2>
            <p className="text-gray-600 mt-1">
              ספקים מומלצים עם הדירוגים הגבוהים ביותר
            </p>
          </div>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/providers')}
          >
            צפה בכל הספקים
          </Button>
        </div>
      )}

      {renderVariant()}

      {/* סטטיסטיקות */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {topProviders.length}
            </div>
            <div className="text-sm text-gray-600">ספקים מובילים</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {(topProviders.reduce((sum, p) => sum + p.rating, 0) / topProviders.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">דירוג ממוצע</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {topProviders.reduce((sum, p) => sum + p.reviewCount, 0)}
            </div>
            <div className="text-sm text-gray-600">סך ביקורות</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {topProviders.filter(p => p.featured).length}
            </div>
            <div className="text-sm text-gray-600">ספקים מומלצים</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRatedProviders;
