
import { Card, CardContent } from "@/components/ui/card";
import { Check, Zap } from "lucide-react";

const BenefitsCard = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-5">
          <h3 className="font-semibold text-lg">למה כדאי לפרסם את השירות שלכם בת'כל'ס?</h3>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">חשיפה לקהל רחב</p>
              <p className="text-sm text-gray-600">מאות לקוחות מחפשים אמנים, הרצאות ושירותים כמו שלכם מדי יום</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">ניהול הזמנות מהיר ופשוט</p>
              <p className="text-sm text-gray-600">מערכת ניהול בזמן אמת לכל ההזמנות והלקוחות שלכם</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">תשלומים מאובטחים</p>
              <p className="text-sm text-gray-600">קבלו תשלומים בצורה בטוחה, מהירה ונוחה</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">פטור מדמי ניהול</p>
              <p className="text-sm text-gray-600">פטור מדמי ניהול למשך 5 שנים למצטרפים בתקופת ההרצה</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-accent1-500 rounded-full flex items-center justify-center text-white">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">בניית מוניטין ומיתוג</p>
              <p className="text-sm text-gray-600">בנו פרופיל מקצועי עם חוות דעת לקוחות שיסייעו לכם להרחיב את העסק</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-accent1-500 rounded-full flex items-center justify-center text-white">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">חיבור ליומן ומניעת התנגשויות</p>
              <p className="text-sm text-gray-600">סנכרון היומן שלכם למערכת מבטיח שלא תקבלו הזמנות בזמנים שאתם לא פנויים</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-accent1-500 rounded-full flex items-center justify-center text-white">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">נראות דיגיטלית מקצועית</p>
              <p className="text-sm text-gray-600">דף נחיתה עם גלריה, וידאו ומידע מקיף שמשווק את השירותים שלכם בצורה מיטבית</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BenefitsCard;
