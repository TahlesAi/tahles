import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnboardingStep1 from "@/components/onboarding/OnboardingStep1";
import OnboardingStep2 from "@/components/onboarding/OnboardingStep2";
import OnboardingStep3 from "@/components/onboarding/OnboardingStep3";
import OnboardingDocuments from "@/components/onboarding/OnboardingDocuments";
import OnboardingPersonalInfo from "@/components/onboarding/OnboardingPersonalInfo";
import OnboardingBusinessProfile from "@/components/onboarding/OnboardingBusinessProfile";
import OnboardingProviderProfile from "@/components/onboarding/OnboardingProviderProfile";
import OnboardingDigitalSignature from "@/components/onboarding/OnboardingDigitalSignature";
import OnboardingSuccess from "@/components/onboarding/OnboardingSuccess";
import { EventProvider } from "@/context/EventContext";
import { 
  CheckCircle, 
  ClipboardList, 
  User, 
  Layers,
  Layers3,
  FileCheck,
  PenTool,
  Building,
  Star
} from "lucide-react";

const ADMIN_MODE = true;

const steps = [
  {
    id: 1,
    title: "פרטים אישיים",
    description: "פרטי ספק וזהות",
    icon: <User className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "מסמכים",
    description: "העלאת מסמכים נדרשים",
    icon: <FileCheck className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "פרופיל עסקי",
    description: "תיאור העסק ותחומי התמחות",
    icon: <Building className="h-5 w-5" />,
  },
  {
    id: 4,
    title: "קטגוריה",
    description: "בחירת קטגוריה ראשית",
    icon: <Layers className="h-5 w-5" />,
  },
  {
    id: 5,
    title: "תת-קטגוריה",
    description: "בחירת תת-קטגוריה",
    icon: <Layers3 className="h-5 w-5" />,
  },
  {
    id: 6,
    title: "פרופיל תדמיתי",
    description: "תמונות, סרטונים והמלצות",
    icon: <Star className="h-5 w-5" />,
  },
  {
    id: 7,
    title: "פרטי שירותים",
    description: "הוספת שירותים ומוצרים",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    id: 8,
    title: "חתימה דיגיטלית",
    description: "חתימה על הסכם ספק",
    icon: <PenTool className="h-5 w-5" />,
  },
  {
    id: 9,
    title: "סיום",
    description: "אישור ופרסום",
    icon: <CheckCircle className="h-5 w-5" />,
  },
];

const ProviderOnboarding = () => {
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
    if (currentStep < steps.length) {
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
  
  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <OnboardingPersonalInfo
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            adminMode={ADMIN_MODE}
          />
        );
      case 2:
        return (
          <OnboardingDocuments
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
            adminMode={ADMIN_MODE}
          />
        );
      case 3:
        return (
          <OnboardingBusinessProfile
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
            adminMode={ADMIN_MODE}
          />
        );
      case 4:
        return (
          <OnboardingStep1 
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            adminMode={ADMIN_MODE}
          />
        );
      case 5:
        return (
          <OnboardingStep2 
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
            adminMode={ADMIN_MODE}
          />
        );
      case 6:
        return (
          <OnboardingProviderProfile
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
            adminMode={ADMIN_MODE}
          />
        );
      case 7:
        return (
          <OnboardingStep3 
            data={formData}
            onUpdate={updateFormData}
            onSubmit={handleNext}
            onBack={handleBack}
            adminMode={ADMIN_MODE}
          />
        );
      case 8:
        return (
          <OnboardingDigitalSignature
            onSignatureComplete={handleDigitalSignatureComplete}
            onBack={handleBack}
          />
        );
      case 9:
        return (
          <OnboardingSuccess 
            onFinish={() => navigate('/dashboard')}
          />
        );
      default:
        return null;
    }
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
                        } ${(ADMIN_MODE || step.id <= currentStep) ? "hover:bg-brand-700" : ""}`}
                        onClick={() => handleStepNavigation(step.id)}
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
                      onClick={() => handleStepNavigation(step.id)}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500 hidden md:block">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                {getStepContent()}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </EventProvider>
  );
};

export default ProviderOnboarding;
