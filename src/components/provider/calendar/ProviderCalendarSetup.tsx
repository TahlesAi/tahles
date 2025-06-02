
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Calendar, Settings } from "lucide-react";
import { toast } from "sonner";

interface WorkingHours {
  start: string;
  end: string;
  enabled: boolean;
}

interface ProviderCalendarSetupProps {
  onComplete: (setupData: any) => void;
  onBack?: () => void;
}

const DAYS_OF_WEEK = [
  { key: 'sunday', label: 'ראשון' },
  { key: 'monday', label: 'שני' },
  { key: 'tuesday', label: 'שלישי' },
  { key: 'wednesday', label: 'רביעי' },
  { key: 'thursday', label: 'חמישי' },
  { key: 'friday', label: 'שישי' },
  { key: 'saturday', label: 'שבת' }
];

const SERVICE_AREAS = [
  'צפון',
  'חיפה והקריות',
  'גוש דן',
  'השרון',
  'ירושלים',
  'שפלה',
  'דרום'
];

const ProviderCalendarSetup: React.FC<ProviderCalendarSetupProps> = ({
  onComplete,
  onBack
}) => {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [workingHours, setWorkingHours] = useState<Record<string, WorkingHours>>({
    sunday: { start: '09:00', end: '17:00', enabled: true },
    monday: { start: '09:00', end: '17:00', enabled: true },
    tuesday: { start: '09:00', end: '17:00', enabled: true },
    wednesday: { start: '09:00', end: '17:00', enabled: true },
    thursday: { start: '09:00', end: '17:00', enabled: true },
    friday: { start: '09:00', end: '14:00', enabled: true },
    saturday: { start: '20:00', end: '23:00', enabled: false }
  });
  
  const [holidayAvailability, setHolidayAvailability] = useState({
    saturdays: false,
    holidays: false
  });
  
  const [specialHours, setSpecialHours] = useState({
    hasSpecialHours: false,
    description: ''
  });

  const handleAreaToggle = (area: string) => {
    setSelectedAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const handleWorkingHoursChange = (day: string, field: 'start' | 'end' | 'enabled', value: string | boolean) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    if (selectedAreas.length === 0) {
      toast.error('יש לבחור לפחות אזור שירות אחד');
      return;
    }

    const enabledDays = Object.entries(workingHours)
      .filter(([_, hours]) => hours.enabled)
      .map(([day, _]) => day);

    if (enabledDays.length === 0) {
      toast.error('יש לבחור לפחות יום עבודה אחד');
      return;
    }

    const setupData = {
      serviceAreas: selectedAreas,
      workingHours,
      holidayAvailability,
      specialHours
    };

    console.log('Calendar setup data:', setupData);
    toast.success('הגדרות היומן נשמרו בהצלחה!');
    onComplete(setupData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6" dir="rtl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calendar className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">הגדרת יומן העבודה</h1>
        </div>
        <p className="text-gray-600">
          הגדר את אזורי הפעילות, ימי העבודה ושעות הזמינות שלך
        </p>
      </div>

      {/* אזורי שירות */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            אזורי שירות
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            בחר את האזורים בהם אתה מעוניין להעניק שירותים
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SERVICE_AREAS.map((area) => (
              <div
                key={area}
                onClick={() => handleAreaToggle(area)}
                className={`
                  p-3 rounded-lg border-2 cursor-pointer transition-all text-center
                  ${selectedAreas.includes(area)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }
                `}
              >
                <span className="font-medium">{area}</span>
              </div>
            ))}
          </div>
          {selectedAreas.length > 0 && (
            <div className="mt-4">
              <Label className="text-sm font-medium text-gray-700">אזורים נבחרים:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedAreas.map((area) => (
                  <Badge key={area} variant="secondary">{area}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* שעות עבודה */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            שעות עבודה רגילות
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {DAYS_OF_WEEK.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="flex items-center gap-2 w-20">
                  <Checkbox
                    checked={workingHours[key].enabled}
                    onCheckedChange={(checked) => 
                      handleWorkingHoursChange(key, 'enabled', Boolean(checked))
                    }
                  />
                  <Label className="font-medium">{label}</Label>
                </div>
                
                {workingHours[key].enabled && (
                  <div className="flex items-center gap-2 flex-1">
                    <Label className="text-sm">מ-</Label>
                    <Input
                      type="time"
                      value={workingHours[key].start}
                      onChange={(e) => handleWorkingHoursChange(key, 'start', e.target.value)}
                      className="w-32"
                    />
                    <Label className="text-sm">עד</Label>
                    <Input
                      type="time"
                      value={workingHours[key].end}
                      onChange={(e) => handleWorkingHoursChange(key, 'end', e.target.value)}
                      className="w-32"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* זמינות מיוחדת */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            הגדרות מיוחדות
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={holidayAvailability.saturdays}
                onCheckedChange={(checked) => 
                  setHolidayAvailability(prev => ({ ...prev, saturdays: Boolean(checked) }))
                }
              />
              <Label>זמין לעבודה בשבתות</Label>
            </div>
            
            <div className="flex items-center gap-2">
              <Checkbox
                checked={holidayAvailability.holidays}
                onCheckedChange={(checked) => 
                  setHolidayAvailability(prev => ({ ...prev, holidays: Boolean(checked) }))
                }
              />
              <Label>זמין לעבודה בערבי חג וחגים</Label>
            </div>
            
            <div className="flex items-center gap-2">
              <Checkbox
                checked={specialHours.hasSpecialHours}
                onCheckedChange={(checked) => 
                  setSpecialHours(prev => ({ ...prev, hasSpecialHours: Boolean(checked) }))
                }
              />
              <Label>יש לי שעות פעילות חריגות</Label>
            </div>
            
            {specialHours.hasSpecialHours && (
              <div className="mr-6 mt-2">
                <Label className="text-sm text-gray-700">פרט את השעות החריגות:</Label>
                <Input
                  placeholder="לדוגמה: זמין גם בלילות עד השעה 02:00, או בימי ראשון משעה 06:00"
                  value={specialHours.description}
                  onChange={(e) => 
                    setSpecialHours(prev => ({ ...prev, description: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* כפתורי פעולה */}
      <div className="flex justify-between pt-6">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            חזור
          </Button>
        )}
        <Button 
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          שמור והמשך
        </Button>
      </div>
    </div>
  );
};

export default ProviderCalendarSetup;
