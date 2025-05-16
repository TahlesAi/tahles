
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnboardingStep1 from "@/components/onboarding/OnboardingStep1";
import OnboardingStep2 from "@/components/onboarding/OnboardingStep2";
import OnboardingStep3 from "@/components/onboarding/OnboardingStep3";
import OnboardingSuccess from "@/components/onboarding/OnboardingSuccess";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  ClipboardList, 
  ImagePlus, 
  User, 
  ChevronRight, 
  ChevronLeft 
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "פרטי ספק",
    description: "מידע בסיסי על העסק שלך",
    icon: <User className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "שירותים",
    description: "הוספת שירותים ומוצרים",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "מדיה וגלריה",
    description: "תמונות, סרטונים ומידע נוסף",
    icon: <ImagePlus className="h-5 w-5" />,
  },
  {
    id: 4,
    title: "סיום",
    description: "אישור ופרסום",
    icon: <CheckCircle className="h-5 w-5" />,
  },
];

const ProviderOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Provider Info
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    categories: [] as string[],
    description: "",
    
    // Step 2 - Services
    services: [] as Array<{
      name: string;
      description: string;
      price: number;
      priceUnit: string;
      categories: string[];
      suitableFor: string[];
    }>,
    
    // Step 3 - Media
    logo: "",
    coverImage: "",
    gallery: [] as string[],
    videos: [] as string[],

    // Additional fields for step 3
    category: "",
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, submit the data to API
    console.log("Form Submission:", formData);
    // Go to success step
    setCurrentStep(4);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">
                הצטרפות לת׳כל׳ס כספק שירות
              </h1>
              <p className="text-gray-600">
                מלא את הפרטים הבאים כדי להצטרף כספק שירות ולהתחיל למכור באתר שלנו
              </p>
            </div>
            
            {/* Progress Steps */}
            <div className="flex mb-10 overflow-x-auto">
              {steps.map((step) => (
                <div 
                  key={step.id}
                  className="flex-1 min-w-max"
                >
                  <div className="relative flex items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        currentStep >= step.id 
                          ? "bg-brand-600 text-white" 
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.id < 4 ? step.id : <CheckCircle className="h-4 w-4" />}
                    </div>
                    <div className={`h-1 flex-1 ${
                      currentStep > step.id ? "bg-brand-600" : "bg-gray-200"
                    }`}>
                      {step.id < steps.length && <div></div>}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className={`font-medium text-sm ${
                      currentStep >= step.id ? "text-gray-900" : "text-gray-500"
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Step Content */}
            {currentStep === 1 && (
              <OnboardingStep1 
                data={formData}
                onUpdate={updateFormData}
                onNext={handleNext}
              />
            )}
            
            {currentStep === 2 && (
              <OnboardingStep2 
                data={formData}
                onUpdate={updateFormData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            
            {currentStep === 3 && (
              <OnboardingStep3 
                data={formData}
                onUpdate={updateFormData}
                onSubmit={handleSubmit}
                onBack={handleBack}
              />
            )}
            
            {currentStep === 4 && (
              <OnboardingSuccess 
                onFinish={() => navigate('/dashboard')}
              />
            )}
            
            {/* Navigation Buttons */}
            {currentStep < 4 && currentStep > 1 && (
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <Button 
                    variant="outline" 
                    onClick={handleBack}
                    className="flex items-center gap-1"
                  >
                    <ChevronRight className="h-4 w-4" />
                    חזרה
                  </Button>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderOnboarding;
