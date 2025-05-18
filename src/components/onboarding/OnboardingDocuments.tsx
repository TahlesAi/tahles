
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, FileCheck, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface OnboardingDocumentsProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const OnboardingDocuments = ({ data, onUpdate, onNext, onBack }: OnboardingDocumentsProps) => {
  const [formData, setFormData] = useState({
    idImage: data.idImage || "",
    businessLicense: data.businessLicense || "",
    insuranceDoc: data.insuranceDoc || "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({
        ...errors,
        [fieldName]: "גודל הקובץ עולה על 5MB המותרים"
      });
      return;
    }
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setErrors({
        ...errors,
        [fieldName]: "סוג הקובץ לא מורשה (יש להשתמש ב-JPG, PNG או PDF)"
      });
      return;
    }
    
    // Simulate file upload
    setUploading({...uploading, [fieldName]: true});
    
    // Clear previous error
    if (errors[fieldName]) {
      setErrors({...errors, [fieldName]: ""});
    }
    
    // Simulate upload delay
    setTimeout(() => {
      // Mock successful upload
      const mockUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        [fieldName]: mockUrl
      });
      setUploading({...uploading, [fieldName]: false});
      toast.success(`הקובץ ${file.name} הועלה בהצלחה`);
    }, 1500);
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.idImage) {
      newErrors.idImage = "נא להעלות צילום תעודת זהות / ח.פ";
    }
    
    if (!formData.businessLicense) {
      newErrors.businessLicense = "נא להעלות תעודת עוסק מורשה";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validate()) {
      onUpdate(formData);
      toast.success("המסמכים נשמרו בהצלחה");
      onNext();
    } else {
      toast.error("יש לתקן את השגיאות בטופס");
    }
  };
  
  const getDocumentStatus = (fieldName: string) => {
    if (uploading[fieldName]) {
      return (
        <div className="flex items-center text-amber-500">
          <Upload className="animate-pulse h-5 w-5 ml-1" />
          <span>מעלה...</span>
        </div>
      );
    }
    
    if (formData[fieldName]) {
      return (
        <div className="flex items-center text-green-600">
          <FileCheck className="h-5 w-5 ml-1" />
          <span>הועלה בהצלחה</span>
        </div>
      );
    }
    
    if (errors[fieldName]) {
      return (
        <div className="flex items-center text-red-500">
          <AlertCircle className="h-4 w-4 ml-1" />
          <span>{errors[fieldName]}</span>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="max-w-3xl mx-auto" dir="rtl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">העלאת מסמכים</h2>
        <p className="text-gray-600">נא להעלות את המסמכים הנדרשים לאימות חשבונך</p>
      </div>
      
      <div className="space-y-6">
        <Card className={`p-4 ${errors.idImage ? "border-red-300" : ""}`}>
          <CardContent className="p-0">
            <div className="mb-2">
              <Label htmlFor="idImage" className="font-medium text-base mb-1 block">צילום תעודת זהות / ח.פ <span className="text-red-500">*</span></Label>
              <p className="text-gray-500 text-sm mb-3">העלה צילום ברור של תעודת הזהות או תעודת החברה</p>
            </div>
            
            <div className="flex items-center">
              <Input
                id="idImage"
                type="file"
                onChange={(e) => handleFileChange(e, "idImage")}
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("idImage")?.click()}
                disabled={uploading.idImage}
                className="ml-3"
              >
                <Upload className="h-4 w-4 ml-2" />
                העלאת קובץ
              </Button>
              {getDocumentStatus("idImage")}
            </div>
          </CardContent>
        </Card>
        
        <Card className={`p-4 ${errors.businessLicense ? "border-red-300" : ""}`}>
          <CardContent className="p-0">
            <div className="mb-2">
              <Label htmlFor="businessLicense" className="font-medium text-base mb-1 block">תעודת עוסק מורשה / חברה <span className="text-red-500">*</span></Label>
              <p className="text-gray-500 text-sm mb-3">העלה צילום ברור של תעודת העוסק המורשה או תעודת החברה</p>
            </div>
            
            <div className="flex items-center">
              <Input
                id="businessLicense"
                type="file"
                onChange={(e) => handleFileChange(e, "businessLicense")}
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("businessLicense")?.click()}
                disabled={uploading.businessLicense}
                className="ml-3"
              >
                <Upload className="h-4 w-4 ml-2" />
                העלאת קובץ
              </Button>
              {getDocumentStatus("businessLicense")}
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-4">
          <CardContent className="p-0">
            <div className="mb-2">
              <Label htmlFor="insuranceDoc" className="font-medium text-base mb-1 block">מסמך ביטוח (אופציונלי)</Label>
              <p className="text-gray-500 text-sm mb-3">העלה מסמך ביטוח במידה ורלוונטי לעסק שלך</p>
            </div>
            
            <div className="flex items-center">
              <Input
                id="insuranceDoc"
                type="file"
                onChange={(e) => handleFileChange(e, "insuranceDoc")}
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("insuranceDoc")?.click()}
                disabled={uploading.insuranceDoc}
                className="ml-3"
              >
                <Upload className="h-4 w-4 ml-2" />
                העלאת קובץ
              </Button>
              {getDocumentStatus("insuranceDoc")}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>
            חזרה
          </Button>
          <Button onClick={handleSubmit}>
            המשך לשלב הבא
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingDocuments;
