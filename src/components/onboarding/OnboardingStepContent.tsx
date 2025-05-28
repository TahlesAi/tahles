import React from "react";
import OnboardingStep1 from "./OnboardingStep1";
import OnboardingStep2 from "./OnboardingStep2";
import OnboardingStep3 from "./OnboardingStep3";
import OnboardingDocuments from "./OnboardingDocuments";
import OnboardingPersonalInfo from "./OnboardingPersonalInfo";
import OnboardingBusinessProfile from "./OnboardingBusinessProfile";
import OnboardingProviderProfile from "./OnboardingProviderProfile";
import OnboardingDigitalSignature from "./OnboardingDigitalSignature";
import OnboardingSuccess from "./OnboardingSuccess";

interface FormData {
  businessName: string;
  fullName: string;
  idNumber: string;
  businessType: string;
  email: string;
  phone: string;
  address: string;
  city: string;
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
  idImage: string;
  businessLicense: string;
  insuranceDoc: string;
  category: string;
  subcategory: string;
  artistName: string;
  artistDescription: string;
  artistExperience: string;
  coverImage: string;
  logo: string;
  gallery: string[];
  videos: string[];
  testimonials: Array<{
    id: string;
    text: string;
    author: string;
    rating: number;
    company?: string;
    position?: string;
  }>;
  clientRecommendations: Array<{
    id: string;
    clientName: string;
    company: string;
    position?: string;
    logoUrl?: string;
    recommendation: string;
  }>;
  mediaLinks: Array<{
    id: string;
    title: string;
    url: string;
    source: string;
    date?: string;
  }>;
  services: Array<{
    name: string;
    description: string;
    mainImage: string;
    price: number;
    priceUnit: string;
    targetAudience: string[];
    limitations: string;
    priceRange: string;
    availability: string;
    additionalImages: string[];
    variants: Array<{
      parameter: string;
      options: Array<{
        name: string;
        priceModifier: number;
        priceType: 'fixed' | 'percentage';
      }>;
    }>;
  }>;
  termsAccepted: boolean;
  digitalSignatureData: any;
  name: string;
  title: string;
  duration: number;
  audience: number;
  ageRange: string;
  price: number;
}

interface OnboardingStepContentProps {
  currentStep: number;
  formData: FormData;
  adminMode: boolean;
  onUpdate: (stepData: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  onFinish: () => void;
  onDigitalSignatureComplete: (signatureData: any) => void;
}

const OnboardingStepContent: React.FC<OnboardingStepContentProps> = ({
  currentStep,
  formData,
  adminMode,
  onUpdate,
  onNext,
  onBack,
  onSubmit,
  onFinish,
  onDigitalSignatureComplete
}) => {
  const stepComponents = {
    1: () => (
      <OnboardingPersonalInfo
        data={formData}
        onUpdate={onUpdate}
        onNext={onNext}
        adminMode={adminMode}
      />
    ),
    2: () => (
      <OnboardingDocuments
        data={formData}
        onUpdate={onUpdate}
        onNext={onNext}
        onBack={onBack}
        adminMode={adminMode}
      />
    ),
    3: () => (
      <OnboardingBusinessProfile
        data={formData}
        onUpdate={onUpdate}
        onNext={onNext}
        onBack={onBack}
        adminMode={adminMode}
      />
    ),
    4: () => (
      <OnboardingStep1 
        data={formData}
        onUpdate={onUpdate}
        onNext={onNext}
        adminMode={adminMode}
      />
    ),
    5: () => (
      <OnboardingStep2 
        data={formData}
        onUpdate={onUpdate}
        onNext={onNext}
        onBack={onBack}
        adminMode={adminMode}
      />
    ),
    6: () => (
      <OnboardingProviderProfile
        data={formData}
        onUpdate={onUpdate}
        onNext={onNext}
        onBack={onBack}
        adminMode={adminMode}
      />
    ),
    7: () => (
      <OnboardingStep3 
        data={formData}
        onUpdate={onUpdate}
        onSubmit={onNext}
        onBack={onBack}
        adminMode={adminMode}
      />
    ),
    8: () => (
      <OnboardingDigitalSignature
        onSignatureComplete={onDigitalSignatureComplete}
        onBack={onBack}
      />
    ),
    9: () => (
      <OnboardingSuccess 
        onFinish={onFinish}
      />
    )
  };

  const StepComponent = stepComponents[currentStep as keyof typeof stepComponents];
  
  return StepComponent ? <StepComponent /> : null;
};

export default OnboardingStepContent;
