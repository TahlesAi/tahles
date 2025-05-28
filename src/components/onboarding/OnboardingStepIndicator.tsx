
import React from "react";
import { CheckCircle } from "lucide-react";
import { steps } from "./OnboardingStepsData";

interface OnboardingStepIndicatorProps {
  currentStep: number;
  adminMode: boolean;
  onStepNavigation: (stepId: number) => void;
}

const OnboardingStepIndicator: React.FC<OnboardingStepIndicatorProps> = ({
  currentStep,
  adminMode,
  onStepNavigation
}) => {
  return (
    <div className="flex mb-10 overflow-x-auto pb-2" dir="rtl">
      {steps.map((step) => (
        <div 
          key={step.id}
          className="flex-1 min-w-0"
        >
          <div className="relative flex items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm cursor-pointer transition-all ${
                currentStep >= step.id 
                  ? "bg-brand-600 text-white" 
                  : "bg-gray-200 text-gray-500"
              } ${(adminMode || step.id <= currentStep) ? "hover:bg-brand-700" : ""}`}
              onClick={() => onStepNavigation(step.id)}
            >
              {step.id < 9 ? step.id : <CheckCircle className="h-4 w-4" />}
            </div>
            <div className={`h-1 flex-1 ${
              currentStep > step.id ? "bg-brand-600" : "bg-gray-200"
            }`}>
              {step.id < steps.length && <div></div>}
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className={`font-medium text-xs cursor-pointer ${
              currentStep >= step.id ? "text-gray-900" : "text-gray-500"
            }`}
            onClick={() => onStepNavigation(step.id)}
            >
              {step.title}
            </div>
            <div className="text-xs text-gray-500 hidden md:block">{step.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OnboardingStepIndicator;
