
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, FileCheck, Shield } from "lucide-react";
import DigitalSignatureForm from "../digital-signature/DigitalSignatureForm";
import ProviderAgreement from "../terms/ProviderAgreement";
import { toast } from "sonner";

interface OnboardingDigitalSignatureProps {
  onSignatureComplete: (signatureData: any) => void;
  onBack: () => void;
}

const OnboardingDigitalSignature: React.FC<OnboardingDigitalSignatureProps> = ({
  onSignatureComplete,
  onBack
}) => {
  const [currentStep, setCurrentStep] = useState<"overview" | "signature">("overview");

  const handleStartSignature = () => {
    setCurrentStep("signature");
  };

  const handleSignatureComplete = (signatureData: any) => {
    // שמירת נתוני החתימה
    console.log("Signature completed:", signatureData);
    
    toast.success("החתימה הדיגיטלית הושלמה בהצלחה!", {
      description: "עותק של ההסכם החתום נשלח לדוא\"ל שלך"
    });
    
    onSignatureComplete(signatureData);
  };

  if (currentStep === "signature") {
    return (
      <div className="space-y-6" dir="rtl">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">חתימה דיגיטלית על הסכם הספק</h2>
          <p className="text-gray-600">השלם את הפרטים הנדרשים וחתום דיגיטלית על ההסכם</p>
        </div>
        
        <DigitalSignatureForm
          agreementType="provider"
          agreementContent={<ProviderAgreement />}
          onSignatureComplete={handleSignatureComplete}
        />
        
        <div className="flex justify-start">
          <Button variant="outline" onClick={() => setCurrentStep("overview")}>
            חזרה
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">חתימה על הסכם ספק</h2>
        <p className="text-gray-600">שלב אחרון לפני פרסום הפרופיל שלך באתר</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          כדי להשלים את ההרשמה ולהפעיל את חשבון הספק שלך, יש לחתום דיגיטלית על הסכם הספק.
          החתימה מאובטחת ומוצפנת, והעתק של ההסכם החתום יישלח לדוא"ל שלך.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-green-600" />
              הסכם מאובטח
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              ההסכם כולל את כל התנאים וההגנות הנדרשות לפעילות בטוחה ומקצועית במערכת.
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              חתימה דיגיטלית
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              החתימה הדיגיטלית מוצפנת ומאוחסנת בבטחה, עם תיעוד מלא של זמן וכתובת IP.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-purple-600" />
              עותק אוטומטי
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              לאחר החתימה, עותק של ההסכם החתום יישלח אוטומטית לכתובת הדוא"ל שלך.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>תכולת ההסכם</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">זכויות וחובות הספק:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• תנאי התשלום והעברת כספים</li>
                <li>• מדיניות קנסות וביטולים</li>
                <li>• אחריות על איכות השירות</li>
                <li>• עמידה בזמנים ובהתחייבויות</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">הגנות ואבטחה:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• הגנה על קניין רוחני</li>
                <li>• מדיניות מחירים</li>
                <li>• תנאי אחריות וביטוח</li>
                <li>• זכויות שימוש במערכת</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          חזרה
        </Button>
        <Button onClick={handleStartSignature} size="lg">
          התחל חתימה דיגיטלית
        </Button>
      </div>
    </div>
  );
};

export default OnboardingDigitalSignature;
