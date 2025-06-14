
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DateTimeStep } from './steps/DateTimeStep';
import { LocationStep } from './steps/LocationStep';
import { ConceptStep } from './steps/ConceptStep';
import { ParticipantsStep } from './steps/ParticipantsStep';
import { CategoryStep } from './steps/CategoryStep';
import { BudgetStep } from './steps/BudgetStep';

interface SearchCriteria {
  date?: Date;
  startTime?: string;
  endTime?: string;
  location?: string;
  concept?: string;
  participants?: string;
  category?: string;
  subcategory?: string;
  budget?: string;
}

export const RefactoredGuidedSearchForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [criteria, setCriteria] = useState<SearchCriteria>({});
  const navigate = useNavigate();

  const totalSteps = 6;

  const updateCriteria = (key: keyof SearchCriteria, value: string | Date) => {
    setCriteria(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      const searchParams = new URLSearchParams();
      Object.entries(criteria).forEach(([key, value]) => {
        if (value) {
          searchParams.set(key, value.toString());
        }
      });
      searchParams.set('testMode', 'true');
      navigate(`/search-results?${searchParams.toString()}`);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DateTimeStep
            date={criteria.date}
            startTime={criteria.startTime}
            endTime={criteria.endTime}
            onDateChange={(date) => updateCriteria('date', date || new Date())}
            onStartTimeChange={(time) => updateCriteria('startTime', time)}
            onEndTimeChange={(time) => updateCriteria('endTime', time)}
          />
        );
      case 2:
        return (
          <LocationStep
            location={criteria.location}
            onLocationChange={(location) => updateCriteria('location', location)}
          />
        );
      case 3:
        return (
          <ConceptStep
            selectedConcept={criteria.concept}
            onSelect={(concept) => updateCriteria('concept', concept)}
          />
        );
      case 4:
        return (
          <ParticipantsStep
            selectedRange={criteria.participants}
            onSelect={(range) => updateCriteria('participants', range)}
          />
        );
      case 5:
        return (
          <CategoryStep
            selectedCategory={criteria.category}
            onSelect={(categoryId) => updateCriteria('category', categoryId)}
          />
        );
      case 6:
        return (
          <BudgetStep
            selectedBudget={criteria.budget}
            onSelect={(budget) => updateCriteria('budget', budget)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              בואו נמצא לכם את הפתרון המושלם
            </CardTitle>
            <div className="flex justify-center space-x-2 mb-4">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i + 1 <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">שלב {currentStep} מתוך {totalSteps}</p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-2">
              <p className="text-xs text-yellow-800">
                🧪 מצב בדיקה: כל השדות לא חובה - ניתן לדלג ולעבור בחופשיות
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                חזור
              </Button>
              
              <Button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentStep === totalSteps ? (
                  <><Search className="w-4 h-4 mr-2" /> חפש פתרונות</>
                ) : (
                  'המשך'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
