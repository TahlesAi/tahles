
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Users, ArrowLeft, Phone, Trophy, Crown } from "lucide-react";
import { getGuidedSearchRecommendations } from "@/lib/unifiedMockData";
import { GuidedSearchData } from "../GuidedSearchModal";
import { Link } from "react-router-dom";

interface ResultsStepProps {
  searchData: GuidedSearchData;
  onBack: () => void;
  onSubmit: () => void;
}

const ResultsStep = ({ searchData, onBack, onSubmit }: ResultsStepProps) => {
  const recommendations = getGuidedSearchRecommendations(searchData);
  
  // נחלק לTop 10 ספקים ו-Top 10 מוצרים
  const topServices = recommendations.slice(0, 10);
  const topProviders = [...new Map(recommendations.map(service => [service.providerId, service])).values()].slice(0, 10);

  const formatPrice = (price: number, priceUnit: string, attendeesCount?: string) => {
    if (priceUnit === "לאדם" && attendeesCount && attendeesCount.includes('-')) {
      const avgAttendees = attendeesCount.split('-').map(n => parseInt(n.replace('+', ''))).reduce((a, b) => a + b) / 2;
      const total = price * avgAttendees;
      return `₪${total.toLocaleString()} (₪${price} לאדם)`;
    }
    return `₪${price.toLocaleString()} ${priceUnit}`;
  };

  return (
    <div className="space-y-6 text-right max-h-[60vh] overflow-y-auto" dir="rtl">
      <div className="text-center mb-4 sticky top-0 bg-white z-10 pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="h-6 w-6 text-gold-500" />
          <h3 className="text-xl font-bold">התוצאות המובילות עבורך</h3>
        </div>
        <p className="text-sm text-gray-600">מצאנו {recommendations.length} פתרונות מתאימים לאירוע שלך</p>
      </div>

      {/* Top 10 Services */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Crown className="h-5 w-5 text-purple-600" />
          <h4 className="font-bold text-lg">Top 10 שירותים מומלצים</h4>
        </div>
        
        <div className="space-y-3">
          {topServices.map((service: any, index: number) => (
            <Card key={service.id} className="hover:shadow-md transition-shadow border-r-4 border-r-purple-500">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  {/* מספר דירוג */}
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">#{index + 1}</span>
                  </div>

                  {/* Product Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm line-clamp-1">{service.name}</h4>
                        <p className="text-xs text-gray-600 mb-1">{service.provider}</p>
                      </div>
                      <div className="text-left ml-2">
                        <div className="font-bold text-sm text-purple-600">
                          {formatPrice(service.price, service.priceUnit, searchData.attendeesCount)}
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{service.rating}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-700 mb-2 line-clamp-1">{service.description}</p>

                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{service.location}</span>
                        </div>
                        {service.duration && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{service.duration} דק'</span>
                          </div>
                        )}
                      </div>
                      <Link to={`/service/${service.id}`}>
                        <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                          להרחבה
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Top 10 Providers */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Crown className="h-5 w-5 text-blue-600" />
          <h4 className="font-bold text-lg">Top 10 ספקים מומלצים</h4>
        </div>
        
        <div className="space-y-3">
          {topProviders.map((service: any, index: number) => (
            <Card key={service.providerId} className="hover:shadow-md transition-shadow border-r-4 border-r-blue-500">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  {/* מספר דירוג */}
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>

                  {/* Provider Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{service.provider}</h4>
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{service.rating}</span>
                          <span className="text-gray-500">({service.reviewCount})</span>
                        </div>
                      </div>
                      <Link to={`/provider/${service.providerId}`}>
                        <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                          צפה בספק
                        </Button>
                      </Link>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{service.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">לא נמצאו מוצרים התואמים לקריטריונים שלך</p>
          <p className="text-sm text-gray-400 mt-2">נסה לשנות את הפרמטרים או צור קשר לייעוץ אישי</p>
        </div>
      )}

      {/* Search Summary */}
      <Card className="bg-blue-50 border-blue-200 sticky bottom-0">
        <CardContent className="p-4">
          <div className="text-sm">
            <div className="font-medium mb-2">סיכום החיפוש:</div>
            <div className="space-y-1 text-xs">
              {searchData.eventDate && (
                <div>תאריך: {searchData.eventDate.toLocaleDateString('he-IL')}</div>
              )}
              {searchData.eventType && (
                <div>סוג אירוע: {
                  searchData.eventType === 'private' ? 'פרטי' : 
                  searchData.eventType === 'business' ? 'עסקי' : 
                  searchData.eventType === 'children' ? 'ילדים' : 'מעורב'
                }</div>
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
      <div className="flex gap-2 pt-4 sticky bottom-0 bg-white">
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
