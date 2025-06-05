
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  Package, 
  Settings, 
  Database,
  FileText,
  AlertTriangle,
  TrendingUp,
  CheckSquare,
  Target,
  Snowflake
} from 'lucide-react';
import { useUnifiedEventContext } from '@/context/UnifiedEventContext';
import SystemComplianceChecker from './SystemComplianceChecker';
import GapAnalysis from './GapAnalysis';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { providers, services, categories, subcategories } = useUnifiedEventContext();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const handleNavigateToSystemMigration = () => {
    navigate('/admin/system-migration');
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">לוח בקרה מנהל</h1>
        <p className="text-gray-600">ניהול ובקרת המערכת</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
          <TabsTrigger value="providers">ספקים</TabsTrigger>
          <TabsTrigger value="services">שירותים</TabsTrigger>
          <TabsTrigger value="compliance">בדיקת תאימות</TabsTrigger>
          <TabsTrigger value="gaps">ניתוח פערים</TabsTrigger>
          <TabsTrigger value="migration">מעבר למערכת חדשה</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">ספקים כולל</p>
                    <p className="text-3xl font-bold">{providers.length}</p>
                    <p className="text-sm text-green-600">
                      {providers.filter(p => !p.isSimulated).length} אמיתיים
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">שירותים</p>
                    <p className="text-3xl font-bold">{services.length}</p>
                    <p className="text-sm text-green-600">
                      {services.filter(s => s.available).length} זמינים
                    </p>
                  </div>
                  <Package className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">קטגוריות</p>
                    <p className="text-3xl font-bold">{categories.length}</p>
                    <p className="text-sm text-purple-600">
                      {subcategories.length} תתי קטגוריות
                    </p>
                  </div>
                  <Settings className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">תאימות מערכת</p>
                    <p className="text-3xl font-bold">75%</p>
                    <p className="text-sm text-yellow-600">נדרשות התאמות</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  בעיות דחופות
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                    <span className="text-sm">מוצרים ללא מחיר ברור</span>
                    <span className="text-sm font-bold text-red-600">
                      {services.filter(s => !s.price || s.price <= 0).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                    <span className="text-sm">ספקים לא מאומתים</span>
                    <span className="text-sm font-bold text-yellow-600">
                      {providers.filter(p => !p.verified).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                    <span className="text-sm">שירותים לא זמינים</span>
                    <span className="text-sm font-bold text-orange-600">
                      {services.filter(s => !s.available).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  פעולות מומלצות
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('compliance')}
                  >
                    <CheckSquare className="h-4 w-4 ml-2" />
                    בדוק תאימות מערכת
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('gaps')}
                  >
                    <Target className="h-4 w-4 ml-2" />
                    נתח פערים
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('migration')}
                  >
                    <Database className="h-4 w-4 ml-2" />
                    התחל מעבר למערכת חדשה
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="providers">
          {/* קומפוננט ספקים קיים */}
        </TabsContent>

        <TabsContent value="services">
          {/* קומפוננט שירותים קיים */}
        </TabsContent>

        <TabsContent value="compliance">
          <SystemComplianceChecker />
        </TabsContent>

        <TabsContent value="gaps">
          <GapAnalysis />
        </TabsContent>

        <TabsContent value="migration">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Snowflake className="h-5 w-5 text-blue-600" />
                מעבר למערכת החדשה - הקפאה ושינוי מבנה
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Snowflake className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">מעבר מקיף למערכת חדשה</h3>
                <p className="text-gray-600 mb-4">
                  הקפאת המבנה הישן והטמעת המבנה החדש עם קונספטים ושדות מותאמים.
                  הכולל מערכת מקיפה לבדיקת תאימות, ניתוח פערים, ומעבר מסודר.
                </p>
                <Button 
                  onClick={handleNavigateToSystemMigration}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Snowflake className="h-4 w-4 ml-2" />
                  עבור למערכת המעבר המקיפה
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
