
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Globe, Baby } from "lucide-react";

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

interface AudienceSectionProps {
  data: PersonalizationData;
  onUpdate: (updates: Partial<PersonalizationData>) => void;
}

const AudienceSection: React.FC<AudienceSectionProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      {/* אופי קהל */}
      <div>
        <Label className="flex items-center mb-3 text-base font-medium">
          <Users className="h-4 w-4 ml-2" />
          אופי הקהל
        </Label>
        <Select
          value={data.audienceType}
          onValueChange={(value: any) => onUpdate({ audienceType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="בחר אופי קהל" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="secular">חילוני</SelectItem>
            <SelectItem value="religious">דתי</SelectItem>
            <SelectItem value="ultra_orthodox">חרדי</SelectItem>
            <SelectItem value="arab">ערבי</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* שפה מבוקשת */}
      <div>
        <Label className="flex items-center mb-3 text-base font-medium">
          <Globe className="h-4 w-4 ml-2" />
          שפה מבוקשת
        </Label>
        <Select
          value={data.language}
          onValueChange={(value: any) => onUpdate({ language: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="בחר שפה" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hebrew">עברית</SelectItem>
            <SelectItem value="arabic">ערבית</SelectItem>
            <SelectItem value="english">אנגלית</SelectItem>
            <SelectItem value="russian">רוסית</SelectItem>
            <SelectItem value="french">צרפתית</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* גילאים */}
      <div>
        <Label className="flex items-center mb-3 text-base font-medium">
          <Baby className="h-4 w-4 ml-2" />
          קבוצת גיל
        </Label>
        <Select
          value={data.ageGroup}
          onValueChange={(value: any) => onUpdate({ ageGroup: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="בחר קבוצת גיל" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="children">ילדים (0-12)</SelectItem>
            <SelectItem value="youth">נוער (13-18)</SelectItem>
            <SelectItem value="adults">בוגרים (19-65)</SelectItem>
            <SelectItem value="seniors">מבוגרים (65+)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AudienceSection;
