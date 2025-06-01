
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, MapPin, Clock, Calculator, Package, ShoppingCart } from "lucide-react";

interface PricingRule {
  type: 'audience' | 'distance' | 'duration' | 'kosher' | 'special_requirements' | 'quantity';
  condition: string;
  modifier: number;
  modifierType: 'fixed' | 'percentage' | 'per_unit';
  description: string;
}

interface ProductVariant {
  id: string;
  name: string;
  basePrice: number;
  priceUnit: 'per_event' | 'per_person' | 'per_hour' | 'per_item';
  inventory?: number;
  maxQuantity?: number;
  pricingRules: PricingRule[];
}

interface ServicePricingProps {
  service: any;
  variants: ProductVariant[];
  onPriceUpdate: (totalPrice: number, details: any) => void;
}

const EnhancedServicePricing: React.FC<ServicePricingProps> = ({
  service,
  variants,
  onPriceUpdate
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(variants[0] || {
    id: 'default',
    name: 'מוצר בסיס',
    basePrice: service.price || 5000,
    priceUnit: 'per_event',
    pricingRules: []
  });
  
  const [audienceSize, setAudienceSize] = useState(50);
  const [travelDistance, setTravelDistance] = useState(0);
  const [duration, setDuration] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [isKosher, setIsKosher] = useState(false);
  const [specialRequirements, setSpecialRequirements] = useState<string[]>([]);

  const getMaxQuantity = () => {
    if (selectedVariant.inventory) {
      return Math.min(selectedVariant.maxQuantity || selectedVariant.inventory, selectedVariant.inventory);
    }
    return selectedVariant.maxQuantity || 10;
  };

  const calculatePrice = () => {
    let basePrice = selectedVariant.basePrice;
    let totalPrice = basePrice;
    
    // חישוב לפי יחידת מחיר
    switch (selectedVariant.priceUnit) {
      case 'per_person':
        totalPrice = basePrice * audienceSize;
        break;
      case 'per_hour':
        totalPrice = basePrice * duration;
        break;
      case 'per_item':
        totalPrice = basePrice * quantity;
        break;
      default:
        totalPrice = basePrice;
    }

    const appliedRules: any[] = [];

    // החלת כללי תמחור
    selectedVariant.pricingRules.forEach(rule => {
      let shouldApply = false;
      let ruleValue = 0;

      switch (rule.type) {
        case 'audience':
          const audienceThreshold = parseInt(rule.condition);
          shouldApply = audienceSize > audienceThreshold;
          if (shouldApply) {
            if (rule.modifierType === 'per_unit') {
              ruleValue = (audienceSize - audienceThreshold) * rule.modifier;
            }
          }
          break;
        
        case 'distance':
          const distanceThreshold = parseInt(rule.condition);
          shouldApply = travelDistance > distanceThreshold;
          if (shouldApply) {
            if (rule.modifierType === 'per_unit') {
              ruleValue = (travelDistance - distanceThreshold) * rule.modifier;
            }
          }
          break;
        
        case 'duration':
          const durationThreshold = parseFloat(rule.condition);
          shouldApply = duration > durationThreshold;
          if (shouldApply && rule.modifierType === 'percentage') {
            ruleValue = totalPrice * (rule.modifier / 100);
          }
          break;
        
        case 'kosher':
          shouldApply = isKosher && rule.condition === 'required';
          if (shouldApply) {
            ruleValue = rule.modifierType === 'percentage' 
              ? totalPrice * (rule.modifier / 100) 
              : rule.modifier;
          }
          break;
        
        case 'quantity':
          const quantityThreshold = parseInt(rule.condition);
          shouldApply = quantity >= quantityThreshold;
          if (shouldApply && rule.modifierType === 'percentage') {
            ruleValue = -totalPrice * (rule.modifier / 100); // הנחה לכמות
          }
          break;
      }

      if (shouldApply) {
        if (rule.modifierType === 'fixed') {
          ruleValue = rule.modifier;
        }
        
        totalPrice += ruleValue;
        appliedRules.push({
          description: rule.description,
          value: ruleValue,
          type: rule.type
        });
      }
    });

    const details = {
      selectedVariant: selectedVariant.name,
      basePrice,
      audienceSize,
      travelDistance,
      duration,
      quantity,
      isKosher,
      specialRequirements,
      appliedRules,
      priceUnit: selectedVariant.priceUnit,
      inventory: selectedVariant.inventory
    };

    onPriceUpdate(Math.max(0, totalPrice), details);
    return Math.max(0, totalPrice);
  };

  useEffect(() => {
    calculatePrice();
  }, [selectedVariant, audienceSize, travelDistance, duration, quantity, isKosher, specialRequirements]);

  const currentPrice = calculatePrice();

  return (
    <Card className="border-brand-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-brand-600" />
          חישוב מחיר מתקדם
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* בחירת וריאנט */}
        {variants.length > 1 && (
          <div>
            <Label className="text-base font-medium mb-3 block">בחר חבילה/וריאנט</Label>
            <Select 
              value={selectedVariant.id} 
              onValueChange={(value) => {
                const variant = variants.find(v => v.id === value);
                if (variant) setSelectedVariant(variant);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="בחר חבילה" />
              </SelectTrigger>
              <SelectContent>
                {variants.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id}>
                    <div className="flex justify-between items-center w-full">
                      <span>{variant.name}</span>
                      <div className="text-sm text-gray-500 mr-4">
                        ₪{variant.basePrice.toLocaleString()} / {
                          variant.priceUnit === 'per_event' ? 'אירוע' :
                          variant.priceUnit === 'per_person' ? 'אדם' :
                          variant.priceUnit === 'per_hour' ? 'שעה' : 'יחידה'
                        }
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedVariant.inventory && (
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  <Package className="h-3 w-3 ml-1" />
                  {selectedVariant.inventory} במלאי
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* כמות (רק למוצרים הנמכרים ליחידה) */}
        {selectedVariant.priceUnit === 'per_item' && (
          <div>
            <Label htmlFor="quantity" className="flex items-center gap-2 mb-2">
              <ShoppingCart className="h-4 w-4" />
              כמות
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.min(parseInt(e.target.value) || 1, getMaxQuantity()))}
              min="1"
              max={getMaxQuantity()}
            />
            <div className="text-xs text-gray-500 mt-1">
              מקסימום: {getMaxQuantity()} יחידות
            </div>
          </div>
        )}

        {/* גודל קהל (רק אם רלוונטי) */}
        {selectedVariant.priceUnit !== 'per_person' && (
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
          </div>
        )}

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
            max="12"
            step="0.5"
          />
        </div>

        {/* דרישות כשרות (רק למוצרי מזון) */}
        {(service.category === 'מזון ומשקאות' || service.subcategory?.includes('קייטרינג')) && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="kosher"
              checked={isKosher}
              onCheckedChange={setIsKosher}
            />
            <Label htmlFor="kosher" className="text-sm font-medium">
              דרישת כשרות
            </Label>
          </div>
        )}

        {/* תוספות שהוחלו */}
        {calculatePrice() > selectedVariant.basePrice && (
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">תוספות מחיר:</h4>
            <div className="space-y-2 text-sm">
              {/* הצגת התוספות כאן */}
            </div>
          </div>
        )}

        {/* סיכום מחיר */}
        <div className="border-t pt-4">
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-2">
              מחיר בסיס: ₪{selectedVariant.basePrice.toLocaleString()}
              {selectedVariant.priceUnit === 'per_person' && ` × ${audienceSize} אנשים`}
              {selectedVariant.priceUnit === 'per_hour' && ` × ${duration} שעות`}
              {selectedVariant.priceUnit === 'per_item' && ` × ${quantity} יחידות`}
            </div>
            <div className="text-2xl font-bold text-brand-600">
              סה"כ: ₪{currentPrice.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedServicePricing;
