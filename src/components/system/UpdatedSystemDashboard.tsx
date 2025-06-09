
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  Package, 
  Settings,
  Search,
  Shield,
  FileText 
} from 'lucide-react';
import { useUpdatedSystemData } from '@/hooks/useUpdatedSystemData';
import SystemComplianceChecker from './SystemComplianceChecker';
import { GuidedSearchFilters } from '@/types/updatedSystemTypes';

const UpdatedSystemDashboard: React.FC = () => {
  const { categories, loading, businessLogic, guidedSearch } = useUpdatedSystemData();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showGuidedSearch, setShowGuidedSearch] = useState(false);

  const calculateStats = () => {
    let totalCategories = categories.length;
    let totalSubcategories = 0;
    let totalProviders = 0;
    let totalServices = 0;
    let activeServices = 0;

    categories.forEach(category => {
      totalSubcategories += category.subcategories?.length || 0;
      category.subcategories?.forEach(subcategory => {
        totalProviders += subcategory.providers?.length || 0;
        subcategory.providers?.forEach(provider => {
          totalServices += provider.services?.length || 0;
          provider.services?.forEach(service => {
            if (service.available && service.price) {
              activeServices++;
            }
          });
        });
      });
    });

    return {
      totalCategories,
      totalSubcategories,
      totalProviders,
      totalServices,
      activeServices
    };
  };

  const handleGuidedSearch = async (filters: GuidedSearchFilters) => {
    console.log('מבצע חיפוש מונחה:', filters);
    const results = await guidedSearch(filters);
    console.log('תוצאות חיפוש:', results);
    setShowGuidedSearch(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>טוען נתוני מערכת מעודכנת...</p>
        </div>
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">מערכת מעודכנת 2024</h1>
          <p className="text-gray-600">לוח הבקרה החדש עם היררכיה משופרת ותכונות מתקדמות</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          גרסה 2.0
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Settings className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
            <div className="text-sm text-gray-600">קטגוריות</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
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
            <div className="text-sm text-gray-600">מוצרים</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.activeServices}</div>
            <div className="text-sm text-gray-600">פעילים</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
          <TabsTrigger value="compliance">ביקורת מערכת</TabsTrigger>
          <TabsTrigger value="hierarchy">היררכיה</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>מבנה המערכת החדש</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  המערכת החדשה בנויה על היררכיה של: קטגוריה → תת-קטגוריה → ספק → מוצר
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">קטגוריות ראשיות:</h4>
                    <ul className="text-sm space-y-1">
                      {categories.slice(0, 6).map(category => (
                        <li key={category.id}>• {category.name}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">תכונות חדשות:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• חיפוש מונחה משולב</li>
                      <li>• שדות מותאמים לכל תת-קטגוריה</li>
                      <li>• מערכת קונספטים מתקדמת</li>
                      <li>• ביקורת אוטומטית של המערכת</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <SystemComplianceChecker />
        </TabsContent>

        <TabsContent value="hierarchy" className="space-y-4">
          {categories.map(category => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {category.subcategories?.map(subcategory => (
                      <div key={subcategory.id} className="bg-gray-50 p-2 rounded text-sm">
                        <div className="font-medium">{subcategory.name}</div>
                        <div className="text-gray-600 text-xs">
                          {subcategory.providers?.length || 0} ספקים
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UpdatedSystemDashboard;
