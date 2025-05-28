
import React from "react";
import { Button } from "@/components/ui/button";
import TermsAgreement from "../product/TermsAgreement";
import BenefitsCard from "../BenefitsCard";

interface ServiceStepFooterProps {
  isFormVisible: boolean;
  showAddAnother: boolean;
  termsAccepted: boolean;
  onTermsChange: (accepted: boolean) => void;
  onBack: () => void;
  onNext: () => void;
  isSubmitting: boolean;
  adminMode: boolean;
}

const ServiceStepFooter: React.FC<ServiceStepFooterProps> = ({
  isFormVisible,
  showAddAnother,
  termsAccepted,
  onTermsChange,
  onBack,
  onNext,
  isSubmitting,
  adminMode
}) => {
  if (isFormVisible || showAddAnother) {
    return null;
  }

  return (
    <>
      <BenefitsCard />
      
      <div className="border-t pt-6">
        <TermsAgreement 
          accepted={termsAccepted}
          onChange={onTermsChange}
          error={!adminMode && !termsAccepted ? "יש לאשר את התנאים כדי להמשיך" : undefined}
        />
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
            חזרה
          </Button>
          <Button onClick={onNext} disabled={isSubmitting}>
            {isSubmitting ? "מעבד..." : "המשך לחתימה דיגיטלית"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ServiceStepFooter;
