
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UpdatedTermsAgreement from "@/components/terms/UpdatedTermsAgreement";
import { toast } from "sonner";

interface ServiceBookingTermsProps {
  serviceId: string;
  onProceed: () => void;
}

const ServiceBookingTerms: React.FC<ServiceBookingTermsProps> = ({ 
  serviceId, 
  onProceed 
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleProceed = () => {
    if (!termsAccepted) {
      setError("יש לאשר את תנאי השימוש כדי להמשיך");
      toast.error("יש לאשר את תנאי השימוש כדי להמשיך");
      return;
    }
    
    setError("");
    onProceed();
  };

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <UpdatedTermsAgreement 
        type="customer"
        accepted={termsAccepted}
        onChange={setTermsAccepted}
        error={error}
      />
      
      <div className="mt-4">
        <Button 
          className="w-full"
          onClick={handleProceed}
        >
          המשך להזמנה
        </Button>
      </div>
    </div>
  );
};

export default ServiceBookingTerms;
