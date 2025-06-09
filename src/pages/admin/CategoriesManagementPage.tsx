
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUpdatedSystemData } from '@/hooks/useUpdatedSystemData';
import { LayoutDashboard, FolderOpen, Tag } from 'lucide-react';

const CategoriesManagementPage: React.FC = () => {
  const { divisions, loading } = useUpdatedSystemData();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>טוען נתוני קטגוריות...</p>
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
              <h1 className="text-3xl font-bold">ניהול קטגוריות ותתי קטגוריות</h1>
            </div>
            <p className="text-gray-600">
              מערכת ניהול קטגוריות תכלס - סקירה של 5 החטיבות ותתי הקטגוריות
            </p>
          </div>

          <div className="space-y-6">
            {divisions.map((division) => (
              <Card key={division.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FolderOpen className="h-6 w-6 text-blue-600" />
                    <span className="text-xl">{division.name}</span>
                    <Badge variant="secondary">
                      {division.categories?.length || 0} קטגוריות
                    </Badge>
                  </CardTitle>
                  {division.description && (
                    <p className="text-gray-600">{division.description}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {division.categories?.map((category) => (
                      <Card key={category.id} className="bg-gray-50 hover:bg-gray-100 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Tag className="h-4 w-4 text-green-600" />
                            <h3 className="font-semibold">{category.name}</h3>
                            <Badge variant="outline">
                              {category.subcategories?.length || 0} תתי קטגוריות
                            </Badge>
                          </div>
                          {category.description && (
                            <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                          )}
                          
                          {category.subcategories && category.subcategories.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-gray-700">תתי קטגוריות:</h4>
                              <div className="flex flex-wrap gap-1">
                                {category.subcategories.slice(0, 5).map((subcategory) => (
                                  <Badge 
                                    key={subcategory.id} 
                                    variant="secondary" 
                                    className="text-xs"
                                  >
                                    {subcategory.name}
                                  </Badge>
                                ))}
                                {category.subcategories.length > 5 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{category.subcategories.length - 5} נוספות
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* סיכום */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5" />
                סיכום מערכת הקטגוריות
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{divisions.length}</div>
                  <div className="text-sm text-gray-600">חטיבות</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {divisions.reduce((sum, div) => sum + (div.categories?.length || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">קטגוריות</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {divisions.reduce((sum, div) => 
                      sum + (div.categories?.reduce((catSum, cat) => 
                        catSum + (cat.subcategories?.length || 0), 0) || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">תתי קטגוריות</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <div className="text-sm text-gray-600">מוכנות המערכת</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesManagementPage;
