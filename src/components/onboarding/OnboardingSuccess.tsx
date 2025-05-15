
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface OnboardingSuccessProps {
  onFinish: () => void;
}

const OnboardingSuccess = ({ onFinish }: OnboardingSuccessProps) => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="h-12 w-12 text-primary" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">כל הכבוד!</h1>
      <h2 className="text-2xl font-semibold mb-6">קליק אחרון והשירות שלכם יפורסם במערכת ת'כל'ס</h2>
      
      <Card className="p-8 mb-8">
        <div className="space-y-6">
          <p className="text-xl">
            פרטי השירות שלכם עברו בהצלחה ויפורסמו במערכת ת'כל'ס
          </p>
          
          <div className="flex flex-col items-center gap-3">
            <div className="h-0.5 w-16 bg-gray-200 mb-2"></div>
            <p className="text-gray-600">
              כעת תוכלו לגשת למערכת הניהול כדי לעקוב אחרי ההזמנות שלכם,
              <br />
              לעדכן את פרטי השירות ולנהל את הלקוחות שלכם
            </p>
          </div>
        </div>
      </Card>
      
      <div className="flex flex-col items-center">
        <Button size="lg" onClick={onFinish} className="mb-4">
          כניסה למערכת הניהול
        </Button>
        <p className="text-sm text-gray-500">
          שאלות? צור קשר עם התמיכה שלנו ב- support@tachles.co.il
        </p>
      </div>
    </div>
  );
};

export default OnboardingSuccess;
