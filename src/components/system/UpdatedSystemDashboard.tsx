
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Grid, 
  List,
  Heart,
  Settings,
  BarChart,
  Building,
  Sparkles,
  Ticket,
  Gift
} from 'lucide-react';
import { useUpdatedSystemData } from '@/hooks/useUpdatedSystemData';
import GuidedSearchForm from './GuidedSearchForm';
import { UpdatedService, GuidedSearchFilters } from '@/types/updatedSystemTypes';

const UpdatedSystemDashboard: React.FC = () => {
  const { divisions, loading, error, guidedSearch, businessLogic } = useUpdatedSystemData();
  const [showGuidedSearch, setShowGuidedSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<UpdatedService[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleGuidedSearch = async (filters: GuidedSearchFilters) => {
    const results = await guidedSearch(filters);
    setSearchResults(results);
    setShowGuidedSearch(false);
  };

  const getIconComponent = (iconName: string) => {
    const icons = { Building, Sparkles, Ticket, Gift };
    return icons[iconName as keyof typeof icons] || Building;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>טוען את המערכת המעודכנת...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-600">שגיאה: {error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              נסה שוב
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6" dir="rtl">
      {showGuidedSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <GuidedSearchForm
            divisions={divisions}
            onSearch={handleGuidedSearch}
            onClose={() => setShowGuidedSearch(false)}
          />
        </div>
      )}

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">מערכת תכל'ס מעודכנת</h1>
            <p className="text-gray-600">
              מערכת מלאה עם היררכיה, שדות חובה וחיפוש מונחה
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={() => setShowGuidedSearch(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Search className="h-4 w-4 ml-2" />
              חיפוש מונחה
            </Button>
            
            <Button variant="outline">
              <Heart className="h-4 w-4 ml-2" />
              Wishlist
            </Button>
          </div>
        </div>

        {/* סטטיסטיקות מהירות */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">חטיבות פעילות</p>
                  <p className="text-2xl font-bold">{divisions.length}</p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">קטגוריות</p>
                  <p className="text-2xl font-bold">
                    {divisions.reduce((sum, div) => sum + (div.categories?.length || 0), 0)}
                  </p>
                </div>
                <Grid className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">ספקים פעילים</p>
                  <p className="text-2xl font-bold">
                    {divisions.reduce((sum, div) => 
                      sum + (div.categories?.reduce((catSum, cat) => 
                        catSum + (cat.subcategories?.reduce((subSum, sub) => 
                          subSum + (sub.providers?.length || 0), 0) || 0), 0) || 0), 0)}
                  </p>
                </div>
                <BarChart className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">שירותים זמינים</p>
                  <p className="text-2xl font-bold">
                    {divisions.reduce((sum, div) => 
                      sum + (div.categories?.reduce((catSum, cat) => 
                        catSum + (cat.subcategories?.reduce((subSum, sub) => 
                          subSum + (sub.providers?.reduce((provSum, prov) => 
                            provSum + (prov.services?.length || 0), 0) || 0), 0) || 0), 0) || 0), 0)}
                  </p>
                </div>
                <Sparkles className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="hierarchy" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hierarchy">היררכיה</TabsTrigger>
          <TabsTrigger value="search">תוצאות חיפוש</TabsTrigger>
          <TabsTrigger value="settings">הגדרות מערכת</TabsTrigger>
        </TabsList>

        <TabsContent value="hierarchy">
          <div className="space-y-6">
            {divisions.map(division => {
              const IconComponent = getIconComponent(division.icon);
              
              return (
                <Card key={division.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl">{division.name}</h3>
                        <p className="text-sm text-gray-600 font-normal">
                          {division.description}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {division.categories?.length || 0} קטגוריות
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {division.categories?.map(category => (
                        <Card key={category.id} className="border border-gray-200">
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">{category.name}</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              {category.description}
                            </p>
                            
                            <div className="space-y-2">
                              {category.subcategories?.map(subcategory => (
                                <div key={subcategory.id} className="flex items-center justify-between text-sm">
                                  <span>{subcategory.name}</span>
                                  <Badge variant="outline">
                                    {subcategory.providers?.length || 0} ספקים
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>תוצאות חיפוש</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {searchResults.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">אין תוצאות חיפוש</h3>
                  <p className="text-gray-600 mb-4">
                    בצע חיפוש מונחה כדי לראות תוצאות
                  </p>
                  <Button onClick={() => setShowGuidedSearch(true)}>
                    <Search className="h-4 w-4 ml-2" />
                    התחל חיפוש
                  </Button>
                </div>
              ) : (
                <div className={`grid gap-4 ${
                  viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
                }`}>
                  {searchResults.map(service => (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {service.main_image && (
                            <img 
                              src={service.main_image} 
                              alt={service.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-grow">
                            <h4 className="font-medium mb-1">{service.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {service.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">
                                ₪{service.base_price}
                              </Badge>
                              <Button size="sm">
                                <Heart className="h-3 w-3 ml-1" />
                                הוסף
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>כללי עסקיים</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">טווחי משתתפים - הפקות</h4>
                  <div className="flex flex-wrap gap-2">
                    {businessLogic.participantRanges.production.map(range => (
                      <Badge key={range} variant="outline">{range}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">טווחי משתתפים - כרטיסים</h4>
                  <div className="flex flex-wrap gap-2">
                    {businessLogic.participantRanges.tickets.map(range => (
                      <Badge key={range} variant="outline">{range}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>כללי תצוגה</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { key: 'hideUnavailableServices', label: 'הסתר שירותים לא זמינים' },
                    { key: 'requirePricing', label: 'דרוש מחיר לכל שירות' },
                    { key: 'requireCalendarIntegration', label: 'דרוש חיבור יומן' },
                    { key: 'allowSpecialProducts', label: 'אפשר מוצרים מיוחדים' }
                  ].map(rule => (
                    <div key={rule.key} className="flex items-center justify-between">
                      <span className="text-sm">{rule.label}</span>
                      <Badge variant={businessLogic[rule.key as keyof typeof businessLogic] ? 'default' : 'secondary'}>
                        {businessLogic[rule.key as keyof typeof businessLogic] ? 'פעיל' : 'כבוי'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UpdatedSystemDashboard;
