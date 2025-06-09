
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

const NewSystemDashboard: React.FC = () => {
  const { categories, concepts, userRole, loading, error, searchServices } = useNewSystemData();

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
  const totalCategories = categories.length;
  const totalSubcategories = categories.reduce((sum, cat) => sum + (cat.subcategories?.length || 0), 0);
  const totalProviders = categories.reduce((sum, cat) => 
    sum + (cat.subcategories?.reduce((subSum, sub) => subSum + (sub.providers?.length || 0), 0) || 0), 0
  );
  const totalServices = categories.reduce((sum, cat) => 
    sum + (cat.subcategories?.reduce((subSum, sub) => 
      subSum + (sub.providers?.reduce((provSum, prov) => provSum + (prov.services?.length || 0), 0) || 0), 0) || 0), 0
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

              <Card>
                <CardContent className="p-4 text-center">
                  <Tag className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">{concepts.length}</div>
                  <div className="text-sm text-gray-600">קונספטים</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="hierarchy" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hierarchy">היררכיה</TabsTrigger>
              <TabsTrigger value="concepts">קונספטים</TabsTrigger>
              <TabsTrigger value="search">חיפוש</TabsTrigger>
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
                  <div className="space-y-4">
                    {categories.map(category => (
                      <div key={category.id} className="border rounded-lg p-4">
                        <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {category.subcategories?.map(subcategory => (
                            <div key={subcategory.id} className="bg-gray-50 p-3 rounded">
                              <div className="font-medium">{subcategory.name}</div>
                              <div className="text-sm text-gray-600">
                                {subcategory.providers?.length || 0} ספקים
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="concepts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    קונספטים במערכת
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {concepts.map(concept => (
                      <div key={concept.id} className="border rounded-lg p-4">
                        <h4 className="font-medium">{concept.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{concept.description}</p>
                        <Badge variant="outline" className="mt-2">{concept.concept_type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
                  <div className="text-center text-gray-500 py-8">
                    חיפוש מתקדם יתווסף בקרוב
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewSystemDashboard;
