
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import TermsAgreement from "@/components/terms/TermsAgreement";

interface OnboardingTermsProps {
  accepted: boolean;
  onUpdate: (accepted: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

const OnboardingTerms = ({ accepted, onUpdate, onNext, onBack }: OnboardingTermsProps) => {
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = () => {
    if (!accepted) {
      setError("יש לאשר את תנאי השימוש כדי להמשיך");
      toast.error("יש לאשר את תנאי השימוש כדי להמשיך");
      return;
    }
    
    toast.success("תנאי השימוש אושרו בהצלחה");
    onNext();
  };
  
  return (
    <div className="max-w-3xl mx-auto" dir="rtl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">אישור תנאי שימוש</h2>
        <p className="text-gray-600">אנא קרא ואשר את תנאי השימוש וההתקשרות במערכת</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">
            תנאי שימוש והסכם התקשרות
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <TermsAgreement 
              type="provider"
              accepted={accepted}
              onChange={onUpdate}
              error={error || undefined}
            />
          </div>
        </CardContent>
      </Card>

      {!accepted && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            יש לאשר את תנאי השימוש כדי להמשיך בתהליך ההרשמה
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          חזרה
        </Button>
        <Button onClick={handleSubmit} disabled={!accepted}>
          אישור והמשך
        </Button>
      </div>
    </div>
  );
};

export default OnboardingTerms;
