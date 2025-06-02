
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUnifiedEventContext } from '@/context/UnifiedEventContext';
import { 
  ArrowRight, 
  Home, 
  ChevronDown, 
  ChevronRight, 
  Users, 
  Package, 
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Calendar,
  Building,
  Star
} from 'lucide-react';

const HierarchyManagement = () => {
  const navigate = useNavigate();
  const { hebrewCategories, providers, services, isLoading } = useUnifiedEventContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // סטטיסטיקות כלליות
  const stats = useMemo(() => {
    const totalSubcategories = hebrewCategories.reduce((sum, cat) => sum + (cat.subcategories?.length || 0), 0);
    const providersWithoutCalendar = providers.filter(p => !p.calendarActive).length;
    const providersWithoutServices = providers.filter(p => !services.some(s => s.providerId === p.id)).length;
    
    return {
      totalCategories: hebrewCategories.length,
      totalSubcategories,
      totalProviders: providers.length,
      totalServices: services.length,
      providersWithoutCalendar,
      providersWithoutServices,
      duplicateProviders: [] // יכול להיות מורכב יותר
    };
  }, [hebrewCategories, providers, services]);

  // פילטור נתונים
  const filteredData = useMemo(() => {
    let filtered = [...hebrewCategories];
    
    if (searchTerm) {
      filtered = filtered.filter(cat => 
        cat.name.includes(searchTerm) ||
        cat.subcategories?.some(sub => sub.name.includes(searchTerm))
      );
    }
    
    return filtered;
  }, [hebrewCategories, searchTerm]);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleSubcategory = (subcategoryId: string) => {
    const newExpanded = new Set(expandedSubcategories);
    if (newExpanded.has(subcategoryId)) {
      newExpanded.delete(subcategoryId);
    } else {
      newExpanded.add(subcategoryId);
    }
    setExpandedSubcategories(newExpanded);
  };

  const getProvidersForSubcategory = (subcategoryId: string) => {
    return providers.filter(provider => 
      provider.subcategoryIds?.includes(subcategoryId) ||
      provider.primaryCategoryId === subcategoryId
    );
  };

  const getServicesForProvider = (providerId: string) => {
    return services.filter(service => service.providerId === providerId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">טוען נתוני היררכיה...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      
      <main className="flex-grow">
        <div className="container px-4 py-6">
          {/* כותרת וניווט */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <Home className="h-4 w-4 ml-2" />
                חזרה לדף הבית
              </Button>
              <h1 className="text-3xl font-bold">ניהול היררכיית הנתונים</h1>
            </div>
            
            <p className="text-gray-600">
              תצוגה מלאה של מבנה הקטגוריות, תתי הקטגוריות, הספקים והשירותים במערכת
            </p>
          </div>

          {/* סטטיסטיקות כלליות */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalCategories}</div>
                <div className="text-sm text-gray-600">קטגוריות ראשיות</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.totalSubcategories}</div>
                <div className="text-sm text-gray-600">תתי קטגוריות</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.totalProviders}</div>
                <div className="text-sm text-gray-600">ספקים</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.totalServices}</div>
                <div className="text-sm text-gray-600">שירותים</div>
              </CardContent>
            </Card>
          </div>

          {/* אזהרות ובעיות */}
          {(stats.providersWithoutCalendar > 0 || stats.providersWithoutServices > 0) && (
            <Card className="mb-8 border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle className="h-5 w-5" />
                  בעיות שנמצאו במערכת
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {stats.providersWithoutCalendar > 0 && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-yellow-600" />
                    <span>{stats.providersWithoutCalendar} ספקים ללא יומן פעיל</span>
                  </div>
                )}
                {stats.providersWithoutServices > 0 && (
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-yellow-600" />
                    <span>{stats.providersWithoutServices} ספקים ללא שירותים</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* עמודה שמאלית - היררכיה */}
            <div className="lg:col-span-2 space-y-4">
              {/* כלי חיפוש וסינון */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="חיפוש קטגוריות ותתי קטגוריות..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="סינון" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">הכל</SelectItem>
                        <SelectItem value="no-calendar">ללא יומן</SelectItem>
                        <SelectItem value="no-services">ללא שירותים</SelectItem>
                        <SelectItem value="duplicates">כפילויות</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* תצוגת היררכיה */}
              <div className="space-y-4">
                {filteredData.map((category) => (
                  <Card key={category.id}>
                    <CardContent className="p-4">
                      {/* קטגוריה ראשית */}
                      <div 
                        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <div className="flex items-center gap-3">
                          {expandedCategories.has(category.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <div className="text-2xl">{category.icon}</div>
                          <div>
                            <h3 className="font-semibold">{category.name}</h3>
                            <p className="text-sm text-gray-600">{category.description}</p>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {category.subcategories?.length || 0} תתי קטגוריות
                        </Badge>
                      </div>

                      {/* תתי קטגוריות */}
                      {expandedCategories.has(category.id) && (
                        <div className="mr-8 mt-4 space-y-3">
                          {category.subcategories?.map((subcategory) => {
                            const subcategoryProviders = getProvidersForSubcategory(subcategory.id);
                            return (
                              <div key={subcategory.id} className="border-r-2 border-gray-200 pr-4">
                                <div 
                                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
                                  onClick={() => toggleSubcategory(subcategory.id)}
                                >
                                  <div className="flex items-center gap-3">
                                    {expandedSubcategories.has(subcategory.id) ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                    <Building className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">{subcategory.name}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <Badge variant="secondary">
                                      {subcategoryProviders.length} ספקים
                                    </Badge>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedItem({
                                          type: 'subcategory',
                                          data: subcategory,
                                          providers: subcategoryProviders
                                        });
                                      }}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>

                                {/* ספקים */}
                                {expandedSubcategories.has(subcategory.id) && (
                                  <div className="mr-8 mt-3 space-y-2">
                                    {subcategoryProviders.map((provider) => {
                                      const providerServices = getServicesForProvider(provider.id);
                                      return (
                                        <div key={provider.id} className="border border-gray-200 rounded p-3">
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                              <Users className="h-4 w-4 text-blue-500" />
                                              <div>
                                                <span className="font-medium">{provider.name}</span>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                  <Star className="h-3 w-3" />
                                                  <span>{provider.rating?.toFixed(1) || 'N/A'}</span>
                                                  {!provider.calendarActive && (
                                                    <Badge variant="destructive" className="text-xs">
                                                      ללא יומן
                                                    </Badge>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="flex gap-2">
                                              <Badge variant="outline">
                                                {providerServices.length} שירותים
                                              </Badge>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setSelectedItem({
                                                  type: 'provider',
                                                  data: provider,
                                                  services: providerServices
                                                })}
                                              >
                                                <Eye className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* עמודה ימנית - פרטי הפריט הנבחר */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>פרטי הפריט הנבחר</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedItem ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg">{selectedItem.data.name}</h4>
                        <p className="text-sm text-gray-600">
                          {selectedItem.type === 'subcategory' ? 'תת קטגוריה' : 
                           selectedItem.type === 'provider' ? 'ספק' : 'שירות'}
                        </p>
                      </div>
                      
                      {selectedItem.data.description && (
                        <div>
                          <strong>תיאור:</strong>
                          <p className="text-sm mt-1">{selectedItem.data.description}</p>
                        </div>
                      )}
                      
                      {selectedItem.type === 'provider' && (
                        <div className="space-y-2">
                          <div><strong>אימייל:</strong> {selectedItem.data.email || 'לא זמין'}</div>
                          <div><strong>טלפון:</strong> {selectedItem.data.phone || 'לא זמין'}</div>
                          <div><strong>עיר:</strong> {selectedItem.data.city || 'לא זמין'}</div>
                          <div><strong>דירוג:</strong> {selectedItem.data.rating?.toFixed(1) || 'לא דורג'}</div>
                          <div><strong>יומן פעיל:</strong> {selectedItem.data.calendarActive ? '✅ כן' : '❌ לא'}</div>
                        </div>
                      )}
                      
                      {selectedItem.providers && (
                        <div>
                          <strong>ספקים ({selectedItem.providers.length}):</strong>
                          <ul className="text-sm mt-1 space-y-1">
                            {selectedItem.providers.slice(0, 5).map(provider => (
                              <li key={provider.id}>• {provider.name}</li>
                            ))}
                            {selectedItem.providers.length > 5 && (
                              <li className="text-gray-500">ועוד {selectedItem.providers.length - 5}...</li>
                            )}
                          </ul>
                        </div>
                      )}
                      
                      {selectedItem.services && (
                        <div>
                          <strong>שירותים ({selectedItem.services.length}):</strong>
                          <ul className="text-sm mt-1 space-y-1">
                            {selectedItem.services.slice(0, 5).map(service => (
                              <li key={service.id}>• {service.name} - ₪{service.price}</li>
                            ))}
                            {selectedItem.services.length > 5 && (
                              <li className="text-gray-500">ועוד {selectedItem.services.length - 5}...</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      בחר פריט כדי לצפות בפרטים
                    </p>
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

export default HierarchyManagement;
