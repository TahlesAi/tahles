
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
      name: 'אירוע משפחתי/חברתי',
      description: 'חגיגות משפחתיות, ימי הולדת, מסיבות חברים',
      icon: Heart,
      color: 'text-pink-600'
    },
    {
      id: 'business' as EventType,
      name: 'אירוע עסקי/ארגוני',
      description: 'אירועי חברה, כנסים, ימי גיבוש, פעילויות צוות',
      icon: Building,
      color: 'text-blue-600'
    },
    {
      id: 'mixed' as EventType,
      name: 'אירוע מעורב',
      description: 'שילוב של אלמנטים פרטיים ועסקיים',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-4 text-right" dir="rtl">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">איזה סוג אירוע אתם מתכננים?</h3>
        <p className="text-gray-600 text-sm">בחירת סוג האירוע תעזור לנו להתאים לכם את השירותים המתאימים ביותר</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3 max-w-lg mx-auto">
        {eventTypes.map((eventType) => (
          <Card 
            key={eventType.id} 
            className={`cursor-pointer transition-all hover:border-primary hover:shadow-md ${
              selectedType === eventType.id ? 'border-2 border-primary bg-primary/5' : 'border'
            }`}
            onClick={() => onSelect(eventType.id)}
          >
            <CardContent className="flex justify-between items-center p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-gray-100 ${eventType.color}`}>
                  <eventType.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-base">{eventType.name}</p>
                  <p className="text-xs text-gray-500">{eventType.description}</p>
                </div>
              </div>
              
              {selectedType === eventType.id && (
                <div className="bg-primary rounded-full p-1 text-white">
                  <Check className="h-4 w-4" />
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
