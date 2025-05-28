
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import VariantOption from "./VariantOption";

interface VariantOptionData {
  name: string;
  priceModifier: number;
  priceType: 'fixed' | 'percentage';
}

interface Variant {
  parameter: string;
  options: VariantOptionData[];
}

interface VariantDisplayProps {
  variant: Variant;
  index: number;
  onRemove: (index: number) => void;
  onUpdateOption: (variantIndex: number, optionIndex: number, field: keyof VariantOptionData, value: string | number) => void;
}

const VariantDisplay: React.FC<VariantDisplayProps> = ({
  variant,
  index,
  onRemove,
  onUpdateOption
}) => {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-3">
        <h5 className="font-medium">{variant.parameter}</h5>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onRemove(index)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        {variant.options.map((option, optionIndex) => (
          <VariantOption
            key={optionIndex}
            option={option}
            index={optionIndex}
            onUpdate={(optIndex, field, value) => onUpdateOption(index, optIndex, field, value)}
            onRemove={() => {}} // Handled by parent
            showRemove={false}
          />
        ))}
      </div>
    </div>
  );
};

export default VariantDisplay;
