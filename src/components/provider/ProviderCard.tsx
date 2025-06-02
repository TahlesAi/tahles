
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  MapPin, 
  CheckCircle,
  Eye,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

interface ProviderCardProps {
  provider: any;
  showServices?: boolean;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ 
  provider, 
  showServices = true 
}) => {
  // נבדוק אם יש ID תקין לספק
  const providerId = provider.id || provider.providerId || provider.provider_id;
  
  if (!providerId) {
    console.warn('Provider card missing ID:', provider);
    return null;
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              {provider.logo_url || provider.logoUrl ? (
                <img 
                  src={provider.logo_url || provider.logoUrl} 
                  alt={provider.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Basic Info */}
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg truncate">{provider.name}</h3>
                {(provider.is_verified || provider.isVerified) && (
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                )}
              </div>
              
              {(provider.rating || provider.rating === 0) && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="mr-1 font-medium">{Number(provider.rating).toFixed(1)}</span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    ({provider.review_count || provider.reviewCount || 0} ביקורות)
                  </span>
                </div>
              )}
              
              {(provider.city || provider.location) && (
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{provider.city || provider.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {provider.description && (
            <p className="text-gray-600 text-sm line-clamp-3 text-right">
              {provider.description}
            </p>
          )}

          {/* Categories */}
          {(provider.categories || provider.category_ids) && (
            <div className="flex flex-wrap gap-2">
              {(provider.categories || provider.category_ids || []).slice(0, 3).map((category: string, index: number) => (
                <Badge key={category + index} variant="outline" className="text-xs">
                  {typeof category === 'string' ? category : `קטגוריה ${index + 1}`}
                </Badge>
              ))}
              {(provider.categories || provider.category_ids || []).length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{(provider.categories || provider.category_ids || []).length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Services Count */}
          {showServices && provider.services && (
            <div className="text-sm text-gray-600">
              {provider.services.length} שירותים זמינים
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t">
            <Link to={`/provider/${providerId}`} className="flex-1">
              <Button variant="outline" className="w-full">
                <Eye className="h-4 w-4 ml-2" />
                צפה בפרופיל
              </Button>
            </Link>
            <Link to={`/provider/${providerId}`}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                צור קשר
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;
