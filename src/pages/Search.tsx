
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceResultCard from "@/components/search/ServiceResultCard";
import AdvancedSearchFilters from "@/components/search/AdvancedSearchFilters";
import { searchServices } from "@/lib/unifiedMockData";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedEventConcept, setSelectedEventConcept] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get search term from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q') || '';
    const category = urlParams.get('category') || '';
    const subcategory = urlParams.get('subcategory') || '';
    
    setSearchTerm(query);
    if (category) setSelectedCategories([category]);
    if (subcategory) setSelectedSubcategories([subcategory]);
    setIsLoading(false);
  }, [location.search]);

  // Build filters object for search
  const filters = {
    category: selectedCategories.length > 0 ? selectedCategories[0] : undefined,
    subcategory: selectedSubcategories.length > 0 ? selectedSubcategories[0] : undefined,
    eventConcept: selectedEventConcept || undefined
  };

  // Search for services using the unified data
  const searchResults = searchServices(searchTerm, filters);
  
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              תוצאות חיפוש
              {searchTerm && ` עבור "${searchTerm}"`}
            </h1>
            <p className="text-gray-600">
              נמצאו {searchResults.length} תוצאות
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-4">סינון תוצאות</h2>
                <AdvancedSearchFilters 
                  onCategoriesChange={setSelectedCategories}
                  onSubcategoriesChange={setSelectedSubcategories}
                  selectedCategories={selectedCategories}
                  selectedSubcategories={selectedSubcategories}
                  onEventConceptChange={setSelectedEventConcept}
                  selectedEventConcept={selectedEventConcept}
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-3">
              {searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    לא נמצאו תוצאות
                  </h3>
                  <p className="text-gray-600 mb-6">
                    נסו לשנות את מונחי החיפוש או הסינון
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    חזרה לעמוד הבית
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {searchResults.map((service) => (
                    <ServiceResultCard 
                      key={service.id} 
                      service={service} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
