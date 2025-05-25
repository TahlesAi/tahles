
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProductForm from "./product/ProductForm";
import ProductPreview from "./product/ProductPreview";
import BenefitsCard from "./BenefitsCard"; 
import TermsAgreement from "./product/TermsAgreement";
import { AlertCircle, Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    targetAudience: []
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(services.length === 0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentService(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleNumberChange = (name: string, value: number) => {
    setCurrentService(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAgeRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentService(prev => ({ ...prev, ageRange: e.target.value }));
  };
  
  const validateService = () => {
    if (adminMode) return true;
    
    const newErrors: Record<string, string> = {};
    
    if (!currentService.title.trim()) {
      newErrors.title = "נא להזין שם למוצר";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddService = () => {
    if (!validateService()) return;
    
    if (editingIndex !== null) {
      // עריכת שירות קיים
      const updatedServices = [...services];
      updatedServices[editingIndex] = { ...currentService };
      setServices(updatedServices);
      setEditingIndex(null);
      toast({
        title: "השירות עודכן בהצלחה",
        description: `"${currentService.title}" עודכן`,
      });
    } else {
      // הוספת שירות חדש
      const newService = { ...currentService, id: Date.now().toString() };
      setServices(prev => [...prev, newService]);
      toast({
        title: "השירות נוסף בהצלחה",
        description: `"${currentService.title}" נוסף לרשימת השירותים`,
      });
    }
    
    // איפוס הטופס
    setCurrentService({
      title: "",
      duration: 60,
      audience: 350,
      ageRange: "20-40",
      price: 120,
      description: "",
      features: [],
      targetAudience: []
    });
    setIsFormVisible(false);
  };

  const handleEditService = (index: number) => {
    setCurrentService(services[index]);
    setEditingIndex(index);
    setIsFormVisible(true);
  };

  const handleDeleteService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
    toast({
      title: "השירות הוסר",
      description: "השירות הוסר מהרשימה",
    });
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
      
      // עדכון הנתונים
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

      {/* רשימת שירותים קיימים */}
      {services.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>השירותים שלך ({services.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {services.map((service, index) => (
                <div key={service.id || index} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{service.title}</h3>
                    <div className="text-sm text-gray-600 mt-1">
                      <span>משך: {service.duration} דקות</span>
                      <span className="mx-2">•</span>
                      <span>קהל: עד {service.audience} אנשים</span>
                      <span className="mx-2">•</span>
                      <span>מחיר: ₪{service.price}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditService(index)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteService(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* כפתור הוספת שירות */}
      {!isFormVisible && (
        <div className="text-center">
          <Button 
            onClick={() => setIsFormVisible(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {services.length === 0 ? "הוסף שירות ראשון" : "הוסף שירות נוסף"}
          </Button>
        </div>
      )}

      {/* טופס הוספת/עריכת שירות */}
      {isFormVisible && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingIndex !== null ? "עריכת שירות" : "הוספת שירות חדש"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ProductForm 
                  productData={currentService}
                  errors={errors}
                  onTitleChange={handleChange}
                  onNumberChange={handleNumberChange}
                  onAgeRangeChange={handleAgeRangeChange}
                />
              </div>
              
              <div>
                <ProductPreview productData={currentService} />
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsFormVisible(false);
                  setEditingIndex(null);
                  setCurrentService({
                    title: "",
                    duration: 60,
                    audience: 350,
                    ageRange: "20-40",
                    price: 120,
                    description: "",
                    features: [],
                    targetAudience: []
                  });
                }}
              >
                ביטול
              </Button>
              <Button onClick={handleAddService}>
                {editingIndex !== null ? "עדכן שירות" : "הוסף שירות"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* יתרונות המערכת */}
      {!isFormVisible && <BenefitsCard />}
      
      {/* אישור תנאים ומעבר */}
      {!isFormVisible && (
        <div className="border-t pt-6">
          <TermsAgreement 
            accepted={termsAccepted}
            onChange={setTermsAccepted}
            error={!adminMode && !termsAccepted ? "יש לאשר את התנאים כדי להמשיך" : undefined}
          />
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
              חזרה
            </Button>
            <Button onClick={handleNext} disabled={isSubmitting}>
              {isSubmitting ? "מעבד..." : "המשך למדיה"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingStep3;
