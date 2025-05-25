
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const CustomerAgreement: React.FC = () => {
  const handleDownloadPDF = () => {
    const agreementText = `
      תקנון שימוש והתחייבות לקוח – מערכת ת'כל'ס

      1. הלקוח מאשר כי בחן את כלל השירותים והמוצרים טרם ההזמנה.

      2. ת'כל'ס משמשת כפלטפורמה לתיאום; כל אחריות על טיב השירות – על הספק בלבד.

      3. מדיניות ביטולים:
      - ביטול ב-24 שעות האחרונות: 100% מהסכום
      - 24–72 שעות: 75%
      - 72 שעות–7 ימים: 50%
      - 7–14 ימים: 25%
      - 14–21 ימים: 10%
      - מעל 21 ימים: ללא דמי ביטול, למעט 3% דמי טיפול

      4. תשלומים יבוצעו בכרטיס אשראי או העברה לפי הצעת המחיר.

      5. לקוח שלא ידרוש אישור ביטוח אחריות מקצועית מהספק – מוותר מראש על כל טענה כלפי קבוצת ת'כל'ס.

      6. לקוחות שיצטרפו למודל הקאשבק – ייהנו מ-3% קרדיט להזמנה הבאה (2026–2028), בכפוף לדירוג ספק תוך 48 שעות מהאירוע.
    `;
    
    const blob = new Blob([agreementText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "תקנון_לקוח_תכלס.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      <div className="text-lg font-bold mb-2">תקנון שימוש והתחייבות לקוח – מערכת ת'כל'ס</div>
      <div className="text-sm space-y-3 text-gray-700 max-h-80 overflow-y-auto border p-4 rounded-md">
        <div className="space-y-2">
          <p className="font-semibold">1. בדיקת שירותים</p>
          <p>הלקוח מאשר כי בחן את כלל השירותים והמוצרים טרם ההזמנה.</p>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold">2. אחריות</p>
          <p>ת'כל'ס משמשת כפלטפורמה לתיאום; כל אחריות על טיב השירות – על הספק בלבד.</p>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold">3. מדיניות ביטולים</p>
          <div className="pr-4">
            <p>• ביטול ב-24 שעות האחרונות: 100% מהסכום</p>
            <p>• 24–72 שעות: 75%</p>
            <p>• 72 שעות–7 ימים: 50%</p>
            <p>• 7–14 ימים: 25%</p>
            <p>• 14–21 ימים: 10%</p>
            <p>• מעל 21 ימים: ללא דמי ביטול, למעט 3% דמי טיפול</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold">4. תשלומים</p>
          <p>תשלומים יבוצעו בכרטיס אשראי או העברה לפי הצעת המחיר.</p>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold">5. ביטוח אחריות</p>
          <p>לקוח שלא ידרוש אישור ביטוח אחריות מקצועית מהספק – מוותר מראש על כל טענה כלפי קבוצת ת'כל'ס.</p>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold">6. קאשבק</p>
          <p>לקוחות שיצטרפו למודל הקאשבק – ייהנו מ-3% קרדיט להזמנה הבאה (2026–2028), בכפוף לדירוג ספק תוך 48 שעות מהאירוע.</p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button 
          variant="outline"
          size="sm"
          onClick={handleDownloadPDF}
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          הורד תקנון (PDF)
        </Button>
      </div>
    </div>
  );
};

export default CustomerAgreement;
