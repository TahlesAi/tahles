
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HebrewConcept, HebrewCategory } from "@/lib/types/hierarchy";
import { EventType } from "../GuidedSearchModal";

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
  selectedConcept,
  selectedHebrewConcept,
  selectedSubconcept,
  hebrewCategories,
  onSelectConcept,
  onSelectSubconcept,
  onNext,
  onBack
}: ConceptStepProps) => {
  const [currentStage, setCurrentStage] = useState<'subconcept' | 'category' | 'subcategory' | 'audience'>('subconcept');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>(undefined);
  const [audience, setAudience] = useState<'family' | 'friends' | 'mixed' | undefined>(undefined);

  // Available subconcepts based on selected Hebrew concept
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
    setCurrentStage('subcategory');
  };

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    setCurrentStage('audience');
  };

  const handleAudienceSelect = (selectedAudience: 'family' | 'friends' | 'mixed') => {
    setAudience(selectedAudience);
    onNext();
  };

  // Get subcategories for selected category
  const availableSubcategories = selectedCategory 
    ? hebrewCategories.find(cat => cat.id === selectedCategory)?.subcategories || []
    : [];

  const resetToStage = (stage: 'subconcept' | 'category' | 'subcategory' | 'audience') => {
    setCurrentStage(stage);
    if (stage === 'subconcept') {
      setSelectedCategory(undefined);
      setSelectedSubcategory(undefined);
      setAudience(undefined);
    } else if (stage === 'category') {
      setSelectedSubcategory(undefined);
      setAudience(undefined);
    } else if (stage === 'subcategory') {
      setAudience(undefined);
    }
  };

  return (
    <div className="space-y-4 text-right min-h-[400px]" dir="rtl">
      <h3 className="text-lg font-medium text-center">פרטי האירוע</h3>
      
      <div className="space-y-4">
        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mb-4">
          {['subconcept', 'category', 'subcategory', 'audience'].map((stage, index) => (
            <div
              key={stage}
              className={`w-3 h-3 rounded-full ${
                stage === currentStage ? 'bg-primary' :
                ['subconcept', 'category', 'subcategory', 'audience'].indexOf(currentStage) > index ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Stage 1: Subconcept Selection */}
        {currentStage === 'subconcept' && availableSubconcepts.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="text-base font-medium mb-3 text-center">
                איזה סוג של {selectedHebrewConcept?.name}?
              </div>
              <div className="grid grid-cols-1 gap-2">
                {availableSubconcepts.map((subconcept) => (
                  <Button
                    key={subconcept.id}
                    variant="outline"
                    className="text-right justify-start h-auto py-2 px-3"
                    onClick={() => handleSubconceptSelect(subconcept.id)}
                  >
                    <div className="text-right">
                      <div className="font-medium text-sm">{subconcept.name}</div>
                      {subconcept.description && (
                        <div className="text-xs text-gray-600 mt-1">{subconcept.description}</div>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Summary */}
        {currentStage !== 'subconcept' && selectedSubconcept && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-700">
                  נבחר: {availableSubconcepts.find(s => s.id === selectedSubconcept)?.name}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => resetToStage('subconcept')}
                  className="text-xs h-6"
                >
                  שנה
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stage 2: Category Selection */}
        {currentStage === 'category' && (
          <div className="space-y-3">
            <div className="text-base font-medium text-center">איזה סוג שירות?</div>
            <div className="grid grid-cols-1 gap-2">
              {hebrewCategories.slice(0, 8).map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  className="text-right justify-start h-auto py-2 px-3"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div className="text-right">
                    <div className="font-medium text-sm">{category.name}</div>
                    {category.description && (
                      <div className="text-xs text-gray-600 mt-1">{category.description}</div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Progress Summary for Category */}
        {currentStage !== 'category' && currentStage !== 'subconcept' && selectedCategory && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-700">
                  קטגוריה: {hebrewCategories.find(c => c.id === selectedCategory)?.name}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => resetToStage('category')}
                  className="text-xs h-6"
                >
                  שנה
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stage 3: Subcategory Selection */}
        {currentStage === 'subcategory' && availableSubcategories.length > 0 && (
          <div className="space-y-3">
            <div className="text-base font-medium text-center">איזה מוצר ספציפי?</div>
            <div className="grid grid-cols-1 gap-2">
              {availableSubcategories.map((subcategory) => (
                <Button
                  key={subcategory.id}
                  variant="outline"
                  className="text-right justify-start h-auto py-2 px-3"
                  onClick={() => handleSubcategorySelect(subcategory.id)}
                >
                  <div className="text-right">
                    <div className="font-medium text-sm">{subcategory.name}</div>
                    {subcategory.description && (
                      <div className="text-xs text-gray-600 mt-1">{subcategory.description}</div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Progress Summary for Subcategory */}
        {currentStage === 'audience' && selectedSubcategory && (
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-purple-700">
                  תת-קטגוריה: {availableSubcategories.find(s => s.id === selectedSubcategory)?.name}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => resetToStage('subcategory')}
                  className="text-xs h-6"
                >
                  שנה
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stage 4: Audience Selection */}
        {currentStage === 'audience' && (
          <div className="space-y-3">
            <div className="text-base font-medium text-center">איזה קהל משתתף?</div>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                className="text-right justify-start h-auto py-2 px-3"
                onClick={() => handleAudienceSelect("family")}
              >
                <div className="text-right">
                  <div className="font-medium text-sm">משפחתי</div>
                  <div className="text-xs text-gray-600">אירוע עם קרובים</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="text-right justify-start h-auto py-2 px-3"
                onClick={() => handleAudienceSelect("friends")}
              >
                <div className="text-right">
                  <div className="font-medium text-sm">חברים</div>
                  <div className="text-xs text-gray-600">אירוע עם חברות</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="text-right justify-start h-auto py-2 px-3"
                onClick={() => handleAudienceSelect("mixed")}
              >
                <div className="text-right">
                  <div className="font-medium text-sm">מעורב</div>
                  <div className="text-xs text-gray-600">משפחה וחברים</div>
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConceptStep;
