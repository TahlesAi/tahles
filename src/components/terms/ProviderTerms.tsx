
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const ProviderTerms: React.FC = () => {
  const handleDownloadPDF = () => {
    // Create a blob with the terms text
    const termsText = `
      תקנון ספק – הרשמה והצעת שירותים באתר

      האתר מהווה פלטפורמת תיווך בלבד, ואינו צד להסכם בין הספק ללקוח.

      חובה על הספק לספק את השירות בתאריך, בשעה ובאיכות שנקבעה מול הלקוח.

      הספק מתחייב להחזיק בביטוח אחריות מקצועית בתוקף ולהיות אחראי לכל נזק, תקלה או עיכוב.

      כל פיצוי, החזר או טיפול בתלונה – באחריות הספק בלבד.

      הספק מתחייב לעמוד בזמני הגעה ושירות – כל איחור/ביטול/אי אספקה – באחריותו בלבד, והאתר לא אחראי לכך.

      הספק מאשר כי הוא פועל כחוק ומתחייב למסור נתונים נכונים ולפעול בשקיפות.

      הספק אחראי לכל תשלום מס, דיווח לרשויות והסדרת אישורים וביטוחים נדרשים.

      אסור לספק להציע שירותים לא חוקיים או פוגעניים.

      מדיניות קנסות ואחריות:
      הספק אחראי לכל נזק/איחור/ביטול. האתר פטור מכל אחריות, ומבצע הפניה לכל דרישה מול הספק בלבד. חובה להחזיק ביטוח מקצועי.
    `;
    
    const blob = new Blob([termsText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "תקנון_ספק.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      <div className="text-lg font-bold mb-2">תקנון ספק – הרשמה והצעת שירותים באתר</div>
      <div className="text-sm space-y-2 text-gray-700 max-h-60 overflow-y-auto border p-4 rounded-md">
        <p>האתר מהווה פלטפורמת תיווך בלבד, ואינו צד להסכם בין הספק ללקוח.</p>
        <p>חובה על הספק לספק את השירות בתאריך, בשעה ובאיכות שנקבעה מול הלקוח.</p>
        <p>הספק מתחייב להחזיק בביטוח אחריות מקצועית בתוקף ולהיות אחראי לכל נזק, תקלה או עיכוב.</p>
        <p>כל פיצוי, החזר או טיפול בתלונה – באחריות הספק בלבד.</p>
        <p>הספק מתחייב לעמוד בזמני הגעה ושירות – כל איחור/ביטול/אי אספקה – באחריותו בלבד, והאתר לא אחראי לכך.</p>
        <p>הספק מאשר כי הוא פועל כחוק ומתחייב למסור נתונים נכונים ולפעול בשקיפות.</p>
        <p>הספק אחראי לכל תשלום מס, דיווח לרשויות והסדרת אישורים וביטוחים נדרשים.</p>
        <p>אסור לספק להציע שירותים לא חוקיים או פוגעניים.</p>
        <p className="font-bold mt-2">מדיניות קנסות ואחריות:</p>
        <p>הספק אחראי לכל נזק/איחור/ביטול. האתר פטור מכל אחריות, ומבצע הפניה לכל דרישה מול הספק בלבד. חובה להחזיק ביטוח מקצועי.</p>
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

export default ProviderTerms;
