
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload } from "lucide-react";

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
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "נא להזין שם מלא";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "נא להזין כתובת אימייל";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "נא להזין כתובת אימייל תקינה";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "נא להזין מספר טלפון";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "נא להזין תיאור שירות";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validate()) {
      onUpdate(formData);
      onNext();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">ספרו לנו כמה פרטים על השירות שאתם מציעים</h2>
        <p className="text-gray-600">המידע יעזור לנו להתאים את השירות שלכם ללקוחות המתאימים</p>
      </div>
      
      <Card className="p-6 mb-8">
        <div className="space-y-5">
          <div className="mb-4">
            <Label htmlFor="name" className="mb-1 block">שם מלא</Label>
            <Input 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="השם המלא שלך"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-destructive text-sm mt-1">{errors.name}</p>
            )}
          </div>
          
          <div className="mb-4">
            <Label htmlFor="email" className="mb-1 block">כתובת אימייל</Label>
            <Input 
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          <div className="mb-4">
            <Label htmlFor="phone" className="mb-1 block">טלפון</Label>
            <Input 
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="טלפון ליצירת קשר"
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-destructive text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          
          <div className="mb-4">
            <Label htmlFor="description" className="mb-1 block">תיאור השירות</Label>
            <Textarea 
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="תארו בקצרה את השירות שאתם מציעים..."
              rows={4}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-destructive text-sm mt-1">{errors.description}</p>
            )}
          </div>
          
          <div className="mb-4">
            <Label className="mb-2 block">העלו תמונות או סרטונים</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">גררו לכאן קבצים או לחצו להעלאת קבצים</p>
                <Button variant="outline" size="sm">
                  בחרו קבצים
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">ניתן להעלות תמונות בפורמט JPG, PNG או סרטונים בפורמט MP4 (עד 20MB לקובץ)</p>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="mr-2">
              אני מאשר/ת קבלת עדכונים ומבצעים מת'כל'ס במייל
            </Label>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          חזרה
        </Button>
        <Button onClick={handleNext}>
          המשך לשלב הבא
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep2;
