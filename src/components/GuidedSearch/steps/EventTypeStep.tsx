
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { EventType } from "../GuidedSearchModal";
import { Check, Users, Building, Heart } from "lucide-react";
import { HebrewConcept } from "@/lib/types/hierarchy";

export interface EventTypeStepProps {
  selectedType: EventType | undefined;
  onSelect: (type: EventType) => void;
  hebrewConcepts: HebrewConcept[];
  onSelectHebrewConcept: (concept: HebrewConcept) => void;
}

const EventTypeStep = ({ 
  selectedType, 
  onSelect,
  hebrewConcepts,
  onSelectHebrewConcept
}: EventTypeStepProps) => {
  
  const eventTypes = [
    {
      id: 'private' as EventType,
      name: 'משפחתי/חברתי',
      description: 'חגיגות, ימי הולדת, מסיבות',
      icon: Heart,
      color: 'text-pink-600'
    },
    {
      id: 'business' as EventType,
      name: 'עסקי/ארגוני',
      description: 'אירועי חברה, כנסים, גיבוש',
      icon: Building,
      color: 'text-blue-600'
    },
    {
      id: 'mixed' as EventType,
      name: 'מעורב',
      description: 'שילוב פרטי ועסקי',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-3 text-right" dir="rtl">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-1">איזה סוג אירוע?</h3>
        <p className="text-gray-600 text-xs">לצורך התאמת השירותים</p>
      </div>
      
      <div className="grid grid-cols-1 gap-2 max-w-md mx-auto">
        {eventTypes.map((eventType) => (
          <Card 
            key={eventType.id} 
            className={`cursor-pointer transition-all hover:border-primary hover:shadow-sm ${
              selectedType === eventType.id ? 'border-2 border-primary bg-primary/5' : 'border'
            }`}
            onClick={() => onSelect(eventType.id)}
          >
            <CardContent className="flex justify-between items-center p-3">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full bg-gray-100 ${eventType.color}`}>
                  <eventType.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">{eventType.name}</p>
                  <p className="text-xs text-gray-500">{eventType.description}</p>
                </div>
              </div>
              
              {selectedType === eventType.id && (
                <div className="bg-primary rounded-full p-1 text-white">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventTypeStep;
