
import { useState, useCallback } from 'react';
import { SearchResultService } from "@/types";
import { toast } from "sonner";

export const useServiceComparison = () => {
  const [selectedServices, setSelectedServices] = useState<SearchResultService[]>([]);

  const addService = useCallback((service: SearchResultService) => {
    setSelectedServices(prev => {
      if (prev.find(s => s.id === service.id)) {
        toast.error('השירות כבר נמצא ברשימת ההשוואה');
        return prev;
      }
      
      if (prev.length >= 3) {
        toast.error('ניתן להשוות עד 3 שירותים בלבד');
        return prev;
      }
      
      toast.success(`${service.name} נוסף להשוואה`);
      return [...prev, service];
    });
  }, []);

  const removeService = useCallback((serviceId: string) => {
    setSelectedServices(prev => {
      const service = prev.find(s => s.id === serviceId);
      if (service) {
        toast.success(`${service.name} הוסר מההשוואה`);
      }
      return prev.filter(s => s.id !== serviceId);
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedServices([]);
    toast.success('רשימת ההשוואה נוקתה');
  }, []);

  const isServiceSelected = useCallback((serviceId: string) => {
    return selectedServices.some(s => s.id === serviceId);
  }, [selectedServices]);

  return {
    selectedServices,
    addService,
    removeService,
    clearAll,
    isServiceSelected,
    canAddMore: selectedServices.length < 3,
    hasServices: selectedServices.length > 0
  };
};
