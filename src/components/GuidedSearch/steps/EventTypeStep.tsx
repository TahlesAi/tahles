
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { EventType } from "../GuidedSearchModal";
import { Check } from "lucide-react";
import { HebrewConcept } from "@/lib/types/hierarchy";

// Props type definition
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
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">איזה סוג אירוע אתם מתכננים?</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Using Hebrew hierarchy concepts */}
        {hebrewConcepts && hebrewConcepts.map((concept) => (
          <Card 
            key={concept.id} 
            className={`cursor-pointer transition-all hover:border-primary ${
              (concept.id === "family-event" && selectedType === "private") ||
              (concept.id === "company-event" && selectedType === "business") ? 
              'border-2 border-primary' : 'border'
            }`}
            onClick={() => onSelectHebrewConcept(concept)}
          >
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className="font-medium">{concept.name}</p>
                <p className="text-sm text-gray-500">
                  {concept.id === "family-event" && "אירועים פרטיים, חגיגות משפחתיות וימי הולדת"}
                  {concept.id === "company-event" && "אירועים עסקיים, כנסים וימי גיבוש"}
                  {concept.id === "personal-development" && "סדנאות, הרצאות והכשרות"}
                  {concept.id === "outdoor-team-building" && "פעילויות חוץ וימי כיף"}
                  {concept.id === "gifts-and-tickets" && "מתנות, כרטיסים ותווי קנייה"}
                </p>
              </div>
              
              {((concept.id === "family-event" && selectedType === "private") ||
                (concept.id === "company-event" && selectedType === "business")) && (
                <div className="bg-primary rounded-full p-1 text-white">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Fallback for older event types if Hebrew concepts aren't available */}
        {(!hebrewConcepts || hebrewConcepts.length === 0) && (
          <>
            <Card 
              className={`cursor-pointer transition-all hover:border-primary ${selectedType === "private" ? 'border-2 border-primary' : 'border'}`}
              onClick={() => onSelect("private")}
            >
              <CardContent className="flex justify-between items-center p-4">
                <div>
                  <p className="font-medium">אירוע פרטי</p>
                  <p className="text-sm text-gray-500">אירועים פרטיים, חגיגות משפחתיות וימי הולדת</p>
                </div>
                
                {selectedType === "private" && (
                  <div className="bg-primary rounded-full p-1 text-white">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:border-primary ${selectedType === "business" ? 'border-2 border-primary' : 'border'}`}
              onClick={() => onSelect("business")}
            >
              <CardContent className="flex justify-between items-center p-4">
                <div>
                  <p className="font-medium">אירוע עסקי</p>
                  <p className="text-sm text-gray-500">אירועים עסקיים, כנסים וימי גיבוש</p>
                </div>
                
                {selectedType === "business" && (
                  <div className="bg-primary rounded-full p-1 text-white">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:border-primary ${selectedType === "mixed" ? 'border-2 border-primary' : 'border'}`}
              onClick={() => onSelect("mixed")}
            >
              <CardContent className="flex justify-between items-center p-4">
                <div>
                  <p className="font-medium">אירוע מעורב</p>
                  <p className="text-sm text-gray-500">שילוב של אירוע פרטי ועסקי</p>
                </div>
                
                {selectedType === "mixed" && (
                  <div className="bg-primary rounded-full p-1 text-white">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:border-primary ${selectedType === "children" ? 'border-2 border-primary' : 'border'}`}
              onClick={() => onSelect("children")}
            >
              <CardContent className="flex justify-between items-center p-4">
                <div>
                  <p className="font-medium">אירוע ילדים</p>
                  <p className="text-sm text-gray-500">אירועים וחגיגות לילדים ונוער</p>
                </div>
                
                {selectedType === "children" && (
                  <div className="bg-primary rounded-full p-1 text-white">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        בחירת סוג האירוע תעזור לנו להתאים לכם את השירותים המתאימים ביותר
      </div>
    </div>
  );
};

export default EventTypeStep;
