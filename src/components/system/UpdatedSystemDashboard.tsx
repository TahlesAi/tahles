
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, Plus, Filter, Download } from 'lucide-react';
import { useUpdatedSystemData } from '@/hooks/useUpdatedSystemData';
import GuidedSearchForm from './GuidedSearchForm';
import { UpdatedService, GuidedSearchFilters } from '@/types/updatedSystemTypes';

const UpdatedSystemDashboard = () => {
  const { divisions, loading, error, businessLogic, guidedSearch } = useUpdatedSystemData();
  const [searchResults, setSearchResults] = useState<UpdatedService[]>([]);
  const [showGuidedSearch, setShowGuidedSearch] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleGuidedSearch = async (filters: GuidedSearchFilters) => {
    setSearchLoading(true);
    try {
      const results = await guidedSearch(filters);
      // Cast the results to UpdatedService[] to handle type differences
      setSearchResults(results as UpdatedService[]);
      setShowGuidedSearch(false);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg">טוען נתונים...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">שגיאה בטעינת הנתונים</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">מערכת מעודכנת 2024</h1>
        <p className="text-gray-600 mb-6">
          מערכת מעודכנת עם היררכיה חדשה, שדות חובה למוצר ולוגיקה עסקית משופרת
        </p>
        
        <div className="flex gap-4 mb-6">
          <Button onClick={() => setShowGuidedSearch(true)}>
            <Search className="h-4 w-4 ml-2" />
            חיפוש מונחה
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 ml-2" />
            הוסף מוצר
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 ml-2" />
            פילטרים
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 ml-2" />
            ייצא נתונים
          </Button>
        </div>
      </div>

      {showGuidedSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <GuidedSearchForm
            divisions={divisions}
            onSearch={handleGuidedSearch}
            onClose={() => setShowGuidedSearch(false)}
          />
        </div>
      )}

      <Tabs defaultValue="hierarchy" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hierarchy">היררכיה</TabsTrigger>
          <TabsTrigger value="services">שירותים</TabsTrigger>
          <TabsTrigger value="search">תוצאות חיפוש</TabsTrigger>
          <TabsTrigger value="analytics">אנליטיקה</TabsTrigger>
        </TabsList>

        <TabsContent value="hierarchy">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>היררכיית המערכת</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {divisions.map((division) => (
                    <Card key={division.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span>{division.name}</span>
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {division.categories?.length || 0} קטגוריות
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{division.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {division.categories?.map((category) => (
                            <Card key={category.id} className="border border-gray-200">
                              <CardContent className="p-4">
                                <h4 className="font-medium mb-2">{category.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                                <div className="text-xs text-gray-500">
                                  {category.subcategories?.length || 0} תת-קטגוריות
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>שירותים פעילים</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {divisions.flatMap(d => 
                  d.categories?.flatMap(c => 
                    c.subcategories?.flatMap(s => 
                      s.providers?.flatMap(p => p.services || [])
                    ) || []
                  ) || []
                ).map((service) => (
                  <Card key={service.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-gray-600">{service.description}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                              ₪{service.base_price}
                            </span>
                            {service.event_type && (
                              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {service.event_type}
                              </span>
                            )}
                            {service.location_type && (
                              <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                {service.location_type}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          עריכה
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>תוצאות חיפוש מונחה</CardTitle>
            </CardHeader>
            <CardContent>
              {searchLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="mr-2">מחפש...</span>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid gap-4">
                  {searchResults.map((service) => (
                    <Card key={service.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                            ₪{service.base_price}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">לא בוצע חיפוש עדיין</p>
                  <Button 
                    onClick={() => setShowGuidedSearch(true)}
                    className="mt-4"
                  >
                    התחל חיפוש מונחה
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>סטטיסטיקות כלליות</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>חטיבות פעילות:</span>
                    <span className="font-medium">{divisions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>קטגוריות פעילות:</span>
                    <span className="font-medium">
                      {divisions.reduce((sum, d) => sum + (d.categories?.length || 0), 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>שירותים פעילים:</span>
                    <span className="font-medium">
                      {divisions.flatMap(d => 
                        d.categories?.flatMap(c => 
                          c.subcategories?.flatMap(s => 
                            s.providers?.flatMap(p => p.services || [])
                          ) || []
                        ) || []
                      ).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>טווחי משתתפים</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">שירותי הפקה:</p>
                  <div className="text-sm space-y-1">
                    {businessLogic.participantRanges.production.map((range, idx) => (
                      <div key={idx} className="bg-gray-100 px-2 py-1 rounded">{range}</div>
                    ))}
                  </div>
                  <p className="font-medium mt-4">כרטיסים:</p>
                  <div className="text-sm space-y-1">
                    {businessLogic.participantRanges.tickets.map((range, idx) => (
                      <div key={idx} className="bg-gray-100 px-2 py-1 rounded">{range}</div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>כללי עסק</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${businessLogic.requirePricing ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">דרישת מחיר חובה</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${businessLogic.requireCalendarIntegration ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">חיבור יומן חובה</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${businessLogic.hideUnavailableServices ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">הסתרת שירותים לא זמינים</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${businessLogic.allowSpecialProducts ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">מוצרים מיוחדים מותרים</span>
                  </div>
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
