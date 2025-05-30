
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon, Filter, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { he } from 'date-fns/locale';
import ServiceResultCard from "@/components/search/ServiceResultCard";
import { useSearchSuggestions } from "@/lib/searchSuggestions";
import { toast } from "sonner";
import { unifiedServices } from '@/lib/unifiedMockData';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mainCategories, eventConcepts } = useSearchSuggestions();
  const initialQuery = searchParams.get("q") || "";
  
  // Search state
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState(unifiedServices);
  const [filteredResults, setFilteredResults] = useState(unifiedServices);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filters state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [location, setLocation] = useState<string>("");

  // Effect for initial search
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);
  
  const performSearch = (query: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Filter unified services based on search query
      let filtered = unifiedServices.filter(item => 
        (item.name && item.name.toLowerCase().includes(query.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
        (item.provider && item.provider.toLowerCase().includes(query.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(query.toLowerCase())) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) ||
        (item.subcategory && item.subcategory.toLowerCase().includes(query.toLowerCase()))
      );

      // If no results found but search seems relevant, show message
      if (filtered.length === 0 && query.trim()) {
        toast.info(`לא נמצאו תוצאות עבור "${query}"`, {
          description: "נסה להקליד מילות חיפוש אחרות"
        });
        // Show all services as fallback
        filtered = unifiedServices;
      }
      
      // Sort by rating - highest first
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      
      setResults(filtered);
      setFilteredResults(filtered);
      setIsLoading(false);
    }, 600);
  };
  
  // Apply all filters to the search results
  const applyFilters = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = [...results];
      
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(item => selectedCategories.includes(item.category));
      }
      
      if (selectedConcepts.length > 0) {
        filtered = filtered.filter(item => 
          item.suitableFor.some(concept => selectedConcepts.includes(concept))
        );
      }
      
      filtered = filtered.filter(
        item => item.price >= priceRange[0] && item.price <= priceRange[1]
      );
      
      if (location) {
        filtered = filtered.filter(item => 
          item.location?.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      if (selectedDate) {
        // In a real app, you would check availability for this date
        // Here we just simulate by filtering some random items
        filtered = filtered.filter(item => item.id.charCodeAt(0) % 2 === 0);
      }
      
      setFilteredResults(filtered);
      setIsLoading(false);
    }, 500);
  };
  
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedConcepts([]);
    setPriceRange([0, 10000]);
    setSelectedDate(undefined);
    setLocation("");
    setFilteredResults(results);
  };
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(current =>
      current.includes(categoryId)
        ? current.filter(id => id !== categoryId)
        : [...current, categoryId]
    );
  };
  
  const toggleConcept = (conceptId: string) => {
    setSelectedConcepts(current =>
      current.includes(conceptId)
        ? current.filter(id => id !== conceptId)
        : [...current, conceptId]
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container px-4 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {initialQuery 
                ? `תוצאות חיפוש עבור: "${initialQuery}"` 
                : "חיפוש שירותים"}
            </h1>
            <p className="text-gray-600">
              {filteredResults.length} שירותים נמצאו
            </p>
          </div>
          
          {/* Search Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              סינון תוצאות
            </Button>
            
            <div className="flex items-center gap-2 flex-wrap">
              {selectedCategories.length > 0 && (
                <Badge variant="secondary" className="py-1 px-3">
                  {selectedCategories.length} קטגוריות
                </Badge>
              )}
              
              {selectedConcepts.length > 0 && (
                <Badge variant="secondary" className="py-1 px-3">
                  {selectedConcepts.length} קונספטים
                </Badge>
              )}
              
              {(priceRange[0] > 0 || priceRange[1] < 10000) && (
                <Badge variant="secondary" className="py-1 px-3">
                  מחיר: ₪{priceRange[0]} - ₪{priceRange[1]}
                </Badge>
              )}
              
              {location && (
                <Badge variant="secondary" className="py-1 px-3">
                  מיקום: {location}
                </Badge>
              )}
              
              {selectedDate && (
                <Badge variant="secondary" className="py-1 px-3">
                  תאריך: {format(selectedDate, 'dd/MM/yyyy')}
                </Badge>
              )}
              
              {(selectedCategories.length > 0 || 
                 selectedConcepts.length > 0 || 
                 priceRange[0] > 0 || 
                 priceRange[1] < 10000 ||
                 location ||
                 selectedDate) && (
                <Badge 
                  variant="outline" 
                  className="py-1 px-3 cursor-pointer hover:bg-red-50"
                  onClick={resetFilters}
                >
                  איפוס מסננים
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Panel */}
            <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center justify-between">
                  <span>סינון תוצאות</span>
                  <SlidersHorizontal className="h-5 w-5" />
                </h2>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">קטגוריות</h3>
                  <div className="space-y-2">
                    {mainCategories.map(category => (
                      <div key={category.id} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox 
                          id={`category-${category.id}`} 
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <label 
                          htmlFor={`category-${category.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category.value}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Concepts/Event Types */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">סוג אירוע</h3>
                  <div className="space-y-2">
                    {eventConcepts.slice(0, 8).map(concept => (
                      <div key={concept.id} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox 
                          id={`concept-${concept.id}`} 
                          checked={selectedConcepts.includes(concept.id)}
                          onCheckedChange={() => toggleConcept(concept.id)}
                        />
                        <label 
                          htmlFor={`concept-${concept.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {concept.value}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">טווח מחירים</h3>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      min={0}
                      max={10000}
                      step={100}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₪{priceRange[0]}</span>
                      <span>₪{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Location */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">מיקום</h3>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="הזן עיר או אזור"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                {/* Date Picker */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">תאריך</h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-right font-normal"
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, 'PPP', { locale: he })
                        ) : (
                          <span>בחר תאריך</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Apply Button */}
                <Button 
                  className="w-full bg-brand-600 hover:bg-brand-700"
                  onClick={applyFilters}
                >
                  החל סינון
                </Button>
              </div>
            </div>
            
            {/* Results List */}
            <div className="lg:w-3/4">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Array(8).fill(null).map((_, i) => (
                    <div key={i} className="h-64 rounded-lg bg-gray-200 animate-pulse"></div>
                  ))}
                </div>
              ) : filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredResults.map(result => (
                    <ServiceResultCard key={result.id} service={result} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-2">לא נמצאו תוצאות</h3>
                  <p className="text-gray-600 mb-6">
                    נסה לשנות את מונחי החיפוש או הסרת חלק מהמסננים
                  </p>
                  <Button onClick={resetFilters}>איפוס מסננים</Button>
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
