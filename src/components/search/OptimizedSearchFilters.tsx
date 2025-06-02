
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, MapPin, Users, DollarSign, X, Filter } from 'lucide-react';
import { debounce } from 'lodash';
import { DateRange } from 'react-day-picker';

interface FilterState {
  dateRange: DateRange | undefined;
  timeSlot: string;
  budget: [number, number];
  location: string;
  attendees: number;
  categories: string[];
  rating: number;
}

interface OptimizedSearchFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  resultsCount: number;
}

const OptimizedSearchFilters: React.FC<OptimizedSearchFiltersProps> = ({
  onFiltersChange,
  resultsCount
}) => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: undefined,
    timeSlot: '',
    budget: [500, 10000],
    location: '',
    attendees: 50,
    categories: [],
    rating: 0
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  // Debounced filter update
  const debouncedUpdate = useCallback(
    debounce((newFilters: FilterState) => {
      onFiltersChange(newFilters);
    }, 300),
    [onFiltersChange]
  );

  useEffect(() => {
    debouncedUpdate(filters);
  }, [filters, debouncedUpdate]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      dateRange: undefined,
      timeSlot: '',
      budget: [500, 10000],
      location: '',
      attendees: 50,
      categories: [],
      rating: 0
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.dateRange?.from ||
      filters.timeSlot ||
      filters.location ||
      filters.categories.length > 0 ||
      filters.rating > 0 ||
      filters.budget[0] > 500 ||
      filters.budget[1] < 10000
    );
  };

  const categories = [
    'זמרים', 'להקות', 'קוסמים', 'אומני חושים', 'סטנדאפיסטים',
    'תקליטנים', 'שחקנים', 'מיצגים', 'קרקס', 'תיאטרון'
  ];

  const timeSlots = [
    'בוקר (8:00-12:00)',
    'צהריים (12:00-16:00)', 
    'אחר הצהריים (16:00-20:00)',
    'ערב (20:00-24:00)',
    'לילה (24:00-4:00)'
  ];

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            סינון תוצאות
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {resultsCount} תוצאות
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? 'הרחב' : 'כווץ'}
            </Button>
          </div>
        </div>
        {hasActiveFilters() && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="justify-start p-0">
            <X className="h-4 w-4 ml-1" />
            נקה סינונים
          </Button>
        )}
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="space-y-4">
          {/* תאריך */}
          <div>
            <Label className="text-sm font-medium">תאריך האירוע</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start mt-1">
                  <CalendarIcon className="h-4 w-4 ml-2" />
                  {filters.dateRange?.from ? (
                    filters.dateRange.to ? (
                      `${filters.dateRange.from.toLocaleDateString('he-IL')} - ${filters.dateRange.to.toLocaleDateString('he-IL')}`
                    ) : (
                      filters.dateRange.from.toLocaleDateString('he-IL')
                    )
                  ) : (
                    'בחר תאריך'
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={filters.dateRange}
                  onSelect={(range) => updateFilter('dateRange', range)}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* שעה */}
          <div>
            <Label className="text-sm font-medium">שעת האירוע</Label>
            <Select value={filters.timeSlot} onValueChange={(value) => updateFilter('timeSlot', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="בחר שעה" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* תקציב */}
          <div>
            <Label className="text-sm font-medium">תקציב (₪)</Label>
            <div className="mt-2 mb-3">
              <Slider
                value={filters.budget}
                onValueChange={(value) => updateFilter('budget', value)}
                min={500}
                max={15000}
                step={250}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>₪{filters.budget[0].toLocaleString()}</span>
              <span>₪{filters.budget[1].toLocaleString()}</span>
            </div>
          </div>

          {/* מיקום */}
          <div>
            <Label className="text-sm font-medium">מיקום</Label>
            <div className="relative mt-1">
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={filters.location}
                onChange={(e) => updateFilter('location', e.target.value)}
                placeholder="עיר או אזור"
                className="pr-10"
              />
            </div>
          </div>

          {/* כמות משתתפים */}
          <div>
            <Label className="text-sm font-medium">כמות משתתפים</Label>
            <div className="flex items-center gap-2 mt-1">
              <Users className="h-4 w-4 text-gray-400" />
              <Input
                type="number"
                value={filters.attendees}
                onChange={(e) => updateFilter('attendees', parseInt(e.target.value) || 0)}
                placeholder="מספר"
                className="flex-1"
                min="1"
              />
            </div>
          </div>

          {/* קטגוריות */}
          <div>
            <Label className="text-sm font-medium">קטגוריות</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={filters.categories.includes(category) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
                  onClick={() => {
                    const newCategories = filters.categories.includes(category)
                      ? filters.categories.filter(c => c !== category)
                      : [...filters.categories, category];
                    updateFilter('categories', newCategories);
                  }}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* דירוג מינימלי */}
          <div>
            <Label className="text-sm font-medium">דירוג מינימלי</Label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant={filters.rating >= rating ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateFilter('rating', rating)}
                  className="w-8 h-8 p-0"
                >
                  {rating}
                </Button>
              ))}
            </div>
          </div>

          {/* רענון תוצאות */}
          <div className="pt-4 border-t">
            <div className="text-center text-sm text-gray-600 mb-2">
              עדכון אוטומטי של התוצאות
            </div>
            <div className="text-xs text-gray-500 text-center">
              התוצאות מתעדכנות אוטומטית כל שינוי סינון
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default OptimizedSearchFilters;
