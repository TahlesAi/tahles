
import React, { useState } from 'react';
import { X, BarChart3, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ServiceComparisonTable from './ServiceComparisonTable';

interface ServiceComparisonBarProps {
  selectedServices: any[];
  onRemoveService: (serviceId: string) => void;
  onClearAll: () => void;
}

const ServiceComparisonBar: React.FC<ServiceComparisonBarProps> = ({
  selectedServices,
  onRemoveService,
  onClearAll
}) => {
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  if (selectedServices.length === 0) return null;

  return (
    <>
      {/* בר השוואה צף */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white border-2 border-blue-500 rounded-lg shadow-lg p-3 max-w-md">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-sm">
                השוואה ({selectedServices.length}/3)
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Dialog open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="sm" 
                    disabled={selectedServices.length < 2}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Eye className="h-4 w-4 ml-1" />
                    השווה
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>השוואת שירותים</DialogTitle>
                  </DialogHeader>
                  <ServiceComparisonTable services={selectedServices} />
                </DialogContent>
              </Dialog>
              
              <Button variant="ghost" size="sm" onClick={onClearAll}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* תצוגת השירותים הנבחרים */}
          <div className="flex gap-1 mt-2">
            {selectedServices.map((service) => (
              <Badge 
                key={service.id} 
                variant="secondary" 
                className="text-xs flex items-center gap-1"
              >
                <span className="truncate max-w-20">{service.name}</span>
                <button
                  onClick={() => onRemoveService(service.id)}
                  className="hover:bg-gray-300 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceComparisonBar;
