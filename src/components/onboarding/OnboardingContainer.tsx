
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import OnboardingPersonalInfo from "./OnboardingPersonalInfo";
import OnboardingBusinessProfile from "./OnboardingBusinessProfile";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

const OnboardingContainer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {},
    businessProfile: {}
  });

  const steps = [
    { id: 1, title: 'פרטים אישיים', component: OnboardingPersonalInfo },
    { id: 2, title: 'פרופיל עסקי', component: OnboardingBusinessProfile }
  ];

  const currentStepData = steps.find(step => step.id === currentStep);
  const CurrentComponent = currentStepData?.component;
  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({
      ...prev,
      [currentStep === 1 ? 'personalInfo' : 'businessProfile']: stepData
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="container max-w-2xl mx-auto px-4">
        <Card className="onboarding-container">
          <CardHeader>
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold">הצטרפות כספק שירותים</h1>
              <p className="text-gray-600">בואו נכיר אותך ואת העסק שלך</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>שלב {currentStep} מתוך {steps.length}</span>
                <span>{currentStepData?.title}</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {CurrentComponent && (
              <CurrentComponent 
                data={formData[currentStep === 1 ? 'personalInfo' : 'businessProfile']}
                onUpdate={updateFormData}
              />
            )}

            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowRight className="h-4 w-4" />
                הקודם
              </Button>

              <Button 
                onClick={handleNext}
                disabled={currentStep === steps.length}
                className="flex items-center gap-2"
              >
                {currentStep === steps.length ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    סיום
                  </>
                ) : (
                  <>
                    הבא
                    <ArrowLeft className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingContainer;
