
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Building, 
  Sparkles, 
  Gift, 
  Ticket, 
  TentTree,
  Users,
  Package,
  Settings,
  BarChart3,
  Shield,
  Database,
  Eye,
  Plus
} from 'lucide-react';
import { MAIN_DIVISIONS, Division } from '@/types/adminHierarchy';

const SystemDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('divisions');
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);

  const divisionStats = {
    'div-productions': { categories: 3, subcategories: 12, providers: 45, products: 178 },
    'div-enrichment': { categories: 2, subcategories: 8, providers: 23, products: 89 },
    'div-gifts': { categories: 2, subcategories: 6, providers: 15, products: 67 },
    'div-tickets': { categories: 1, subcategories: 4, providers: 8, products: 34 },
    'div-trips': { categories: 2, subcategories: 7, providers: 19, products: 56 }
  };

  const getIconComponent = (iconName: string) => {
    const icons = {
      Building,
      Sparkles, 
      Gift,
      Ticket,
      TentTree
    };
    return icons[iconName as keyof typeof icons] || Building;
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">דשבורד ניהול מתקדם</h1>
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            מערכת חטיבות
          </Badge>
        </div>
        
        <Alert className="mb-6">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>מבנה היררכי חדש:</strong> חטיבה → קטגוריה → תת-קטגוריה → ספק → מוצר
          </AlertDescription>
        </Alert>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="divisions">חטיבות</TabsTrigger>
          <TabsTrigger value="analytics">אנליטיקה</TabsTrigger>
          <TabsTrigger value="validation">ולידציה</TabsTrigger>
          <TabsTrigger value="settings">הגדרות</TabsTrigger>
          <TabsTrigger value="reports">דוחות</TabsTrigger>
        </TabsList>

        <TabsContent value="divisions">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {MAIN_DIVISIONS.map((division) => {
              const IconComponent = getIconComponent(division.icon);
              const stats = divisionStats[division.id as keyof typeof divisionStats];
              
              return (
                <Card key={division.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{division.name}</CardTitle>
                          <p className="text-sm text-gray-600">{division.description}</p>
                        </div>
                      </div>
                      <Badge variant={division.isActive ? "default" : "secondary"}>
                        {division.isActive ? "פעיל" : "לא פעיל"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{stats.categories}</div>
                        <div className="text-xs text-gray-600">קטגוריות</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{stats.subcategories}</div>
                        <div className="text-xs text-gray-600">תת-קטגוריות</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{stats.providers}</div>
                        <div className="text-xs text-gray-600">ספקים</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{stats.products}</div>
                        <div className="text-xs text-gray-600">מוצרים</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setSelectedDivision(division)}
                      >
                        <Eye className="h-4 w-4 ml-1" />
                        צפה
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Plus className="h-4 w-4 ml-1" />
                        הוסף
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  סטטיסטיקות כלליות
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span>סך הכל חטיבות</span>
                    <Badge variant="secondary">5</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>סך הכל קטגוריות</span>
                    <Badge variant="secondary">10</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span>סך הכל תת-קטגוריות</span>
                    <Badge variant="secondary">37</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span>סך הכל ספקים</span>
                    <Badge variant="secondary">110</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span>סך הכל מוצרים</span>
                    <Badge variant="secondary">424</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  מצב המערכת
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>אימות SMS</span>
                    <Badge variant="default">פעיל</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>מערכת Wishlist</span>
                    <Badge variant="default">פעיל</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>השוואת מוצרים</span>
                    <Badge variant="default">פעיל</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>אימות ת"ז ספקים</span>
                    <Badge variant="default">פעיל</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>חיוב מיידי</span>
                    <Badge variant="secondary">בהמתנה</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="validation">
          <Card>
            <CardHeader>
              <CardTitle>בדיקות תקינות מערכת</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="border-green-200 bg-green-50">
                  <Shield className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>מבנה היררכי:</strong> תקין - כל 5 החטיבות מוגדרות כראוי
                  </AlertDescription>
                </Alert>
                
                <Alert className="border-green-200 bg-green-50">
                  <Shield className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>קונספטים:</strong> תקין - 30 קונספטים פעילים
                  </AlertDescription>
                </Alert>
                
                <Alert className="border-yellow-200 bg-yellow-50">
                  <Shield className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>אינטגרציות:</strong> חלקי - CRM ועוד אינטגרציות נדרשות
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>הגדרות מערכת</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">חוקי ולידציה</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked readOnly />
                      <span>אימות SMS חובה</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>חסימת מוצרים לא מובנים</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>דוחות מערכת</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">
                  <Database className="h-4 w-4 ml-2" />
                  דוח חטיבות מלא
                </Button>
                <Button variant="outline">
                  <Users className="h-4 w-4 ml-2" />
                  דוח ספקים
                </Button>
                <Button variant="outline">
                  <Package className="h-4 w-4 ml-2" />
                  דוח מוצרים
                </Button>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 ml-2" />
                  דוח ביצועים
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemDashboard;
