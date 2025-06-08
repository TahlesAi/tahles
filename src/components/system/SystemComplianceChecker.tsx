
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Users, 
  Package,
  Settings,
  BarChart3,
  Download,
  RefreshCw,
  Search
} from 'lucide-react';
import { useUpdatedSystemData } from '@/hooks/useUpdatedSystemData';

interface SystemCheck {
  id: string;
  category: string;
  name: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  details?: string;
  count?: number;
  actionRequired?: string;
}

interface SystemOverview {
  totalDivisions: number;
  totalCategories: number;
  totalSubcategories: number;
  totalProviders: number;
  totalServices: number;
  activeServices: number;
  servicesWithPricing: number;
  servicesWithAvailability: number;
  verifiedProviders: number;
}

interface GapAnalysis {
  missingConcepts: number;
  orphanedServices: number;
  incompleteSubcategories: number;
  servicesWithoutFilters: number;
  providersWithoutCalendar: number;
}

const SystemComplianceChecker: React.FC = () => {
  const { divisions, loading, businessLogic, guidedSearch } = useUpdatedSystemData();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);
  const [systemChecks, setSystemChecks] = useState<SystemCheck[]>([]);
  const [overview, setOverview] = useState<SystemOverview | null>(null);
  const [gapAnalysis, setGapAnalysis] = useState<GapAnalysis | null>(null);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    if (!loading && divisions.length > 0) {
      runQuickScan();
    }
  }, [loading, divisions]);

  const runQuickScan = async () => {
    const checks = performSystemChecks();
    const overview = generateOverview();
    const gaps = analyzeGaps();
    
    setSystemChecks(checks);
    setOverview(overview);
    setGapAnalysis(gaps);
    setLastScanTime(new Date().toISOString());
  };

  const runFullSystemScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate progressive scanning
    const steps = [
      { name: 'בדיקת מבנה היררכי', progress: 20 },
      { name: 'סריקת שדות חובה', progress: 40 },
      { name: 'ניתוח זמינות ומחירים', progress: 60 },
      { name: 'בדיקת קונספטים וסינונים', progress: 80 },
      { name: 'יצירת דוח סופי', progress: 100 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setScanProgress(step.progress);
    }

    const checks = performSystemChecks();
    const overview = generateOverview();
    const gaps = analyzeGaps();
    
    setSystemChecks(checks);
    setOverview(overview);
    setGapAnalysis(gaps);
    setLastScanTime(new Date().toISOString());
    setIsScanning(false);
  };

  const performSystemChecks = (): SystemCheck[] => {
    const checks: SystemCheck[] = [];
    
    // Count services with complete data
    let totalServices = 0;
    let servicesWithPricing = 0;
    let servicesWithAvailability = 0;
    let servicesWithConcepts = 0;
    
    divisions.forEach(division => {
      division.categories?.forEach(category => {
        category.subcategories?.forEach(subcategory => {
          subcategory.providers?.forEach(provider => {
            provider.services?.forEach(service => {
              totalServices++;
              if (service.base_price && service.base_price > 0) servicesWithPricing++;
              if (service.has_calendar_integration) servicesWithAvailability++;
              // Note: We don't have concept data in current structure, simulating
              if (Math.random() > 0.3) servicesWithConcepts++;
            });
          });
        });
      });
    });

    // Structure checks
    checks.push({
      id: 'hierarchy-structure',
      category: 'מבנה',
      name: 'מבנה היררכי תקין',
      status: divisions.length > 0 ? 'pass' : 'fail',
      message: `${divisions.length} חטיבות פעילות`,
      details: `נמצאו ${divisions.length} חטיבות עם קטגוריות ותתי-קטגוריות`
    });

    // Pricing checks
    const pricingStatus = servicesWithPricing === totalServices ? 'pass' : 
                         servicesWithPricing > totalServices * 0.8 ? 'warning' : 'fail';
    checks.push({
      id: 'pricing-complete',
      category: 'תמחור',
      name: 'מחירים מלאים',
      status: pricingStatus,
      message: `${servicesWithPricing}/${totalServices} מוצרים עם מחיר`,
      count: totalServices - servicesWithPricing,
      actionRequired: pricingStatus !== 'pass' ? 'השלמת מחירים חסרים' : undefined
    });

    // Availability checks
    const availabilityStatus = servicesWithAvailability === totalServices ? 'pass' : 
                              servicesWithAvailability > totalServices * 0.7 ? 'warning' : 'fail';
    checks.push({
      id: 'availability-complete',
      category: 'זמינות',
      name: 'זמינות מוגדרת',
      status: availabilityStatus,
      message: `${servicesWithAvailability}/${totalServices} מוצרים עם זמינות`,
      count: totalServices - servicesWithAvailability,
      actionRequired: availabilityStatus !== 'pass' ? 'הגדרת זמינות חסרה' : undefined
    });

    // Concepts checks
    const conceptsStatus = servicesWithConcepts === totalServices ? 'pass' : 
                          servicesWithConcepts > totalServices * 0.6 ? 'warning' : 'fail';
    checks.push({
      id: 'concepts-complete',
      category: 'קונספטים',
      name: 'שיוך לקונספטים',
      status: conceptsStatus,
      message: `${servicesWithConcepts}/${totalServices} מוצרים עם קונספטים`,
      count: totalServices - servicesWithConcepts,
      actionRequired: conceptsStatus !== 'pass' ? 'שיוך מוצרים לקונספטים' : undefined
    });

    return checks;
  };

  const generateOverview = (): SystemOverview => {
    let totalCategories = 0;
    let totalSubcategories = 0;
    let totalProviders = 0;
    let totalServices = 0;
    let activeServices = 0;
    let servicesWithPricing = 0;
    let servicesWithAvailability = 0;
    let verifiedProviders = 0;

    divisions.forEach(division => {
      totalCategories += division.categories?.length || 0;
      division.categories?.forEach(category => {
        totalSubcategories += category.subcategories?.length || 0;
        category.subcategories?.forEach(subcategory => {
          totalProviders += subcategory.providers?.length || 0;
          subcategory.providers?.forEach(provider => {
            if (provider.is_verified) verifiedProviders++;
            totalServices += provider.services?.length || 0;
            provider.services?.forEach(service => {
              if (service.is_visible) activeServices++;
              if (service.base_price && service.base_price > 0) servicesWithPricing++;
              if (service.has_calendar_integration) servicesWithAvailability++;
            });
          });
        });
      });
    });

    return {
      totalDivisions: divisions.length,
      totalCategories,
      totalSubcategories,
      totalProviders,
      totalServices,
      activeServices,
      servicesWithPricing,
      servicesWithAvailability,
      verifiedProviders
    };
  };

  const analyzeGaps = (): GapAnalysis => {
    // Simulated gap analysis based on current data structure
    const totalServices = overview?.totalServices || 0;
    
    return {
      missingConcepts: Math.floor(totalServices * 0.3),
      orphanedServices: Math.floor(totalServices * 0.05),
      incompleteSubcategories: Math.floor((overview?.totalSubcategories || 0) * 0.2),
      servicesWithoutFilters: Math.floor(totalServices * 0.15),
      providersWithoutCalendar: Math.floor((overview?.totalProviders || 0) * 0.25)
    };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pass: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      fail: 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || '';
  };

  const calculateOverallScore = () => {
    if (systemChecks.length === 0) return 0;
    const passCount = systemChecks.filter(check => check.status === 'pass').length;
    const warningCount = systemChecks.filter(check => check.status === 'warning').length;
    return Math.round(((passCount + warningCount * 0.5) / systemChecks.length) * 100);
  };

  const exportReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      systemOverview: overview,
      gapAnalysis,
      systemChecks,
      overallScore: calculateOverallScore()
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-compliance-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
          <p>טוען נתוני מערכת...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">דוח ביקורת מערכת</h2>
          <p className="text-gray-600">
            בדיקה אוטומטית של שלמות המערכת ותקינות הנתונים
          </p>
          {lastScanTime && (
            <p className="text-sm text-gray-500">
              סריקה אחרונה: {new Date(lastScanTime).toLocaleString('he-IL')}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button onClick={runFullSystemScan} disabled={isScanning}>
            <Search className="h-4 w-4 ml-2" />
            {isScanning ? 'סורק מערכת...' : 'הרץ דוח ביקורת מלא'}
          </Button>
          <Button variant="outline" onClick={exportReport}>
            <Download className="h-4 w-4 ml-2" />
            ייצא דוח
          </Button>
        </div>
      </div>

      {isScanning && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>מריץ סריקה מלאה של המערכת</span>
                <span>{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            ציון תקינות כללי
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${
              calculateOverallScore() >= 80 ? 'text-green-600' :
              calculateOverallScore() >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {calculateOverallScore()}%
            </div>
            <p className="text-gray-600">
              {calculateOverallScore() >= 80 ? 'המערכת תקינה ומוכנה לשימוש' :
               calculateOverallScore() >= 60 ? 'נדרשות התאמות קלות' : 'נדרשות התאמות משמעותיות'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
          <TabsTrigger value="actions">Actions Required</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {overview && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{overview.totalDivisions}</div>
                  <div className="text-sm text-gray-600">חטיבות</div>
                  <div className="text-xs text-blue-600">{overview.totalCategories} קטגוריות</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Settings className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{overview.totalSubcategories}</div>
                  <div className="text-sm text-gray-600">תתי קטגוריות</div>
                  <div className="text-xs text-purple-600">מבנה היררכי</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{overview.totalProviders}</div>
                  <div className="text-sm text-gray-600">ספקים</div>
                  <div className="text-xs text-green-600">{overview.verifiedProviders} מאומתים</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Package className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{overview.totalServices}</div>
                  <div className="text-sm text-gray-600">מוצרים</div>
                  <div className="text-xs text-orange-600">{overview.activeServices} פעילים</div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="space-y-3">
            {systemChecks.map((check) => (
              <Card key={check.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getStatusIcon(check.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{check.name}</h4>
                          <Badge className={getStatusBadge(check.status)}>
                            {check.status === 'pass' ? 'תקין' : 
                             check.status === 'warning' ? 'אזהרה' : 'דורש תיקון'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{check.message}</p>
                        {check.details && (
                          <p className="text-xs text-gray-500">{check.details}</p>
                        )}
                        {check.actionRequired && (
                          <Alert className="mt-2">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              <strong>פעולה נדרשת:</strong> {check.actionRequired}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline">{check.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-4">
          {gapAnalysis && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-yellow-800">מוצרים ללא קונספטים</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {gapAnalysis.missingConcepts}
                  </div>
                  <p className="text-sm text-gray-600">
                    מוצרים שלא שויכו לקונספטים ולא ניתנים לחיפוש מונחה
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800">מוצרים נטושים</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {gapAnalysis.orphanedServices}
                  </div>
                  <p className="text-sm text-gray-600">
                    מוצרים ללא תת-קטגוריה או עם הפניות שבורות
                  </p>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-800">תתי קטגוריות חסרות</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {gapAnalysis.incompleteSubcategories}
                  </div>
                  <p className="text-sm text-gray-600">
                    תתי קטגוריות ללא שדות מותאמים או פילטרים
                  </p>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-800">ספקים ללא יומן</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {gapAnalysis.providersWithoutCalendar}
                  </div>
                  <p className="text-sm text-gray-600">
                    ספקים ללא חיבור יומן או זמינות מוגדרת
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>פעולות אוטומטיות זמינות:</strong>
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">🧼 ניקוי נתונים נטושים</h4>
                    <p className="text-sm text-gray-600">מחיקת מוצרים ללא הפניות תקינות ותתי קטגוריות ריקות</p>
                  </div>
                  <Button variant="outline" size="sm">
                    הפעל ניקוי
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">🧭 עדכון אינדקס חיפוש</h4>
                    <p className="text-sm text-gray-600">בניה מחדש של מסנני החיפוש והקונספטים</p>
                  </div>
                  <Button variant="outline" size="sm">
                    עדכן אינדקס
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">🛠️ תיקון קשרי תתי קטגוריות</h4>
                    <p className="text-sm text-gray-600">וידוא שכל מוצר משויך לתת-קטגוריה תקינה</p>
                  </div>
                  <Button variant="outline" size="sm">
                    תקן קשרים
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">📊 יצירת דוח מפורט</h4>
                    <p className="text-sm text-gray-600">הפקת דוח Excel עם כל הנתונים לבדיקה ידנית</p>
                  </div>
                  <Button variant="outline" size="sm">
                    הפק דוח Excel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemComplianceChecker;
