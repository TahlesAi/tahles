
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, MapPin, Star, Clock, Users } from 'lucide-react';
import RatingDisplay from '@/components/rating/RatingDisplay';

interface ServiceComparisonTableProps {
  services: any[];
}

const ServiceComparisonTable: React.FC<ServiceComparisonTableProps> = ({ services }) => {
  const comparisonFields = [
    { key: 'price', label: 'מחיר', type: 'price' },
    { key: 'rating', label: 'דירוג', type: 'rating' },
    { key: 'location', label: 'מיקום', type: 'text' },
    { key: 'duration', label: 'משך מופע', type: 'duration' },
    { key: 'audienceSize', label: 'גודל קהל', type: 'audience' },
    { key: 'features', label: 'תכונות', type: 'features' },
    { key: 'technicalRequirements', label: 'דרישות טכניות', type: 'list' }
  ];

  const renderFieldValue = (service: any, field: any) => {
    const value = service[field.key];
    
    switch (field.type) {
      case 'price':
        return (
          <div className="text-lg font-bold text-blue-600">
            ₪{value?.toLocaleString() || 'לא צוין'}
          </div>
        );
      
      case 'rating':
        return value ? (
          <RatingDisplay rating={value} reviewCount={service.reviewCount} size="sm" />
        ) : (
          <span className="text-gray-500">אין דירוג</span>
        );
      
      case 'duration':
        return value ? `${value} דקות` : 'גמיש';
      
      case 'audience':
        if (service.audienceSize) {
          return `${service.audienceSize.min}-${service.audienceSize.max} אנשים`;
        }
        return 'גמיש';
      
      case 'features':
        return (
          <div className="space-y-1">
            {value?.slice(0, 3).map((feature: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {value?.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{value.length - 3}
              </Badge>
            )}
          </div>
        );
      
      case 'list':
        return value?.length > 0 ? (
          <ul className="text-sm space-y-1">
            {value.slice(0, 3).map((item: string, index: number) => (
              <li key={index} className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-600" />
                {item}
              </li>
            ))}
            {value.length > 3 && (
              <li className="text-gray-500">+{value.length - 3} נוספים</li>
            )}
          </ul>
        ) : (
          <span className="text-gray-500">לא צוין</span>
        );
      
      default:
        return value || 'לא צוין';
    }
  };

  const getBestValue = (services: any[], fieldKey: string) => {
    switch (fieldKey) {
      case 'price':
        return Math.min(...services.map(s => s[fieldKey] || Infinity));
      case 'rating':
        return Math.max(...services.map(s => s[fieldKey] || 0));
      default:
        return null;
    }
  };

  const isHighlighted = (service: any, field: any) => {
    const bestValue = getBestValue(services, field.key);
    if (bestValue === null) return false;
    
    switch (field.key) {
      case 'price':
        return service[field.key] === bestValue;
      case 'rating':
        return service[field.key] === bestValue;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* כותרות השירותים */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {services.map((service) => (
          <Card key={service.id} className="text-center">
            <CardHeader className="pb-2">
              <img 
                src={service.imageUrl || service.image_url} 
                alt={service.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <CardTitle className="text-lg">{service.name}</CardTitle>
              <p className="text-sm text-blue-600">{service.provider}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <Button className="w-full" size="sm">
                בחר שירות זה
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* טבלת השוואה */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-right font-medium">מאפיין</th>
              {services.map((service) => (
                <th key={service.id} className="p-3 text-center font-medium">
                  {service.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonFields.map((field) => (
              <tr key={field.key} className="border-t">
                <td className="p-3 font-medium bg-gray-50">{field.label}</td>
                {services.map((service) => (
                  <td 
                    key={service.id} 
                    className={`p-3 text-center ${
                      isHighlighted(service, field) ? 'bg-green-50 border-green-200' : ''
                    }`}
                  >
                    {renderFieldValue(service, field)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* הערות */}
      <div className="text-sm text-gray-600 space-y-1">
        <p className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-50 border border-green-200 rounded"></span>
          ערכים מודגשים מציינים את האופציה הטובה ביותר
        </p>
        <p>* המחירים כוללים מע"מ ועשויים להשתנות בהתאם למיקום ולדרישות נוספות</p>
      </div>
    </div>
  );
};

export default ServiceComparisonTable;
