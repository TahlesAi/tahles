
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductForm from "../product/ProductForm";
import ProductPreview from "../product/ProductPreview";
import ProductVariants from "../product/ProductVariants";

interface Service {
  id?: string;
  title: string;
  duration: number;
  audience: number;
  ageRange: string;
  price: number;
  description?: string;
  features?: string[];
  targetAudience?: string[];
  variants?: Array<{
    parameter: string;
    options: Array<{
      name: string;
      priceModifier: number;
      priceType: 'fixed' | 'percentage';
    }>;
  }>;
  additionalImages?: string[];
  mainImage?: string;
}

interface ServiceFormProps {
  currentService: Service;
  editingIndex: number | null;
  errors: Record<string, string>;
  onServiceChange: (service: Service) => void;
  onAddService: () => void;
  onCancel: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  currentService,
  editingIndex,
  errors,
  onServiceChange,
  onAddService,
  onCancel
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onServiceChange({ ...currentService, [name]: value });
  };
  
  const handleNumberChange = (name: string, value: number) => {
    onServiceChange({ ...currentService, [name]: value });
  };
  
  const handleAgeRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onServiceChange({ ...currentService, ageRange: e.target.value });
  };

  const handleVariantsChange = (variants: Service['variants']) => {
    onServiceChange({ ...currentService, variants });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {editingIndex !== null ? "עריכת שירות" : "הוספת שירות חדש"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <ProductForm 
              productData={currentService}
              errors={errors}
              onTitleChange={handleChange}
              onNumberChange={handleNumberChange}
              onAgeRangeChange={handleAgeRangeChange}
            />
          </div>
          
          <div>
            <ProductPreview productData={currentService} />
          </div>
        </div>
        
        <div className="mt-6">
          <ProductVariants
            variants={currentService.variants || []}
            onChange={handleVariantsChange}
          />
        </div>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onCancel}>
            ביטול
          </Button>
          <Button onClick={onAddService}>
            {editingIndex !== null ? "עדכן שירות" : "הוסף שירות"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceForm;
