
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ExternalLink, Heart, MapPin, Star } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import useIsMobile from '@/hooks/use-mobile';
import FavoriteButton from '@/components/favorites/FavoriteButton';
import RatingDisplay from '@/components/rating/RatingDisplay';

interface QuickViewData {
  id: string;
  type: 'service' | 'provider';
  name: string;
  description: string;
  imageUrl?: string;
  price?: number;
  priceUnit?: string;
  provider?: string;
  rating?: number;
  reviewCount?: number;
  location?: string;
  tags?: string[];
}

interface QuickViewBottomSheetProps {
  data: QuickViewData | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewBottomSheet: React.FC<QuickViewBottomSheetProps> = ({
  data,
  isOpen,
  onClose
}) => {
  const isMobile = useIsMobile();
  
  // הצגה רק במובייל
  if (!isMobile || !data) return null;

  const linkPath = data.type === 'service' ? `/service/${data.id}` : `/provider/${data.id}`;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="bottom" 
        className="h-[70vh] p-0 rounded-t-xl"
      >
        {/* כותרת עם כפתור סגירה */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">תצוגה מהירה</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* תוכן */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* תמונה ופרטים בסיסיים */}
          <div className="flex gap-4">
            {data.imageUrl && (
              <img 
                src={data.imageUrl}
                alt={data.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-lg truncate">{data.name}</h4>
                  {data.provider && (
                    <p className="text-sm text-blue-600">{data.provider}</p>
                  )}
                </div>
                
                <FavoriteButton
                  id={data.id}
                  type={data.type}
                  name={data.name}
                  imageUrl={data.imageUrl}
                  price={data.price}
                  provider={data.provider}
                  size="sm"
                />
              </div>
              
              {data.price && (
                <div className="text-xl font-bold text-blue-600 mb-2">
                  ₪{data.price.toLocaleString()}
                  {data.priceUnit && (
                    <span className="text-sm text-gray-600 mr-1">
                      {data.priceUnit}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* דירוג */}
          {data.rating && data.rating > 0 && (
            <RatingDisplay 
              rating={data.rating}
              reviewCount={data.reviewCount}
              size="sm"
            />
          )}

          {/* מיקום */}
          {data.location && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              {data.location}
            </div>
          )}

          {/* תיאור */}
          <div>
            <h5 className="font-medium mb-2">תיאור</h5>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
              {data.description}
            </p>
          </div>

          {/* תגיות */}
          {data.tags && data.tags.length > 0 && (
            <div>
              <h5 className="font-medium mb-2">תגיות</h5>
              <div className="flex flex-wrap gap-1">
                {data.tags.slice(0, 5).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {data.tags.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{data.tags.length - 5}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* כפתורי פעולה */}
        <div className="p-4 border-t bg-white">
          <Link to={linkPath} onClick={onClose}>
            <Button className="w-full">
              <ExternalLink className="h-4 w-4 ml-1" />
              לפרטים נוספים
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QuickViewBottomSheet;
