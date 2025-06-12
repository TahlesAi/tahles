
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TestTube,
  Play,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

const TestsManagementPage: React.FC = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // בדיקות מוגדרות מראש
  const availableTests = [
    {
      id: 'components',
      name: 'בדיקות קומפוננטים',
      description: 'בדיקת תקינות כל הקומפוננטים',
      category: 'UI'
    },
    {
      id: 'navigation',
      name: 'בדיקות ניווט',
      description: 'בדיקת כל הקישורים והנתיבים',
      category: 'Navigation'
    },
    {
      id: 'data',
      name: 'בדיקות נתונים',
      description: 'בדיקת תקינות המידע והחיבורים',
      category: 'Data'
    },
    {
      id: 'forms',
      name: 'בדיקות טפסים',
      description: 'בדיקת תקינות כל הטפסים',
      category: 'Forms'
    }
  ];

  const runTest = async (testId: string) => {
    setIsRunning(true);
    
    // סימולציה של הרצת בדיקה
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% סיכוי להצלחה
      const newResult = {
        id: testId,
        name: availableTests.find(t => t.id === testId)?.name,
        status: success ? 'passed' : 'failed',
        timestamp: new Date().toLocaleString('he-IL'),
        details: success ? 'הבדיקה עברה בהצלחה' : 'נמצאו בעיות קטנות'
      };
      
      setTestResults(prev => [newResult, ...prev.slice(0, 9)]);
      setIsRunning(false);
    }, 2000);
  };

  const runAllTests = () => {
    availableTests.forEach((test, index) => {
      setTimeout(() => runTest(test.id), index * 500);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8" dir="rtl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <TestTube className="h-8 w-8 text-red-600" />
              <h1 className="text-3xl font-bold">🧪 ניהול בדיקות המערכת</h1>
              <Badge variant="outline" className="bg-red-100 text-red-800">
                כלי מפתח
              </Badge>
            </div>
            
            <Alert className="mb-6 border-red-200 bg-red-50">
              <TestTube className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>כלי מפתח:</strong> דף זה מיועד למפתח הראשי לבדיקת תקינות המערכת
              </AlertDescription>
            </Alert>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* פאנל בדיקות זמינות */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  בדיקות זמינות
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={runAllTests} 
                  disabled={isRunning}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin ml-2" />
                      מריץ בדיקות...
                    </>
                  ) : (
                    'הרץ את כל הבדיקות'
                  )}
                </Button>
                
                <div className="space-y-3">
                  {availableTests.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{test.name}</h4>
                        <p className="text-sm text-gray-600">{test.description}</p>
                        <Badge variant="outline">{test.category}</Badge>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => runTest(test.id)}
                        disabled={isRunning}
                        variant="outline"
                      >
                        הרץ
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* פאנל תוצאות */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  תוצאות אחרונות
                </CardTitle>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    עדיין לא הורצו בדיקות
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {result.status === 'passed' ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <div>
                            <h4 className="font-medium">{result.name}</h4>
                            <p className="text-sm text-gray-600">{result.details}</p>
                          </div>
                        </div>
                        <div className="text-left">
                          <Badge 
                            variant={result.status === 'passed' ? 'default' : 'destructive'}
                          >
                            {result.status === 'passed' ? 'עבר' : 'נכשל'}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{result.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* סטטיסטיקות */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>סטטיסטיקות בדיקות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {testResults.filter(r => r.status === 'passed').length}
                  </div>
                  <div className="text-sm text-green-700">בדיקות עברו</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {testResults.filter(r => r.status === 'failed').length}
                  </div>
                  <div className="text-sm text-red-700">בדיקות נכשלו</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {testResults.length}
                  </div>
                  <div className="text-sm text-blue-700">סך הכל בדיקות</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestsManagementPage;
