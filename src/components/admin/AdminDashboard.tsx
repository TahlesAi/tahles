
// עדכון דשבורד האדמין לשימוש בנתונים המורחבים
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Calendar, 
  Users, 
  Package, 
  TrendingUp,
  Database,
  MapPin,
  Settings
} from "lucide-react";
import { 
  enhancedCategoryHierarchy,
  allEnhancedProviders,
  allEnhancedServices,
  diagnoseDataIntegrity 
} from '@/lib/enhancedConsolidatedData';
import DataIntegrityMonitor from './DataIntegrityMonitor';

const AdminDashboard = () => {
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    // בצע בדיקת תקינות נתונים
    const results = diagnoseDataIntegrity();
    setDiagnostics(results);

    // חישוב סטטיסטיקות מורחבות
    const providersWithCalendar = allEnhancedProviders.filter(p => p.hasAvailableCalendar).length;
    const availableServices = allEnhancedServices.filter(s => s.available).length;
    const featuredServices = allEnhancedServices.filter(s => s.featured && s.available).length;
    const simulatedProviders = allEnhancedProviders.filter(p => p.isSimulated).length;
    const simulatedServices = allEnhancedServices.filter(s => s.isSimulated).length;

    setStats({
      totalCategories: enhancedCategoryHierarchy.length,
      totalSubcategories: enhancedCategoryHierarchy.reduce((sum, cat) => sum + cat.subcategories.length, 0),
      totalProviders: allEnhancedProviders.length,
      activeProviders: allEnhancedProviders.filter(p => p.calendarActive).length,
      providersWithCalendar,
      simulatedProviders,
      totalServices: allEnhancedServices.length,
      availableServices,
      featuredServices,
      simulatedServices
    });
  }, []);

  const ProvidersOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">סה"כ ספקים</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProviders}</div>
          <p className="text-xs text-muted-foreground">
            {stats.simulatedProviders} מדומים
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ספקים עם יומן</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.providersWithCalendar}</div>
          <p className="text-xs text-muted-foreground">
            מתוך {stats.totalProviders} ספקים
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">שירותים זמינים</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.availableServices}</div>
          <p className="text-xs text-muted-foreground">
            {stats.featuredServices} מומלצים
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">קטגוריות פעילות</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCategories}</div>
          <p className="text-xs text-muted-foreground">
            {stats.totalSubcategories} תתי קטגוריות
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const CategoryHierarchy = () => (
    <div className="space-y-4">
      {enhancedCategoryHierarchy.map(category => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl ml-2">{category.icon}</span>
                <div>
                  <div>{category.name}</div>
                  <div className="text-sm text-gray-500">{category.description}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">
                  {category.subcategories.length} תתי קטגוריות
                </Badge>
                <Badge variant="outline">
                  {category.subcategories.reduce((sum, sub) => sum + sub.providersCount, 0)} ספקים
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {category.subcategories.slice(0, 12).map(subcategory => (
                <div key={subcategory.id} className="p-3 border rounded-lg hover:bg-gray-50">
                  <div className="font-medium text-sm">{subcategory.name}</div>
                  <div className="text-xs text-gray-500 mt-1 space-y-1">
                    <div>{subcategory.providersCount} ספקים</div>
                    <div>{subcategory.servicesCount} שירותים</div>
                    {subcategory.isSimulated && (
                      <Badge variant="outline" className="text-xs">
                        מדומה
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              {category.subcategories.length > 12 && (
                <div className="p-3 border-2 border-dashed rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-500">
                    +{category.subcategories.length - 12} נוספים
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const SimulatedDataOverview = () => (
    <div className="space-y-6">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          המערכת כוללת נתונים מדומים לצורך הדגמה. נתונים אלו מסומנים בתג "מדומה".
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ספקים מדומים</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>סה"כ ספקים מדומים:</span>
                <Badge variant="secondary">{stats.simulatedProviders}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>אחוז מהסך הכולל:</span>
                <Badge variant="outline">
                  {stats.totalProviders > 0 ? Math.round((stats.simulatedProviders / stats.totalProviders) * 100) : 0}%
                </Badge>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-800">
                  כל ספק מדומה כולל יומן זמינות פעיל ושירות אחד לפחות
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>שירותים מדומים</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>סה"כ שירותים מדומים:</span>
                <Badge variant="secondary">{stats.simulatedServices}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>אחוז מהסך הכולל:</span>
                <Badge variant="outline">
                  {stats.totalServices > 0 ? Math.round((stats.simulatedServices / stats.totalServices) * 100) : 0}%
                </Badge>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-green-800">
                  כל שירות מדומה כולל מחיר, תיאור וזמינות מלאה
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">דשבורד אדמין - ניהול היררכיה מורחב</h1>
        <p className="text-gray-600">מעקב ובקרה על המבנה המורחב והנתונים במערכת תכל'ס</p>
        
        {diagnostics && (
          <div className="mt-4">
            <Alert variant={diagnostics.isHealthy ? "default" : "destructive"}>
              <Database className="h-4 w-4" />
              <AlertDescription>
                {diagnostics.isHealthy 
                  ? "המערכת תקינה - כל הנתונים מאורגנים ומקושרים כראוי"
                  : `נמצאו ${diagnostics.stats.orphanedData.totalOrphaned} בעיות בתקינות הנתונים`
                }
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
          <TabsTrigger value="hierarchy">היררכיית קטגוריות</TabsTrigger>
          <TabsTrigger value="simulated">נתונים מדומים</TabsTrigger>
          <TabsTrigger value="integrity">תקינות נתונים</TabsTrigger>
          <TabsTrigger value="monitoring">מוניטורינג</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ProvidersOverview />
        </TabsContent>

        <TabsContent value="hierarchy">
          <CategoryHierarchy />
        </TabsContent>

        <TabsContent value="simulated">
          <SimulatedDataOverview />
        </TabsContent>

        <TabsContent value="integrity">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  בדיקת תקינות מתקדמת
                </CardTitle>
              </CardHeader>
              <CardContent>
                {diagnostics?.recommendations.length > 0 ? (
                  <div className="space-y-3">
                    {diagnostics.recommendations.map((recommendation: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <span className="text-sm">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>כל הנתונים תקינים ומאורגנים כראוי</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
          <DataIntegrityMonitor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
