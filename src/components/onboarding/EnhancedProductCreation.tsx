
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Users, 
  Clock, 
  DollarSign,
  MapPin,
  Star,
  Plus,
  X,
  Target,
  Settings
} from "lucide-react";

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

  const audienceSizeOptions = [
    '0-30', '31-50', '51-100', '101-200', '201-500', '500+'
  ];

  const targetAudienceOptions = [
    'ילדים (3-12)', 'נוער (13-18)', 'מבוגרים (19-65)', 'קשישים (65+)',
    'משפחות', 'עובדים', 'סטודנטים', 'קהל מעורב'
  ];

  const suitableForOptions = [
    'חתונות', 'בר/בת מצווה', 'ימי הולדת', 'אירועי חברה',
    'מסיבות רווקים/ות', 'ערבי גיבוש', 'קבלת פנים', 'מופע מרכזי',
    'כנסים', 'השקות מוצר', 'מסיבות סיום', 'חגיגות'
  ];

  const priceUnitOptions = [
    'לאירוע', 'לשעה', 'ליום', 'לאדם', 'למוצר'
  ];

  const handleCheckboxChange = (field: keyof ProductData, value: string) => {
    const currentValues = productData[field] as string[];
    const updated = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    onUpdate({ ...productData, [field]: updated });
  };

  const addTechnicalRequirement = () => {
    const newRequirement = '';
    onUpdate({
      ...productData,
      technicalRequirements: [...productData.technicalRequirements, newRequirement]
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
    const newService = '';
    onUpdate({
      ...productData,
      includedServices: [...productData.includedServices, newService]
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
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              פרטים בסיסיים
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="productName">שם המוצר *</Label>
              <Input
                id="productName"
                value={productData.name}
                onChange={(e) => onUpdate({ ...productData, name: e.target.value })}
                placeholder="למשל: מופע קסמים לילדים"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="productDescription">תיאור המוצר *</Label>
              <Textarea
                id="productDescription"
                value={productData.description}
                onChange={(e) => onUpdate({ ...productData, description: e.target.value })}
                placeholder="תאר את המוצר, מה כלול בו ומה הופך אותו למיוחד..."
                className="min-h-[100px]"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="productPrice">מחיר *</Label>
                <Input
                  id="productPrice"
                  type="number"
                  value={productData.price}
                  onChange={(e) => onUpdate({ ...productData, price: parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
              </div>

              <div>
                <Label htmlFor="priceUnit">יחידת מחיר</Label>
                <Select
                  value={productData.priceUnit}
                  onValueChange={(value) => onUpdate({ ...productData, priceUnit: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priceUnitOptions.map(unit => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="duration">משך המופע</Label>
              <Input
                id="duration"
                value={productData.duration}
                onChange={(e) => onUpdate({ ...productData, duration: e.target.value })}
                placeholder="למשל: 45 דקות"
              />
            </div>

            <div>
              <Label htmlFor="audienceSize">גודל קהל</Label>
              <Select
                value={productData.audienceSize}
                onValueChange={(value) => onUpdate({ ...productData, audienceSize: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {audienceSizeOptions.map(size => (
                    <SelectItem key={size} value={size}>{size} אנשים</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Target Audience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              קהל יעד
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label>לאיזה קהל המוצר מתאים?</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {targetAudienceOptions.map((audience) => (
                <div key={audience} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={`audience-${audience}`}
                    checked={productData.targetAudience.includes(audience)}
                    onCheckedChange={() => handleCheckboxChange('targetAudience', audience)}
                  />
                  <Label htmlFor={`audience-${audience}`} className="text-sm">
                    {audience}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suitable For */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              מתאים עבור
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label>לאילו סוגי אירועים המוצר מתאים?</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {suitableForOptions.map((event) => (
                <div key={event} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={`event-${event}`}
                    checked={productData.suitableFor.includes(event)}
                    onCheckedChange={() => handleCheckboxChange('suitableFor', event)}
                  />
                  <Label htmlFor={`event-${event}`} className="text-sm">
                    {event}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technical Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              דרישות טכניות
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {productData.technicalRequirements.map((req, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={req}
                  onChange={(e) => updateTechnicalRequirement(index, e.target.value)}
                  placeholder="למשל: חיבור חשמל 220V"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeTechnicalRequirement(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addTechnicalRequirement}
              className="w-full"
            >
              <Plus className="h-4 w-4 ml-2" />
              הוסף דרישה טכנית
            </Button>
          </CardContent>
        </Card>

        {/* Included Services */}
        <Card>
          <CardHeader>
            <CardTitle>שירותים כלולים</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {productData.includedServices.map((service, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={service}
                  onChange={(e) => updateIncludedService(index, e.target.value)}
                  placeholder="למשל: הגעה והתארגנות"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeIncludedService(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addIncludedService}
              className="w-full"
            >
              <Plus className="h-4 w-4 ml-2" />
              הוסף שירות כלול
            </Button>
          </CardContent>
        </Card>

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

      {/* Action Buttons */}
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
