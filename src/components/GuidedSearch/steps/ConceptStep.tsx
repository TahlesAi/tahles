
import { useState } from "react";
import { EventType } from "../GuidedSearchModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HebrewCategory, HebrewConcept } from "@/lib/types/hierarchy";

interface ConceptStepProps {
  eventType?: EventType;
  selectedConcept?: string;
  selectedHebrewConcept?: HebrewConcept | null;
  hebrewCategories?: HebrewCategory[];
  onUpdate: (concept: string, details?: string, audience?: 'family' | 'friends' | 'mixed' | null, category?: string, subcategory?: string) => void;
}

const ConceptStep = ({ 
  eventType, 
  selectedConcept, 
  selectedHebrewConcept,
  hebrewCategories,
  onUpdate 
}: ConceptStepProps) => {
  const [concept, setConcept] = useState(selectedConcept || "");
  const [details, setDetails] = useState("");
  const [audience, setAudience] = useState<'family' | 'friends' | 'mixed' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>(undefined);
  
  // רשימת קונספטים לפי סוג אירוע
  const concepts = {
    private: [
      "יום הולדת",
      "בר/בת מצווה",
      "חתונה",
      "ברית",
      "מסיבת רווקים/ות",
      "אירוע משפחתי אחר"
    ],
    business: [
      "יום גיבוש",
      "כנס מקצועי",
      "ישיבת דירקטוריון",
      "אירוע חברה",
      "טקס הוקרה",
      "הרמת כוסית",
      "אירוע עסקי אחר"
    ],
    mixed: [
      "כנס משולב",
      "אירוע משפחות עובדים",
      "חגיגה מיוחדת",
      "אירוע מעורב אחר"
    ],
    children: [
      "יום הולדת ילדים",
      "מסיבת כיתה",
      "מסיבת סיום",
      "בר/בת מצווה",
      "חגיגה לילדים"
    ]
  };
  
  const selectedConcepts = eventType ? concepts[eventType] : [];
  const showAudienceField = concept.includes("הולדת") || concept.includes("משפחתי");
  
  // שימוש בקונספט עברי שנבחר
  const handleHebrewCategorySelection = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(undefined); // מאפס את הבחירה של תת-קטגוריה
  };
  
  const handleHebrewSubcategorySelection = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };
  
  const handleSubmit = () => {
    onUpdate(concept, details, audience, selectedCategory, selectedSubcategory);
  };
  
  const getSelectedCategorySubcategories = () => {
    if (!selectedCategory || !hebrewCategories) return [];
    const category = hebrewCategories.find(cat => cat.id === selectedCategory);
    return category ? category.subcategories : [];
  };
  
  return (
    <div className="space-y-6 text-right" dir="rtl">
      {selectedHebrewConcept ? (
        // אם כבר נבחר קונספט עברי
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-center">בחירת קטגוריה וסוג שירות</h3>
          
          {hebrewCategories && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium">בחר קטגוריה:</label>
                <Select value={selectedCategory} onValueChange={handleHebrewCategorySelection}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר קטגוריה" />
                  </SelectTrigger>
                  <SelectContent>
                    {hebrewCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedCategory && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">בחר תת-קטגוריה:</label>
                  <Select value={selectedSubcategory} onValueChange={handleHebrewSubcategorySelection}>
                    <SelectTrigger>
                      <SelectValue placeholder="בחר תת-קטגוריה" />
                    </SelectTrigger>
                    <SelectContent>
                      {getSelectedCategorySubcategories().map(subcategory => (
                        <SelectItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </>
          )}
          
          <Button 
            onClick={handleSubmit} 
            className="w-full mt-6"
            disabled={!selectedCategory || !selectedSubcategory}
          >
            המשך
          </Button>
        </div>
      ) : (
        // אם לא נבחר קונספט עברי
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-center">מהו סוג האירוע?</h3>
          
          {selectedConcepts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {selectedConcepts.map((item, index) => (
                <Button
                  key={index}
                  variant={concept === item ? "default" : "outline"}
                  className="justify-start h-auto py-3 px-4"
                  onClick={() => setConcept(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium">תאר את האירוע:</label>
              <Input
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="לדוגמה: יום הולדת 40"
                className="text-right"
              />
            </div>
          )}
          
          {concept && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">פרטים נוספים: (אופציונלי)</label>
              <Input
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="לדוגמה: גיל, מספר משתתפים, העדפות מיוחדות"
                className="text-right"
              />
            </div>
          )}
          
          {showAudienceField && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">למי מיועד האירוע?</label>
              <div className="grid grid-cols-3 gap-3">
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
          )}
          
          <Button 
            onClick={handleSubmit} 
            className="w-full mt-6"
            disabled={!concept}
          >
            המשך
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConceptStep;
