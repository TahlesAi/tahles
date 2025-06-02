
import React from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CalendarSlotFormProps {
  newSlot: {
    startTime: string;
    endTime: string;
    maxBookings: number;
    serviceArea: string;
    isAvailable: boolean;
  };
  onSlotChange: (updates: Partial<typeof newSlot>) => void;
  onAddSlot: () => void;
  loading: boolean;
}

const CalendarSlotForm: React.FC<CalendarSlotFormProps> = ({
  newSlot,
  onSlotChange,
  onAddSlot,
  loading
}) => {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h4 className="font-medium">הוסף משבצת זמן</h4>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">שעת התחלה</label>
          <Input
            type="time"
            value={newSlot.startTime}
            onChange={(e) => onSlotChange({ startTime: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">שעת סיום</label>
          <Input
            type="time"
            value={newSlot.endTime}
            onChange={(e) => onSlotChange({ endTime: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">מקסימום הזמנות</label>
          <Input
            type="number"
            min="1"
            value={newSlot.maxBookings}
            onChange={(e) => onSlotChange({ maxBookings: parseInt(e.target.value) || 1 })}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">אזור שירות</label>
          <Input
            placeholder="תל אביב, ירושלים..."
            value={newSlot.serviceArea}
            onChange={(e) => onSlotChange({ serviceArea: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch
            checked={newSlot.isAvailable}
            onCheckedChange={(checked) => onSlotChange({ isAvailable: checked })}
          />
          <span className="text-sm">זמין להזמנות</span>
        </div>
        
        <Button onClick={onAddSlot} disabled={loading}>
          <Plus className="h-4 w-4 ml-1" />
          הוסף משבצת
        </Button>
      </div>
    </div>
  );
};

export default CalendarSlotForm;
