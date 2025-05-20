
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const CustomerTerms: React.FC = () => {
  const handleDownloadPDF = () => {
    // Create a blob with the terms text
    const termsText = `
      תקנון לקוח – הזמנת שירותים באתר

      האתר מהווה פלטפורמת תיווך בין לקוחות לבין ספקים בלבד.

      כל הזמנה היא באחריות הלקוח והספק בלבד; האתר אינו צד להסכם.

      מחובת הלקוח לבדוק את התאמת השירות ולוודא פרטי הזמנה.

      במקרה של ביטול, יחולו דמי ביטול לפי מדיניות כל ספק.

      במקרה של איחור, אי-אספקה, תקלה או נזק – כל האחריות חלה על הספק בלבד.

      האתר אינו אחראי לאי-קיום הזמנה, איחורים, ביטולים, פיצוי או החזר כספי.

      אסור להשתמש בשירותים לצרכים לא חוקיים או לא מוסריים.

      מדיניות קנסות וביטולים:
      לקוח שמבטל הזמנה כפוף למדיניות הספק, יתכן וקיימים דמי ביטול/קנס. איחורים/אי הופעה – כל האחריות על הלקוח.
    `;
    
    const blob = new Blob([termsText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "תקנון_לקוח.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      <div className="text-lg font-bold mb-2">תקנון לקוח – הזמנת שירותים באתר</div>
      <div className="text-sm space-y-2 text-gray-700 max-h-60 overflow-y-auto border p-4 rounded-md">
        <p>האתר מהווה פלטפורמת תיווך בין לקוחות לבין ספקים בלבד.</p>
        <p>כל הזמנה היא באחריות הלקוח והספק בלבד; האתר אינו צד להסכם.</p>
        <p>מחובת הלקוח לבדוק את התאמת השירות ולוודא פרטי הזמנה.</p>
        <p>במקרה של ביטול, יחולו דמי ביטול לפי מדיניות כל ספק.</p>
        <p>במקרה של איחור, אי-אספקה, תקלה או נזק – כל האחריות חלה על הספק בלבד.</p>
        <p>האתר אינו אחראי לאי-קיום הזמנה, איחורים, ביטולים, פיצוי או החזר כספי.</p>
        <p>אסור להשתמש בשירותים לצרכים לא חוקיים או לא מוסריים.</p>
        <p className="font-bold mt-2">מדיניות קנסות וביטולים:</p>
        <p>לקוח שמבטל הזמנה כפוף למדיניות הספק, יתכן וקיימים דמי ביטול/קנס. איחורים/אי הופעה – כל האחריות על הלקוח.</p>
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

export default CustomerTerms;
