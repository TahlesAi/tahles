
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface OnboardingPersonalInfoProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

const OnboardingPersonalInfo = ({ data, onUpdate, onNext }: OnboardingPersonalInfoProps) => {
  const [formData, setFormData] = useState({
    fullName: data.fullName || "",
    businessName: data.businessName || "",
    businessType: data.businessType || "",
    idNumber: data.idNumber || "",
    email: data.email || "",
    phone: data.phone || "",
    address: data.address || "",
    city: data.city || "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user selects
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "נא להזין שם מלא";
    }
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = "נא להזין שם עסק";
    }
    
    if (!formData.businessType) {
      newErrors.businessType = "נא לבחור סוג עסק";
    }
    
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = "נא להזין מספר זהות / ח.פ";
    } else if (!/^\d{9}$/.test(formData.idNumber) && !/^\d{8,9}$/.test(formData.idNumber)) {
      newErrors.idNumber = "מספר זהות / ח.פ לא תקין";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "נא להזין כתובת אימייל";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "כתובת אימייל לא תקינה";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "נא להזין מספר טלפון";
    } else if (!/^05\d{8}$/.test(formData.phone) && !/^0\d{8,9}$/.test(formData.phone)) {
      newErrors.phone = "מספר טלפון לא תקין";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validate()) {
      onUpdate(formData);
      toast.success("פרטים אישיים נשמרו בהצלחה");
      onNext();
    } else {
      toast.error("יש לתקן את השגיאות בטופס");
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto" dir="rtl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">פרטי ספק השירות</h2>
        <p className="text-gray-600">נא למלא את הפרטים האישיים והעסקיים שלך</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullName" className="block mb-2">שם מלא</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="שם מלא"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>}
          </div>
          
          <div>
            <Label htmlFor="businessName" className="block mb-2">שם העסק</Label>
            <Input
              id="businessName"
              name="businessName"
              placeholder="שם העסק"
              value={formData.businessName}
              onChange={handleChange}
              className={errors.businessName ? "border-red-500" : ""}
            />
            {errors.businessName && <span className="text-red-500 text-sm mt-1">{errors.businessName}</span>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="businessType" className="block mb-2">סוג העסק</Label>
            <Select 
              value={formData.businessType} 
              onValueChange={(value) => handleSelectChange(value, "businessType")}
            >
              <SelectTrigger className={errors.businessType ? "border-red-500" : ""}>
                <SelectValue placeholder="בחר סוג עסק" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="עוסק מורשה">עוסק מורשה</SelectItem>
                <SelectItem value="עוסק פטור">עוסק פטור</SelectItem>
                <SelectItem value="חברה בע״מ">חברה בע״מ</SelectItem>
                <SelectItem value="שותפות">שותפות</SelectItem>
                <SelectItem value="עמותה">עמותה</SelectItem>
                <SelectItem value="אחר">אחר</SelectItem>
              </SelectContent>
            </Select>
            {errors.businessType && <span className="text-red-500 text-sm mt-1">{errors.businessType}</span>}
          </div>
          
          <div>
            <Label htmlFor="idNumber" className="block mb-2">מספר זהות / ח.פ</Label>
            <Input
              id="idNumber"
              name="idNumber"
              placeholder="מספר זהות או ח.פ"
              value={formData.idNumber}
              onChange={handleChange}
              className={errors.idNumber ? "border-red-500" : ""}
            />
            {errors.idNumber && <span className="text-red-500 text-sm mt-1">{errors.idNumber}</span>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="email" className="block mb-2">דוא״ל</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="דואר אלקטרוני"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
          </div>
          
          <div>
            <Label htmlFor="phone" className="block mb-2">טלפון</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="מספר טלפון"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="address" className="block mb-2">כתובת</Label>
            <Input
              id="address"
              name="address"
              placeholder="כתובת מלאה"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="city" className="block mb-2">עיר</Label>
            <Input
              id="city"
              name="city"
              placeholder="עיר"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button onClick={handleSubmit}>
            המשך לשלב הבא
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPersonalInfo;
