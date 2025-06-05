
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Users, 
  Package,
  Settings,
  BarChart3,
  Download
} from 'lucide-react';
import { useUnifiedEventContext } from '@/context/UnifiedEventContext';
import { newSystemManager } from '@/lib/newSystem/newSystemManager';

interface ComplianceCheck {
  id: string;
  category: string;
  requirement: string;
  status: 'pass' | 'warning' | 'fail';
  details: string;
  actionRequired?: string;
}

interface SystemReport {
  totalProviders: number;
  totalServices: number;
  totalCategories: number;
  totalSubcategories: number;
  availableProviders: number;
  verifiedProviders: number;
  servicesWithPricing: number;
  servicesWithAvailability: number;
  complianceScore: number;
  checks: ComplianceCheck[];
}

const SystemComplianceChecker: React.FC = () => {
  const { providers, services, categories, subcategories } = useUnifiedEventContext();
  const [report, setReport] = useState<SystemReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    generateComplianceReport();
  }, [providers, services, categories, subcategories]);

  const generateComplianceReport = () => {
    setIsGenerating(true);
    
    const checks: ComplianceCheck[] = [];
    
    // בדיקת דרישות בסיסיות
    checks.push({
      id: 'pricing-clarity',
      category: 'תמחור',
      requirement: 'כל מוצר חייב מחיר ברור',
      status: services.every(s => s.price && s.price > 0) ? 'pass' : 'fail',
      details: `${services.filter(s => s.price && s.price > 0).length}/${services.length} מוצרים עם מחיר ברור`,
      actionRequired: services.some(s => !s.price || s.price <= 0) ? 'יש לעדכן מחירים חסרים' : undefined
    });

    checks.push({
      id: 'availability-requirement',
      category: 'זמינות',
      requirement: 'כל מוצר חייב זמינות עתידית',
      status: services.every(s => s.available) ? 'pass' : 'warning',
      details: `${services.filter(s => s.available).length}/${services.length} מוצרים זמינים`,
      actionRequired: services.some(s => !s.available) ? 'יש לבדוק זמינות מוצרים' : undefined
    });

    checks.push({
      id: 'provider-verification',
      category: 'ספקים',
      requirement: 'ספקים דורשים אימות',
      status: providers.filter(p => p.verified).length > providers.length * 0.8 ? 'pass' : 'warning',
      details: `${providers.filter(p => p.verified).length}/${providers.length} ספקים מאומתים`,
      actionRequired: 'יש להשלים תהליכי אימות'
    });

    checks.push({
      id: 'category-structure',
      category: 'מבנה',
      requirement: 'היררכיה ברורה: קטגוריות > תתי קטגוריות',
      status: categories.length > 0 && subcategories.length > 0 ? 'pass' : 'fail',
      details: `${categories.length} קטגוריות, ${subcategories.length} תתי קטגוריות`,
      actionRequired: categories.length === 0 || subcategories.length === 0 ? 'יש להשלים מבנה קטגוריות' : undefined
    });

    checks.push({
      id: 'concept-tagging',
      category: 'קונספטים',
      requirement: 'מערכת קונספטים פעילה',
      status: newSystemManager.getConcepts().length > 0 ? 'pass' : 'warning',
      details: `${newSystemManager.getConcepts().length} קונספטים במערכת החדשה`,
      actionRequired: 'יש להתחיל שיוך מוצרים לקונספטים'
    });

    checks.push({
      id: 'immediate-purchase',
      category: 'רכישה',
      requirement: 'רק רכישה מיידית - אין התאמה אישית בלבד',
      status: services.every(s => s.price && s.available) ? 'pass' : 'warning',
      details: 'בדיקה נדרשת לכל מוצר בנפרד',
      actionRequired: 'יש לוודא שאין מוצרים בהתאמה אישית בלבד'
    });

    checks.push({
      id: 'single-subcategory',
      category: 'מבנה',
      requirement: 'כל מוצר משויך לתת-קטגוריה יחידה',
      status: services.every(s => s.subcategoryId) ? 'pass' : 'fail',
      details: `${services.filter(s => s.subcategoryId).length}/${services.length} מוצרים עם שיוך`,
      actionRequired: services.some(s => !s.subcategoryId) ? 'יש לשייך מוצרים לתתי קטגוריות' : undefined
    });

    // חישוב ציון תאימות
    const passCount = checks.filter(c => c.status === 'pass').length;
    const complianceScore = Math.round((passCount / checks.length) * 100);

    const newReport: SystemReport = {
      totalProviders: providers.length,
      totalServices: services.length,
      totalCategories: categories.length,
      totalSubcategories: subcategories.length,
      availableProviders: providers.filter(p => !p.isMock).length,
      verifiedProviders: providers.filter(p => p.verified).length,
      servicesWithPricing: services.filter(s => s.price && s.price > 0).length,
      servicesWithAvailability: services.filter(s => s.available).length,
      complianceScore,
      checks
    };

    setReport(newReport);
    setIsGenerating(false);
  };

  const exportReport = () => {
    if (!report) return;

    const reportData = {
      timestamp: new Date().toISOString(),
      systemStatus: report,
      recommendations: report.checks
        .filter(c => c.actionRequired)
        .map(c => ({ category: c.category, action: c.actionRequired }))
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

  if (!report) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p>טוען דוח תאימות...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">בדיקת תאימות מערכת</h2>
          <p className="text-gray-600">ניתוח מעמיק של המצב הנוכחי מול דרישות מעודכנות</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateComplianceReport} disabled={isGenerating}>
            <BarChart3 className="h-4 w-4 ml-2" />
            {isGenerating ? 'מחשב...' : 'רענן דוח'}
          </Button>
          <Button variant="outline" onClick={exportReport}>
            <Download className="h-4 w-4 ml-2" />
            ייצא דוח
          </Button>
        </div>
      </div>

      {/* ציון תאימות כללי */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            ציון תאימות כללי
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${
              report.complianceScore >= 80 ? 'text-green-600' :
              report.complianceScore >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {report.complianceScore}%
            </div>
            <p className="text-gray-600">
              {report.complianceScore >= 80 ? 'המערכת מתאימה ברובה לדרישות' :
               report.complianceScore >= 60 ? 'נדרשות התאמות' : 'נדרשות התאמות משמעותיות'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
          <TabsTrigger value="compliance">בדיקות תאימות</TabsTrigger>
          <TabsTrigger value="missing">חסרים</TabsTrigger>
          <TabsTrigger value="actions">פעולות נדרשות</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{report.totalProviders}</div>
                <div className="text-sm text-gray-600">ספקים</div>
                <div className="text-xs text-green-600">{report.verifiedProviders} מאומתים</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{report.totalServices}</div>
                <div className="text-sm text-gray-600">מוצרים/שירותים</div>
                <div className="text-xs text-green-600">{report.servicesWithPricing} עם מחיר</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Settings className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{report.totalCategories}</div>
                <div className="text-sm text-gray-600">קטגוריות</div>
                <div className="text-xs text-purple-600">{report.totalSubcategories} תתי קטגוריות</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{newSystemManager.getConcepts().length}</div>
                <div className="text-sm text-gray-600">קונספטים</div>
                <div className="text-xs text-orange-600">במערכת החדשה</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          {report.checks.map((check) => (
            <Card key={check.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getStatusIcon(check.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{check.requirement}</h4>
                        <Badge className={getStatusBadge(check.status)}>
                          {check.status === 'pass' ? 'עובר' : 
                           check.status === 'warning' ? 'אזהרה' : 'נכשל'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{check.details}</p>
                      {check.actionRequired && (
                        <Alert>
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
        </TabsContent>

        <TabsContent value="missing" className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>פונקציונליות חסרה מהדרישות החדשות:</strong>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>שדות מותאמים אישית לתתי קטגוריות</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                כל תת-קטגוריה צריכה שדות מותאמים (חובה/רשות) לפי הצורך הספציפי שלה.
              </p>
              <Badge variant="outline" className="bg-red-50 text-red-700">טרם הוטמע</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>מערכת וריאנטים מתקדמת</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                וריאנטים לפי כמות, מחיר משתנה, זמינות, צבע, מידה וכו'.
              </p>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">חלקי</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>מערכת השהיות עגלה</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                השהיית מוצר: 15 דק בודד, 60 דק חבילה למנויים.
              </p>
              <Badge variant="outline" className="bg-red-50 text-red-700">טרם הוטמע</Badge>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>תוכנית פעולה מומלצת לפי סדר עדיפויות:</strong>
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Card className="border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-red-100 text-red-800">עדיפות גבוהה</Badge>
                  <h4 className="font-medium">השלמת מחירים חסרים</h4>
                </div>
                <p className="text-sm text-gray-600">
                  יש לוודא שלכל מוצר יש מחיר ברור וזמינות עתידית מוגדרת.
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-yellow-100 text-yellow-800">עדיפות בינונית</Badge>
                  <h4 className="font-medium">השלמת תהליך מעבר למערכת החדשה</h4>
                </div>
                <p className="text-sm text-gray-600">
                  הקפאת המבנה הישן והטמעת המבנה החדש עם קונספטים ושדות מותאמים.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-100 text-blue-800">פיתוח עתידי</Badge>
                  <h4 className="font-medium">הוספת פונקציונליות מתקדמת</h4>
                </div>
                <p className="text-sm text-gray-600">
                  מערכת השהיות, וריאנטים מתקדמים, שדות מותאמים אישית.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemComplianceChecker;
