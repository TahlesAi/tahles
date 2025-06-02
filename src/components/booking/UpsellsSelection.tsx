
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Star, Clock, Music } from "lucide-react";

interface UpsellsSelectionProps {
  bookingData: any;
  service: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const UpsellsSelection: React.FC<UpsellsSelectionProps> = ({
  bookingData,
  service,
  onUpdate,
  onNext,
  onBack
}) => {
  const availableUpsells = [
    {
      id: 'sound_system',
      name: 'מערכת הגברה מקצועית',
      description: 'מערכת הגברה איכותית עם מיקרופונים',
      price: 300,
      icon: Music,
      recommended: true
    },
    {
      id: 'extended_time',
      name: 'הארכת זמן מופע',
      description: 'הארכה של 30 דקות נוספות',
      price: 200,
      icon: Clock,
      priceUnit: 'ל-30 דק'
    },
    {
      id: 'premium_setup',
      name: 'הכנה מתקדמת',
      description: 'הגעה מוקדמת יותר עם ציוד מקצועי',
      price: 150,
      icon: Star
    },
    {
      id: 'photo_package',
      name: 'חבילת צילום',
      description: 'צילום מקצועי של המופע',
      price: 400,
      icon: Plus,
      popular: true
    }
  ];

  const selectedUpsells = bookingData.selectedUpsells || [];

  const toggleUpsell = (upsellId: string) => {
    const updated = selectedUpsells.includes(upsellId)
      ? selectedUpsells.filter((id: string) => id !== upsellId)
      : [...selectedUpsells, upsellId];
    
    onUpdate({ selectedUpsells: updated });
  };

  const calculateUpsellsTotal = () => {
    return selectedUpsells.reduce((total: number, upsellId: string) => {
      const upsell = availableUpsells.find(u => u.id === upsellId);
      return total + (upsell?.price || 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">שירותים נוספים</h3>
        <p className="text-gray-600 text-sm">
          הוסף שירותים נוספים לחוויה מושלמת (אופציונלי)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableUpsells.map((upsell) => {
          const isSelected = selectedUpsells.includes(upsell.id);
          const IconComponent = upsell.icon;
          
          return (
            <Card 
              key={upsell.id}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'border-brand-500 bg-brand-50 shadow-md' 
                  : 'border-gray-200 hover:shadow-md'
              }`}
              onClick={() => toggleUpsell(upsell.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleUpsell(upsell.id)}
                      className="ml-3"
                    />
                    <IconComponent className="h-5 w-5 text-brand-600" />
                  </div>
                  
                  <div className="flex gap-1">
                    {upsell.recommended && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        מומלץ
                      </Badge>
                    )}
                    {upsell.popular && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                        פופולרי
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-1">{upsell.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {upsell.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-brand-600">
                      ₪{upsell.price.toLocaleString()}
                    </div>
                    {upsell.priceUnit && (
                      <span className="text-xs text-gray-500">
                        {upsell.priceUnit}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedUpsells.length > 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium mb-2">שירותים נוספים נבחרו</h4>
          <div className="space-y-1 text-sm">
            {selectedUpsells.map((upsellId: string) => {
              const upsell = availableUpsells.find(u => u.id === upsellId);
              return upsell ? (
                <div key={upsellId} className="flex justify-between">
                  <span>{upsell.name}</span>
                  <span>₪{upsell.price.toLocaleString()}</span>
                </div>
              ) : null;
            })}
            <div className="border-t pt-2 mt-2 font-medium flex justify-between">
              <span>סה"כ תוספות:</span>
              <span className="text-brand-600">₪{calculateUpsellsTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {selectedUpsells.length === 0 && (
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-sm">
            לא נבחרו שירותים נוספים. ניתן לדלג לשלב הבא.
          </p>
        </div>
      )}

      {/* כפתורי ניווט */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          שלב קודם
        </Button>
        
        <Button 
          onClick={onNext}
          className="bg-brand-600 hover:bg-brand-700"
        >
          שלב הבא
        </Button>
      </div>
    </div>
  );
};

export default UpsellsSelection;
