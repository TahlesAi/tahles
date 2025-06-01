
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle } from "lucide-react";

interface AutoStyledCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
  location?: string;
  price?: string;
  isVerified?: boolean;
  isService?: boolean; // כדי להבחין בין ספק למוצר
}

const AutoStyledCard = ({
  id,
  title,
  description,
  imageUrl,
  rating,
  reviewCount,
  location,
  price,
  isVerified,
  isService = false
}: AutoStyledCardProps) => {
  // נקבע את הנתיב לפי סוג הכרטיס
  const linkPath = isService ? `/product/${id}` : `/provider/${id}`;

  return (
    <Link to={linkPath} className="block hover:scale-[1.02] transition-transform duration-200">
      <Card className="h-full overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
        {/* תמונה */}
        <div className="relative h-48 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                      <div class="text-center">
                        <div class="text-4xl text-brand-600 mb-2">🎪</div>
                        <div class="text-sm text-brand-600 font-medium">${title}</div>
                      </div>
                    </div>
                  `;
                }
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl text-brand-600 mb-2">🎪</div>
                <div className="text-sm text-brand-600 font-medium">{title}</div>
              </div>
            </div>
          )}
          
          {/* תגיות */}
          <div className="absolute top-3 right-3 flex gap-2">
            {isVerified && (
              <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs">
                <CheckCircle className="h-3 w-3 ml-1" />
                מאומת
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          {/* כותרת */}
          <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900">
            {title}
          </h3>
          
          {/* תיאור */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {description}
          </p>
          
          {/* מידע נוסף */}
          <div className="space-y-2">
            {/* דירוג */}
            {rating && reviewCount && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium">{rating.toFixed(1)}</span>
                <span className="text-sm text-gray-500">({reviewCount} ביקורות)</span>
              </div>
            )}
            
            {/* מיקום */}
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{location}</span>
              </div>
            )}
            
            {/* מחיר */}
            {price && (
              <div className="text-right">
                <span className="text-lg font-bold text-brand-600">{price}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AutoStyledCard;
