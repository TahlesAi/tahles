
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

  const getComponentProps = () => {
    const baseProps = {
      bookingData,
      onUpdate,
      onNext: () => {
        if (currentStep < steps.length) {
          onStepChange(currentStep + 1);
        } else {
          onComplete();
        }
      },
      onBack: () => onStepChange(Math.max(1, currentStep - 1)),
      isLastStep: currentStep === steps.length,
      // הוספת מצב בדיקה - מתיר מעבר בלי אימותים
      testMode: true
    };

    // הוספת props נוספים לפי הצורך של כל קומפוננטה
    if (currentStep === 2 || currentStep === 4 || currentStep === 5 || currentStep === 6) {
      return { ...baseProps, service, provider };
    }

    return baseProps;
  };

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
        
        {/* הודעת מצב בדיקה */}
        <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-2">
          <p className="text-xs text-yellow-800">
            🧪 מצב בדיקה: ניתן לדלג על שדות חובה ולעבור בין שלבים בחופשיות
          </p>
        </div>
      </CardHeader>
      
      <CardContent>
        <CurrentComponent {...getComponentProps()} />
      </CardContent>
    </Card>
  );
};

export default BookingWizard;
