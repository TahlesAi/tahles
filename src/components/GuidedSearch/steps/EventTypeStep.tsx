
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Check, Users, Building, Heart, Baby } from "lucide-react";
import { HebrewConcept } from "@/lib/types/hierarchy";
import { EventType } from "@/hooks/useGuidedSearchStorage";

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
      name: 'אירוע פרטי',
      description: 'ימי הולדת, חגיגות משפחתיות',
      icon: Heart,
      color: 'text-pink-600'
    },
    {
      id: 'business' as EventType,
      name: 'אירוע עסקי',
      description: 'אירועי חברה, כנסים, ימי גיבוש',
      icon: Building,
      color: 'text-blue-600'
    },
    {
      id: 'children' as EventType,
      name: 'אירוע ילדים',
      description: 'ימי הולדת לילדים, אירועי גן',
      icon: Baby,
      color: 'text-green-600'
    },
    {
      id: 'mixed' as EventType,
      name: 'אירוע מעורב',
      description: 'בר/בת מצווה, חתונות',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  const handleTypeSelect = (typeId: EventType) => {
    onSelect(typeId);
    
    // חיבור לקונספטים עבריים
    const relevantConcept = hebrewConcepts.find(concept => {
      if (typeId === 'private' && concept.id === 'family-event') return true;
      if (typeId === 'business' && concept.id === 'company-event') return true;
      if (typeId === 'children' && concept.id === 'children-event') return true;
      if (typeId === 'mixed' && concept.id === 'celebration-event') return true;
      return false;
    });
    
    if (relevantConcept) {
      onSelectHebrewConcept(relevantConcept);
    }
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">איזה סוג אירוע אתם מתכננים?</h3>
        <p className="text-gray-600 text-sm">בחרו את הסוג המתאים ביותר</p>
      </div>
      
      <div className="space-y-3">
        {eventTypes.map((eventType) => (
          <Card 
            key={eventType.id} 
            className={`cursor-pointer transition-all duration-200 hover:border-primary hover:shadow-md border-2 ${
              selectedType === eventType.id ? 'border-primary bg-primary/10 shadow-md' : 'border-gray-200'
            }`}
            onClick={() => handleTypeSelect(eventType.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`p-2 rounded-full bg-gray-100 ${eventType.color}`}>
                    <eventType.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{eventType.name}</h4>
                    <p className="text-sm text-gray-600">{eventType.description}</p>
                  </div>
                </div>
                
                {selectedType === eventType.id && (
                  <div className="bg-primary rounded-full p-2 text-white flex-shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedType && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-sm text-green-800">
            ✅ נבחר: {eventTypes.find(t => t.id === selectedType)?.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default EventTypeStep;
