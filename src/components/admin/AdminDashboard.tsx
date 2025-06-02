
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
  MapPin
} from "lucide-react";
import { 
  consolidatedProviders, 
  consolidatedProducts, 
  consolidatedCalendars,
  validateDataIntegrity 
} from "@/lib/consolidatedMockData";
import { hebrewHierarchy } from "@/lib/hebrewHierarchyData";

const AdminDashboard = () => {
  const [validationResults, setValidationResults] = useState<any>(null);
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    // בצע בדיקת תקינות נתונים
    const results = validateDataIntegrity();
    setValidationResults(results);

    // חישוב סטטיסטיקות
    const providersWithCalendar = consolidatedProviders.filter(p => 
      p.calendarActive && consolidatedCalendars.some(c => c.providerId === p.id)
    ).length;

    const availableProducts = consolidatedProducts.filter(p => p.available).length;
    const featuredProducts = consolidatedProducts.filter(p => p.featured && p.available).length;

    setStats({
      totalProviders: consolidatedProviders.length,
      activeProviders: consolidatedProviders.filter(p => p.calendarActive).length,
      providersWithCalendar,
      totalProducts: consolidatedProducts.length,
      availableProducts,
      featuredProducts,
      categories: hebrewHierarchy.categories.length,
      subcategories: hebrewHierarchy.categories.reduce((sum, cat) => sum + (cat.subcategories?.length || 0), 0)
    });
  }, []);

  const ProvidersOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">סה"כ ספקים</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProviders}</div>
          <p className="text-xs text-muted-foreground">
            {stats.activeProviders} פעילים
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
            מתוך {stats.activeProviders} פעילים
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">מוצרים זמינים</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.availableProducts}</div>
          <p className="text-xs text-muted-foreground">
            {stats.featuredProducts} מומלצים
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const CategoryHierarchy = () => (
    <div className="space-y-4">
      {hebrewHierarchy.categories.map(category => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 ml-2" />
              {category.name}
              <Badge variant="secondary" className="mr-2">
                {category.subcategories?.length || 0} תתי קטגוריות
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {category.subcategories?.map(subcategory => {
                const productsCount = consolidatedProducts.filter(p => 
                  p.subcategoryId === subcategory.id && p.available
                ).length;
                const providersCount = consolidatedProviders.filter(p => 
                  p.categories.includes(subcategory.id)
                ).length;
                
                return (
                  <div key={subcategory.id} className="p-3 border rounded-lg">
                    <div className="font-medium text-sm">{subcategory.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {providersCount} ספקים, {productsCount} מוצרים
                    </div>
                    {productsCount === 0 && (
                      <Badge variant="destructive" className="mt-1">
                        אין מוצרים
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const DataIntegrityReport = () => (
    <div className="space-y-4">
      {validationResults && (
        <Alert variant={validationResults.isValid ? "default" : "destructive"}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {validationResults.isValid 
              ? "כל הנתונים תקינים ומשויכים כראוי"
              : `נמצאו ${validationResults.issues.length} בעיות בתקינות הנתונים`
            }
          </AlertDescription>
        </Alert>
      )}

      {validationResults?.issues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <XCircle className="h-5 w-5 ml-2" />
              בעיות שנמצאו
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {validationResults.issues.map((issue: string, index: number) => (
                <li key={index} className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 ml-2" />
                  <span className="text-sm">{issue}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>סטטיסטיקות מערכת</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded">
              <div className="text-2xl font-bold">{stats.categories}</div>
              <div className="text-sm text-gray-500">קטגוריות ראשיות</div>
            </div>
            <div className="text-center p-4 border rounded">
              <div className="text-2xl font-bold">{stats.subcategories}</div>
              <div className="text-sm text-gray-500">תתי קטגוריות</div>
            </div>
            <div className="text-center p-4 border rounded">
              <div className="text-2xl font-bold">{stats.totalProviders}</div>
              <div className="text-sm text-gray-500">סה"כ ספקים</div>
            </div>
            <div className="text-center p-4 border rounded">
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <div className="text-sm text-gray-500">סה"כ מוצרים</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ProvidersWithoutCalendar = () => {
    const providersWithoutCalendar = consolidatedProviders.filter(provider => 
      provider.calendarActive && !consolidatedCalendars.some(c => c.providerId === provider.id)
    );

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 ml-2 text-amber-500" />
            ספקים פעילים ללא יומן זמינות
          </CardTitle>
        </CardHeader>
        <CardContent>
          {providersWithoutCalendar.length === 0 ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 ml-2" />
              כל הספקים הפעילים יש להם יומן זמינות
            </div>
          ) : (
            <div className="space-y-3">
              {providersWithoutCalendar.map(provider => (
                <div key={provider.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">{provider.name}</div>
                    <div className="text-sm text-gray-500">{provider.email}</div>
                  </div>
                  <Button size="sm" variant="outline">
                    צור יומן
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">דשבורד אדמין - ניהול היררכיה</h1>
        <p className="text-gray-600">מעקב ובקרה על תקינות המבנה והנתונים במערכת</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
          <TabsTrigger value="hierarchy">היררכיית קטגוריות</TabsTrigger>
          <TabsTrigger value="integrity">תקינות נתונים</TabsTrigger>
          <TabsTrigger value="calendars">ניהול יומנים</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ProvidersOverview />
        </TabsContent>

        <TabsContent value="hierarchy">
          <CategoryHierarchy />
        </TabsContent>

        <TabsContent value="integrity">
          <DataIntegrityReport />
        </TabsContent>

        <TabsContent value="calendars">
          <ProvidersWithoutCalendar />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
