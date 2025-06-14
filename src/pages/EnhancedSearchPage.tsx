
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { EnhancedSearchFilters } from '@/components/search/EnhancedSearchFilters';
import { useConceptSystem } from '@/hooks/useConceptSystem';
import { SearchFilters, EnhancedService } from '@/types/conceptSystem';
import { Info, Search, Star } from 'lucide-react';

const EnhancedSearchPage: React.FC = () => {
  const { searchServices, loading } = useConceptSystem();
  const [searchResults, setSearchResults] = useState<EnhancedService[]>([]);
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({});
  const [hasSearched, setHasSearched] = useState(false);

  const handleFiltersChange = (filters: SearchFilters) => {
    setCurrentFilters(filters);
  };

  const handleSearch = async () => {
    setHasSearched(true);
    const results = await searchServices(currentFilters);
    setSearchResults(results);
  };

  const getFilterSummary = () => {
    const parts: string[] = [];
    
    if (currentFilters.main_concept_id) {
      parts.push('קונספט נבחר');
    }
    if (currentFilters.sub_concept_ids?.length) {
      parts.push(`${currentFilters.sub_concept_ids.length} תתי קונספטים`);
    }
    if (currentFilters.target_audience_ids?.length) {
      parts.push(`${currentFilters.target_audience_ids.length} קהלי יעד`);
    }
    if (currentFilters.geographic_area_id) {
      parts.push('אזור גיאוגרפי');
    }
    if (currentFilters.budget_range_id) {
      parts.push('טווח תקציב');
    }
    
    return parts.length > 0 ? parts.join(' • ') : 'ללא סינונים';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8" dir="rtl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">חיפוש מתקדם</h1>
            <p className="text-gray-600">
              חפש שירותים עם מערכת הסינונים החדשה לפי קונספטים, קהל יעד ועוד
            </p>
          </div>

          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              המערכת החדשה כוללת מערכת קונספטים מתקדמת עם 4 קטגוריות ראשיות ועד 25 תתי קונספטים לכל קטגוריה.
              השירותים נדרשים להיות זמינים עם מחיר מוגדר ויומן מחובר.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* פאנל סינון */}
            <div className="lg:col-span-1">
              <EnhancedSearchFilters
                onFiltersChange={handleFiltersChange}
                onSearch={handleSearch}
                loading={loading}
              />
            </div>

            {/* תוצאות חיפוש */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    תוצאות חיפוש
                    {searchResults.length > 0 && (
                      <Badge variant="secondary">
                        {searchResults.length} תוצאות
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    סינונים פעילים: {getFilterSummary()}
                  </p>
                </CardHeader>
                <CardContent>
                  {!hasSearched ? (
                    <div className="text-center py-12">
                      <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-500 mb-2">
                        בחר סינונים וחפש
                      </h3>
                      <p className="text-gray-400">
                        השתמש בפאנל הסינון משמאל כדי לחפש שירותים
                      </p>
                    </div>
                  ) : loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">מחפש שירותים...</p>
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-lg font-medium text-gray-500 mb-2">
                        לא נמצאו תוצאות
                      </h3>
                      <p className="text-gray-400">
                        נסה לשנות את הסינונים או להרחיב את החיפוש
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {searchResults.map(service => (
                        <Card key={service.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="font-semibold text-lg">{service.name}</h3>
                                <p className="text-gray-600 text-sm">
                                  {service.description}
                                </p>
                              </div>
                              {service.base_price && (
                                <Badge variant="outline">
                                  ₪{service.base_price.toLocaleString()}
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {service.location_types.map(type => (
                                <Badge key={type} variant="secondary" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                              {service.service_language.map(lang => (
                                <Badge key={lang} variant="outline" className="text-xs">
                                  {lang}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Star className="h-4 w-4" />
                                  דירוג זמין
                                </span>
                                {service.has_calendar_integration && (
                                  <span className="text-green-600">
                                    יומן מחובר
                                  </span>
                                )}
                              </div>
                              <span>{service.duration_category}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EnhancedSearchPage;
