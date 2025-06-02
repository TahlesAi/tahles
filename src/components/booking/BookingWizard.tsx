
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomerDetailsForm from "./CustomerDetailsForm";
import EventDetailsForm from "./EventDetailsForm";
import SpecialRequests from "./SpecialRequests";
import UpsellsSelection from "./UpsellsSelection";
import PaymentOptions from "./PaymentOptions";
import BookingConfirmation from "./BookingConfirmation";
import { Progress } from "@/components/ui/progress";

interface BookingWizardProps {
  currentStep: number;
  bookingData: any;
  service: any;
  provider: any;
  onUpdate: (updates: any) => void;
  onStepChange: (step: number) => void;
  onComplete: () => void;
}

const BookingWizard: React.FC<BookingWizardProps> = ({
  currentStep,
  bookingData,
  service,
  provider,
  onUpdate,
  onStepChange,
  onComplete
}) => {
  const steps = [
    { number: 1, title: "פרטי לקוח", component: CustomerDetailsForm },
    { number: 2, title: "פרטי אירוע", component: EventDetailsForm },
    { number: 3, title: "בקשות מיוחדות", component: SpecialRequests },
    { number: 4, title: "שירותים נוספים", component: UpsellsSelection },
    { number: 5, title: "אופן תשלום", component: PaymentOptions },
    { number: 6, title: "אישור הזמנה", component: BookingConfirmation }
  ];

  const currentStepData = steps[currentStep - 1];
  const CurrentComponent = currentStepData.component;
  const progress = (currentStep / steps.length) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            שלב {currentStep}: {currentStepData.title}
          </CardTitle>
          <span className="text-sm text-gray-500">
            {currentStep} מתוך {steps.length}
          </span>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      
      <CardContent>
        <CurrentComponent
          bookingData={bookingData}
          service={service}
          provider={provider}
          onUpdate={onUpdate}
          onNext={() => {
            if (currentStep < steps.length) {
              onStepChange(currentStep + 1);
            } else {
              onComplete();
            }
          }}
          onBack={() => onStepChange(Math.max(1, currentStep - 1))}
          isLastStep={currentStep === steps.length}
        />
      </CardContent>
    </Card>
  );
};

export default BookingWizard;
