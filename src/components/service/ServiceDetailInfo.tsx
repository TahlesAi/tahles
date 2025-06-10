
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Tag, Star, PlayCircle } from "lucide-react";

interface ServiceDetailInfoProps {
  service: any;
}

const ServiceDetailInfo = ({ service }: ServiceDetailInfoProps) => {
  return (
    <div className="space-y-6">
      {/* Description */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">תיאור השירות</h3>
          <p className="text-gray-700 leading-relaxed">{service.description}</p>
        </CardContent>
      </Card>

      {/* Video Link */}
      {service.videoUrl && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <PlayCircle className="h-5 w-5" />
              סרטון המופע
            </h3>
            <a 
              href={service.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline"
            >
              צפה בסרטון ביוטיוב
              <PlayCircle className="h-4 w-4" />
            </a>
          </CardContent>
        </Card>
      )}

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">מה כלול בשירות</h3>
            <ul className="space-y-2">
              {service.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Service Details */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">פרטי השירות</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.duration && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="font-medium">משך:</span>
                <span>{service.duration}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="font-medium">מיקום:</span>
              <span>{service.location || 'בכל הארץ'}</span>
            </div>
            
            {service.priceRange && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <span className="font-medium">טווח מחירים:</span>
                <span>₪{service.priceRange.min.toLocaleString()} - ₪{service.priceRange.max.toLocaleString()}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Price Variants */}
      {service.variants && service.variants.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">אפשרויות מחיר</h3>
            <div className="space-y-3">
              {service.variants.map((variant: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{variant.name}</div>
                    <div className="text-sm text-gray-600">{variant.duration} דקות</div>
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    ₪{variant.basePrice.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              * המחירים הסופיים עשויים להשתנות בהתאם למרחק, גודל קהל ודרישות מיוחדות
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tags */}
      {service.tags && service.tags.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">תגיות</h3>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServiceDetailInfo;
