
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ExportImportantNotes: React.FC = () => {
  return (
    <Card className="mt-8 border-yellow-200 bg-yellow-50">
      <CardContent className="p-6">
        <h3 className="font-bold text-yellow-800 mb-3">הערות חשובות:</h3>
        <ul className="text-yellow-700 space-y-2">
          <li>• הקבצים בפורמט CSV עם קידוד UTF-8 (תומך עברית)</li>
          <li>• ניתן לפתוח באקסל: פתח → טקסט → בחר UTF-8</li>
          <li>• כל קובץ מכיל נתונים של קטגוריה אחת</li>
          <li>• רשומות סימולציה מסומנות בעמודה נפרדת</li>
          <li>• מזהים (IDs) חשובים לשמירת הקשרים בין הרשומות</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ExportImportantNotes;
