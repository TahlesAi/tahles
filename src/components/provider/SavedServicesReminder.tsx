
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { X, ArrowLeft } from "lucide-react";
import { removeSavedService } from './ServiceCard';

interface SavedService {
  id: string;
  name: string;
  short_description?: string;
  price_range: string;
  provider_id: string;
  provider_name: string;
  image_url?: string;
  saved_at: string;
}

const SavedServicesReminder = () => {
  const [savedServices, setSavedServices] = useState<SavedService[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Load saved services from localStorage
  useEffect(() => {
    const checkForSavedServices = () => {
      const savedServicesData = localStorage.getItem("savedServices");
      if (savedServicesData) {
        const services = JSON.parse(savedServicesData);
        if (services.length > 0) {
          setSavedServices(services);
          
          // Only show reminder if user has been on the site for more than 10 seconds
          // or is about to leave
          setTimeout(() => {
            setIsOpen(true);
          }, 10000);
        }
      }
    };
    
    // Check on initial load
    checkForSavedServices();
    
    // Listen for any updates to saved services
    const handleSavedServicesUpdate = (event: any) => {
      setSavedServices(event.detail);
    };
    
    window.addEventListener("savedServicesUpdated", handleSavedServicesUpdate);
    
    // Check when user is about to leave
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const savedServicesData = localStorage.getItem("savedServices");
      if (savedServicesData) {
        const services = JSON.parse(savedServicesData);
        if (services.length > 0 && !isOpen) {
          setIsOpen(true);
          e.preventDefault();
          e.returnValue = '';
          return '';
        }
      }
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      window.removeEventListener("savedServicesUpdated", handleSavedServicesUpdate);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isOpen]);
  
  const handleViewService = (serviceId: string, providerId: string) => {
    setIsOpen(false);
    navigate(`/providers/${providerId}`);
  };
  
  const handleRemoveService = (serviceId: string) => {
    removeSavedService(serviceId);
    const updatedServices = savedServices.filter(service => service.id !== serviceId);
    setSavedServices(updatedServices);
    if (updatedServices.length === 0) {
      setIsOpen(false);
    }
  };
  
  if (savedServices.length === 0) {
    return null;
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent dir="rtl" className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">שירותים שמורים</DialogTitle>
          <DialogDescription className="text-center">
            מצאנו שירותים שהתעניינת בהם אך טרם השלמת את ההזמנה
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-[400px] overflow-auto py-2">
          {savedServices.map((service) => (
            <div 
              key={service.id}
              className="flex items-center justify-between border-b py-4 last:border-b-0"
            >
              <div className="flex items-center">
                {service.image_url && (
                  <div className="w-16 h-16 rounded overflow-hidden mr-3">
                    <img 
                      src={service.image_url} 
                      alt={service.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-medium">{service.name}</h4>
                  <p className="text-sm text-gray-500">{service.provider_name}</p>
                  <p className="text-sm font-medium text-brand-600">{service.price_range}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => handleRemoveService(service.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleViewService(service.id, service.provider_id)}
                >
                  <ArrowLeft className="h-4 w-4 ml-1" />
                  צפה בשירות
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <DialogFooter className="justify-between flex-row-reverse sm:justify-between">
          <Button onClick={() => setIsOpen(false)} variant="outline">
            סגור
          </Button>
          <Button 
            onClick={() => {
              localStorage.removeItem("savedServices");
              setSavedServices([]);
              setIsOpen(false);
            }}
            variant="ghost"
          >
            מחק הכל
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SavedServicesReminder;
