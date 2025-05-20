
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

// Define a separate interface for the data object
interface DocumentsData {
  idImage: string;
  businessLicense: string;
  insuranceDoc: string;
}

interface OnboardingDocumentsProps {
  data: DocumentsData;
  onUpdate: (data: Partial<DocumentsData>) => void;
  onNext: () => void;
  onBack: () => void;
  adminMode?: boolean; // Support admin mode to skip validation
}

const DocumentUploader: React.FC<{
  id: string;
  title: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}> = ({ id, title, description, value, onChange, error }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real scenario, we'd upload the file to a server here
      // For this mock, we'll just use the file name as the value
      onChange(file.name);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!value ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-4">גרור קובץ לכאן או</p>
              <div>
                <Label
                  htmlFor={id}
                  className="bg-brand-600 hover:bg-brand-700 text-white rounded-md py-2 px-4 cursor-pointer transition-colors"
                >
                  בחר קובץ
                </Label>
                <input
                  id={id}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*, application/pdf"
                />
              </div>
              {error && (
                <p className="text-destructive text-sm mt-4">{error}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-medium">{value}</span>
            </div>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-destructive"
              onClick={() => onChange("")}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const OnboardingDocuments: React.FC<OnboardingDocumentsProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
  adminMode = false,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleDocumentChange = (field: string, value: string) => {
    onUpdate({ [field]: value });

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    // Skip validation in admin mode
    if (adminMode) return true;
    
    const newErrors: Record<string, string> = {};

    if (!data.idImage) {
      newErrors.idImage = "יש להעלות צילום תעודת זהות";
    }

    if (!data.businessLicense) {
      newErrors.businessLicense = "יש להעלות רישיון עסק או אישור ניהול ספרים";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      toast.success("המסמכים הועלו בהצלחה");
      onNext();
    } else {
      toast.error("יש להעלות את כל המסמכים הנדרשים");
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {adminMode && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <p className="font-medium">מצב מנהל מופעל</p>
          </div>
          <p>ניתן לדלג על העלאת מסמכים לצורך בדיקת התהליך</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DocumentUploader
          id="idImage"
          title="צילום תעודת זהות"
          description="העלה צילום ברור של תעודת הזהות שלך (כולל הספח)"
          value={data.idImage}
          onChange={(value) => handleDocumentChange("idImage", value)}
          error={errors.idImage}
        />

        <DocumentUploader
          id="businessLicense"
          title="רישיון עסק / אישור ניהול ספרים"
          description="העלה אישור ניהול ספרים או רישיון עסק בתוקף"
          value={data.businessLicense}
          onChange={(value) => handleDocumentChange("businessLicense", value)}
          error={errors.businessLicense}
        />

        <DocumentUploader
          id="insuranceDoc"
          title="ביטוח אחריות מקצועית (אופציונלי)"
          description="העלה אישור ביטוח אחריות מקצועית אם יש ברשותך"
          value={data.insuranceDoc}
          onChange={(value) => handleDocumentChange("insuranceDoc", value)}
        />
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          חזרה
        </Button>
        <Button type="button" onClick={handleSubmit}>
          המשך
        </Button>
      </div>
    </div>
  );
};

export default OnboardingDocuments;
