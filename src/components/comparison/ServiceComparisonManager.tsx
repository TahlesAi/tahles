
import React, { useState } from 'react';
import { Scale, X, Star, MapPin, Clock, Users, Phone, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useServiceComparison } from '@/hooks/useServiceComparison';
import { useNavigate } from 'react-router-dom';

interface ComparisonFeature {
  label: string;
  getValue: (service: any) => string | number;
  format?: (value: any) => string;
}

const ServiceComparisonManager: React.FC = () => {
  const { selectedServices, removeService, clearAll } = useServiceComparison();
  const navigate = useNavigate();

  const comparisonFeatures: ComparisonFeature[] = [
    {
      label: 'מחיר',
      getValue: (service) => service.price || 0,
      format: (price) => price > 0 ? `₪${price.toLocaleString()}` : 'לא צוין'
    },
    {
      label: 'דירוג',
      getValue: (service) => service.rating || 0,
      format: (rating) => `${rating}/5`
    },
    {
      label: 'מיקום',
      getValue: (service) => service.location || service.city || 'לא צוין'
    },
    {
      label: 'משך שירות',
      getValue: (service) => service.duration || 0,
      format: (duration) => duration > 0 ? `${duration} דקות` : 'לא צוין'
    },
    {
      label: 'גודל קהל',
      getValue: (service) => service.audienceSize?.max || 0,
      format: (size) => size > 0 ? `עד ${size} איש` : 'לא צוין'
    },
    {
      label: 'זמן הכנה',
      getValue: (service) => service.setupTime || 0,
      format: (time) => time > 0 ? `${time} דקות` : 'לא נדרש'
    }
  ];

  const handleContactProvider = (service: any) => {
    // פתיחת מסך יצירת קשר או מעבר לעמוד הספק
    navigate(`/provider/${service.providerId}`);
  };

  const handleBookService = (service: any) => {
    // מעבר לעמוד הזמנה
    navigate(`/booking/${service.id}`);
  };

  if (selectedServices.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Scale className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            אין שירותים להשוואה
          </h3>
          <p className="text-gray-500 text-center mb-6">
            חפש שירותים והוסף אותם להשוואה כדי לראות את ההבדלים ביניהם
          </p>
          <Button onClick={() => navigate('/search')}>
            התחל חיפוש
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            השוואת שירותים
          </CardTitle>
          <div className="flex gap-2">
            <span className="text-sm text-gray-600">
              {selectedServices.length}/4 שירותים
            </span>
            <Button variant="outline" size="sm" onClick={clearAll}>
              נקה הכל
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-right p-2 w-32">תכונה</th>
                {selectedServices.map((service) => (
                  <th key={service.id} className="text-center p-2 min-w-[200px]">
                    <div className="space-y-2">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeService(service.id)}
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        {service.imageUrl && (
                          <img
                            src={service.imageUrl}
                            alt={service.name}
                            className="w-16 h-16 rounded-lg object-cover mx-auto mb-2"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{service.name}</h3>
                        <p className="text-xs text-gray-600">{service.provider}</p>
                      </div>
                      {service.featured && (
                        <Badge variant="secondary" className="text-xs">
                          מומלץ
                        </Badge>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, index) => (
                <tr key={feature.label} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="font-medium p-3 text-right">{feature.label}</td>
                  {selectedServices.map((service) => {
                    const value = feature.getValue(service);
                    const formattedValue = feature.format ? feature.format(value) : value;
                    
                    return (
                      <td key={service.id} className="text-center p-3">
                        <span className="text-sm">{formattedValue}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
              
              {/* שורת תגיות */}
              <tr>
                <td className="font-medium p-3 text-right">תגיות</td>
                {selectedServices.map((service) => (
                  <td key={service.id} className="text-center p-3">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {service.tags?.slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* שורת פעולות */}
              <tr className="border-t-2">
                <td className="font-medium p-3 text-right">פעולות</td>
                {selectedServices.map((service) => (
                  <td key={service.id} className="text-center p-3">
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleBookService(service)}
                        className="w-full"
                      >
                        הזמן עכשיו
                      </Button>
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleContactProvider(service)}
                          className="flex-1"
                        >
                          <Phone className="h-3 w-3 ml-1" />
                          צור קשר
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/service/${service.id}`)}
                          className="flex-1"
                        >
                          <ExternalLink className="h-3 w-3 ml-1" />
                          פרטים
                        </Button>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {selectedServices.length < 4 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              ניתן להוסיף עוד {4 - selectedServices.length} שירותים להשוואה.
              חזור לעמוד החיפוש והוסף עוד שירותים.
            </p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => navigate('/search')}>
              חזור לחיפוש
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceComparisonManager;
