
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";

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

interface ServiceListProps {
  services: Service[];
  onEditService: (index: number) => void;
  onDeleteService: (index: number) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  onEditService,
  onDeleteService
}) => {
  if (services.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>השירותים שלך ({services.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {services.map((service, index) => (
            <div key={service.id || index} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
              <div className="flex-1">
                <h3 className="font-medium text-lg">{service.title}</h3>
                <div className="text-sm text-gray-600 mt-1">
                  <span>משך: {service.duration} דקות</span>
                  <span className="mx-2">•</span>
                  <span>קהל: עד {service.audience} אנשים</span>
                  <span className="mx-2">•</span>
                  <span>מחיר בסיס: ₪{service.price}</span>
                  {service.variants && service.variants.length > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{service.variants.length} וריאנטים</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEditService(index)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDeleteService(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceList;
