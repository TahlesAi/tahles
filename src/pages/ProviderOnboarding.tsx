
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Headphones, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnboardingStep1 from "@/components/onboarding/OnboardingStep1";
import OnboardingStep2 from "@/components/onboarding/OnboardingStep2";
import OnboardingStep3 from "@/components/onboarding/OnboardingStep3";
import OnboardingSuccess from "@/components/onboarding/OnboardingSuccess";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const isLoggedIn = !!data.session;
        
        setIsAuthenticated(isLoggedIn);
        
        if (!isLoggedIn) {
          toast({
            title: "התחברות נדרשת",
            description: "עליך להתחבר או להירשם כדי להציע שירותים באתר",
            variant: "destructive"
          });
          navigate("/"); // Redirect to home page or login page
        }
        
        // If user is authenticated, check if they already have a provider profile
        if (isLoggedIn) {
          const { data: providerData } = await supabase
            .from('providers')
            .select('*')
            .eq('id', data.session?.user.id)
            .maybeSingle();
            
          if (providerData) {
            // User already has a provider profile
            toast({
              title: "פרופיל ספק קיים",
              description: "כבר יש לך פרופיל ספק במערכת, מעביר אותך ללוח הבקרה",
            });
            navigate("/dashboard");
          }
          
          // Pre-fill email from user account
          if (data.session?.user.email) {
            setProviderData(prev => ({ 
              ...prev, 
              email: data.session?.user.email || "" 
            }));
          }
        }
      } catch (error) {
        console.error("Authentication check error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);
  
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
    // Form submission is now handled in OnboardingStep3
    setCurrentStep(4); // Move to success step
  };
  
  const handleFinish = () => {
    navigate("/dashboard");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">טוען...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

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
