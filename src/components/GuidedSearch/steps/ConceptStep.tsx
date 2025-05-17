
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { EventType } from "../GuidedSearchModal";

interface ConceptStepProps {
  eventType: EventType | undefined;
  selectedConcept: string | undefined;
  onUpdate: (concept: string, details?: string, audience?: 'family' | 'friends' | 'mixed' | null) => void;
}

const ConceptStep = ({ eventType, selectedConcept, onUpdate }: ConceptStepProps) => {
  const [selectedOption, setSelectedOption] = useState(selectedConcept || "");
  const [otherConcept, setOtherConcept] = useState("");
  const [ageDetails, setAgeDetails] = useState("");
  const [audience, setAudience] = useState<'family' | 'friends' | 'mixed' | null>(null);
  
  const concepts = useMemo(() => {
    const commonConcepts = [
      { id: "other", name: "אחר" }
    ];
    
    const conceptsByType: Record<EventType, { id: string, name: string }[]> = {
      private: [
        { id: "wedding", name: "חתונה" },
        { id: "bar_mitzvah", name: "בר/בת מצווה" },
        { id: "brit", name: "ברית/ה" },
        { id: "birthday", name: "יום הולדת" },
        { id: "anniversary", name: "יום נישואין" },
        { id: "bachelor_party", name: "מסיבת רווקים/ות" },
        { id: "retirement", name: "יציאה לפנסיה" },
        { id: "golden_wedding", name: "חתונת זהב" },
        { id: "engagement", name: "אירוסין" }
      ],
      business: [
        { id: "company_event", name: "אירוע חברה" },
        { id: "team_building", name: "גיבוש צוות" },
        { id: "conference", name: "כנס" },
        { id: "excellence_ceremony", name: "טקס מצטיינים" },
        { id: "retirement_ceremony", name: "טקס פרישה" },
        { id: "employees_trip", name: "טיול עובדים" },
        { id: "holiday_gifts", name: "מתנות לחג" }
      ],
      mixed: [
        { id: "wedding", name: "חתונה" },
        { id: "bar_mitzvah", name: "בר/בת מצווה" },
        { id: "company_event", name: "אירוע חברה" },
        { id: "conference", name: "כנס" },
        { id: "anniversary", name: "יום נישואין/אירוע שנתי" }
      ],
      children: [
        { id: "birthday", name: "יום הולדת" },
        { id: "bar_mitzvah", name: "בר/בת מצווה" },
        { id: "class_party", name: "מסיבת כיתה" },
        { id: "graduation", name: "סיום שנה/תואר" }
      ]
    };
    
    if (!eventType) {
      return commonConcepts;
    }
    
    return [...conceptsByType[eventType], ...commonConcepts];
  }, [eventType]);
  
  const showAgeInput = selectedOption === "birthday";
  const showAudienceSelect = selectedOption === "birthday";
  
  const handleContinue = () => {
    if (selectedOption === "other" && otherConcept) {
      onUpdate(otherConcept);
    } else if (showAgeInput && ageDetails) {
      onUpdate(selectedOption, ageDetails, audience);
    } else {
      onUpdate(selectedOption);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-center">מהו הקונספט של האירוע?</h3>
      
      <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-3">
        {concepts.map(concept => (
          <div key={concept.id} className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value={concept.id} id={`concept-${concept.id}`} />
            <Label htmlFor={`concept-${concept.id}`} className="cursor-pointer flex-grow">
              {concept.name}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {selectedOption === "other" && (
        <div className="space-y-2">
          <Label htmlFor="other-concept">פרט את סוג האירוע:</Label>
          <Input
            id="other-concept"
            value={otherConcept}
            onChange={(e) => setOtherConcept(e.target.value)}
            placeholder="הקלד את סוג האירוע"
          />
        </div>
      )}
      
      {showAgeInput && (
        <div className="space-y-2">
          <Label htmlFor="age-details">גיל:</Label>
          <Input
            id="age-details"
            value={ageDetails}
            onChange={(e) => setAgeDetails(e.target.value)}
            placeholder="הזן את הגיל"
            type="number"
          />
        </div>
      )}
      
      {showAudienceSelect && (
        <div className="space-y-2">
          <Label>האירוע מיועד ל:</Label>
          <RadioGroup value={audience || ""} onValueChange={(value) => setAudience(value as any)} className="space-y-3">
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="family" id="audience-family" />
              <Label htmlFor="audience-family">משפחה</Label>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="friends" id="audience-friends" />
              <Label htmlFor="audience-friends">חברים</Label>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="mixed" id="audience-mixed" />
              <Label htmlFor="audience-mixed">משולב</Label>
            </div>
          </RadioGroup>
        </div>
      )}
      
      <div className="flex justify-center pt-4">
        <Button onClick={handleContinue} disabled={(selectedOption === "other" && !otherConcept) || (showAgeInput && !ageDetails)}>
          המשך
        </Button>
      </div>
    </div>
  );
};

export default ConceptStep;
