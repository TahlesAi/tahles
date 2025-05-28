
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventType, GuidedSearchData } from "../GuidedSearchModal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HebrewCategory, HebrewConcept } from "@/lib/types/hierarchy";
import { ChevronLeft } from "lucide-react";

interface ConceptStepProps {
  eventType?: EventType;
  selectedConcept?: string;
  selectedHebrewConcept: HebrewConcept | null | undefined;
  hebrewCategories: HebrewCategory[] | undefined;
  onUpdate: (concept: string, details?: string, audience?: "family" | "friends" | "mixed", category?: string, subcategory?: string) => void;
}

const ConceptStep = ({ 
  eventType,
  selectedConcept,
  selectedHebrewConcept,
  hebrewCategories,
  onUpdate 
}: ConceptStepProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>(undefined);
  const [detailInput, setDetailInput] = useState("");
  const [audience, setAudience] = useState<"family" | "friends" | "mixed" | undefined>(undefined);

  // Filter concepts based on event type
  const getFilteredConcepts = () => {
    let concepts: { id: string, name: string }[] = [];
    
    if (eventType === "private") {
      concepts = [
        { id: "birthday", name: "יום הולדת" },
        { id: "bar-mitzvah", name: "בר/בת מצווה" },
        { id: "wedding", name: "חתונה" },
        { id: "housewarming", name: "חנוכת בית" },
        { id: "anniversary", name: "יום נישואין" },
        { id: "other", name: "אחר" }
      ];
    } else if (eventType === "business") {
      concepts = [
        { id: "conference", name: "כנס" },
        { id: "team-building", name: "יום גיבוש" },
        { id: "product-launch", name: "השקת מוצר" },
        { id: "retirement", name: "מסיבת פרישה" },
        { id: "client-meeting", name: "פגישת לקוחות" },
        { id: "other", name: "אחר" }
      ];
    } else {
      concepts = [
        { id: "mixed-event", name: "אירוע מעורב" },
        { id: "outdoor", name: "אירוע חוץ" },
        { id: "other", name: "אחר" }
      ];
    }
    
    return concepts;
  };

  const handleNext = () => {
    if (selectedHebrewConcept) {
      // Hebrew concept flow - requires all fields
      if (detailInput && selectedCategory && selectedSubcategory && audience) {
        onUpdate(selectedHebrewConcept.id, detailInput, audience, selectedCategory, selectedSubcategory);
      }
    } else {
      // Legacy flow - requires concept and audience (if applicable)
      const isAudienceRequired = eventType === "private" || eventType === "mixed";
      if (detailInput && (!isAudienceRequired || audience)) {
        onUpdate(detailInput, undefined, audience);
      }
    }
  };

  const canProceed = () => {
    if (selectedHebrewConcept) {
      return detailInput && selectedCategory && selectedSubcategory && audience;
    } else {
      const isAudienceRequired = eventType === "private" || eventType === "mixed";
      return detailInput && (!isAudienceRequired || audience);
    }
  };

  return (
    <div dir="rtl" className="space-y-6">
      {selectedHebrewConcept ? (
        <>
          {/* Using Hebrew concept & categories */}
          <div className="text-right">
            <h3 className="text-lg font-medium mb-1">{selectedHebrewConcept.name}</h3>
            <p className="text-gray-500 text-sm mb-4">בחרו את סוג האירוע המדויק והשירותים הרצויים</p>
          </div>
          
          {/* Step 1: Specific subconcept */}
          <div className="text-right">
            <label htmlFor="subconcept" className="block text-sm font-medium mb-2 text-right">בחרו את סוג האירוע המדויק:</label>
            <Select
              onValueChange={(value) => setDetailInput(value)}
              value={detailInput}
            >
              <SelectTrigger className="w-full text-right">
                <SelectValue placeholder="בחרו סוג אירוע" />
              </SelectTrigger>
              <SelectContent className="text-right">
                {selectedHebrewConcept.subconcepts && selectedHebrewConcept.subconcepts.map((subconcept) => (
                  <SelectItem key={subconcept.id} value={subconcept.id} className="text-right">
                    {subconcept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Step 2: Service category */}
          <div className="text-right">
            <label htmlFor="category" className="block text-sm font-medium mb-2 text-right">איזה סוג שירות אתם מחפשים?</label>
            <Select
              onValueChange={(value) => {
                setSelectedCategory(value);
                setSelectedSubcategory(undefined);
              }}
              value={selectedCategory}
            >
              <SelectTrigger className="w-full text-right">
                <SelectValue placeholder="בחרו קטגוריה" />
              </SelectTrigger>
              <SelectContent className="text-right">
                {hebrewCategories && hebrewCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id} className="text-right">
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Step 3: Service subcategory - only if category is selected */}
          {selectedCategory && (
            <div className="text-right">
              <label htmlFor="subcategory" className="block text-sm font-medium mb-2 text-right">בחרו תת-קטגוריה:</label>
              <Select
                onValueChange={(value) => setSelectedSubcategory(value)}
                value={selectedSubcategory}
              >
                <SelectTrigger className="w-full text-right">
                  <SelectValue placeholder="בחרו תת-קטגוריה" />
                </SelectTrigger>
                <SelectContent className="text-right">
                  {hebrewCategories &&
                    hebrewCategories
                      .find(cat => cat.id === selectedCategory)
                      ?.subcategories.map((subcategory) => (
                        <SelectItem key={subcategory.id} value={subcategory.id} className="text-right">
                          {subcategory.name}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Step 4: Target audience */}
          <div className="text-right">
            <p className="block text-sm font-medium mb-3 text-right">האירוע מיועד עבור:</p>
            <RadioGroup 
              value={audience}
              onValueChange={(value) => setAudience(value as "family" | "friends" | "mixed")}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <RadioGroupItem value="family" id="family" />
                <Label htmlFor="family" className="text-right">משפחה</Label>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <RadioGroupItem value="friends" id="friends" />
                <Label htmlFor="friends" className="text-right">חברים</Label>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <RadioGroupItem value="mixed" id="mixed" />
                <Label htmlFor="mixed" className="text-right">מעורב (משפחה וחברים)</Label>
              </div>
            </RadioGroup>
          </div>
        </>
      ) : (
        <>
          {/* Legacy fallback */}
          <div className="text-right">
            <h3 className="text-lg font-medium mb-4">מהו סוג האירוע?</h3>
          </div>
          
          <div className="text-right">
            <Select
              onValueChange={(value) => setDetailInput(value)}
              value={detailInput}
            >
              <SelectTrigger className="w-full text-right">
                <SelectValue placeholder="בחר סוג אירוע" />
              </SelectTrigger>
              <SelectContent className="text-right">
                {getFilteredConcepts().map((concept) => (
                  <SelectItem key={concept.id} value={concept.id} className="text-right">
                    {concept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {detailInput === "birthday" && (
            <div className="text-right">
              <label htmlFor="age" className="block text-sm font-medium mb-2 text-right">גיל:</label>
              <Input 
                id="age" 
                type="number"
                placeholder="הזן גיל"
                className="text-right"
                onChange={(e) => setDetailInput(`יום הולדת ${e.target.value}`)}
              />
            </div>
          )}
          
          {(eventType === "private" || eventType === "mixed") && (
            <div className="text-right">
              <p className="block text-sm font-medium mb-3 text-right">האירוע מיועד עבור:</p>
              <RadioGroup 
                value={audience}
                onValueChange={(value) => setAudience(value as "family" | "friends" | "mixed")}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  <RadioGroupItem value="family" id="family" />
                  <Label htmlFor="family" className="text-right">משפחה</Label>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <RadioGroupItem value="friends" id="friends" />
                  <Label htmlFor="friends" className="text-right">חברים</Label>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <RadioGroupItem value="mixed" id="mixed" />
                  <Label htmlFor="mixed" className="text-right">מעורב (משפחה וחברים)</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </>
      )}

      <div className="mt-8">
        <Button 
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full"
        >
          המשך לתוצאות
          <ChevronLeft className="mr-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ConceptStep;
