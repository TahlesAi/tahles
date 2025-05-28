
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import VariantDisplay from "./variant/VariantDisplay";
import VariantCreator from "./variant/VariantCreator";
import VariantExplanation from "./variant/VariantExplanation";

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

  const addVariant = (variant: Variant) => {
    onChange([...variants, variant]);
  };

  const removeVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    onChange(updatedVariants);
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
        {variants.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium">וריאנטים קיימים:</h4>
            {variants.map((variant, index) => (
              <VariantDisplay
                key={index}
                variant={variant}
                index={index}
                onRemove={removeVariant}
                onUpdateOption={updateVariantOption}
              />
            ))}
          </div>
        )}

        <VariantCreator
          onAdd={addVariant}
          predefinedParameters={predefinedParameters}
        />

        <VariantExplanation />
      </CardContent>
    </Card>
  );
};

export default ProductVariants;
