import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnboardingStepIndicator from "./OnboardingStepIndicator";
import OnboardingStepContent from "./OnboardingStepContent";
import OnboardingChatbot from "./OnboardingChatbot";
import OnboardingProgressTracker from "./OnboardingProgressTracker";
import { EventProvider } from "@/context/EventContext";

const ADMIN_MODE = true;
const TOTAL_STEPS = 9;

const OnboardingContainer = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    fullName: "",
    idNumber: "",
    businessType: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    
    businessDescription: "",
    experience: "",
    serviceAreas: [] as string[],
    specialties: [] as string[],
    targetAudience: [] as string[],
    website: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      linkedin: ""
    },
    
    idImage: "",
    businessLicense: "",
    insuranceDoc: "",
    
    category: "",
    subcategory: "",
    
    // Provider Profile fields (מידה תדמיתי)
    artistName: "",
    artistDescription: "",
    artistExperience: "",
    coverImage: "",
    logo: "",
    gallery: [] as string[],
    videos: [] as string[],
    testimonials: [] as Array<{
      id: string;
      text: string;
      author: string;
      rating: number;
      company?: string;
      position?: string;
    }>,
    clientRecommendations: [] as Array<{
      id: string;
      clientName: string;
      company: string;
      position?: string;
      logoUrl?: string;
      recommendation: string;
    }>,
    mediaLinks: [] as Array<{
      id: string;
      title: string;
      url: string;
      source: string;
      date?: string;
    }>,
    
    services: [] as Array<{
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
    }>,
    
    termsAccepted: false,
    digitalSignatureData: null as any,
    
    name: "",
    title: "",
    duration: 60,
    audience: 350,
    ageRange: "20-40",
    price: 120,
  });
  
  const updateFormData = (stepData: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };
  
  const handleNext = () => {
    if (currentStep < 9) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleStepNavigation = (stepId: number) => {
    if (ADMIN_MODE || stepId <= currentStep) {
      setCurrentStep(stepId);
      window.scrollTo(0, 0);
    }
  };

  const handleDigitalSignatureComplete = (signatureData: any) => {
    updateFormData({ 
      digitalSignatureData: signatureData,
      termsAccepted: true 
    });
    handleNext();
  };
  
  const handleSubmit = () => {
    console.log("Form Submission:", formData);
    setCurrentStep(9);
  };
  
  return (
    <EventProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50">
          <div className="container px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 text-right" dir="rtl">
                <h1 className="text-2xl font-bold mb-2">
                  הצטרפות לתכלס כספק שירות
                </h1>
                <p className="text-gray-600">
                  מלא את הפרטים הבאים כדי להצטרף כספק שירות ולהתחיל למכור באתר שלנו
                </p>
                {ADMIN_MODE && (
                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <strong>מצב בדיקה מופעל:</strong> ניתן לדלג על שדות חובה למטרות בדיקה בלבד
                  </div>
                )}
              </div>
              
              {/* מעקב התקדמות */}
              <OnboardingProgressTracker
                currentStep={currentStep}
                formData={formData}
                totalSteps={TOTAL_STEPS}
              />
              
              <OnboardingStepIndicator
                currentStep={currentStep}
                adminMode={ADMIN_MODE}
                onStepNavigation={handleStepNavigation}
              />
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <OnboardingStepContent
                  currentStep={currentStep}
                  formData={formData}
                  adminMode={ADMIN_MODE}
                  onUpdate={updateFormData}
                  onNext={handleNext}
                  onBack={handleBack}
                  onSubmit={handleSubmit}
                  onFinish={() => navigate('/dashboard')}
                  onDigitalSignatureComplete={handleDigitalSignatureComplete}
                />
              </div>
            </div>
          </div>
        </main>
        
        {/* בוט הצ'אט לעזרה */}
        <OnboardingChatbot currentStep={currentStep} formData={formData} />
        
        <Footer />
      </div>
    </EventProvider>
  );
};

export default OnboardingContainer;
