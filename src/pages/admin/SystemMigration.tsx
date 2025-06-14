
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Database, Settings, CheckCircle, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { comprehensiveSystemMigrator } from '@/lib/systemMigration/comprehensiveSystemMigrator';

const SystemMigration: React.FC = () => {
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});
  const [stepResults, setStepResults] = useState<Record<string, any>>({});
  const [migrationReport, setMigrationReport] = useState<any>(null);
  
  console.log('🔧 SystemMigration component is rendering');
  console.log('🔧 נתיב נוכחי:', location.pathname);
  
  React.useEffect(() => {
    console.log('🔧 SystemMigration component mounted successfully');
    console.warn('🔥 SYSTEM MIGRATION PAGE IS LOADED AND READY 🔥');
    
    // טעינת דוח ראשוני
    const initialReport = comprehensiveSystemMigrator.generateComprehensiveReport();
    setMigrationReport(initialReport);
    console.log('📊 דוח מיגרציה ראשוני:', initialReport);
  }, []);

  const handleFreezeSystem = async () => {
    console.log('🧊 מתחיל הקפאת מערכת...');
    setIsProcessing(prev => ({ ...prev, freeze: true }));
    
    try {
      const success = await comprehensiveSystemMigrator.freezeLegacySystem();
      setStepResults(prev => ({ 
        ...prev, 
        freeze: { success, message: success ? 'המערכת הוקפאה בהצלחה' : 'שגיאה בהקפאה' }
      }));
      
      if (success) {
        // עדכון הדוח
        const updatedReport = comprehensiveSystemMigrator.generateComprehensiveReport();
        setMigrationReport(updatedReport);
      }
    } catch (error) {
      console.error('❌ שגיאה בהקפאה:', error);
      setStepResults(prev => ({ 
        ...prev, 
        freeze: { success: false, message: `שגיאה: ${error}` }
      }));
    }
    
    setIsProcessing(prev => ({ ...prev, freeze: false }));
  };

  const handleValidateNewSystem = async () => {
    console.log('🔍 מתחיל בדיקת מבנה חדש...');
    setIsProcessing(prev => ({ ...prev, validate: true }));
    
    try {
      const success = await comprehensiveSystemMigrator.validateNewSystem();
      setStepResults(prev => ({ 
        ...prev, 
        validate: { success, message: success ? 'בדיקת מבנה הושלמה בהצלחה' : 'נמצאו בעיות במבנה' }
      }));
      
      // עדכון הדוח עם תוצאות הבדיקה
      const updatedReport = comprehensiveSystemMigrator.generateComprehensiveReport();
      setMigrationReport(updatedReport);
      console.log('📊 דוח עדכני:', updatedReport);
      
    } catch (error) {
      console.error('❌ שגיאה בבדיקה:', error);
      setStepResults(prev => ({ 
        ...prev, 
        validate: { success: false, message: `שגיאה בבדיקה: ${error}` }
      }));
    }
    
    setIsProcessing(prev => ({ ...prev, validate: false }));
  };

  const handleActivateSystem = async () => {
    console.log('🚀 מתחיל הפעלת מערכת חדשה...');
    setIsProcessing(prev => ({ ...prev, activate: true }));
    
    try {
      const success = await comprehensiveSystemMigrator.activateNewSystem();
      setStepResults(prev => ({ 
        ...prev, 
        activate: { success, message: success ? 'המערכת החדשה הופעלה בהצלחה!' : 'כשל בהפעלת המערכת' }
      }));
      
      if (success) {
        const updatedReport = comprehensiveSystemMigrator.generateComprehensiveReport();
        setMigrationReport(updatedReport);
      }
    } catch (error) {
      console.error('❌ שגיאה בהפעלה:', error);
      setStepResults(prev => ({ 
        ...prev, 
        activate: { success: false, message: `שגיאה בהפעלה: ${error}` }
      }));
    }
    
    setIsProcessing(prev => ({ ...prev, activate: false }));
  };

  const getStepStatus = (stepKey: string) => {
    const result = stepResults[stepKey];
    if (!result) return null;
    return result.success ? 'success' : 'error';
  };

  const getStepMessage = (stepKey: string) => {
    return stepResults[stepKey]?.message || '';
  };

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

            {/* תצוגת ציון מוכנות */}
            {migrationReport && (
              <Alert className="mb-6 bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>ציון מוכנות למיגרציה: {migrationReport.readinessScore}%</strong>
                  <br />
                  {migrationReport.readinessScore >= 70 ? 
                    '🟢 המערכת מוכנה למעבר' : 
                    '🟡 נדרשים תיקונים נוספים לפני המעבר'
                  }
                </AlertDescription>
              </Alert>
            )}

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
                  
                  {getStepStatus('freeze') && (
                    <Alert className={`mb-4 ${getStepStatus('freeze') === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <AlertDescription className={getStepStatus('freeze') === 'success' ? 'text-green-800' : 'text-red-800'}>
                        {getStepMessage('freeze')}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleFreezeSystem}
                    disabled={isProcessing.freeze}
                  >
                    {isProcessing.freeze && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {stepResults.freeze?.success ? '✅ הוקפא' : 'הקפא מערכת נוכחית'}
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
                  
                  {getStepStatus('validate') && (
                    <Alert className={`mb-4 ${getStepStatus('validate') === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <AlertDescription className={getStepStatus('validate') === 'success' ? 'text-green-800' : 'text-red-800'}>
                        {getStepMessage('validate')}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleValidateNewSystem}
                    disabled={isProcessing.validate}
                  >
                    {isProcessing.validate && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {stepResults.validate?.success ? '✅ נבדק' : 'בדוק מבנה חדש'}
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
                  
                  {getStepStatus('activate') && (
                    <Alert className={`mb-4 ${getStepStatus('activate') === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <AlertDescription className={getStepStatus('activate') === 'success' ? 'text-green-800' : 'text-red-800'}>
                        {getStepMessage('activate')}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleActivateSystem}
                    disabled={isProcessing.activate || !stepResults.validate?.success}
                  >
                    {isProcessing.activate && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {stepResults.activate?.success ? '✅ הופעל' : 'הפעל מערכת חדשה'}
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
                    <span className="font-semibold">
                      {migrationReport ? `מוכן לתחילת תהליך (${migrationReport.readinessScore}%)` : 'טוען...'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span>נתיב נוכחי</span>
                    <span className="font-semibold">{location.pathname}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* תצוגת דוח מפורט */}
            {migrationReport && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>דוח בדיקות מערכת</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold">שלבי מיגרציה:</h4>
                    {migrationReport.migrationSteps.map((step: any, index: number) => (
                      <div key={index} className={`p-2 rounded flex items-center gap-2 ${
                        step.status === 'completed' ? 'bg-green-50' : 
                        step.status === 'failed' ? 'bg-red-50' : 'bg-gray-50'
                      }`}>
                        <span className={`w-3 h-3 rounded-full ${
                          step.status === 'completed' ? 'bg-green-500' : 
                          step.status === 'failed' ? 'bg-red-500' : 'bg-gray-300'
                        }`}></span>
                        <span className="text-sm">{step.name} - {step.status}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

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
};

export default SystemMigration;
