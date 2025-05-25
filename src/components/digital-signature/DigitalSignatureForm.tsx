
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { FileText, Shield, CheckCircle } from "lucide-react";

interface DigitalSignatureFormProps {
  agreementType: "provider" | "customer";
  agreementContent: React.ReactNode;
  onSignatureComplete: (signatureData: any) => void;
}

const DigitalSignatureForm: React.FC<DigitalSignatureFormProps> = ({
  agreementType,
  agreementContent,
  onSignatureComplete
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    email: "",
    phone: "",
    address: ""
  });
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const requiredFields = agreementType === "provider" 
      ? ["fullName", "idNumber", "email", "phone", "address"]
      : ["fullName", "email", "phone"];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`יש למלא את השדה: ${getFieldLabel(field)}`);
        return false;
      }
    }

    if (!agreementAccepted) {
      toast.error("יש לאשר את תנאי ההסכם כדי להמשיך");
      return false;
    }

    if (agreementType === "provider" && !marketingConsent) {
      toast.error("יש לאשר קבלת תקשורת שיווקית כדי להמשיך");
      return false;
    }

    return true;
  };

  const getFieldLabel = (field: string) => {
    const labels: Record<string, string> = {
      fullName: "שם מלא",
      idNumber: "מספר תעודת זהות/ח.פ",
      email: "כתובת דוא\"ל",
      phone: "טלפון נייד",
      address: "כתובת מלאה"
    };
    return labels[field] || field;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // שמירת נתוני חתימה דיגיטלית
      const signatureData = {
        ...formData,
        agreementType,
        agreementAccepted,
        marketingConsent: agreementType === "provider" ? marketingConsent : undefined,
        signatureDate: new Date().toISOString(),
        ipAddress: "127.0.0.1", // In real implementation, get actual IP
        userAgent: navigator.userAgent
      };

      // סימולציה של שמירה במסד נתונים
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("ההסכם נחתם בהצלחה!", {
        description: "עותק של ההסכם החתום נשלח לכתובת הדוא\"ל שלך"
      });

      onSignatureComplete(signatureData);
    } catch (error) {
      toast.error("אירעה שגיאה בתהליך החתימה", {
        description: "אנא נסה שוב או פנה לתמיכה"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler functions that properly handle CheckedState
  const handleAgreementChange = (checked: boolean | "indeterminate") => {
    setAgreementAccepted(checked === true);
  };

  const handleMarketingChange = (checked: boolean | "indeterminate") => {
    setMarketingConsent(checked === true);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {agreementType === "provider" ? "הסכם ספק" : "תקנון לקוח"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {agreementContent}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            פרטים לחתימה דיגיטלית
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">שם מלא *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="הכנס שם מלא"
              />
            </div>

            {agreementType === "provider" && (
              <div>
                <Label htmlFor="idNumber">מספר תעודת זהות/ח.פ *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  placeholder="הכנס מספר זהות או ח.פ"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">כתובת דוא״ל *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="example@email.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">טלפון נייד *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="05X-XXXXXXX"
              />
            </div>

            {agreementType === "provider" && (
              <div className="md:col-span-2">
                <Label htmlFor="address">כתובת מלאה *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="רחוב, מספר בית, עיר, מיקוד"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 space-x-reverse">
              <Checkbox 
                id="agreement" 
                checked={agreementAccepted}
                onCheckedChange={handleAgreementChange}
              />
              <Label htmlFor="agreement" className="text-sm font-medium">
                אני מאשר/ת כי קראתי, הבנתי ומסכים/ה לכל תנאי {agreementType === "provider" ? "ההסכם" : "התקנון"} *
              </Label>
            </div>

            {agreementType === "provider" && (
              <div className="flex items-start space-x-3 space-x-reverse">
                <Checkbox 
                  id="marketing" 
                  checked={marketingConsent}
                  onCheckedChange={handleMarketingChange}
                />
                <Label htmlFor="marketing" className="text-sm font-medium">
                  אני מסכים/ה לקבל תקשורת שיווקית ועדכונים ממערכת תכלס *
                </Label>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">חתימה דיגיטלית מאובטחת</p>
                  <p>הפרטים שלך מוגנים ומוצפנים. החתימה הדיגיטלית תישמר במערכת עם תאריך, שעה וכתובת IP לצרכי אימות.</p>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? "מעבד חתימה..." : "חתום דיגיטלית והמשך"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalSignatureForm;
