
import { Button } from "@/components/ui/button";
import { User, Briefcase, Users, Baby } from "lucide-react";
import { EventType } from "../GuidedSearchModal";
import { HebrewConcept } from "@/lib/types/hierarchy";

interface EventTypeStepProps {
  selectedType: EventType | undefined;
  onSelect: (type: EventType) => void;
  hebrewConcepts?: HebrewConcept[];
  onSelectHebrewConcept?: (concept: HebrewConcept) => void;
}

const EventTypeStep = ({ selectedType, onSelect, hebrewConcepts, onSelectHebrewConcept }: EventTypeStepProps) => {
  const eventTypes = [
    {
      id: "private",
      name: "אירוע פרטי",
      description: "ימי הולדת, חתונות, בריתות, בר/בת מצווה וכו׳",
      icon: <User className="h-8 w-8 mb-2" />
    },
    {
      id: "business",
      name: "אירוע עסקי",
      description: "אירועי חברה, גיבוש, כנסים, אירועים מקצועיים",
      icon: <Briefcase className="h-8 w-8 mb-2" />
    },
    {
      id: "mixed",
      name: "אירוע מעורב",
      description: "שילוב של אירוע פרטי ועסקי",
      icon: <Users className="h-8 w-8 mb-2" />
    },
    {
      id: "children",
      name: "אירוע לילדים",
      description: "ימי הולדת, מסיבות כיתה, חגיגות לילדים",
      icon: <Baby className="h-8 w-8 mb-2" />
    }
  ];
  
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <h3 className="text-lg font-medium text-center">מהו סוג האירוע?</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eventTypes.map(type => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id as EventType)}
            className={`p-4 rounded-lg border text-right flex flex-col hover:border-primary transition-all ${
              selectedType === type.id ? "border-primary bg-primary/10" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col items-start">
              {type.icon}
              <h4 className="font-medium text-lg">{type.name}</h4>
              <p className="text-sm text-gray-500 mt-1">{type.description}</p>
            </div>
          </button>
        ))}
      </div>
      
      {/* הוספת תמיכה בקונספטים עבריים, אם סופקו */}
      {hebrewConcepts && hebrewConcepts.length > 0 && onSelectHebrewConcept && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">או בחר קטגוריית אירוע:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {hebrewConcepts.map(concept => (
              <button
                key={concept.id}
                onClick={() => onSelectHebrewConcept(concept)}
                className="p-3 border rounded-lg hover:bg-gray-50"
              >
                <h4 className="font-medium">{concept.name}</h4>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTypeStep;
