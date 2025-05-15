
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Headphones, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnboardingStep1 from "@/components/onboarding/OnboardingStep1";
import OnboardingStep2 from "@/components/onboarding/OnboardingStep2";
import OnboardingStep3 from "@/components/onboarding/OnboardingStep3";
import OnboardingSuccess from "@/components/onboarding/OnboardingSuccess";

const ProviderOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [providerData, setProviderData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    description: "",
    services: [],
    pricing: "",
    photos: []
  });
  
  const navigate = useNavigate();
  
  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const updateProviderData = (data: Partial<typeof providerData>) => {
    setProviderData(prev => ({ ...prev, ...data }));
  };
  
  const handleSubmit = () => {
    // Here we would submit the data to the backend
    console.log("Provider data submitted:", providerData);
    setCurrentStep(4); // Move to success step
  };
  
  const handleFinish = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container px-4">
          {/* Progress Header */}
          {currentStep < 4 && (
            <div className="mb-10">
              <h1 className="text-3xl font-bold mb-6 text-center">להציע שירותי קונספט והפקות בקלות עם ת'כל'ס</h1>
              
              <div className="flex justify-center items-center mb-10">
                <div className="flex items-center max-w-3xl w-full">
                  {/* Step 1 */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                      <Headphones className={`h-6 w-6 ${currentStep >= 1 ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <span className={`text-sm ${currentStep >= 1 ? 'text-primary font-medium' : 'text-gray-500'}`}>מספרים לנו על השירות שיש לכם להציע</span>
                  </div>
                  
                  <div className={`flex-grow h-1 mx-2 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
                  
                  {/* Step 2 */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                      <User className={`h-6 w-6 ${currentStep >= 2 ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <span className={`text-sm ${currentStep >= 2 ? 'text-primary font-medium' : 'text-gray-500'}`}>פרטים כלליים עליכם ועל השירות</span>
                  </div>
                  
                  <div className={`flex-grow h-1 mx-2 ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`} />
                  
                  {/* Step 3 */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                      <Check className={`h-6 w-6 ${currentStep >= 3 ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <span className={`text-sm ${currentStep >= 3 ? 'text-primary font-medium' : 'text-gray-500'}`}>מסיימים ומפרסמים את השירות בת'כל'ס</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Steps Content */}
          {currentStep === 1 && (
            <OnboardingStep1 
              data={providerData}
              onUpdate={updateProviderData}
              onNext={handleNextStep}
            />
          )}
          
          {currentStep === 2 && (
            <OnboardingStep2 
              data={providerData}
              onUpdate={updateProviderData}
              onNext={handleNextStep}
              onBack={handlePrevStep}
            />
          )}
          
          {currentStep === 3 && (
            <OnboardingStep3 
              data={providerData}
              onUpdate={updateProviderData}
              onSubmit={handleSubmit}
              onBack={handlePrevStep}
            />
          )}
          
          {currentStep === 4 && (
            <OnboardingSuccess onFinish={handleFinish} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderOnboarding;
