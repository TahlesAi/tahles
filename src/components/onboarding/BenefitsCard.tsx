
import { Card, CardContent } from "@/components/ui/card";
import { Check, Zap, Star, ShieldCheck, CalendarClock, Trophy, Users, Search, ReceiptText, Megaphone, BarChart, BadgePercent, GraduationCap, Award } from "lucide-react";

const BenefitsCard = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-5">
          <h3 className="font-semibold text-lg">למה כדאי לפרסם את השירות שלכם בת'כל'ס?</h3>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">חשיפה לקהל רחב</p>
              <p className="text-sm text-gray-600">מאות לקוחות מחפשים אמנים, הרצאות ושירותים כמו שלכם מדי יום. גישה למאגר לקוחות שמחפשים בדיוק את מה שאתם מציעים.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              <ReceiptText className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">ניהול הזמנות מהיר ופשוט</p>
              <p className="text-sm text-gray-600">מערכת ניהול בזמן אמת לכל ההזמנות והלקוחות שלכם. עדכוני סטטוס אוטומטיים והתראות על הזמנות חדשות.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">תשלומים מאובטחים</p>
              <p className="text-sm text-gray-600">קבלו תשלומים בצורה בטוחה, מהירה ונוחה עם מערכת סליקה מתקדמת ואבטחת מידע מלאה.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              <Star className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">פטור מדמי ניהול</p>
              <p className="text-sm text-gray-600">פטור מדמי ניהול למשך 5 שנים למצטרפים בתקופת ההרצה. חסכון משמעותי לעסק שלכם בטווח הארוך.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-accent1-500 rounded-full flex items-center justify-center text-white">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">בניית מוניטין ומיתוג</p>
              <p className="text-sm text-gray-600">בנו פרופיל מקצועי עם חוות דעת לקוחות שיסייעו לכם להרחיב את העסק. קידום אוטומטי בתוצאות החיפוש לספקים מובילים.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-accent1-500 rounded-full flex items-center justify-center text-white">
              <CalendarClock className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">חיבור ליומן ומניעת התנגשויות</p>
              <p className="text-sm text-gray-600">סנכרון היומן שלכם למערכת מבטיח שלא תקבלו הזמנות בזמנים שאתם לא פנויים. ניהול זמינות חכם ומותאם אישית.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-accent1-500 rounded-full flex items-center justify-center text-white">
              <Search className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">נראות דיגיטלית מקצועית</p>
              <p className="text-sm text-gray-600">דף נחיתה עם גלריה, וידאו ומידע מקיף שמשווק את השירותים שלכם בצורה מיטבית. מותאם למנועי חיפוש לקבלת חשיפה מירבית.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-accent1-500 rounded-full flex items-center justify-center text-white">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">גידול מהיר בהכנסות</p>
              <p className="text-sm text-gray-600">הרחבת מעגל הלקוחות, הזדמנויות חדשות והגדלת מספר האירועים המוזמנים. תוצאות מוכחות של גידול במכירות.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-accent1-500 rounded-full flex items-center justify-center text-white">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">קבלת לידים איכותיים</p>
              <p className="text-sm text-gray-600">מערכת התאמה חכמה המקשרת בין לקוחות פוטנציאליים לספקים המתאימים ביותר, מה שמבטיח לידים ממוקדים בדיוק לקהל היעד שלכם.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-accent1-500 rounded-full flex items-center justify-center text-white">
              <Megaphone className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">שיווק דיגיטלי משולב</p>
              <p className="text-sm text-gray-600">הופעה בקמפיינים שיווקיים וברשתות החברתיות של תכל'ס. חשיפה לקהל רחב ומגוון באמצעות פרסום ממוקד.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-accent1-500 rounded-full flex items-center justify-center text-white">
              <BarChart className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">נתונים ותובנות עסקיות</p>
              <p className="text-sm text-gray-600">גישה לדוחות וניתוחים מפורטים על ביצועי העסק. מעקב אחרי מגמות, העדפות לקוחות וזיהוי הזדמנויות צמיחה.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-accent1-500 rounded-full flex items-center justify-center text-white">
              <BadgePercent className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">הטבות ומבצעים לספקים</p>
              <p className="text-sm text-gray-600">גישה להטבות בלעדיות, הנחות על שירותים משלימים והשתתפות במבצעים ייעודיים לקהילת הספקים שלנו.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-accent1-500 rounded-full flex items-center justify-center text-white">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">הדרכה וליווי מקצועי</p>
              <p className="text-sm text-gray-600">תמיכה מלאה מצוות המומחים שלנו, סדנאות שיווק וחומרי הדרכה לשיפור ביצועי העסק ומקסום פוטנציאל ההכנסות.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-accent1-500 rounded-full flex items-center justify-center text-white">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">אמינות ויוקרה</p>
              <p className="text-sm text-gray-600">הנוכחות שלכם בפלטפורמה מעניקה תו איכות ואמינות בעיני לקוחות פוטנציאליים, ומגבירה את האמון בשירותים שלכם.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BenefitsCard;
