
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import CategorySelector from "./CategorySelector";

interface OnboardingStep2Props {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const OnboardingStep2 = ({ data, onUpdate, onNext, onBack }: OnboardingStep2Props) => {
  const [formData, setFormData] = useState({
    name: data.name || "",
    email: data.email || "",
    phone: data.phone || "",
    description: data.description || "",
    selectedSubcategories: data.selectedSubcategories || [],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleSubcategoryChange = (selectedSubcategories: string[]) => {
    setFormData(prev => ({ ...prev, selectedSubcategories }));
    
    // Clear error if user has selected subcategories
    if (errors.selectedSubcategories && selectedSubcategories.length > 0) {
      setErrors(prev => ({ ...prev, selectedSubcategories: "" }));
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "נא להזין שם לעסק";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "נא להזין מספר טלפון";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "נא להזין תיאור עסק";
    }
    
    if (formData.selectedSubcategories.length === 0) {
      newErrors.selectedSubcategories = "נא לבחור לפחות קטגוריה אחת";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (!validate()) {
      return;
    }
    
    onUpdate(formData);
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">פרטי ספק השירות</h2>
        <p className="text-gray-600">מידע אודות העסק שלכם והשירותים שאתם מציעים</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="block mb-2">שם העסק / שם האמן</Label>
            <Input
              id="name"
              name="name"
              placeholder="הזן את שם העסק או שם האמן"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
          </div>
          
          <div>
            <Label htmlFor="phone" className="block mb-2">מספר טלפון</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="מספר טלפון ליצירת קשר"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
          </div>
        </div>
        
        <div>
          <Label htmlFor="email" className="block mb-2">אימייל</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="כתובת אימייל עסקית"
            value={formData.email}
            onChange={handleChange}
            disabled={!!data.email} // Disable if email is already set from auth
          />
        </div>
        
        <div>
          <Label htmlFor="description" className="block mb-2">תיאור העסק / השירות</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="ספרו על העסק שלכם והשירותים שאתם מציעים"
            value={formData.description}
            onChange={handleChange}
            className={`min-h-[120px] ${errors.description ? "border-red-500" : ""}`}
          />
          {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description}</span>}
        </div>
        
        <div>
          <CategorySelector
            selectedSubcategories={formData.selectedSubcategories}
            onSelectionChange={handleSubcategoryChange}
          />
          {errors.selectedSubcategories && <span className="text-red-500 text-sm block mt-1">{errors.selectedSubcategories}</span>}
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            חזרה
          </Button>
          <Button onClick={handleSubmit}>
            המשך
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep2;
