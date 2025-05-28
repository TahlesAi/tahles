
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Settings } from "lucide-react";

interface VariantOption {
  name: string;
  priceModifier: number;
  priceType: 'fixed' | 'percentage';
}

interface Variant {
  parameter: string;
  options: VariantOption[];
}

interface ProductVariantsProps {
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
}

const ProductVariants: React.FC<ProductVariantsProps> = ({ variants, onChange }) => {
  const [newVariant, setNewVariant] = useState<Variant>({
    parameter: "",
    options: []
  });

  const predefinedParameters = [
    "מיקום גיאוגרפי",
    "כמות משתתפים",
    "משך זמן",
    "יום בשבוע",
    "שעה ביום",
    "עונת השנה",
    "סוג האירוע",
    "תוספות מיוחדות",
    "הגברה",
    "תאורה",
    "אביזרים נוספים"
  ];

  const addVariant = () => {
    if (newVariant.parameter && newVariant.options.length > 0) {
      onChange([...variants, { ...newVariant }]);
      setNewVariant({ parameter: "", options: [] });
    }
  };

  const removeVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    onChange(updatedVariants);
  };

  const addOptionToNewVariant = () => {
    setNewVariant(prev => ({
      ...prev,
      options: [
        ...prev.options,
        { name: "", priceModifier: 0, priceType: 'fixed' }
      ]
    }));
  };

  const updateNewVariantOption = (
    optionIndex: number, 
    field: keyof VariantOption, 
    value: string | number
  ) => {
    setNewVariant(prev => ({
      ...prev,
      options: prev.options.map((option, i) => 
        i === optionIndex ? { ...option, [field]: value } : option
      )
    }));
  };

  const removeOptionFromNewVariant = (optionIndex: number) => {
    setNewVariant(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== optionIndex)
    }));
  };

  const updateVariantOption = (
    variantIndex: number,
    optionIndex: number,
    field: keyof VariantOption,
    value: string | number
  ) => {
    const updatedVariants = variants.map((variant, vIndex) => {
      if (vIndex === variantIndex) {
        return {
          ...variant,
          options: variant.options.map((option, oIndex) => 
            oIndex === optionIndex ? { ...option, [field]: value } : option
          )
        };
      }
      return variant;
    });
    onChange(updatedVariants);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          וריאנטים ותמחור דינמי
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* הצגת וריאנטים קיימים */}
        {variants.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium">וריאנטים קיימים:</h4>
            {variants.map((variant, variantIndex) => (
              <div key={variantIndex} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-medium">{variant.parameter}</h5>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeVariant(variantIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {variant.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="grid grid-cols-4 gap-2 items-center">
                      <Input
                        placeholder="שם האפשרות"
                        value={option.name}
                        onChange={(e) => updateVariantOption(
                          variantIndex, 
                          optionIndex, 
                          'name', 
                          e.target.value
                        )}
                      />
                      <Input
                        type="number"
                        placeholder="שינוי מחיר"
                        value={option.priceModifier}
                        onChange={(e) => updateVariantOption(
                          variantIndex, 
                          optionIndex, 
                          'priceModifier', 
                          parseFloat(e.target.value) || 0
                        )}
                      />
                      <Select
                        value={option.priceType}
                        onValueChange={(value: 'fixed' | 'percentage') => 
                          updateVariantOption(variantIndex, optionIndex, 'priceType', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">סכום קבוע</SelectItem>
                          <SelectItem value="percentage">אחוז</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-gray-600">
                        {option.priceType === 'fixed' ? '₪' : '%'}
                        {option.priceModifier > 0 ? '+' : ''}
                        {option.priceModifier}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* הוספת וריאנט חדש */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-4">הוסף וריאנט חדש</h4>
          
          <div className="space-y-4">
            <div>
              <Label>פרמטר</Label>
              <Select
                value={newVariant.parameter}
                onValueChange={(value) => setNewVariant(prev => ({ ...prev, parameter: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="בחר פרמטר" />
                </SelectTrigger>
                <SelectContent>
                  {predefinedParameters.map((param) => (
                    <SelectItem key={param} value={param}>
                      {param}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">פרמטר מותאם אישית</SelectItem>
                </SelectContent>
              </Select>
              
              {newVariant.parameter === "custom" && (
                <Input
                  className="mt-2"
                  placeholder="הזן פרמטר מותאם"
                  onChange={(e) => setNewVariant(prev => ({ 
                    ...prev, 
                    parameter: e.target.value 
                  }))}
                />
              )}
            </div>

            {/* אפשרויות הוריאנט */}
            {newVariant.options.length > 0 && (
              <div className="space-y-2">
                <Label>אפשרויות:</Label>
                {newVariant.options.map((option, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2 items-center">
                    <Input
                      placeholder="שם האפשרות"
                      value={option.name}
                      onChange={(e) => updateNewVariantOption(index, 'name', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="שינוי מחיר"
                      value={option.priceModifier}
                      onChange={(e) => updateNewVariantOption(
                        index, 
                        'priceModifier', 
                        parseFloat(e.target.value) || 0
                      )}
                    />
                    <Select
                      value={option.priceType}
                      onValueChange={(value: 'fixed' | 'percentage') => 
                        updateNewVariantOption(index, 'priceType', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">₪</SelectItem>
                        <SelectItem value="percentage">%</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-gray-600">
                      {option.priceType === 'fixed' ? '₪' : '%'}
                      {option.priceModifier > 0 ? '+' : ''}
                      {option.priceModifier}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeOptionFromNewVariant(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={addOptionToNewVariant}
              >
                <Plus className="h-4 w-4 ml-2" />
                הוסף אפשרות
              </Button>
              
              {newVariant.parameter && newVariant.options.length > 0 && (
                <Button onClick={addVariant}>
                  שמור וריאנט
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* הסבר על מערכת התמחור */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">איך זה עובד?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• מחיר הבסיס הוא המחיר המינימלי למוצר</li>
            <li>• כל וריאנט יכול להוסיף או להפחית מהמחיר</li>
            <li>• סכום קבוע: מוסיף/מפחית סכום מדויק</li>
            <li>• אחוז: מוסיף/מפחית אחוז מהמחיר הבסיס</li>
            <li>• הלקוח יראה את המחיר הסופי באופן אוטומטי</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductVariants;
