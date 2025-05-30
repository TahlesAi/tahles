
import React from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceErrorStateProps {
  error: string | null;
}

const ServiceErrorState = ({ error }: ServiceErrorStateProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex-grow flex items-center justify-center min-h-[50vh]">
      <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-sm">
        <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">השירות לא נמצא</h2>
        <p className="mb-6 text-gray-600">{error || "לא הצלחנו למצוא את השירות המבוקש"}</p>
        
        <div className="flex flex-col gap-3">
          <Button onClick={() => navigate(-1)} className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            חזרה לעמוד הקודם
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            חזרה לדף הבית
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceErrorState;
