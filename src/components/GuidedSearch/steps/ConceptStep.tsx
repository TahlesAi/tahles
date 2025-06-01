
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HebrewConcept, HebrewCategory } from "@/lib/types/hierarchy";
import { EventType } from "../GuidedSearchModal";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

interface ConceptStepProps {
  eventType?: EventType;
  selectedConcept?: string;
  selectedHebrewConcept?: HebrewConcept | null;
  selectedSubconcept?: string;
  hebrewCategories: HebrewCategory[];
  onSelectConcept: (concept: HebrewConcept) => void;
  onSelectSubconcept: (subconcept: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const ConceptStep = ({ 
  eventType, 
  selectedHebrewConcept,
  selectedSubconcept,
  hebrewCategories,
  onSelectConcept,
  onSelectSubconcept,
  onNext,
  onBack
}: ConceptStepProps) => {
  const [currentStage, setCurrentStage] = useState<'subconcept' | 'category'>('subconcept');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const availableSubconcepts = selectedHebrewConcept?.subconcepts || [];

  const handleSubconceptSelect = (subconceptId: string) => {
    const subconcept = availableSubconcepts.find(s => s.id === subconceptId);
    if (subconcept) {
      onSelectSubconcept(subconceptId);
      setCurrentStage('category');
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onNext();
  };

  const getRelevantCategories = () => {
    const relevantCategories = hebrewCategories.filter(cat => {
      if (eventType === 'children' && 
          ['entertainment-performance', 'creative-workshops', 'interactive-activities'].includes(cat.id)) {
        return true;
      }
      if (eventType === 'business' && 
          ['entertainment-performance', 'catering-food', 'audio-visual'].includes(cat.id)) {
        return true;
      }
      if (eventType === 'private' && 
          ['entertainment-performance', 'catering-food', 'creative-workshops'].includes(cat.id)) {
        return true;
      }
      return ['entertainment-performance', 'catering-food', 'decoration-styling'].includes(cat.id);
    });
    
    return relevantCategories.slice(0, 4);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-bold">בואו נגדיר את האירוע</h3>
        </div>
        <p className="text-gray-600 text-sm">
          {currentStage === 'subconcept' ? 'בחרו את סוג האירוע הספציפי' : 'איזה שירות אתם מחפשים?'}
        </p>
      </div>
      
      <div className="space-y-4">
        {currentStage === 'subconcept' && availableSubconcepts.length > 0 && (
          <div className="space-y-3">
            {availableSubconcepts.map((subconcept) => (
              <Card
                key={subconcept.id}
                className="cursor-pointer transition-all duration-200 hover:border-purple-500 hover:shadow-md border-2 hover:bg-purple-50"
                onClick={() => handleSubconceptSelect(subconcept.id)}
              >
                <CardContent className="p-4">
                  <div className="text-right">
                    <div className="font-semibold text-base text-purple-700">{subconcept.name}</div>
                    {subconcept.description && (
                      <div className="text-sm text-gray-600 mt-1">{subconcept.description}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {currentStage === 'category' && (
          <div className="space-y-3">
            {getRelevantCategories().map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer transition-all duration-200 hover:border-blue-500 hover:shadow-md border-2 hover:bg-blue-50"
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardContent className="p-4">
                  <div className="text-right">
                    <div className="font-semibold text-base text-blue-700">{category.name}</div>
                    {category.description && (
                      <div className="text-sm text-gray-600 mt-1">{category.description}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {selectedSubconcept && (
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="text-sm text-purple-700 text-center">
                  ✅ נבחר: {availableSubconcepts.find(s => s.id === selectedSubconcept)?.name}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="flex items-center px-6 py-3 h-12">
          <ChevronRight className="ml-2 h-4 w-4" />
          חזרה
        </Button>
        
        {currentStage !== 'category' && (
          <div className="text-sm text-gray-500 self-center">
            בחרו אפשרות כדי להמשיך
          </div>
        )}
      </div>
    </div>
  );
};

export default ConceptStep;
