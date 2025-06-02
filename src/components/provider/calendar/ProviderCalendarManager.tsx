
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ServiceArea {
  id: string;
  name: string;
  radius: number;
  travelCost: number;
}

interface WorkingHours {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
  holidayWork: boolean;
}

const ProviderCalendarManager: React.FC = () => {
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([
    { id: '1', name: 'תל אביב והסביבה', radius: 15, travelCost: 0 },
    { id: '2', name: 'רמת גן - גבעתיים', radius: 10, travelCost: 100 }
  ]);

  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([
    { day: 'ראשון', enabled: true, startTime: '09:00', endTime: '22:00', holidayWork: false },
    { day: 'שני', enabled: true, startTime: '09:00', endTime: '22:00', holidayWork: false },
    { day: 'שלישי', enabled: true, startTime: '09:00', endTime: '22:00', holidayWork: false },
    { day: 'רביעי', enabled: true, startTime: '09:00', endTime: '22:00', holidayWork: false },
    { day: 'חמישי', enabled: true, startTime: '09:00', endTime: '22:00', holidayWork: false },
    { day: 'שישי', enabled: true, startTime: '09:00', endTime: '16:00', holidayWork: false },
    { day: 'שבת', enabled: false, startTime: '20:00', endTime: '23:59', holidayWork: true }
  ]);

  const updateWorkingHours = (dayIndex: number, field: keyof WorkingHours, value: any) => {
    const updated = [...workingHours];
    updated[dayIndex] = { ...updated[dayIndex], [field]: value };
    setWorkingHours(updated);
  };

  const addServiceArea = () => {
    const newArea: ServiceArea = {
      id: Date.now().toString(),
      name: 'אזור שירות חדש',
      radius: 20,
      travelCost: 200
    };
    setServiceAreas([...serviceAreas, newArea]);
  };

  const removeServiceArea = (id: string) => {
    setServiceAreas(serviceAreas.filter(area => area.id !== id));
  };

  const saveSettings = () => {
    // כאן נשמור את ההגדרות לשרת
    console.log('Saving calendar settings:', { serviceAreas, workingHours });
    toast.success('הגדרות היומן נשמרו בהצלחה');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto" dir="rtl">
      {/* אזורי שירות */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            אזורי שירות
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceAreas.map((area) => (
              <div key={area.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{area.name}</h4>
                  <p className="text-sm text-gray-600">
                    רדיוס: {area.radius} ק"מ | עלות נסיעה: ₪{area.travelCost}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeServiceArea(area.id)}
                >
                  הסר
                </Button>
              </div>
            ))}
            <Button onClick={addServiceArea} variant="outline" className="w-full">
              הוסף אזור שירות
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* שעות פעילות */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            שעות פעילות
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workingHours.map((day, index) => (
              <div key={day.day} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-16 font-medium">{day.day}</div>
                
                <Switch
                  checked={day.enabled}
                  onCheckedChange={(checked) => updateWorkingHours(index, 'enabled', checked)}
                />
                
                {day.enabled && (
                  <>
                    <Select
                      value={day.startTime}
                      onValueChange={(value) => updateWorkingHours(index, 'startTime', value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, '0');
                          return (
                            <SelectItem key={hour} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    
                    <span>-</span>
                    
                    <Select
                      value={day.endTime}
                      onValueChange={(value) => updateWorkingHours(index, 'endTime', value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, '0');
                          return (
                            <SelectItem key={hour} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <div className="flex items-center gap-2">
                      <Switch
                        checked={day.holidayWork}
                        onCheckedChange={(checked) => updateWorkingHours(index, 'holidayWork', checked)}
                      />
                      <span className="text-sm">חגים</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* כפתור שמירה */}
      <div className="flex justify-end">
        <Button onClick={saveSettings} className="px-8">
          שמור הגדרות
        </Button>
      </div>
    </div>
  );
};

export default ProviderCalendarManager;
