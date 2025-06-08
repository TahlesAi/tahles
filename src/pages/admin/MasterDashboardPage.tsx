
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  LayoutDashboard, 
  Database, 
  BarChart3, 
  Settings, 
  Shield,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import SystemComplianceChecker from '@/components/system/SystemComplianceChecker';
import NewSystemInitializer from '@/components/system/NewSystemInitializer';
import { useUpdatedSystemData } from '@/hooks/useUpdatedSystemData';

const MasterDashboardPage: React.FC = () => {
  const { divisions, loading } = useUpdatedSystemData();
  const [activeTab, setActiveTab] = useState('overview');

  const calculateStats = () => {
    if (loading || !divisions.length) {
      return { totalCategories: 0, totalSubcategories: 0, totalProviders: 0, totalServices: 0 };
    }

    let totalCategories = 0;
    let totalSubcategories = 0;
    let totalProviders = 0;
    let totalServices = 0;

    divisions.forEach(division => {
      totalCategories += division.categories?.length || 0;
      division.categories?.forEach(category => {
        totalSubcategories += category.subcategories?.length || 0;
        category.subcategories?.forEach(subcategory => {
          totalProviders += subcategory.providers?.length || 0;
          subcategory.providers?.forEach(provider => {
            totalServices += provider.services?.length || 0;
          });
        });
      });
    });

    return { totalCategories, totalSubcategories, totalProviders, totalServices };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>טוען מערכת ניהול...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8" dir="rtl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <LayoutDashboard className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold">מערכת ניהול תכלס החדשה</h1>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                מבנה חדש
              </Badge>
            </div>
            
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>מבנה חדש:</strong> 5 חטיבות עם קטגוריות ותתי קטגוריות מובנות
              </AlertDescription>
            </Alert>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <Database className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{divisions.length}</div>
                <div className="text-sm text-gray-600">חטיבות</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Settings className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalCategories}</div>
                <div className="text-sm text-gray-600">קטגוריות</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalSubcategories}</div>
                <div className="text-sm text-gray-600">תתי קטגוריות</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Shield className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalProviders}</div>
                <div className="text-sm text-gray-600">ספקים</div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
              <TabsTrigger value="system-check">בדיקת מערכת</TabsTrigger>
              <TabsTrigger value="system-health">תקינות מערכת</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>מצב המערכת החדשה</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">נתוני מערכת:</h4>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span>חטיבות פעילות</span>
                        <Badge variant="secondary">{divisions.length}</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span>סך קטגוריות</span>
                        <Badge variant="secondary">{stats.totalCategories}</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span>סך תתי קטגוריות</span>
                        <Badge variant="secondary">{stats.totalSubcategories}</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">חטיבות במערכת:</h4>
                      {divisions.map((division, index) => (
                        <div key={division.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span>{division.name}</span>
                          <Badge variant="outline">{division.categories?.length || 0} קטגוריות</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system-check" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    בדיקת המערכת החדשה
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <NewSystemInitializer />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system-health" className="space-y-4">
              <SystemComplianceChecker />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MasterDashboardPage;
