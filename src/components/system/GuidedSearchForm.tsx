
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Calendar,
  Users,
  MapPin,
  DollarSign,
  Search,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { UpdatedDivision, GuidedSearchFilters } from '@/types/updatedSystemTypes';

interface GuidedSearchFormProps {
  divisions: UpdatedDivision[];
  onSearch: (filters: GuidedSearchFilters) => void;
  onClose: () => void;
}

const GuidedSearchForm: React.FC<GuidedSearchFormProps> = ({
  divisions,
  onSearch,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [filters, setFilters] = useState<GuidedSearchFilters>({});

  const steps = [
    { title: 'בחירת חטיבה', icon: Search },
    { title: 'פרטי האירוע', icon: Calendar },
    { title: 'קהל וקונספט', icon: Users },
    { title: 'מיקום ותקציב', icon: MapPin }
  ];

  const getCurrentStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <DivisionStep divisions={divisions} filters={filters} onChange={setFilters} />;
      case 1:
        return <EventDetailsStep filters={filters} onChange={setFilters} />;
      case 2:
        return <AudienceStep filters={filters} onChange={setFilters} />;
      case 3:
        return <LocationBudgetStep filters={filters} onChange={setFilters} />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSearch(filters);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return !!filters.division_id;
      case 1:
        return !!filters.event_date;
      case 2:
        return !!filters.participant_count;
      case 3:
        return !!filters.budget_range;
      default:
        return true;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" dir="rtl">
      <CardHeader>
        <CardTitle className="text-center">חיפוש מונחה</CardTitle>
        
        {/* Progress Bar */}
        <div className="flex justify-center mt-4">
          <div className="flex space-x-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center space-x-2 ${
                    index === currentStep ? 'text-blue-600' : 
                    index < currentStep ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === currentStep ? 'bg-blue-100' : 
                    index < currentStep ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium hidden md:block">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {getCurrentStepComponent()}

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={currentStep === 0 ? onClose : handleBack}
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            {currentStep === 0 ? 'ביטול' : 'חזור'}
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentStep === steps.length - 1 ? 'חפש' : 'המשך'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// רכיב שלב בחירת חטיבה
const DivisionStep: React.FC<{
  divisions: UpdatedDivision[];
  filters: GuidedSearchFilters;
  onChange: (filters: GuidedSearchFilters) => void;
}> = ({ divisions, filters, onChange }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">איזה סוג שירות אתם מחפשים?</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {divisions.map(division => (
        <Card
          key={division.id}
          className={`cursor-pointer transition-colors ${
            filters.division_id === division.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'
          }`}
          onClick={() => onChange({ ...filters, division_id: division.id })}
        >
          <CardContent className="p-4 text-center">
            <h4 className="font-medium">{division.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{division.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// רכיב שלב פרטי אירוע
const EventDetailsStep: React.FC<{
  filters: GuidedSearchFilters;
  onChange: (filters: GuidedSearchFilters) => void;
}> = ({ filters, onChange }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">פרטי האירוע</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="event-date">תאריך האירוע</Label>
        <Input
          id="event-date"
          type="date"
          value={filters.event_date || ''}
          onChange={(e) => onChange({ ...filters, event_date: e.target.value })}
        />
      </div>
      
      <div>
        <Label htmlFor="event-time">שעת האירוע</Label>
        <Input
          id="event-time"
          type="time"
          value={filters.event_time || ''}
          onChange={(e) => onChange({ ...filters, event_time: e.target.value })}
        />
      </div>
    </div>

    <div>
      <Label>סוג האירוע</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
        {[
          { value: 'business', label: 'עסקי' },
          { value: 'social', label: 'חברתי' },
          { value: 'family', label: 'משפחתי' },
          { value: 'children', label: 'ילדים' }
        ].map(type => (
          <Button
            key={type.value}
            variant={filters.event_type === type.value ? 'default' : 'outline'}
            onClick={() => onChange({ ...filters, event_type: type.value as any })}
            className="text-sm"
          >
            {type.label}
          </Button>
        ))}
      </div>
    </div>
  </div>
);

// רכיב שלב קהל
const AudienceStep: React.FC<{
  filters: GuidedSearchFilters;
  onChange: (filters: GuidedSearchFilters) => void;
}> = ({ filters, onChange }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">מספר משתתפים</h3>
    
    <div>
      <Label htmlFor="participant-count">מספר משתתפים משוער</Label>
      <Input
        id="participant-count"
        type="number"
        placeholder="הזן מספר משתתפים"
        value={filters.participant_count || ''}
        onChange={(e) => onChange({ ...filters, participant_count: parseInt(e.target.value) || undefined })}
      />
    </div>

    <div>
      <Label>סוג מיקום</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
        {[
          { value: 'outdoor', label: 'חוץ' },
          { value: 'indoor', label: 'פנים' },
          { value: 'home', label: 'בית' },
          { value: 'hall', label: 'אולם' }
        ].map(location => (
          <Button
            key={location.value}
            variant={filters.location_type === location.value ? 'default' : 'outline'}
            onClick={() => onChange({ ...filters, location_type: location.value as any })}
            className="text-sm"
          >
            {location.label}
          </Button>
        ))}
      </div>
    </div>
  </div>
);

// רכיב שלב מיקום ותקציב
const LocationBudgetStep: React.FC<{
  filters: GuidedSearchFilters;
  onChange: (filters: GuidedSearchFilters) => void;
}> = ({ filters, onChange }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">מיקום ותקציב</h3>
    
    <div>
      <Label htmlFor="location">מיקום האירוע</Label>
      <Input
        id="location"
        placeholder="עיר או אזור"
        value={filters.location || ''}
        onChange={(e) => onChange({ ...filters, location: e.target.value })}
      />
    </div>

    <div>
      <Label>טווח תקציב</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
        {[
          '0-1000',
          '1001-3000',
          '3001-6000',
          '6001-10000',
          '10000+'
        ].map(range => (
          <Button
            key={range}
            variant={filters.budget_range === range ? 'default' : 'outline'}
            onClick={() => onChange({ ...filters, budget_range: range })}
            className="text-sm"
          >
            ₪{range === '10000+' ? '10,000+' : range.replace('-', '-₪')}
          </Button>
        ))}
      </div>
    </div>
  </div>
);

export default GuidedSearchForm;
