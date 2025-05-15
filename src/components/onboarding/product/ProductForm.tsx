
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Minus, Plus, Info } from "lucide-react";

interface ProductFormProps {
  productData: {
    title: string;
    duration: number;
    audience: number;
    ageRange: string;
    price: number;
  };
  errors: Record<string, string>;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNumberChange: (name: string, value: number) => void;
  onAgeRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductForm = ({
  productData,
  errors,
  onTitleChange,
  onNumberChange,
  onAgeRangeChange
}: ProductFormProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <Label htmlFor="mainImage" className="mb-2 block">תמונת נושא</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-2">
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">העלו תמונה ראשית</p>
              <Button variant="outline" size="sm">
                בחרו קובץ
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-500">קובץ סטטי שהמוקלט נכנעה למערכת</p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-start gap-2 mb-1">
            <Label htmlFor="title">שם המוצר / שירות</Label>
            <Info className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            id="title"
            name="title"
            value={productData.title}
            onChange={onTitleChange}
            placeholder="שם המוצר"
            className={errors.title ? "border-destructive" : ""}
          />
          {errors.title && (
            <p className="text-destructive text-sm mt-1">{errors.title}</p>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label>זמן מופע</Label>
            <div className="flex items-center">
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={() => onNumberChange('duration', Math.max(15, productData.duration - 15))}
                className="h-8 w-8 rounded-full"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-16 text-center">{productData.duration}</span>
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={() => onNumberChange('duration', productData.duration + 15)}
                className="h-8 w-8 rounded-full"
              >
                <Plus className="h-3 w-3" />
              </Button>
              <span className="mr-2">דקות</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label>כמות קהל להופעות</Label>
            <div className="flex items-center">
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={() => onNumberChange('audience', Math.max(50, productData.audience - 50))}
                className="h-8 w-8 rounded-full"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-16 text-center">{productData.audience}</span>
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={() => onNumberChange('audience', productData.audience + 50)}
                className="h-8 w-8 rounded-full"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label>גילאי קהל</Label>
            <div className="flex items-center">
              <Input 
                value={productData.ageRange}
                onChange={onAgeRangeChange}
                className="w-24 text-center"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label>מחיר כרטיסים</Label>
            <div className="flex items-center">
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={() => onNumberChange('price', Math.max(50, productData.price - 10))}
                className="h-8 w-8 rounded-full"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-16 text-center">{productData.price}</span>
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={() => onNumberChange('price', productData.price + 10)}
                className="h-8 w-8 rounded-full"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
