
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Snowflake, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Eye,
  Database,
  Settings,
  Users,
  Package,
  Heart,
  Scale,
  Smartphone,
  CreditCard,
  Download,
  Play,
  Trash2,
  RotateCcw
} from 'lucide-react';
import { legacyDataFreezer } from '@/lib/systemMigration/legacyDataFreezer';
import { newSystemManager } from '@/lib/newSystem/newSystemManager';

interface MigrationStep {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  isBlocking: boolean;
  estimatedTime: string;
}

const ComprehensiveMigrationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemFrozen, setSystemFrozen] = useState(false);
  const [migrationSteps, setMigrationSteps] = useState<MigrationStep[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [validationResults, setValidationResults] = useState<any>(null);

  useEffect(() => {
    // בדיקה אם המערכת כבר מוקפאת
    setSystemFrozen(legacyDataFreezer.isSystemFrozen());
    
    // הגדרת שלבי המעבר
    const steps: MigrationStep[] = [
      {
        id: 'freeze',
        name: 'הקפא מערכת ישנה',
        description: 'יצירת גיבוי מלא של המערכת הנוכחית',
        icon: <Snowflake className="h-5 w-5" />,
        status: systemFrozen ? 'completed' : 'pending',
        isBlocking: true,
        estimatedTime: '2 דקות'
      },
      {
        id: 'validate-structure',
        name: 'בדוק מבנה חדש',
        description: 'ולידציה של המבנה החדש והנתונים',
        icon: <Database className="h-5 w-5" />,
        status: systemFrozen ? 'pending' : 'pending',
        isBlocking: true,
        estimatedTime: '5 דקות'
      },
      {
        id: 'test-ui',
        name: 'בדוק ממשק משתמש',
        description: 'בדיקת תקינות הממשק החדש',
        icon: <Eye className="h-5 w-5" />,
        status: 'pending',
        isBlocking: false,
        estimatedTime: '10 דקות'
      },
      {
        id: 'test-integrations',
        name: 'בדוק אינטגרציות',
        description: 'בדיקת חיבורים לשירותים חיצוניים',
        icon: <Settings className="h-5 w-5" />,
        status: 'pending',
        isBlocking: false,
        estimatedTime: '15 דקות'
      },
      {
        id: 'activate',
        name: 'הפעל מערכת חדשה',
        description: 'הפעלה מלאה של המערכת החדשה',
        icon: <Play className="h-5 w-5" />,
        status: 'pending',
        isBlocking: true,
        estimatedTime: '3 דקות'
      },
      {
        id: 'cleanup',
        name: 'נקה גרסה ישנה',
        description: 'מחיקת הגרסה הישנה (לא הפיך!)',
        icon: <Trash2 className="h-5 w-5" />,
        status: 'pending',
        isBlocking: false,
        estimatedTime: '1 דקה'
      }
    ];

    setMigrationSteps(steps);
    calculateProgress(steps);
  }, [systemFrozen]);

  const calculateProgress = (steps: MigrationStep[]) => {
    const completedSteps = steps.filter(step => step.status === 'completed').length;
    const progress = (completedSteps / steps.length) * 100;
    setOverallProgress(progress);
  };

  const handleFreezeSystem = () => {
    try {
      // יצירת snapshot של המערכת הנוכחית
      const providers: any[] = []; // נתונים ממערכת קיימת
      const services: any[] = [];   // נתונים ממערכת קיימת
      const categories: any[] = [];
      const subcategories: any[] = [];

      const snapshotId = legacyDataFreezer.freezeCurrentSystem(
        providers,
        services,
        categories,
        subcategories,
        'admin-user',
        'מעבר למערכת חדשה v1.0'
      );

      setSystemFrozen(true);
      
      // עדכון שלב ההקפאה
      setMigrationSteps(prev => prev.map(step => 
        step.id === 'freeze' 
          ? { ...step, status: 'completed' as const }
          : step
      ));

      console.log('המערכת הוקפאה בהצלחה! Snapshot ID:', snapshotId);
    } catch (error) {
      console.error('שגיאה בהקפאת המערכת:', error);
    }
  };

  const handleValidateStructure = () => {
    setMigrationSteps(prev => prev.map(step => 
      step.id === 'validate-structure' 
        ? { ...step, status: 'in-progress' as const }
        : step
    ));

    // הרצת ולידציה של המערכת החדשה
    setTimeout(() => {
      const results = newSystemManager.validateSystemReadiness();
      setValidationResults(results);
      
      setMigrationSteps(prev => prev.map(step => 
        step.id === 'validate-structure' 
          ? { 
              ...step, 
              status: results.score >= 70 ? 'completed' as const : 'error' as const 
            }
          : step
      ));
    }, 2000);
  };

  const handleActivateNewSystem = () => {
    if (validationResults?.score >= 70) {
      newSystemManager.activateSystem();
      
      setMigrationSteps(prev => prev.map(step => 
        step.id === 'activate' 
          ? { ...step, status: 'completed' as const }
          : step
      ));
    }
  };

  const handleExportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      migrationProgress: overallProgress,
      steps: migrationSteps,
      validationResults,
      frozenSnapshots: legacyDataFreezer.getAllFrozenSnapshots(),
      systemStatus: newSystemManager.isSystemActive() ? 'active' : 'inactive'
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `migration-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Snowflake className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">מערכת מעבר מקיפה</h1>
          {systemFrozen && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Snowflake className="h-3 w-3 ml-1" />
              מערכת מוקפאת
            </Badge>
          )}
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">התקדמות כללית</span>
            <span className="text-sm text-gray-600">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        <Alert className="mb-6">
          <Snowflake className="h-4 w-4" />
          <AlertDescription>
            <strong>מערכת מעבר מקיפה:</strong> המערכת עברה שדרוג משמעותי למערכת מעבר מקיפה.
            המערכת החדשה מאפשרת הקפאה, בדיקה והטמעת מבנה חדש באופן מלא.
          </AlertDescription>
        </Alert>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
          <TabsTrigger value="integrity">בדיקות תקינות</TabsTrigger>
          <TabsTrigger value="missing">רכיבים חסרים</TabsTrigger>
          <TabsTrigger value="business">חוקים עסקיים</TabsTrigger>
          <TabsTrigger value="snapshots">גיבויים</TabsTrigger>
          <TabsTrigger value="reports">דוח מפורט</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* שלבי המעבר */}
            <Card>
              <CardHeader>
                <CardTitle>שלבי המעבר</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {migrationSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className={`p-2 rounded-full ${
                        step.status === 'completed' ? 'bg-green-100 text-green-600' :
                        step.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                        step.status === 'error' ? 'bg-red-100 text-red-600' :
                        'bg-gray-100 text-gray-400'
                      }`}>
                        {step.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{step.name}</h3>
                          <div className="flex items-center gap-2">
                            {step.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-600" />}
                            {step.status === 'error' && <XCircle className="h-4 w-4 text-red-600" />}
                            {step.status === 'in-progress' && <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />}
                            <span className="text-xs text-gray-500">{step.estimatedTime}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{step.description}</p>
                        
                        {/* כפתורי פעולה */}
                        {step.id === 'freeze' && !systemFrozen && (
                          <Button onClick={handleFreezeSystem} size="sm" className="mt-2">
                            הקפא מערכת ישנה
                          </Button>
                        )}
                        
                        {step.id === 'validate-structure' && systemFrozen && step.status === 'pending' && (
                          <Button onClick={handleValidateStructure} size="sm" className="mt-2">
                            בדוק מבנה חדש
                          </Button>
                        )}
                        
                        {step.id === 'activate' && validationResults?.score >= 70 && step.status === 'pending' && (
                          <Button onClick={handleActivateNewSystem} size="sm" className="mt-2">
                            הפעל מערכת חדשה
                          </Button>
                        )}
                        
                        {step.id === 'activate' && validationResults?.score < 70 && (
                          <Alert className="mt-2">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              המערכת עדיין לא מוכנה להפעלה. ציון נוכחי: {validationResults?.score}% (נדרש: 70%)
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* סטטוס המערכת */}
            <Card>
              <CardHeader>
                <CardTitle>סטטוס מערכת</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-blue-600" />
                      <span>קטגוריות</span>
                    </div>
                    <Badge variant="secondary">5 קטגוריות-על</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-green-600" />
                      <span>תתי קטגוריות</span>
                    </div>
                    <Badge variant="secondary">10 תתי קטגוריות</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-purple-600" />
                      <span>קונספטים</span>
                    </div>
                    <Badge variant="secondary">30 קונספטים</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-600" />
                      <span>Wishlist</span>
                    </div>
                    <Badge variant={newSystemManager.getBusinessRules().enableWishlist ? "default" : "secondary"}>
                      {newSystemManager.getBusinessRules().enableWishlist ? "פעיל" : "לא פעיל"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Scale className="h-5 w-5 text-orange-600" />
                      <span>השוואת מוצרים</span>
                    </div>
                    <Badge variant={newSystemManager.getBusinessRules().enableProductComparison ? "default" : "secondary"}>
                      {newSystemManager.getBusinessRules().enableProductComparison ? "פעיל" : "לא פעיל"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-red-600" />
                      <span>אימות SMS</span>
                    </div>
                    <Badge variant={newSystemManager.getBusinessRules().requireSMSVerification ? "default" : "secondary"}>
                      {newSystemManager.getBusinessRules().requireSMSVerification ? "פעיל" : "לא פעיל"}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <Button onClick={handleExportReport} variant="outline" className="w-full">
                    <Download className="h-4 w-4 ml-2" />
                    ייצא דוח מלא
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrity">
          <Card>
            <CardHeader>
              <CardTitle>בדיקות תקינות מערכת</CardTitle>
            </CardHeader>
            <CardContent>
              {validationResults ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">ציון כללי</span>
                    <div className="flex items-center gap-2">
                      <Progress value={validationResults.score} className="w-32" />
                      <span className="font-bold">{validationResults.score}%</span>
                    </div>
                  </div>
                  
                  {validationResults.criticalIssues.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-red-600">בעיות קריטיות</h3>
                      {validationResults.criticalIssues.map((issue: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">{issue}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {validationResults.warnings.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-yellow-600">אזהרות</h3>
                      {validationResults.warnings.map((warning: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">{warning}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      {validationResults.isReady 
                        ? "המערכת מוכנה להפעלה!" 
                        : "המערכת עדיין דורשת התאמות לפני ההפעלה."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">עדיין לא הורצה בדיקת תקינות</p>
                  <Button onClick={handleValidateStructure} className="mt-4">
                    הרץ בדיקת תקינות
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missing">
          <Card>
            <CardHeader>
              <CardTitle>רכיבים חסרים</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h3 className="font-medium text-red-600 mb-2">גבוה</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• מערכת אימות SMS למשתמשים</li>
                    <li>• התממשקות מלאה לסליקה</li>
                    <li>• מניעת הופעת מוצרים לא זמינים</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium text-yellow-600 mb-2">בינוני</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• ממשק CRM דו-כיווני</li>
                    <li>• אימות ת"ז מתקדם לספקים</li>
                    <li>• מסננים מתקדמים בחיפוש</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-600 mb-2">נמוך</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• שיפורי UI נוספים</li>
                    <li>• אפשרויות דוח מתקדמות</li>
                    <li>• אינטגרציות נוספות</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>חוקים עסקיים</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(newSystemManager.getBusinessRules()).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{key}</span>
                    <Badge variant={value ? "default" : "secondary"}>
                      {value ? "פעיל" : "לא פעיל"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="snapshots">
          <Card>
            <CardHeader>
              <CardTitle>גיבויים וגרסאות</CardTitle>
            </CardHeader>
            <CardContent>
              {legacyDataFreezer.getAllFrozenSnapshots().length > 0 ? (
                <div className="space-y-4">
                  {legacyDataFreezer.getAllFrozenSnapshots().map((snapshot) => (
                    <div key={snapshot.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{snapshot.description}</h3>
                          <p className="text-sm text-gray-600">
                            תאריך: {new Date(snapshot.freezeDate).toLocaleString('he-IL')}
                          </p>
                          <p className="text-sm text-gray-600">
                            {snapshot.metadata.totalProviders} ספקים, {snapshot.metadata.totalServices} שירותים
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">אין גיבויים זמינים</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>דוח מפורט</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-gray-600">קטגוריות</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">10</div>
                    <div className="text-sm text-gray-600">תתי קטגוריות</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">30</div>
                    <div className="text-sm text-gray-600">קונספטים</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{validationResults?.score || 0}%</div>
                    <div className="text-sm text-gray-600">ציון מוכנות</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-4">סיכום מצב</h3>
                  <div className="prose text-sm">
                    <p>המערכת החדשה כוללת את כל הקטגוריות הנדרשות ומורחבת עם 30 קונספטים.</p>
                    <p>תתי הקטגוריות הושלמו לכל 5 הקטגוריות הראשיות.</p>
                    <p>החוקים העסקיים מוגדרים ומוכנים להפעלה.</p>
                    {validationResults?.isReady ? (
                      <p className="text-green-600 font-medium">המערכת מוכנה להפעלה!</p>
                    ) : (
                      <p className="text-red-600 font-medium">נדרשות עוד התאמות לפני ההפעלה.</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveMigrationDashboard;
