
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package } from "lucide-react";

interface BasicInfoData {
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  duration: string;
  audienceSize: string;
}

interface BasicInfoSectionProps {
  data: BasicInfoData;
  errors: Record<string, string>;
  onUpdate: (field: keyof BasicInfoData, value: string | number) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  data,
  errors,
  onUpdate
}) => {
  const priceUnitOptions = [
    'לאירוע', 'לשעה', 'ליום', 'לאדם', 'למוצר'
  ];

  const audienceSizeOptions = [
    '0-30', '31-50', '51-100', '101-200', '201-500', '500+'
  ];

  return (
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
            value={data.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            placeholder="למשל: מופע קסמים לילדים"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="productDescription">תיאור המוצר *</Label>
          <Textarea
            id="productDescription"
            value={data.description}
            onChange={(e) => onUpdate('description', e.target.value)}
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
              value={data.price}
              onChange={(e) => onUpdate('price', parseFloat(e.target.value) || 0)}
              placeholder="0"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>

          <div>
            <Label htmlFor="priceUnit">יחידת מחיר</Label>
            <Select
              value={data.priceUnit}
              onValueChange={(value) => onUpdate('priceUnit', value)}
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
            value={data.duration}
            onChange={(e) => onUpdate('duration', e.target.value)}
            placeholder="למשל: 45 דקות"
          />
        </div>

        <div>
          <Label htmlFor="audienceSize">גודל קהל</Label>
          <Select
            value={data.audienceSize}
            onValueChange={(value) => onUpdate('audienceSize', value)}
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
  );
};

export default BasicInfoSection;
