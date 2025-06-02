
import React, { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, SlidersHorizontal } from 'lucide-react';
import ServiceResultCard from './ServiceResultCard';
import { useUnifiedEventContext, useSearchWithDebounce } from '@/context/UnifiedEventContext';
import { usePaginatedData } from '@/hooks/usePaginatedData';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface SearchResultsProps {
  searchResults: any[];
  isLoading?: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, isLoading: propIsLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { searchServices } = useUnifiedEventContext();
  
  // קריאת פרמטרי החיפוש מה-URL
  const query = searchParams.get('q') || '';
  const selectedDate = searchParams.get('date');
  const selectedTime = searchParams.get('time');
  const selectedLocation = searchParams.get('location');
  const showOnlyAvailable = searchParams.get('available') !== 'false';

  // חיפוש מתקדם עם Debounce
  const debouncedResults = useSearchWithDebounce(query, {
    date: selectedDate,
    time: selectedTime,
    location: selectedLocation,
    onlyAvailable: showOnlyAvailable
  });

  // שימוש בתוצאות מ-props או מחיפוש מתקדם
  const finalResults = useMemo(() => {
    return searchResults.length > 0 ? searchResults : debouncedResults;
  }, [searchResults, debouncedResults]);

  // Pagination לתוצאות
  const {
    currentPageData: paginatedResults,
    hasNextPage,
    loadMore,
    isLoading: paginationLoading
  } = usePaginatedData({
    data: finalResults,
    itemsPerPage: 12
  });

  // מצב השוואה
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleServiceSelection = useCallback((service: any) => {
    const serviceId = service.id || service.serviceId || service.service_id;
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId].slice(0, 3) // מקסימום 3 שירותים להשוואה
    );
  }, []);

  const updateSearchParam = useCallback((key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const handleCompareServices = useCallback(() => {
    if (selectedServices.length >= 2) {
      navigate(`/compare?services=${selectedServices.join(',')}`);
    }
  }, [selectedServices, navigate]);

  const isLoading = propIsLoading || paginationLoading;

  if (propIsLoading) {
    return (
      <div className="space-y-4">
        <LoadingSpinner size="lg" text="מחפש שירותים..." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* פילטרי חיפוש מתקדמים */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="font-medium">סינון מתקדם</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">תאריך</label>
            <Input
              type="date"
              value={selectedDate || ''}
              onChange={(e) => updateSearchParam('date', e.target.value)}
              placeholder="בחר תאריך"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">שעה</label>
            <Input
              type="time"
              value={selectedTime || ''}
              onChange={(e) => updateSearchParam('time', e.target.value)}
              placeholder="בחר שעה"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">מיקום</label>
            <Input
              value={selectedLocation || ''}
              onChange={(e) => updateSearchParam('location', e.target.value)}
              placeholder="עיר או אזור"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">הצג רק זמינים</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlyAvailable}
                onChange={(e) => updateSearchParam('available', e.target.checked ? 'true' : 'false')}
                className="h-4 w-4"
              />
              <span className="text-sm">זמינים בלבד</span>
            </div>
          </div>
        </div>
      </div>

      {/* סטטיסטיקות תוצאות */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          נמצאו {finalResults.length} תוצאות
          {showOnlyAvailable && selectedDate && selectedTime && (
            <span className="mr-2">זמינות ב-{selectedDate} בשעה {selectedTime}</span>
          )}
          {query && (
            <span className="mr-2">עבור "{query}"</span>
          )}
        </div>
        
        {selectedServices.length > 0 && (
          <Button 
            onClick={handleCompareServices}
            disabled={selectedServices.length < 2}
            variant="outline"
            size="sm"
          >
            השווה ({selectedServices.length})
          </Button>
        )}
      </div>

      {/* תוצאות החיפוש */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedResults.map((service: any) => {
          const serviceId = service.id || service.serviceId || service.service_id;
          const isSelected = selectedServices.includes(serviceId);
          const canSelect = selectedServices.length < 3 || isSelected;
          
          return (
            <ServiceResultCard
              key={serviceId}
              service={service}
              isSelected={isSelected}
              onToggleSelect={toggleServiceSelection}
              canSelect={canSelect}
              selectedDate={selectedDate || undefined}
              selectedTime={selectedTime || undefined}
            />
          );
        })}
      </div>

      {/* כפתור טעינת עוד */}
      {hasNextPage && (
        <div className="text-center py-4">
          <Button 
            onClick={loadMore}
            disabled={isLoading}
            variant="outline"
            size="lg"
          >
            {isLoading ? (
              <LoadingSpinner size="sm" text="" />
            ) : (
              'טען עוד תוצאות'
            )}
          </Button>
        </div>
      )}

      {paginatedResults.length === 0 && !propIsLoading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            לא נמצאו שירותים זמינים
          </h3>
          <p className="text-gray-500 mb-4">
            {selectedDate && selectedTime 
              ? `אין שירותים זמינים ב-${selectedDate} בשעה ${selectedTime}. נסה תאריכים או שעות אחרות.`
              : 'נסה לשנות את קריטריוני החיפוש או הסר חלק מהפילטרים.'
            }
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchParams(new URLSearchParams({ 
                q: searchParams.get('q') || '',
                available: 'false' 
              }));
            }}
          >
            הצג את כל התוצאות
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
