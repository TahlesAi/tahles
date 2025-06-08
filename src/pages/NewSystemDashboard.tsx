
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  LayoutDashboard, 
  Building, 
  Tag, 
  Search, 
  Settings, 
  BarChart3,
  Users,
  CheckCircle
} from 'lucide-react';
import { useNewSystemData } from '@/hooks/useNewSystemData';
import HierarchyNavigator from '@/components/system/HierarchyNavigator';
import ConceptManager from '@/components/system/ConceptManager';

const NewSystemDashboard: React.FC = () => {
  const { divisions, concepts, userRole, loading, error, searchServices } = useNewSystemData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>טוען את המערכת החדשה...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const isAdmin = userRole?.role === 'מנהל-על' || userRole?.role === 'מנהל';

  // סטטיסטיקות מערכת
  const totalCategories = divisions.reduce((sum, div) => sum + (div.categories?.length || 0), 0);
  const totalSubcategories = divisions.reduce((sum, div) => 
    sum + (div.categories?.reduce((catSum, cat) => catSum + (cat.subcategories?.length || 0), 0) || 0), 0
  );
  const totalProviders = divisions.reduce((sum, div) => 
    sum + (div.categories?.reduce((catSum, cat) => 
      catSum + (cat.subcategories?.reduce((subSum, sub) => subSum + (sub.providers?.length || 0), 0) || 0), 0) || 0), 0
  );
  const totalServices = divisions.reduce((sum, div) => 
    sum + (div.categories?.reduce((catSum, cat) => 
      catSum + (cat.subcategories?.reduce((subSum, sub) => 
        subSum + (sub.providers?.reduce((provSum, prov) => provSum + (prov.services?.length || 0), 0) || 0), 0) || 0), 0) || 0), 0
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8" dir="rtl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <LayoutDashboard className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold">מערכת תכלס החדשה</h1>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                מבנה מעודכן
              </Badge>
            </div>
            
            {userRole && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>תפקיד משתמש:</strong> {userRole.role} | 
                  המערכת החדשה פועלת עם היררכיה מעודכנת וכללי תצוגה חכמים
                </AlertDescription>
              </Alert>
            )}

            {/* סטטיסטיקות מהירות */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Building className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">{divisions.length}</div>
                  <div className="text-sm text-gray-600">חטיבות פעילות</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">{totalCategories}</div>
                  <div className="text-sm text-gray-600">קטגוריות</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold">{totalProviders}</div>
                  <div className="text-sm text-gray-600">ספקים פעילים</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Settings className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-2xl font-bold">{totalServices}</div>
                  <div className="text-sm text-gray-600">שירותים זמינים</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="hierarchy" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="hierarchy">היררכיה</TabsTrigger>
              <TabsTrigger value="concepts">קונספטים</TabsTrigger>
              <TabsTrigger value="search">חיפוש</TabsTrigger>
              {isAdmin && <TabsTrigger value="management">ניהול</TabsTrigger>}
            </TabsList>

            <TabsContent value="hierarchy" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    מבנה היררכי של המערכת
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <HierarchyNavigator 
                    divisions={divisions}
                    userRole={userRole?.role}
                    onSearch={searchServices}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="concepts" className="mt-6">
              <ConceptManager 
                concepts={concepts}
                userRole={userRole?.role}
              />
            </TabsContent>

            <TabsContent value="search" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    חיפוש מתקדם במערכת
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <HierarchyNavigator 
                    divisions={divisions}
                    userRole={userRole?.role}
                    onSearch={searchServices}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {isAdmin && (
              <TabsContent value="management" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>ניהול מערכת</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">כללי תצוגה פעילים</h4>
                          <ul className="text-sm space-y-1 text-gray-600">
                            <li>✓ חטיבות מוצגות רק עם קטגוריות פעילות</li>
                            <li>✓ קטגוריות מוצגות רק עם תתי-קטגוריות פעילות</li>
                            <li>✓ תתי-קטגוריות מוצגות רק עם מוצרים זמינים</li>
                            <li>✓ ספקים מוצגים רק עם שירותים פעילים</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">הרשאות מערכת</h4>
                          <ul className="text-sm space-y-1 text-gray-600">
                            <li>• מנהל-על: כל ההרשאות</li>
                            <li>• מנהל: אישור קונספטים ותגיות</li>
                            <li>• ספק: הוספת מוצרים ותיוג</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>סטטוס מערכת</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span>מבנה היררכי</span>
                          <Badge variant="default">תקין</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span>כללי תצוגה</span>
                          <Badge variant="default">פעילים</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span>מערכת קונספטים</span>
                          <Badge variant="default">פעילה</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span>סך כל קונספטים</span>
                          <Badge variant="secondary">{concepts.length}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewSystemDashboard;
