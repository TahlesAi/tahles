
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Award, Users, Clock, MapPin, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceRankingCardProps {
  service: any;
  rank?: number;
  isSelected: boolean;
  onSelect: () => void;
  canSelect: boolean;
}

const ServiceRankingCard: React.FC<ServiceRankingCardProps> = ({
  service,
  rank,
  isSelected,
  onSelect,
  canSelect
}) => {
  const formatPrice = (price: number) => {
    return `₪${price.toLocaleString()}`;
  };

  return (
    <Card className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${
      isSelected ? 'ring-2 ring-brand-500 bg-brand-50' : ''
    }`}>
      <CardContent className="p-0">
        <div className="flex">
          {/* מספר דירוג */}
          {rank && (
            <div className="flex-shrink-0 w-16 bg-gradient-to-b from-brand-500 to-brand-600 flex items-center justify-center">
              <div className="text-white font-bold text-xl">#{rank}</div>
            </div>
          )}

          {/* תמונה */}
          <div className="flex-shrink-0 w-48 h-32 bg-gray-100 relative overflow-hidden">
            {service.imageUrl ? (
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-sm">אין תמונה</span>
              </div>
            )}
            
            {/* בעיגל במיכל תמונה */}
            <div className="absolute top-2 left-2">
              <Checkbox
                checked={isSelected}
                onCheckedChange={onSelect}
                disabled={!canSelect && !isSelected}
                className="bg-white border-white shadow-md"
              />
            </div>

            {service.featured && (
              <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                <Award className="h-3 w-3 ml-1" />
                מומלץ
              </Badge>
            )}
          </div>

          {/* תוכן */}
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {service.name}
                </h3>
                <p className="text-sm text-brand-600 mb-1">
                  {service.provider}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {service.description}
                </p>
              </div>
            </div>

            {/* מידע נוסף */}
            <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
              {service.duration && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 ml-1" />
                  <span>{service.duration} דקות</span>
                </div>
              )}
              
              {service.audienceSize && (
                <div className="flex items-center">
                  <Users className="h-4 w-4 ml-1" />
                  <span>עד {service.audienceSize.max} אנשים</span>
                </div>
              )}

              {service.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 ml-1" />
                  <span>{service.location}</span>
                </div>
              )}
            </div>

            {/* דירוג וביקורות */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {service.rating && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                    <span className="font-medium">{service.rating}</span>
                    <span className="text-gray-500 text-sm mr-1">
                      ({service.reviewCount} ביקורות)
                    </span>
                  </div>
                )}

                {service.dynamicScore && (
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    דירוג: {service.dynamicScore}
                  </Badge>
                )}

                {service.matchPercentage && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    התאמה: {service.matchPercentage}%
                  </Badge>
                )}
              </div>

              <div className="text-left">
                <div className="text-lg font-bold text-gray-900">
                  {formatPrice(service.price)}
                </div>
                <div className="text-xs text-gray-500">
                  {service.priceUnit || 'לאירוע'}
                </div>
              </div>
            </div>

            {/* פעולות */}
            <div className="flex gap-2 mt-4">
              <Button
                asChild
                className="flex-1 bg-brand-600 hover:bg-brand-700"
              >
                <Link to={`/booking/${service.id}?from=recommended`}>
                  BOOK NOW
                </Link>
              </Button>
              
              <Button
                variant="outline"
                asChild
                className="flex items-center"
              >
                <Link to={`/service/${service.id}`}>
                  <Eye className="h-4 w-4 ml-1" />
                  צפה
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceRankingCard;
