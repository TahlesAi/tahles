
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface ServiceAvailabilityTabProps {
  serviceId: string;
}

const ServiceAvailabilityTab = ({ serviceId }: ServiceAvailabilityTabProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="pt-4">
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <Calendar className="h-10 w-10 mx-auto mb-2 text-gray-500" />
        <h3 className="text-lg font-medium mb-2">בדיקת זמינות והזמנה</h3>
        <p className="text-gray-500 mb-4 max-w-md mx-auto">
          לבדיקת זמינות והזמנה עבור השירות שבחרתם, לחצו על כפתור "הזמן עכשיו" ומלאו את הפרטים הנדרשים
        </p>
        <Button onClick={() => navigate(`/booking/${serviceId}`)}>הזמן עכשיו</Button>
      </div>
    </div>
  );
};

export default ServiceAvailabilityTab;
