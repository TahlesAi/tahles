
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProductForm from "./product/ProductForm";
import ProductPreview from "./product/ProductPreview";
import BenefitsCard from "./product/BenefitsCard";
import TermsAgreement from "./product/TermsAgreement";

interface OnboardingStep3Props {
  data: any;
  onUpdate: (data: any) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const OnboardingStep3 = ({ data, onUpdate, onSubmit, onBack }: OnboardingStep3Props) => {
  const [productData, setProductData] = useState({
    title: data.title || "",
    duration: data.duration || 60,
    audience: data.audience || 350,
    ageRange: data.ageRange || "20-40",
    price: data.price || 120,
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleNumberChange = (name: string, value: number) => {
    setProductData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setProductData(prev => ({ ...prev, termsAccepted: checked }));
    if (!checked && errors.termsAccepted) {
      setErrors(prev => ({ ...prev, termsAccepted: "" }));
    }
  };
  
  const handleAgeRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData(prev => ({ ...prev, ageRange: e.target.value }));
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!productData.title.trim()) {
      newErrors.title = "נא להזין שם למוצר";
    }
    
    if (!productData.termsAccepted) {
      newErrors.termsAccepted = "יש לאשר את התנאים כדי להמשיך";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Check if user is authenticated
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        toast({
          title: "שגיאת הרשאה",
          description: "יש להתחבר למערכת לפני יצירת שירות חדש",
          variant: "destructive"
        });
        return;
      }
      
      // Create provider record
      const { data: providerData, error: providerError } = await supabase
        .from('providers')
        .insert({
          id: sessionData.session.user.id, // Use the auth user ID as the provider ID
          name: data.name || "ספק חדש",
          email: data.email,
          phone: data.phone,
          description: data.description
        })
        .select()
        .single();
      
      if (providerError) {
        console.error("Provider creation error:", providerError);
        toast({
          title: "שגיאה ביצירת ספק",
          description: providerError.message,
          variant: "destructive"
        });
        return;
      }
      
      // Create service record
      const { error: serviceError } = await supabase
        .from('services')
        .insert({
          name: productData.title,
          description: `מופע באורך ${productData.duration} דקות לקהל של עד ${productData.audience} אנשים בגילאי ${productData.ageRange}`,
          price_range: `₪${productData.price} לכרטיס`,
          duration: `${productData.duration} דקות`,
          provider_id: sessionData.session.user.id
        });
      
      if (serviceError) {
        console.error("Service creation error:", serviceError);
        toast({
          title: "שגיאה ביצירת שירות",
          description: serviceError.message,
          variant: "destructive"
        });
        return;
      }
      
      onUpdate(productData);
      toast({
        title: "הפעולה הושלמה בהצלחה",
        description: "השירות נוצר והוא מוכן לשימוש",
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
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">פתיחת עמוד מוצר</h2>
        <p className="text-gray-600">כמה פרטים בסיסים על המוצר בשביל מאגר יותר טוב להוסיף עוד פרטים</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <ProductForm 
            productData={productData}
            errors={errors}
            onTitleChange={handleChange}
            onNumberChange={handleNumberChange}
            onAgeRangeChange={handleAgeRangeChange}
          />
        </div>
        
        <div className="md:col-span-1">
          <ProductPreview />
          <BenefitsCard />
        </div>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <TermsAgreement 
          accepted={productData.termsAccepted}
          onChange={handleCheckboxChange}
          error={errors.termsAccepted}
        />
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
            חזרה
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "מעבד..." : "פרסום ויצירת עמוד מוצר"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep3;
