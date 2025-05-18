
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

  return (
    <div dir="rtl">
      {selectedHebrewConcept ? (
        <>
          {/* Using Hebrew concept & categories */}
          <h3 className="text-lg font-medium mb-1">{selectedHebrewConcept.name}</h3>
          <p className="text-gray-500 text-sm mb-4">בחרו את סוג האירוע המדויק והשירותים הרצויים</p>
          
          {/* Step 1: Specific subconcept */}
          <div className="mb-6">
            <label htmlFor="subconcept" className="block text-sm font-medium mb-2">בחרו את סוג האירוע המדויק:</label>
            <Select
              onValueChange={(value) => setDetailInput(value)}
              defaultValue={detailInput}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="בחרו סוג אירוע" />
              </SelectTrigger>
              <SelectContent>
                {selectedHebrewConcept.subconcepts && selectedHebrewConcept.subconcepts.map((subconcept) => (
                  <SelectItem key={subconcept.id} value={subconcept.id}>
                    {subconcept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Step 2: Service category */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium mb-2">איזה סוג שירות אתם מחפשים?</label>
            <Select
              onValueChange={(value) => {
                setSelectedCategory(value);
                setSelectedSubcategory(undefined);
              }}
              defaultValue={selectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="בחרו קטגוריה" />
              </SelectTrigger>
              <SelectContent>
                {hebrewCategories && hebrewCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Step 3: Service subcategory - only if category is selected */}
          {selectedCategory && (
            <div className="mb-6">
              <label htmlFor="subcategory" className="block text-sm font-medium mb-2">בחרו תת-קטגוריה:</label>
              <Select
                onValueChange={(value) => setSelectedSubcategory(value)}
                defaultValue={selectedSubcategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="בחרו תת-קטגוריה" />
                </SelectTrigger>
                <SelectContent>
                  {hebrewCategories &&
                    hebrewCategories
                      .find(cat => cat.id === selectedCategory)
                      ?.subcategories.map((subcategory) => (
                        <SelectItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Step 4: Target audience */}
          <div className="mb-6">
            <p className="block text-sm font-medium mb-3">האירוע מיועד עבור:</p>
            <RadioGroup 
              defaultValue={audience}
              onValueChange={(value) => setAudience(value as "family" | "friends" | "mixed")}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <RadioGroupItem value="family" id="family" />
                <Label htmlFor="family">משפחה</Label>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <RadioGroupItem value="friends" id="friends" />
                <Label htmlFor="friends">חברים</Label>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <RadioGroupItem value="mixed" id="mixed" />
                <Label htmlFor="mixed">מעורב (משפחה וחברים)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mt-8">
            <Button 
              onClick={() => onUpdate(
                selectedHebrewConcept.id, 
                detailInput, 
                audience,
                selectedCategory,
                selectedSubcategory
              )} 
              disabled={!detailInput || !selectedCategory || !selectedSubcategory || !audience}
              className="w-full"
            >
              המשך לתוצאות
              <ChevronLeft className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Legacy fallback */}
          <h3 className="text-lg font-medium mb-4">מהו סוג האירוע?</h3>
          
          <Select
            onValueChange={(value) => setDetailInput(value)}
            defaultValue={detailInput}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="בחר סוג אירוע" />
            </SelectTrigger>
            <SelectContent>
              {getFilteredConcepts().map((concept) => (
                <SelectItem key={concept.id} value={concept.id}>
                  {concept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {detailInput === "birthday" && (
            <div className="mt-4">
              <label htmlFor="age" className="block text-sm font-medium mb-2">גיל:</label>
              <Input 
                id="age" 
                type="number"
                placeholder="הזן גיל"
                onChange={(e) => setDetailInput(`יום הולדת ${e.target.value}`)}
              />
            </div>
          )}
          
          {(eventType === "private" || eventType === "mixed") && (
            <div className="mt-6">
              <p className="block text-sm font-medium mb-3">האירוע מיועד עבור:</p>
              <RadioGroup 
                defaultValue={audience}
                onValueChange={(value) => setAudience(value as "family" | "friends" | "mixed")}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  <RadioGroupItem value="family" id="family" />
                  <Label htmlFor="family">משפחה</Label>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <RadioGroupItem value="friends" id="friends" />
                  <Label htmlFor="friends">חברים</Label>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <RadioGroupItem value="mixed" id="mixed" />
                  <Label htmlFor="mixed">מעורב (משפחה וחברים)</Label>
                </div>
              </RadioGroup>
            </div>
          )}
          
          <div className="mt-8">
            <Button 
              onClick={() => onUpdate(detailInput, undefined, audience)} 
              disabled={!detailInput || ((eventType === "private" || eventType === "mixed") && !audience)}
              className="w-full"
            >
              המשך לתוצאות
              <ChevronLeft className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ConceptStep;
