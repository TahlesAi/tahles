
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Clock, Calculator } from "lucide-react";

interface ServicePricingProps {
  service: any;
  basePrice: number;
  onPriceUpdate: (totalPrice: number, details: any) => void;
}

const ServicePricing: React.FC<ServicePricingProps> = ({
  service,
  basePrice,
  onPriceUpdate
}) => {
  const [audienceSize, setAudienceSize] = useState(50);
  const [travelDistance, setTravelDistance] = useState(0);
  const [duration, setDuration] = useState(1);

  // חישוב מחיר דינמי
  const calculatePrice = () => {
    let totalPrice = basePrice;
    
    // תוספת לפי גודל קהל
    if (audienceSize > 100) {
      totalPrice += Math.floor((audienceSize - 100) / 50) * 500;
    }
    
    // תוספת נסיעות
    if (travelDistance > 30) {
      totalPrice += (travelDistance - 30) * 10;
    }
    
    // תוספת זמן נוסף
    if (duration > 1) {
      totalPrice += (duration - 1) * (basePrice * 0.3);
    }

    const details = {
      audienceSize,
      travelDistance,
      duration,
      breakdown: {
        base: basePrice,
        audienceExtra: audienceSize > 100 ? Math.floor((audienceSize - 100) / 50) * 500 : 0,
        travelExtra: travelDistance > 30 ? (travelDistance - 30) * 10 : 0,
        durationExtra: duration > 1 ? (duration - 1) * (basePrice * 0.3) : 0
      }
    };

    onPriceUpdate(totalPrice, details);
    return totalPrice;
  };

  React.useEffect(() => {
    calculatePrice();
  }, [audienceSize, travelDistance, duration]);

  return (
    <Card className="border-brand-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-brand-600" />
          חישוב מחיר מותאם
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* גודל קהל */}
        <div>
          <Label htmlFor="audience-size" className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4" />
            כמות משתתפים באירוע
          </Label>
          <Input
            id="audience-size"
            type="number"
            value={audienceSize}
            onChange={(e) => setAudienceSize(parseInt(e.target.value) || 0)}
            min="1"
            max="1000"
          />
          {audienceSize > 100 && (
            <Badge variant="secondary" className="mt-2">
              תוספת עבור מעל 100 משתתפים: +₪{Math.floor((audienceSize - 100) / 50) * 500}
            </Badge>
          )}
        </div>

        {/* מרחק נסיעה */}
        <div>
          <Label htmlFor="travel-distance" className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4" />
            מרחק נסיעה (ק"מ)
          </Label>
          <Input
            id="travel-distance"
            type="number"
            value={travelDistance}
            onChange={(e) => setTravelDistance(parseInt(e.target.value) || 0)}
            min="0"
            max="200"
          />
          {travelDistance > 30 && (
            <Badge variant="secondary" className="mt-2">
              תוספת נסיעה מעל 30 ק"מ: +₪{(travelDistance - 30) * 10}
            </Badge>
          )}
        </div>

        {/* משך זמן */}
        <div>
          <Label htmlFor="duration" className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4" />
            משך זמן (שעות)
          </Label>
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value) || 0)}
            min="0.5"
            max="8"
            step="0.5"
          />
          {duration > 1 && (
            <Badge variant="secondary" className="mt-2">
              תוספת זמן נוסף: +₪{Math.round((duration - 1) * (basePrice * 0.3))}
            </Badge>
          )}
        </div>

        {/* סיכום מחיר */}
        <div className="border-t pt-4">
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-2">מחיר בסיס: ₪{basePrice.toLocaleString()}</div>
            <div className="text-2xl font-bold text-brand-600">
              סה"כ: ₪{calculatePrice().toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicePricing;
