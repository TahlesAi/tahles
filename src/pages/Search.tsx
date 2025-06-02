
// עדכון דף החיפוש לשימוש בנתונים המורחבים ובקרת זמינות
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceResultCard from "@/components/search/ServiceResultCard";
import OptimizedSearchFilters from "@/components/search/OptimizedSearchFilters";
import CinematicResultsView from "@/components/search/CinematicResultsView";
import ServiceComparisonBar from "@/components/comparison/ServiceComparisonBar";
import NoResultsWithLeadForm from "@/components/search/NoResultsWithLeadForm";
import Chatbot from "@/components/chat/Chatbot";
import AdvancedBreadcrumbs from "@/components/navigation/AdvancedBreadcrumbs";
import { SearchResultsSkeleton } from "@/components/loading/AdvancedSkeletonLoader";
import FavoritesDashboard from "@/components/favorites/FavoritesDashboard";
import { searchServices } from "@/lib/unifiedMockData";
import { Button } from "@/components/ui/button";
import { Grid, List, SlidersHorizontal, Calendar, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'cinematic'>('cinematic');
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get search parameters from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q') || '';
    const category = urlParams.get('category') || '';
    const subcategory = urlParams.get('subcategory') || '';
    const date = urlParams.get('date') || '';
    const time = urlParams.get('time') || '';
    const concepts = urlParams.get('concepts')?.split(',').filter(c => c.trim()) || [];
    
    setSearchTerm(query);
    setSelectedDate(date);
    setSelectedTime(time);
    setFilters({
      category: category || undefined,
      subcategory: subcategory || undefined,
      conceptTags: concepts // *** הוספת קונספטים מה-URL ***
    });
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [location.search]);

  // *** חיפוש עם בדיקת זמינות וקונספטים ***
  const searchResults = searchServices(searchTerm, {
    ...filters,
    date: selectedDate,
    time: selectedTime,
    conceptTags: filters.conceptTags // העברת קונספטים לחיפוש
  });
  
  const featuredServices = searchResults.filter(s => s.featured);
  const regularServices = searchResults.filter(s => !s.featured);

  const handleToggleServiceSelection = (service: any) => {
    if (selectedServices.find(s => s.id === service.id)) {
      setSelectedServices(prev => prev.filter(s => s.id !== service.id));
    } else if (selectedServices.length < 3) {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  // *** עדכון URL עם קונספטים ***
  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    
    const urlParams = new URLSearchParams(location.search);
    
    // עדכון קונספטים ב-URL
    if (newFilters.conceptTags && newFilters.conceptTags.length > 0) {
      urlParams.set('concepts', newFilters.conceptTags.join(','));
    } else {
      urlParams.delete('concepts');
    }
    
    // עדכון שאר הפרמטרים
    if (newFilters.category) {
      urlParams.set('category', newFilters.category);
    } else {
      urlParams.delete('category');
    }
    
    if (newFilters.subcategory) {
      urlParams.set('subcategory', newFilters.subcategory);
    } else {
      urlParams.delete('subcategory');
    }
    
    navigate(`${location.pathname}?${urlParams.toString()}`, { replace: true });
  };

  const breadcrumbItems = [
    { label: 'דף הבית', href: '/' },
    { label: 'חיפוש', href: '/search', isActive: !searchTerm && !filters.category },
    ...(filters.category ? [{ label: filters.category }] : []),
    ...(searchTerm ? [{ label: `"${searchTerm}"`, isActive: true }] : [])
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <AdvancedBreadcrumbs items={breadcrumbItems} />
        <main className="flex-grow py-8 bg-gray-50">
          <div className="container px-4">
            <SearchResultsSkeleton />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // אם אין תוצאות והוגדרו תאריך ושעה - הצג טופס ליד
  const shouldShowLeadForm = searchResults.length === 0 && (selectedDate || selectedTime || searchTerm);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AdvancedBreadcrumbs items={breadcrumbItems} />
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container px-4">
          {/* כותרת תוצאות החיפוש */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  תוצאות חיפוש
                  {searchTerm && ` עבור "${searchTerm}"`}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <span>נמצאו {searchResults.length} תוצאות</span>
                  {/* *** הצגת קונספטים פעילים *** */}
                  {filters.conceptTags && filters.conceptTags.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      <span>קונספטים: {filters.conceptTags.join(', ')}</span>
                    </div>
                  )}
                  {selectedDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>זמינות ל-{selectedDate}</span>
                      {selectedTime && <span>בשעה {selectedTime}</span>}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <FavoritesDashboard />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="sm:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 ml-1" />
                  סינונים
                </Button>
                
                <div className="flex border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'cinematic' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('cinematic')}
                    className="rounded-none"
                  >
                    קולנועי
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* הצגת טופס ליד במקום תוצאות ריקות */}
          {shouldShowLeadForm ? (
            <NoResultsWithLeadForm
              searchQuery={searchTerm}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              appliedFilters={filters}
            />
          ) : (
            <div className={`grid gap-8 ${showFilters ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'}`}>
              {/* סרגל סינונים */}
              {showFilters && (
                <div className="lg:col-span-1">
                  <OptimizedSearchFilters 
                    onFiltersChange={handleFiltersChange} // *** שימוש בפונקציה המעודכנת ***
                    resultsCount={searchResults.length}
                  />
                </div>
              )}

              {/* תוצאות */}
              <div className={showFilters ? 'lg:col-span-3' : 'col-span-1'}>
                {searchResults.length > 0 ? (
                  <>
                    {/* אזהרה על סינון לפי זמינות */}
                    {selectedDate && selectedTime && (
                      <Alert className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          מוצגים רק שירותים זמינים ב-{selectedDate} בשעה {selectedTime}.
                          לתוצאות נוספות, נסו תאריכים או שעות אחרות.
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* *** אזהרה על סינון לפי קונספטים *** */}
                    {filters.conceptTags && filters.conceptTags.length > 0 && (
                      <Alert className="mb-6">
                        <Tag className="h-4 w-4" />
                        <AlertDescription>
                          מוצגים רק שירותים המתאימים לקונספטים: {filters.conceptTags.join(', ')}.
                          לתוצאות נוספות, נסו להסיר חלק מהקונספטים.
                        </AlertDescription>
                      </Alert>
                    )}

                    {viewMode === 'cinematic' ? (
                      <CinematicResultsView 
                        services={featuredServices}
                        providers={regularServices}
                      />
                    ) : (
                      <div className={`grid gap-6 ${
                        viewMode === 'grid' 
                          ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                          : 'grid-cols-1'
                      }`}>
                        {searchResults.map((service) => (
                          <ServiceResultCard 
                            key={service.id} 
                            service={service}
                            isSelected={selectedServices.some(s => s.id === service.id)}
                            onToggleSelect={handleToggleServiceSelection}
                            canSelect={selectedServices.length < 3 || selectedServices.some(s => s.id === service.id)}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      לא נמצאו תוצאות התואמות לחיפוש
                    </h3>
                    <p className="text-gray-500 mb-6">
                      נסה לשנות את קריטריוני החיפוש או הסר חלק מהפילטרים
                    </p>
                    <Button 
                      onClick={() => navigate('/catering-inquiry')}
                      variant="outline"
                    >
                      צור קשר לייעוץ אישי
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <ServiceComparisonBar
        selectedServices={selectedServices}
        onRemoveService={(serviceId) => 
          setSelectedServices(prev => prev.filter(s => s.id !== serviceId))
        }
        onClearAll={() => setSelectedServices([])}
      />
      
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Search;
