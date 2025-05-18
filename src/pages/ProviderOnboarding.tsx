
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnboardingStep1 from "@/components/onboarding/OnboardingStep1";
import OnboardingStep2 from "@/components/onboarding/OnboardingStep2";
import OnboardingStep3 from "@/components/onboarding/OnboardingStep3";
import OnboardingSuccess from "@/components/onboarding/OnboardingSuccess";
import OnboardingSubcategory from "@/components/onboarding/OnboardingSubcategory";
import OnboardingServiceType from "@/components/onboarding/OnboardingServiceType";
import { Button } from "@/components/ui/button";
import { EventProvider } from "@/context/EventContext";
import { 
  CheckCircle, 
  ClipboardList, 
  ImagePlus, 
  User, 
  ChevronRight, 
  ChevronLeft,
  Layers,
  Layers3
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "קטגוריה",
    description: "בחירת קטגוריה ראשית",
    icon: <Layers className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "תת-קטגוריה",
    description: "בחירת תת-קטגוריה",
    icon: <Layers3 className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "סוג שירות",
    description: "בחירת סוג שירות",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    id: 4,
    title: "פרטי ספק",
    description: "מידע בסיסי על העסק",
    icon: <User className="h-5 w-5" />,
  },
  {
    id: 5,
    title: "שירותים",
    description: "הוספת שירותים ומוצרים",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    id: 6,
    title: "מדיה",
    description: "תמונות וסרטונים",
    icon: <ImagePlus className="h-5 w-5" />,
  },
  {
    id: 7,
    title: "סיום",
    description: "אישור ופרסום",
    icon: <CheckCircle className="h-5 w-5" />,
  },
];

const ProviderOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1-3 - Hierarchy Selection
    category: "",
    subcategory: "",
    serviceType: "",
    
    // Step 4 - Provider Info
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    description: "",
    
    // Step 5 - Services
    services: [] as Array<{
      name: string;
      description: string;
      price: number;
      priceUnit: string;
      suitableFor: string[];
      audienceSize: string[];
    }>,
    
    // Step 6 - Media
    logo: "",
    coverImage: "",
    gallery: [] as string[],
    videos: [] as string[],

    // Additional fields
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
  
  const handleSubmit = () => {
    console.log("Form Submission:", formData);
    setCurrentStep(7); // Go to success step
  };
  
  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <OnboardingStep1 
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <OnboardingSubcategory 
            categoryId={formData.category}
            selectedSubcategory={formData.subcategory}
            onSelectSubcategory={(subcategoryId) => updateFormData({ subcategory: subcategoryId })}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <OnboardingServiceType 
            subcategoryId={formData.subcategory}
            selectedServiceType={formData.serviceType}
            onSelectServiceType={(serviceTypeId) => updateFormData({ serviceType: serviceTypeId })}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <div className="max-w-4xl mx-auto" dir="rtl">
            <h2 className="text-2xl font-bold mb-6">פרטי ספק</h2>
            <p className="text-gray-500 mb-8">
              שלב זה בפיתוח. יש להמשיך לשלב הבא.
            </p>
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                חזרה
              </Button>
              <Button onClick={handleNext}>
                המשך
              </Button>
            </div>
          </div>
        );
      case 5:
        return (
          <OnboardingStep2 
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <OnboardingStep3 
            data={formData}
            onUpdate={updateFormData}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      case 7:
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
              {/* Header */}
              <div className="mb-8 text-right" dir="rtl">
                <h1 className="text-2xl font-bold mb-2">
                  הצטרפות לת׳כל׳ס כספק שירות
                </h1>
                <p className="text-gray-600">
                  מלא את הפרטים הבאים כדי להצטרף כספק שירות ולהתחיל למכור באתר שלנו
                </p>
              </div>
              
              {/* Progress Steps */}
              <div className="flex mb-10 overflow-x-auto" dir="rtl">
                {steps.map((step) => (
                  <div 
                    key={step.id}
                    className="flex-1 min-w-0"
                  >
                    <div className="relative flex items-center">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          currentStep >= step.id 
                            ? "bg-brand-600 text-white" 
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step.id < 7 ? step.id : <CheckCircle className="h-4 w-4" />}
                      </div>
                      <div className={`h-1 flex-1 ${
                        currentStep > step.id ? "bg-brand-600" : "bg-gray-200"
                      }`}>
                        {step.id < steps.length && <div></div>}
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className={`font-medium text-xs ${
                        currentStep >= step.id ? "text-gray-900" : "text-gray-500"
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500 hidden md:block">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Step Content */}
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
