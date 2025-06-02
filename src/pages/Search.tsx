import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceResultCard from "@/components/search/ServiceResultCard";
import OptimizedSearchFilters from "@/components/search/OptimizedSearchFilters";
import CinematicResultsView from "@/components/search/CinematicResultsView";
import ServiceComparisonBar from "@/components/comparison/ServiceComparisonBar";
import NoResultsFallback from "@/components/search/NoResultsFallback";
import Chatbot from "@/components/chat/Chatbot";
import { searchServices } from "@/lib/unifiedMockData";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Grid, List, SlidersHorizontal } from "lucide-react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode<'grid' | 'list' | 'cinematic'>('cinematic');
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get search term from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q') || '';
    const category = urlParams.get('category') || '';
    const subcategory = urlParams.get('subcategory') || '';
    
    setSearchTerm(query);
    setFilters({
      category: category || undefined,
      subcategory: subcategory || undefined
    });
    setIsLoading(false);
  }, [location.search]);

  // Search for services using the unified data
  const searchResults = searchServices(searchTerm, filters);
  const featuredServices = searchResults.filter(s => s.featured);
  const regularServices = searchResults.filter(s => !s.featured);

  const handleToggleServiceSelection = (service: any) => {
    if (selectedServices.find(s => s.id === service.id)) {
      setSelectedServices(prev => prev.filter(s => s.id !== service.id));
    } else if (selectedServices.length < 3) {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  const handleFilterAdjustment = (suggestion: string) => {
    // Logic to adjust filters based on suggestion
    console.log('Adjusting filters based on:', suggestion);
    // Implementation depends on the specific suggestion
  };

  // Show loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8 bg-gray-50">
          <div className="container px-4">
            <div className="mb-8">
              <Skeleton className="h-8 w-64 mb-4" />
              <Skeleton className="h-4 w-96" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <Skeleton className="h-96 w-full" />
              </div>
              
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-64 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container px-4">
          {/* Search Results Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  תוצאות חיפוש
                  {searchTerm && ` עבור "${searchTerm}"`}
                </h1>
                <p className="text-gray-600">
                  נמצאו {searchResults.length} תוצאות
                </p>
              </div>
              
              {/* View Mode Controls */}
              <div className="flex items-center gap-2">
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

          {searchResults.length === 0 ? (
            <NoResultsFallback
              searchQuery={searchTerm}
              appliedFilters={filters}
              onFilterAdjustment={handleFilterAdjustment}
            />
          ) : (
            <div className={`grid gap-8 ${showFilters ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'}`}>
              {/* Filters Sidebar */}
              {showFilters && (
                <div className="lg:col-span-1">
                  <OptimizedSearchFilters 
                    onFiltersChange={setFilters}
                    resultsCount={searchResults.length}
                  />
                </div>
              )}

              {/* Results */}
              <div className={showFilters ? 'lg:col-span-3' : 'col-span-1'}>
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
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Comparison Bar */}
      <ServiceComparisonBar
        selectedServices={selectedServices}
        onRemoveService={(serviceId) => 
          setSelectedServices(prev => prev.filter(s => s.id !== serviceId))
        }
        onClearAll={() => setSelectedServices([])}
      />
      
      {/* Chatbot */}
      <Chatbot />
      
      <Footer />
    </div>
  );
};

export default Search;
