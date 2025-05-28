
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
import { Provider } from "@/lib/types/hierarchy";

interface ProviderCardProps {
  provider: Provider;
  showServices?: boolean;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ 
  provider, 
  showServices = true 
}) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              {provider.logo_url ? (
                <img 
                  src={provider.logo_url} 
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
                {provider.is_verified && (
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                )}
              </div>
              
              {provider.rating && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="mr-1 font-medium">{provider.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    ({provider.review_count} ביקורות)
                  </span>
                </div>
              )}
              
              {provider.city && (
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{provider.city}</span>
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
          {provider.category_ids && provider.category_ids.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {provider.category_ids.slice(0, 3).map((categoryId, index) => (
                <Badge key={categoryId} variant="outline" className="text-xs">
                  קטגוריה {index + 1}
                </Badge>
              ))}
              {provider.category_ids.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{provider.category_ids.length - 3}
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
            <Link to={`/enhanced-providers/${provider.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                <Eye className="h-4 w-4 ml-2" />
                צפה בפרופיל
              </Button>
            </Link>
            <Link to={`/enhanced-providers/${provider.id}`}>
              <Button className="bg-brand-600 hover:bg-brand-700">
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
