
import React from "react";

const VariantExplanation: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="font-medium text-blue-900 mb-2">איך זה עובד?</h4>
      <ul className="text-sm text-blue-800 space-y-1">
        <li>• מחיר הבסיס הוא המחיר המינימלי למוצר</li>
        <li>• כל וריאנט יכול להוסיף או להפחית מהמחיר</li>
        <li>• סכום קבוע: מוסיף/מפחית סכום מדויק</li>
        <li>• אחוז: מוסיף/מפחית אחוז מהמחיר הבסיס</li>
        <li>• הלקוח יראה את המחיר הסופי באופן אוטומטי</li>
      </ul>
    </div>
  );
};

export default VariantExplanation;
