
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, BarChart3 } from "lucide-react";

interface ComparisonSelectorProps {
  selectedServices: any[];
  onCompare: () => void;
  onRemove: (serviceId: string) => void;
}

const ComparisonSelector: React.FC<ComparisonSelectorProps> = ({
  selectedServices,
  onCompare,
  onRemove
}) => {
  if (selectedServices.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 z-50">
      <Card className="shadow-lg border-2 border-brand-200 bg-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-brand-600 ml-2" />
                <span className="font-medium">השוואת שירותים</span>
                <Badge variant="secondary" className="mr-2">
                  {selectedServices.length}/3
                </Badge>
              </div>

              <div className="flex gap-2 overflow-x-auto max-w-md">
                {selectedServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center bg-brand-50 rounded-full px-3 py-1 whitespace-nowrap"
                  >
                    <span className="text-sm font-medium truncate max-w-24">
                      {service.name}
                    </span>
                    <button
                      onClick={() => onRemove(service.id)}
                      className="mr-2 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => selectedServices.forEach(s => onRemove(s.id))}
                size="sm"
              >
                נקה הכל
              </Button>
              
              <Button
                onClick={onCompare}
                disabled={selectedServices.length < 2}
                className="bg-brand-600 hover:bg-brand-700"
                size="sm"
              >
                השווה שירותים ({selectedServices.length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonSelector;
