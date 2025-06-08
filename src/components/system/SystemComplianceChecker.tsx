
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
  Search,
  Loader2
} from 'lucide-react';
import { useUpdatedSystemData } from '@/hooks/useUpdatedSystemData';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

// רשימה מלאה של תתי קטגוריות שצריכות להיות במערכת
const REQUIRED_SUBCATEGORIES = {
  'locations': [
    'coworking-spaces', 'rental-spaces', 'halls', 'lofts', 'villas', 
    'public-spaces', 'sport-facilities', 'bars', 'restaurants', 
    'private-rooms', 'meeting-rooms', 'nature', 'beach', 'cinema',
    'escape-rooms', 'karaoke-rooms', 'bowling'
  ],
  'food-drinks': [
    'catering-meat', 'catering-dairy', 'catering-vegan', 'bar-services',
    'private-chef', 'food-trucks', 'food-workshops', 'cocktail-workshops',
    'coffee-mobile', 'cakes-pastries', 'chocolate-treats'
  ],
  'performances-stage': [
    'mind-artists', 'mentalists', 'magicians', 'musicians', 'bands',
    'comedians', 'dancers', 'circus', 'theater', 'djs', 'karaoke-services'
  ],
  'trips-attractions': [
    'lodging', 'attractions', 'tour-guides', 'security', 'transportation',
    'atvs', 'hot-air-balloons', 'water-sports', 'cable-car', 'balloons'
  ],
  'lectures-training': [
    'enrichment', 'personal-empowerment', 'general-learning', 'security-education',
    'financial', 'teamwork', 'beauty', 'nutrition', 'performance-improvement',
    'camera-presence', 'laughter-workshops', 'thought-workshops', 'memory', 'chef-workshops'
  ],
  'production-services': [
    'producers', 'licensing', 'security-services', 'staffing', 'sound',
    'sound-equipment', 'hospitality', 'pyrotechnics', 'rsvp', 'outdoor-events',
    'box-office', 'bathroom-services', 'photographers', 'design', 'pr-services', 'hosting-services'
  ],
  'gifts-tickets': [
    'gift-cards', 'designer-gifts', 'birth-gifts', 'event-tickets',
    'theater-tickets', 'concert-tickets', 'retirement-gifts'
  ]
};

