
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import ServiceForm from "./service/ServiceForm";
import ServiceList from "./service/ServiceList";
import ServiceActions from "./service/ServiceActions";
import ServiceStepFooter from "./service/ServiceStepFooter";

interface Service {
  id?: string;
  title: string;
  duration: number;
  audience: number;
  ageRange: string;
  price: number;
  description?: string;
  features?: string[];
  targetAudience?: string[];
  variants?: Array<{
    parameter: string;
    options: Array<{
      name: string;
      priceModifier: number;
      priceType: 'fixed' | 'percentage';
    }>;
  }>;
  additionalImages?: string[];
  mainImage?: string;
}

interface OnboardingStep3Props {
  data: any;
  onUpdate: (data: any) => void;
  onSubmit: () => void;
  onBack: () => void;
  adminMode?: boolean;
}

const OnboardingStep3 = ({ data, onUpdate, onSubmit, onBack, adminMode = false }: OnboardingStep3Props) => {
  const [services, setServices] = useState<Service[]>(data.services || []);
  const [currentService, setCurrentService] = useState<Service>({
    title: "",
    duration: 60,
    audience: 350,
    ageRange: "20-40",
    price: 120,
    description: "",
    features: [],
    targetAudience: [],
    variants: [],
    additionalImages: [],
    mainImage: ""
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(services.length === 0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showAddAnother, setShowAddAnother] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const validateService = () => {
    if (adminMode) return true;
    
    const newErrors: Record<string, string> = {};
    
    if (!currentService.title.trim()) {
      newErrors.title = "נא להזין שם למוצר";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetCurrentService = () => {
    setCurrentService({
      title: "",
      duration: 60,
      audience: 350,
      ageRange: "20-40",
      price: 120,
      description: "",
      features: [],
      targetAudience: [],
      variants: [],
      additionalImages: [],
      mainImage: ""
    });
  };

  const handleAddService = () => {
    if (!validateService()) return;
    
    if (editingIndex !== null) {
      const updatedServices = [...services];
      updatedServices[editingIndex] = { ...currentService };
      setServices(updatedServices);
      setEditingIndex(null);
      toast({
        title: "השירות עודכן בהצלחה",
        description: `"${currentService.title}" עודכן`,
      });
    } else {
      const newService = { ...currentService, id: Date.now().toString() };
      setServices(prev => [...prev, newService]);
      toast({
        title: "השירות נוסף בהצלחה",
        description: `"${currentService.title}" נוסף לרשימת השירותים`,
      });
    }
    
    resetCurrentService();
    setIsFormVisible(false);
    setShowAddAnother(true);
  };

  const handleEditService = (index: number) => {
    setCurrentService(services[index]);
    setEditingIndex(index);
    setIsFormVisible(true);
    setShowAddAnother(false);
  };

  const handleDeleteService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
    toast({
      title: "השירות הוסר",
      description: "השירות הוסר מהרשימה",
    });
    
    if (updatedServices.length === 0) {
      setShowAddAnother(false);
      setIsFormVisible(true);
    }
  };

  const handleAddAnotherService = () => {
    setIsFormVisible(true);
    setShowAddAnother(false);
    setEditingIndex(null);
    resetCurrentService();
  };

  const handleFinishAddingServices = () => {
    setShowAddAnother(false);
    setIsFormVisible(false);
  };

  const handleAddFirstService = () => {
    setIsFormVisible(true);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingIndex(null);
    if (services.length > 0) {
      setShowAddAnother(true);
    }
  };

  const handleNext = async () => {
    if (!adminMode && services.length === 0) {
      toast({
        title: "שגיאה",
        description: "יש להוסיף לפחות שירות אחד",
        variant: "destructive"
      });
      return;
    }

    if (!adminMode && !termsAccepted) {
      toast({
        title: "שגיאה",
        description: "יש לאשר את התנאים כדי להמשיך",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      onUpdate({ 
        ...data, 
        services,
        termsAccepted 
      });
      
      toast({
        title: "השירותים נשמרו בהצלחה",
        description: `נוספו ${services.length} שירותים`,
      });
      
      onSubmit();
      
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "שגיאה בשמירת הנתונים",
        description: "אירעה שגיאה, אנא נסה שוב מאוחר יותר",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6" dir="rtl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">פרטי השירותים</h2>
        <p className="text-gray-600">הוסף את השירותים והמוצרים שברצונך להציע</p>
      </div>
      
      {adminMode && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <p className="font-medium">מצב מנהל מופעל</p>
          </div>
          <p>ניתן לדלג על מילוי פרטי השירותים לצורך בדיקת התהליך</p>
        </div>
      )}

      <ServiceList
        services={services}
        onEditService={handleEditService}
        onDeleteService={handleDeleteService}
      />

      <ServiceActions
        showAddAnother={showAddAnother}
        servicesCount={services.length}
        onAddAnotherService={handleAddAnotherService}
        onFinishAddingServices={handleFinishAddingServices}
        onAddFirstService={handleAddFirstService}
      />

      {isFormVisible && (
        <ServiceForm
          currentService={currentService}
          editingIndex={editingIndex}
          errors={errors}
          onServiceChange={setCurrentService}
          onAddService={handleAddService}
          onCancel={handleCancelForm}
        />
      )}

      <ServiceStepFooter
        isFormVisible={isFormVisible}
        showAddAnother={showAddAnother}
        termsAccepted={termsAccepted}
        onTermsChange={setTermsAccepted}
        onBack={onBack}
        onNext={handleNext}
        isSubmitting={isSubmitting}
        adminMode={adminMode}
      />
    </div>
  );
};

export default OnboardingStep3;
