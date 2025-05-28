
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";

interface VariantOptionData {
  name: string;
  priceModifier: number;
  priceType: 'fixed' | 'percentage';
}

interface VariantOptionProps {
  option: VariantOptionData;
  index: number;
  onUpdate: (index: number, field: keyof VariantOptionData, value: string | number) => void;
  onRemove: (index: number) => void;
  showRemove?: boolean;
}

const VariantOption: React.FC<VariantOptionProps> = ({
  option,
  index,
  onUpdate,
  onRemove,
  showRemove = true
}) => {
  return (
    <div className="grid grid-cols-5 gap-2 items-center">
      <Input
        placeholder="שם האפשרות"
        value={option.name}
        onChange={(e) => onUpdate(index, 'name', e.target.value)}
      />
      <Input
        type="number"
        placeholder="שינוי מחיר"
        value={option.priceModifier}
        onChange={(e) => onUpdate(index, 'priceModifier', parseFloat(e.target.value) || 0)}
      />
      <Select
        value={option.priceType}
        onValueChange={(value: 'fixed' | 'percentage') => onUpdate(index, 'priceType', value)}
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
      {showRemove && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onRemove(index)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default VariantOption;
