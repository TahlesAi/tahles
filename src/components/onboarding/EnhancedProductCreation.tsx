import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Plus, X } from "lucide-react";
import BasicInfoSection from "./product/creation/BasicInfoSection";
import AudienceSection from "./product/creation/AudienceSection";
import ServiceRequirementsSection from "./product/creation/ServiceRequirementsSection";

interface ProductData {
  id?: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  duration: string;
  audienceSize: string;
  targetAudience: string[];
  suitableFor: string[];
  technicalRequirements: string[];
  includedServices: string[];
  additionalOptions: Array<{
    name: string;
    price: number;
    description: string;
  }>;
  imageUrl: string;
  additionalImages: string[];
  videos: string[];
}

interface EnhancedProductCreationProps {
  productData: ProductData;
  onUpdate: (data: ProductData) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const EnhancedProductCreation: React.FC<EnhancedProductCreationProps> = ({
  productData,
  onUpdate,
  onSave,
  onCancel,
  isEditing = false
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleBasicInfoUpdate = (field: keyof ProductData, value: string | number) => {
    onUpdate({ ...productData, [field]: value });
  };

  const handleCheckboxChange = (field: keyof ProductData, value: string) => {
    const currentValues = productData[field] as string[];
    const updated = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    onUpdate({ ...productData, [field]: updated });
  };

  const addTechnicalRequirement = () => {
    onUpdate({
      ...productData,
      technicalRequirements: [...productData.technicalRequirements, '']
    });
  };

  const updateTechnicalRequirement = (index: number, value: string) => {
    const updated = [...productData.technicalRequirements];
    updated[index] = value;
    onUpdate({ ...productData, technicalRequirements: updated });
  };

  const removeTechnicalRequirement = (index: number) => {
    const updated = productData.technicalRequirements.filter((_, i) => i !== index);
    onUpdate({ ...productData, technicalRequirements: updated });
  };

  const addIncludedService = () => {
    onUpdate({
      ...productData,
      includedServices: [...productData.includedServices, '']
    });
  };

  const updateIncludedService = (index: number, value: string) => {
    const updated = [...productData.includedServices];
    updated[index] = value;
    onUpdate({ ...productData, includedServices: updated });
  };

  const removeIncludedService = (index: number) => {
    const updated = productData.includedServices.filter((_, i) => i !== index);
    onUpdate({ ...productData, includedServices: updated });
  };

  const addAdditionalOption = () => {
    onUpdate({
      ...productData,
      additionalOptions: [...productData.additionalOptions, {
        name: '',
        price: 0,
        description: ''
      }]
    });
  };

  const updateAdditionalOption = (index: number, field: string, value: any) => {
    const updated = [...productData.additionalOptions];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate({ ...productData, additionalOptions: updated });
  };

  const removeAdditionalOption = (index: number) => {
    const updated = productData.additionalOptions.filter((_, i) => i !== index);
    onUpdate({ ...productData, additionalOptions: updated });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!productData.name.trim()) {
      newErrors.name = "שם המוצר הוא שדה חובה";
    }
    if (!productData.description.trim()) {
      newErrors.description = "תיאור המוצר הוא שדה חובה";
    }
    if (productData.price <= 0) {
      newErrors.price = "מחיר חייב להיות גדול מ-0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave();
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-center mb-6">
        <Package className="h-12 w-12 text-brand-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold">
          {isEditing ? "עריכת מוצר" : "יצירת מוצר חדש"}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BasicInfoSection
          data={{
            name: productData.name,
            description: productData.description,
            price: productData.price,
            priceUnit: productData.priceUnit,
            duration: productData.duration,
            audienceSize: productData.audienceSize
          }}
          errors={errors}
          onUpdate={handleBasicInfoUpdate}
        />

        <AudienceSection
          targetAudience={productData.targetAudience}
          suitableFor={productData.suitableFor}
          onTargetAudienceChange={(audience) => handleCheckboxChange('targetAudience', audience)}
          onSuitableForChange={(event) => handleCheckboxChange('suitableFor', event)}
        />

        <ServiceRequirementsSection
          technicalRequirements={productData.technicalRequirements}
          includedServices={productData.includedServices}
          onAddTechnicalRequirement={addTechnicalRequirement}
          onUpdateTechnicalRequirement={updateTechnicalRequirement}
          onRemoveTechnicalRequirement={removeTechnicalRequirement}
          onAddIncludedService={addIncludedService}
          onUpdateIncludedService={updateIncludedService}
          onRemoveIncludedService={removeIncludedService}
        />

        {/* Additional Options */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>אפשרויות נוספות (תוספות)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {productData.additionalOptions.map((option, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">תוספת #{index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAdditionalOption(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>שם התוספת</Label>
                    <Input
                      value={option.name}
                      onChange={(e) => updateAdditionalOption(index, 'name', e.target.value)}
                      placeholder="למשל: זמן נוסף"
                    />
                  </div>
                  <div>
                    <Label>מחיר</Label>
                    <Input
                      type="number"
                      value={option.price}
                      onChange={(e) => updateAdditionalOption(index, 'price', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label>תיאור</Label>
                    <Input
                      value={option.description}
                      onChange={(e) => updateAdditionalOption(index, 'description', e.target.value)}
                      placeholder="15 דקות נוספות"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addAdditionalOption}
              className="w-full"
            >
              <Plus className="h-4 w-4 ml-2" />
              הוסף תוספת
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onCancel}>
          ביטול
        </Button>
        <Button onClick={handleSave}>
          {isEditing ? "עדכן מוצר" : "שמור מוצר"}
        </Button>
      </div>
    </div>
  );
};

export default EnhancedProductCreation;
