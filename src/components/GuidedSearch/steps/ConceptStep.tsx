
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
  const [detailInput, setDetailInput] = useState(selectedConcept || "");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>(undefined);
  const [audience, setAudience] = useState<'family' | 'friends' | 'mixed' | undefined>(undefined);
  const [showSubconcepts, setShowSubconcepts] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [showAudience, setShowAudience] = useState(false);

  // Available subconcepts based on selected Hebrew concept
  const availableSubconcepts = selectedHebrewConcept?.subconcepts || [];

  const handleSubconceptSelect = (subconceptId: string) => {
    const subconcept = availableSubconcepts.find(s => s.id === subconceptId);
    if (subconcept) {
      setDetailInput(subconcept.id);
      onSelectSubconcept(subconceptId);
      setShowSubconcepts(false);
      setShowCategories(true);
      // Scroll to top of modal content
      setTimeout(() => {
        const modalContent = document.querySelector('[role="dialog"] .overflow-y-auto');
        if (modalContent) {
          modalContent.scrollTop = 0;
        }
      }, 100);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(undefined);
    setShowCategories(false);
    setShowSubcategories(true);
    // Scroll to top
    setTimeout(() => {
      const modalContent = document.querySelector('[role="dialog"] .overflow-y-auto');
      if (modalContent) {
        modalContent.scrollTop = 0;
      }
    }, 100);
  };

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    setShowSubcategories(false);
    setShowAudience(true);
    // Scroll to top
    setTimeout(() => {
      const modalContent = document.querySelector('[role="dialog"] .overflow-y-auto');
      if (modalContent) {
        modalContent.scrollTop = 0;
      }
    }, 100);
  };

  const handleAudienceSelect = (selectedAudience: 'family' | 'friends' | 'mixed') => {
    setAudience(selectedAudience);
    setShowAudience(false);
    // Proceed to results immediately
    onNext();
  };

  // Get subcategories for selected category
  const availableSubcategories = selectedCategory 
    ? hebrewCategories.find(cat => cat.id === selectedCategory)?.subcategories || []
    : [];

  // Check if user can proceed
  const canProceed = detailInput && selectedCategory && selectedSubcategory && audience;

  return (
    <div className="space-y-6 text-right min-h-[500px] overflow-y-auto" dir="rtl">
      <h3 className="text-lg font-medium text-center">פרטי האירוע</h3>
      
      <div className="space-y-6">
        {/* Event Details - Subconcepts */}
        {showSubconcepts && availableSubconcepts.length > 0 && (
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

        {/* Selected subconcept summary */}
        {!showSubconcepts && detailInput && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">
                  נבחר: {availableSubconcepts.find(s => s.id === detailInput)?.name}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setShowSubconcepts(true);
                    setShowCategories(false);
                    setShowSubcategories(false);
                    setShowAudience(false);
                  }}
                  className="text-xs"
                >
                  שנה
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Selection */}
        {showCategories && (
          <div className="space-y-3">
            <Label className="text-base font-medium text-right">איזה סוג שירות אתם מחפשים?</Label>
            <div className="grid grid-cols-1 gap-2">
              {hebrewCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className="text-right justify-start h-auto py-3 px-4"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div className="text-right">
                    <div className="font-medium">{category.name}</div>
                    {category.description && (
                      <div className="text-sm text-gray-600 mt-1">{category.description}</div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Selected category summary */}
        {!showCategories && selectedCategory && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">
                  קטגוריה: {hebrewCategories.find(c => c.id === selectedCategory)?.name}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setShowCategories(true);
                    setShowSubcategories(false);
                    setShowAudience(false);
                  }}
                  className="text-xs"
                >
                  שנה
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subcategory Selection */}
        {showSubcategories && selectedCategory && availableSubcategories.length > 0 && (
          <div className="space-y-3">
            <Label className="text-base font-medium text-right">איזה סוג מוצר ספציפי?</Label>
            <div className="grid grid-cols-1 gap-2">
              {availableSubcategories.map((subcategory) => (
                <Button
                  key={subcategory.id}
                  variant={selectedSubcategory === subcategory.id ? "default" : "outline"}
                  className="text-right justify-start h-auto py-3 px-4"
                  onClick={() => handleSubcategorySelect(subcategory.id)}
                >
                  <div className="text-right">
                    <div className="font-medium">{subcategory.name}</div>
                    {subcategory.description && (
                      <div className="text-sm text-gray-600 mt-1">{subcategory.description}</div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Selected subcategory summary */}
        {!showSubcategories && selectedSubcategory && (
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-700">
                  תת-קטגוריה: {availableSubcategories.find(s => s.id === selectedSubcategory)?.name}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setShowSubcategories(true);
                    setShowAudience(false);
                  }}
                  className="text-xs"
                >
                  שנה
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Audience Selection */}
        {showAudience && (
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
        )}
      </div>
    </div>
  );
};

export default ConceptStep;
