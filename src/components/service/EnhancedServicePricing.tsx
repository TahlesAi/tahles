
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, MapPin, Clock, Calculator, Package, ShoppingCart, AlertCircle } from "lucide-react";
import { PricingRule, ProductVariant, Commission } from "@/types";

interface ServicePricingProps {
  service: any;
  variants: ProductVariant[];
  onPriceUpdate: (totalPrice: number, details: any) => void;
  commission?: Commission;
}

const EnhancedServicePricing: React.FC<ServicePricingProps> = ({
  service,
  variants,
  onPriceUpdate,
  commission = { rate: 0.05, type: 'percentage', includesProcessingFees: true }
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
    if (selectedVariant.inventory?.currentStock) {
      return Math.min(
        selectedVariant.maxQuantity || selectedVariant.inventory.currentStock, 
        selectedVariant.inventory.currentStock
      );
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
      case 'per_day':
        totalPrice = basePrice * Math.ceil(duration / 8); // 8 hours per day
        break;
      default:
        totalPrice = basePrice;
    }

    const appliedRules: any[] = [];

    // החלת כללי תמחור
    selectedVariant.pricingRules?.forEach(rule => {
      if (!rule.isActive) return;
      
      let shouldApply = false;
      let ruleValue = 0;

      switch (rule.type) {
        case 'audience':
          const audienceThreshold = parseInt(rule.condition);
          shouldApply = audienceSize > audienceThreshold;
          if (shouldApply) {
            if (rule.modifierType === 'per_unit') {
              ruleValue = Math.ceil((audienceSize - audienceThreshold) / 50) * rule.modifier;
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

        case 'setup_time':
          if (selectedVariant.setupRequirements) {
            const setupHours = selectedVariant.setupRequirements.setupTimeMinutes / 60;
            shouldApply = setupHours > parseFloat(rule.condition);
            if (shouldApply) {
              ruleValue = rule.modifierType === 'fixed' ? rule.modifier : totalPrice * (rule.modifier / 100);
            }
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

    // חישוב עמלה
    const commissionAmount = commission.type === 'percentage' 
      ? totalPrice * commission.rate 
      : commission.rate;

    const finalPrice = totalPrice + (commission.includesProcessingFees ? commissionAmount : 0);

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
      inventory: selectedVariant.inventory,
      commission: {
        amount: commissionAmount,
        rate: commission.rate,
        included: commission.includesProcessingFees
      },
      setupRequirements: selectedVariant.setupRequirements
    };

    onPriceUpdate(Math.max(0, finalPrice), details);
    return Math.max(0, totalPrice);
  };

  useEffect(() => {
    calculatePrice();
  }, [selectedVariant, audienceSize, travelDistance, duration, quantity, isKosher, specialRequirements]);

  const currentPrice = calculatePrice();
  const commissionAmount = commission.type === 'percentage' 
    ? currentPrice * commission.rate 
    : commission.rate;

  const handleKosherChange = (checked: boolean | 'indeterminate') => {
    setIsKosher(checked === true);
  };

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
                          variant.priceUnit === 'per_hour' ? 'שעה' : 
                          variant.priceUnit === 'per_day' ? 'יום' : 'יחידה'
                        }
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedVariant.inventory && (
              <div className="mt-2 space-y-1">
                <Badge variant="secondary" className="text-xs">
                  <Package className="h-3 w-3 ml-1" />
                  {selectedVariant.inventory.currentStock || 'זמין'} במלאי
                </Badge>
                {selectedVariant.inventory.type === 'time_based' && selectedVariant.inventory.cooldownPeriod && (
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 ml-1" />
                    זמן המתנה: {selectedVariant.inventory.cooldownPeriod} דקות בין הופעות
                  </Badge>
                )}
              </div>
            )}
          </div>
        )}

        {/* אזהרת מלאי */}
        {selectedVariant.inventory?.type === 'limited' && 
         selectedVariant.inventory.currentStock && 
         selectedVariant.inventory.currentStock <= (selectedVariant.inventory.reorderLevel || 5) && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">מלאי מועט - רק {selectedVariant.inventory.currentStock} יחידות נותרו</span>
            </div>
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

        {/* גודל קהל */}
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
            max="24"
            step="0.5"
          />
        </div>

        {/* דרישות כשרות */}
        {(service.category === 'מזון ומשקאות' || service.subcategory?.includes('קייטרינג')) && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="kosher"
              checked={isKosher}
              onCheckedChange={handleKosherChange}
            />
            <Label htmlFor="kosher" className="text-sm font-medium">
              דרישת כשרות
            </Label>
          </div>
        )}

        {/* דרישות הקמה */}
        {selectedVariant.setupRequirements && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="font-medium text-blue-900 mb-2">דרישות הקמה ופירוק</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• זמן הקמה: {selectedVariant.setupRequirements.setupTimeMinutes} דקות</p>
              <p>• זמן פירוק: {selectedVariant.setupRequirements.teardownTimeMinutes} דקות</p>
              {selectedVariant.setupRequirements.requiresTechnicalCrew && (
                <p>• נדרש צוות טכני מקצועי</p>
              )}
              {selectedVariant.setupRequirements.requiredSpace && (
                <p>• דרישות מקום: {selectedVariant.setupRequirements.requiredSpace}</p>
              )}
            </div>
          </div>
        )}

        {/* סיכום מחיר */}
        <div className="border-t pt-4">
          <div className="text-right space-y-2">
            <div className="text-sm text-gray-600">
              מחיר בסיס: ₪{selectedVariant.basePrice.toLocaleString()}
              {selectedVariant.priceUnit === 'per_person' && ` × ${audienceSize} אנשים`}
              {selectedVariant.priceUnit === 'per_hour' && ` × ${duration} שעות`}
              {selectedVariant.priceUnit === 'per_item' && ` × ${quantity} יחידות`}
              {selectedVariant.priceUnit === 'per_day' && ` × ${Math.ceil(duration / 8)} ימים`}
            </div>
            
            <div className="text-lg font-semibold">
              מחיר שירות: ₪{currentPrice.toLocaleString()}
            </div>
            
            <div className="text-sm text-gray-500">
              עמלת פלטפורמה ({(commission.rate * 100).toFixed(1)}%): ₪{commissionAmount.toLocaleString()}
            </div>
            
            <div className="text-2xl font-bold text-brand-600 border-t pt-2">
              סה"כ לתשלום: ₪{(currentPrice + (commission.includesProcessingFees ? commissionAmount : 0)).toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedServicePricing;
