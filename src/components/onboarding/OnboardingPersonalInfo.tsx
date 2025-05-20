
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Define a separate interface for the data object
interface PersonalInfoData {
  businessName: string;
  fullName: string;
  idNumber: string;
  businessType: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

interface OnboardingPersonalInfoProps {
  data: PersonalInfoData;
  onUpdate: (data: Partial<PersonalInfoData>) => void;
  onNext: () => void;
  adminMode?: boolean; // Opt-in for admin mode to skip validation
}

const OnboardingPersonalInfo: React.FC<OnboardingPersonalInfoProps> = ({
  data,
  onUpdate,
  onNext,
  adminMode = false,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    onUpdate({ [name]: value });

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    // Skip validation in admin mode
    if (adminMode) return true;
    
    const newErrors: Record<string, string> = {};

    if (!data.businessName.trim()) {
      newErrors.businessName = "שם העסק הוא שדה חובה";
    }

    if (!data.fullName.trim()) {
      newErrors.fullName = "שם מלא הוא שדה חובה";
    }

    if (!data.idNumber.trim()) {
      newErrors.idNumber = "מספר תעודת זהות/ח.פ. הוא שדה חובה";
    }

    if (!data.businessType) {
      newErrors.businessType = "סוג העסק הוא שדה חובה";
    }

    if (!data.email.trim()) {
      newErrors.email = "כתובת אימייל היא שדה חובה";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "יש להזין כתובת אימייל תקינה";
    }

    if (!data.phone.trim()) {
      newErrors.phone = "מספר טלפון הוא שדה חובה";
    } else if (!/^\d{9,10}$/.test(data.phone.replace(/[- ]/g, ""))) {
      newErrors.phone = "יש להזין מספר טלפון תקין";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      toast.success("פרטים אישיים נשמרו בהצלחה");
      onNext();
    } else {
      toast.error("יש למלא את כל שדות החובה");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      {adminMode && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4 text-sm">
          <p className="font-medium">מצב מנהל מופעל</p>
          <p>ניתן לדלג על שדות חובה לצורך בדיקת התהליך</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="businessName">
            שם העסק <span className="text-red-500">*</span>
          </Label>
          <Input
            id="businessName"
            name="businessName"
            value={data.businessName}
            onChange={handleChange}
            placeholder="הזן את שם העסק"
            className={errors.businessName ? "border-destructive" : ""}
          />
          {errors.businessName && (
            <p className="text-destructive text-sm">{errors.businessName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">
            שם איש קשר <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="הזן שם מלא"
            className={errors.fullName ? "border-destructive" : ""}
          />
          {errors.fullName && (
            <p className="text-destructive text-sm">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="idNumber">
            מספר תעודת זהות / ח.פ. <span className="text-red-500">*</span>
          </Label>
          <Input
            id="idNumber"
            name="idNumber"
            value={data.idNumber}
            onChange={handleChange}
            placeholder="הזן מספר תעודת זהות או ח.פ."
            className={errors.idNumber ? "border-destructive" : ""}
          />
          {errors.idNumber && (
            <p className="text-destructive text-sm">{errors.idNumber}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessType">
            סוג העסק <span className="text-red-500">*</span>
          </Label>
          <Select
            value={data.businessType}
            onValueChange={(value) => handleSelectChange("businessType", value)}
          >
            <SelectTrigger
              id="businessType"
              className={errors.businessType ? "border-destructive" : ""}
            >
              <SelectValue placeholder="בחר סוג עסק" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="self_employed">עוסק מורשה</SelectItem>
              <SelectItem value="company">חברה בע״מ</SelectItem>
              <SelectItem value="partnership">שותפות</SelectItem>
              <SelectItem value="non_profit">עמותה</SelectItem>
              <SelectItem value="other">אחר</SelectItem>
            </SelectContent>
          </Select>
          {errors.businessType && (
            <p className="text-destructive text-sm">{errors.businessType}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            אימייל <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            placeholder="הזן כתובת אימייל"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            טלפון <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="הזן מספר טלפון"
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-destructive text-sm">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">כתובת</Label>
          <Input
            id="address"
            name="address"
            value={data.address}
            onChange={handleChange}
            placeholder="הזן כתובת"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">עיר</Label>
          <Input
            id="city"
            name="city"
            value={data.city}
            onChange={handleChange}
            placeholder="הזן עיר"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">
          המשך
        </Button>
      </div>
    </form>
  );
};

export default OnboardingPersonalInfo;
