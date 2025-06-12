
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ArrowRight, ArrowLeft, User, Building, FileText, Calendar } from "lucide-react";
import OnboardingPersonalInfo from "./OnboardingPersonalInfo";
import OnboardingBusinessProfile from "./OnboardingBusinessProfile";

const OnboardingContainer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      id: 0,
      title: "פרטים אישיים",
      description: "מידע בסיסי על איש הקשר",
      icon: User,
      component: OnboardingPersonalInfo
    },
    {
      id: 1,
      title: "פרופיל עסקי",
      description: "פרטי העסק והשירותים",
      icon: Building,
      component: OnboardingBusinessProfile
    },
    {
      id: 2,
      title: "מסמכים",
      description: "העלאת מסמכים נדרשים",
      icon: FileText,
      component: () => <div className="text-center p-8">העלאת מסמכים - בפיתוח</div>
    },
    {
      id: 3,
      title: "הגדרת יומן",
      description: "חיבור יומן זמינות",
      icon: Calendar,
      component: () => <div className="text-center p-8">הגדרת יומן - בפיתוח</div>
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex <= currentStep || completedSteps.includes(stepIndex - 1)) {
      setCurrentStep(stepIndex);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="onboarding-container min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* כותרת עליונה */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">הרשמה כספק שירותים</h1>
          <p className="text-gray-600">מלא את הפרטים הנדרשים להצטרפות לרשת תכל'ס</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">התקדמות הרשמה</span>
                <Badge variant="outline">{Math.round(progress)}% הושלם</Badge>
              </div>
              <Progress 
                value={progress} 
                className="h-2" 
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`התקדמות הרשמה: ${Math.round(progress)} אחוז הושלם`}
              />
            </div>
            
            {/* Steps Navigator */}
            <div className="grid grid-cols-4 gap-2 mt-6">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isCompleted = completedSteps.includes(index);
                const isCurrent = currentStep === index;
                const isAccessible = index <= currentStep || completedSteps.includes(index - 1);
                
                return (
                  <button
                    key={step.id}
                    onClick={() => goToStep(index)}
                    disabled={!isAccessible}
                    className={`p-3 rounded-lg border transition-all ${
                      isCurrent 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : isCompleted
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : isAccessible
                        ? 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    role="tab"
                    aria-selected={isCurrent}
                    aria-label={`שלב ${index + 1}: ${step.title}`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center justify-center">
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <StepIcon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-xs">{step.title}</div>
                        <div className="text-xs opacity-75">{step.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Step Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                {React.createElement(steps[currentStep].icon, { className: "h-6 w-6 text-blue-600" })}
              </div>
              <div>
                <h2 className="text-xl">{steps[currentStep].title}</h2>
                <p className="text-sm text-gray-600 font-normal">{steps[currentStep].description}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent />
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            שלב קודם
          </Button>
          
          <div className="flex gap-2">
            {currentStep === steps.length - 1 ? (
              <Button 
                onClick={() => console.log('Complete registration')}
                className="bg-green-600 hover:bg-green-700"
              >
                סיים הרשמה
              </Button>
            ) : (
              <Button onClick={nextStep} className="flex items-center gap-2">
                שלב הבא
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingContainer;
