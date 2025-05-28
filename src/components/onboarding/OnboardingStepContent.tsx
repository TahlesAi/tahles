
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
  switch (currentStep) {
    case 1:
      return (
        <OnboardingPersonalInfo
          data={formData}
          onUpdate={onUpdate}
          onNext={onNext}
          adminMode={adminMode}
        />
      );
    case 2:
      return (
        <OnboardingDocuments
          data={formData}
          onUpdate={onUpdate}
          onNext={onNext}
          onBack={onBack}
          adminMode={adminMode}
        />
      );
    case 3:
      return (
        <OnboardingBusinessProfile
          data={formData}
          onUpdate={onUpdate}
          onNext={onNext}
          onBack={onBack}
          adminMode={adminMode}
        />
      );
    case 4:
      return (
        <OnboardingStep1 
          data={formData}
          onUpdate={onUpdate}
          onNext={onNext}
          adminMode={adminMode}
        />
      );
    case 5:
      return (
        <OnboardingStep2 
          data={formData}
          onUpdate={onUpdate}
          onNext={onNext}
          onBack={onBack}
          adminMode={adminMode}
        />
      );
    case 6:
      return (
        <OnboardingProviderProfile
          data={formData}
          onUpdate={onUpdate}
          onNext={onNext}
          onBack={onBack}
          adminMode={adminMode}
        />
      );
    case 7:
      return (
        <OnboardingStep3 
          data={formData}
          onUpdate={onUpdate}
          onSubmit={onNext}
          onBack={onBack}
          adminMode={adminMode}
        />
      );
    case 8:
      return (
        <OnboardingDigitalSignature
          onSignatureComplete={onDigitalSignatureComplete}
          onBack={onBack}
        />
      );
    case 9:
      return (
        <OnboardingSuccess 
          onFinish={onFinish}
        />
      );
    default:
      return null;
  }
};

export default OnboardingStepContent;
