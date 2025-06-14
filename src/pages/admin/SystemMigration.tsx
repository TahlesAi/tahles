
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Database, Settings, CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const SystemMigration: React.FC = () => {
  const location = useLocation();
  
  console.log('🔧 SystemMigration component is rendering');
  console.log('🔧 Current location:', location.pathname);
  console.log('🔧 Location search:', location.search);
  console.log('🔧 Full location object:', location);
  console.log('🔧 Window location:', window.location.href);
  
  React.useEffect(() => {
    console.log('🔧 SystemMigration component mounted successfully');
    console.log('🔧 Component is now in the DOM');
    console.log('🔧 Current URL when component mounted:', window.location.href);
    
    // Force a console message that's easy to spot
    console.warn('🔥 SYSTEM MIGRATION PAGE IS LOADED AND READY 🔥');
    
    return () => {
      console.log('🔧 SystemMigration component is unmounting');
    };
  }, []);

  console.log('🔧 About to render SystemMigration JSX');

  try {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">תכלס הפקות - מעבר מערכת</h1>
            <p className="text-sm text-gray-500 mt-1">נטען בהצלחה!</p>
            <p className="text-xs text-blue-600 mt-1">נתיב נוכחי: {location.pathname}</p>
          </div>
        </header>
        
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8" dir="rtl">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-8 text-center">ניהול מעבר מערכת</h1>
              
              <Alert className="mb-6 bg-green-50 border-green-200">
                <Info className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>✅ העמוד נטען בהצלחה!</strong> המערכת עברה שדרוג משמעותי למערכת מעבר מקיפה.
                  המערכת החדשה מאפשרת הקפאה, בדיקה והטמעת מבנה חדש באופן מלא.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      הקפאת נתונים
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      גיבוי ושמירה של כל הנתונים הקיימים במערכת הישנה
                    </p>
                    <Button variant="outline" className="w-full">
                      הקפא מערכת נוכחית
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      בדיקת מערכת חדשה
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      טעינה ובדיקה של המבנה החדש לפני ההטמעה
                    </p>
                    <Button variant="outline" className="w-full">
                      בדוק מבנה חדש
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      הפעלת מערכת
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      מעבר סופי למערכת החדשה עם כל הנתונים
                    </p>
                    <Button variant="outline" className="w-full">
                      הפעל מערכת חדשה
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>מצב המערכת הנוכחי</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span>גרסה נוכחית</span>
                      <span className="font-semibold">v0.9-legacy</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span>גרסה מטרה</span>
                      <span className="font-semibold">v1.0-new-structure</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span>מצב מעבר</span>
                      <span className="font-semibold">מוכן לתחילת תהליך</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span>נתיב נוכחי</span>
                      <span className="font-semibold">{location.pathname}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center mt-8">
                <Button 
                  size="lg" 
                  onClick={() => {
                    console.log('🔧 Refresh button clicked');
                    window.location.reload();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  רענן מערכת מיגרציה
                </Button>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 תכלס הפקות. כל הזכויות שמורות.</p>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error('🔧 Error in SystemMigration render:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">שגיאה בטעינת הדף</h1>
          <p className="text-gray-600 mb-4">פרטי השגיאה: {String(error)}</p>
          <Button onClick={() => window.location.reload()}>
            רענן דף
          </Button>
        </div>
      </div>
    );
  }
};

export default SystemMigration;
