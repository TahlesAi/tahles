
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Database, Settings, CheckCircle } from 'lucide-react';

const SystemMigration: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8" dir="rtl">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">ניהול מעבר מערכת</h1>
            
            <Alert className="mb-6">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>מערכת מעבר מקיפה:</strong> המערכת עברה שדרוג משמעותי למערכת מעבר מקיפה.
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
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <Button 
                size="lg" 
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                רענן מערכת מיגרציה
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SystemMigration;
