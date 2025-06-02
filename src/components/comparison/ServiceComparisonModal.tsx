
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Clock, DollarSign, X } from "lucide-react";
import { SearchResultService } from "@/types";

interface ServiceComparisonModalProps {
  selectedServices: SearchResultService[];
  onRemoveService: (serviceId: string) => void;
  onClearAll: () => void;
}

const ServiceComparisonModal: React.FC<ServiceComparisonModalProps> = ({
  selectedServices,
  onRemoveService,
  onClearAll
}) => {
  if (selectedServices.length === 0) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg"
          disabled={selectedServices.length < 2}
        >
          השווה ({selectedServices.length})
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto" dir="rtl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">השוואת שירותים</DialogTitle>
            <Button variant="outline" size="sm" onClick={onClearAll}>
              נקה הכל
            </Button>
          </div>
        </DialogHeader>

        {/* תצוגה מובייל */}
        <div className="md:hidden space-y-4">
          {selectedServices.map((service) => (
            <Card key={service.id} className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 left-2 z-10"
                onClick={() => onRemoveService(service.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{service.name}</h3>
                    <p className="text-sm text-blue-600 mb-2">{service.provider}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm">{service.rating.toFixed(1)} ({service.reviewCount} ביקורות)</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-lg">₪{service.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">{service.priceUnit}</span>
                      </div>
                      
                      {service.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{service.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* תצוגה דסקטופ */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-4 font-medium text-gray-600">פרטים</th>
                  {selectedServices.map((service) => (
                    <th key={service.id} className="text-center p-4 min-w-[250px]">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute -top-2 -left-2"
                          onClick={() => onRemoveService(service.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <img
                          src={service.imageUrl}
                          alt={service.name}
                          className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
                        />
                        <h3 className="font-bold text-sm">{service.name}</h3>
                        <p className="text-xs text-blue-600">{service.provider}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">תיאור</td>
                  {selectedServices.map((service) => (
                    <td key={service.id} className="p-4 text-sm text-center">
                      <div className="max-w-[200px] mx-auto line-clamp-3">
                        {service.description}
                      </div>
                    </td>
                  ))}
                </tr>
                
                <tr className="border-b">
                  <td className="p-4 font-medium">דירוג</td>
                  {selectedServices.map((service) => (
                    <td key={service.id} className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{service.rating.toFixed(1)}</span>
                        <span className="text-sm text-gray-500">({service.reviewCount})</span>
                      </div>
                    </td>
                  ))}
                </tr>
                
                <tr className="border-b">
                  <td className="p-4 font-medium">מחיר</td>
                  {selectedServices.map((service) => (
                    <td key={service.id} className="p-4 text-center">
                      <div className="font-bold text-lg text-green-600">
                        ₪{service.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">{service.priceUnit}</div>
                    </td>
                  ))}
                </tr>
                
                <tr className="border-b">
                  <td className="p-4 font-medium">אזור שירות</td>
                  {selectedServices.map((service) => (
                    <td key={service.id} className="p-4 text-center">
                      <span className="text-sm">{service.location || 'לא צוין'}</span>
                    </td>
                  ))}
                </tr>
                
                <tr className="border-b">
                  <td className="p-4 font-medium">זמינות</td>
                  {selectedServices.map((service) => (
                    <td key={service.id} className="p-4 text-center">
                      <Badge variant="secondary" className="text-xs">
                        {service.availability?.dates?.length ? 'זמין' : 'יש לבדוק'}
                      </Badge>
                    </td>
                  ))}
                </tr>
                
                <tr>
                  <td className="p-4 font-medium">פעולות</td>
                  {selectedServices.map((service) => (
                    <td key={service.id} className="p-4 text-center">
                      <Button size="sm" className="w-full">
                        צפה בפרטים
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceComparisonModal;
