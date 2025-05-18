
import { useState } from "react";
import { EventType } from "../GuidedSearchModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HebrewCategory, HebrewConcept } from "@/lib/types/hierarchy";

interface ConceptStepProps {
  eventType?: EventType;
  selectedConcept?: string;
  selectedHebrewConcept?: HebrewConcept | null;
  hebrewCategories?: HebrewCategory[];
  onUpdate: (
    concept: string, 
    details?: string, 
    audience?: 'family' | 'friends' | 'mixed' | null,
    category?: string,
    subcategory?: string
  ) => void;
}

const ConceptStep = ({ 
  eventType, 
  selectedConcept, 
  selectedHebrewConcept, 
  hebrewCategories,
  onUpdate 
}: ConceptStepProps) => {
  const [details, setDetails] = useState("");
  const [audience, setAudience] = useState<'family' | 'friends' | 'mixed' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>();
  
  // קונספטים לפי סוג האירוע
  const getConceptsByType = () => {
    switch(eventType) {
      case 'private':
        return [
          { id: 'birthday', name: 'יום הולדת' },
          { id: 'wedding', name: 'חתונה' },
          { id: 'bar_mitzvah', name: 'בר/בת מצווה' },
          { id: 'housewarming', name: 'חנוכת בית' },
          { id: 'anniversary', name: 'יום נישואין' }
        ];
      case 'business':
        return [
          { id: 'team_building', name: 'גיבוש צוות' },
          { id: 'conference', name: 'כנס' },
          { id: 'product_launch', name: 'השקת מוצר' },
          { id: 'retirement', name: 'פרישה לגמלאות' },
          { id: 'holiday_party', name: 'חגיגת חג' }
        ];
      case 'mixed':
        return [
          { id: 'community_event', name: 'אירוע קהילתי' },
          { id: 'fundraiser', name: 'התרמה' },
          { id: 'networking', name: 'נטוורקינג' },
          { id: 'workshop', name: 'סדנה' }
        ];
      case 'children':
        return [
          { id: 'kids_birthday', name: 'יום הולדת ילדים' },
          { id: 'class_party', name: 'מסיבת כיתה' },
          { id: 'holiday_event', name: 'חגיגת חג לילדים' },
          { id: 'camp_activity', name: 'פעילות קייטנה' }
        ];
      default:
        return [
          { id: 'general_event', name: 'אירוע כללי' },
          { id: 'misc', name: 'אחר' }
        ];
    }
  };
  
  // Handle Hebrew concept if selected
  const handleHebrewSelection = () => {
    const categoryId = hebrewCategories?.[0]?.id || "";
    const subcategoryId = hebrewCategories?.[0]?.subcategories[0]?.id || "";
    
    setSelectedCategory(categoryId);
    setSelectedSubcategory(subcategoryId);
    
    // Continue to next step
    handleContinue();
  };
  
  const handleContinue = () => {
    const conceptId = selectedHebrewConcept?.id || selectedConcept || 'general_event';
    onUpdate(
      conceptId, 
      details, 
      audience,
      selectedCategory,
      selectedSubcategory
    );
  };
  
  // אם נבחר קונספט עברי, הצג אותו
  if (selectedHebrewConcept) {
    return (
      <div className="space-y-6 text-right" dir="rtl">
        <h3 className="text-lg font-medium text-center">פרטים על {selectedHebrewConcept.name}</h3>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-medium">קונספט נבחר: {selectedHebrewConcept.name}</p>
          
          {selectedHebrewConcept.subconcepts && selectedHebrewConcept.subconcepts.length > 0 && (
            <div className="mt-4">
              <p className="mb-2">בחר סוג ספציפי:</p>
              <div className="grid grid-cols-2 gap-2">
                {selectedHebrewConcept.subconcepts.map(subconcept => (
                  <Button 
                    key={subconcept.id}
                    variant="outline" 
                    className="justify-start" 
                    onClick={() => setDetails(subconcept.name)}
                  >
                    {subconcept.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* קטגוריות שירותים */}
          {hebrewCategories && hebrewCategories.length > 0 && (
            <div className="mt-6">
              <p className="mb-2">בחר קטגוריית שירות:</p>
              <div className="grid grid-cols-2 gap-2">
                {hebrewCategories.map(category => (
                  <Button 
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="justify-start" 
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <p className="mb-2">מיועד עבור:</p>
            <div className="flex gap-2">
              <Button 
                variant={audience === 'family' ? "default" : "outline"} 
                onClick={() => setAudience('family')}
              >
                משפחה
              </Button>
              <Button 
                variant={audience === 'friends' ? "default" : "outline"} 
                onClick={() => setAudience('friends')}
              >
                חברים
              </Button>
              <Button 
                variant={audience === 'mixed' ? "default" : "outline"} 
                onClick={() => setAudience('mixed')}
              >
                מעורב
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center pt-4">
          <Button onClick={handleHebrewSelection}>המשך</Button>
        </div>
      </div>
    );
  }
  
  // תצוגה רגילה של קונספטים
  const concepts = getConceptsByType();
  
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <h3 className="text-lg font-medium text-center">מהו סוג האירוע?</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {concepts.map(concept => (
          <Card 
            key={concept.id}
            className={`p-4 cursor-pointer hover:border-primary transition-all ${
              selectedConcept === concept.id ? 'border-primary bg-primary/10' : ''
            }`}
            onClick={() => onUpdate(concept.id)}
          >
            <h4 className="font-medium">{concept.name}</h4>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConceptStep;
