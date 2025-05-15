
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

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
      <h2 className="text-2xl font-semibold mb-6">השירות שלכם פורסם בהצלחה במערכת ת'כל'ס</h2>
      
      <Card className="p-8 mb-8">
        <div className="space-y-6">
          <p className="text-xl">
            פרטי השירות שלכם נשמרו בהצלחה ויופיעו במערכת ת'כל'ס.
          </p>
          
          <div className="flex flex-col items-center gap-3">
            <div className="h-0.5 w-16 bg-gray-200 mb-2"></div>
            <p className="text-gray-600">
              כעת תוכלו לגשת ללוח הבקרה כדי לעקוב אחרי ההזמנות שלכם,
              <br />
              לעדכן את פרטי השירות ולנהל את הלקוחות שלכם
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-green-700 mb-2">הצעדים הבאים:</h3>
            <ul className="text-green-700 text-right space-y-2">
              <li className="flex items-center justify-end gap-2">
                <span>הוסיפו עוד פרטים לפרופיל שלכם</span>
                <Check className="h-4 w-4" />
              </li>
              <li className="flex items-center justify-end gap-2">
                <span>העלו תמונות איכותיות של השירות שלכם</span>
                <Check className="h-4 w-4" />
              </li>
              <li className="flex items-center justify-end gap-2">
                <span>הוסיפו שירותים נוספים למבחר שלכם</span>
                <Check className="h-4 w-4" />
              </li>
              <li className="flex items-center justify-end gap-2">
                <span>עדכנו את לוח הזמינות שלכם</span>
                <Check className="h-4 w-4" />
              </li>
            </ul>
          </div>
        </div>
      </Card>
      
      <div className="flex flex-col items-center">
        <Button size="lg" onClick={onFinish} className="mb-4">
          כניסה ללוח הבקרה
        </Button>
        <p className="text-sm text-gray-500 mb-2">
          או
        </p>
        <Link to="/" className="text-primary hover:underline">
          חזרה לעמוד הבית
        </Link>
      </div>
    </div>
  );
};

export default OnboardingSuccess;
