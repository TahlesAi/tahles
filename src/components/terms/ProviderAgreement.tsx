
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const ProviderAgreement: React.FC = () => {
  const handleDownloadPDF = () => {
    const agreementText = `
      הסכם הצטרפות ספק – מערכת ת'כל'ס

      1. הספק מאשר כי העלה אישור ניהול ספרים, ניכוי במקור, ותעודה מזהה תקפים.

      2. המערכת תתריע 7 ימים לפני פקיעת מסמכים; הספק מתחייב לעדכן אותם במועד.

      3. תשלומים יבוצעו בהתאם להסכמות (שוטף+30 / מזומן לאחר שירות בתוספת 5%).

      4. ניכוי מס במקור, דמי ניהול (למעט פטור ל-1000 הראשונים), ועמלת סליקה ינוכו אוטומטית.

      5. ת'כל'ס איננה אחראית לשירותי הספק – כל טענה/פיצוי/ביטוח על אחריותו הבלעדית.

      6. הספק מתחייב כי אין להציג מחירים זולים יותר לגורם אחר – הפרה תגרור קנס מוסכם של 5,000 ש"ח.

      7. ביטול הזמנה מצד הספק יגרור קנסות:
      - מעל 21 ימים: 200 ₪
      - בין 7–21 ימים: 500 ₪
      - בין 48 שעות–7 ימים: 1000 ₪
      - פחות מ-48 שעות: חובה לספק חלופה או לשפות את ת'כל'ס במלוא הסכום.

      8. הספק מתחייב לעמוד בהזמנות שנקלטו ביומנו ולעדכנו בזמן אמת.

      9. כל שימוש במדיה/חומרים במערכת תעשה על פי רישיון חוקי בלבד.

      10. לספק אין זכויות במערכת, קוד, עיצוב, או קניין רוחני – לא בהווה ולא בעתיד.

      11. הספק מחויב לספק שירות ראוי ומקצועי, ולהתמודד עם כל תלונה של לקוח באופן ישיר.
    `;
    
    const blob = new Blob([agreementText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "הסכם_ספק_תכלס.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      <div className="text-lg font-bold mb-2">הסכם הצטרפות ספק – מערכת ת'כל'ס</div>
      <div className="text-sm space-y-3 text-gray-700 max-h-80 overflow-y-auto border p-4 rounded-md">
        <div className="space-y-2">
          <p className="font-semibold">1. אישור מסמכים</p>
          <p>הספק מאשר כי העלה אישור ניהול ספרים, ניכוי במקור, ותעודה מזהה תקפים.</p>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold">2. תוקף מסמכים</p>
          <p>המערכת תתריע 7 ימים לפני פקיעת מסמכים; הספק מתחייב לעדכן אותם במועד.</p>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold">3. תשלומים</p>
          <p>תשלומים יבוצעו בהתאם להסכמות (שוטף+30 / מזומן לאחר שירות בתוספת 5%).</p>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold">4. ניכויים</p>
          <p>ניכוי מס במקור, דמי ניהול (למעט פטור ל-1000 הראשונים), ועמלת סליקה ינוכו אוטומטית.</p>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold">5. אחריות</p>
          <p>ת'כל'ס איננה אחראית לשירותי הספק – כל טענה/פיצוי/ביטוח על אחריותו הבלעדית.</p>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold">6. מחירים</p>
          <p>הספק מתחייב כי אין להציג מחירים זולים יותר לגורם אחר – הפרה תגרור קנס מוסכם של 5,000 ש"ח.</p>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold">7. קנסות ביטול</p>
          <div className="pr-4">
            <p>• מעל 21 ימים: 200 ₪</p>
            <p>• בין 7–21 ימים: 500 ₪</p>
            <p>• בין 48 שעות–7 ימים: 1000 ₪</p>
            <p>• פחות מ-48 שעות: חובה לספק חלופה או לשפות את ת'כל'ס במלוא הסכום</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold">8. עמידה בהזמנות</p>
          <p>הספק מתחייב לעמוד בהזמנות שנקלטו ביומנו ולעדכנו בזמן אמת.</p>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold">9. רישיון חוקי</p>
          <p>כל שימוש במדיה/חומרים במערכת תעשה על פי רישיון חוקי בלבד.</p>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold">10. קניין רוחני</p>
          <p>לספק אין זכויות במערכת, קוד, עיצוב, או קניין רוחני – לא בהווה ולא בעתיד.</p>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold">11. שירות מקצועי</p>
          <p>הספק מחויב לספק שירות ראוי ומקצועי, ולהתמודד עם כל תלונה של לקוח באופן ישיר.</p>
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
          הורד הסכם (PDF)
        </Button>
      </div>
    </div>
  );
};

export default ProviderAgreement;