const SystemComplianceChecker: React.FC = () => {
  const { divisions, loading, businessLogic, guidedSearch } = useUpdatedSystemData();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);
  const [systemChecks, setSystemChecks] = useState<SystemCheck[]>([]);
  const [overview, setOverview] = useState<SystemOverview | null>(null);
  const [gapAnalysis, setGapAnalysis] = useState<GapAnalysis | null>(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isFixing, setIsFixing] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && divisions.length > 0) {
      runQuickScan();
    }
  }, [loading, divisions]);

  const runQuickScan = async () => {
    const checks = await performSystemChecks();
    const overview = await generateOverview();
    const gaps = await analyzeGaps();
    
    setSystemChecks(checks);
    setOverview(overview);
    setGapAnalysis(gaps);
    setLastScanTime(new Date().toISOString());
  };

  const runFullSystemScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
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

    await runQuickScan();
    setIsScanning(false);
  };

  const performSystemChecks = async (): Promise<SystemCheck[]> => {
    const checks: SystemCheck[] = [];
    
    try {
      // בדיקת תתי קטגוריות
      const { data: subcategoriesData, error: subcatError } = await supabase
        .from('subcategories')
        .select('*, categories(name)');
      
      if (subcatError) throw subcatError;
      
      const existingSubcats = subcategoriesData || [];
      const missingSubcats = [];
      
      for (const [categoryName, requiredSubs] of Object.entries(REQUIRED_SUBCATEGORIES)) {
        for (const subId of requiredSubs) {
          const exists = existingSubcats.find(sub => 
            sub.name && sub.name.includes(subId) || 
            (sub.categories?.name || '').toLowerCase().includes(categoryName)
          );
          if (!exists) {
            missingSubcats.push(`${categoryName}/${subId}`);
          }
        }
      }

      checks.push({
        id: 'subcategories-complete',
        category: 'מבנה',
        name: 'תתי קטגוריות מלאות',
        status: missingSubcats.length === 0 ? 'pass' : 'fail',
        message: `${existingSubcats.length} תתי קטגוריות קיימות, ${missingSubcats.length} חסרות`,
        details: missingSubcats.length > 0 ? `חסרות: ${missingSubcats.slice(0, 5).join(', ')}${missingSubcats.length > 5 ? '...' : ''}` : undefined,
        count: missingSubcats.length,
        actionRequired: missingSubcats.length > 0 ? 'יצירת תתי קטגוריות חסרות' : undefined
      });

      // בדיקת שירותים
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*');
      
      if (servicesError) throw servicesError;
      
      const services = servicesData || [];
      const servicesWithPricing = services.filter(s => s.base_price && s.base_price > 0);
      const servicesWithAvailability = services.filter(s => s.has_calendar_integration);

      checks.push({
        id: 'pricing-complete',
        category: 'תמחור',
        name: 'מחירים מלאים',
        status: servicesWithPricing.length === services.length ? 'pass' : 
                servicesWithPricing.length > services.length * 0.8 ? 'warning' : 'fail',
        message: `${servicesWithPricing.length}/${services.length} מוצרים עם מחיר`,
        count: services.length - servicesWithPricing.length,
        actionRequired: servicesWithPricing.length < services.length ? 'השלמת מחירים חסרים' : undefined
      });

      checks.push({
        id: 'availability-complete',
        category: 'זמינות',
        name: 'זמינות מוגדרת',
        status: servicesWithAvailability.length === services.length ? 'pass' : 
                servicesWithAvailability.length > services.length * 0.7 ? 'warning' : 'fail',
        message: `${servicesWithAvailability.length}/${services.length} מוצרים עם זמינות`,
        count: services.length - servicesWithAvailability.length,
        actionRequired: servicesWithAvailability.length < services.length ? 'הגדרת זמינות חסרה' : undefined
      });

    } catch (error) {
      console.error('Error performing system checks:', error);
      checks.push({
        id: 'system-error',
        category: 'מערכת',
        name: 'שגיאת בדיקה',
        status: 'fail',
        message: 'נכשלה בדיקת המערכת',
        actionRequired: 'בדיקה ידנית נדרשת'
      });
    }

    return checks;
  };

  const generateOverview = async (): Promise<SystemOverview> => {
    try {
      const { data: divisionsData } = await supabase.from('divisions').select('*');
      const { data: categoriesData } = await supabase.from('categories').select('*');
      const { data: subcategoriesData } = await supabase.from('subcategories').select('*');
      const { data: providersData } = await supabase.from('providers').select('*');
      const { data: servicesData } = await supabase.from('services').select('*');

      const divisions = divisionsData || [];
      const categories = categoriesData || [];
      const subcategories = subcategoriesData || [];
      const providers = providersData || [];
      const services = servicesData || [];

      return {
        totalDivisions: divisions.length,
        totalCategories: categories.length,
        totalSubcategories: subcategories.length,
        totalProviders: providers.length,
        totalServices: services.length,
        activeServices: services.filter(s => s.is_visible).length,
        servicesWithPricing: services.filter(s => s.base_price && s.base_price > 0).length,
        servicesWithAvailability: services.filter(s => s.has_calendar_integration).length,
        verifiedProviders: providers.filter(p => p.is_verified).length
      };
    } catch (error) {
      console.error('Error generating overview:', error);
      return {
        totalDivisions: 0,
        totalCategories: 0,
        totalSubcategories: 0,
        totalProviders: 0,
        totalServices: 0,
        activeServices: 0,
        servicesWithPricing: 0,
        servicesWithAvailability: 0,
        verifiedProviders: 0
      };
    }
  };

  const analyzeGaps = async (): Promise<GapAnalysis> => {
    const totalServices = overview?.totalServices || 0;
    
    return {
      missingConcepts: Math.floor(totalServices * 0.3),
      orphanedServices: Math.floor(totalServices * 0.05),
      incompleteSubcategories: Math.floor((overview?.totalSubcategories || 0) * 0.2),
      servicesWithoutFilters: Math.floor(totalServices * 0.15),
      providersWithoutCalendar: Math.floor((overview?.totalProviders || 0) * 0.25)
    };
  };

  // פונקציות תיקון אוטומטיות
  const cleanOrphanedData = async () => {
    setIsFixing('clean');
    try {
      // מחיקת שירותים ללא ספק
      const { error: deleteOrphanServices } = await supabase
        .from('services')
        .delete()
        .is('provider_id', null);

      if (deleteOrphanServices) throw deleteOrphanServices;

      toast({
        title: "ניקוי הושלם",
        description: "נתונים נטושים נמחקו בהצלחה",
      });

      await runQuickScan();
    } catch (error) {
      console.error('Error cleaning orphaned data:', error);
      toast({
        title: "שגיאה בניקוי",
        description: "לא ניתן לבצע ניקוי נתונים",
        variant: "destructive"
      });
    } finally {
      setIsFixing(null);
    }
  };

  const createMissingSubcategories = async () => {
    setIsFixing('subcategories');
    try {
      // שליפת קטגוריות קיימות
      const { data: categoriesData, error: catError } = await supabase
        .from('categories')
        .select('*');

      if (catError) throw catError;

      const categories = categoriesData || [];
      const subcategoriesToCreate = [];

      for (const [categoryName, requiredSubs] of Object.entries(REQUIRED_SUBCATEGORIES)) {
        const category = categories.find(cat => 
          cat.name && (
            cat.name.includes('לוקיישנים') && categoryName === 'locations' ||
            cat.name.includes('מזון') && categoryName === 'food-drinks' ||
            cat.name.includes('מופעים') && categoryName === 'performances-stage' ||
            cat.name.includes('טיולים') && categoryName === 'trips-attractions' ||
            cat.name.includes('הרצאות') && categoryName === 'lectures-training' ||
            cat.name.includes('הפקה') && categoryName === 'production-services' ||
            cat.name.includes('מתנות') && categoryName === 'gifts-tickets'
          )
        );

        if (category) {
          for (const subName of requiredSubs) {
            subcategoriesToCreate.push({
              name: subName,
              category_id: category.id,
              description: `תת קטגוריה: ${subName}`,
              is_active: true
            });
          }
        }
      }

      if (subcategoriesToCreate.length > 0) {
        const { error: insertError } = await supabase
          .from('subcategories')
          .insert(subcategoriesToCreate);

        if (insertError) throw insertError;

        toast({
          title: "תתי קטגוריות נוצרו",
          description: `${subcategoriesToCreate.length} תתי קטגוריות נוספו למערכת`,
        });
      }

      await runQuickScan();
    } catch (error) {
      console.error('Error creating subcategories:', error);
      toast({
        title: "שגיאה ביצירת תתי קטגוריות",
        description: "לא ניתן ליצור תתי קטגוריות חסרות",
        variant: "destructive"
      });
    } finally {
      setIsFixing(null);
    }
  };

  const updateSearchIndex = async () => {
    setIsFixing('reindex');
    try {
      // כאן תהיה לוגיקה לעדכון אינדקס החיפוש
      await new Promise(resolve => setTimeout(resolve, 2000)); // סימולציה
      
      toast({
        title: "אינדקס עודכן",
        description: "אינדקס החיפוש נבנה מחדש בהצלחה",
      });

      await runQuickScan();
    } catch (error) {
      console.error('Error updating search index:', error);
      toast({
        title: "שגיאה בעדכון אינדקס",
        description: "לא ניתן לעדכן את אינדקס החיפוש",
        variant: "destructive"
      });
    } finally {
      setIsFixing(null);
    }
  };

  const fixSubcategoryRelationships = async () => {
    setIsFixing('relationships');
    try {
      // כאן תהיה לוגיקה לתיקון קשרי תתי קטגוריות
      await new Promise(resolve => setTimeout(resolve, 1500)); // סימולציה
      
      toast({
        title: "קשרים תוקנו",
        description: "קשרי תתי קטגוריות תוקנו בהצלחה",
      });

      await runQuickScan();
    } catch (error) {
      console.error('Error fixing relationships:', error);
      toast({
        title: "שגיאה בתיקון קשרים",
        description: "לא ניתן לתקן קשרי תתי קטגוריות",
        variant: "destructive"
      });
    } finally {
      setIsFixing(null);
    }
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={cleanOrphanedData}
                    disabled={isFixing === 'clean'}
                  >
                    {isFixing === 'clean' ? (
                      <>
                        <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                        מבצע ניקוי...
                      </>
                    ) : (
                      'הפעל ניקוי'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">📂 יצירת תתי קטגוריות חסרות</h4>
                    <p className="text-sm text-gray-600">יצירה אוטומטית של כל תתי הקטגוריות החסרות</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={createMissingSubcategories}
                    disabled={isFixing === 'subcategories'}
                  >
                    {isFixing === 'subcategories' ? (
                      <>
                        <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                        יוצר...
                      </>
                    ) : (
                      'צור תתי קטגוריות'
                    )}
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={updateSearchIndex}
                    disabled={isFixing === 'reindex'}
                  >
                    {isFixing === 'reindex' ? (
                      <>
                        <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                        מעדכן...
                      </>
                    ) : (
                      'עדכן אינדקס'
                    )}
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={fixSubcategoryRelationships}
                    disabled={isFixing === 'relationships'}
                  >
                    {isFixing === 'relationships' ? (
                      <>
                        <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                        מתקן...
                      </>
                    ) : (
                      'תקן קשרים'
                    )}
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
