
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useUnifiedEventContext } from '@/context/UnifiedEventContext';
import { useDataExport } from '@/hooks/useDataExport';
import ExportStatistics from '@/components/admin/export/ExportStatistics';
import ExportContentDetails from '@/components/admin/export/ExportContentDetails';
import ExportActions from '@/components/admin/export/ExportActions';
import ExportImportantNotes from '@/components/admin/export/ExportImportantNotes';
import { Home } from 'lucide-react';

const DataExportPage = () => {
  const navigate = useNavigate();
  const { isLoading } = useUnifiedEventContext();
  const { stats, exportStatus, exportAllData } = useDataExport();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">טוען נתונים לייצוא...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      
      <main className="flex-grow">
        <div className="container px-4 py-6">
          {/* כותרת */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <Home className="h-4 w-4 ml-2" />
                חזרה לדף הבית
              </Button>
              <h1 className="text-3xl font-bold">ייצוא נתוני המערכת</h1>
            </div>
            
            <p className="text-gray-600 mb-4">
              דף זה מאפשר לך לייצא את כל המידע שהכנסת למערכת בפורמט CSV (ניתן לפתוח באקסל)
            </p>
          </div>

          {/* סטטיסטיקות */}
          <ExportStatistics stats={stats} />

          {/* פרטי הייצוא */}
          <ExportContentDetails stats={stats} />

          {/* כפתור ייצוא */}
          <ExportActions onExport={exportAllData} exportStatus={exportStatus} />

          {/* הערות חשובות */}
          <ExportImportantNotes />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DataExportPage;
