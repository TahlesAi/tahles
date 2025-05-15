
import { Card, CardContent } from "@/components/ui/card";

const BenefitsCard = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="font-semibold">למה כדאי לפרסם את השירות שלכם בת'כל'ס?</h3>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">1</div>
            <div>
              <p className="font-medium">חשיפה לקהל רחב</p>
              <p className="text-sm text-gray-600">מאות לקוחות מחפשים שירותים כמו שלכם מדי יום</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">2</div>
            <div>
              <p className="font-medium">ניהול הזמנות קל</p>
              <p className="text-sm text-gray-600">מערכת ניהול פשוטה לכל ההזמנות והלקוחות שלכם</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">3</div>
            <div>
              <p className="font-medium">תשלומים מאובטחים</p>
              <p className="text-sm text-gray-600">קבלו תשלומים בצורה בטוחה ונוחה</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BenefitsCard;
