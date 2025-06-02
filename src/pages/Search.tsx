import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import ServiceResultCard from "@/components/search/ServiceResultCard";
import AdvancedSearchFilters from "@/components/search/AdvancedSearchFilters";
import ServiceComparisonModal from "@/components/comparison/ServiceComparisonModal";
import { useServiceComparison } from "@/hooks/useServiceComparison";
import { unifiedServices } from "@/lib/unifiedMockData";
import { toast } from "sonner";

const Search = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [currentFilters, setCurrentFilters] = useState<any>({});
  
  const {
    selectedServices,
    addService,
    removeService,
    clearAll,
    isServiceSelected,
    canAddMore
  } = useServiceComparison();

  const searchTerm = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const subcategory = searchParams.get("subcategory") || "";
  const locationFilter = searchParams.get("location") || "";

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", searchTerm, category, subcategory, locationFilter, currentFilters],
    queryFn: async () => {
      let filteredServices = [...unifiedServices];

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filteredServices = filteredServices.filter(service =>
          service.name.toLowerCase().includes(searchLower) ||
          service.description.toLowerCase().includes(searchLower) ||
          service.provider.toLowerCase().includes(searchLower) ||
          service.category.toLowerCase().includes(searchLower) ||
          (service.subcategory && service.subcategory.toLowerCase().includes(searchLower))
        );
      }

      if (category) {
        filteredServices = filteredServices.filter(service => 
          service.category.toLowerCase() === category.toLowerCase()
        );
      }

      if (subcategory) {
        filteredServices = filteredServices.filter(service => 
          service.subcategory && service.subcategory.toLowerCase() === subcategory.toLowerCase()
        );
      }

      if (locationFilter) {
        filteredServices = filteredServices.filter(service => 
          service.location && service.location.toLowerCase().includes(locationFilter.toLowerCase())
        );
      }

      if (currentFilters.priceRange) {
        filteredServices = filteredServices.filter(service => {
          const price = typeof service.price === 'number' ? service.price : parseInt(service.price);
          return price >= currentFilters.priceRange.min && price <= currentFilters.priceRange.max;
        });
      }

      if (currentFilters.rating) {
        filteredServices = filteredServices.filter(service => 
          service.rating >= currentFilters.rating
        );
      }

      return filteredServices.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
    },
  });

  const handleToggleSelect = (service: any) => {
    if (isServiceSelected(service.id)) {
      removeService(service.id);
    } else {
      addService(service);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-48 w-full mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">
            תוצאות חיפוש
            {searchTerm && ` עבור "${searchTerm}"`}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {category && (
              <Badge variant="secondary" className="px-3 py-1">
                קטגוריה: {category}
              </Badge>
            )}
            {subcategory && (
              <Badge variant="secondary" className="px-3 py-1">
                תת-קטגוריה: {subcategory}
              </Badge>
            )}
            {locationFilter && (
              <Badge variant="secondary" className="px-3 py-1">
                מיקום: {locationFilter}
              </Badge>
            )}
          </div>

          <AdvancedSearchFilters
            onFiltersChange={setCurrentFilters}
            initialFilters={currentFilters}
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            נמצאו {searchResults?.length || 0} תוצאות
          </p>
          
          {selectedServices.length > 0 && (
            <Badge variant="outline" className="px-3 py-1">
              נבחרו {selectedServices.length}/3 להשוואה
            </Badge>
          )}
        </div>

        {searchResults && searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((service) => (
              <ServiceResultCard
                key={service.id}
                service={service}
                isSelected={isServiceSelected(service.id)}
                onToggleSelect={handleToggleSelect}
                canSelect={canAddMore}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">לא נמצאו תוצאות</h3>
            <p className="text-gray-600">נסה לשנות את קריטריוני החיפוש</p>
          </div>
        )}

        <ServiceComparisonModal
          selectedServices={selectedServices}
          onRemoveService={removeService}
          onClearAll={clearAll}
        />
      </div>
    </div>
  );
};

export default Search;
