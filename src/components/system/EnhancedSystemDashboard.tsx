
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Settings, 
  CheckCircle, 
  AlertTriangle,
  BarChart3,
  Users,
  Package,
  FileText
} from 'lucide-react';
import SystemComplianceChecker from './SystemComplianceChecker';
import DataInitializer from './DataInitializer';
import { useUpdatedSystemData } from '@/hooks/useUpdatedSystemData';

const EnhancedSystemDashboard: React.FC = () => {
  const { divisions, loading } = useUpdatedSystemData();
  const [selectedTab, setSelectedTab] = useState('initialization');

  const calculateQuickStats = () => {
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

  const stats = calculateQuickStats();

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ניהול מערכת מתקדם</h1>
          <p className="text-gray-600">
            אתחול נתונים ובדיקת תקינות המערכת
          </p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          מצב תחזוקה
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
            <div className="text-sm text-gray-600">קטגוריות</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Settings className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.totalSubcategories}</div>
            <div className="text-sm text-gray-600">תתי קטגוריות</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.totalProviders}</div>
            <div className="text-sm text-gray-600">ספקים</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.totalServices}</div>
            <div className="text-sm text-gray-600">שירותים</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="initialization">אתחול נתונים</TabsTrigger>
          <TabsTrigger value="compliance">בדיקת תקינות</TabsTrigger>
          <TabsTrigger value="maintenance">תחזוקה</TabsTrigger>
        </TabsList>

        <TabsContent value="initialization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                שלב 1: אתחול נתוני בסיס
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataInitializer />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <SystemComplianceChecker />
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                כלי תחזוקה מתקדמים
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500 py-8">
                כלי תחזוקה נוספים יתווספו בקרוב
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedSystemDashboard;
