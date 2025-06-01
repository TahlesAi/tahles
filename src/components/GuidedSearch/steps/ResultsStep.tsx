
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Users, ArrowLeft, Phone } from "lucide-react";
import { getGuidedSearchRecommendations } from "@/lib/unifiedMockData";
import { GuidedSearchData } from "../GuidedSearchModal";

interface ResultsStepProps {
  searchData: GuidedSearchData;
  onBack: () => void;
  onSubmit: () => void;
}

const ResultsStep = ({ searchData, onBack, onSubmit }: ResultsStepProps) => {
  const recommendations = getGuidedSearchRecommendations(searchData);

  const formatPrice = (price: number, priceUnit: string, attendeesCount?: string) => {
    if (priceUnit === "לאדם" && attendeesCount) {
      const total = price * parseInt(attendeesCount);
      return `₪${total.toLocaleString()} (₪${price} לאדם)`;
    }
    return `₪${price.toLocaleString()} ${priceUnit}`;
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold">המוצרים המומלצים עבורך</h3>
        <p className="text-sm text-gray-600">מצאנו {recommendations.length} מוצרים התואמים לצרכים שלך</p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {recommendations.map((product: any) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-3">
                {/* Product Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm line-clamp-1">{product.name}</h4>
                      <p className="text-xs text-gray-600 mb-1">{product.provider}</p>
                    </div>
                    <div className="text-left ml-2">
                      <div className="font-bold text-sm text-primary">
                        {formatPrice(product.price, product.priceUnit, searchData.attendeesCount)}
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                        <span className="text-gray-500">({product.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 mb-2 line-clamp-2">{product.description}</p>

                  {/* Tags and Details */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.tags?.slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{product.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{product.duration} דק'</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{product.minAudience}-{product.maxAudience}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">לא נמצאו מוצרים התואמים לקריטריונים שלך</p>
          <p className="text-sm text-gray-400 mt-2">נסה לשנות את הפרמטרים או צור קשר לייעוץ אישי</p>
        </div>
      )}

      {/* Search Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-3">
          <div className="text-sm">
            <div className="font-medium mb-2">סיכום החיפוש:</div>
            <div className="space-y-1 text-xs">
              {searchData.eventDate && (
                <div>תאריך: {searchData.eventDate.toLocaleDateString('he-IL')}</div>
              )}
              {searchData.eventType && (
                <div>סוג אירוע: {searchData.eventType === 'private' ? 'פרטי' : searchData.eventType === 'business' ? 'עסקי' : 'מעורב'}</div>
              )}
              {searchData.attendeesCount && (
                <div>משתתפים: {searchData.attendeesCount}</div>
              )}
              {searchData.eventLocation && (
                <div>מיקום: {searchData.eventLocation.city}</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1"
        >
          <ArrowLeft className="ml-2 h-4 w-4" />
          חזור לעריכה
        </Button>
        <Button
          onClick={onSubmit}
          className="flex-1"
        >
          <Phone className="ml-2 h-4 w-4" />
          צור קשר לייעוץ
        </Button>
      </div>
    </div>
  );
};

export default ResultsStep;
