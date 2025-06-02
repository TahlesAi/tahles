
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info, DollarSign, MapPin, Clock, Users } from "lucide-react";

const VariantExplanation: React.FC = () => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-3">
            <h4 className="font-medium text-blue-800">מה זה וריאנטים ותמחור דינמי?</h4>
            <p className="text-sm text-blue-700">
              וריאנטים מאפשרים לכם להגדיר מחירים שונים על פי תנאים שונים, כמו מיקום, גודל קבוצה או זמן השירות.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <MapPin className="h-4 w-4" />
                <span>מיקום גיאוגרפי - מחיר שונה לאזורים שונים</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <Users className="h-4 w-4" />
                <span>גודל קבוצה - הנחה לקבוצות גדולות</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <Clock className="h-4 w-4" />
                <span>זמן - מחירי שעות שיא ורגילות</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <DollarSign className="h-4 w-4" />
                <span>תוספות - ציוד נוסף או שירותים מיוחדים</span>
              </div>
            </div>
            
            <div className="bg-white p-3 rounded border border-blue-200 mt-3">
              <p className="text-xs text-blue-600 font-medium">דוגמה:</p>
              <p className="text-xs text-blue-600">
                מופע קוסמות: מחיר בסיס ₪800 | תל אביב +₪200 | קבוצה מעל 50 איש -10% | סוף שבוע +₪150
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VariantExplanation;
