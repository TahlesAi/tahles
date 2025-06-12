
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Filter, X } from "lucide-react";

interface SearchFiltersProps {
  onFiltersChange?: (filters: any) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFiltersChange }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const filterCategories = [
    { id: 'mentalists', name: 'מנטליסטים', category: 'מופעים' },
    { id: 'musicians', name: 'מוזיקאים', category: 'מופעים' },
    { id: 'catering', name: 'קייטרינג', category: 'אוכל' },
    { id: 'venues', name: 'אולמות', category: 'מקומות' }
  ];

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(f => f !== filterId)
      : [...activeFilters, filterId];
    
    setActiveFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setPriceRange([0, 10000]);
    onFiltersChange?.([]);
  };

  return (
    <Card data-testid="search-filters">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          מסנני חיפוש
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* כפתורי מסנן */}
        <div className="space-y-3">
          <h4 className="font-medium">קטגוריות</h4>
          <div className="grid grid-cols-2 gap-2">
            {filterCategories.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilters.includes(filter.id) ? "default" : "outline"}
                size="sm"
                role="button"
                className="filter-button text-xs"
                onClick={() => toggleFilter(filter.id)}
              >
                {filter.name}
              </Button>
            ))}
          </div>
        </div>

        {/* טווח מחירים */}
        <div className="space-y-3">
          <h4 className="font-medium">טווח מחירים</h4>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={10000}
              min={0}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>₪{priceRange[0]}</span>
              <span>₪{priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* מסננים פעילים */}
        {activeFilters.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">מסננים פעילים:</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-xs"
              >
                <X className="h-3 w-3 ml-1" />
                נקה הכל
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {activeFilters.map((filterId) => {
                const filter = filterCategories.find(f => f.id === filterId);
                return (
                  <Badge 
                    key={filterId} 
                    variant="secondary" 
                    className="text-xs cursor-pointer"
                    onClick={() => toggleFilter(filterId)}
                  >
                    {filter?.name}
                    <X className="h-3 w-3 mr-1" />
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
