
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import OnboardingPersonalInfo from "./OnboardingPersonalInfo";
import OnboardingBusinessProfile from "./OnboardingBusinessProfile";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

interface PersonalInfoData {
  businessName: string;
  fullName: string;
  idNumber: string;
  businessType: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  businessLicense: string;
  insurance: string;
}

interface BusinessProfileData {
  businessDescription: string;
  experience: string;
  serviceAreas: string[];
  specialties: string[];
  targetAudience: string[];
  website: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  mediaLinks: Array<{
    id: string;
    title: string;
    url: string;
    source: string;
    date: string;
  }>;
  clientRecommendations: Array<{
    id: string;
    clientName: string;
    company: string;
    position: string;
    logoUrl: string;
    recommendation: string;
  }>;
}

const OnboardingContainer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    personalInfo: PersonalInfoData;
    businessProfile: BusinessProfileData;
  }>({
    personalInfo: {
      businessName: '',
      fullName: '',
      idNumber: '',
      businessType: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      businessLicense: '',
      insurance: ''
    },
    businessProfile: {
      businessDescription: '',
      experience: '',
      serviceAreas: [],
      specialties: [],
      targetAudience: [],
      website: '',
      socialLinks: {
        facebook: '',
        instagram: '',
        linkedin: ''
      },
      mediaLinks: [],
      clientRecommendations: []
    }
  });

  const steps = [
    { id: 1, title: 'פרטים אישיים' },
    { id: 2, title: 'פרופיל עסקי' }
  ];

  const currentStepData = steps.find(step => step.id === currentStep);
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

  const updatePersonalInfo = (stepData: PersonalInfoData) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: stepData
    }));
  };

  const updateBusinessProfile = (stepData: BusinessProfileData) => {
    setFormData(prev => ({
      ...prev,
      businessProfile: stepData
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
            {currentStep === 1 && (
              <OnboardingPersonalInfo 
                data={formData.personalInfo}
                onUpdate={updatePersonalInfo}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <OnboardingBusinessProfile 
                data={formData.businessProfile}
                onUpdate={updateBusinessProfile}
                onNext={handleNext}
                onBack={handleBack}
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
