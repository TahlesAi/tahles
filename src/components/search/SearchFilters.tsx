
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
    { id: 'venues', name: 'אולמות', category: 'מקומות' },
    { id: 'djs', name: 'תקליטנים', category: 'מופעים' },
    { id: 'photographers', name: 'צלמים', category: 'שירותים' }
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

  const handlePriceChange = (newRange: number[]) => {
    setPriceRange(newRange);
    onFiltersChange?.({ priceRange: newRange, activeFilters });
  };

  return (
    <Card data-testid="search-filters" className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          מסנני חיפוש
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* כפתורי מסנן */}
        <div className="space-y-3">
          <h4 className="font-medium">קטגוריות שירותים</h4>
          <div className="grid grid-cols-2 gap-2">
            {filterCategories.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilters.includes(filter.id) ? "default" : "outline"}
                size="sm"
                role="button"
                className="filter-button text-xs justify-start"
                onClick={() => toggleFilter(filter.id)}
                aria-pressed={activeFilters.includes(filter.id)}
                aria-label={`סנן לפי ${filter.name}`}
              >
                {filter.name}
              </Button>
            ))}
          </div>
        </div>

        {/* טווח מחירים */}
        <div className="space-y-4">
          <h4 className="font-medium">טווח מחירים (₪)</h4>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={10000}
              min={0}
              step={100}
              className="w-full"
              role="slider"
              aria-label="בחירת טווח מחירים"
              aria-valuemin={0}
              aria-valuemax={10000}
              aria-valuenow={priceRange[0]}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span aria-label={`מחיר מינימלי: ${priceRange[0]} שקל`}>₪{priceRange[0].toLocaleString()}</span>
              <span aria-label={`מחיר מקסימלי: ${priceRange[1]} שקל`}>₪{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* מסננים פעילים */}
        {activeFilters.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">מסננים פעילים:</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-xs"
                aria-label="נקה את כל המסננים"
              >
                <X className="h-3 w-3 ml-1" />
                נקה הכל
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filterId) => {
                const filter = filterCategories.find(f => f.id === filterId);
                return (
                  <Badge 
                    key={filterId} 
                    variant="secondary" 
                    className="text-xs cursor-pointer hover:bg-gray-200"
                    onClick={() => toggleFilter(filterId)}
                    role="button"
                    aria-label={`הסר מסנן ${filter?.name}`}
                  >
                    {filter?.name}
                    <X className="h-3 w-3 mr-1" />
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {/* סטטיסטיקות */}
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{activeFilters.length}</div>
              <div className="text-xs text-blue-700">מסננים פעילים</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">₪{priceRange[1] - priceRange[0]}</div>
              <div className="text-xs text-green-700">טווח מחירים</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
