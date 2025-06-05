
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Snowflake, 
  ArrowRight, 
  Database, 
  CheckCircle,
  AlertTriangle,
  Settings,
  Archive,
  RefreshCw,
  FileText,
  XCircle,
  Download
} from 'lucide-react';
import { legacyDataFreezer } from '@/lib/systemMigration/legacyDataFreezer';
import { newSystemManager } from '@/lib/newSystem/newSystemManager';
import { useUnifiedEventContext } from '@/context/UnifiedEventContext';
import { comprehensiveSystemMigrator } from '@/lib/systemMigration/comprehensiveSystemMigrator';

const ComprehensiveMigrationDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { providers, services, categories, subcategories } = useUnifiedEventContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [migrationSteps, setMigrationSteps] = useState<any[]>([]);
  const [validationResults, setValidationResults] = useState<any[]>([]);
  const [missingComponents, setMissingComponents] = useState<any[]>([]);
  const [businessRules, setBusinessRules] = useState<any[]>([]);
  const [readinessScore, setReadinessScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [report, setReport] = useState<any>(null);
  const [isSystemFrozen, setIsSystemFrozen] = useState(false);

  useEffect(() => {
    loadMigrationStatus();
  }, []);

  const loadMigrationStatus = async () => {
    setIsLoading(true);

    // בדיקה אם המערכת מוקפאת
    const isFrozen = legacyDataFreezer.isSystemFrozen();
    setIsSystemFrozen(isFrozen);

    // יצירת דוח מקיף
    const migrationReport = comprehensiveSystemMigrator.generateComprehensiveReport();
    setMigrationSteps(migrationReport.migrationSteps);
    setValidationResults(migrationReport.validationResults);
    setMissingComponents(migrationReport.missingComponents);
    setBusinessRules(migrationReport.businessRulesStatus);
    setReadinessScore(migrationReport.readinessScore);
    setReport(migrationReport);

    setIsLoading(false);
  };

  const handleFreezeLegacySystem = async () => {
    setIsLoading(true);
    const success = await comprehensiveSystemMigrator.freezeLegacySystem();
    setIsSystemFrozen(success);
    loadMigrationStatus();
  };

  const handleValidateNewSystem = async () => {
    setIsLoading(true);
    await comprehensiveSystemMigrator.validateNewSystem();
    loadMigrationStatus();
  };

  const handleTestUI = async () => {
    setIsLoading(true);
    await comprehensiveSystemMigrator.testUserInterface();
    loadMigrationStatus();
  };

  const handleTestIntegrations = async () => {
    setIsLoading(true);
    await comprehensiveSystemMigrator.testIntegrations();
    loadMigrationStatus();
  };

  const handleActivateNewSystem = async () => {
    setIsLoading(true);
    await comprehensiveSystemMigrator.activateNewSystem();
    loadMigrationStatus();
  };

  const handleDeleteLegacySystem = async () => {
    // אזהרה חשובה: פעולה זו לא ניתנת לביטול!
    if (!window.confirm('אזהרה: פעולה זו תמחק לצמיתות את הגרסה הישנה ואינה ניתנת לביטול! האם להמשיך?')) {
      return;
    }
    
    setIsLoading(true);
    await comprehensiveSystemMigrator.deleteLegacySystem(true);
    loadMigrationStatus();
  };

  const handleExportReport = () => {
    if (!report) return;
    
    // יצירת דוח מפורט
    const detailedReport = comprehensiveSystemMigrator.generateDetailedSystemReport();
    
    // המרה ל-JSON
    const jsonReport = JSON.stringify({
      timestamp: new Date().toISOString(),
      migrationReport: report,
      detailedSystemReport: detailedReport
    }, null, 2);
    
    // יצירת קובץ להורדה
    const blob = new Blob([jsonReport], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-migration-report-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderMigrationStepBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">הושלם</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">בתהליך</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">נכשל</Badge>;
      default:
        return <Badge variant="outline">ממתין</Badge>;
    }
  };

  const renderValidationBadge = (status: string) => {
    switch (status) {
      case 'pass':
        return <Badge className="bg-green-100 text-green-800">עבר</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">אזהרה</Badge>;
      case 'fail':
        return <Badge className="bg-red-100 text-red-800">נכשל</Badge>;
      default:
        return <Badge variant="outline">לא נבדק</Badge>;
    }
  };

  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">קריטי</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800">גבוה</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">בינוני</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">נמוך</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
          <p>טוען מידע על תהליך המעבר...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">מעבר מערכת מקיף</h1>
          <p className="text-gray-600">
            הקפאה, בדיקה והטמעה של מבנה המערכת החדש
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadMigrationStatus} variant="outline">
            <RefreshCw className="h-4 w-4 ml-2" />
            רענן סטטוס
          </Button>
          <Button onClick={handleExportReport}>
            <Download className="h-4 w-4 ml-2" />
            ייצא דוח מלא
          </Button>
        </div>
      </div>

      {/* סטטוס כולל */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-right flex-1">
              <div className="text-2xl font-bold mb-1">מוכנות מערכת</div>
              <div className={`text-4xl font-bold ${
                readinessScore >= 80 ? 'text-green-600' : 
                readinessScore >= 60 ? 'text-yellow-600' : 
                'text-red-600'
              }`}>
                {readinessScore}%
              </div>
              <Progress value={readinessScore} className="mt-2 h-2" />
            </div>
            
            <div className="text-center flex flex-col items-center">
              <div className="text-xl mb-2">סטטוס מערכת</div>
              {isSystemFrozen ? (
                <Badge className="text-lg py-1 px-3 bg-blue-100 text-blue-800">
                  <Snowflake className="h-4 w-4 ml-2" />
                  מערכת מוקפאת
                </Badge>
              ) : (
                <Badge className="text-lg py-1 px-3 bg-yellow-100 text-yellow-800">
                  <AlertTriangle className="h-4 w-4 ml-2" />
                  מערכת פעילה
                </Badge>
              )}
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="text-xl mb-2">שלב נוכחי</div>
              <div className="text-lg">
                {migrationSteps.find(step => step.status === 'in_progress')?.name || 
                 migrationSteps.find(step => step.status === 'pending')?.name || 
                 'מעבר מערכת הושלם'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* לשוניות */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
          <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
          <TabsTrigger value="validation">בדיקות תקינות</TabsTrigger>
          <TabsTrigger value="missing">רכיבים חסרים</TabsTrigger>
          <TabsTrigger value="business-rules">חוקים עסקיים</TabsTrigger>
          <TabsTrigger value="detailed-report">דוח מפורט</TabsTrigger>
        </TabsList>

        {/* סקירה כללית */}
        <TabsContent value="overview" className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>שלבי מעבר מערכת:</strong> יש לבצע את השלבים לפי הסדר. כל שלב תלוי בהשלמת השלב הקודם.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {migrationSteps.map((step, index) => (
              <Card key={step.id} className={
                step.status === 'completed' ? 'border-green-200' : 
                step.status === 'failed' ? 'border-red-200' : 
                step.status === 'in_progress' ? 'border-blue-200' : ''
              }>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      <span className="inline-block ml-2 bg-gray-200 text-gray-800 rounded-full h-6 w-6 text-center">
                        {index + 1}
                      </span>
                      {step.name}
                    </CardTitle>
                    {renderMigrationStepBadge(step.status)}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-600">{step.details}</p>
                  {step.errorMessage && (
                    <Alert className="mt-2 bg-red-50">
                      <XCircle className="h-4 w-4" />
                      <AlertDescription className="text-red-600">
                        {step.errorMessage}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
                <CardFooter>
                  {index === 0 && step.status !== 'completed' && (
                    <Button onClick={handleFreezeLegacySystem} className="w-full">
                      <Snowflake className="h-4 w-4 ml-2" />
                      הקפא מערכת ישנה
                    </Button>
                  )}
                  
                  {index === 1 && migrationSteps[0].status === 'completed' && step.status !== 'completed' && (
                    <Button onClick={handleValidateNewSystem} className="w-full">
                      <CheckCircle className="h-4 w-4 ml-2" />
                      בדוק מבנה חדש
                    </Button>
                  )}
                  
                  {index === 2 && migrationSteps[1].status === 'completed' && step.status !== 'completed' && (
                    <Button onClick={handleTestUI} className="w-full">
                      <Settings className="h-4 w-4 ml-2" />
                      בדוק ממשק משתמש
                    </Button>
                  )}
                  
                  {index === 3 && migrationSteps[2].status === 'completed' && step.status !== 'completed' && (
                    <Button onClick={handleTestIntegrations} className="w-full">
                      <Settings className="h-4 w-4 ml-2" />
                      בדוק אינטגרציות
                    </Button>
                  )}
                  
                  {index === 4 && migrationSteps[3].status === 'completed' && step.status !== 'completed' && (
                    <Button 
                      onClick={handleActivateNewSystem} 
                      className="w-full"
                      disabled={readinessScore < 70}
                    >
                      <ArrowRight className="h-4 w-4 ml-2" />
                      הפעל מערכת חדשה
                      {readinessScore < 70 && " (נדרש ציון מוכנות של 70% לפחות)"}
                    </Button>
                  )}
                  
                  {index === 5 && migrationSteps[4].status === 'completed' && step.status !== 'completed' && (
                    <Button onClick={handleDeleteLegacySystem} className="w-full bg-red-600 hover:bg-red-700">
                      <Archive className="h-4 w-4 ml-2" />
                      מחק גרסה ישנה סופית
                    </Button>
                  )}
                  
                  {step.status === 'completed' && (
                    <div className="w-full text-center text-green-600 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 ml-2" />
                      בוצע בהצלחה {step.completedAt && new Date(step.completedAt).toLocaleString()}
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* בדיקות תקינות */}
        <TabsContent value="validation" className="space-y-4">
          {validationResults.length > 0 ? (
            <div className="space-y-4">
              {validationResults.map((validation, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {validation.status === 'pass' && <CheckCircle className="h-5 w-5 text-green-600 mt-1" />}
                        {validation.status === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1" />}
                        {validation.status === 'fail' && <XCircle className="h-5 w-5 text-red-600 mt-1" />}
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{validation.component}</h4>
                            {renderValidationBadge(validation.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{validation.details}</p>
                          
                          {validation.requirements && validation.requirements.length > 0 && (
                            <div className="bg-gray-50 p-3 rounded-md text-sm">
                              <strong>דרישות:</strong>
                              <ul className="list-disc list-inside mt-1 space-y-1">
                                {validation.requirements.map((req: string, i: number) => (
                                  <li key={i}>{req}</li>
                                ))}
                              </ul>
                              <div className="mt-2 text-gray-700">
                                <strong>מצב נוכחי:</strong> {validation.actualState}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                טרם בוצעו בדיקות תקינות. יש להתחיל את תהליך המעבר.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        {/* רכיבים חסרים */}
        <TabsContent value="missing" className="space-y-4">
          {missingComponents.length > 0 ? (
            <div className="space-y-4">
              {missingComponents.map((component, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{component.name}</CardTitle>
                      {renderPriorityBadge(component.priority)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">{component.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline" className="bg-gray-100">
                        {component.category}
                      </Badge>
                      <div>
                        <span className="text-gray-500">זמן פיתוח משוער:</span>{' '}
                        <strong>{component.estimatedDays}</strong> ימי עבודה
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                לא נמצאו רכיבים חסרים, או שטרם החל תהליך הבדיקה.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        {/* חוקים עסקיים */}
        <TabsContent value="business-rules" className="space-y-4">
          <div className="space-y-4">
            {businessRules.map((rule, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{rule.rule}</h4>
                    {rule.implemented ? (
                      <Badge className="bg-green-100 text-green-800">מיושם</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">חסר</Badge>
                    )}
                  </div>
                  <Progress value={rule.coverage} className="mb-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">כיסוי: {rule.coverage}%</span>
                    <span className="text-gray-600">{rule.notes}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* דוח מפורט */}
        <TabsContent value="detailed-report" className="space-y-4">
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription>
              <strong>דוח מפורט:</strong> ניתן לייצא את הדוח המלא כקובץ JSON באמצעות לחצן "ייצא דוח מלא".
              הדוח כולל את כל הנתונים הנדרשים על מצב המערכת.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>סיכום דוח</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">מבנה מערכת</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>{categories.length} קטגוריות</li>
                    <li>{subcategories.length} תתי-קטגוריות</li>
                    <li>{providers.length} ספקים</li>
                    <li>{services.length} מוצרים/שירותים</li>
                    <li>
                      {validationResults.filter(v => v.status === 'pass').length} בדיקות תקינות עברו בהצלחה 
                      מתוך {validationResults.length}
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">פערים וחוסרים</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>
                      {missingComponents.filter(m => m.priority === 'critical').length} רכיבים קריטיים חסרים
                    </li>
                    <li>
                      {businessRules.filter(r => !r.implemented).length} חוקים עסקיים לא מיושמים
                      מתוך {businessRules.length}
                    </li>
                    <li>
                      זמן פיתוח משוער: {missingComponents.reduce((sum, comp) => sum + comp.estimatedDays, 0)} ימי עבודה
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">סיכום סטטוס</h4>
                <p className="text-gray-700">
                  המערכת נמצאת בציון מוכנות כללי של {readinessScore}%. 
                  {readinessScore >= 80 
                    ? ' המערכת מוכנה להפעלה בסביבת ייצור.' 
                    : readinessScore >= 60
                      ? ' נדרשות השלמות נוספות לפני הפעלה מלאה.'
                      : ' נדרשת עבודה משמעותית להשלמת המערכת לפני הפעלה.'}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleExportReport} 
                className="w-full"
              >
                <Download className="h-4 w-4 ml-2" />
                הורד דוח מפורט מלא
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveMigrationDashboard;
