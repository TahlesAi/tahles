
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useConceptSystem } from '@/hooks/useConceptSystem';
import { SearchFilters } from '@/types/conceptSystem';
import { 
  MapPin, 
  Users, 
  DollarSign, 
  Calendar,
  Filter,
  X
} from 'lucide-react';

interface EnhancedSearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  loading?: boolean;
}

export const EnhancedSearchFilters: React.FC<EnhancedSearchFiltersProps> = ({
  onFiltersChange,
  onSearch,
  loading
}) => {
  const {
    mainConcepts,
    subConcepts,
    targetAudiences,
    geographicAreas,
    budgetRanges,
    loadSubConcepts
  } = useConceptSystem();

  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedMainConcept, setSelectedMainConcept] = useState<string>('');

  const handleMainConceptChange = (conceptId: string) => {
    setSelectedMainConcept(conceptId);
    loadSubConcepts(conceptId);
    const newFilters = { ...filters, main_concept_id: conceptId, sub_concept_ids: [] };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSubConceptToggle = (subConceptId: string, checked: boolean) => {
    const currentSubConcepts = filters.sub_concept_ids || [];
    const newSubConcepts = checked
      ? [...currentSubConcepts, subConceptId]
      : currentSubConcepts.filter(id => id !== subConceptId);
    
    const newFilters = { ...filters, sub_concept_ids: newSubConcepts };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleTargetAudienceToggle = (audienceId: string, checked: boolean) => {
    const currentAudiences = filters.target_audience_ids || [];
    const newAudiences = checked
      ? [...currentAudiences, audienceId]
      : currentAudiences.filter(id => id !== audienceId);
    
    const newFilters = { ...filters, target_audience_ids: newAudiences };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleLocationTypeToggle = (locationType: string, checked: boolean) => {
    const currentTypes = filters.location_types || [];
    const newTypes = checked
      ? [...currentTypes, locationType]
      : currentTypes.filter(type => type !== locationType);
    
    const newFilters = { ...filters, location_types: newTypes };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setSelectedMainConcept('');
    onFiltersChange({});
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.main_concept_id) count++;
    if (filters.sub_concept_ids?.length) count += filters.sub_concept_ids.length;
    if (filters.target_audience_ids?.length) count += filters.target_audience_ids.length;
    if (filters.geographic_area_id) count++;
    if (filters.budget_range_id) count++;
    if (filters.location_types?.length) count += filters.location_types.length;
    return count;
  };

  const relevantSubConcepts = subConcepts.filter(
    sub => !selectedMainConcept || sub.main_concept_id === selectedMainConcept
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            סינונים מתקדמים
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary">
                {getActiveFiltersCount()} פעילים
              </Badge>
            )}
          </div>
          {getActiveFiltersCount() > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              נקה הכל
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6" dir="rtl">
        {/* קונספט ראשי */}
        <div className="space-y-3">
          <Label className="text-base font-medium">קונספט האירוע</Label>
          <Select value={selectedMainConcept} onValueChange={handleMainConceptChange}>
            <SelectTrigger>
              <SelectValue placeholder="בחר סוג אירוע" />
            </SelectTrigger>
            <SelectContent>
              {mainConcepts.map(concept => (
                <SelectItem key={concept.id} value={concept.id}>
                  {concept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* תתי קונספטים */}
        {relevantSubConcepts.length > 0 && (
          <div className="space-y-3">
            <Label className="text-base font-medium">תתי קונספטים</Label>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
              {relevantSubConcepts.map(subConcept => (
                <div key={subConcept.id} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={subConcept.id}
                    checked={filters.sub_concept_ids?.includes(subConcept.id) || false}
                    onCheckedChange={(checked) => 
                      handleSubConceptToggle(subConcept.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={subConcept.id} className="text-sm">
                    {subConcept.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* קהל יעד */}
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            קהל יעד
          </Label>
          <div className="grid grid-cols-1 gap-2">
            {targetAudiences.map(audience => (
              <div key={audience.id} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={audience.id}
                  checked={filters.target_audience_ids?.includes(audience.id) || false}
                  onCheckedChange={(checked) => 
                    handleTargetAudienceToggle(audience.id, checked as boolean)
                  }
                />
                <Label htmlFor={audience.id} className="text-sm">
                  {audience.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* אזור גיאוגרפי */}
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            אזור גיאוגרפי
          </Label>
          <Select 
            value={filters.geographic_area_id || ''} 
            onValueChange={(value) => {
              const newFilters = { ...filters, geographic_area_id: value };
              setFilters(newFilters);
              onFiltersChange(newFilters);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="בחר אזור" />
            </SelectTrigger>
            <SelectContent>
              {geographicAreas.map(area => (
                <SelectItem key={area.id} value={area.id}>
                  {area.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* תקציב */}
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            תקציב
          </Label>
          <Select 
            value={filters.budget_range_id || ''} 
            onValueChange={(value) => {
              const newFilters = { ...filters, budget_range_id: value };
              setFilters(newFilters);
              onFiltersChange(newFilters);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="בחר טווח תקציב" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map(range => (
                <SelectItem key={range.id} value={range.id}>
                  {range.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* סוג מיקום */}
        <div className="space-y-3">
          <Label className="text-base font-medium">סוג מיקום</Label>
          <div className="flex flex-wrap gap-3">
            {['בית', 'אולם', 'חוץ', 'אונליין'].map(locationType => (
              <div key={locationType} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={locationType}
                  checked={filters.location_types?.includes(locationType) || false}
                  onCheckedChange={(checked) => 
                    handleLocationTypeToggle(locationType, checked as boolean)
                  }
                />
                <Label htmlFor={locationType} className="text-sm">
                  {locationType}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* אפשרויות נוספות */}
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            זמינות
          </Label>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="available-only"
              checked={filters.available_only || false}
              onCheckedChange={(checked) => {
                const newFilters = { ...filters, available_only: checked as boolean };
                setFilters(newFilters);
                onFiltersChange(newFilters);
              }}
            />
            <Label htmlFor="available-only" className="text-sm">
              רק שירותים זמינים עם יומן מחובר
            </Label>
          </div>
        </div>

        <Button 
          onClick={onSearch} 
          className="w-full" 
          disabled={loading}
        >
          {loading ? 'מחפש...' : 'חפש שירותים'}
        </Button>
      </CardContent>
    </Card>
  );
};
