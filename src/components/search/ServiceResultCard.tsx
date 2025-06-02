
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Users, Clock, Play, Image as ImageIcon, Calendar, AlertCircle } from "lucide-react";
import RatingDisplay from "@/components/rating/RatingDisplay";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import PDFExportButton from "@/components/export/PDFExportButton";
import QuickViewBottomSheet from "@/components/mobile/QuickViewBottomSheet";
import useQuickView from "@/hooks/useQuickView";

interface ServiceResultCardProps {
  service: any;
  isSelected?: boolean;
  onToggleSelect?: (service: any) => void;
  canSelect?: boolean;
  availabilityStatus?: boolean | null; // null = לא נבדק, true = זמין, false = לא זמין
  isCheckingAvailability?: boolean;
  selectedDate?: string;
  selectedTime?: string;
}

const ServiceResultCard = ({ 
  service, 
  isSelected, 
  onToggleSelect, 
  canSelect,
  availabilityStatus,
  isCheckingAvailability,
  selectedDate,
  selectedTime
}: ServiceResultCardProps) => {
  const serviceId = service.id || service.serviceId || service.service_id;
  const providerId = service.providerId || service.provider_id;
  
  const { quickViewData, isQuickViewOpen, closeQuickView, handleLongPress } = useQuickView();
  
  if (!serviceId) {
    console.warn('Service card missing ID:', service);
    return null;
  }

  const hasMedia = (service.videos && service.videos.length > 0) || 
                   (service.video_urls && service.video_urls.length > 0) ||
                   (service.additionalImages && service.additionalImages.length > 0) ||
                   (service.additional_images && service.additional_images.length > 0);

  const videoCount = (service.videos?.length || 0) + (service.video_urls?.length || 0);
  const imageCount = (service.additionalImages?.length || 0) + (service.additional_images?.length || 0) + (service.imageUrl ? 1 : 0);

  const handleSelectToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleSelect) {
      onToggleSelect(service);
    }
  };

  const serviceQuickViewData = {
    id: serviceId,
    type: 'service' as const,
    name: service.name,
    description: service.description,
    imageUrl: service.imageUrl || service.image_url,
    price: service.price,
    priceUnit: service.priceUnit || service.price_unit,
    provider: service.provider,
    rating: service.rating,
    reviewCount: service.reviewCount || service.review_count,
    location: service.location,
    tags: service.tags
  };

  const longPressHandler = handleLongPress(serviceQuickViewData);

  // קביעת מצב הכרטיס על בסיס זמינות
  const getCardStatus = () => {
    if (isCheckingAvailability) return 'checking';
    if (availabilityStatus === false) return 'unavailable';
    if (availabilityStatus === true) return 'available';
    return 'unknown';
  };

  const cardStatus = getCardStatus();

  return (
    <>
      <Card 
        className={`overflow-hidden transition-all duration-200 border-0 shadow-md ${
          cardStatus === 'unavailable' 
            ? 'opacity-50 grayscale' 
            : cardStatus === 'checking' 
            ? 'opacity-75' 
            : 'hover:shadow-lg'
        }`}
        onTouchStart={longPressHandler}
        onTouchEnd={longPressHandler}
        onTouchCancel={longPressHandler}
      >
        <div className="relative h-48 overflow-hidden">
          {/* אינדיקטור זמינות */}
          {selectedDate && selectedTime && (
            <div className="absolute top-2 right-12 z-10">
              {isCheckingAvailability ? (
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 animate-pulse">
                  <Clock className="h-3 w-3 ml-1" />
                  בודק זמינות...
                </Badge>
              ) : availabilityStatus === true ? (
                <Badge className="text-xs bg-green-500 hover:bg-green-600">
                  <Calendar className="h-3 w-3 ml-1" />
                  זמין
                </Badge>
              ) : availabilityStatus === false ? (
                <Badge variant="destructive" className="text-xs">
                  <AlertCircle className="h-3 w-3 ml-1" />
                  לא זמין
                </Badge>
              ) : null}
            </div>
          )}

          {/* כפתור השוואה */}
          {onToggleSelect && (
            <div className="absolute top-2 right-2 z-10">
              <div 
                onClick={handleSelectToggle}
                className={`
                  flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer transition-all
                  ${isSelected 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/90 backdrop-blur-sm hover:bg-white'
                  }
                  ${!canSelect && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <Checkbox 
                  checked={isSelected} 
                  disabled={!canSelect && !isSelected}
                  className="h-4 w-4"
                />
                <span className="text-xs font-medium">השווה</span>
              </div>
            </div>
          )}

          {/* כפתור מועדפים */}
          <div className="absolute top-2 left-2 z-10">
            <FavoriteButton
              id={serviceId}
              type="service"
              name={service.name}
              imageUrl={service.imageUrl || service.image_url}
              price={service.price}
              provider={service.provider}
              size="sm"
              variant="ghost"
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            />
          </div>

          {(service.imageUrl || service.image_url) ? (
            <img
              src={service.imageUrl || service.image_url}
              alt={service.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <div class="text-center">
                        <div class="text-4xl text-blue-600 mb-2">🎪</div>
                        <div class="text-sm text-blue-600 font-medium">${service.name}</div>
                      </div>
                    </div>
                  `;
                }
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl text-blue-600 mb-2">🎪</div>
                <div className="text-sm text-blue-600 font-medium">{service.name}</div>
              </div>
            </div>
          )}

          {hasMedia && (
            <div className="absolute top-12 left-2 flex gap-1">
              {videoCount > 0 && (
                <Badge variant="secondary" className="text-xs bg-black/70 text-white hover:bg-black/80">
                  <Play className="h-3 w-3 ml-1" />
                  {videoCount}
                </Badge>
              )}
              {imageCount > 1 && (
                <Badge variant="secondary" className="text-xs bg-black/70 text-white hover:bg-black/80">
                  <ImageIcon className="h-3 w-3 ml-1" />
                  {imageCount}
                </Badge>
              )}
            </div>
          )}

          {service.featured && (
            <div className="absolute bottom-2 left-2">
              <Badge className="text-xs bg-amber-500 hover:bg-amber-600">
                מומלץ
              </Badge>
            </div>
          )}

          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1">
            <span className="font-bold text-blue-600">
              ₪{typeof service.price === 'number' ? service.price.toLocaleString() : service.price}
            </span>
            {(service.priceUnit || service.price_unit) && (
              <span className="text-xs text-gray-600 mr-1">
                {service.priceUnit || service.price_unit}
              </span>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          <div className="mb-3">
            <h3 className="font-bold text-lg mb-1 line-clamp-2">{service.name}</h3>
            <div className="flex items-center gap-2">
              <p className="text-sm text-blue-600 font-medium">{service.provider}</p>
              {providerId && (
                <Link to={`/provider/${providerId}`} className="text-xs text-gray-500 hover:text-blue-600">
                  (צפה בספק)
                </Link>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{service.description}</p>

          <div className="space-y-2 mb-4">
            {service.rating > 0 && (
              <RatingDisplay 
                rating={service.rating} 
                reviewCount={service.reviewCount || service.review_count}
                size="sm"
              />
            )}

            {service.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{service.location}</span>
              </div>
            )}

            {service.tags && service.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {service.tags.slice(0, 3).map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {service.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{service.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* הצגת זמינות מפורטת */}
            {selectedDate && selectedTime && availabilityStatus === false && (
              <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                שירות זה אינו זמין ב-{selectedDate} בשעה {selectedTime}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Link to={`/service/${serviceId}`} className="flex-1">
              <Button 
                className="w-full" 
                disabled={cardStatus === 'unavailable'}
                variant={cardStatus === 'unavailable' ? 'outline' : 'default'}
              >
                {cardStatus === 'unavailable' ? 'לא זמין' : 'צפה בפרטים'}
              </Button>
            </Link>
            
            <PDFExportButton
              productId={serviceId}
              productName={service.name}
              description={service.description}
              price={service.price}
              priceUnit={service.priceUnit || service.price_unit}
              provider={service.provider}
              features={service.features}
              className="hidden md:flex"
            />
          </div>
        </CardContent>
      </Card>

      <QuickViewBottomSheet
        data={serviceQuickViewData}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />
    </>
  );
};

export default ServiceResultCard;
