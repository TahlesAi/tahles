
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Target } from "lucide-react";

interface AudienceSectionProps {
  targetAudience: string[];
  suitableFor: string[];
  onTargetAudienceChange: (audience: string) => void;
  onSuitableForChange: (event: string) => void;
}

const AudienceSection: React.FC<AudienceSectionProps> = ({
  targetAudience,
  suitableFor,
  onTargetAudienceChange,
  onSuitableForChange
}) => {
  const targetAudienceOptions = [
    'ילדים (3-12)', 'נוער (13-18)', 'מבוגרים (19-65)', 'קשישים (65+)',
    'משפחות', 'עובדים', 'סטודנטים', 'קהל מעורב'
  ];

  const suitableForOptions = [
    'חתונות', 'בר/בת מצווה', 'ימי הולדת', 'אירועי חברה',
    'מסיבות רווקים/ות', 'ערבי גיבוש', 'קבלת פנים', 'מופע מרכזי',
    'כנסים', 'השקות מוצר', 'מסיבות סיום', 'חגיגות'
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            קהל יעד
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label>לאיזה קהל המוצר מתאים?</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {targetAudienceOptions.map((audience) => (
              <div key={audience} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={`audience-${audience}`}
                  checked={targetAudience.includes(audience)}
                  onCheckedChange={() => onTargetAudienceChange(audience)}
                />
                <Label htmlFor={`audience-${audience}`} className="text-sm">
                  {audience}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>מתאים עבור</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>לאילו סוגי אירועים המוצר מתאים?</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {suitableForOptions.map((event) => (
              <div key={event} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={`event-${event}`}
                  checked={suitableFor.includes(event)}
                  onCheckedChange={() => onSuitableForChange(event)}
                />
                <Label htmlFor={`event-${event}`} className="text-sm">
                  {event}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AudienceSection;
