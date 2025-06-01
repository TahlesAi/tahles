
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HebrewConcept, HebrewCategory } from "@/lib/types/hierarchy";
import { EventType } from "../GuidedSearchModal";
import { ChevronRight, ChevronLeft, Users, Heart, Calendar, Sparkles } from "lucide-react";

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
  const [currentStage, setCurrentStage] = useState<'subconcept' | 'category' | 'audience'>('subconcept');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
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
    setCurrentStage('audience');
  };

  const handleAudienceSelect = (selectedAudience: 'family' | 'friends' | 'mixed') => {
    setAudience(selectedAudience);
    onNext();
  };

  const getProgressPercentage = () => {
    if (currentStage === 'subconcept') return 33;
    if (currentStage === 'category') return 66;
    return 100;
  };

  // Get relevant categories for current event type
  const getRelevantCategories = () => {
    // מחזיר רק קטגוריות רלוונטיות לסוג האירוע
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
    
    return relevantCategories.slice(0, 6); // מגביל ל-6 קטגוריות
  };

  return (
    <div className="space-y-6 text-right max-h-[500px] overflow-y-auto" dir="rtl">
      {/* Header with progress */}
      <div className="text-center sticky top-0 bg-white z-10 pb-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-bold">בואו נגדיר את האירוע</h3>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        <p className="text-gray-600 text-sm">שלב {currentStage === 'subconcept' ? '1' : currentStage === 'category' ? '2' : '3'} מתוך 3</p>
      </div>
      
      <div className="space-y-4 px-2">
        {/* Stage 1: Subconcept Selection */}
        {currentStage === 'subconcept' && availableSubconcepts.length > 0 && (
          <div className="space-y-4">
            <div className="text-center">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="text-lg font-semibold mb-2">
                איזה סוג של {selectedHebrewConcept?.name}?
              </h4>
              <p className="text-gray-600 text-sm">בחרו את הסוג הספציפי שמתאים לכם</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
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
          </div>
        )}

        {/* Stage 2: Category Selection */}
        {currentStage === 'category' && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">איזה סוג שירות אתם מחפשים?</h4>
              <p className="text-gray-600 text-sm">בחרו את הקטגוריה המתאימה לאירוע שלכם</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
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
            </div>
            
            {/* Progress summary */}
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="text-sm text-purple-700 text-center">
                ✅ נבחר: {availableSubconcepts.find(s => s.id === selectedSubconcept)?.name}
              </div>
            </div>
          </div>
        )}

        {/* Stage 3: Audience Selection */}
        {currentStage === 'audience' && (
          <div className="space-y-4">
            <div className="text-center">
              <Users className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <h4 className="text-lg font-semibold mb-2">איזה קהל משתתף באירוע?</h4>
              <p className="text-gray-600 text-sm">זה יעזור לנו להתאים את ההמלצות</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <Card
                className="cursor-pointer transition-all duration-200 hover:border-pink-500 hover:shadow-md border-2 hover:bg-pink-50"
                onClick={() => handleAudienceSelect("family")}
              >
                <CardContent className="p-4">
                  <div className="text-right flex items-center gap-3">
                    <Heart className="h-5 w-5 text-pink-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-base text-pink-700">משפחתי</div>
                      <div className="text-sm text-gray-600">אירוע עם קרובי משפחה</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card
                className="cursor-pointer transition-all duration-200 hover:border-blue-500 hover:shadow-md border-2 hover:bg-blue-50"
                onClick={() => handleAudienceSelect("friends")}
              >
                <CardContent className="p-4">
                  <div className="text-right flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-base text-blue-700">חברים</div>
                      <div className="text-sm text-gray-600">אירוע עם חברות</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card
                className="cursor-pointer transition-all duration-200 hover:border-green-500 hover:shadow-md border-2 hover:bg-green-50"
                onClick={() => handleAudienceSelect("mixed")}
              >
                <CardContent className="p-4">
                  <div className="text-right flex items-center gap-3">
                    <div className="w-5 h-5 flex-shrink-0 text-green-600">🎭</div>
                    <div>
                      <div className="font-semibold text-base text-green-700">מעורב</div>
                      <div className="text-sm text-gray-600">משפחה וחברים יחד</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Progress summary */}
            <div className="space-y-2">
              <div className="p-2 bg-purple-50 border border-purple-200 rounded text-center">
                <span className="text-xs text-purple-700">
                  ✅ {availableSubconcepts.find(s => s.id === selectedSubconcept)?.name}
                </span>
              </div>
              <div className="p-2 bg-blue-50 border border-blue-200 rounded text-center">
                <span className="text-xs text-blue-700">
                  ✅ {getRelevantCategories().find(c => c.id === selectedCategory)?.name}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-4 sticky bottom-0 bg-white border-t">
        <Button variant="outline" onClick={onBack} className="flex items-center px-6 py-3 h-12">
          <ChevronRight className="ml-2 h-4 w-4" />
          חזרה
        </Button>
        
        {currentStage !== 'audience' && (
          <div className="text-sm text-gray-500 self-center">
            {currentStage === 'subconcept' ? 'בחרו סוג אירוע כדי להמשיך' : 'בחרו קטגוריה כדי להמשיך'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConceptStep;
