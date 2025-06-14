
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Download, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Clock,
  BarChart3,
  FileText,
  Loader2
} from 'lucide-react';
import { comprehensiveTestManager, SystemTestReport } from '@/utils/comprehensiveTestManager';

const ComprehensiveTestRunner: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentReport, setCurrentReport] = useState<SystemTestReport | null>(null);
  const [progress, setProgress] = useState(0);

  const runAllTests = async () => {
    setIsRunning(true);
    setProgress(0);
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const report = await comprehensiveTestManager.runAllTests();
      
      clearInterval(progressInterval);
      setProgress(100);
      setCurrentReport(report);
      
      console.log('📊 דוח בדיקות מקיף:', report);
      
    } catch (error) {
      console.error('❌ שגיאה בבדיקות:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const exportReport = () => {
    if (currentReport) {
      comprehensiveTestManager.exportReport(currentReport, 'json');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* כותרת וכפתור ביצוע */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            מנהל בדיקות מערכת מקיף
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button 
              onClick={runAllTests}
              disabled={isRunning}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isRunning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Play className="mr-2 h-4 w-4" />
              {isRunning ? 'רץ בדיקות...' : 'הרץ בדיקות מקיפות'}
            </Button>
            
            {currentReport && (
              <Button onClick={exportReport} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                ייצא דוח
              </Button>
            )}
          </div>
          
          {isRunning && (
            <div className="mt-4">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-600 mt-2">מריץ בדיקות... {progress}%</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* תוצאות בדיקות */}
      {currentReport && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
            <TabsTrigger value="tests">בדיקות מפורטות</TabsTrigger>
            <TabsTrigger value="performance">ביצועים</TabsTrigger>
            <TabsTrigger value="logs">לוגים</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* ציון כללי */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold mb-2 text-blue-600">
                  {currentReport.overallScore}%
                </div>
                <div className="text-lg text-gray-600">ציון מערכת כללי</div>
                <div className={`mt-4 p-2 rounded-lg ${
                  currentReport.overallScore >= 80 ? 'bg-green-100 text-green-800' :
                  currentReport.overallScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentReport.overallScore >= 80 ? '🟢 מערכת יציבה' :
                   currentReport.overallScore >= 60 ? '🟡 דרושים תיקונים' :
                   '🔴 בעיות קריטיות'}
                </div>
              </CardContent>
            </Card>

            {/* סטטיסטיקות */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {currentReport.testSessions[0]?.tests.filter(t => t.status === 'passed').length || 0}
                  </div>
                  <div className="text-sm text-gray-600">בדיקות עברו</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {currentReport.testSessions[0]?.tests.filter(t => t.status === 'failed').length || 0}
                  </div>
                  <div className="text-sm text-gray-600">בדיקות נכשלו</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {currentReport.testSessions[0]?.tests.filter(t => t.status === 'warning').length || 0}
                  </div>
                  <div className="text-sm text-gray-600">אזהרות</div>
                </CardContent>
              </Card>
            </div>

            {/* בעיות קריטיות */}
            {currentReport.criticalIssues.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">בעיות קריטיות</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {currentReport.criticalIssues.map((issue, index) => (
                      <Alert key={index} className="border-red-200 bg-red-50">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                          {issue}
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* המלצות */}
            {currentReport.recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">המלצות לשיפור</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {currentReport.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                        <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span className="text-blue-800">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="tests" className="space-y-4">
            {currentReport.testSessions[0]?.tests.map((test, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(test.status)}
                      <div>
                        <h3 className="font-semibold">{test.name}</h3>
                        <p className="text-sm text-gray-600">{test.details}</p>
                        <Badge variant="secondary" className="mt-1">
                          {test.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-left">
                      <Badge className={getStatusColor(test.status)}>
                        {test.status}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">
                        {test.duration}ms
                      </div>
                    </div>
                  </div>
                  
                  {test.evidence.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium mb-2">עדויות:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {test.evidence.map((evidence, i) => (
                          <li key={i}>• {evidence}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>מטריקות ביצועים</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>זמן טעינת עמוד:</span>
                    <span className="font-mono">{currentReport.performanceMetrics.pageLoadTime}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>זמן רינדור רכיבים:</span>
                    <span className="font-mono">{currentReport.performanceMetrics.componentRenderTime}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>זמן תגובת API:</span>
                    <span className="font-mono">{currentReport.performanceMetrics.apiResponseTime}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>שימוש בזיכרון:</span>
                    <span className="font-mono">{currentReport.performanceMetrics.memoryUsage.toFixed(2)}MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>אחוז שגיאות:</span>
                    <span className="font-mono">{currentReport.performanceMetrics.errorRate}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ממצאים מפורטים</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">מוכנות למיגרציה:</h4>
                    <div className="text-2xl font-bold text-blue-600">
                      {currentReport.detailedFindings.migrationReadiness.score}%
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {currentReport.detailedFindings.userExperience.navigationWorks ? 
                        <CheckCircle className="h-4 w-4 text-green-600" /> : 
                        <XCircle className="h-4 w-4 text-red-600" />
                      }
                      <span className="text-sm">ניווט פועל</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {currentReport.detailedFindings.systemIntegrity.componentsLoaded ? 
                        <CheckCircle className="h-4 w-4 text-green-600" /> : 
                        <XCircle className="h-4 w-4 text-red-600" />
                      }
                      <span className="text-sm">רכיבים נטענו</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {currentReport.detailedFindings.systemIntegrity.routingWorks ? 
                        <CheckCircle className="h-4 w-4 text-green-600" /> : 
                        <XCircle className="h-4 w-4 text-red-600" />
                      }
                      <span className="text-sm">ראוטינג פועל</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>לוגי בדיקות</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {currentReport.testSessions[0]?.logs.map((log, index) => (
                    <div key={index} className={`p-2 rounded text-xs font-mono ${
                      log.level === 'error' ? 'bg-red-50 text-red-800' :
                      log.level === 'warning' ? 'bg-yellow-50 text-yellow-800' :
                      'bg-gray-50 text-gray-800'
                    }`}>
                      <span className="font-bold">[{log.level.toUpperCase()}]</span>
                      <span className="ml-2">{log.timestamp}</span>
                      <span className="ml-2">[{log.category}]</span>
                      <span className="ml-2">{log.message}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ComprehensiveTestRunner;
