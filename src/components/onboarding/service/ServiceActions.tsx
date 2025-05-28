
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface ServiceActionsProps {
  showAddAnother: boolean;
  servicesCount: number;
  onAddAnotherService: () => void;
  onFinishAddingServices: () => void;
  onAddFirstService: () => void;
}

const ServiceActions: React.FC<ServiceActionsProps> = ({
  showAddAnother,
  servicesCount,
  onAddAnotherService,
  onFinishAddingServices,
  onAddFirstService
}) => {
  if (showAddAnother) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-medium mb-4">האם יש לך מוצר נוסף להציע?</h3>
          <div className="flex gap-4 justify-center">
            <Button onClick={onAddAnotherService}>
              <Plus className="h-4 w-4 ml-2" />
              כן, הוסף מוצר נוסף
            </Button>
            <Button variant="outline" onClick={onFinishAddingServices}>
              לא, סיימתי להוסיף מוצרים
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (servicesCount === 0) {
    return (
      <div className="text-center">
        <Button 
          onClick={onAddFirstService}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          הוסף שירות ראשון
        </Button>
      </div>
    );
  }

  return null;
};

export default ServiceActions;
