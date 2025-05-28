
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
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

interface VariantCreatorProps {
  onAdd: (variant: Variant) => void;
  predefinedParameters: string[];
}

const VariantCreator: React.FC<VariantCreatorProps> = ({
  onAdd,
  predefinedParameters
}) => {
  const [newVariant, setNewVariant] = useState<Variant>({
    parameter: "",
    options: []
  });

  const addOption = () => {
    setNewVariant(prev => ({
      ...prev,
      options: [
        ...prev.options,
        { name: "", priceModifier: 0, priceType: 'fixed' }
      ]
    }));
  };

  const updateOption = (index: number, field: keyof VariantOptionData, value: string | number) => {
    setNewVariant(prev => ({
      ...prev,
      options: prev.options.map((option, i) => 
        i === index ? { ...option, [field]: value } : option
      )
    }));
  };

  const removeOption = (index: number) => {
    setNewVariant(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const handleAdd = () => {
    if (newVariant.parameter && newVariant.options.length > 0) {
      onAdd({ ...newVariant });
      setNewVariant({ parameter: "", options: [] });
    }
  };

  return (
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

        {newVariant.options.length > 0 && (
          <div className="space-y-2">
            <Label>אפשרויות:</Label>
            {newVariant.options.map((option, index) => (
              <VariantOption
                key={index}
                option={option}
                index={index}
                onUpdate={updateOption}
                onRemove={removeOption}
              />
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={addOption}
          >
            <Plus className="h-4 w-4 ml-2" />
            הוסף אפשרות
          </Button>
          
          {newVariant.parameter && newVariant.options.length > 0 && (
            <Button onClick={handleAdd}>
              שמור וריאנט
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VariantCreator;
