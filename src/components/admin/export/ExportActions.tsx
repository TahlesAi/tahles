
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, Download, CheckCircle, AlertTriangle } from 'lucide-react';

interface ExportActionsProps {
  onExport: () => void;
  exportStatus: string;
}

const ExportActions: React.FC<ExportActionsProps> = ({ onExport, exportStatus }) => {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <FileSpreadsheet className="h-16 w-16 mx-auto mb-4 text-green-600" />
        <h3 className="text-xl font-bold mb-4">ייצוא לאקסל</h3>
        <p className="text-gray-600 mb-6">
          הקליק כדי להוריד 6 קבצי CSV עם כל הנתונים. 
          <br />
          הקבצים ניתנים לפתיחה באקסל ולעריכה נוחה.
        </p>
        
        {exportStatus && (
          <div className={`p-4 rounded-lg mb-4 ${
            exportStatus.includes('הושלם') 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : exportStatus.includes('שגיאה')
              ? 'bg-red-50 border border-red-200 text-red-800'
              : 'bg-blue-50 border border-blue-200 text-blue-800'
          }`}>
            {exportStatus.includes('הושלם') && <CheckCircle className="h-5 w-5 inline ml-2" />}
            {exportStatus.includes('שגיאה') && <AlertTriangle className="h-5 w-5 inline ml-2" />}
            {exportStatus}
          </div>
        )}
        
        <Button 
          onClick={onExport}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4"
          disabled={!!exportStatus && !exportStatus.includes('הושלם')}
        >
          <Download className="h-5 w-5 ml-2" />
          ייצא את כל הנתונים
        </Button>
        
        <div className="mt-4 text-sm text-gray-500">
          יורדו 6 קבצים: קטגוריות, תתי-קטגוריות, קונספטים, תת-קונספטים, ספקים ושירותים
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportActions;
