
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { HebrewConcept, HebrewCategory } from "@/lib/types/hierarchy";
import { EventType } from "../GuidedSearchModal";

interface ConceptStepProps {
  eventType?: EventType;
  selectedConcept?: string;
  selectedHebrewConcept?: HebrewConcept | null;
  hebrewCategories: HebrewCategory[];
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
  const [detailInput, setDetailInput] = useState(selectedConcept || "");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>(undefined);
  const [audience, setAudience] = useState<'family' | 'friends' | 'mixed' | undefined>(undefined);

  // Available subconcepts based on selected Hebrew concept
  const availableSubconcepts = selectedHebrewConcept?.subconcepts || [];

  const handleSubconceptSelect = (subconceptId: string) => {
    const subconcept = availableSubconcepts.find(s => s.id === subconceptId);
    if (subconcept) {
      setDetailInput(subconcept.id);
      console.log("Subconcept selected:", subconcept.id);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(undefined); // Reset subcategory when category changes
    console.log("Category selected:", categoryId);
  };

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    console.log("Subcategory selected:", subcategoryId);
  };

  const handleAudienceSelect = (selectedAudience: 'family' | 'friends' | 'mixed') => {
    setAudience(selectedAudience);
    console.log("Audience selected:", selectedAudience);
  };

  const handleNext = () => {
    console.log("handleNext called", {
      detailInput,
      selectedCategory,
      selectedSubcategory,
      audience
    });
    
    // Check if all required fields are filled
    if (detailInput && selectedCategory && selectedSubcategory && audience) {
      console.log("Hebrew concept - all fields filled, calling onUpdate");
      onUpdate(detailInput, detailInput, audience, selectedCategory, selectedSubcategory);
    }
  };

  // Get subcategories for selected category
  const availableSubcategories = selectedCategory 
    ? hebrewCategories.find(cat => cat.id === selectedCategory)?.subcategories || []
    : [];

  // Check if user can proceed
  const canProceed = detailInput && selectedCategory && selectedSubcategory && audience;

  useEffect(() => {
    console.log("Hebrew concept canProceed:", canProceed, {
      detailInput,
      selectedCategory,
      selectedSubcategory,
      audience
    });
  }, [detailInput, selectedCategory, selectedSubcategory, audience, canProceed]);

  return (
    <div className="space-y-6 text-right min-h-[500px] overflow-y-auto" dir="rtl">
      <h3 className="text-lg font-medium text-center">פרטי האירוע</h3>
      
      <div className="space-y-6">
        {/* Event Details */}
        {availableSubconcepts.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-base font-medium mb-3 block text-right">
                איזה סוג של {selectedHebrewConcept?.name}?
              </Label>
              <div className="grid grid-cols-1 gap-2">
                {availableSubconcepts.map((subconcept) => (
                  <Button
                    key={subconcept.id}
                    variant={detailInput === subconcept.id ? "default" : "outline"}
                    className="text-right justify-start h-auto py-3 px-4"
                    onClick={() => handleSubconceptSelect(subconcept.id)}
                  >
                    <div className="text-right">
                      <div className="font-medium">{subconcept.name}</div>
                      {subconcept.description && (
                        <div className="text-sm text-gray-600 mt-1">{subconcept.description}</div>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium text-right">איזה סוג שירות אתם מחפשים?</Label>
          <Select value={selectedCategory} onValueChange={handleCategorySelect} dir="rtl">
            <SelectTrigger className="w-full text-right">
              <SelectValue placeholder="בחרו קטגוריית שירות" />
            </SelectTrigger>
            <SelectContent>
              {hebrewCategories.map((category) => (
                <SelectItem key={category.id} value={category.id} className="text-right">
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subcategory Selection */}
        {selectedCategory && availableSubcategories.length > 0 && (
          <div className="space-y-3">
            <Label className="text-base font-medium text-right">איזה סוג מוצר ספציפי?</Label>
            <Select value={selectedSubcategory} onValueChange={handleSubcategorySelect} dir="rtl">
              <SelectTrigger className="w-full text-right">
                <SelectValue placeholder="בחרו תת-קטגוריה" />
              </SelectTrigger>
              <SelectContent>
                {availableSubcategories.map((subcategory) => (
                  <SelectItem key={subcategory.id} value={subcategory.id} className="text-right">
                    {subcategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Audience Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium text-right">איזה קהל משתתף באירוע?</Label>
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant={audience === "family" ? "default" : "outline"}
              className="text-right justify-start h-auto py-3 px-4"
              onClick={() => handleAudienceSelect("family")}
            >
              <div className="text-right">
                <div className="font-medium">משפחתי</div>
                <div className="text-sm text-gray-600 mt-1">אירוע משפחתי עם קרובים</div>
              </div>
            </Button>
            <Button
              variant={audience === "friends" ? "default" : "outline"}
              className="text-right justify-start h-auto py-3 px-4"
              onClick={() => handleAudienceSelect("friends")}
            >
              <div className="text-right">
                <div className="font-medium">חברים</div>
                <div className="text-sm text-gray-600 mt-1">אירוע עם חברים וחברות</div>
              </div>
            </Button>
            <Button
              variant={audience === "mixed" ? "default" : "outline"}
              className="text-right justify-start h-auto py-3 px-4"
              onClick={() => handleAudienceSelect("mixed")}
            >
              <div className="text-right">
                <div className="font-medium">מעורב</div>
                <div className="text-sm text-gray-600 mt-1">משפחה וחברים יחד</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center pt-6">
        <Button 
          onClick={handleNext} 
          className="w-full max-w-md" 
          disabled={!canProceed}
        >
          המשך לתוצאות
        </Button>
      </div>
    </div>
  );
};

export default ConceptStep;
