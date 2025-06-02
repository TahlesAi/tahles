
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Calendar, Clock, MapPin, Users, Volume2 } from "lucide-react";

interface PersonalizationData {
  eventType: 'business' | 'private';
  audienceType: 'secular' | 'religious' | 'ultra_orthodox' | 'arab';
  language: 'hebrew' | 'arabic' | 'english' | 'russian' | 'french';
  ageGroup: 'children' | 'youth' | 'adults' | 'seniors';
  isReception: boolean;
  isMainShow: boolean;
  isCombined: boolean;
  needsCustomization: boolean;
  attendeesCount: number;
  needsAmplification: boolean;
  eventDate: string;
  eventTime: string;
  location: string;
  budgetLimit?: number;
}

interface EventDetailsSectionProps {
  data: PersonalizationData;
  onUpdate: (updates: Partial<PersonalizationData>) => void;
}

const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      {/* סוג אירוע */}
      <div>
        <Label className="text-base font-medium mb-3 block">סוג האירוע</Label>
        <RadioGroup
          value={data.eventType}
          onValueChange={(value: 'business' | 'private') => onUpdate({ eventType: value })}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="private" id="private" />
            <Label htmlFor="private">אירוע פרטי</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="business" id="business" />
            <Label htmlFor="business">אירוע עסקי</Label>
          </div>
        </RadioGroup>
      </div>

      {/* תאריך ושעה */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="flex items-center mb-2">
            <Calendar className="h-4 w-4 ml-2" />
            תאריך האירוע *
          </Label>
          <Input
            type="date"
            value={data.eventDate}
            onChange={(e) => onUpdate({ eventDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <div>
          <Label className="flex items-center mb-2">
            <Clock className="h-4 w-4 ml-2" />
            שעת האירוע *
          </Label>
          <Input
            type="time"
            value={data.eventTime}
            onChange={(e) => onUpdate({ eventTime: e.target.value })}
            required
          />
        </div>
      </div>

      {/* מיקום */}
      <div>
        <Label className="flex items-center mb-2">
          <MapPin className="h-4 w-4 ml-2" />
          מיקום האירוע *
        </Label>
        <Textarea
          value={data.location}
          onChange={(e) => onUpdate({ location: e.target.value })}
          placeholder="אנא ציין את המיקום המדויק של האירוע..."
          className="min-h-[80px]"
          required
        />
      </div>

      {/* מספר משתתפים */}
      <div>
        <Label className="flex items-center mb-3">
          <Users className="h-4 w-4 ml-2" />
          כמות משתתפים: {data.attendeesCount}
        </Label>
        <Slider
          value={[data.attendeesCount]}
          onValueChange={([value]) => onUpdate({ attendeesCount: value })}
          max={500}
          min={5}
          step={5}
          className="mb-2"
        />
        <div className="text-xs text-gray-500 flex justify-between">
          <span>5</span>
          <span>500+</span>
        </div>
        
        {/* אלרט הגברה */}
        {data.attendeesCount > 30 && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <Checkbox
                id="amplification"
                checked={data.needsAmplification}
                onCheckedChange={(checked) => onUpdate({ needsAmplification: !!checked })}
              />
              <Label htmlFor="amplification" className="mr-2 flex items-center">
                <Volume2 className="h-4 w-4 ml-1" />
                האם ההצעה צריכה לכלול הגברה?
              </Label>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              מומלץ עבור אירועים עם יותר מ-30 משתתפים
            </p>
          </div>
        )}
      </div>

      {/* הגבלת תקציב */}
      <div>
        <div className="flex items-center mb-3">
          <Checkbox
            id="budget-limit"
            checked={!!data.budgetLimit}
            onCheckedChange={(checked) => {
              if (checked) {
                onUpdate({ budgetLimit: 1000 });
              } else {
                onUpdate({ budgetLimit: undefined });
              }
            }}
          />
          <Label htmlFor="budget-limit" className="mr-2">
            האם קיימת מגבלת תקציב?
          </Label>
        </div>
        
        {data.budgetLimit && (
          <div>
            <Label className="block mb-2">
              תקציב מקסימלי: ₪{data.budgetLimit.toLocaleString()}
            </Label>
            <Slider
              value={[data.budgetLimit]}
              onValueChange={([value]) => onUpdate({ budgetLimit: value })}
              max={10000}
              min={500}
              step={100}
              className="mb-2"
            />
            <div className="text-xs text-gray-500 flex justify-between">
              <span>₪500</span>
              <span>₪10,000+</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailsSection;
