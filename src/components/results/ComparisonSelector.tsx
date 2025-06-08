
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, BarChart3, Trash2, ArrowRight } from "lucide-react";

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
      <Card className="shadow-2xl border-2 border-brand-300 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center ml-2">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">השוואת שירותים</span>
                  <Badge variant="secondary" className="mr-2 bg-brand-100 text-brand-700">
                    {selectedServices.length}/3
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto max-w-md">
                {selectedServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center bg-gradient-to-l from-brand-50 to-brand-100 border border-brand-200 rounded-full px-3 py-2 whitespace-nowrap"
                  >
                    <span className="text-sm font-medium truncate max-w-24">
                      {service.name}
                    </span>
                    <button
                      onClick={() => onRemove(service.id)}
                      className="mr-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => selectedServices.forEach(s => onRemove(s.id))}
                size="sm"
                className="border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 transition-all duration-200"
              >
                <Trash2 className="h-4 w-4 ml-1" />
                נקה הכל
              </Button>
              
              <Button
                onClick={onCompare}
                disabled={selectedServices.length < 2}
                className="bg-gradient-to-l from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                size="sm"
              >
                <BarChart3 className="h-4 w-4 ml-1" />
                השווה שירותים ({selectedServices.length})
                <ArrowRight className="h-4 w-4 mr-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonSelector;
