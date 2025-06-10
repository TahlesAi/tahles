
// עדכון דף החיפוש לשימוש בנתונים המורחבים ובקרת זמינות
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchResults from "@/components/search/SearchResults";
import OptimizedSearchFilters from "@/components/search/OptimizedSearchFilters";
import CinematicResultsView from "@/components/search/CinematicResultsView";
import ServiceComparisonBar from "@/components/comparison/ServiceComparisonBar";
import NoResultsWithLeadForm from "@/components/search/NoResultsWithLeadForm";
import Chatbot from "@/components/chat/Chatbot";
import AdvancedBreadcrumbs from "@/components/navigation/AdvancedBreadcrumbs";
import { SearchResultsSkeleton } from "@/components/loading/AdvancedSkeletonLoader";
import FavoritesDashboard from "@/components/favorites/FavoritesDashboard";
import { Button } from "@/components/ui/button";
import { Grid, List, SlidersHorizontal, Calendar, AlertCircle, Tag } from "lucide-react";
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
      conceptTags: concepts
    });
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [location.search]);

  const handleToggleServiceSelection = (service: any) => {
    if (selectedServices.find(s => s.id === service.id)) {
      setSelectedServices(prev => prev.filter(s => s.id !== service.id));
    } else if (selectedServices.length < 3) {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    
    const urlParams = new URLSearchParams(location.search);
    
    if (newFilters.conceptTags && newFilters.conceptTags.length > 0) {
      urlParams.set('concepts', newFilters.conceptTags.join(','));
    } else {
      urlParams.delete('concepts');
    }
    
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

          <div className={`grid gap-8 ${showFilters ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'}`}>
            {/* סרגל סינונים */}
            {showFilters && (
              <div className="lg:col-span-1">
                <OptimizedSearchFilters 
                  onFiltersChange={handleFiltersChange}
                  resultsCount={0}
                />
              </div>
            )}

            {/* תוצאות */}
            <div className={showFilters ? 'lg:col-span-3' : 'col-span-1'}>
              <SearchResults 
                searchQuery={searchTerm}
                filters={filters}
              />
            </div>
          </div>
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
