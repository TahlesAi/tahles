
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck, AlertCircle } from "lucide-react";

interface OnboardingTermsProps {
  accepted: boolean;
  onUpdate: (accepted: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

const OnboardingTerms = ({ accepted, onUpdate, onNext, onBack }: OnboardingTermsProps) => {
  const [error, setError] = useState<string | null>(null);
  
  const handleCheck = (checked: boolean) => {
    onUpdate(checked);
    if (checked && error) {
      setError(null);
    }
  };
  
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
          <CardTitle className="flex items-center text-xl">
            <ShieldCheck className="ml-2 h-5 w-5 text-brand-600" />
            תנאי שימוש והסכם התקשרות
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-700 max-h-80 overflow-y-auto border p-4 rounded-md mb-6" style={{ lineHeight: '1.6' }}>
            <h4 className="font-bold mb-2">1. תנאים כלליים</h4>
            <p className="mb-4">
              ברוכים הבאים לפלטפורמת תכלס. השימוש בפלטפורמה מהווה הסכמה לתנאי השימוש המפורטים להלן. אנא קרא אותם בעיון.
            </p>
            
            <h4 className="font-bold mb-2">2. הצהרת ספק</h4>
            <p className="mb-4">
              הספק מצהיר בזאת כי כל המידע המסופק על ידו הינו נכון, מדויק ומלא. הספק מאשר כי הוא בעל הזכויות בתכנים המועלים לפלטפורמה וכי אין בהם כדי להפר זכויות כלשהן של צד שלישי.
            </p>
            
            <h4 className="font-bold mb-2">3. מחירים ותשלומים</h4>
            <p className="mb-4">
              הספק מתחייב לספק את השירותים המוצעים במחירים המוצגים בפלטפורמה. תכלס תגבה עמלה בשיעור של 10% מכל עסקה שתתבצע דרך הפלטפורמה. התשלומים יועברו לספק בתנאי שוטף + 30 מיום ביצוע העסקה.
            </p>
            
            <h4 className="font-bold mb-2">4. מדיניות ביטולים</h4>
            <p className="mb-4">
              הספק מתחייב לכבד את מדיניות הביטולים של תכלס כמפורט להלן: ביטול עד 14 ימי עסקים לפני מועד האירוע - החזר כספי מלא למזמין. ביטול בין 7-14 ימי עסקים לפני מועד האירוע - החזר של 50% למזמין. ביטול פחות מ-7 ימי עסקים לפני מועד האירוע - ללא החזר כספי.
            </p>
            
            <h4 className="font-bold mb-2">5. אחריות הספק</h4>
            <p className="mb-4">
              הספק מתחייב לספק את השירותים ברמה מקצועית גבוהה ובהתאם לתיאור השירות בפלטפורמה. הספק יישא באחריות מלאה לנזקים שייגרמו כתוצאה מאספקת השירות.
            </p>
            
            <h4 className="font-bold mb-2">6. הגבלת אחריות</h4>
            <p className="mb-4">
              תכלס משמשת כפלטפורמה מקשרת בלבד ואינה אחראית לאיכות השירותים המסופקים על ידי הספקים. בכל מקרה, אחריותה של תכלס תוגבל לסכום העמלה שנגבתה בגין העסקה הרלוונטית.
            </p>
            
            <h4 className="font-bold mb-2">7. קניין רוחני</h4>
            <p className="mb-4">
              כל זכויות הקניין הרוחני בפלטפורמה, לרבות עיצוב האתר, קוד המחשב, סימני המסחר וכד', הינם רכושה הבלעדי של תכלס. הספק מקבל זכות שימוש מוגבלת בפלטפורמה לצורך הצעת שירותיו בלבד.
            </p>
            
            <h4 className="font-bold mb-2">8. סיום התקשרות</h4>
            <p className="mb-4">
              כל צד רשאי לסיים את ההתקשרות בהודעה מראש של 30 יום. במקרה של הפרת תנאי השימוש, תכלס רשאית לסיים את ההתקשרות באופן מיידי.
            </p>
            
            <h4 className="font-bold mb-2">9. דין וסמכות שיפוט</h4>
            <p className="mb-4">
              תנאי שימוש אלו יפורשו על פי דיני מדינת ישראל. סמכות השיפוט הבלעדית בכל עניין הנוגע לתנאי שימוש אלו תהיה לבתי המשפט המוסמכים במחוז תל אביב.
            </p>
            
            <h4 className="font-bold mb-2">10. שינויים בתנאי השימוש</h4>
            <p>
              תכלס רשאית לשנות את תנאי השימוש מעת לעת. במקרה של שינוי מהותי, תימסר על כך הודעה לספק. המשך השימוש בפלטפורמה לאחר פרסום השינויים מהווה הסכמה לתנאים החדשים.
            </p>
          </div>
          
          <div className="flex items-start space-x-4 space-x-reverse">
            <Checkbox 
              id="terms" 
              checked={accepted}
              onCheckedChange={(checked) => handleCheck(checked as boolean)}
              className="mt-1"
            />
            <div>
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                אני מאשר/ת כי קראתי את תנאי השימוש והסכם ההתקשרות ואני מסכים/ה להם
              </label>
              {error && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
              )}
            </div>
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
